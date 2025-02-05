import { Arg, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";
import type { EntityManager } from "typeorm";
import { IsDateString, IsString } from "class-validator";
import { getCurrentAssetPrices, getOrCreateHistoricalAssetPrice } from "../../dbHelper";

@ObjectType()
export class AssetInfo {
  @Field(() => String, { nullable: false })
  assetId!: string;

  @Field(() => Number, { nullable: true })
  price?: number;

  constructor(props: AssetInfo) {
    Object.assign(this, props);
  }
}

@InputType()
export class AssetsInput {
  @Field(() => String, { nullable: false })
  @IsString()
  assetId!: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  date?: string;
}

@Resolver()
export class AssetsResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => AssetInfo)
  async assetsPrices(@Arg("params", { validate: true }) input: AssetsInput): Promise<AssetInfo> {
    const { assetId, date } = input;

    const manager = await this.tx();

    if (!date) {
      const currentPrices = await getCurrentAssetPrices(manager);
      const price =
        currentPrices?.[assetId] || (await getOrCreateHistoricalAssetPrice(manager, assetId, new Date().getTime()));

      return {
        assetId,
        price
      };
    }

    const price = await getOrCreateHistoricalAssetPrice(manager, assetId, new Date(date).getTime());

    return {
      assetId,
      price
    };
  }
}

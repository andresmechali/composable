{ self, ... }: {
  perSystem =
    { config, self', inputs', pkgs, system, crane, systemCommonRust, ... }: {
      packages = let packages = self'.packages;
      in rec {
        generated-release-body = let
          subwasm-call = runtime:
            builtins.readFile (pkgs.runCommand "subwasm-info" { } ''
              ${packages.subwasm}/bin/subwasm info ${runtime}/lib/runtime.optimized.wasm | tail -n+2 | head -c -1 > $out
            '');
          flake-url =
            "github:ComposableFi/composable/v${packages.composable-node.version}";
        in pkgs.writeTextFile {
          name = "release.txt";
          text = ''
            ## Runtimes
            ### Picasso
            ```
            ${subwasm-call packages.picasso-runtime}
            ```
            ### Composable
            ```
            ${subwasm-call packages.composable-runtime}
            ```
            ## Nix
            ```bash
            # Generate the Wasm runtimes
            nix build ${flake-url}#picasso-runtime
            nix build ${flake-url}#composable-runtime

            # Run the Composable node (release mode) alone
            nix run ${flake-url}#composable-node-release

            # Spin up a local devnet
            nix run ${flake-url}#devnet

            # Spin up a local XCVM devnet
            nix run ${flake-url}#devnet-xcvm

            # Show all possible apps, shells and packages
            nix flake show ${flake-url} --allow-import-from-derivation
            ```
          '';
        };

        # basically this should be just package result with several files
        generate-release-artifacts = pkgs.writeShellApplication {
          name = "generate-release-artifacts";
          runtimeInputs = [ pkgs.bash pkgs.binutils pkgs.coreutils ];
          text = let
            make-bundle = type: package:
              self.inputs.bundlers.bundlers."${system}"."${type}" package;
            subwasm-version = runtime:
              builtins.readFile (pkgs.runCommand "subwasm-version" { } ''
                ${packages.subwasm}/bin/subwasm version ${runtime}/lib/runtime.optimized.wasm | grep specifications | cut -d ":" -f2 | cut -d " " -f3 | head -c -1 > $out
              '');
          in ''
            mkdir -p release-artifacts/to-upload/

            echo "Generate release body"
            cp ${generated-release-body} release-artifacts/release.txt

            echo "Generate wasm runtimes"
            cp ${packages.picasso-runtime}/lib/runtime.optimized.wasm release-artifacts/to-upload/picasso_runtime_${
              subwasm-version packages.picasso-runtime
            }.wasm
            cp ${packages.composable-runtime}/lib/runtime.optimized.wasm release-artifacts/to-upload/composable_runtime_${
              subwasm-version packages.composable-runtime
            }.wasm

            cp ${packages.picasso-testfast-runtime}/lib/runtime.optimized.wasm release-artifacts/to-upload/picasso_testfast_runtime_${
              subwasm-version packages.picasso-testfast-runtime
            }.wasm



            echo "Generate node packages"
            cp ${
              make-bundle "toRPM" packages.composable-node
            }/*.rpm release-artifacts/to-upload/composable-node-${packages.composable-node.version}-1.x86_64.rpm
            cp ${
              make-bundle "toDEB" packages.composable-node
            }/*.deb release-artifacts/to-upload/composable-node_${packages.composable-node.version}-1_amd64.deb
            cp ${
              make-bundle "toDockerImage" packages.composable-node
            } release-artifacts/composable-docker-image


            cp ${
              make-bundle "toRPM" packages.composable-testfast-node
            }/*.rpm release-artifacts/to-upload/composable-testfast-node-${packages.composable-testfast-node.version}-1.x86_64.rpm
            cp ${
              make-bundle "toDEB" packages.composable-testfast-node
            }/*.deb release-artifacts/to-upload/composable-testfast-node_${packages.composable-testfast-node.version}-1_amd64.deb
            cp ${
              make-bundle "toDockerImage" packages.composable-testfast-node
            } release-artifacts/composable-testfast-node-docker-image

            # Checksum everything
            cd release-artifacts/to-upload
            sha256sum ./* > checksums.txt
          '';
        };

      };

    };
}

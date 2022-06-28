#!/bin/bash
rootDir=$PWD
yarn install
# Compiling types
echo "Compiling types..."
cd $rootDir/packages/types
yarn gen
yarn build
cd $rootDir
echo "Types compiled"


# Compiling utils
echo "Compiling utils..."
cd $rootDir/packages/utils
yarn build
cd $rootDir
echo "Utils compiled"

# Compiling oracle setup
echo "Compiling oracle setup..."
cd $rootDir/packages/oracle-setup
yarn build
cd $rootDir
echo "Oracle setup compiled"

# Compiling core
echo "Compiling core..."
npx tsc -b $rootDir/
echo "Core compiled"

echo "Build completed!"

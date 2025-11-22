#!/bin/bash

# VaultGuard Smart Contract Deployment Script
# This script deploys the inheritance vault contract to Sui network

set -e

echo "🔐 VaultGuard - Deploying Inheritance Vault Contract"
echo "=================================================="

# Check if Sui CLI is installed
if ! command -v sui &> /dev/null; then
    echo "❌ Sui CLI not found. Please install it first:"
    echo "   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui"
    exit 1
fi

# Get network selection
echo ""
echo "Select network for deployment:"
echo "1) Devnet"
echo "2) Testnet"
echo "3) Mainnet"
read -p "Enter choice (1-3): " network_choice

case $network_choice in
    1)
        NETWORK="devnet"
        ;;
    2)
        NETWORK="testnet"
        ;;
    3)
        NETWORK="mainnet"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📦 Building Move package..."
cd move/vaultguard
sui move build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""
echo "🚀 Deploying to $NETWORK..."

# Deploy the package
DEPLOY_OUTPUT=$(sui client publish --gas-budget 100000000 --json)

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

# Extract package ID from deployment output
PACKAGE_ID=$(echo $DEPLOY_OUTPUT | jq -r '.objectChanges[] | select(.type == "published") | .packageId')

echo ""
echo "✅ Deployment successful!"
echo "=================================================="
echo "📋 Deployment Details:"
echo "   Network: $NETWORK"
echo "   Package ID: $PACKAGE_ID"
echo ""
echo "💾 Saving deployment info..."

# Save deployment info
cat > ../../deployment-info.json << EOF
{
  "network": "$NETWORK",
  "packageId": "$PACKAGE_ID",
  "deployedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "module": "vaultguard::inheritance_vault"
}
EOF

echo "✅ Deployment info saved to deployment-info.json"
echo ""
echo "📝 Next steps:"
echo "   1. Update your frontend with the package ID: $PACKAGE_ID"
echo "   2. Test vault creation with: sui client call --package $PACKAGE_ID --module inheritance_vault --function create_vault"
echo ""
echo "🎉 Deployment complete!"

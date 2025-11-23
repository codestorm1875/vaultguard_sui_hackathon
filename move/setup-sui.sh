#!/bin/bash

# Sui CLI Setup Script for VaultGuard
# This script initializes Sui CLI and sets up a wallet for deployment

set -e

echo "🔧 Setting up Sui CLI for VaultGuard"
echo "===================================="
echo ""

# Step 1: Initialize Sui client (this will create a new wallet if needed)
echo "📝 Step 1: Initializing Sui client..."
echo "This will create a new wallet and configuration."
echo ""

# Run sui client with automatic yes to prompts
sui client

echo ""
echo "✅ Sui client initialized!"
echo ""

# Step 2: Add devnet environment (if it doesn't exist)
echo "🌐 Step 2: Configuring devnet environment..."

# Check if devnet already exists
if sui client envs | grep -q "devnet"; then
    echo "   Devnet environment already exists, skipping creation..."
else
    sui client new-env --alias devnet --rpc https://fullnode.devnet.sui.io:443
    echo "   ✅ Devnet environment added!"
fi

echo ""

# Step 3: Switch to devnet
echo "🔄 Step 3: Switching to devnet..."
sui client switch --env devnet

echo ""
echo "✅ Switched to devnet!"
echo ""

# Step 4: Get your address
echo "📍 Step 4: Your Sui address:"
ADDRESS=$(sui client active-address)
echo "   $ADDRESS"
echo ""

# Step 5: Request devnet tokens
echo "💰 Step 5: Requesting devnet SUI tokens..."
echo "This may take a moment..."
echo ""

curl --location --request POST 'https://faucet.devnet.sui.io/v2/gas' \
  --header 'Content-Type: application/json' \
  --data-raw "{\"FixedAmountRequest\":{\"recipient\":\"$ADDRESS\"}}"

echo ""
echo ""
echo "⏳ Waiting 5 seconds for tokens to arrive..."
sleep 5

# Step 6: Check balance
echo ""
echo "💵 Step 6: Checking your balance..."
sui client gas

echo ""
echo "✅ Setup complete!"
echo "===================================="
echo ""
echo "📋 Summary:"
echo "   Network: devnet"
echo "   Address: $ADDRESS"
echo ""
echo "🚀 You're ready to deploy! Run:"
echo "   cd ~/Hackathons/VaultGuard/move"
echo "   bash deploy.sh"
echo ""

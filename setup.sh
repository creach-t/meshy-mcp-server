#!/usr/bin/env bash
# setup.sh — clone le repo original et applique les patches de ce fork
set -e

echo "📦 Clonage du repo original meshy-dev/meshy-mcp-server..."
git clone https://github.com/meshy-dev/meshy-mcp-server.git .upstream
cd .upstream
npm install

echo "🩹 Application des patches..."

# Copier les 3 fichiers patchés depuis ce fork
FORK_DIR="$(dirname "$0")"
cp "$FORK_DIR/src/types.ts"       src/types.ts
cp "$FORK_DIR/src/tools/image.ts" src/tools/image.ts

echo "⚠️  Patch de tasks.ts: applique manuellement le diff depuis le README"
echo "   Ou utilise directement ce repo comme base (npm install && npm run build)"

echo "🔨 Build..."
npm run build

echo "✅ Done! Configurer ton client MCP avec:"
echo '   { "command": "node", "args": ["'$(pwd)'/dist/index.js"], "env": { "MESHY_API_KEY": "msy_..." } }'

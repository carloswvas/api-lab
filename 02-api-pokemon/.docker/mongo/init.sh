#!/bin/bash
set -e

echo "🚀 Restaurando dump inicial..."

mongorestore --drop /dump

echo "✅ Dump restaurado com sucesso!"

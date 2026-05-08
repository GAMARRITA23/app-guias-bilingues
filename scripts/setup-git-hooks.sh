#!/bin/sh
set -eu

git config core.hooksPath .githooks
chmod +x .githooks/post-commit

echo "Hooks de Git configurados. Los commits intentaran hacer push automatico."

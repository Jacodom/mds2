#!/bin/bash

# TypeScript File Watcher Script
# Usage: ./watch.sh <file-path>
# Example: ./watch.sh src/01_POO/review.ts

if [ $# -eq 0 ]; then
    echo "Usage: ./watch.sh <file-path>"
    echo "Example: ./watch.sh src/01_POO/review.ts"
    echo ""
    echo "Available shortcuts:"
    echo "  poo    - Watch src/01_POO/review.ts"
    echo "  index  - Watch src/index.ts"
    echo "  examples - Watch src/examples.ts"
    echo "  data   - Watch src/data-structures.ts"
    exit 1
fi

# Handle shortcuts
case $1 in
    "poo")
        FILE="src/01_POO/review.ts"
        ;;
    "index")
        FILE="src/index.ts"
        ;;
    "examples")
        FILE="src/examples.ts"
        ;;
    "data")
        FILE="src/data-structures.ts"
        ;;
    *)
        FILE="$1"
        ;;
esac

echo "🔄 Watching $FILE for changes..."
echo "💡 Press Ctrl+C to stop watching"
echo "=================================="

npx nodemon --exec ts-node "$FILE"

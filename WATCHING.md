# 🔄 File Watching Quick Reference

This project supports multiple ways to watch and automatically run TypeScript files:

## 🎯 Methods to Watch Files

### 1. NPM Scripts (Recommended for specific examples)

```bash
# Watch specific examples
npm run watch:poo          # Watch src/01_POO/review.ts
npm run run:poo            # Run src/01_POO/review.ts once

# Watch custom files
npm run dev:watch-file src/path/to/your/file.ts
```

### 2. Shell Script (Most Convenient)

```bash
# Shortcuts
./watch.sh poo             # Watch src/01_POO/review.ts
./watch.sh index           # Watch src/index.ts
./watch.sh examples        # Watch src/examples.ts
./watch.sh data            # Watch src/data-structures.ts

# Custom files
./watch.sh src/custom/file.ts
```

### 3. VS Code Tasks (Press Ctrl+Shift+P → "Tasks: Run Task")

- **Watch: POO Review** - Auto-watch POO example
- **Run: POO Review** - Run POO example once
- **Watch: Custom File** - Watch any file (prompts for path)
- **TypeScript: Watch and Run** - Watch main index.ts

### 4. Direct Commands

```bash
# Watch any file directly
npx nodemon --exec ts-node src/01_POO/review.ts

# Run any file once
npx ts-node src/01_POO/review.ts
```

## 🎓 Teaching Workflow

1. **Start watching your current example:**

   ```bash
   ./watch.sh poo
   ```

2. **Edit the file** (`src/01_POO/review.ts`)

3. **Save the file** - Output appears automatically in terminal

4. **Students see immediate results** of their code changes

## 💡 Tips

- **Background watching**: Process runs in background, shows output on file save
- **Clear output**: Each run clears previous output for better readability
- **Error handling**: TypeScript errors shown immediately
- **Hot reload**: No need to manually restart - just save and see results!

## 🛑 Stop Watching

- Press `Ctrl+C` in the terminal running the watch process
- Or use: `pkill -f "nodemon"`

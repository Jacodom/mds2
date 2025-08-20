<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# TypeScript Programming Class Project

This is a TypeScript educational project designed for teaching programming concepts. The project is configured for:

- **TypeScript compilation**: Source files in `src/` directory compile to `dist/` directory
- **Node.js environment**: No DOM types included to avoid conflicts with class names like `Report`
- **Automatic compilation**: Use `npm run watch` for continuous compilation
- **Development mode**: Use `npm run dev:watch` for automatic recompilation and execution
- **Educational examples**: Multiple example files demonstrating various programming concepts

## Project Structure Guidelines

When suggesting code or modifications:

- Place all TypeScript source files in the `src/` directory
- Use clear, educational examples with comprehensive comments
- Demonstrate TypeScript features like types, interfaces, classes, generics
- Include practical examples that students can easily understand and modify
- Follow consistent naming conventions and coding standards
- Add console.log statements to show program output clearly

## Common Teaching Patterns

- Use interfaces to demonstrate type definitions
- Create classes with proper encapsulation (private/public members)
- Include error handling and validation examples
- Show both basic and advanced TypeScript features
- Provide clear, step-by-step examples for complex concepts

## Development Workflow

Students can run:

- `npm run dev` - Run single file with ts-node
- `npm run dev:watch` - Auto-restart on file changes
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run compiled JavaScript

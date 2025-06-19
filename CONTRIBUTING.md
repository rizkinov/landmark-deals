# Contributing to CBRE Web Elements

Thank you for your interest in contributing to CBRE Web Elements! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Creating Components](#creating-components)
- [Documentation](#documentation)
- [Testing](#testing)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. All participants in our project and community are expected to treat one another with respect and courtesy.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/cbre-web-elements.git`
3. Add the upstream repository: `git remote add upstream https://github.com/cbre/cbre-web-elements.git`
4. Install dependencies: `npm install`
5. Create a branch for your changes: `git checkout -b feature/your-feature-name`

## Development Workflow

1. Start the development server: `npm run dev`
2. Visit http://localhost:3000 to see the example pages
3. Make your changes to components or documentation
4. Test your changes thoroughly
5. Commit your changes with descriptive commit messages

## Pull Request Process

1. Update your fork with the latest changes from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. Push your changes to your fork
3. Create a Pull Request from your branch to the upstream main branch
4. Ensure your PR includes:
   - A descriptive title
   - Detailed description of changes
   - Any relevant issue references
   - Updated documentation if appropriate
5. Wait for code review and address any feedback

## Coding Standards

We follow specific coding standards to maintain consistency across the codebase:

- Use TypeScript for all components and utilities
- Include proper type definitions and interfaces
- Follow the naming conventions established in the project
- Use the existing file structure
- Write self-documenting code with descriptive variable and function names
- Include JSDoc comments for functions and components

## Creating Components

### Component Structure

All components should:

1. Be created in the appropriate directory:
   - Base components: `src/components/ui/`
   - CBRE-branded components: `src/components/cbre/`
   - Block components: `src/components/blocks/`

2. Use the component generator when possible:
   ```bash
   npm run generateComp
   ```

3. Follow the naming conventions:
   - UI components: PascalCase (e.g., `Button.tsx`)
   - CBRE components: PascalCase with CBRE prefix (e.g., `CBREButton.tsx`)
   - Block components: PascalCase with CBRE prefix and Block suffix (e.g., `CBREHeroBlock.tsx`)

### Component Requirements

All components must:

1. Be fully typed with TypeScript
2. Include proper prop interface definitions
3. Use the CBRE design tokens and theme variables
4. Maintain accessibility standards
5. Be responsive and work on all screen sizes
6. Include proper documentation

## Documentation

For each component, include:

1. JSDoc comments that describe:
   - The component's purpose
   - Props and their types
   - Usage examples
   - Any important implementation details

2. If adding a new example page, follow the existing pattern in the `app/elements-example` directory

## Testing

We encourage writing tests for all components:

1. Unit tests for components using React Testing Library
2. Basic tests that verify rendering and prop handling
3. Run tests before submitting a PR: `npm test`

Thank you for contributing to CBRE Web Elements! 
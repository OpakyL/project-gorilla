# Project Gorilla

## Overview

Project Gorilla is a bot application written in TypeScript, designed to handle various commands and manage cooldowns efficiently. It serves as an example of clean architecture and best practices in backend development.

## Features

- **Command Factory**: A flexible system to define and manage commands dynamically.
- **Cooldown Management**: A robust manager to track and enforce cooldown periods for commands.
- **Integration with External Services**: Includes a service to interact with external APIs (e.g., `morpher`).
- **Typed Codebase**: Uses TypeScript for enhanced code reliability and maintainability.
- **Utilities**: A set of utility functions for common tasks, such as logging and validation.

## Technologies Used

- **Language**: TypeScript
- **Runtime**: Node.js
- **Package Manager**: npm
- **Linting**: ESLint with a custom configuration
- **Process Management**: PM2 for running the application

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OpakyL/project-gorilla.git
   cd project-gorilla
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file by copying the example:

   ```bash
   cp .env.example .env
   ```

4. Start the application in development mode:

   ```bash
   npm run dev
   ```

## Build for Production

To build and run the application in production:

```bash
npm run build
npm run prod
```

## Scripts

- `npm run prepare`: Installs `ts-patch`.
- `npm run dev`: Starts the application in development mode.
- `npm run clean`: Cleans the `dist` folder.
- `npm run build`: Builds the application for production.
- `npm run prod`: Starts the application in production mode using PM2.
- `npm run stop`: Stops the PM2-managed process.
- `npm run restart`: Rebuilds the application and restarts the PM2-managed process.
- `npm run lint`: Runs ESLint to check code quality.
- `npm run lint:reconfigure`: Reconfigures ESLint using the migrate-config command.

## Folder Structure

```
project-gorilla/
├── config/             # Configuration files
├── src/                # Source code
│   ├── factories/      # Factories for commands and other entities
│   ├── managers/       # Managers for handling application logic
│   ├── services/       # External service integrations
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── bot.ts          # Main entry point for the bot
├── .env.example        # Example environment variables
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript configuration
└── ecosystem.config.js # PM2 configuration
```

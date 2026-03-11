# MaisonFlorae Frontend (Beginner Guide)

This is the website part of MaisonFlorae.
It is what people see in the browser.

## What You Need Installed

1. Node.js (version 20 or newer): https://nodejs.org/
2. npm (comes with Node.js)
3. A terminal to run commands

Terminal options:

- VS Code integrated terminal (recommended): no extra install needed
- Windows PowerShell
- Windows CMD
- Git Bash

If you use VS Code, open terminal with:

- `Terminal` -> `New Terminal`
- Shortcut: `Ctrl + \``

Check both are installed:

```bash
node -v
npm -v
```

If both commands return version numbers, you are ready.

## Project Folder Structure

- `src/components`: reusable UI parts
- `src/pages`: screen/page files
- `src/routes`: routing setup
- `src/services`: API calls and external services
- `src/styles`: stylesheets

## How To Run Locally

1. Open terminal in this folder (`MaisonFloraeFrontend`).
2. Install dependencies:

```bash
npm install
```

3. Start the local server:

```bash
npm run dev
```

4. Open the URL shown in terminal (usually `http://localhost:5173`).

## Useful Commands

- `npm run dev`: run locally
- `npm run build`: create production build
- `npm run preview`: preview production build

## Common Problems

- `npm` command not found:
	Node.js is not installed correctly. Reinstall from nodejs.org.
- Error after install:
	Delete `node_modules` and run `npm install` again.
- Browser page does not load:
	Make sure terminal is still running and check the URL it prints.  
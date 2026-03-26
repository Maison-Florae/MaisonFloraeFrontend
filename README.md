# MaisonFlorae Frontend 

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

## How To Clone the Repository from GitHub

Before running the project, you need to download it from GitHub.

### What You Need

- Git installed on your computer: https://git-scm.com/downloads

Check it is installed:

```bash
git --version
```

If it returns a version number, you are ready.

### Steps

1. Go to the repository page on GitHub.
2. Click the green **Code** button and copy the URL (HTTPS option).
3. Open a terminal and run:

```bash
git clone https://github.com/your-username/MaisonFlorae.git
```

4. Navigate into the project folder:

```bash
cd MaisonFlorae/APP/MaisonFloraeFrontend
```

Now continue with the steps below.

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

4. Open the URL shown in terminal (usually `http://localhost:3000`).

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
# NX Serverless

A full Serverless framework support for the NX environment.

## Feature Highlight

* NX executor with a full support of the Serverless CLI.
* NX generator to generate new serverless stacks (projects) out-of-the-box
    * Support `npm`, `yarn` and `pnpm` environments.
    * Support of `serverless-esbuild`, `serverless-webpack`, `serverless-plugin-typescript`.
* Cold-start optimized setup using the Serverless & AWS best-practices.
* Advanced setup & Fully documented serverless setup when using `esbuild` or `webpack` that optimized for both the local environment and cloud environments.

## Install

```bash
// npm
npm i -D @thyself/nx-serverless
// yarn
yarn add @thyself/nx-serverless -D
// pnpm
pnpm add @thyself/nx-serverless -D -w
```

## Usage



The complete orchestrator for using Serverless Framework (+v3) with Nx.

## Key Features

**✅ Full support 🚧 Partial support 🗺️ In Roadmap ❌ No support**

- ✅ `serverless offline start` (The Serverless offline plugin) 
- ✅ `serverless print`
- 🚧 `serverless package`

## Installation

```
// npm
npm install --save-dev nx-serverless
// yarn
yarn add nx-serverless -D -w
// pnpm
pnpm add nx-serverless -D -w
```

## Usage

Run `nx build nx-serverless` to build the library.

### Generator

### Executor

## Compatibility

Reminder: This is an non-funded open-source.

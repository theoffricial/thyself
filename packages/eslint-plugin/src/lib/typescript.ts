import nxTypescript from '@nx/eslint-plugin/src/configs/typescript'
import type { ESLint } from 'eslint';

export = {
    ...nxTypescript,
    rules: {
        ...nxTypescript.rules,
        "object-curly-spacing": ["error", "always"]
    }
} as ESLint.ConfigData;
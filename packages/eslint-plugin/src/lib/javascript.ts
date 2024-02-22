import nxJavascript from '@nx/eslint-plugin/src/configs/javascript'
import type { ESLint } from 'eslint';

export = {
    ...nxJavascript,
    rules: {
        ...nxJavascript.rules,
        "object-curly-spacing": ["error", "always"]
    }
} as ESLint.ConfigData;
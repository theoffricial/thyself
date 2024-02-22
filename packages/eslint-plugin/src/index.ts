/* eslint-disable @typescript-eslint/no-explicit-any */
// export * from './lib/eslint-plugin';
import type { ESLint } from 'eslint';
import typescriptConfig from './lib/typescript'
import javascriptConfig from './lib/javascript'
import nxReact from '@nx/eslint-plugin/src/configs/react-tmp'
import nxReactBase from '@nx/eslint-plugin/src/configs/react-base'
import nxReactTypescript from '@nx/eslint-plugin/src/configs/react-typescript'
import nxReactJsx from '@nx/eslint-plugin/src/configs/react-jsx'
import nxAngular from '@nx/eslint-plugin/src/configs/angular';
import nxAngularTemplate from '@nx/eslint-plugin/src/configs/angular-template'

export = {
    configs: {
        typescript: typescriptConfig,
        javascript: javascriptConfig,
        react: {
            ...nxReact,
            rules: {
                // ...nxReact.rules,
            }
        },
        'react-base': {
            env: nxReactBase.env,
            plugins: nxReactBase.plugins,
            rules: {
                ...nxReactBase.rules as any
            }
        },
        'react-typescript': {
            ...nxReactTypescript,
            rules: {
                ...nxReactTypescript.rules as any,
            }
        },
        'react-jsx': {
            ...nxReactJsx,
            rules: {
                ...nxReactJsx.rules as any,
            }
        },
        angular: {
            ...nxAngular,
            rules: {
                ...nxAngular.rules,
            }
        },
        'angular-template': {
            ...nxAngularTemplate,
            rules: {
                ...nxAngularTemplate.rules,
            }
        }
        
    }
} as ESLint.Plugin
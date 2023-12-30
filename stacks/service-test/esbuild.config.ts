import Serverless from 'serverless'
import type { BuildOptions } from 'esbuild'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export = (serverless: Serverless): BuildOptions => {
  return {
    bundle: true,
    target: 'node18',
    platform: 'node',
    format: 'cjs',
    sourcemap: 'inline',
    external: [],
    plugins: [],
    color: true,
    treeShaking: true,
  };
}
import { Tree } from '@nx/devkit';
import { configurationGenerator } from '@nx/jest';
import { JestProjectSchema } from '@nx/jest/src/generators/configuration/schema';

export const addJest = async (tree: Tree, projectName: string) => {
  await configurationGenerator(tree, <JestProjectSchema>{
    project: projectName,
    setupFile: 'none',
    testEnvironment: 'node',
    skipSerializers: false,
    skipSetupFile: false,
    supportTsx: false,
    babelJest: false,
    skipFormat: true,
  });
};

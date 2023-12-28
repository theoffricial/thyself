import { Tree } from '@nx/devkit';
import { jestProjectGenerator } from '@nx/jest';
import { JestProjectSchema } from '@nx/jest/src/generators/configuration/schema';

export const addJest = async (host: Tree, projectName: string) => {
  await jestProjectGenerator(host, <JestProjectSchema>{
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

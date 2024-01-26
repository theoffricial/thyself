import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  installPackagesTask,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ServiceGeneratorSchema } from './schema';
import { addJest } from './jest-config';

// gprh - Growth, Productivity, Reliability, High-performance
export async function serviceGenerator(
  tree: Tree,
  options: ServiceGeneratorSchema
) {
  const resolvedOptions: ServiceGeneratorSchema = {
    ...options,
    description: options.description || '',
    directory: options.directory || 'stacks',
    packageManager: options.packageManager || 'npm',
    name: names(options.name).fileName,
  };
  const projectRoot = `${resolvedOptions.directory}/${resolvedOptions.name}`;

  addProjectConfiguration(tree, resolvedOptions.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        executor: '@gprh/nx-serverless:package',
        options: {
          cwd: projectRoot,
          stage: 'dev',
        },
        // ...buildRunCommandConfig(projectRoot, 'serverless package'),
      },
      start: {
        executor: '@gprh/nx-serverless:offline-start',
        options: {
          cwd: projectRoot,
          stage: 'dev',
        },
      },
      deploy: {
        executor: '@gprh/nx-serverless:deploy',
        options: {
          cwd: projectRoot,
          stage: 'dev',
        },
      },
      remove: {
        executor: '@gprh/nx-serverless:remove',
        options: {
          cwd: projectRoot,
          stage: 'dev',
        },
      },
      lint: {
        executor: '@nx/linter:eslint',
        options: {
          lintFilePatterns: [projectRoot + '/**/*.ts'],
        },
      },
      test: {
        executor: '@nx/jest:jest',
        options: {
          jestConfig: [projectRoot + 'jest.config.ts'],
        },
      },
    },
  });

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    resolvedOptions
  );

  await addJest(tree, resolvedOptions.name);
  await formatFiles(tree);

  const dependencies: Record<string, string> = {
    "serverless": "^3.38.0",
  };
  const devDependencies: Record<string, string> = {
    '@types/aws-lambda': '^8.10.72',
    'serverless-offline': "^13.3.2",
    'serverless-esbuild': '^1.50.1'
  }

  addDependenciesToPackageJson(tree, dependencies, devDependencies);

  return () => {
    installPackagesTask(tree, false, '.', resolvedOptions.packageManager);
  };
}

export default serviceGenerator;

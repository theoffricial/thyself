import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  // ensurePackage,
  formatFiles,
  generateFiles,
  installPackagesTask,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ServiceGeneratorSchema } from './schema';
import { addJest } from './jest-config';

// import { Linter, lintProjectGenerator } from '@nx/eslint';

// gprh - Growth, Productivity, Reliability, High-performance
export async function serviceGenerator(
  tree: Tree,
  options: ServiceGeneratorSchema
) {
  const resolvedOptions: Required<ServiceGeneratorSchema> = {
    ...options,
    description: options.description || '',
    directory: options.directory || 'stacks',
    packageManager: options.packageManager || 'npm',
    name: names(options.name).fileName,
    bundlerPlugin: options.bundlerPlugin || 'serverless-esbuild',
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
      // test: {
      //   executor: '@nx/jest:jest',
      //   options: {
      //     jestConfig: [projectRoot + 'jest.config.ts'],
      //   },
      // },
    },
  });

  // lintProjectGenerator(tree, {
  //   project: resolvedOptions.name,
  //   linter: Linter.EsLint,
  //   skipFormat: true,
  // });

  // const { } = ensurePackage('@gprh/nx-serverless', '0.0.1');

  if (resolvedOptions.bundlerPlugin === 'serverless-esbuild')  {
    generateFiles(
      tree,
      path.join(__dirname, 'bundler-files', 'esbuild'),
      projectRoot,
      resolvedOptions
    )
  } else if (resolvedOptions.bundlerPlugin === 'serverless-webpack')  {
    generateFiles(
      tree,
      path.join(__dirname, 'bundler-files', 'webpack'),
      projectRoot,
      resolvedOptions
    )
  } 
  // else if (resolvedOptions.bundlerPlugin === 'serverless-plugin-typescript')  {
  //   generateFiles(
  //     tree,
  //     path.join(__dirname, 'bundler-files', 'serverless-plugin-typescript'),
  //     projectRoot,
  //     resolvedOptions
  //   )
  // }

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
    '@types/serverless': '^1.78.0',
    'serverless-offline': "^13.3.2",
    ...(resolvedOptions.bundlerPlugin === 'serverless-esbuild' && {
      'serverless-esbuild': '^1.50.1',
      'esbuild': '^0.8.41',
    }),
    ...(resolvedOptions.bundlerPlugin === 'serverless-webpack' && {
      'serverless-webpack': '^5.13.0',
      'webpack': '^5.28.0',
    }),
    ...(resolvedOptions.bundlerPlugin === 'serverless-plugin-typescript' && {
      'serverless-plugin-typescript': '^1.50.1',
    }),
    // 'typescript': '^4.2.4',
    // 'ts-node': '^10.0.0',
  }

  addDependenciesToPackageJson(tree, dependencies, devDependencies);

  return () => {
    installPackagesTask(tree, false, '.', resolvedOptions.packageManager);
  };
}

export default serviceGenerator;

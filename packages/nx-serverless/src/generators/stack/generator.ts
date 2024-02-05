import {
  addDependenciesToPackageJson,
  addProjectConfiguration,
  workspaceLayout,
  workspaceRoot,
  formatFiles,
  generateFiles,
  installPackagesTask,
  names,
  Tree,
  readJson,

} from '@nx/devkit';
import * as path from 'path';
import { ServiceGeneratorSchema } from './schema';
import { addJest } from './jest-config';

export async function serviceGenerator(
  tree: Tree,
  options: ServiceGeneratorSchema
) {
  const {appsDir} = workspaceLayout();
  const packageJson = await readJson(tree, 'package.json');
  const resolvedOptions: Required<ServiceGeneratorSchema> =  {
    description: options.description || '',
    appsDir,
    packageManager: options.packageManager || 'npm',
    name: names(options.name).fileName,
    bundler: options.bundler || 'webpack',
    scope: options.scope || packageJson.name
  };
  const projectRoot = `${resolvedOptions.appsDir}/${resolvedOptions.name}`;

  addProjectConfiguration(tree, resolvedOptions.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        executor: '@thyself/nx-serverless:package',
        options: {
          cwd: projectRoot,
          stage: 'dev',
        },
      },
      start: {
        executor: '@thyself/nx-serverless:offline-start',
        options: {
          cwd: projectRoot,
          stage: 'dev',
        },
      },
      deploy: {
        executor: '@thyself/nx-serverless:deploy',
        options: {
          cwd: projectRoot,
          stage: 'dev',
        },
      },
      remove: {
        executor: '@thyself/nx-serverless:remove',
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
    },
  });

  if (resolvedOptions.bundler === 'esbuild')  {
    generateFiles(
      tree,
      path.join(__dirname, 'bundler-files', 'esbuild'),
      projectRoot,
      resolvedOptions
    )
  } else if (resolvedOptions.bundler === 'webpack')  {
    generateFiles(
      tree,
      path.join(__dirname, 'bundler-files', 'webpack'),
      projectRoot,
      resolvedOptions
    )
  } 

  const serverless_base_path = `${workspaceRoot}/serverless.base.ts`;

  if (!tree.exists(serverless_base_path)) {
    generateFiles(
      tree,
      path.join(__dirname, 'serverless-base-file'), // path to the template files
      '.', // destination directory
      {}
    );
  }

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
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    ...(resolvedOptions.bundler === 'esbuild' && {
      'serverless-esbuild': '^1.50.1',
      'esbuild': '^0.8.41',
      'chokidar': '^3.5.3',
    }),
    ...(resolvedOptions.bundler === 'webpack' && {
      'serverless-webpack': '^5.13.0',
      "webpack": "^5.89.0",
      "@types/webpack": "^5.28.5",
      "@types/webpack-node-externals": "^3.0.4",
      "ts-loader": "^9.5.1",
      "copy-webpack-plugin": "^12.0.2",
      "terser-webpack-plugin": "^5.3.10",
      "webpack-node-externals": "^3.0.0",
    }),
    ...(resolvedOptions.bundler === 'tsc' && {
      'serverless-plugin-typescript': '^1.50.1',
    }),
  }

  addDependenciesToPackageJson(tree, dependencies, devDependencies);

  return () => {
    installPackagesTask(tree, false, workspaceRoot, resolvedOptions.packageManager);
  };
}

export default serviceGenerator;

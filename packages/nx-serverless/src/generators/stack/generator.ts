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
import { Linter, lintProjectGenerator } from '@nx/eslint';
import semver from 'semver';
import {
  addOverrideToLintConfig,
  // updateOverrideInLintConfig,
} from '@nx/eslint/src/generators/utils/eslint-file';
export async function serviceGenerator(
  tree: Tree,
  options: ServiceGeneratorSchema
) {
  const { appsDir } = workspaceLayout();
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
  lintProjectGenerator(tree, {
    project: options.name,
    skipFormat: false,
    addPlugin: true,
    eslintFilePatterns: ["!**/*", "**/node_modules/**"],
    linter: Linter.EsLint,
    skipPackageJson: false,
  });

  const defaultStage = 'dev';
  addProjectConfiguration(tree, resolvedOptions.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        executor: '@thyself/nx-serverless:package',
        options: {
          cwd: projectRoot,
          stage: defaultStage,
        },
      },
      start: {
        executor: '@thyself/nx-serverless:offline-start',
        options: {
          cwd: projectRoot,
          stage: defaultStage,
        },
      },
      deploy: {
        executor: '@thyself/nx-serverless:deploy',
        options: {
          cwd: projectRoot,
          stage: defaultStage,
        },
      },
      print: {
        executor: '@thyself/nx-serverless:print',
        options: {
          cwd: projectRoot,
          stage: defaultStage,
        },
      },
      remove: {
        executor: '@thyself/nx-serverless:remove',
        options: {
          cwd: projectRoot,
          stage: defaultStage,
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

  // serverless.base.ts generation
  if (!tree.exists(serverless_base_path)) {
    generateFiles(
      tree,
      path.join(__dirname, 'serverless-base-root-level'), // path to the template files
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
  // Add the dependency check to the lint config
  addOverrideToLintConfig(tree, `${appsDir}/${resolvedOptions.name}`, {
    files: ['*.json'],
    parser: 'jsonc-eslint-parser',
    rules: {
      '@nx/dependency-checks': 'error',
    },
  });

  // updateOverrideInLintConfig(tree, '', (override) => {
  //   const lookupExtensions = ['*.ts', '*.tsx', '*.js', '*.jsx'];
  //   // Check if the desired override exists (optional)
  //   return (Array.isArray(override.files) && override.files.every((file) => lookupExtensions.includes(file)));
  // }, (override) => {

  //   if (Array.isArray(override.rules['@nx/enforce-module-boundaries'])) {
  //     override.rules['@nx/enforce-module-boundaries'][1].allow = Array.isArray(override.rules['@nx/enforce-module-boundaries'][1].allow) ? override.rules['@nx/enforce-module-boundaries'][1].allow : [];
  //     override.rules['@nx/enforce-module-boundaries'][1].allow.push(
  //       'serverless.base'
  //     );
  //   } else {
  //     override.rules['@nx/enforce-module-boundaries'] = [
  //       'error',
  //       {
  //         enforceBuildableLibDependency: true,
  //         allow: ['serverless.base'], // Add "serverless.base"
  //         depConstraints: [
  //           {
  //             sourceTag: '*',
  //             onlyDependOnLibsWithTags: ['*'],
  //           },
  //         ],
  //       },
  //     ]
  //   }
  //   return override;
  // });

  //   files: ['*.json'],
  // //   parser: 'jsonc-eslint-parser',
  // //   rules: {
  // //     '@nx/dependency-checks': 'error',
  // //   },
  // // }, {
  // //   checkBaseConfig: false,
  // // });

  await formatFiles(tree);

  const coercedNxVersion = semver.coerce(packageJson.devDependencies.nx || packageJson.dependencies.nx);
  const nxVersionDefault = 18;
  const nxVersion = String(coercedNxVersion?.major || nxVersionDefault);
  const nxPluginVersion = `^${nxVersion}.0.0`;
  const dependencies: Record<string, string> = {
    "serverless": "^3.38.0",
  };
  const devDependencies: Record<string, string> = {
    '@types/aws-lambda': '^8.10.72',
    '@types/serverless': '^1.78.0',
    'serverless-offline': "^13.3.2",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    "serverless-plugin-common-excludes": "^4.0.0",
    '@nx/devkit': nxPluginVersion,
    '@nx/eslint': nxPluginVersion,
    '@nx/eslint-plugin': nxPluginVersion,
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
      'serverless-plugin-typescript': '^2.1.5',
      // Cause an issue
      // <% if (bundler === 'tsc') { %>
      // /**
      //  * @link https://www.npmjs.com/package/serverless-plugin-include-dependencies
      //  */
      // 'serverless-plugin-include-dependencies',
      // <% } %>
      // 'serverless-plugin-include-dependencies': '^6.0.0'
    }),
  }

  addDependenciesToPackageJson(tree, dependencies, devDependencies);

  
  return () => {
    installPackagesTask(tree, false, workspaceRoot, resolvedOptions.packageManager);
  };
}

export default serviceGenerator;

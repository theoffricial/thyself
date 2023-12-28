import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  installPackagesTask,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ServiceGeneratorSchema } from './schema';
import { buildRunCommandConfig } from './workspace-config';
import { addJest } from './jest-config';

export async function serviceGenerator(
  tree: Tree,
  options: ServiceGeneratorSchema
) {
  const resolvedOptions: ServiceGeneratorSchema = {
    ...options,
    description: options.description || '',
    directory: options.directory || 'packages',
    packageManager: options.packageManager || 'npm',
    name: names(options.name).fileName,
  };
  const projectRoot = `${resolvedOptions.directory}/${resolvedOptions.name}`;

  addProjectConfiguration(tree, resolvedOptions.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        ...buildRunCommandConfig(projectRoot, 'sls package'),
      },
      serve: {
        ...buildRunCommandConfig(projectRoot, 'sls offline start'),
      },
      deploy: {
        ...buildRunCommandConfig(projectRoot, 'sls deploy'),
      },
      remove: {
        ...buildRunCommandConfig(projectRoot, 'sls remove'),
      },
      lint: {
        executor: '@nx/linter:eslint',
        options: {
          lintFilePatterns: [projectRoot + '/**/*.ts'],
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

  return () => {
    installPackagesTask(tree, true, '', resolvedOptions.packageManager);
  };
}

export default serviceGenerator;

import type { PackageManager } from 'nx/src/utils/package-manager';

export interface ServiceGeneratorSchema {
  name: string;
  description?: string;
  directory?: string;
  packageManager?: PackageManager;
}

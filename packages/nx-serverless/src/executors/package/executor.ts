import { ExecutorContext } from "@nx/devkit";
import { serverlessCommandRunner } from "../../executors-utils";
import { PackageExecutorSchema } from "./schema";

export default async function runExecutor(options: PackageExecutorSchema, context: ExecutorContext) {

  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['offline', 'start'],
    // customValidations: offlineStartValidations,
    customFlagsBuilder: (options: PackageExecutorSchema): string[] => {
      const flags = [];
    
      if (options['minify-individually']) {
        flags.push('--minify-individually');
      }
    
      if (options['package']) {
        flags.push('--package', options['package']);
      }
    
      return flags;
    },
  });


  return result;
}

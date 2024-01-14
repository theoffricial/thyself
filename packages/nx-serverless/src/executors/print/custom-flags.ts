import { PrintExecutorSchema } from "./schema";

export function buildPrintCustomFlags(options: PrintExecutorSchema) {
    const formatArgs = options.format ? ['--format', options.format] : [];
    const pathArgs = options.path ? ['--path', options.path] : [];
    const transformArgs = options.transform ? ['--transform', options.transform] : [];

    const customFlags = [
        ...formatArgs,
        ...pathArgs,
        ...transformArgs
    ]

    return customFlags;
}
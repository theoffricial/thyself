export interface OfflineStartExecutorSchema {
    stage: string;
    region?: string;
    debug?: boolean;
    awsProfile?: string;
    verbose?: boolean;
    cwd?: string;
    noColors?: boolean;
}

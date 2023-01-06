export interface MigrateOptions {
    dry?: boolean;
    print?: boolean;
    force?: boolean;
}
export declare function migrate(migration: string, files: string, options?: MigrateOptions): Promise<void>;
export declare function checkGitStatus(force?: boolean): void;

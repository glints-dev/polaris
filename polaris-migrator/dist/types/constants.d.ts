export declare const cliConfig: {
    description: string;
    args: {
        name: string;
        description: string;
    }[];
    flags: {
        dry: {
            alias: "d";
            description: string;
            type: "boolean";
        };
        print: {
            alias: "p";
            description: string;
            type: "boolean";
        };
        force: {
            alias: "f";
            description: string;
            type: "boolean";
        };
    };
};
export declare type CLIConfig = typeof cliConfig;
export declare const POLARIS_MIGRATOR_COMMENT = "polaris-migrator: Unable to migrate the following expression. Please upgrade manually.";

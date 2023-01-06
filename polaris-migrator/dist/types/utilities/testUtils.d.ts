import { FileInfo } from 'jscodeshift';
export default function applyTransform(transform: any, input: FileInfo, options?: {
    [option: string]: any;
}): Promise<any>;
interface TestArgs {
    fixture: string;
    migration: string;
    extension?: string;
    options?: {
        [option: string]: any;
    };
}
export declare function check(dirName: string, { fixture, migration, extension, options }: TestArgs): void;
export {};

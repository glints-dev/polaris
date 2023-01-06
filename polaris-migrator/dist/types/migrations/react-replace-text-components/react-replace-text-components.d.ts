import type { API, FileInfo, Options } from 'jscodeshift';
export interface MigrationOptions extends Options {
    relative: boolean;
}
export default function reactReplaceTextComponents(file: FileInfo, { jscodeshift: j }: API, options: MigrationOptions): string;

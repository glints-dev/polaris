import core, { Collection } from 'jscodeshift';
export declare function hasImportDeclaration(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): boolean;
export declare function getImportDeclaration(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.ImportDeclaration>;
export declare function getRelativeImportDeclaration(j: core.JSCodeshift, source: Collection<any>, fileName?: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.ImportDeclaration>;
export declare function getRelativeImportDeclarationValue(j: core.JSCodeshift, source: Collection<any>, fileName?: string): string | null;
export declare function removeImportDeclaration(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): void;
export declare function renameImportDeclaration(j: core.JSCodeshift, source: Collection<any>, sourcePath: string, newSourcePath: string): void;
export declare function insertImportDeclaration(j: core.JSCodeshift, source: Collection<any>, importSpecifier: string, sourcePath: string, afterSourcePath: string): void;
export declare function getDefaultImportSpecifier(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.ImportDefaultSpecifier>;
export declare function removeDefaultImportSpecifier(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.ImportDefaultSpecifier>;
export declare function getDefaultImportSpecifierName(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): string | null;
export declare function hasDefaultImportSpecifier(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): boolean;
export declare function getImportAllSpecifiers(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.ImportSpecifier>;
export declare function getImportSpecifier(j: core.JSCodeshift, source: Collection<any>, specifier: string, sourcePath: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.ImportSpecifier>;
export declare function getImportSpecifierName(j: core.JSCodeshift, source: Collection<any>, specifier: string, sourcePath: string): string | null;
export declare function hasImportSpecifiers(j: core.JSCodeshift, source: Collection<any>, sourcePath: string): boolean;
export declare function hasImportSpecifier(j: core.JSCodeshift, source: Collection<any>, specifier: string, sourcePath: string): boolean;
export declare function insertImportSpecifier(j: core.JSCodeshift, source: Collection<any>, importSpecifier: string, sourcePath: string): void;
export declare function renameImportSpecifier(j: core.JSCodeshift, source: Collection<any>, specifier: string, newSpecifier: string, sourcePath: string): void;
export declare function removeImportSpecifier(j: core.JSCodeshift, source: Collection<any>, specifier: string, sourcePath: string): void;
export declare function normalizeImportSourcePaths(j: core.JSCodeshift, source: Collection<any>, options?: {
    relative: boolean;
    from: string;
    to: string;
}): {
    from: string;
    to: string;
} | null;
export declare function updateImports(j: core.JSCodeshift, source: Collection<any>, options: {
    fromSpecifier: string;
    toSpecifier: string;
    fromSourcePath: string;
    toSourcePath: string;
}): void;

import core, { ASTPath, Collection } from 'jscodeshift';
export declare function getJSXAttributes(j: core.JSCodeshift, element: ASTPath<any>, attributeName: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.JSXAttribute>;
export declare function hasJSXAttribute(j: core.JSCodeshift, element: ASTPath<any>, attributeName: string): boolean;
export declare function hasJSXSpreadAttribute(j: core.JSCodeshift, element: ASTPath<any>): boolean;
export declare function removeJSXAttributes(j: core.JSCodeshift, element: ASTPath<any>, attributeName: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.JSXAttribute>;
export declare function insertJSXAttribute(j: core.JSCodeshift, element: ASTPath<any>, attributeName: string, attributeValue?: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.JSXElement>;
export declare function replaceJSXAttributes(j: core.JSCodeshift, element: ASTPath<any>, attributeName: string, newAttributeName: string, newAttributeValue?: string | {
    [key: string]: string;
}): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.JSXAttribute>;
export declare function replaceJSXElement(j: core.JSCodeshift, element: ASTPath<any>, componentName: string): import("jscodeshift/src/Collection").Collection<import("ast-types").namedTypes.JSXElement>;
export declare function renameProps(_j: core.JSCodeshift, source: Collection<any>, componentName: string, props: {
    [from: string]: string;
}): core.Collection<any>;
export declare function insertJSXComment(j: core.JSCodeshift, element: ASTPath<any>, comment: string, position?: 'before' | 'after'): void;

import type { FileInfo, API, Options } from 'jscodeshift';
import { Root, Result, Container, Declaration, Node as PostCSSNode, Rule as PostCSSRule, Comment as PostCSSComment, AtRule } from 'postcss';
import { Node, ParsedValue, FunctionNode, Dimension } from 'postcss-value-parser';
export declare function getNamespacePattern(options?: NamespaceOptions): string;
export interface NamespaceOptions {
    namespace?: string;
}
export declare function namespace(name: string, options?: NamespaceOptions): string;
/**
 * Checks if a `valueParser` node is a [Sass numeric operator](https://sass-lang.com/documentation/operators/numeric)
 */
export declare function isNumericOperator(node: Node): boolean;
/**
 * Checks if any descendant `valueParser` node is a numeric operator
 */
export declare function hasNumericOperator(parsedValue: ParsedValue, deep?: boolean): boolean;
/**
 * Checks if a `valueParser` node is a [SASS variable](https://sass-lang.com/documentation/variables)
 */
export declare function isSassVariable(node: Node): boolean;
/**
 * Checks if any descendant `valueParser` node is a SASS variable
 */
export declare function hasSassVariable(parsedValue: ParsedValue, deep?: boolean): boolean;
/**
 * Checks if a `valueParser` node is a given Sass function
 *
 * @example
 * const namespacedRem = namespace('rem', options);
 *
 * if (isSassFunction(namespacedRem, node)) node // FunctionNode
 */
export declare function isSassFunction(name: string, node: Node): node is FunctionNode;
/**
 * Checks if any descendant `valueParser` node is a given Sass function
 *
 * @example
 * const namespacedRem = namespace('rem', options);
 *
 * if (!hasSassFunction(namespacedRem, parsedValue)) return;
 */
export declare function hasSassFunction(name: string, parsedValue: ParsedValue, deep?: boolean): boolean;
/**
 * Check whether a string has Sass interpolation
 */
export declare function hasSassInterpolation(string: string): boolean;
/**
 * Check whether a string has negative Sass interpolation
 */
export declare function hasNegativeSassInterpolation(string: string): boolean;
/**
 * Replace negative Sass interpolations with a multiplication operator and a negative number
 *
 * @example
 * // Before
 * -#{spacing()};
 *
 * // After
 * -1 * ${spacing()};
 */
export declare function replaceNegativeSassInterpolation(parsedValue: ParsedValue): void;
/**
 * Remove the Sass interpolation from parsedValue
 */
export declare function removeSassInterpolation(namespace: string, parsedValue: ParsedValue): void;
export declare function getFunctionArgs(node: FunctionNode): string[];
/**
 * Removes surrounding quotes from a string
 * @example
 * const string = '"hello"';
 * stripQuotes(string); // hello
 */
export declare function stripQuotes(string: string): string;
/**
 * All transformable dimension units. These values are used to determine
 * if a decl.value can be converted to pixels and mapped to a Polaris custom property.
 */
export declare const transformableLengthUnits: string[];
export declare function isUnitlessZero(dimension: false | Dimension): boolean;
export declare function isTransformableLength(dimension: false | Dimension): dimension is Dimension;
export declare function hasTransformableLength(parsedValue: ParsedValue): boolean;
export declare function toTransformablePx(value: string): string | undefined;
/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
export declare const StopWalkingFunctionNodes = false;
/**
 * All transformable duration units. These values are used to determine
 * if a decl.value can be mapped to a Polaris custom property.
 *
 * Note: <time> is a dimension with 's' or 'ms' as the unit:
 * https://w3c.github.io/csswg-drafts/css-values-3/#time-value
 */
export declare const transformableDurationUnits: string[];
export declare function isTransformableDuration(dimension: false | Dimension): dimension is Dimension;
export declare function isPolarisVar(node: Node): boolean;
export declare function createInlineComment(text: string): PostCSSComment;
interface Report {
    node: PostCSSNode;
    severity: 'warning' | 'error';
    message: string;
}
interface PluginContext {
    fix: boolean;
}
declare type Walker<N extends PostCSSNode> = (node: N) => false | void;
export declare type PolarisMigrator = (primaryOption: true, secondaryOptions: {
    options: {
        [key: string]: any;
    };
    methods: {
        report: (report: Report) => void;
        each: <T extends Container>(root: T, walker: Walker<PostCSSNode>) => void;
        walk: <T extends Container>(root: T, walker: Walker<PostCSSNode>) => void;
        walkComments: <T extends Container>(root: T, walker: Walker<PostCSSComment>) => void;
        walkAtRules: <T extends Container>(root: T, atRuleWalker: Walker<AtRule>) => void;
        walkDecls: <T extends Container>(root: T, declWalker: Walker<Declaration>) => void;
        walkRules: <T extends Container>(root: T, ruleWalker: Walker<PostCSSRule>) => void;
    };
}, context: PluginContext) => (root: Root, result: Result) => void;
export declare function createSassMigrator(name: string, ruleFn: PolarisMigrator): (fileInfo: FileInfo, _: API, options: Options) => string;
export declare function setNodeValue(node: Node, value: string): void;
export {};

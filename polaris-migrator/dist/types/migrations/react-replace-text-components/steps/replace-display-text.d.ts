import type { ASTNode, Collection, JSCodeshift } from 'jscodeshift';
import type { MigrationOptions } from '../react-replace-text-components';
/**
 * Replace <DisplayText> with the <Text> component
 */
export declare function replaceDisplayText<NodeType = ASTNode>(j: JSCodeshift, source: Collection<NodeType>, options: MigrationOptions): void;

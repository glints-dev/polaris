import type { ASTNode, Collection, JSCodeshift } from 'jscodeshift';
import type { MigrationOptions } from '../react-replace-text-components';
/**
 * Replace <TextStyle> with the <Text> component
 */
export declare function replaceTextStyle<NodeType = ASTNode>(j: JSCodeshift, source: Collection<NodeType>, options: MigrationOptions): void;

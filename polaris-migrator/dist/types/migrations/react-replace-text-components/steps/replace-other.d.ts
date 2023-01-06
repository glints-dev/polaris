import type { ASTNode, Collection, JSCodeshift } from 'jscodeshift';
import type { MigrationOptions } from '../react-replace-text-components';
/**
 * Replace <Heading>, <Subheading>, <Caption>, and <VisuallyHidden> with the <Text> component
 */
export declare function replaceOther<NodeType = ASTNode>(j: JSCodeshift, source: Collection<NodeType>, options: MigrationOptions): void;

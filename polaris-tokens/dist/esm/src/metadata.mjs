import { tokensToRems } from './utilities.mjs';
import { breakpoints } from './token-groups/breakpoints.mjs';
import { depth } from './token-groups/depth.mjs';
import { font } from './token-groups/font.mjs';
import { legacy } from './token-groups/legacy.mjs';
import { colors } from './token-groups/colors.mjs';
import { motion } from './token-groups/motion.mjs';
import { shape } from './token-groups/shape.mjs';
import { spacing } from './token-groups/spacing.mjs';
import { zIndex } from './token-groups/zIndex.mjs';

var metadata = createMetadata({
  breakpoints: tokensToRems(breakpoints),
  colors: colors,
  depth: depth,
  font: tokensToRems(font),
  legacy: tokensToRems(legacy),
  motion: motion,
  shape: tokensToRems(shape),
  spacing: tokensToRems(spacing),
  zIndex: zIndex
});

/**
 * Identity function that simply returns the provided tokens with metadata, but additionally
 * validates the input matches the `Metadata` type exactly and infers all members.
 */
function createMetadata(metadata) {
  return metadata;
}

export { createMetadata, metadata };

import { ActionMetadata } from './types';
import { action1Metadata } from './action1-lithosurfer';
import { action3Metadata } from './action3-lithobuild';
import { unifiedUtopiaMetadata } from './action2-unified-utopia';
import { setupDepartmentsMetadata } from './action3-setup-departments';
import { okrImplementationMetadata } from './action4-okr-implementation';

// Map of all actions by slug
// Note: lithodata form removed - now consolidated under unified-utopia as summary pages
export const actionsBySlug: Record<string, ActionMetadata> = {
  'lithosurfer': action1Metadata,
  'lithobuild': action3Metadata,
  'unified-utopia': unifiedUtopiaMetadata,
  'setup-departments': setupDepartmentsMetadata,
  'okr-implementation': okrImplementationMetadata,
};

// Get action by slug
export function getActionBySlug(slug: string): ActionMetadata | null {
  return actionsBySlug[slug] || null;
}

// Valid action slugs
export const validActionSlugs = Object.keys(actionsBySlug);

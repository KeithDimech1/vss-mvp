import { ActionMetadata } from './types';
import { action1Metadata } from './action1-lithosurfer';
import { action2Metadata } from './action2-lithodata';
import { action3Metadata } from './action3-lithobuild';

// Map of all actions by slug
export const actionsBySlug: Record<string, ActionMetadata> = {
  'lithosurfer': action1Metadata,
  'lithodata': action2Metadata,
  'lithobuild': action3Metadata,
};

// Get action by slug
export function getActionBySlug(slug: string): ActionMetadata | null {
  return actionsBySlug[slug] || null;
}

// Valid action slugs
export const validActionSlugs = Object.keys(actionsBySlug);

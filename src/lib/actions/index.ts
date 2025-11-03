import { ActionMetadata } from './types';
import { action1Metadata } from './action1-products-services';

// Map of all actions by slug
export const actionsBySlug: Record<string, ActionMetadata> = {
  'products-services': action1Metadata,
  // Future actions will be added here:
  // 'unified-utopia': action2Metadata,
  // 'setup-departments': action3Metadata,
  // etc.
};

// Get action by slug
export function getActionBySlug(slug: string): ActionMetadata | null {
  return actionsBySlug[slug] || null;
}

// Valid action slugs
export const validActionSlugs = Object.keys(actionsBySlug);

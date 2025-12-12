// ISO Document Builder - Central exports
// Provides templates for HSE, Quality, and Integrated Management System documents

export * from './types';
export { hsePolicyTemplate } from './hse-policy-template';
export { qualityPolicyTemplate } from './quality-policy-template';

import { DocumentTemplate, IsoDocumentType } from './types';
import { hsePolicyTemplate } from './hse-policy-template';
import { qualityPolicyTemplate } from './quality-policy-template';

// Registry of available document templates
const documentTemplates: Record<IsoDocumentType, DocumentTemplate | null> = {
  HSE_POLICY: hsePolicyTemplate,
  QUALITY_POLICY: qualityPolicyTemplate,
  ENVIRONMENTAL_POLICY: null, // TODO: Implement standalone ISO 14001 template
  OHS_POLICY: null, // TODO: Implement standalone ISO 45001 template
  IMS_MANUAL: null, // TODO: Implement integrated manual
};

/**
 * Get a document template by type
 */
export function getDocumentTemplate(type: IsoDocumentType): DocumentTemplate | null {
  return documentTemplates[type] || null;
}

/**
 * Get all available document templates
 */
export function getAvailableTemplates(): DocumentTemplate[] {
  return Object.values(documentTemplates).filter(Boolean) as DocumentTemplate[];
}

/**
 * Check if a document type is available
 */
export function isTemplateAvailable(type: IsoDocumentType): boolean {
  return documentTemplates[type] !== null;
}

// Document type display names
export const documentTypeLabels: Record<IsoDocumentType, string> = {
  HSE_POLICY: 'HSE Policy & Procedures',
  QUALITY_POLICY: 'Quality Management Policy (ISO 9001)',
  ENVIRONMENTAL_POLICY: 'Environmental Management Policy (ISO 14001)',
  OHS_POLICY: 'Occupational Health & Safety Policy (ISO 45001)',
  IMS_MANUAL: 'Integrated Management System Manual',
};

// Document type descriptions
export const documentTypeDescriptions: Record<IsoDocumentType, string> = {
  HSE_POLICY: 'Combined Health, Safety, and Environment policy aligned with ISO 45001 and ISO 14001',
  QUALITY_POLICY: 'Quality management system documentation aligned with ISO 9001',
  ENVIRONMENTAL_POLICY: 'Environmental management policy aligned with ISO 14001',
  OHS_POLICY: 'Occupational health and safety policy aligned with ISO 45001',
  IMS_MANUAL: 'Integrated management system combining Quality, HSE, and Environmental',
};

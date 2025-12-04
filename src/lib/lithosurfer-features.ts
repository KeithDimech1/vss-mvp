// LithoSurfer Features - Generated from CSV
// This file contains all features that can be assigned to FREE, PRO, or ENTERPRISE tiers

export interface LithoSurferFeature {
  id: string;
  feature: string;
  category: string;
  description: string;
  available: 'now' | 'future';
}

export const lithosurferFeatures: LithoSurferFeature[] = [
  // Data Access
  { id: 'upload-private-data', feature: 'Upload Private Data', category: 'Data Access', description: '', available: 'now' },
  { id: 'view-lithodata-free', feature: 'View Lithodata Free', category: 'Data Access', description: 'Access all Public Available data on the Lithosurfer currently', available: 'now' },
  { id: 'view-lithodata-commercial', feature: 'View Lithodata Commercial', category: 'Data Access', description: 'Purchase Subscription and access in LithoSurfer', available: 'now' },
  { id: 'user-settings', feature: 'User Settings (UI preferences per user)', category: 'Data Access', description: '', available: 'now' },

  // Customization
  { id: 'skins-custom-branding', feature: 'Skins / Custom Branding', category: 'Customization', description: '', available: 'now' },
  { id: 'virtual-custom-portal', feature: 'Virtual Custom Portal (CNAME)', category: 'Customization', description: '', available: 'now' },
  { id: 'dedicated-domain-name', feature: 'Dedicated Domain Name', category: 'Customization', description: '', available: 'now' },

  // LithoBuild
  { id: 'bespoke-csv-ingestion', feature: 'Bespoke CSV Template Ingestion', category: 'LithoBuild', description: 'LithoBuild Project to have rapid import from client datasets', available: 'now' },

  // Collaboration
  { id: 'share-data-publicly', feature: 'Share Data Publicly', category: 'Collaboration', description: '', available: 'now' },
  { id: 'share-data-project-level', feature: 'Share Data Privately - Project Level', category: 'Collaboration', description: 'Add users to a project and share Private data within a project or a institute level', available: 'now' },
  { id: 'share-data-company-level', feature: 'Share Data Privately - Company Level', category: 'Collaboration', description: 'Share data between projects within a company (community level)', available: 'now' },
  { id: 'team-workspaces', feature: 'Team workspaces', category: 'Collaboration', description: '', available: 'now' },
  { id: 'teams-functionality', feature: 'Teams functionality', category: 'Collaboration', description: '', available: 'now' },

  // Tools
  { id: 'paleo-reconstruction-one', feature: 'Paleo Reconstruction (one)', category: 'Tools', description: 'Restricted to a single Paleo Reconstruction', available: 'now' },
  { id: 'paleo-reconstruction-all', feature: 'Paleo Reconstruction (all)', category: 'Tools', description: '', available: 'now' },
  { id: 'paleo-reconstruction-private', feature: 'Paleo Reconstruction (private)', category: 'Tools', description: 'LithoBuild Project in import lithoplate models from clients', available: 'now' },
  { id: 'grid-data', feature: 'Grid Data', category: 'Tools', description: '', available: 'now' },
  { id: 'swath-profile', feature: 'Swath Profile', category: 'Tools', description: '', available: 'now' },
  { id: 'select-area', feature: 'Select Area', category: 'Tools', description: '', available: 'now' },
  { id: 'rock-type', feature: 'Rock Type', category: 'Tools', description: '', available: 'now' },
  { id: 'analysis-type', feature: 'Analysis Type', category: 'Tools', description: '', available: 'now' },
  { id: 'elevation', feature: 'Elevation', category: 'Tools', description: '', available: 'now' },
  { id: 'basemaps', feature: 'Basemaps', category: 'Tools', description: '', available: 'now' },
  { id: 'geophysics-layer-public', feature: 'Geophysics Layer (Public)', category: 'Tools', description: '', available: 'now' },
  { id: 'geophysics-layer-private', feature: 'Geophysics Layer (Private)', category: 'Tools', description: 'Upload privately owned geophysics raster files uploaded to project level', available: 'now' },
  { id: 'contour-lines', feature: 'Contour Lines', category: 'Tools', description: '', available: 'now' },
  { id: '3d-terrain-buildings', feature: '3D terrain and buildings', category: 'Tools', description: '', available: 'now' },
  { id: 'field-app', feature: 'Field App', category: 'Tools', description: 'Use the Applications in the field', available: 'now' },
  { id: 'lithochem-dashboard', feature: 'LithoChem Dashboard', category: 'Tools', description: '', available: 'now' },
  { id: 'exhumation-tool', feature: 'Exhumation tool', category: 'Tools', description: '', available: 'now' },
  { id: 'wms-layer-feed', feature: 'WMS Layer Feed', category: 'Tools', description: '', available: 'now' },
  { id: 'multi-thermochronology', feature: 'Multi-thermochronology layer tool', category: 'Tools', description: '', available: 'now' },
  { id: 'movie-making', feature: 'Movie Making', category: 'Tools', description: '', available: 'now' },
  { id: 'snapshots', feature: 'Snapshots', category: 'Tools', description: '', available: 'now' },
  { id: 'exploration-work-program', feature: 'Exploration Work Program', category: 'Tools', description: 'Interactive tool to plan borehole location, sampling - integrated to accept future samples as they come in. Include costing and price estimates', available: 'future' },

  // Publishing
  { id: 'doi-minting', feature: 'DOI Minting', category: 'Publishing', description: '', available: 'now' },

  // Services
  { id: 'lithoclean-service', feature: 'LithoClean Service', category: 'Services', description: '', available: 'now' },
  { id: 'lithobuild-services', feature: 'LithoBuild Services', category: 'Services', description: '', available: 'now' },

  // Support
  { id: 'support-portal-access', feature: 'Support Portal Access (videos and how to guides)', category: 'Support', description: '', available: 'now' },
  { id: 'lithosurfer-inhouse-training', feature: 'LithoSurfer Inhouse Training', category: 'Support', description: '', available: 'now' },
  { id: 'dedicated-account-manager', feature: 'Dedicated account manager', category: 'Support', description: '', available: 'now' },
  { id: 'priority-support-sla', feature: 'Priority support (SLA)', category: 'Support', description: '', available: 'now' },
  { id: 'email-support', feature: 'Email support', category: 'Support', description: '', available: 'now' },
  { id: 'in-person-onboarding', feature: 'In Person Onboarding Workshop', category: 'Support', description: '', available: 'now' },

  // Admin
  { id: 'admin-controls', feature: 'Admin controls & user management', category: 'Admin', description: '', available: 'now' },
  { id: 'academic-support', feature: 'Academic Support / Consultation', category: 'Admin', description: '', available: 'now' },
  { id: 'project-company-management', feature: 'Project/Company management', category: 'Admin', description: '', available: 'now' },

  // Integration
  { id: 'public-lithodata-api', feature: 'Public Lithodata API', category: 'Integration', description: '', available: 'now' },
  { id: 'private-lithodata-api', feature: 'Private LithoData API - Based on User Access', category: 'Integration', description: '', available: 'now' },
  { id: 'api-documentation', feature: 'API documentation', category: 'Integration', description: '', available: 'now' },
  { id: 'acquire-geobank-adaptors', feature: 'aQuire/GeoBank/Micromine adaptors', category: 'Integration', description: '', available: 'now' },

  // Projects
  { id: 'unlimited-projects', feature: 'Unlimited projects', category: 'Projects', description: '', available: 'now' },
  { id: 'single-project', feature: 'Single Project', category: 'Projects', description: '', available: 'now' },
  { id: 'project-workspace', feature: 'LithoSurfer Project Workspace (community forum)', category: 'Projects', description: 'A team collaboration, project management and notes portal for field work', available: 'now' },

  // Training
  { id: 'custom-training-onboarding', feature: 'Custom training & onboarding', category: 'Training', description: '', available: 'now' },
  { id: 'onboarding-workshop', feature: 'Onboarding Workshop', category: 'Training', description: '', available: 'now' },

  // Security
  { id: 'sso-saml', feature: 'SSO/SAML integration', category: 'Security', description: '', available: 'now' },

  // Visuals
  { id: 'custom-visualization', feature: 'Custom visualization templates', category: 'Visuals', description: 'LithoBuild for enterprise customer to have bespoke analysis packages', available: 'now' },

  // Core
  { id: 'basic-search', feature: 'Basic search functionality', category: 'Core', description: '', available: 'now' },

  // Community
  { id: 'public-community-forum', feature: 'Public community forum access', category: 'Community', description: '', available: 'now' },

  // Export
  { id: 'shape-file-export', feature: 'Shape File Export', category: 'Export', description: '', available: 'now' },
  { id: 'full-data-export', feature: 'Full data export (CSV Excel)', category: 'Export', description: '', available: 'now' },

  // Analysis
  { id: 'lithoai-tools', feature: 'LithoAI Tools', category: 'Analysis', description: '', available: 'future' },
  { id: 'project-reporting-tools', feature: 'Project Reporting Tools', category: 'Analysis', description: '', available: 'future' },

  // Data Import
  { id: 'upload-raster-maps', feature: 'Upload Raster maps/layers', category: 'Data Import', description: '', available: 'future' },

  // Pricing
  { id: 'lithodata-discounts', feature: 'LithoData discounts', category: 'Pricing', description: '', available: 'now' },
  { id: 'lithomine-discounts', feature: 'LithoMine discounts', category: 'Pricing', description: '', available: 'now' },

  // Features
  { id: 'group-packages', feature: 'Group Packages', category: 'Features', description: '', available: 'now' },

  // Commerce
  { id: 'purchase-commercial-data', feature: 'Purchase Commercial Data Instantly', category: 'Commerce', description: '', available: 'now' },
];

// Get all unique categories
export const featureCategories = Array.from(new Set(lithosurferFeatures.map(f => f.category))).sort();

// Tier type
export type TierName = 'free' | 'pro' | 'enterprise' | 'unassigned';

// Default tier assignments (empty - all start unassigned)
export const defaultTierAssignments: Record<string, TierName> = {};

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
  // Data Access (includes Export, Data Import)
  { id: 'upload-private-data', feature: 'Upload Private Data', category: 'Data Access', description: '', available: 'now' },
  { id: 'view-lithodata-free', feature: 'View Lithodata Free', category: 'Data Access', description: 'Access all Public Available data on the Lithosurfer currently', available: 'now' },
  { id: 'view-lithodata-commercial', feature: 'View Lithodata Commercial', category: 'Data Access', description: 'Purchase Subscription and access in LithoSurfer', available: 'now' },
  { id: 'user-settings', feature: 'User Settings (UI preferences per user)', category: 'Data Access', description: '', available: 'now' },
  { id: 'shape-file-export', feature: 'Shape File Export', category: 'Data Access', description: '', available: 'now' },
  { id: 'full-data-export', feature: 'Full data export (CSV Excel)', category: 'Data Access', description: '', available: 'now' },
  { id: 'upload-raster-maps', feature: 'Upload Raster maps/layers', category: 'Data Access', description: '', available: 'future' },

  // Customization
  { id: 'skins-custom-branding', feature: 'Skins / Custom Branding', category: 'Customization', description: '', available: 'now' },
  { id: 'custom-cname', feature: 'Custom CNAME', category: 'Customization', description: 'Subdomain hosting for your LithoSurfer portal (e.g., yourcompany.lithosurfer.com)', available: 'now' },
  { id: 'custom-url', feature: 'Custom URL/Domain', category: 'Customization', description: 'Full custom domain for your organization (e.g., geo.yourcompany.com)', available: 'now' },

  // Collaboration (includes Community)
  { id: 'share-data-publicly', feature: 'Share Data Publicly', category: 'Collaboration', description: 'Contribute to the global EarthBank repository and scientific community', available: 'now' },
  { id: 'share-data-project-level', feature: 'Share Data Privately - Project Level', category: 'Collaboration', description: 'Add users to a project and share Private data within a project or a institute level', available: 'now' },
  { id: 'share-data-company-level', feature: 'Share Data Privately - Company Level', category: 'Collaboration', description: 'Share data between projects within a company (community level)', available: 'now' },
  { id: 'team-workspaces', feature: 'Team workspaces', category: 'Collaboration', description: 'Collaborative workspace for your team (PRO: 1 project, ENTERPRISE: unlimited ring-fenced projects)', available: 'now' },
  { id: 'teams-functionality', feature: 'Teams functionality', category: 'Collaboration', description: '', available: 'now' },
  { id: 'public-community-forum', feature: 'Public community forum access', category: 'Collaboration', description: '', available: 'now' },

  // Tools (includes Publishing, Visuals, Core, Analysis)
  { id: 'paleo-reconstruction-one', feature: 'Paleo Reconstruction (one)', category: 'Tools', description: 'Access to paleogeographic reconstruction models for geological analysis', available: 'now' },
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
  { id: 'snapshots', feature: 'Snapshots', category: 'Tools', description: 'Export videos and screenshots of your data visualizations for reports and presentations', available: 'now' },
  { id: 'exploration-work-program', feature: 'Exploration Work Program', category: 'Tools', description: 'Interactive tool to plan borehole location, sampling - integrated to accept future samples as they come in. Include costing and price estimates', available: 'future' },
  { id: 'doi-minting', feature: 'DOI Minting', category: 'Tools', description: '', available: 'now' },
  { id: 'custom-visualization', feature: 'Custom visualization templates', category: 'Tools', description: 'LithoBuild for enterprise customer to have bespoke analysis packages', available: 'now' },
  { id: 'basic-search', feature: 'Basic search functionality', category: 'Tools', description: '', available: 'now' },
  { id: 'lithoai-tools', feature: 'LithoAI Tools', category: 'Tools', description: 'AI-powered analysis tools including machine learning models and intelligent data insights', available: 'future' },

  // Services (includes LithoBuild services)
  { id: 'lithoclean-service', feature: 'LithoClean Service', category: 'Services', description: '', available: 'now' },
  { id: 'lithobuild-services', feature: 'LithoBuild Services', category: 'Services', description: '', available: 'now' },
  { id: 'bespoke-csv-ingestion', feature: 'Bespoke CSV Template Ingestion', category: 'Services', description: 'LithoBuild Project to have rapid import from client datasets', available: 'now' },

  // Support (includes Training)
  { id: 'support-portal-access', feature: 'Support Portal Access (videos and how to guides)', category: 'Support', description: 'Dedicated help center with documentation, tutorials, and PRO tool guides', available: 'now' },
  { id: 'lithosurfer-inhouse-training', feature: 'LithoSurfer Inhouse Training', category: 'Support', description: '', available: 'now' },
  { id: 'dedicated-account-manager', feature: 'Dedicated account manager', category: 'Support', description: '', available: 'now' },
  { id: 'priority-support-sla', feature: 'Priority support (SLA)', category: 'Support', description: '', available: 'now' },
  { id: 'email-support', feature: 'Email support', category: 'Support', description: '', available: 'now' },
  { id: 'in-person-onboarding', feature: 'In Person Onboarding Workshop', category: 'Support', description: '', available: 'now' },
  { id: 'custom-training-onboarding', feature: 'Custom training & onboarding', category: 'Support', description: '', available: 'now' },
  { id: 'onboarding-workshop', feature: 'Onboarding Workshop', category: 'Support', description: '', available: 'now' },

  // Admin (includes Security)
  { id: 'admin-controls', feature: 'Admin controls & user management', category: 'Admin', description: 'User management and access control - add/remove team members and set project permissions', available: 'now' },
  { id: 'academic-support', feature: 'Academic Support / Consultation', category: 'Admin', description: '', available: 'now' },
  { id: 'lithosurfer-project-interface', feature: 'LithoSurfer Project Interface', category: 'Admin', description: 'Complete project management suite for mining operations - track drilling, samples, lab results, and field data in real-time', available: 'future' },
  { id: 'sso-saml', feature: 'SSO/SAML integration', category: 'Admin', description: 'Enterprise single sign-on with multi-factor authentication for enhanced security', available: 'now' },

  // Integration
  { id: 'public-lithodata-api', feature: 'Public Lithodata API', category: 'Integration', description: '', available: 'now' },
  { id: 'private-lithodata-api', feature: 'Private LithoData API - Based on User Access', category: 'Integration', description: '', available: 'now' },
  { id: 'api-documentation', feature: 'API documentation', category: 'Integration', description: '', available: 'now' },

  // Projects
  { id: 'unlimited-projects', feature: 'Unlimited projects', category: 'Projects', description: '', available: 'now' },
  { id: 'single-project', feature: 'Single Project', category: 'Projects', description: '', available: 'now' },

  // Pricing (includes Commerce, Features)
  { id: 'lithodata-discounts', feature: 'LithoData discounts', category: 'Pricing', description: '', available: 'now' },
  { id: 'lithomine-discounts', feature: 'LithoMine discounts', category: 'Pricing', description: '', available: 'now' },
  { id: 'purchase-commercial-data', feature: 'Purchase Commercial Data Instantly', category: 'Pricing', description: '', available: 'now' },
];

// Get all unique categories
export const featureCategories = Array.from(new Set(lithosurferFeatures.map(f => f.category))).sort();

// Tier type
export type TierName = 'free' | 'pro' | 'enterprise' | 'unassigned';

// Default tier assignments (empty - all start unassigned)
export const defaultTierAssignments: Record<string, TierName> = {};

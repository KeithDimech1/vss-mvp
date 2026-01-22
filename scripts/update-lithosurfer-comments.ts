// Script to update LithoSurfer feature comments in the database
// Run with: npx tsx scripts/update-lithosurfer-comments.ts

import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

const prisma = new PrismaClient();

const updatedComments = {
  "paleo-reconstruction-one": {
    "suggestion": "No models in FREE tier. This is a clear benefit for PRO.",
    "development": ""
  },
  "share-data-publicly": {
    "suggestion": "Publishing data has very little commercial value - this is an EarthBank feature. Keep in FREE.",
    "development": ""
  },
  "team-workspaces": {
    "suggestion": "Key PRO upgrade feature. FREE: No team workspaces (solo only). PRO: 1 project workspace, multiple users. ENTERPRISE: Multiple ring-fenced projects, pay per user.",
    "development": ""
  },
  "sso-saml": {
    "suggestion": "",
    "development": "SSO/SAML, MFA, and 2FA are high priority security features."
  },
  "custom-cname": {
    "suggestion": "Renamed from virtual-custom-portal. This is CNAME subdomain setup.",
    "development": ""
  },
  "custom-url": {
    "suggestion": "Renamed from dedicated-domain-name. This is full custom URL/domain (different from CNAME).",
    "development": ""
  },
  "bespoke-csv-ingestion": {
    "suggestion": "Custom CSV mapping for different laboratory formats. Map lab CSV outputs to EarthBank templates for quick import.",
    "development": "Create custom mappings for PRO/ENTERPRISE customers with specific lab formats."
  },
  "lithosurfer-project-interface": {
    "suggestion": "Comprehensive project management interface for mining companies. Track boring/drilling locations, drilling rates, sample results (on-the-fly), lab reports, quality data, on-site geological logs, color observations, photos. Output reports about actual mining project (not just sample results).",
    "development": "Future integration - not MVP. Workflow integration for mining companies to plan projects."
  },
  "lithoai-tools": {
    "suggestion": "AI integration tools - LLMs, machine learning, AI plugins and features within LithoSurfer.",
    "development": "Future AI-powered functionality."
  },
  "admin-controls": {
    "suggestion": "Admin rights for PRO/ENTERPRISE. Add/remove users, block people from projects, control access to different parts of projects.",
    "development": "Likely already implemented."
  },
  "support-portal-access": {
    "suggestion": "Support portal with documentation about the app and PRO tools.",
    "development": "Content creation required for help/knowledge base."
  },
  "snapshots": {
    "suggestion": "Videos and photos of the application that can be imported into reports or presentations. PRO/ENTERPRISE feature (NOT FREE).",
    "development": "Could be expanded in future."
  }
};

async function main() {
  console.log('Updating LithoSurfer feature comments...\n');

  try {
    // Get existing ENTERPRISE tier for lithosurfer
    const existingTier = await prisma.productTierConfig.findUnique({
      where: {
        productType_tierName: {
          productType: 'lithosurfer',
          tierName: 'ENTERPRISE'
        }
      }
    });

    if (!existingTier) {
      console.log('❌ ENTERPRISE tier not found for lithosurfer');
      return;
    }

    // Parse existing restrictions
    let restrictionsObj: Record<string, unknown> = {};
    if (existingTier.restrictions) {
      try {
        restrictionsObj = JSON.parse(existingTier.restrictions);
      } catch (e) {
        console.log('⚠️  Could not parse existing restrictions, starting fresh');
      }
    }

    // Update with new comments
    restrictionsObj.featureComments = updatedComments;

    // Update database
    await prisma.productTierConfig.update({
      where: {
        productType_tierName: {
          productType: 'lithosurfer',
          tierName: 'ENTERPRISE'
        }
      },
      data: {
        restrictions: JSON.stringify(restrictionsObj),
        lastEditedAt: new Date()
      }
    });

    console.log('✅ Successfully updated feature comments!');
    console.log(`\nUpdated ${Object.keys(updatedComments).length} feature comments:`);
    Object.keys(updatedComments).forEach(key => {
      console.log(`  - ${key}`);
    });

  } catch (error) {
    console.error('❌ Error updating comments:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const lithosurferTiers = [
  {
    productType: 'lithosurfer',
    tierName: 'free',
    price: '$0',
    priceNote: null,
    target: 'Students, hobbyists, researchers exploring platform',
    source: null,
    featuresIn: [
      { category: 'Data Access', feature: 'Public data access', note: 'Read-only' },
      { category: 'Data Access', feature: 'Private data upload', note: null },
      { category: 'Data Access', feature: 'Personal packages (private)', note: null },
      { category: 'Visuals', feature: 'Basic graphs and visualizations', note: null },
      { category: 'Core', feature: 'Single project workspace', note: null },
      { category: 'Core', feature: 'Basic search functionality', note: null },
      { category: 'Community', feature: 'Community forum access', note: null }
    ],
    featuresOut: [
      { category: 'Export', feature: 'Data export', upgradePath: 'Pro' },
      { category: 'Analysis', feature: 'Advanced analytics', upgradePath: 'Pro' },
      { category: 'Collaboration', feature: 'Team collaboration', upgradePath: 'Enterprise' },
      { category: 'Support', feature: 'Priority support', upgradePath: 'Enterprise' },
      { category: 'Projects', feature: 'Multiple projects', upgradePath: 'Pro' }
    ],
    restrictions: 'Single project only. Cannot publish to public. Basic graphs only.',
    keyDifferentiator: 'Free forever entry point for exploration'
  },
  {
    productType: 'lithosurfer',
    tierName: 'pro',
    price: '$2,500 - $5,000/year',
    priceNote: 'Pricing under debate - needs final decision',
    target: 'Professional researchers, small labs, consultants',
    source: null,
    featuresIn: [
      { category: 'Data Access', feature: 'All Free tier features', note: null },
      { category: 'Data Access', feature: 'Private data upload', note: null },
      { category: 'Export', feature: 'Full data export (CSV, Excel)', note: null },
      { category: 'Analysis', feature: 'Advanced analytics & reporting', note: null },
      { category: 'Projects', feature: 'Multiple projects (3-5)', note: null },
      { category: 'Visuals', feature: 'Custom visualization templates', note: null },
      { category: 'Publish', feature: 'Publish packages to public', note: null },
      { category: 'Support', feature: 'Email support', note: null }
    ],
    featuresOut: [
      { category: 'Collaboration', feature: 'Team workspaces', upgradePath: 'Enterprise' },
      { category: 'Admin', feature: 'Admin controls & user management', upgradePath: 'Enterprise' },
      { category: 'Integration', feature: 'API access', upgradePath: 'Enterprise' },
      { category: 'Support', feature: 'Dedicated account manager', upgradePath: 'Enterprise' },
      { category: 'Training', feature: 'Custom training sessions', upgradePath: 'Enterprise' }
    ],
    restrictions: 'Individual use only. No team features.',
    keyDifferentiator: 'Full professional toolkit for individual researchers'
  },
  {
    productType: 'lithosurfer',
    tierName: 'enterprise',
    price: '$10,000+/year',
    priceNote: 'Custom pricing based on team size and needs',
    target: 'Large organizations, universities, mining companies',
    source: null,
    featuresIn: [
      { category: 'Data Access', feature: 'All Pro tier features', note: null },
      { category: 'Data Access', feature: 'Private data upload', note: null },
      { category: 'Collaboration', feature: 'Team workspaces', note: null },
      { category: 'Admin', feature: 'Admin controls & user management', note: null },
      { category: 'Integration', feature: 'Full API access', note: null },
      { category: 'Projects', feature: 'Unlimited projects', note: null },
      { category: 'Support', feature: 'Dedicated account manager', note: null },
      { category: 'Support', feature: 'Priority support (SLA)', note: null },
      { category: 'Training', feature: 'Custom training & onboarding', note: null },
      { category: 'Security', feature: 'SSO/SAML integration', note: null },
      { category: 'Security', feature: 'Custom data retention policies', note: null }
    ],
    featuresOut: [],
    restrictions: null,
    keyDifferentiator: 'Full organizational solution with dedicated support'
  }
];

const lithodataTiers = [
  {
    productType: 'lithodata',
    tierName: 'free',
    price: '$0',
    priceNote: null,
    target: 'Researchers browsing/discovering data',
    source: 'Public domain and openly shared datasets',
    featuresIn: [
      { category: 'Data Access', feature: 'Browse public datasets', note: null },
      { category: 'Data Access', feature: 'Private data upload', note: null },
      { category: 'Search', feature: 'Basic search and filtering', note: null },
      { category: 'Preview', feature: 'Dataset previews', note: null },
      { category: 'Community', feature: 'Community discussions', note: null }
    ],
    featuresOut: [
      { category: 'Download', feature: 'Full dataset downloads', upgradePath: 'Premium' },
      { category: 'Export', feature: 'Export to analysis tools', upgradePath: 'Premium' },
      { category: 'Sell', feature: 'List data for sale', upgradePath: 'Marketplace' },
      { category: 'Analytics', feature: 'Usage analytics', upgradePath: 'Premium' }
    ],
    restrictions: 'Preview only, no full downloads',
    keyDifferentiator: 'Discover and explore available datasets'
  },
  {
    productType: 'lithodata',
    tierName: 'premium',
    price: '$1,000 - $3,000/year',
    priceNote: 'Based on download volume and features',
    target: 'Active researchers needing data access',
    source: 'Curated academic and institutional datasets',
    featuresIn: [
      { category: 'Data Access', feature: 'All Free tier features', note: null },
      { category: 'Data Access', feature: 'Private data upload', note: null },
      { category: 'Download', feature: 'Full dataset downloads', note: null },
      { category: 'Export', feature: 'Export to CSV, Excel, analysis tools', note: null },
      { category: 'Analytics', feature: 'Download history & tracking', note: null },
      { category: 'Support', feature: 'Priority support', note: null },
      { category: 'Features', feature: 'Saved searches & alerts', note: null }
    ],
    featuresOut: [
      { category: 'Sell', feature: 'List data for sale', upgradePath: 'Marketplace' },
      { category: 'Revenue', feature: 'Revenue from data sales', upgradePath: 'Marketplace' },
      { category: 'Premium Access', feature: 'Premium marketplace datasets', upgradePath: 'Marketplace' }
    ],
    restrictions: 'Cannot sell data. Download limits may apply.',
    keyDifferentiator: 'Full access to download and use datasets'
  },
  {
    productType: 'lithodata',
    tierName: 'marketplace',
    price: '30% Commission',
    priceNote: 'Lithodat takes 30% of each sale',
    target: 'Data providers, labs, consultants with valuable data',
    source: 'Proprietary datasets from sellers',
    featuresIn: [
      { category: 'Data Access', feature: 'All Premium tier features', note: null },
      { category: 'Data Access', feature: 'Private data upload', note: null },
      { category: 'Sell', feature: 'List datasets for sale', note: null },
      { category: 'Revenue', feature: '70% revenue share on sales', note: null },
      { category: 'Tools', feature: 'Seller dashboard & analytics', note: null },
      { category: 'Tools', feature: 'Pricing control', note: null },
      { category: 'Tools', feature: 'License management', note: null },
      { category: 'Support', feature: 'Seller support & promotion', note: null }
    ],
    featuresOut: [],
    restrictions: 'Must meet data quality standards. Subject to review.',
    keyDifferentiator: 'Monetize your geoscience data'
  }
];

async function main() {
  console.log('Seeding product tier configurations...');

  // Seed LithoSurfer tiers
  for (const tier of lithosurferTiers) {
    await prisma.productTierConfig.upsert({
      where: {
        productType_tierName: {
          productType: tier.productType,
          tierName: tier.tierName
        }
      },
      update: tier,
      create: tier
    });
    console.log(`  ✓ ${tier.productType} - ${tier.tierName}`);
  }

  // Seed LithoData tiers
  for (const tier of lithodataTiers) {
    await prisma.productTierConfig.upsert({
      where: {
        productType_tierName: {
          productType: tier.productType,
          tierName: tier.tierName
        }
      },
      update: tier,
      create: tier
    });
    console.log(`  ✓ ${tier.productType} - ${tier.tierName}`);
  }

  console.log('\nProduct tier seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

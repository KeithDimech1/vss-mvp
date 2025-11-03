import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Abbreviated versions of draft answers for testing
const draftAnswers = {
  q1_operational_units: `Lithodat currently operates three primary operational units:

1. LithoSurfer (Front-End Platform) - Core software product for geological data management
2. LithoBuild (Custom Development) - Software development consulting and custom tools
3. LithoData (Back-End Data Services) - Data collection, cleaning, and curation
4. LithoAI (Future/Emerging) - AI-powered prospectivity analysis (planned)`,

  q2_unit_independence: `No, units are highly interdependent.

LithoSurfer depends on LithoData for content, LithoBuild shares developers with other units, and LithoData serves both internal and external customers.

Independence scores:
- LithoBuild: 85% (highly autonomous)
- LithoSurfer: 70% (good independence)
- LithoData: 50% (moderate dependencies)`,

  q3_outputs_customers: `Mixed clarity - varies significantly by unit:

**LithoSurfer:** Very clear - Exploration companies needing data visualization (9/10 clarity)
**LithoBuild:** Crystal clear - Mining/exploration companies with custom needs (10/10 clarity)
**LithoData:** Less clear - Internal customer (Surfer) clear, external customers need definition (5/10 clarity)`,

  q4_resources_control: `Limited control - mostly centralized.

Units have minimal budget autonomy, no independent hiring, and shared resource pools. Directors make most allocation decisions.

Current model is ~70% centralized / 30% autonomous.`,

  q5_performance_measurement: `Informal and incomplete - varies by unit:

**LithoBuild:** Well measured (7/10) - revenue, delivery, quality tracked
**LithoSurfer:** Partially measured (3/10) - basic dev tracking, no product metrics
**LithoData:** Poorly measured (2/10) - minimal tracking, needs instrumentation`,

  q6_coordination: `Fair coordination with gaps.

Units coordinate ad-hoc through Signal/Jira, but no systematic coordination mechanism. Mostly works for Build, less clear for Data/Surfer integration.

Needs more formal System 2 (coordination) structure.`,

  q7_operational_challenges: `Key challenges by unit:

**LithoSurfer:** Customer acquisition & go-to-market strategy
**LithoBuild:** Strategic misalignment (temporary but primary revenue)
**LithoData:** Unclear value proposition and monetization model

Cross-unit: Resource contention, shared capacity, unclear priorities.`,

  q8_autonomy_vs_standardization: `Currently: More centralized than autonomous (30% autonomy / 70% centralization)

Should standardize: Values, brand, security, financial practices, core tech standards
Should be autonomous: Technical implementation, process/workflow, customer interactions

Needs rebalancing toward more unit autonomy with clear standards.`,

  q9_capacity_utilization: `Mixed capacity utilization:

**LithoBuild:** OVERCAPACITY (85%+) - primary revenue generator
**LithoSurfer:** UNDERCAPACITY (40-50%) - needs more resources
**LithoData:** UNCLEAR - no formal tracking

Overall: Misaligned - need to reallocate from Build to Surfer/Data.`,

  q10_unit_viability: `Not all units viable long-term:

**LithoSurfer:** VIABLE - high potential, needs investment
**LithoBuild:** NOT VIABLE LONG-TERM - planned 18-24 month sunset
**LithoData:** VIABLE with restructuring - strategic asset
**LithoAI:** DEFER - wait 12-18 months until foundations solid`,
};

async function seedTestAssessments() {
  console.log('🌱 Seeding test assessment data...\n');

  try {
    // Get users for testing
    const fabian = await prisma.user.findUnique({ where: { username: 'fabian' } });
    const wayne = await prisma.user.findUnique({ where: { username: 'wayne' } });
    const moritz = await prisma.user.findUnique({ where: { username: 'moritz' } });

    if (!fabian || !wayne || !moritz) {
      console.error('❌ Could not find required users');
      return;
    }

    // 1. Fabian - Completed assessment (all 10 questions)
    const existingFabian = await prisma.assessment.findFirst({ where: { userId: fabian.id } });
    if (!existingFabian) {
      await prisma.assessment.create({
        data: {
          userId: fabian.id,
          responses: draftAnswers,
          completed: true,
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
      });
      console.log(`✅ Created completed assessment for ${fabian.fullName}`);
    } else {
      console.log(`⏭️  ${fabian.fullName} already has an assessment`);
    }

    // 2. Wayne - In progress (6/10 questions answered)
    const wayneResponses = {
      q1_operational_units: draftAnswers.q1_operational_units,
      q2_unit_independence: draftAnswers.q2_unit_independence,
      q3_outputs_customers: draftAnswers.q3_outputs_customers,
      q4_resources_control: draftAnswers.q4_resources_control,
      q5_performance_measurement: draftAnswers.q5_performance_measurement,
      q6_coordination: draftAnswers.q6_coordination,
    };

    const existingWayne = await prisma.assessment.findFirst({ where: { userId: wayne.id } });
    if (!existingWayne) {
      await prisma.assessment.create({
        data: {
          userId: wayne.id,
          responses: wayneResponses,
          completed: false,
          submittedAt: null,
        },
      });
      console.log(`✅ Created in-progress assessment for ${wayne.fullName} (6/10 questions)`);
    } else {
      console.log(`⏭️  ${wayne.fullName} already has an assessment`);
    }

    // 3. Moritz - Just started (2/10 questions answered)
    const moritzResponses = {
      q1_operational_units: draftAnswers.q1_operational_units,
      q2_unit_independence: draftAnswers.q2_unit_independence,
    };

    const existingMoritz = await prisma.assessment.findFirst({ where: { userId: moritz.id } });
    if (!existingMoritz) {
      await prisma.assessment.create({
        data: {
          userId: moritz.id,
          responses: moritzResponses,
          completed: false,
          submittedAt: null,
        },
      });
      console.log(`✅ Created early-stage assessment for ${moritz.fullName} (2/10 questions)`);
    } else {
      console.log(`⏭️  ${moritz.fullName} already has an assessment`);
    }

    console.log('\n✅ Test assessment data seeded successfully!');
    console.log('\nSummary:');
    console.log(`  - ${fabian.fullName}: Completed (10/10)`);
    console.log(`  - ${wayne.fullName}: In Progress (6/10)`);
    console.log(`  - ${moritz.fullName}: Just Started (2/10)`);
    console.log(`  - Keith Dimech: Completed (10/10) - existing\n`);
  } catch (error) {
    console.error('❌ Error seeding assessments:', error);
    throw error;
  }
}

seedTestAssessments()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

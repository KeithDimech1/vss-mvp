import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Helper to parse CSV with proper quoting support
function parseCSV(content: string): string[][] {
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentField.trim());
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      currentLine.push(currentField.trim());
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Push remaining field and line
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    lines.push(currentLine);
  }

  return lines;
}

// Parse Employee Feedback Survey CSV
async function seedFeedbackSurvey() {
  console.log('\n📋 Seeding Employee Feedback Survey...');

  const csvPath = path.join(
    process.cwd(),
    'build-data/hr review/documentation/Employee_Feedback_Survey_2025.csv'
  );

  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = parseCSV(content);

  // Skip header row
  const headers = lines[0];
  const dataRows = lines.slice(1);

  console.log(`Found ${dataRows.length} responses to import`);

  // Email to username mapping (from your team roster)
  const emailToUsername: Record<string, string> = {
    'moritz.theile@lithosurfer.io': 'moritz',
    'Wayne/Vinko': 'wayne', // Combined response
    'Fabian': 'fabian',
    '': 'xinyan', // Row 5 - Chinese team member (based on content)
    'Keith Dimech': 'keith',
    'tarun.sengar@lithodat.com': 'tarun',
    'nirali.dudharejiya@lithodat.com': 'nirali',
    'juan.baca@lithodat.com': 'juan',
    'perla.luque@lithodat.com': 'perla',
    'alejandra.bedoyamejia@lithodat.com': 'alejandra',
    'raul.lugo@lithodat.com': 'raul',
    'benjamindib03@gmail.com': 'benjamin',
    'kristy.kohlmann@lithodat.com': 'kristy',
  };

  let imported = 0;
  let skipped = 0;

  for (const row of dataRows) {
    const [
      timestamp,
      email,
      enjoyedPart,
      lessOfPart,
      autonomyRating,
      motivationRating,
      teamConnection,
      wideLithodatConnection,
      supportRating,
      proudAchievement,
      wishRecognised,
      toolsEffectiveness,
      collaborationEase,
      toolsUsed,
      aiUsageWorkflow,
      aiToolsToExplore,
      inefficiencies,
      toolsCreated,
      externalLearnings,
      careerPathClarity,
      skillDevelopmentSupport,
      skillToGrow,
      rolesInterested,
      growthSupport,
      greatYearVision,
      excitedProjects,
      smallGoals,
      additionalSharing,
    ] = row;

    const username = emailToUsername[email] || emailToUsername[email.toLowerCase()];

    if (!username) {
      console.log(`⚠️  Skipping row - could not map email "${email}" to username`);
      skipped++;
      continue;
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log(`⚠️  Skipping ${username} - user not found in database`);
      skipped++;
      continue;
    }

    // Parse timestamp (DD/MM/YYYY HH:MM:SS)
    const [datePart, timePart] = timestamp.split(' ');
    const [day, month, year] = datePart.split('/');
    const parsedTimestamp = new Date(`${year}-${month}-${day}T${timePart}`);

    // Upsert feedback survey
    await prisma.hRFeedbackSurvey.upsert({
      where: { userId: user.id },
      update: {
        timestamp: parsedTimestamp,
        enjoyedPart,
        lessOfPart,
        autonomyRating: autonomyRating ? parseInt(autonomyRating) : null,
        motivationRating: motivationRating ? parseInt(motivationRating) : null,
        teamConnection: teamConnection ? parseInt(teamConnection) : null,
        wideLithodatConnection: wideLithodatConnection ? parseInt(wideLithodatConnection) : null,
        supportRating: supportRating ? parseInt(supportRating) : null,
        proudAchievement,
        wishRecognised,
        toolsEffectiveness: toolsEffectiveness ? parseInt(toolsEffectiveness) : null,
        collaborationEase: collaborationEase ? parseInt(collaborationEase) : null,
        toolsUsed,
        aiUsageWorkflow,
        aiToolsToExplore,
        inefficiencies,
        toolsCreated,
        externalLearnings,
        careerPathClarity: careerPathClarity ? parseInt(careerPathClarity) : null,
        skillDevelopmentSupport: skillDevelopmentSupport
          ? parseInt(skillDevelopmentSupport)
          : null,
        skillToGrow,
        rolesInterested,
        growthSupport,
        greatYearVision,
        excitedProjects,
        smallGoals,
        additionalSharing,
      },
      create: {
        userId: user.id,
        timestamp: parsedTimestamp,
        enjoyedPart,
        lessOfPart,
        autonomyRating: autonomyRating ? parseInt(autonomyRating) : null,
        motivationRating: motivationRating ? parseInt(motivationRating) : null,
        teamConnection: teamConnection ? parseInt(teamConnection) : null,
        wideLithodatConnection: wideLithodatConnection ? parseInt(wideLithodatConnection) : null,
        supportRating: supportRating ? parseInt(supportRating) : null,
        proudAchievement,
        wishRecognised,
        toolsEffectiveness: toolsEffectiveness ? parseInt(toolsEffectiveness) : null,
        collaborationEase: collaborationEase ? parseInt(collaborationEase) : null,
        toolsUsed,
        aiUsageWorkflow,
        aiToolsToExplore,
        inefficiencies,
        toolsCreated,
        externalLearnings,
        careerPathClarity: careerPathClarity ? parseInt(careerPathClarity) : null,
        skillDevelopmentSupport: skillDevelopmentSupport
          ? parseInt(skillDevelopmentSupport)
          : null,
        skillToGrow,
        rolesInterested,
        growthSupport,
        greatYearVision,
        excitedProjects,
        smallGoals,
        additionalSharing,
      },
    });

    console.log(`✓ Imported feedback survey for ${username}`);
    imported++;
  }

  console.log(`✅ Imported ${imported} feedback surveys, skipped ${skipped}`);
}

// Parse Goal Setting CSV
async function seedGoalSetting() {
  console.log('\n🎯 Seeding Goal Setting...');

  const csvPath = path.join(
    process.cwd(),
    'build-data/hr review/documentation/Goal Setting/Annual Goal Setting for Lithodat Employees (Responses) - Form responses 1.csv'
  );

  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = parseCSV(content);

  // Skip header row
  const headers = lines[0];
  const dataRows = lines.slice(1);

  console.log(`Found ${dataRows.length} goal setting responses to import`);

  // Email to username mapping
  const emailToUsername: Record<string, string> = {
    'moritz.theile@lithodat.com': 'moritz',
    'wayne.noble@lithodat.com': 'wayne',
    'fabian.kohlmann@lithodat.com': 'fabian',
    'tarun.sengar@lithodat.com': 'tarun',
    'nirali.dudharejiya@lithodat.com': 'nirali',
    'xinyan.zhang@lithodat.com': 'xinyan',
    'kristy.kohlmann@lithodat.com': 'kristy',
    'lujia.yang@lithodat.com': 'lujia',
  };

  let imported = 0;
  let skipped = 0;

  for (const row of dataRows) {
    const [
      timestamp,
      email,
      employeeName,
      goal1Title,
      goal2Title,
      goal3Title,
      personalGoalTitle,
      checkInPreference,
    ] = row;

    const username = emailToUsername[email];

    if (!username) {
      console.log(`⚠️  Skipping row - could not map email "${email}" to username`);
      skipped++;
      continue;
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log(`⚠️  Skipping ${username} - user not found in database`);
      skipped++;
      continue;
    }

    // Parse timestamp
    const [datePart, timePart] = timestamp.split(' ');
    const [day, month, year] = datePart.split('/');
    const parsedTimestamp = new Date(`${year}-${month}-${day}T${timePart}`);

    // Parse check-in preferences (can be comma-separated)
    const checkInPreferences = checkInPreference
      ? checkInPreference.split(',').map((pref) => pref.trim())
      : [];

    // Upsert goal setting
    await prisma.hRGoalSetting.upsert({
      where: { userId: user.id },
      update: {
        timestamp: parsedTimestamp,
        professionalGoal1Title: goal1Title || null,
        professionalGoal1Description: goal1Title || null, // Combined in CSV
        professionalGoal2Title: goal2Title || null,
        professionalGoal2Description: goal2Title || null,
        professionalGoal3Title: goal3Title || null,
        professionalGoal3Description: goal3Title || null,
        personalGoalTitle: personalGoalTitle || null,
        personalGoalDescription: personalGoalTitle || null,
        checkInPreferences: checkInPreferences,
      },
      create: {
        userId: user.id,
        timestamp: parsedTimestamp,
        professionalGoal1Title: goal1Title || null,
        professionalGoal1Description: goal1Title || null,
        professionalGoal2Title: goal2Title || null,
        professionalGoal2Description: goal2Title || null,
        professionalGoal3Title: goal3Title || null,
        professionalGoal3Description: goal3Title || null,
        personalGoalTitle: personalGoalTitle || null,
        personalGoalDescription: personalGoalTitle || null,
        checkInPreferences: checkInPreferences,
      },
    });

    console.log(`✓ Imported goal setting for ${username}`);
    imported++;
  }

  console.log(`✅ Imported ${imported} goal settings, skipped ${skipped}`);
}

// Parse Interview Notes markdown files
async function seedInterviewNotes() {
  console.log('\n💬 Seeding Interview Notes...');

  const interviewDir = path.join(
    process.cwd(),
    'build-data/hr review/documentation/Interview'
  );

  const files = fs.readdirSync(interviewDir).filter((f) => f.endsWith('.md'));

  console.log(`Found ${files.length} interview note files`);

  // Filename to username mapping
  const filenameToUsername: Record<string, string> = {
    'juan-interview.md': 'juan',
    'juan.md': 'juan',
    'kristy.md': 'kristy',
    'raul.md': 'raul',
    'christina.md': 'aida', // Aida Cristina
    'tarun.md': 'tarun',
    'nora.md': 'lujia', // Nora (Lujia)
    'kimberly.md': 'unknown', // Not in current roster
    'perla.md': 'perla',
    'Benjamin Dib.md': 'benjamin',
  };

  let imported = 0;
  let skipped = 0;

  for (const file of files) {
    const username = filenameToUsername[file];

    if (!username || username === 'unknown') {
      console.log(`⚠️  Skipping ${file} - no username mapping`);
      skipped++;
      continue;
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log(`⚠️  Skipping ${file} - user ${username} not found in database`);
      skipped++;
      continue;
    }

    const content = fs.readFileSync(path.join(interviewDir, file), 'utf-8');

    // Estimate interview date from file stats (or use a default)
    const stats = fs.statSync(path.join(interviewDir, file));
    const interviewDate = stats.mtime; // Use file modification time

    // Create interview note
    await prisma.hRInterviewNote.create({
      data: {
        userId: user.id,
        interviewDate,
        notes: content,
        keyThemes: [], // Could be extracted with AI later
        actionItems: [],
        interviewer: null,
        interviewType: '2025 Annual Review',
      },
    });

    console.log(`✓ Imported interview notes for ${username}`);
    imported++;
  }

  console.log(`✅ Imported ${imported} interview notes, skipped ${skipped}`);
}

async function main() {
  console.log('🚀 Starting HR Review Data Import...');

  await seedFeedbackSurvey();
  await seedGoalSetting();
  await seedInterviewNotes();

  console.log('\n✅ HR Review data import complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

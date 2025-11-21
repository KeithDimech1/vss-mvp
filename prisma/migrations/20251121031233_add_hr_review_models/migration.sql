-- CreateTable
CREATE TABLE "HRFeedbackSurvey" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "enjoyedPart" TEXT,
    "lessOfPart" TEXT,
    "autonomyRating" INTEGER,
    "motivationRating" INTEGER,
    "teamConnection" INTEGER,
    "wideLithodatConnection" INTEGER,
    "supportRating" INTEGER,
    "proudAchievement" TEXT,
    "wishRecognised" TEXT,
    "toolsEffectiveness" INTEGER,
    "collaborationEase" INTEGER,
    "toolsUsed" TEXT,
    "aiUsageWorkflow" TEXT,
    "aiToolsToExplore" TEXT,
    "inefficiencies" TEXT,
    "toolsCreated" TEXT,
    "externalLearnings" TEXT,
    "careerPathClarity" INTEGER,
    "skillDevelopmentSupport" INTEGER,
    "skillToGrow" TEXT,
    "rolesInterested" TEXT,
    "growthSupport" TEXT,
    "greatYearVision" TEXT,
    "excitedProjects" TEXT,
    "smallGoals" TEXT,
    "additionalSharing" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HRFeedbackSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HRGoalSetting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "professionalGoal1Title" TEXT,
    "professionalGoal1Description" TEXT,
    "professionalGoal2Title" TEXT,
    "professionalGoal2Description" TEXT,
    "professionalGoal3Title" TEXT,
    "professionalGoal3Description" TEXT,
    "personalGoalTitle" TEXT,
    "personalGoalDescription" TEXT,
    "checkInPreferences" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HRGoalSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HRInterviewNote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interviewDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "keyThemes" JSONB,
    "actionItems" JSONB,
    "interviewer" TEXT,
    "interviewType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HRInterviewNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HRFeedbackSurvey_userId_idx" ON "HRFeedbackSurvey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HRFeedbackSurvey_userId_key" ON "HRFeedbackSurvey"("userId");

-- CreateIndex
CREATE INDEX "HRGoalSetting_userId_idx" ON "HRGoalSetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HRGoalSetting_userId_key" ON "HRGoalSetting"("userId");

-- CreateIndex
CREATE INDEX "HRInterviewNote_userId_idx" ON "HRInterviewNote"("userId");

-- CreateIndex
CREATE INDEX "HRInterviewNote_interviewDate_idx" ON "HRInterviewNote"("interviewDate");

-- AddForeignKey
ALTER TABLE "HRFeedbackSurvey" ADD CONSTRAINT "HRFeedbackSurvey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HRGoalSetting" ADD CONSTRAINT "HRGoalSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HRInterviewNote" ADD CONSTRAINT "HRInterviewNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

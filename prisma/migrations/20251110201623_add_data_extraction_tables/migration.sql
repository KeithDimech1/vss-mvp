-- CreateTable
CREATE TABLE "DataExtractionProcess" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "processSteps" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataExtractionProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataExtractionFeedback" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "isCorrect" BOOLEAN,
    "comments" TEXT,
    "clarifications" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataExtractionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataExtractionQuestion" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3),
    "language" TEXT NOT NULL DEFAULT 'en',
    "workspaceLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataExtractionQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataExtractionFeedback_processId_userId_stepId_key" ON "DataExtractionFeedback"("processId", "userId", "stepId");

-- CreateIndex
CREATE UNIQUE INDEX "DataExtractionQuestion_processId_userId_key" ON "DataExtractionQuestion"("processId", "userId");

-- AddForeignKey
ALTER TABLE "DataExtractionFeedback" ADD CONSTRAINT "DataExtractionFeedback_processId_fkey" FOREIGN KEY ("processId") REFERENCES "DataExtractionProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataExtractionQuestion" ADD CONSTRAINT "DataExtractionQuestion_processId_fkey" FOREIGN KEY ("processId") REFERENCES "DataExtractionProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

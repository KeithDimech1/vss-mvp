-- CreateTable
CREATE TABLE "ActionItem" (
    "id" TEXT NOT NULL,
    "actionNumber" INTEGER NOT NULL,
    "actionSlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not-started',
    "dueDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionResponse" (
    "id" TEXT NOT NULL,
    "actionItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionConsensus" (
    "id" TEXT NOT NULL,
    "actionItemId" TEXT NOT NULL,
    "consensusData" JSONB NOT NULL,
    "notes" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),
    "resolvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionConsensus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActionItem_actionNumber_key" ON "ActionItem"("actionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ActionItem_actionSlug_key" ON "ActionItem"("actionSlug");

-- CreateIndex
CREATE UNIQUE INDEX "ActionResponse_actionItemId_userId_key" ON "ActionResponse"("actionItemId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActionConsensus_actionItemId_key" ON "ActionConsensus"("actionItemId");

-- AddForeignKey
ALTER TABLE "ActionResponse" ADD CONSTRAINT "ActionResponse_actionItemId_fkey" FOREIGN KEY ("actionItemId") REFERENCES "ActionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionResponse" ADD CONSTRAINT "ActionResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionConsensus" ADD CONSTRAINT "ActionConsensus_actionItemId_fkey" FOREIGN KEY ("actionItemId") REFERENCES "ActionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "HRActionStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "HRActionPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "HRActionItem" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "interviewNoteId" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" "HRActionStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "HRActionPriority" NOT NULL DEFAULT 'MEDIUM',
    "notes" TEXT,
    "createdById" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HRActionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HRActionItem_employeeId_idx" ON "HRActionItem"("employeeId");

-- CreateIndex
CREATE INDEX "HRActionItem_assignedToId_idx" ON "HRActionItem"("assignedToId");

-- CreateIndex
CREATE INDEX "HRActionItem_interviewNoteId_idx" ON "HRActionItem"("interviewNoteId");

-- CreateIndex
CREATE INDEX "HRActionItem_dueDate_idx" ON "HRActionItem"("dueDate");

-- CreateIndex
CREATE INDEX "HRActionItem_status_idx" ON "HRActionItem"("status");

-- AddForeignKey
ALTER TABLE "HRActionItem" ADD CONSTRAINT "HRActionItem_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HRActionItem" ADD CONSTRAINT "HRActionItem_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HRActionItem" ADD CONSTRAINT "HRActionItem_interviewNoteId_fkey" FOREIGN KEY ("interviewNoteId") REFERENCES "HRInterviewNote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HRActionItem" ADD CONSTRAINT "HRActionItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

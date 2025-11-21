-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('CRITICAL', 'DAILY', 'WEEKLY', 'MONTH_END', 'CUSTOM');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'SNOOZED', 'OVERDUE');

-- CreateTable
CREATE TABLE "FinanceTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "TaskCategory" NOT NULL,
    "priority" "TaskPriority" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "recurringRule" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "assignedToId" TEXT,
    "createdById" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceMetric" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "month" TIMESTAMP(3) NOT NULL,
    "dextPublished" INTEGER NOT NULL,
    "dextTotal" INTEGER NOT NULL,
    "unreconciledLines" INTEGER NOT NULL,
    "unreconciledOld" INTEGER NOT NULL,
    "billsPaid" INTEGER NOT NULL,
    "billsDueThisWeek" INTEGER NOT NULL,
    "payrollCompleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthEndSummary" (
    "id" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "totalSpend" DECIMAL(65,30) NOT NULL,
    "spendByCategory" JSONB NOT NULL,
    "variances" JSONB NOT NULL,
    "cashBalance" DECIMAL(65,30) NOT NULL,
    "upcomingExpenses" JSONB NOT NULL,
    "issues" TEXT,
    "preparedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthEndSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FinanceMetric_month_idx" ON "FinanceMetric"("month");

-- CreateIndex
CREATE INDEX "MonthEndSummary_month_idx" ON "MonthEndSummary"("month");

-- AddForeignKey
ALTER TABLE "FinanceTask" ADD CONSTRAINT "FinanceTask_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceTask" ADD CONSTRAINT "FinanceTask_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceTask" ADD CONSTRAINT "FinanceTask_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceComment" ADD CONSTRAINT "FinanceComment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "FinanceTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceComment" ADD CONSTRAINT "FinanceComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthEndSummary" ADD CONSTRAINT "MonthEndSummary_preparedById_fkey" FOREIGN KEY ("preparedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

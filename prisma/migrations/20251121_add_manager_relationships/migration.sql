-- CreateTable
CREATE TABLE "UserManager" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserManager_employeeId_idx" ON "UserManager"("employeeId");

-- CreateIndex
CREATE INDEX "UserManager_managerId_idx" ON "UserManager"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserManager_employeeId_managerId_key" ON "UserManager"("employeeId", "managerId");

-- AddForeignKey
ALTER TABLE "UserManager" ADD CONSTRAINT "UserManager_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserManager" ADD CONSTRAINT "UserManager_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

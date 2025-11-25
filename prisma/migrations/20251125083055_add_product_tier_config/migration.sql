-- CreateTable
CREATE TABLE "ProductTierConfig" (
    "id" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "tierName" TEXT NOT NULL,
    "price" TEXT,
    "priceNote" TEXT,
    "target" TEXT,
    "source" TEXT,
    "featuresIn" JSONB NOT NULL,
    "featuresOut" JSONB NOT NULL,
    "restrictions" TEXT,
    "keyDifferentiator" TEXT,
    "lastEditedBy" TEXT,
    "lastEditedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTierConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductTierConfig_productType_idx" ON "ProductTierConfig"("productType");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTierConfig_productType_tierName_key" ON "ProductTierConfig"("productType", "tierName");

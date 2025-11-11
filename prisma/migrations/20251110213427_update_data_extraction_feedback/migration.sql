/*
  Warnings:

  - You are about to drop the column `clarifications` on the `DataExtractionFeedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DataExtractionFeedback" DROP COLUMN "clarifications",
ADD COLUMN     "questionAnswers" JSONB;

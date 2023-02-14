/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Software` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Software" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Software_name_key" ON "Software"("name");

-- CreateEnum
CREATE TYPE "SoftwareStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ReleaseStatus" AS ENUM ('PENDING', 'TESTING', 'VALIDATED', 'FAILING', 'CANCELED');

-- CreateEnum
CREATE TYPE "BuildStatus" AS ENUM ('PENDING', 'BUILT', 'TESTING', 'VALIDATED', 'FAILED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('EDITING', 'LOCKED');

-- CreateEnum
CREATE TYPE "ProtocolStatus" AS ENUM ('PENDING', 'COMPLETED', 'SIGNED');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'COMPLETED', 'SIGNED');

-- CreateEnum
CREATE TYPE "TestExecutionStatus" AS ENUM ('PENDING', 'PASS', 'FAIL', 'OTHER');

-- CreateEnum
CREATE TYPE "StepExecutionStatus" AS ENUM ('PENDING', 'PASS', 'FAIL', 'NA', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "SoftwareStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Release" (
    "id" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" "ReleaseStatus" NOT NULL DEFAULT 'PENDING',
    "releaseDate" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Build" (
    "id" TEXT NOT NULL,
    "releaseId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" "BuildStatus" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "softwareId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "TestStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "expectedOutcome" TEXT,
    "status" "StepStatus" NOT NULL DEFAULT 'EDITING',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Protocol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProtocolStatus" NOT NULL DEFAULT 'PENDING',
    "releaseId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Protocol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "protocolId" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestExecution" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "status" "TestExecutionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepExecution" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "userId" TEXT,
    "comment" TEXT,
    "status" "StepExecutionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StepExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "stepExecutionId" TEXT NOT NULL,
    "path" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProtocolToTest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProtocolToTest_AB_unique" ON "_ProtocolToTest"("A", "B");

-- CreateIndex
CREATE INDEX "_ProtocolToTest_B_index" ON "_ProtocolToTest"("B");

-- AddForeignKey
ALTER TABLE "Software" ADD CONSTRAINT "Software_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Protocol" ADD CONSTRAINT "Protocol_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Protocol" ADD CONSTRAINT "Protocol_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "Protocol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestExecution" ADD CONSTRAINT "TestExecution_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepExecution" ADD CONSTRAINT "StepExecution_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepExecution" ADD CONSTRAINT "StepExecution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_stepExecutionId_fkey" FOREIGN KEY ("stepExecutionId") REFERENCES "StepExecution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProtocolToTest" ADD CONSTRAINT "_ProtocolToTest_A_fkey" FOREIGN KEY ("A") REFERENCES "Protocol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProtocolToTest" ADD CONSTRAINT "_ProtocolToTest_B_fkey" FOREIGN KEY ("B") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

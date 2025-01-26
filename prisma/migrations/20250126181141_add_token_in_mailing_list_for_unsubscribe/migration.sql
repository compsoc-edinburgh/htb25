/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `MailingList` will be added. If there are existing duplicate values, this will fail.
  - The required column `token` was added to the `MailingList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "MailingList" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MailingList_token_key" ON "MailingList"("token");

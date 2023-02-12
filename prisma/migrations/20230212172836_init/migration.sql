/*
  Warnings:

  - Added the required column `password` to the `Moderators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moderators" ADD COLUMN     "password" TEXT NOT NULL;

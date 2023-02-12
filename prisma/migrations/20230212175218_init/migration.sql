/*
  Warnings:

  - Added the required column `product_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "product_id" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `products_id` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "products_id",
ADD COLUMN     "products_info" TEXT[];

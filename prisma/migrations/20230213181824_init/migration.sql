/*
  Warnings:

  - You are about to drop the column `product_id` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "product_id",
ADD COLUMN     "products_id" INTEGER[];

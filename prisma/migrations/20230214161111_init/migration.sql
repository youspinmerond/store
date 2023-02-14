/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `Moderators` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `Moderators` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Moderators_nickname_key" ON "Moderators"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Moderators_password_key" ON "Moderators"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

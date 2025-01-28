/*
  Warnings:

  - You are about to drop the column `CUIT` on the `Client` table. All the data in the column will be lost.
  - Added the required column `cuit` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `CUIT`,
    ADD COLUMN `cuit` VARCHAR(191) NOT NULL;

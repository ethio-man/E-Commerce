/*
  Warnings:

  - Made the column `reviewCount` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reviewSum` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "reviewCount" SET NOT NULL,
ALTER COLUMN "reviewCount" SET DEFAULT 0,
ALTER COLUMN "reviewSum" SET NOT NULL,
ALTER COLUMN "reviewSum" SET DEFAULT 0;

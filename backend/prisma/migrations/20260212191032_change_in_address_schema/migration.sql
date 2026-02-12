/*
  Warnings:

  - The `country` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_method` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "country",
ADD COLUMN     "country" VARCHAR(53)[];

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" VARCHAR(53)[];

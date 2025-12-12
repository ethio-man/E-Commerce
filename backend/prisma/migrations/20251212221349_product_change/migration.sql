/*
  Warnings:

  - You are about to drop the column `product_name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "product_name",
DROP COLUMN "rating",
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "reviewCount" INTEGER,
ADD COLUMN     "reviewSum" INTEGER,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "src" VARCHAR(250);

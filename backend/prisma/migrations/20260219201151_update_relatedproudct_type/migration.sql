/*
  Warnings:

  - The `related_product` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_related_product_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "related_product",
ADD COLUMN     "related_product" INTEGER[];

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_related_product_fkey" FOREIGN KEY ("related_product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

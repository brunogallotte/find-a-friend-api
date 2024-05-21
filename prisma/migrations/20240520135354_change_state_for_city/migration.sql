/*
  Warnings:

  - You are about to drop the column `state` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "state",
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "state",
ADD COLUMN     "city" TEXT NOT NULL;

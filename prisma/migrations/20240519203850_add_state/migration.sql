/*
  Warnings:

  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `state` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AGE" AS ENUM ('BABY', 'YOUNG', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "ENERGY_LEVEL" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "INDEPENDENCE_LEVEL" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "ENVIRONMENT" AS ENUM ('SPACIOUS', 'OUTDOOR', 'INDOOR');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" "AGE" NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "SIZE" NOT NULL,
DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" "ENERGY_LEVEL" NOT NULL,
DROP COLUMN "independence_level",
ADD COLUMN     "independence_level" "INDEPENDENCE_LEVEL" NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" "ENVIRONMENT" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "state" TEXT NOT NULL;

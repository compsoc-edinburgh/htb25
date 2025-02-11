/*
  Warnings:

  - You are about to drop the column `challenge` on the `ChallengeCompletion` table. All the data in the column will be lost.

*/

-- HOTFIX: The actual migration file for add_challenge_field was lost during merge.
-- The manually added migration file was resolved as applied and 
-- the DROP below shouldn't be executed here.
-- -- AlterTable
-- ALTER TABLE "ChallengeCompletion" DROP COLUMN "challenge";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "food_choice_1" TEXT,
ADD COLUMN     "food_choice_2" TEXT,
ADD COLUMN     "food_choice_3" TEXT,
ADD COLUMN     "pizza_choice" TEXT,
ADD COLUMN     "shirt_size" TEXT;

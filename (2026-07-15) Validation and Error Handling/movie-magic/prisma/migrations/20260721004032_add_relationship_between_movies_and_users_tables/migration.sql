-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "createdBy" TEXT;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

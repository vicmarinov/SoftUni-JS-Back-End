-- CreateTable
CREATE TABLE "missions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "crew" INTEGER NOT NULL,
    "launchDate" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "missions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MissionSupporters" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MissionSupporters_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MissionSupporters_B_index" ON "_MissionSupporters"("B");

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "missions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MissionSupporters" ADD CONSTRAINT "_MissionSupporters_A_fkey" FOREIGN KEY ("A") REFERENCES "missions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MissionSupporters" ADD CONSTRAINT "_MissionSupporters_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

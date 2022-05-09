-- CreateTable
CREATE TABLE "missionCommander" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "mainStack" TEXT NOT NULL,
    "currentEnrollmend" BOOLEAN NOT NULL,
    "hasAzureCertification" BOOLEAN NOT NULL,

    CONSTRAINT "missionCommander_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "missionCommander_name_key" ON "missionCommander"("name");

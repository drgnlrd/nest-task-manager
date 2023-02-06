-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

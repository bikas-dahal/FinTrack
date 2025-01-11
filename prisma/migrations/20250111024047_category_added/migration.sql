-- CreateTable
CREATE TABLE "Cateregory" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cateregory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cateregory" ADD CONSTRAINT "Cateregory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

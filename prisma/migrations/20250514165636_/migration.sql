-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "doc_type" CHAR(1) NOT NULL,
    "doc_number" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "isbn" CHAR(13) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image" VARCHAR(100) NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "voucher_type" CHAR(1) NOT NULL,
    "voucher_number" VARCHAR(20) NOT NULL,
    "voucher_pdf" VARCHAR(200) NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { Request, Response, Router } from "express";
import getAllOrders from "@/controllers/orders/getAllOrders";
import { prisma } from "@/utils/prisma";

const router = Router();

// Obtener todas las órdenes
router.get("/", async (_req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Crear una nueva orden
router.post("/", async (req, res): Promise<void> => {
  try {
    const { type, client, products } = req.body

    if (!client || !type || !products) {
      res.status(400).json({ error: 'client, voucher_type y products son requeridos' });
      return;
    }

    const responsePDF = await fetch("https://hiring.pruebasgt.com/api/vouchers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        products: products,
        client: client
      })
    });
    const getPDF = await responsePDF.json();

    console.log("getPDF", getPDF);

    const order = await prisma.orders.create({
      data: {
        client_id: client.id,
        voucher_type: type,
        voucher_number: getPDF.data.number,
        voucher_pdf: getPDF.data.pdf,
      }
    });

    await prisma.details.createMany({
      data: products.map((product: any) => ({
        order_id: order.id,
        book_id: product.id,
        quantity: product.quantity,
        price: product.price
      }))
    });

    res.status(201).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear la orden' })
  }
})


export { router };
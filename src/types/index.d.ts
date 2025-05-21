export interface Book {
  id: number
  isbn: string
  name: string
  stock: number
  price: number
  image: string
  image_id: string
}

export interface Client {
  id: number
  doc_type: string
  doc_number: string
  first_name: string
  last_name: string
  phone: string
  email: string
}

export interface Order {
  id: number
  client_id: number
  voucher_type: "B" | "F"
  voucher_number: string
  voucher_pdf: string
}

export interface Detail {
  id: number
  order_id: number
  book_id: number
  price: number
  quantity: number
}
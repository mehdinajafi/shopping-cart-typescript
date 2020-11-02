import { productType } from "./product"

export interface cartInterface {
  id: number
  image: string
  title: string
  price: number
  inventory: number
  quantity: number
}

class Storager {
  static cart: cartInterface[] = []

  static saveProducts(products: productType[]): void {
    localStorage.setItem("products", JSON.stringify(products))
  }

  static saveCart(cart: cartInterface[]): void {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  static getProduct(id: number): productType {
    let products: productType[] = JSON.parse(
      localStorage.getItem("products") || "{}"
    )
    let product = products.find((product) => product.id === id)
    if (product) {
      return product
    } else {
      throw new Error("محصول پیدا نشد")
    }
  }

  static getCart(): cartInterface[] | [] {
    return JSON.parse(localStorage.getItem("cart") || "[]")
  }
}

export default Storager

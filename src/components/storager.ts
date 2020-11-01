import { productType } from "./product"

class Storager {
  static cart: (productType | undefined)[] = []

  static saveProducts(products: productType[] | []): void {
    localStorage.setItem("products", JSON.stringify(products))
  }

  static getProduct(id: number) {
    let products: productType[] | null = JSON.parse(
      localStorage.getItem("products") || "{}"
    )
    return products?.find((product) => product.id === id)
  }
}

export default Storager

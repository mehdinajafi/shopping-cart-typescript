import { productType } from "./product"

class Storager {
  static saveProducts(products: productType[] | undefined) {
    localStorage.setItem("products", JSON.stringify(products))
  }
}

export default Storager

import Product from "./components/product"
import View from "./components/view"

document.addEventListener("DOMContentLoaded", () => {
  const product = new Product()
  const view = new View()
  product.getProducts().then((products) => view.showProducts(products))
})

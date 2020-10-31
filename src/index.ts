import Product from "./components/product"
import View from "./components/view"

const product = new Product()
const view = new View()

document.addEventListener("DOMContentLoaded", () => {
  product.getProducts().then((products) => view.showProducts(products))
})

document.querySelector("#openCart")?.addEventListener("click", () => {
  view.openCart()
})

document.querySelector("#closeCart")?.addEventListener("click", () => {
  view.closeCart()
})

document.querySelector("#cartUnderlay")?.addEventListener("click", () => {
  view.closeCart()
})

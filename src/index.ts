import Product from "./components/product"

document.addEventListener("DOMContentLoaded", () => {
  const product = new Product()
  product.getProducts().then((data) => console.log(data))
})

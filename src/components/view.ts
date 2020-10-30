import { productType } from "./product"

class View {
  showProducts(products: productType[] | undefined) {
    const productsDom = document.querySelector("#products")!
    let productsElements = ""

    products?.forEach((product: productType) => {
      productsElements += `
      <div class="w-40">
        <img src=${product.image} class="h-40" />
        <div class="h-40">
          <h1 class="text-2xl h-24">${product.title}</h1>
          <h3>$${product.price}</h3>
        </div>
        <button type="button">Add to cart</button>
      </div>
      `
    })

    productsDom.innerHTML = productsElements
  }
}

export default View

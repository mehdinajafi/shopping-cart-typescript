import { productType } from "./product"

class View {
  showProducts(products: productType[] | undefined) {
    const productsDom = document.querySelector("#products")!
    let productsElements = ""

    products?.forEach((product: productType) => {
      productsElements += `
      <div>
        <img src=${product.image} />
        <div>
          <h1>${product.title}</h1>
          <h3>$${product.price}</h3>
        </div>
        <button>Add to cart</button>
      </div>
      `
    })

    productsDom.innerHTML = productsElements
  }
}

export default View

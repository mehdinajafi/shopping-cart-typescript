import { productType } from "./product"

interface ViewInterface {
  openCart(): void
  closeCart(): void
  showProducts(products: productType[] | undefined): void
}

const cartModal = document.querySelector("#cart-modal") as HTMLElement
const cartWrapper = document.querySelector("#cart-wrapper") as HTMLElement

class View implements ViewInterface {
  openCart() {
    cartWrapper.classList.remove("hidden")
    setTimeout(() => {
      cartModal.style.top = "0"
    }, 50)
  }

  closeCart() {
    cartWrapper.classList.add("hidden")
    cartModal.style.top = "-100vh"
  }

  showProducts(products: productType[] | undefined) {
    const productsDom = document.querySelector("#products")!
    let productsElements = ""

    products?.forEach((product: productType) => {
      productsElements += `
      <div class="w-screen sm:w-48 m-8 md:mr-4">
        <img src=${product.image} class="h-40 mx-auto" />
        <div class="my-2">
          <h1 class="text-sm font-bold h-12 text-gray-900">${product.title}</h1>
          <h3 class="font-bold text-gray-600">$${product.price}</h3>
        </div>
        <button type="button" class="w-full p-2 rounded bg-primary-700 hover:bg-primary-800 text-white">Add to cart</button>
      </div>
      `
    })

    productsDom.innerHTML = productsElements
  }
}

export default View

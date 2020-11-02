import { productType } from "./product"
import Storager, { cartInterface } from "./storager"

interface ViewInterface {
  openCart(): void
  closeCart(): void
  showProducts(products: productType[]): void
}

const cartModal = document.querySelector("#cart-modal") as HTMLElement
const cartWrapper = document.querySelector("#cart-wrapper") as HTMLElement
const cartItemsDOM = document.querySelector(".cart-items") as HTMLSpanElement
const totalPriceDOM = document.querySelector(".total-price") as HTMLDivElement
const cartBodyDOM = document.querySelector("#cart-body") as HTMLDivElement

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

  showProducts(products: productType[]) {
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
        <button data-id=${product.id} type="button" class="product-btn w-full p-2 rounded bg-primary-700 hover:bg-primary-800 text-white">Add to cart</button>
      </div>
      `
    })

    productsDom.innerHTML = productsElements
  }

  showCartItems(cart: cartInterface[]) {
    let cartElements = ""
    cart?.forEach((cartItem: cartInterface) => {
      cartElements += `
        <div class="flex items-center justify-between my-4">
          <div class="flex items-center w-1/5">
            <div class="remove-item" data-id=${cartItem.id} >
              <svg
                viewBox="0 0 16 16"
                class="w-12 h-12 mr-4 rounded cursor-pointer hover:bg-gray-200"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  fill-rule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <img src=${cartItem.image} alt=${cartItem.title} class="w-12 hidden sm:block" />
          </div>
          <div class="w-2/4" >${cartItem.title}</div>
          <div class="flex items-center">
            <div>
              <svg viewBox="0 0 16 16" class="w-8 h-8 mr-1 rounded cursor-pointer hover:bg-gray-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg>
            </div>
            <div>${cartItem.quantity}</div>
            <div class="add-quantity" data-id=${cartItem.id}>
              <svg viewBox="0 0 16 16" class="w-8 h-8 ml-1 rounded cursor-pointer hover:bg-gray-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </div>
          </div>
          <div class="w-1/5 text-right">$${cartItem.price}</div>
        </div>
      `
    })

    cartBodyDOM.innerHTML = cartElements
  }

  getCartButtons() {
    const addToCartBtn = [
      ...document.querySelectorAll<HTMLButtonElement>(".product-btn"),
    ]
    addToCartBtn.forEach((button) => {
      let productId = button.dataset.id
      button.addEventListener("click", () => {
        const newCartItem = {
          ...Storager.getProduct(Number(productId)),
          quantity: 1,
        }
        // Add product to cart
        Storager.cart = [...Storager.cart, newCartItem]
        // Save cart in localStorage
        Storager.saveCart(Storager.cart)
        // Clac total price and items
        this.setCartValues(Storager.cart)
        // Show cart items in dom
        this.showCartItems(Storager.cart)
        // Set cart item btns
        this.cartProcess()
      })
    })
  }

  setCartValues(cart: cartInterface[]) {
    let totalPrice: number = 0
    let totalItems: number = 0

    totalPrice = cart.reduce(
      (totalPrice, product) => totalPrice + product.quantity * product.price,
      0
    )
    totalItems = cart.reduce(
      (totalPrice, product) => totalPrice + product.quantity,
      0
    )

    cartItemsDOM.innerHTML = totalItems.toString()
    totalPriceDOM.innerHTML = `Total price: $${totalPrice.toFixed(2)}`
  }

  cartProcess() {
    // ---- Remove cart item from cart
    const removeItemBTNS = [
      ...document.querySelectorAll<HTMLButtonElement>(".remove-item"),
    ]

    // Remove item from dom and localStorage
    removeItemBTNS?.forEach((removeBTN) => {
      let productId = removeBTN.dataset.id
      removeBTN?.addEventListener("click", () => {
        if (productId && removeBTN.parentElement?.parentElement) {
          this.removeProduct(Number(productId))
          cartBodyDOM.removeChild(removeBTN.parentElement.parentElement)
        }
      })
    })

    // ---- Add product quantity
    const addQuantityBtns = [
      ...document.querySelectorAll<HTMLDivElement>(".add-quantity"),
    ]
    addQuantityBtns?.forEach((addBtn) => {
      // Find the product ID from its dataset
      let productId = addBtn.dataset.id
      addBtn?.addEventListener("click", () => {
        if (productId) {
          // Find the product based on its ID in the card array
          const product = Storager.cart.find(
            (cartItem) => cartItem.id.toString() === productId
          )
          if (product && addBtn.previousElementSibling) {
            // Increase the quantity of products
            product.quantity += 1
            // Show it in dom
            addBtn.previousElementSibling.innerHTML = product.quantity.toString()
            // Save new item in localStorage and set new total price and total item
            Storager.saveCart(Storager.cart)
            this.setCartValues(Storager.cart)
          }
        }
      })
    })
  }

  // Remove product
  removeProduct(id: number): void {
    Storager.cart = Storager.cart.filter((product) => {
      return product.id !== id
    })
    // Save new cart in localStorage
    Storager.saveCart(Storager.cart)
    // Clac new total price and items
    this.setCartValues(Storager.cart)
  }

  // For get cart items from localStorage
  initApp(): void {
    Storager.cart = Storager.getCart()
    this.setCartValues(Storager.cart)
    this.showCartItems(Storager.cart)
  }
}

export default View

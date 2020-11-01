export type productType = {
  id: number
  image: string
  title: string
  price: number
  inventory: number
}

interface ProductInterface {
  getProducts(): Promise<productType[] | []>
}

class Product implements ProductInterface {
  public getProducts(): Promise<productType[] | []>

  async getProducts() {
    try {
      const result = await fetch(
        "https://jsonblob.com/api/jsonblob/ab70f01d-fc06-11ea-a8f0-e15d461afba2"
      )
      const data: productType[] = await result.json()
      return data
    } catch (error) {
      //throw new Error(error)
      return []
    }
  }
}

export default Product

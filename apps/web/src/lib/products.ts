"use cache"
 
import { cacheLife, cacheTag } from 'next/cache'
import mockDb from '../../../../mock-api/db.json'

interface Product {
  id: string
  name: string
  price: number
  inventory: number
}

const fallbackProducts = mockDb.products as Product[]

async function fetchProductFromApi(id: string) {
  const apiUrl = process.env.API_URL?.trim()

  if (!apiUrl) {
    return null
  }

  try {
    const res = await fetch(`${apiUrl}/products/${id}`)
    if (!res.ok) {
      throw new Error('Failed to fetch product')
    }

    return (await res.json()) as Product
  } catch (error) {
    if (apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1')) {
      return null
    }

    throw error
  }
}

async function fetchProductsFromApi() {
  const apiUrl = process.env.API_URL?.trim()

  if (!apiUrl) {
    return null
  }

  try {
    const res = await fetch(`${apiUrl}/products`)
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    return (await res.json()) as Product[]
  } catch (error) {
    if (apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1')) {
      return null
    }

    throw error
  }
}
 
/**
 * Fetch a single product by ID with caching.
 * Cache invalidated via revalidateTag() after mutations.
 */
export async function getProduct(id: string) {
  cacheLife('products') // 5min fresh, 15min revalidate, 1hr expire
  cacheTag('products', `product-${id}`) // Tag for invalidation

  const product =
    (await fetchProductFromApi(id)) ??
    fallbackProducts.find((item) => item.id === id)

  if (!product) {
    throw new Error('Failed to fetch product')
  }

  return product
}
 
/**
 * Fetch all products with caching.
 */
export async function getProducts() {
  cacheLife('products')
  cacheTag('products') // Invalidate when any product changes

  return (await fetchProductsFromApi()) ?? fallbackProducts
}

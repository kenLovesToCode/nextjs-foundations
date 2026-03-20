"use server"
 
import { revalidateTag } from 'next/cache'
 
export async function updateProduct(
  id: string, 
  data: { name?: string; price?: number; inventory?: number }
) {
  try {
    // Update in database
    await fetch(`${process.env.API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    // Invalidate specific product and product list (16.1.x requires second arg)
    revalidateTag(`product-${id}`, 'max')
    revalidateTag('products', 'max')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update product:', error)
    return { success: false, error: 'Failed to update product' }
  }
}
 
export async function deleteProduct(id: string) {
  try {
    await fetch(`${process.env.API_URL}/products/${id}`, {
      method: 'DELETE',
    })
    
    // Only invalidate product list, specific product cache will expire naturally
    revalidateTag('products', 'max')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to delete product:', error)
    return { success: false, error: 'Failed to delete product' }
  }
}
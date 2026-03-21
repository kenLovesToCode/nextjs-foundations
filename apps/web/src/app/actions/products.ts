'use server';

import { revalidatePath, updateTag } from 'next/cache';

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
    });

    updateTag(`product-${id}`);
    updateTag('products');
    revalidatePath('/products');
    revalidatePath(`/products/${id}`);

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await fetch(`${process.env.API_URL}/products/${id}`, {
      method: 'DELETE',
    });

    updateTag(`product-${id}`);
    updateTag('products');
    revalidatePath('/products');
    revalidatePath(`/products/${id}`);

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete product' };
  }
}

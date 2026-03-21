'use client';

import { useState } from 'react';
import { updateProduct } from '@/app/actions/products';

export function ProductForm({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    tone: 'success' | 'error';
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const result = await updateProduct(product.id, {
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      inventory: Number(formData.get('inventory')),
    });

    setLoading(false);

    if (result.success) {
      setMessage({ text: 'Product updated.', tone: 'success' });
    } else {
      setMessage({
        text: result.error || 'Failed to update',
        tone: 'error',
      });
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label
          className="mb-2 block font-medium text-sm text-stone-700"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-stone-500"
          defaultValue={product.name}
          id="name"
          name="name"
        />
      </div>

      <div>
        <label
          className="mb-2 block font-medium text-sm text-stone-700"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-stone-500"
          defaultValue={product.price}
          id="price"
          name="price"
          type="number"
        />
      </div>

      <div>
        <label
          className="mb-2 block font-medium text-sm text-stone-700"
          htmlFor="inventory"
        >
          Inventory
        </label>
        <input
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-stone-500"
          defaultValue={product.inventory}
          id="inventory"
          name="inventory"
          type="number"
        />
      </div>

      <button
        className="rounded-full bg-stone-950 px-5 py-2.5 font-medium text-sm text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>

      {message && (
        <p
          className={
            message.tone === 'success' ? 'text-green-600' : 'text-red-600'
          }
        >
          {message.text}
        </p>
      )}
    </form>
  );
}

interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
}

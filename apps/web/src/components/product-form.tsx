"use client";

import { updateProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    tone: "success" | "error";
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const result = await updateProduct(product.id, {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      inventory: Number(formData.get("inventory")),
    });

    setLoading(false);

    if (result.success) {
      setMessage({ text: "Product updated.", tone: "success" });
      router.refresh();
    } else {
      setMessage({
        text: result.error || "Failed to update",
        tone: "error",
      });
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={product.name}
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-stone-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          defaultValue={product.price}
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-stone-500"
        />
      </div>

      <div>
        <label
          htmlFor="inventory"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Inventory
        </label>
        <input
          id="inventory"
          name="inventory"
          type="number"
          defaultValue={product.inventory}
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-stone-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {message && (
        <p
          className={
            message.tone === "success" ? "text-green-600" : "text-red-600"
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

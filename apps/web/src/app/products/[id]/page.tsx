import Link from "next/link";
import { Suspense } from "react";

import { ProductForm } from "@/components/product-form";
import { getProduct } from "@/lib/products";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-3 border-b border-stone-200 pb-6">
          <Link
            href="/products"
            className="text-sm font-medium text-stone-600 transition hover:text-stone-950"
          >
            ← Back to products
          </Link>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">
              Product Detail
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Product Details
            </h1>
          </div>
        </header>

        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_18px_40px_-34px_rgba(28,25,23,0.45)]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
              #{product.id}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
              {product.name}
            </h2>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
            {product.inventory} in stock
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-stone-100 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
              Price
            </p>
            <p className="mt-2 text-2xl font-semibold text-stone-950">
              {currencyFormatter.format(product.price)}
            </p>
          </div>

          <div className="rounded-2xl bg-stone-100 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
              Inventory
            </p>
            <p className="mt-2 text-2xl font-semibold text-stone-950">
              {product.inventory}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_18px_40px_-34px_rgba(28,25,23,0.45)]">
        <div className="mb-6 space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
            Edit Product
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-stone-950">
            Update this item
          </h3>
        </div>
        <ProductForm product={product} />
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid animate-pulse gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-stone-200 bg-white p-6">
        <div className="h-5 w-16 rounded bg-stone-200" />
        <div className="mt-4 h-10 w-56 rounded bg-stone-200" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="h-28 rounded-2xl bg-stone-100" />
          <div className="h-28 rounded-2xl bg-stone-100" />
        </div>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-6">
        <div className="h-5 w-24 rounded bg-stone-200" />
        <div className="mt-4 h-8 w-40 rounded bg-stone-200" />
        <div className="mt-6 space-y-4">
          <div className="h-12 rounded-xl bg-stone-100" />
          <div className="h-12 rounded-xl bg-stone-100" />
          <div className="h-12 rounded-xl bg-stone-100" />
          <div className="h-11 w-32 rounded-xl bg-stone-200" />
        </div>
      </div>
    </div>
  );
}

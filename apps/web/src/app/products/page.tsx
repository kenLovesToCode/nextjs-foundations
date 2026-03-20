import Link from "next/link";

import { getProducts } from "@/lib/products";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="relative min-h-screen bg-stone-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-stone-200" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-5 border-b border-stone-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">
              Inventory
            </p>
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                Products
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                Current pricing and stock levels for every item.
              </p>
            </div>
          </div>

          <div className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700">
            {products.length} items
          </div>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const inventoryTone =
              product.inventory > 10
                ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                : "bg-amber-50 text-amber-700 ring-amber-100";

            return (
              <li key={product.id} className="group h-full">
                <Link
                  href={`/products/${product.id}`}
                  className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_16px_30px_-24px_rgba(28,25,23,0.45)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-stone-900 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white">
                      #{product.id}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${inventoryTone}`}
                    >
                      {product.inventory} in stock
                    </span>
                  </div>

                  <div className="mt-5 space-y-2">
                    <h2 className="text-xl font-semibold tracking-tight text-stone-950">
                      {product.name}
                    </h2>
                    <p className="text-2xl font-semibold text-stone-900">
                      {currencyFormatter.format(product.price)}
                    </p>
                    <p className="text-sm leading-6 text-stone-600">
                      View details, pricing, and current availability.
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition group-hover:text-stone-950">
                      Open product
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

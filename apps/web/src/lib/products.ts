import mockDb from '../../../../mock-api/db.json' with { type: 'json' };

interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
}

const fallbackProducts = mockDb.products as Product[];

const PRODUCTS_REVALIDATE_SECONDS = 900;

async function fetchProductFromApi(id: string) {
  const apiUrl = process.env.API_URL?.trim();

  if (!apiUrl) {
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/products/${id}`, {
      cache: 'force-cache',
      next: {
        revalidate: PRODUCTS_REVALIDATE_SECONDS,
        tags: ['products', `product-${id}`],
      },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    return (await res.json()) as Product;
  } catch (error) {
    if (apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1')) {
      return null;
    }

    throw error;
  }
}

async function fetchProductsFromApi() {
  const apiUrl = process.env.API_URL?.trim();

  if (!apiUrl) {
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/products`, {
      cache: 'force-cache',
      next: {
        revalidate: PRODUCTS_REVALIDATE_SECONDS,
        tags: ['products'],
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return (await res.json()) as Product[];
  } catch (error) {
    if (apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1')) {
      return null;
    }

    throw error;
  }
}

export async function getProduct(id: string) {
  const product =
    (await fetchProductFromApi(id)) ??
    fallbackProducts.find((item) => item.id === id);

  if (!product) {
    throw new Error('Failed to fetch product');
  }

  return product;
}

export async function getProducts() {
  return (await fetchProductsFromApi()) ?? fallbackProducts;
}

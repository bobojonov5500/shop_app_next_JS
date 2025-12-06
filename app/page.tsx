import Cta from "./components/cta";
import Hero from "./components/hero";
import ProductCard from "./components/product-card";
import { ProductType } from "./types/product";

export async function FetchData<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      console.error(`Failed to fetch: ${res.status} ${res.statusText}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Response is not JSON:", text.substring(0, 200));
      throw new Error("Response is not JSON");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default async function Home() {
  let products: ProductType[] = [];

  try {
    products = await FetchData<ProductType[]>(
      "https://fakestoreapi.com/products"
    );
  } catch (error) {
    console.error("Failed to load products:", error);
    products = [];
  }

  return (
    <main className="container min-h-screen mx-auto p-5">
      <Hero />
      <section className="flex flex-col">
        <h1 className="text-5xl text-center font-bold">All Products</h1>
        {products.length > 0 ? (
          <div className="mt-5 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center text-gray-500">
            <p>Unable to load products at this time. Please try again later.</p>
          </div>
        )}
      </section>
      <Cta />
    </main>
  );
}

import Cta from "./components/cta";
import Hero from "./components/hero";
import ProductCard from "./components/product-card";
import { ProductType } from "./types/product";

export async function FetchData<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

export default async function Home() {
  let products: ProductType[] = [];
  try {
    products = await FetchData<ProductType[]>(
      "https://fakestoreapi.com/products",
    );
  } catch (error) {
    console.error(`data not loaded! ${error}`);
  }

  return (
    <main className=" container min-h-screen mx-auto p-5 ">
      <Hero />
      <section className="flex flex-col">
        <h1 className="text-5xl text-center font-bold">All Products</h1>
        <div className="mt-5 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Cta />
    </main>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Cta from "./components/cta";
import Hero from "./components/hero";
import ProductCard from "./components/product-card";
import { ProductType } from "./types/product";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container min-h-screen mx-auto p-5">
      <Hero />
      <section className="flex flex-col">
        <h1 className="text-5xl text-center font-bold">All Products</h1>
        {loading ? (
          <div className="mt-10 text-center text-gray-500">
            <p className="text-lg">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="mt-5 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center text-gray-500">
            <p className="text-lg">Unable to load products at this time.</p>
          </div>
        )}
      </section>
      <Cta />
    </main>
  );
}
'use client';
import { useState, useEffect } from 'react';
import ProductCard from "../components/product-card";
import { ProductType } from "../types/product";

export default function Feature() {
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
    <>
      <section className="text-gray-600 body-font">
        {/* ... your feature section content ... */}
      </section>
      <div className="container min-h-screen mx-auto p-5">
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
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-lg">
                Unable to load products at this time. Please try again later.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
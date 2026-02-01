"use client";
export const dynamic = "force-dynamic";
import NumberFlow from "@number-flow/react";
import EmptyCart from "app/components/empty-cart";
import CustomImage from "app/components/image";
import { ProductType } from "app/types/product";
import { useEffect, useMemo, useState } from "react";


const CartPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setProducts(JSON.parse(storedCart));
      }
    }
  }, []); 

  //   remove product
  const RemoveProduct = (id: number) => {
    const UpdatedCart = products.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(UpdatedCart));
    setProducts(UpdatedCart);
  };

  //   increment
  const HandleDecrement = (id: number) => {
    const isExistProduct = products.find((e) => e.id === id);

    if (isExistProduct?.quantity === 1) {
      RemoveProduct(id);
    } else {
      const UpdatedCart = products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });

      localStorage.setItem("cart", JSON.stringify(UpdatedCart));
      setProducts(UpdatedCart);
    }
  };

  //   decrement
  const HandleIncrement = (id: number) => {
    const UpdatedCart = products.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    localStorage.setItem("cart", JSON.stringify(UpdatedCart));
    setProducts(UpdatedCart);
  };

  // total amount
  const Total = useMemo(() => {
    return products.reduce((acc, currentValue) => {
      return acc + currentValue.quantity * currentValue.price;
    }, 0);
  }, [products]);

  return (
    <>
      {products.length > 0 ? (
        <section className="bg-white py-8 antialiased  md:py-16">
          <div className="mx-auto max-w-7xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-center mt-20 md:mt-0 sm:text-2xl">
              Shopping Cart
            </h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex flex-col gap-y-4 lg:max-w-2xl xl:max-w-4xl">
                {products.map((product) => (
                  <div key={product.id} className="space-y-6">
                    <div className="rounded-lg  p-4  bg-gray-100  md:p-6">
                      <div className="space-y-4  md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="relative mr-2.5 flex items-center w-full md:w-[150px]  p-2 hover:scale-110 transition-transform duration-300 ease-in-out  h-60">
                          <CustomImage product={product} fill  />
                        </div>

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          {/* button */}
                          <div className="flex items-center">
                            {/* decreamemnt */}
                            <button
                              onClick={() => HandleDecrement(product.id)}
                              type="button"
                              id="decrement-button"
                              data-input-counter-decrement="counter-input"
                              className="inline-flex cursor-pointer h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-300 active:border-none bg-gray-100 hover:bg-gray-200 active:bg-[#6366F1]  "
                            >
                              <svg
                                className="h-3 w-3 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>

                            <NumberFlow
                              value={product.quantity}
                              format={{ useGrouping: false }}
                              className="text-xl font-semibold text-gray-800 w-10 text-center"
                            />

                            {/* increment */}
                            <button
                              onClick={() => HandleIncrement(product.id)}
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="counter-input"
                              className="inline-flex h-8 w-8 cursor-pointer shrink-0 items-center justify-center rounded-md border border-gray-300 active:border-none bg-gray-100 hover:bg-gray-200 active:bg-[#6366F1]  "
                            >
                              <svg
                                className="h-3 w-3  "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="text-end md:order-4 md:w-32">
                            <span className="font-bold text-2xl">
                              <NumberFlow
                                value={Number(product.quantity) * product.price}
                                format={{ style: "currency", currency: "USD" }}
                                className="font-bold text-2xl text-gray-900"
                              />
                            </span>
                          </div>
                        </div>

                        {/* text */}
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <h2 className="font-bold text-xl text-gray-600">
                            {product.title}
                          </h2>
                          <a
                            href="#"
                            className="text-base line-clamp-3 font-semibold text-gray-900 hover:underline "
                          >
                            {product.description}
                          </a>

                          <div className="flex items-center gap-4 mt-3">
                            <button
                              type="button"
                              className="inline-flex cursor-pointer items-center text-md font-medium text-gray-500 hover:text-gray-900 hover:underline "
                            >
                              <svg
                                className="me-1.5 h-6 w-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                              </svg>
                              Add to Favorites
                            </button>

                            <button
                              type="button"
                              onClick={() => RemoveProduct(product.id)}
                              className="inline-flex cursor-pointer items-center text-md font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-6 w-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg   bg-gray-100 p-4   sm:p-6">
                  <p className="text-xl font-semibold  text-gray-900 ">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal ">
                          Original price
                        </dt>
                        <dd className="text-base font-medium ">
                          <NumberFlow
                            value={Total}
                            format={{ style: "currency", currency: "USD" }}
                            className="font-bold text-2xl text-gray-900"
                          />
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal ">Store Pickup</dt>
                        <dd className="text-base font-medium ">$99</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal ">Tax</dt>
                        <dd className="text-base font-medium ">$799</dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold ">Total</dt>
                      <dd className="text-base font-bold ">
                        <NumberFlow
                          value={Total + 99}
                          format={{ style: "currency", currency: "USD" }}
                          className="font-bold text-2xl text-gray-900"
                        />
                      </dd>
                    </dl>
                  </div>

                  <button className="w-full cursor-pointer active:bg-indigo-700 active:scale-105 duration-200 ease-in-out text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Proceed to Checkout
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal "> or </span>
                    <a
                      href="#"
                      title=""
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="space-y-4 rounded-lg  bg-gray-100 sm:p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="voucher"
                        className="mb-2 block text-sm font-medium "
                      >
                        {" "}
                        Do you have a voucher or gift card?{" "}
                      </label>
                      <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border  bg-white p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="Code..."
                        required
                      />
                    </div>

                    <button className="w-full cursor-pointer active:bg-indigo-700 active:scale-105 duration-200 ease-in-out text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Apply Code
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // <div className="text-center">no products yet</div>
        <EmptyCart />
      )}
    </>
  );
};

export default CartPage;

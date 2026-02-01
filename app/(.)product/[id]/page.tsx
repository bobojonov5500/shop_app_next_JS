"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// REMOVED: import { FetchData } from "app/page"; -> Can't import server function here
import { ProductType } from "app/types/product";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import CustomImage from "app/components/image";
import { ClipLoader } from "react-spinners";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Bounce, toast } from "react-toastify";

const ProductDetailedPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [isLoading, setisLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleAdd = () => {
    if (typeof window === "undefined") return;

    const storedCart = localStorage.getItem("cart");
    const cartProducts: ProductType[] = storedCart
      ? JSON.parse(storedCart)
      : [];

    if (!product) return;

    const isExistProduct = cartProducts.find((e) => e.id === product?.id);

    let UpdatedData;

    if (isExistProduct) {
      UpdatedData = cartProducts.map((e) => {
        if (e.id === product.id) {
          return { ...e, quantity: e.quantity + 1 };
        } else {
          return e;
        }
      });

      localStorage.setItem("cart", JSON.stringify(UpdatedData));
    } else {
      const data = [...cartProducts, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(data));
    }
    toast(`Added to cart`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  function close() {
    setIsOpen(false);
    router.back();
  }

  useEffect(() => {
    if (!id) return;

    const GetDetailedProduct = async () => {
      setisLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed");
        const data: ProductType = await res.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product");
      } finally {
        setisLoading(false);
      }
    };
    GetDetailedProduct();
  }, [id]);

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none" // Added z-50
        onClose={close}
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <ClipLoader size={50} />
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-1/2 h-[300px] p-2 hover:scale-105 transition-transform duration-300">
                    {/* Added priority */}
                    {product?.image && (
                      <CustomImage product={product} fill  />
                    )}
                  </div>

                  <div className="flex flex-col w-full sm:w-1/2 justify-between">
                    <div>
                      <DialogTitle as="h3" className="font-semibold text-xl">
                        {product?.title}
                      </DialogTitle>
                      <div className="flex justify-between mt-2 items-center">
                        <span className="font-semibold text-lg text-green-600">
                          Price: &#36;{product?.price}
                        </span>
                        <div className="flex flex-col items-end">
                          <Rating
                            style={{ maxWidth: 100 }}
                            value={Math.floor(
                              Number(product?.rating?.rate || 0),
                            )}
                            readOnly // Ensure it's read-only
                          />
                          <span className="text-xs text-gray-500">
                            Rate: {product?.rating?.rate}
                          </span>
                        </div>
                      </div>
                      <div className="my-3 leading-relaxed text-base line-clamp-4 text-gray-600">
                        {product?.description}
                      </div>
                    </div>

                    <div className="flex mt-4 gap-3 flex-wrap sm:flex-nowrap">
                      <button
                        className="flex-1 cursor-pointer justify-center items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-600 active:scale-95 transition"
                        onClick={close}
                      >
                        Back
                      </button>

                      <button
                        onClick={() => window.location.reload()}
                        className="flex-1 cursor-pointer justify-center items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 active:scale-95 transition"
                      >
                        View item
                      </button>

                      <button
                        onClick={handleAdd}
                        className="flex-1 cursor-pointer justify-center items-center rounded-md border-2 border-green-500 text-green-600 px-3 py-2 text-sm font-semibold hover:bg-green-500 hover:text-white active:scale-95 transition"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDetailedPage;

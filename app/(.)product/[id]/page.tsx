"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FetchData } from "app/page";
import { ProductType } from "app/types/product";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CustomImage from "app/components/image";
import { ClipLoader } from "react-spinners";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductDetailedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setisLoading] = useState(false);
  const [product, setProdcut] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    router.back();
  }

  console.log(isLoading);
  useEffect(() => {
    const GetDetailedProduct = async () => {
      setisLoading(true);
      try {
        const product = await FetchData<ProductType>(
          `https://fakestoreapi.com/products/${id}`
        );
        setProdcut(product);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    GetDetailedProduct();
  }, [id]);
  return (
    <div className="">
      <Dialog
        open={isOpen}
        as="div"
        className="relative focus:outline-none"
        onClose={close}
      >
        <div className="fixed bg-black/30 inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex text-black border min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-fit mt-30 md:mt-0 rounded-[5px] bg-white  p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {isLoading ? (
                <ClipLoader />
              ) : (
                <div className="flex flex-col max-w-[800px] h-[400px] sm:h-[300px] sm:flex-row ">
                  <div className="relative sm:w-1/2 w-full p-2 m-3 hover:scale-110 transition-transform duration-300 ease-in-out  h-60 ">
                    {product?.image && <CustomImage product={product} fill />}
                  </div>

                  <div className="flex flex-col sm:w-1/2 w-full justify-between ">
                    <div className="">
                      <DialogTitle as="h3" className=" font-semibold text-xl  ">
                        {product?.title}
                      </DialogTitle>
                      <div className="flex justify-between mt-2">
                        <span className="font-semibold">
                          Price: &#36;{product?.price}
                        </span>
                        <div>
                          <Rating
                            style={{ maxWidth: 100 }}
                            value={Math.floor(Number(product?.rating.rate))}
                          />
                          <span className="font-semibold">
                            Rate: {product?.rating?.rate}
                          </span>
                        </div>
                      </div>
                      <div className="my-3 leading-relaxed text-base line-clamp-3  text-black/50">
                        {product?.description}
                      </div>
                    </div>

                    <div className=" flex mt-auto">
                      <button
                        className="inline-flex justify-center w-[130px] items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                        onClick={close}
                      >
                        Got it, thanks!
                      </button>
                      <button className="inline-flex justify-center w-[130px] ml-3 items-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                        View item
                      </button>
                      <button className="inline-flex justify-center w-[130px] ml-3 items-center gap-2 rounded-md bg-transparent duration-300 ease-in-out hover:bg-green-500 border-2 border-green-500 text-green-500 px-3 py-1.5 text-sm/6 font-semibold hover:text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
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

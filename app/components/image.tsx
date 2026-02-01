"use client";
import { ProductType } from "app/types/product";
import Image from "next/image";
import { FC, useState } from "react";

export type Props = {
  product: ProductType;
  fill?: boolean;
};

const CustomImage: FC<Props> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      fill
      priority
      className={`rounded-lg  object-contain duration-700 ease-in-out ${
        isLoading ? "scale-110 blur-2xl grayscale" : ""
      }`}
      onLoad={() => setIsLoading(false)}
      src={product.image}
      alt="content"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
    />
  );
};

export default CustomImage;

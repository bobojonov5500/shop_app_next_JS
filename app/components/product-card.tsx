import { ProductType } from "app/types/product";
import CustomImage from "./image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-gray-100 p-6 h-[500px] rounded-lg">
        <div className="relative p-2 m-3  hover:scale-110 transition-transform duration-300 ease-in-out w-full h-60 ">
          <CustomImage product={product} fill />
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Price: &#36;{product.price}</span>
          <span className="font-semibold">Rate: {product.rating.rate}</span>
        </div>
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          {product.title}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
          {product.category}
        </h2>
        <p className="leading-relaxed text-base line-clamp-3">
          {product.description}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

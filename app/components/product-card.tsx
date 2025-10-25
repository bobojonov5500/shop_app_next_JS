import { ProductType } from "app/types/product";
import Image from "next/image";
// import Image from "next/image";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="relative p-2 m-3 hover:scale-110 transition-transform duration-300 ease-in-out w-full h-60 ">
        <Image
          fill
          className=" rounded-lg object-contain"
          src={product.image}
          alt="content"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
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
  );
};

export default ProductCard;

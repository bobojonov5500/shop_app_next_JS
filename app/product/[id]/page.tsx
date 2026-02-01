import CustomImage from "app/components/image";
import { ProductType } from "app/types/product";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products: ProductType[] = await res.json();

    return products.map((product) => ({
      id: String(product.id),
    }));
  } catch (error) {
    console.error("Build vaqtida xatolik:", error);
    return [];
  }
}

const ProductDetailedPage1 = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    notFound();
  }

  const product: ProductType = await res.json();

  if (!product.id) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row items-center mt-[200px]  md:mt-0 max-w-9/12 mx-auto h-screen md:justify-between gap-x-[50px] ">
      <div className="relative  p-2 m-3 hover:scale-110 w-2/5  transition-transform duration-300 ease-in-out h-[250px] sm:h-[350px] md:h-[450px] ">
        <CustomImage product={product} />
      </div>
      <div className="w-3/5">
        <h1 className="font-bold mb-5 text-[20px] sm:text-[32px] md:text-4xl">
          {product.title}
        </h1>
        <span className="font-bold text-[25px] text-gray-500">
          Starts from: &#36;{product.price}
        </span>
        <p className="mt-[21px] text-[13px] sm:text-[16px] md:text-[20px]">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailedPage1;

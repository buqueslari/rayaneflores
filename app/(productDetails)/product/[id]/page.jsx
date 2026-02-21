import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { allProducts } from "@/data/products";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;
  const product = allProducts.find((p) => p.id == id) || allProducts[0];

  return {
    title: `${product.title} || Gaby Flores`,
    description: product.description || "Confira este produto incrível!",
    openGraph: {
      title: `${product.title} || Gaby Flores`,
      description: product.description || "Veja mais detalhes sobre este produto.",
      images: [
        {
          url: product.images[0] || "/default-image.jpg",
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function page({ params }) {
  const { id } = await params;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <Header2 />
      <Breadcumb product={product} />
      <Details1 product={product} />
      <Descriptions1 description={product.description} />
      <RelatedProducts />
      <Footer1 hasPaddingBottom />
    </>
  );
}

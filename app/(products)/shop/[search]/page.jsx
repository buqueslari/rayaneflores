import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Products1 from "@/components/products/Products1";
import React from "react";



export default async function page({ params }) {
  const { search } = await params;
  const collection = decodeURIComponent(search.split("-").join(" "));
  console.log(collection);
  return (
    <>
      <Header2 />
      <Products1 collection={collection} />
      <Footer1 />
    </>
  );
}

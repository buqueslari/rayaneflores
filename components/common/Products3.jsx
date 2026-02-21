"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { productMain } from "@/data/products";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const tabItems = ["Buquês", "Cestas", "Promoção","Páscoa"];
export default function Products3({ parentClass = "flat-spacing-3" }) {
  const [activeItem, setActiveItem] = useState(tabItems[0]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    document.getElementById("newArrivals").classList.remove("filtered");
    setTimeout(() => {
      setSelectedItems(productMain.filter((elm) => elm.tabFilterOptions2.includes(activeItem)));
      document.getElementById("newArrivals").classList.add("filtered");
    }, 300);
  }, [activeItem]);

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="flat-animate-tab" style={{ justifyContent: "center" }}>
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {tabItems.map((item) => (
              <li key={item} className="nav-tab-item">
                <a
                  href={`#`}
                  className={activeItem === item ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div className="tab-pane active show tabFilter filtered" id="newArrivals" role="tabpanel">
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {selectedItems.slice(0, 12).map((product, i) => (
                  <ProductCard1 key={i} product={product} />
                ))}
              </div>
              <div className="sec-btn text-center">
                {(() => {
                  switch (activeItem) {
                    case tabItems[0]:
                      return (
                        <Link href="/shop/buquê" className="btn-line">
                          Ver Todos Buquês
                        </Link>
                      );
                    case tabItems[1]:
                      return (
                        <Link href="/shop/Páscoa" className="btn-line">
                          Ver Todos Produtos de Páscoa
                        </Link>
                      );
                    case tabItems[2]:
                      return (
                        <Link href="/shop/cesta" className="btn-line">
                          Ver Todas Cestas
                        </Link>
                      );
                    case tabItems[3]:
                      return (
                        <Link href="/shop/Promo%C3%A7%C3%A3o" className="btn-line">
                          Ver Todas as Promoções
                        </Link>
                      );
                    default:
                      return (
                        <Link href={`/shop`} className="btn-line">
                          Ver Todos Produtos
                        </Link>
                      );
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

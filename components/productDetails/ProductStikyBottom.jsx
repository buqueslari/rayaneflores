"use client";
import { useContextElement } from "@/context/Context";
import { carrinho } from "@/data/products";
import Image from "next/image";
import React, { useState } from "react";
import QuantitySelect from "./QuantitySelect";
import SizeSelect2 from "./SideSelect2";

export default function ProductStikyBottom() {
  const {
    addProductToCart,
    isAddedToCartProducts,

    cartProducts,
    updateQuantity,
  } = useContextElement();
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1

  return (
    <div className="tf-sticky-btn-atc" style={{ display: "none" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="form-sticky-atc" onSubmit={(e) => e.preventDefault()}>
              <div className="tf-sticky-atc-product">
                <div className="image">
                  <Image className="lazyload" alt="" src={carrinho[2].images[0]} width={600} height={800} />
                </div>
                <div className="content">
                  <div className="text-title">{carrinho[2].title}</div>
                  <div className="text-title">R${carrinho[2].price.toFixed(2)}</div>
                </div>
              </div>
              <div className="tf-sticky-atc-infos">
                {/* <SizeSelect2 /> */}
                <div className="tf-sticky-atc-quantity d-flex gap-12 align-items-center">
                  <div className="tf-sticky-atc-infos-title text-title">Quantidade:</div>
                  <QuantitySelect
                    styleClass="style-1"
                    quantity={isAddedToCartProducts(carrinho[2].id) ? cartProducts.filter((elm) => elm.id == carrinho[2].id)[0].quantity : quantity}
                    setQuantity={(qty) => {
                      if (isAddedToCartProducts(carrinho[2].id)) {
                        updateQuantity(carrinho[2].id, qty);
                      } else {
                        setQuantity(qty);
                      }
                    }}
                  />
                </div>
                <div className="tf-sticky-atc-btns">
                  <a onClick={() => addProductToCart(carrinho[2].id, quantity)} className="tf-btn w-100 btn-reset radius-4 btn-add-to-cart">
                    <span className="text text-btn-uppercase"> {isAddedToCartProducts(carrinho[2].id) ? "Adicionado" : "Adicionar -"}</span>
                    <span className="tf-qty-price total-price">R${isAddedToCartProducts(carrinho[2].id) ? (carrinho[2].price * cartProducts.filter((elm) => elm.id == carrinho[2].id)[0].quantity).toFixed(2) : (carrinho[2].price * quantity).toFixed(2)}</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

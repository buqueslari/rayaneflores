"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ScrollTop({ hasPaddingBottom = false }) {
  const [isButtonVisible] = useState(true);

  const handleScrollToTop = () => {
    const telefone = "5522920041353";
    let mensagem = "Olá, Gaby! 😊 Gostaria de ver o catálogo, por favor.";

    const mensagemCodificada = encodeURIComponent(mensagem);
    const url = `https://wa.me/${telefone}?text=${mensagemCodificada}`;

    window.open(url, "_blank");
  };

  return (
   <button id="scroll-top" style={{ background: "green", width: "80px", height: "80px" }} className={` scroll-top-button ${hasPaddingBottom ? "type-1" : ""} ${isButtonVisible ? "show" : ""}`} onClick={handleScrollToTop}>
      <FaWhatsapp size={50} />
    </button>
  );
}

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { slides } from "@/data/heroSlides";
import Image from "next/image";
export default function Hero() {
  function redirecionarParaWhatsApp() {
    const telefone = "5522920041353";
    let mensagem = "Olá, Gaby! 😊 Gostaria de ver o catálogo, por favor.";

    const mensagemCodificada = encodeURIComponent(mensagem);
    const url = `https://wa.me/${telefone}?text=${mensagemCodificada}`;

    window.open(url, "_blank");
  }
  return (
    <section className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        effect="fade"
        spaceBetween={0}
        centeredSlides={false}
        slidesPerView={1}
        loop={true}
        modules={[EffectFade, Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        dir="ltr"
        pagination={{
          clickable: true,
          el: ".spd55",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <button onClick={redirecionarParaWhatsApp}>
                <Image alt={slide.alt} src={slide.imgSrc} fill priority />
              </button>
              <div className="box-content">
                <div className="content-slider">
                  <div className="box-title-slider">
                    {/* <p className="fade-item fade-item-1 subheading text-btn-uppercase text-pink">
                      {slide.subheading}
                    </p> */}
                    {/* <div className="fade-item fade-item-2 heading text-pink title-display">
                      {slide.heading.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </div> */}
                  </div>
                  {/* <div className="fade-item fade-item-3 box-btn-slider">
                    <Link href={`/`} className="tf-btn btn-fill btn-white">
                      <span className="text">{slide.btnText}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd55" />
        </div>
      </div>
    </section>
  );
}

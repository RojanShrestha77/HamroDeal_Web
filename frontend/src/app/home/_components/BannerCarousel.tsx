"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  { id: 1, image: "/real2.png", title: "Summer Sale", link: "/products" },
  { id: 2, image: "/real3.png", title: "New Arrivals", link: "/products" },
  { id: 3, image: "/real1.png", title: "Electronics Deal", link: "/products" },
  {
    id: 4,
    image: "/real4.png",
    title: "Fashion Collection",
    link: "/products",
  },
];

export default function BannerCarousel() {
  const router = useRouter();

  return (
    <div className="w-full mb-8 mt-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="banner-swiper overflow-hidden w-full h-[450px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="!h-[450px]">
            <div
              onClick={() => router.push(banner.link)}
              className="relative w-full h-[450px] cursor-pointer group overflow-hidden"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* ── Pagination dots ── */
        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          width: 32px;
          height: 32px;
          background: #ffffff;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          color: #111111;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
          top: 50%;
          transform: translateY(-50%);
        }
        .banner-swiper .swiper-button-prev {
          left: 14px;
        }
        .banner-swiper .swiper-button-next {
          right: 14px;
        }
        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 10px;
          font-weight: 900;
          color: #111111;
        }
        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: #f0f0f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transform: translateY(-50%) scale(1.06);
        }
      `}</style>
    </div>
  );
}

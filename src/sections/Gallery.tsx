import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../assets/gallery-1.svg";
import img2 from "../assets/gallery-2.svg";
import img3 from "../assets/gallery-3.svg";
import img4 from "../assets/gallery-4.svg";

const galleryImages = [img1, img2, img3, img4];

const ProjectGallery = () => {
  return (
    <>
      <div id="gallery" className="bg-white w-full md:mb-5 mt-5 pt-7 md:pt-0 pb-6">
        {/* Title */}
        <div className="flex justify-center pb-4 md:pb-0">
          <p className="text-2xl md:text-3xl font-semibold text-[#26650B] mb-4 md:mb-8 px-6 text-center md:text-center md:pt-8">
            Project Gallery
          </p>
        </div>

        {/* Mobile - Swiper with 1 image per slide */}
        <div className="block md:hidden px-4">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {galleryImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop - 4 image row */}
        <div className="hidden md:grid grid-cols-4 gap-4 px-5">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      </div>

      {/* Swiper dot styling */}
      <style>{`
        .swiper-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: rgb(123, 123, 121);
          opacity: 0.5;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background-color: rgb(56, 57, 56);
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </>
  );
};

export default ProjectGallery;

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import image1 from "../assets/amenities-1.svg";
import image2 from "../assets/amenities-2.svg";
import image3 from "../assets/amenities-3.svg";
import image4 from "../assets/amenities-4.svg";
import image5 from "../assets/amenities-5.svg";
import image6 from "../assets/amenities-6.svg";

const images = [image1, image2, image3, image4, image5, image6];

interface AmenitiesProps {
  openModal: () => void;
}

function Amenities({ openModal }: AmenitiesProps) {
  return (
    <>
      <div id="amenities" className="bg-white w-full  mb-6 mt-5">
        <div className="flex justify-center">
          <p className=" md:pt-10 pt-6 text-2xl md:text-3xl text-left font-semibold text-[#26650B] mb-4 md:mb-12 px-6 md:px-0">
            Luxurious Amenities
          </p>
        </div>

        {/* Mobile view - Swiper */}
        <div className="block md:hidden px-4">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="pb-10" // Increased padding at bottom
          >
            {Array.from({ length: Math.ceil(images.length / 2) }).map(
              (_, i) => (
                <SwiperSlide key={i}>
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={images[i * 2]}
                      alt={`Image ${i * 2 + 1}`}
                      className="w-[90%] h-auto"
                    />
                    {images[i * 2 + 1] && (
                      <img
                        src={images[i * 2 + 1]}
                        alt={`Image ${i * 2 + 2}`}
                        className="w-[90%] h-auto"
                      />
                    )}
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>

        {/* Desktop view - 3x2 Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4 px-60 md:px-25">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className="w-100 h-auto object-cover"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#26650B] text-white py-2 px-10 rounded-lg mt-6 md:mt-10 shadow transition cursor-pointer transition-transform duration-300 transform hover:scale-105 mb-5"
            onClick={openModal}
          >
            Request All Amenities
          </button>
        </div>
      </div>

      {/* Custom Swiper pagination styling */}
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
}

export default Amenities;

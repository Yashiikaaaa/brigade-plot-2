// import React from "react";
import homeImg from "../assets/home-image.svg";

interface HomeProps {
  openModal: () => void;
}

const Home = ({ openModal }: HomeProps) => {
  return (
    <>
      <div className="relative w-full overflow-x-hidden md:mt-[69px]">
        {/* Image */}
        <img
          src={homeImg}
          alt="home"
          className="w-screen h-auto  md:w-screen md:h-200 object-cover"
        />

        {/* Mobile "Enquire Now" Button */}
        <div className="flex justify-center md:hidden">
          <button
            className="px-8 bg-black text-white py-2 rounded-md font-normal absolute top-[20%]"
            onClick={openModal}
          >
            Enquire Now
          </button>
        </div>

        {/* Form */}
        <div className="m-4 md:absolute md:top-90 md:left-16 md:-translate-y-1/2 md:z-10">
          <HomeInfo openModal={openModal} />
        </div>
      </div>
    </>
  );
};

const HomeInfo = ({ openModal }: HomeProps) => {
  return (
    <>
      <div
        className="bg-white p-4 rounded-2xl w-full max-w-md mx-auto text-center md:p-6"
        id="home"
      >
        <p className="text-lg text-black">New Launch</p>
        <h2 className="text-2xl font-bold">BRIGADE PLOTS</h2>
        <p className="text-lg text-black mb-3 font-semibold">
          At Malur, Bangalore
        </p>

        <div className="px-2">
          <div className="bg-[#26650B] text-white font-medium text-[15px] mb-2 p-1.5">
            <div className="border-2 border-dashed border-white px-3 py-2.5 rounded">
              On-Spot Booking Perks Await! Call Now
            </div>
          </div>

          <a href="tel:+918123130034" className="block">
            <div className="bg-[#26650B] text-white font-medium text-[15px] mb-2 p-1.5">
              <div className="border-2 border-dashed border-white px-3 py-2.5 rounded">
                +91-8123130034
              </div>
            </div>
          </a>
        </div>

        <div className="bg-gray-100 rounded-lg pl-6 py-4 mb-4 text-sm text-black">
          <div className="flex justify-center gap-x-4 md:gap-x-9 ">
            {/* Left Column: Labels */}
            <div className="flex flex-col text-left">
              <span className="text-base">Area:</span>
              <span className="text-base">Plots :</span>
              <span className="text-base">Size :</span>
            </div>

            {/* Right Column: Values */}
            <div className="flex flex-col text-left">
              <span className="text-base">20 Acres (Phase 1)</span>
              <span className="text-base">300+</span>
              <span className="text-base">1200, 1500, 2040 sq.ft</span>
            </div>
          </div>
        </div>

        <div className="bg-[#26650B] text-white text-base  py-2 px-4 mb-4 ">
          80% Open Area
        </div>

        <div className="px-2">
          <div className="bg-[#26650B] text-white font-medium text-[15px] mb-2 p-1.5">
            <div className="border-2 border-dashed border-white px-3 py-2 rounded">
              <ul className="list-inside ">
                <li>
                  <span className="text-lg">◆</span> Spot Booking Offers
                </li>
                <li>
                  <span className="text-lg">◆</span> Early Buy Discounts
                </li>
                <li>
                  <span className="text-lg">◆</span> Guaranteed Best Rate
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-base">Starting Price</p>
        <p className=" text-3xl font-bold mb-3">
          <span className="text-[#26650B]">₹ 69 lakhs</span>*
          <span className="text-black font-medium text-lg"> Onwards</span>
        </p>

        <button
          onClick={openModal}
          className="bg-black text-white px-18 py-2 rounded-md shadow-lg cursor-pointer
             transition-transform duration-300 transform hover:scale-105"
        >
          Enquire Now
        </button>
      </div>
    </>
  );
};

export default Home;

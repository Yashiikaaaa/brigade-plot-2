const MobilePreRegister = () => {
  return (
    <div className="block lg:hidden  py-6 bg-white rounded-lg mt-1">
      {/* Heading */}
      <h3 className="text-center text-lg  mb-2">
        Pre-Register here for Best Offers
      </h3>
      <div className="border-1 mb-8 border-[#CCCCCC]"></div>

      {/* Input Fields */}
      <div className="flex flex-col space-y-3 px-[15%]">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none placeholder:text-black"
        />
        <input
          type="tel"
          placeholder="+91 - Mobile No"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none placeholder:text-black"
        />
      </div>

      {/* Button */}
      <div className="mt-4 flex justify-start px-[15%]">
        <button className="bg-[#26650B] text-white text-sm py-2 px-5 rounded shadow-md transition-transform duration-300 hover:scale-105">
          Pre-Register Now
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-gray-600 leading-snug mt-4 px-[15%]">
        I authorize company representatives to Call, SMS, Email or WhatsApp
        me about its products and offers. This consent overrides any
        registration for DNC/NDNC.
      </p>
    </div>
  );
};

export default MobilePreRegister;

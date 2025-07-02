interface AreaPricingProps {
  openModal: () => void;
}

const pricingData = [
  { area: "1200 Sq.ft.", price: "₹ 69 lakhs*", unit: "Onwards" },
  { area: "1500 Sq.ft.", price: "₹ 86 lakhs*", unit: "Onwards" },
  { area: "2040 Sq.ft.", price: "₹ 1.2 Cr*", unit: "Onwards" },
];

const AreaPricing = ({ openModal }: AreaPricingProps) => {
  return (
    <section id="pricingAndFloorPlan" className="px-6 py-6 bg-white mt-5">
      {/* Title */}
      <h2 className="text-xl md:text-2xl md:py-4 font-semibold text-[#26650B] mb-5 text-center">
        Area & Pricing
      </h2>

      {/* Mobile View (card style) */}
      <div className="max-w-md mx-auto text-center md:hidden">
        <div className="border-3 border-[#26650B] rounded-3xl px-6 pt-6 space-y-6">
          {pricingData.map((item, index) => (
            <div key={index} className="space-y-1 pb-8">
              <p className="text-base">{item.area}</p>
              <p className="text-xl font-semibold text-black">
                {item.price} {item.unit}
              </p>
              <button
                onClick={openModal}
                className="bg-[#26650B] text-white text-xs py-2.5 px-6 rounded-md shadow-sm transition-transform duration-300 transform hover:scale-105"
              >
                Complete Costing Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View (table style) */}
<div className="hidden md:block max-w-5xl mx-auto pb-6">
  <div className="overflow-x-auto rounded-t-3xl">
    {/* Header with custom widths */}
    <div className="bg-[#26650B] text-white font-base text-lg text-center grid grid-cols-[25%_25%_50%] py-3 rounded-t-3xl">
      <div className="text-center">Area</div>
      <div className="text-center">Price</div>
      <div></div>
    </div>

    {pricingData.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-[25%_25%_50%] items-center text-center py-4"
      >
        {/* Area */}
        <div className="text-lg text-center">{item.area}</div>

        {/* Price (left-aligned inside its grid cell) */}
        <div className="text-lg font-semibold ">
          {item.price} <span className="font-normal">{item.unit}</span>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="bg-[#26650B] text-white text-base py-2 px-10 rounded-md shadow-sm transition-transform duration-300 transform hover:scale-105 cursor-pointer"
          >
            Complete Costing Details
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </section>
  );
};

export default AreaPricing;

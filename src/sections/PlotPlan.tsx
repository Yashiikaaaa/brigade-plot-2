import plotPlan from "../assets/plot-layout.svg";

interface PlotPlanProps {
  openModal: () => void;
}

const PlotPlanLayout = ({ openModal }: PlotPlanProps) => {
  return (
    <div className="bg-white px-4 text-center mt-5 py-6 md:pt-20 md:pb-10 md:flex md:items-start md:justify-center md:gap-10">
      {/* Left section: Heading + underline + button */}
      <div className="md:mr-5 md:text-left">
        <h2 className="text-[#26650B] text-3xl md:text-4xl font-bold md:font-normal  mb-4">Unit Plan Layout</h2>

        <div className="relative flex justify-center ">
          <div className="border border-gray-300 w-40 mb-5" />
          <div className="w-12 h-0.5 bg-[#26650B] mx-auto absolute top-0 z-1" />
        </div>

        <button
          className="bg-[#26650B] text-white py-2 px-10 rounded-lg mt-6 shadow transition cursor-pointer transition-transform duration-300 transform hover:scale-105 hidden md:inline-block"
          onClick={openModal}
        >
          Request Unit Layout Plan
        </button>
      </div>

      {/* Right section: Image with overlay */}
      <div className="relative md:w-[50%] md:px-10 md:ml-20">
        <img src={plotPlan} alt="Plot Layout" className="w-full h-auto px-8 md:px-0 " />
        <div className="absolute inset-0 flex items-center justify-center">
        </div>
      </div>

      {/* Mobile-only button */}
      <button
        className="bg-[#26650B] text-white py-2 mb-4 px-10 rounded-lg mt-6 shadow transition cursor-pointer transition-transform duration-300 transform hover:scale-105 md:hidden"
        onClick={openModal}
      >
        Request Unit Layout Plan
      </button>
    </div>
  );
};

export default PlotPlanLayout;

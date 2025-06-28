import aboutImg from "../assets/about-image.svg";

interface HighlightsProps {
  openModal: () => void;
}

const Highlights = ({ openModal }: HighlightsProps) => {
  return (
    <section id="highlights" className="px-4 py-8  mx-auto bg-white md:mt-6 mt-5">
      <div className="flex flex-col md:flex-row  md:justify-between gap-8">
        {/* Text Section */}
        <div className="md:w-1/2 md:pl-15 ">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#26650B] mb-2">
            About Brigade Plots
          </h2>

          <p className="text-sm md:text-base text-black mb-6 md:mt-6">
            Presenting Brigade Plots Malur an Abode of Peace! Finally here's a
            home that lets you put your family first. Located close to Hoskote
            in the upcoming neighbourhood of Malur, this project is set to be a
            landmark in the East Bengaluru area.
          </p>

          <button
            onClick={openModal}
            className="bg-black md:bg-[#26650B] text-white text-sm font-medium md:font-light py-3 px-6 md:px-23 rounded-md mb-13 md:mt-5 cursor-pointer
             transition-transform duration-300 transform hover:scale-105"
          >
            Enquire Now
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={aboutImg}
            alt="Brigade Plots Interior"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Highlights;

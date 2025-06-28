import locationImg from "../assets/map.svg";
import binocsImg from "../assets/icons/binoculars.svg";

interface LocationAdvantageProps {
  openModal: () => void;
}

const LocationAdvantage = ({ openModal }: LocationAdvantageProps) => {
  return (
    <div id="location" className="bg-white px-6 py-6 w-full text-left mt-5 md:mt-0">
      {/* Desktop Layout Wrapper */}
      <div className="md:flex md:items-start md:justify-between md:gap-10 md:pl-14 md:pr-10">
        {/* Left: Textual Content */}
        <div className="md:w-1/2">
          {/* Title */}
          <h2 className="text-[#26650B] text-xl md:text-3xl font-semibold leading-tight mb-4 md:mb-8">
            Brigade Plots <br className="md:hidden"/> Location Advantage
          </h2>

          {/* Subheading with icon */}
          <div className="flex items-center gap-2 text-black font-bold mb-4 mt-2 px-2 md:px-0 md:mb-10">
            <img src={binocsImg} alt="binoculars" />
            <span>Connectivity</span>
          </div>

          {/* Bullet points */}
          <ul className="list-disc pl-4 text-xs md:text-base text-[#2D2D2D] leading-relaxed space-y-6 mb-6 md:mb-10">
            <li>
              Malur, tucked on the edge of North-East Bengaluru and situated
              about 30 km east of Whitefield is transforming from the hitherto
              quiet neighbourhood to the next big name on the investor map,
              while experiencing tremendous traction.
            </li>
            <li>
              Malur is leveraging the rapid expansion of the ‘North Bengaluru
              narrative’ and is emerging as a logical spillover for the growing
              residential and commercial demand from Budigere, Whitefield and
              Hoskote.
            </li>
          </ul>
        </div>

        {/* Right: Map Image */}
        <div className="md:w-[60%] md:pl-25 mt-8 md:pt-6 flex justify-center">
          <img
            src={locationImg}
            alt="Location Map"
            className="w-[90%] md:w-full h-auto rounded mb-6 md:mb-0"
          />
        </div>
      </div>

      {/* Button: shown after image on mobile, bottom on desktop */}
      <div className="flex justify-center md:justify-start md:px-18 mt-4">
        <button
          onClick={openModal}
          className="bg-[#26650B] text-white py-2 px-10 rounded-lg shadow transition cursor-pointer transition-transform duration-300 transform hover:scale-105"
        >
          Request Location Details
        </button>
      </div>
    </div>
  );
};

export default LocationAdvantage;

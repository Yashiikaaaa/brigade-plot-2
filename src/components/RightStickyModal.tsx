import { useState } from "react";
import callIcon from "../assets/icons/call-icon.svg";
import visitIcon from "../assets/icons/visit-icon.svg";
import priceIcon from "../assets/icons/price-icon.svg";
import phoneIcon from "../assets/icons/phone-icon.svg";

interface RightStickyModalProps {
  openModal: () => void;
}

const RightStickyModal = ({ openModal }: RightStickyModalProps) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError("Please enter your name.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (mobile.length !== 10) {
      setMobileError("Enter a valid 10-digit mobile number.");
      hasError = true;
    } else {
      setMobileError("");
    }

    if (hasError || loading) return;

    const payload = {
      name: name.trim().toLowerCase(),
      phonenumber: `+91${mobile}`,
      campaign: true,
      projectId: "vDJtBNSMTbRpndgM4GRf",
      projectName: "assetz codename micropolis",
      currentAgent: "yasswanth@truestate.in",
      utmDetails: {
        source: null,
        medium: null,
        campaign: null,
      },
    };

    try {
      setLoading(true);

      const response = await fetch("https://handlemultiplecampaigndata-66bpoanwxq-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      console.log("Success:", result);

      alert("We received your info. Expect a response soon!");

      setName("");
      setMobile("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hidden lg:flex fixed top-0 right-0 w-[280px] h-screen bg-white z-40 shadow-xl flex-col pb-4 justify-between">
      <div>
        {/* Top Strip */}
        <div className="flex bg-black text-white text-xs w-full">
          <div className="w-1/2 flex items-center justify-center py-2 cursor-pointer" onClick={openModal}>
            Schedule Site Visit
          </div>
          <div className="w-1/2 flex items-center justify-center border-l border-white">
            <img src={phoneIcon} alt="call" className="w-3 h-3 mr-1" />
            <a href="tel:+918919456501" className="hover:underline">
              +91-8919456501
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col mt-6 space-y-3 px-4">
          <h3 className="font-bold text-base">Pre-Register here for Best Offers</h3>

          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none placeholder:text-gray-800 mt-3"
            />
            {nameError && <p className="text-red-600 text-xs mt-1">{nameError}</p>}
          </div>

          {/* Mobile Field */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black overflow-hidden mt-3">
              <span className="px-3 text-sm text-gray-700 border-r border-gray-300">
                +91
              </span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setMobile(value);
                  }
                }}
                maxLength={10}
                placeholder="Mobile No"
                className="w-full px-3 py-2 text-sm focus:outline-none placeholder:text-gray-800"
              />
            </div>
            {mobileError && <p className="text-red-600 text-xs mt-1">{mobileError}</p>}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-[#26650B] text-white text-sm py-2 px-4 rounded shadow-md cursor-pointer self-start mt-2 transition-transform duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? "Submitting..." : "Pre-Register Now"}
          </button>

          {/* Consent */}
          <p className="text-[10px] text-gray-600 leading-snug mt-4">
            I authorize company representatives to Call, SMS, Email or WhatsApp
            me about its products and offers. This consent overrides any
            registration for DNC/NDNC.
          </p>

          {/* Icons */}
          <div className="flex justify-between items-start pt-3 text-xs text-center mt-3">
            <div className="flex flex-col items-center w-1/3 min-h-[60px]">
              <img src={callIcon} alt="Call Back" className="w-8 h-8 mb-1" />
              <div className="leading-tight h-[32px] flex flex-col justify-start">
                <p>Instant Call</p>
                <p>Back</p>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3 min-h-[60px]">
              <img src={visitIcon} alt="Site Visit" className="w-8 h-8 mb-1" />
              <div className="leading-tight h-[32px] flex flex-col justify-start">
                <p>Free Site</p>
                <p>Visit</p>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3 min-h-[60px]">
              <img src={priceIcon} alt="Best Price" className="w-8 h-8 mb-1" />
              <div className="leading-tight h-[32px] flex items-start justify-start">
                <p>Best Price</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full pt-3 flex justify-center">
        <button
          className="bg-[#26650B] text-white text-sm py-2 px-4 rounded shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={openModal}
        >
          Request Call Back
        </button>
      </div>
    </div>
  );
};

export default RightStickyModal;

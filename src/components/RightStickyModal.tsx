import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import callIcon from "../assets/icons/call-icon.svg";
import visitIcon from "../assets/icons/visit-icon.svg";
import priceIcon from "../assets/icons/price-icon.svg";
import phoneIcon from "../assets/icons/phone-icon.svg";
import { FormAlert } from "./FormAlert";
import ReactGA from "react-ga4";

// Declare global types for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
  interface ImportMetaEnv {
    readonly VITE_GA_MEASUREMENT_ID?: string;
    [key: string]: string | boolean | undefined;
  }
}

// Initialize GA4
const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (trackingId) {
  ReactGA.initialize(trackingId);
}

// Google Ads Conversion
const gtag_report_conversion = (url?: string) => {
  if (typeof window.gtag !== "undefined") {
    const callback = () => {
      if (url) window.location.href = url;
    };
    window.gtag("event", "conversion", {
      send_to: "AW-16460421460/zvkSCLj3m6caENSy-Kg9",
      value: 1.0,
      currency: "INR",
      event_callback: callback,
    });
  }
};

interface RightStickyModalProps {
  openModal: () => void;
}

const RightStickyModal = ({ openModal }: RightStickyModalProps) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [submittedNumbers, setSubmittedNumbers] = useState<Set<string>>(new Set());
  const [utmParams, setUtmParams] = useState({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utmSource");
    const medium = params.get("utmMedium");
    const campaign = params.get("utmCampaign");

    ReactGA.send({
      hitType: "pageview",
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
    });

    setUtmParams({
      utmSource: source || "",
      utmMedium: medium || "",
      utmCampaign: campaign || "",
    });
  }, []);

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (value.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      setNameError("Name should only contain letters and spaces");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateContactNumber = (value: string) => {
    if (!value) {
      setMobileError("Contact number is required");
      return false;
    }
    if (submittedNumbers.has(value)) {
      setMobileError("This number has already been submitted.");
      return false;
    }
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setMobileError("Please enter a valid phone number.");
      return false;
    }
    setMobileError("");
    return true;
  };

  const handleSubmit = async () => {
    const isNameValid = validateName(name);
    const isContactValid = validateContactNumber(mobile);

    if (!isNameValid || !isContactValid || loading) return;

    const payload = {
      name: name.trim().toLowerCase(),
      phonenumber: mobile,
      campaign: true,
      projectId: "vDJtBNSMTbRpndgM4GRf",
      projectName: "assetz codename micropolis",
      currentAgent: "yasswanth@truestate.in",
      utmDetails: {
        source: utmParams.utmSource || null,
        medium: utmParams.utmMedium || null,
        campaign: utmParams.utmCampaign || null,
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

      gtag_report_conversion();

      setSubmittedNumbers((prev) => new Set(prev.add(mobile)));
      setSubmissionStatus("We have successfully received your information. Expect to hear from us shortly!");
      setName("");
      setMobile("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("Something went wrong. Please try again later.");
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
            <a href="tel:+918919456501" >
              +91-8919456501
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col mt-6 space-y-3 px-4">
          <h3 className="font-bold text-base">Pre-Register here for Best Offers</h3>

          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none placeholder:text-gray-500 mt-3 focus:border-black focus:border-2"
            />
            {nameError && <p className="text-red-600 text-xs mt-1">{nameError}</p>}
          </div>

          <div className="mt-3">
            <PhoneInput
              international
              defaultCountry="IN"
              value={mobile}
              onChange={(value) => setMobile(value || "")}
              className={`w-full px-4 py-2 text-sm rounded-md input-phone-number border ${
                mobileError ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {mobileError && <p className="text-red-600 text-xs mt-1">{mobileError}</p>}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-[#26650B] text-white text-sm py-2 px-4 rounded shadow-md cursor-pointer self-start mt-2 transition-transform duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? "Submitting..." : "Pre-Register Now"}
          </button>

          <p className="text-[10px] text-gray-600 leading-snug mt-4">
            I authorize company representatives to Call, SMS, Email or WhatsApp
            me about its products and offers. This consent overrides any
            registration for DNC/NDNC.
          </p>

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

      <div className="w-full pt-3 flex justify-center">
        <button
          className="bg-[#26650B] text-white text-sm py-2 px-4 rounded shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={openModal}
        >
          Request Call Back
        </button>
      </div>

      {submissionStatus && (
        <FormAlert message={submissionStatus} onClose={() => setSubmissionStatus("")} />
      )}
    </div>
  );
};

export default RightStickyModal;

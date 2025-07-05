import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormAlert } from "../components/FormAlert";
import ReactGA from "react-ga4";

// Declare global objects for TS
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

// Google Ads Conversion Trigger
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

const MobilePreRegister = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [submittedNumbers, setSubmittedNumbers] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
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
      setContactError("Contact number is required");
      return false;
    }

    if (submittedNumbers.has(value)) {
      setContactError("This number has already been submitted.");
      return false;
    }

    const digits = value.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setContactError("Please enter a valid phone number.");
      return false;
    }

    setContactError("");
    return true;
  };

  const handleSubmit = async () => {
    const isNameValid = validateName(name);
    const isContactValid = validateContactNumber(contactNumber);

    if (!isNameValid || !isContactValid || isSubmitting) return;

    const payload = {
      name: name.trim().toLowerCase(),
      phoneNumber: contactNumber,
      campaign: true,
      projectId: "P031-A1",
      projectName: "brigade plot malur",
      currentAgent: "yasswanth@truestate.in",
      utmDetails: {
        source: utmParams.utmSource || null,
        medium: utmParams.utmMedium || null,
        campaign: utmParams.utmCampaign || null,
      },
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("https://googleleadsserver.onrender.com/handleMultipleCampaignData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      console.log("Success:", result);

      gtag_report_conversion();

      setSubmittedNumbers((prev) => new Set(prev.add(contactNumber)));
      setSubmissionStatus("We received your info. Expect a response soon!");

      setName("");
      setContactNumber("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="block lg:hidden py-6 bg-white rounded-lg mt-1">
      <h3 className="text-center text-lg mb-2">
        Pre-Register here for Best Offers
      </h3>
      <div className="border-1 mb-8 border-[#CCCCCC]"></div>

      <div className="flex flex-col space-y-3 px-[15%]">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border rounded px-3 py-2 text-sm focus:border-black focus:border-2 placeholder:text-gray-500 focus:outline-none ${
            nameError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {nameError && <p className="text-red-600 text-xs">{nameError}</p>}

        <PhoneInput
          international
          defaultCountry="IN"
          value={contactNumber}
          onChange={(value) => setContactNumber(value || "")}
          className={`input-phone-number border rounded px-3 py-2 text-sm focus:outline-none placeholder:text-black ${
            contactError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {contactError && <p className="text-red-600 text-xs">{contactError}</p>}
      </div>

      <div className="mt-4 flex justify-start px-[15%]">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`bg-[#26650B] text-white text-sm py-2 px-5 rounded shadow-md transition-transform duration-300 ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Pre-Register Now"}
        </button>
      </div>

      <p className="text-[10px] text-gray-600 leading-snug mt-4 px-[15%]">
        I authorize company representatives to Call, SMS, Email or WhatsApp
        me about its products and offers. This consent overrides any
        registration for DNC/NDNC.
      </p>

      {submissionStatus && (
        <FormAlert
          message={submissionStatus}
          onClose={() => setSubmissionStatus("")}
        />
      )}
    </div>
  );
};

export default MobilePreRegister;

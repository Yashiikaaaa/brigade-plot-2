import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import siteImg from "../assets/site-visit.svg";
import { FormAlert } from "../components/FormAlert";
import ReactGA from "react-ga4";

// Declare globals
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
  interface ImportMetaEnv {
    readonly VITE_GA_MEASUREMENT_ID?: string;
    [key: string]: string | boolean | undefined;
  }
}

// Initialize Google Analytics
const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (trackingId) {
  ReactGA.initialize(trackingId);
}

// Google Ads Conversion Tracking
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

const SiteVisitForm = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState({ name: "", contact: "" });
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

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", contact: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    const digits = contactNumber.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      newErrors.contact = "Please enter a valid phone number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) return;

    const payload = {
      name: name.trim().toLowerCase(),
      phonenumber: contactNumber,
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
      const response = await fetch("https://handlemultiplecampaigndata-66bpoanwxq-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = await response.json();
      console.log("Submitted:", result);

      gtag_report_conversion();

      setName("");
      setContactNumber("");
      setSubmissionStatus("We received your info. Expect a response soon!");
    } catch (err) {
      console.error(err);
      setSubmissionStatus("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="relative mt-6 md:mt-25 w-full md:flex md:items-center md:justify-center">
      <div className="absolute -top-3 md:-mt-20 left-0 w-full h-20 md:h-50 bg-[#26650B] z-0" />

      <div className="relative z-10 flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden p-4 mx-4 md:p-0 md:pb-14">
        <div className="block md:hidden">
          <img src={siteImg} alt="Site Visit" className="w-full h-auto object-cover" />
        </div>

        <div className="p-6 px-10 md:w-1/2">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-8">
            Schedule a Site Visit
          </h2>

          <div className="space-y-3 mb-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className={`w-full px-4 py-2 border text-sm rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-700 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black"
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <PhoneInput
                international
                defaultCountry="IN"
                value={contactNumber}
                onChange={(value) => setContactNumber(value || "")}
                className={`w-full px-4 py-2 text-base input-phone-number border rounded-md ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full md:w-auto md:px-20 bg-[#26650B] text-white py-2 rounded-md text-sm shadow cursor-pointer ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:scale-105 transition-transform duration-200"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Pre-Register Now"}
            </button>
          </div>

          <p className="text-[11px] text-gray-600 leading-snug">
            I authorize company representatives to Call, SMS, Email or WhatsApp
            me about its products and offers. This consent overrides any
            registration for DNC/NDNC.
          </p>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img src={siteImg} alt="Site Visit" className="w-full h-full object-cover" />
        </div>
      </div>

      {submissionStatus && (
        <FormAlert message={submissionStatus} onClose={() => setSubmissionStatus("")} />
      )}
    </div>
  );
};

export default SiteVisitForm;

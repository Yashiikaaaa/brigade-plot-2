import { useState } from "react";
import siteImg from "../assets/site-visit.svg"; // Update to your actual image path

const SiteVisitForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({ name: "", mobile: "" });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", mobile: "" };

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Mobile number validation
    if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form submitted successfully!");
      // Perform actual form submission logic here
    }
  };

  return (
    <div className="relative mt-6 md:mt-25 w-full md:flex md:items-center md:justify-center">
      {/* Green background bar */}
      <div className="absolute -top-3 md:-mt-20 left-0 w-full h-20 md:h-50 bg-[#26650B] z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden p-4 mx-4 md:p-0 md:pb-14">
        {/* Image Section for Mobile */}
        <div className="block md:hidden">
          <img
            src={siteImg}
            alt="Site Visit"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="p-6 px-10 md:w-1/2">
          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-8">
            Schedule a Site Visit
          </h2>

          {/* Form */}
          <div className="space-y-3 mb-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-700"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black overflow-hidden mt-3">
  <span className="px-3 text-sm text-gray-700 border-r border-gray-300">
    +91
  </span>
  <input
    type="tel"
    value={mobile}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only digits and limit to 10 characters
      if (/^\d{0,10}$/.test(value)) {
        setMobile(value);
      }
    }}
    maxLength={10}
    placeholder="Mobile No"
    className="w-full px-3 py-2 text-sm focus:outline-none placeholder:text-gray-800"
  />
</div>

          </div>

          {/* Button */}
          <div className="mb-4">
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto md:px-20 bg-[#26650B] text-white py-2 rounded-md text-sm shadow cursor-pointer"
            >
              Pre-Register Now
            </button>
          </div>

          {/* Consent Text */}
          <p className="text-[11px] text-gray-600 leading-snug">
            I authorize company representatives to Call, SMS, Email or WhatsApp
            me about its products and offers. This consent overrides any
            registration for DNC/NDNC.
          </p>
        </div>

        {/* Image Section for Desktop */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={siteImg}
            alt="Site Visit"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SiteVisitForm;

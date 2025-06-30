import React, { useEffect, useState } from "react";
import closeIcon from "../assets/close.svg";
import modalImage from "../assets/modal-image.svg";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormAlert } from "./FormAlert";

interface EnquiryModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, closeModal }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [submittedNumbers, setSubmittedNumbers] = useState<Set<string>>(
    new Set()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  const clearFormState = () => {
    setName("");
    setContactNumber("");
    setNameError("");
    setContactError("");
  };

  const handleCloseModal = () => {
    clearFormState();
    closeModal();
  };

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

    // Check if number was already submitted
    if (submittedNumbers.has(value)) {
      setContactError("This number has already been submitted.");
      return false;
    }

    // Remove non-digit characters for length validation
    const digits = value.replace(/\D/g, "");

    // Check for valid length (10 digits for IN, or general >= 10)
    if (digits.length < 10 || digits.length > 15) {
      setContactError("Please enter a valid phone number.");
      return false;
    }

    setContactError("");
    return true;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (nameError) validateName(value);
  };

  const handleContactChange = (value?: string) => {
    setContactNumber(value || "");
    if (contactError) validateContactNumber(value || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateName(name);
    const isContactValid = validateContactNumber(contactNumber);

    if (!isNameValid || !isContactValid) return;

    setIsSubmitting(true);
    setSubmissionStatus("");

    const payload = {
      name: name.trim().toLowerCase(),
      phonenumber: contactNumber,
      campaign: true,
      projectId: "P031-A1",
      projectName: "brigade plot malur",
      currentAgent: "yasswanth@truestate.in",
      utmDetails: {
        source: null,
        medium: null,
        campaign: null,
      },
    };

    try {
      const response = await fetch(
        "https://handlemultiplecampaigndata-66bpoanwxq-uc.a.run.app",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      setSubmittedNumbers((prev) => new Set(prev.add(contactNumber)));
      setSubmissionStatus(
        "We have successfully received your information. Expect to hear from us shortly!"
      );
      setIsSubmitting(false);
      // handleCloseModal();
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/77 z-50"
      onClick={handleCloseModal}
    >
      {isMobile ? (
        <div
          className="bg-white rounded-2xl p-6 w-[95%] max-w-[400px] relative pt-10"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={closeIcon}
            alt="close"
            className="h-6 w-6 absolute top-5 right-5"
            onClick={handleCloseModal}
          />

          <div className="text-center mb-8 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 leading-tight">
              Know more about Brigade Plots Malur.
              <br />
              Enquire now!
            </h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 text-black font-semibold ${
                  nameError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black focus:border-transparent"
                }`}
                required
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">{nameError}</p>
              )}
            </div>

            <div>
              <PhoneInput
                international
                defaultCountry="IN"
                value={contactNumber}
                onChange={handleContactChange}
                className={`w-full px-4 py-3 border rounded-lg text-base input-phone-number border border-gray-300 ${
                  contactError ? "border-red-500" : ""
                }`}
                required
              />

              {contactError && (
                <p className="text-red-500 text-sm mt-1">{contactError}</p>
              )}
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-3 px-20 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="bg-white rounded-lg overflow-hidden w-[90%] max-w-[1000px] flex"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-1/2">
            <img
              src={modalImage}
              alt="Brigade Plots Aerial View"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-1/2 p-8 relative flex flex-col justify-center">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                Know more about Brigade Plots? Enquire now!
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="px-20">
                <input
                  type="text"
                  placeholder="Name*"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={`w-full px-4 py-2 border focus:outline-none focus:border-2 focus:ring-1 text-black text-base placeholder:text-gray-500 ${
                    nameError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-black focus:border-transparent"
                  }`}
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>

              <div className="px-20">
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={contactNumber}
                  onChange={handleContactChange}
                  className={`w-full px-4 py-2 text-base input-phone-number border border-gray-300 ${
                    contactError ? "border-red-500" : ""
                  }`}
                  required
                />

                {contactError && (
                  <p className="text-red-500 text-sm mt-1">{contactError}</p>
                )}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#008849] text-white py-2 px-12 rounded-xl font-medium text-base hover:bg-green-700 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Shared FormAlert rendered outside the modal content box */}
      {submissionStatus && (
        <FormAlert
          message={submissionStatus}
          onClose={() => setSubmissionStatus("")}
        />
      )}
    </div>
  );
};

export default EnquiryModal;

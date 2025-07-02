const Footer = () => {
  return (
    <div className="pt-2 text-center text-[10px] text-gray-700">
      {/* Phone Number Box */}

      <div className="px-10 py-4 md:hidden">
        <a href="tel:+918123130034" className="block">
          <div className="bg-[#26650B] text-white font-medium text-[15px] mb-2 p-1.5">
            <div className="border-2 border-dashed border-white px-3 py-2.5 rounded">
              +91-8123130034
            </div>
          </div>
        </a>
      </div>

      {/* Disclaimer Text */}
      <div className="bg-white py-4">
        <div className="text-[11px] text-[#5C5E5F] leading-relaxed mb-6 px-4 pt-4">
          <p>
            <span className="font-bold">Disclaimer :</span> The content provided
            on this website is for information purposes only and does not
            constitute an offer to avail any service. The prices mentioned are
            subject to change without prior notice, and the availability of
            properties mentioned is not guaranteed. The images displayed on the
            website are for representation purposes only and may not reflect the
            actual properties accurately. Please note that this is the official
            website of an authorized marketing partner. We may share data with
            Real Estate Regulatory Authority (RERA) registered brokers/companies
            for further processing as required. We may also send updates and
            information to the mobile number or email ID registered with us. All
            rights reserved. The content, design, and information on this
            website are protected by copyright and other intellectual property
            rights. Any unauthorized use or reproduction of the content may
            violate applicable laws. For accurate and up-to-date information
            regarding services, pricing, availability, and any other details, it
            is advisable to contact us directly through the provided contact
            information on this website.
          </p>
          <p>Thank you for visiting our website.</p>
        </div>

        {/* Bottom Notes */}
        <p className="font-semibold text-[11px] md:text-base mb-2">
          We are Authorized Channel Partner with many Developers.
        </p>
        <p className="text-[#1F3A93] md:text-sm underline font-semibold text-[10px]">
          Disclaimer & Privacy Policy
        </p>
      </div>

      {/* Footer bottom bar */}
      <div className="bg-[#232D30] py-2 text-center text-[10px] md:text-xs text-[#B5CFDA] mt-3 border-t pt-2">
        All Rights Reserved. © 2024
      </div>
    </div>
  );
};

export default Footer;

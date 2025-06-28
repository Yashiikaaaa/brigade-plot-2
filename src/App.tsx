import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import RightStickyModal from "./components/RightStickyModal";
import Home from "./sections/Home";
import MobilePreRegister from "./sections/MobilePreRegister";
import Highlights from "./sections/Highlights";
import AreaPricing from "./sections/AreaPricing";
import PlotPlanLayout from "./sections/PlotPlan";
import Amenities from "./sections/Amenities";
import ProjectGallery from "./sections/Gallery";
import LocationAdvantage from "./sections/Location";
import SiteVisitForm from "./sections/SiteVisit";

import Footer from "./components/Footer";

import EnquiryModal from "./components/EnquiryModal";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log("modal clicked");
    setModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* ✅ Desktop Sticky Sidebar */}
      <RightStickyModal openModal={openModal}/>

      {/* ✅ Main Site Layout */}
      <div className="bg-[#F2FFED] lg:pr-[280px] scrollbar-hide">{/* Add right padding on md+ to avoid overlay */}
        <Header />
        <Home openModal={openModal} />
        <MobilePreRegister />
        <Highlights openModal={openModal} />
        <AreaPricing openModal={openModal} />
        <PlotPlanLayout openModal={openModal} />
        <Amenities openModal={openModal}/>
        <ProjectGallery />
        <LocationAdvantage openModal={openModal} />
        <SiteVisitForm />
        <Footer />

        {/* enquiry modal */}
        <EnquiryModal isOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </>
  );
}

export default App;

// App.tsx (Modified for Scroll + Routing)
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import ScrollToSectionWrapper from "./components/ScrollToSectionWrapper";

function FullLayout({ openModal }: { openModal: () => void }) {
  return (
    <div className="bg-[#F2FFED] lg:pr-[280px] scrollbar-hide">
      <Header />
      <Home openModal={openModal} />
      <MobilePreRegister />
      <Highlights openModal={openModal} />
      <AreaPricing openModal={openModal} />
      <PlotPlanLayout openModal={openModal} />
      <Amenities openModal={openModal} />
      <ProjectGallery />
      <LocationAdvantage openModal={openModal} />
      <SiteVisitForm />
      <Footer />
    </div>
  );
}

function App() {
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log("modal clicked");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <RightStickyModal openModal={openModal} />
      <Routes>
        <Route
          path="/"
          element={
            <ScrollToSectionWrapper key={location.key}>
              <FullLayout openModal={openModal} />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/highlights"
          element={
            <ScrollToSectionWrapper key={location.key} scrollTo="highlights">
              <FullLayout openModal={openModal} />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/pricingAndFloorPlan"
          element={
            <ScrollToSectionWrapper key={location.key} scrollTo="pricingAndFloorPlan">
              <FullLayout openModal={openModal} />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <ScrollToSectionWrapper key={location.key} scrollTo="gallery">
              <FullLayout openModal={openModal} />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/amenities"
          element={
            <ScrollToSectionWrapper key={location.key} scrollTo="amenities">
              <FullLayout openModal={openModal} />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/location"
          element={
            <ScrollToSectionWrapper key={location.key} scrollTo="location">
              <FullLayout openModal={openModal} />
            </ScrollToSectionWrapper>
          }
        />
      </Routes>

      {/* Modal */}
      <EnquiryModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default App;
import React from "react";
import Footer from "../../../components/common/Footer/Footer";
import HeroSection from "../HeroSection/HeroSection";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import CallToAction from "../CallToAction/CallToAction";


export default function Landing() {
  return (
    <div className="landing-page">
     

      <main className="landing-main">
        <HeroSection />
        <FeaturesSection />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}

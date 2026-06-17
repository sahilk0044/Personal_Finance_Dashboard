import LandingNavbar from "../../components/landing/LandingNavbar";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import DashboardPreview from "../../components/landing/DashboardPreview";
import HowItWorks from "../../components/landing/HowItWorks";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />

      <HeroSection />

      <FeaturesSection />

      <DashboardPreview />

      <HowItWorks />

      <CTASection />

      <Footer />
    </>
  );
};

export default LandingPage;
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PricingPage from "@/components/PricingPage";


export default function Home() {
 
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-12 sm:px-10 sm:py-16 lg:gap-16">
        <HeroSection />
        <PricingPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

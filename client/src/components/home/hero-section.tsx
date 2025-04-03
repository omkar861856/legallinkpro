import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative bg-primary-700">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-700 opacity-90"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-merriweather font-bold text-white leading-tight">
              Experienced Legal Representation When You Need It Most
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-2xl">
              Our dedicated team of attorneys specializes in personal injury, family law, and estate planning. We're committed to protecting your rights and securing your future.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a 
                href="#case-inquiry"
                onClick={(e) => scrollToSection(e, "#case-inquiry")}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-accent-500 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Free Case Evaluation
              </a>
              <a 
                href="#practice-areas"
                onClick={(e) => scrollToSection(e, "#practice-areas")}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-100 bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Our Practice Areas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

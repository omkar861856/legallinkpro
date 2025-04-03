import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, FileText } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

const practiceAreas = [
  {
    title: "Personal Injury",
    description: "Representing victims of accidents, medical malpractice, and negligence to secure the compensation you deserve.",
    icon: Shield,
    specialties: [
      "Car & Vehicle Accidents",
      "Medical Malpractice",
      "Workplace Injuries"
    ]
  },
  {
    title: "Family Law",
    description: "Guiding you through difficult family matters with compassion, understanding, and legal expertise.",
    icon: Users,
    specialties: [
      "Divorce & Separation",
      "Child Custody & Support",
      "Adoption & Guardianship"
    ]
  },
  {
    title: "Estate Planning",
    description: "Protecting your assets and ensuring your wishes are honored with comprehensive estate planning services.",
    icon: FileText,
    specialties: [
      "Wills & Trusts",
      "Power of Attorney",
      "Probate & Estate Administration"
    ]
  }
];

export default function PracticeAreas() {
  const scrollToInquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#case-inquiry");
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
    <section id="practice-areas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-merriweather font-bold text-gray-900 sm:text-4xl">Our Practice Areas</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We provide specialized legal services in the following areas, offering personalized solutions to meet your specific needs.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <area.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-merriweather font-semibold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <ul className="space-y-2 mb-4">
                  {area.specialties.map((specialty, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>{specialty}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#case-inquiry" 
                  onClick={scrollToInquiry}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Learn more
                  <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

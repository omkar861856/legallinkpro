import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote: "Sarah Johnson and her team were outstanding throughout my personal injury case. They were compassionate, professional, and fought hard to get me the compensation I deserved. I couldn't have asked for better representation during such a difficult time.",
    author: "Robert Thompson",
    role: "Personal Injury Client",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Michael Rodriguez helped me navigate a complex divorce with custody issues. His attention to detail and genuine care for my children's wellbeing made all the difference. I'm grateful for his guidance during such a challenging time in my life.",
    author: "Jennifer Williams",
    role: "Family Law Client",
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Emily Chen created an estate plan that gave me peace of mind knowing my family will be taken care of. She explained everything clearly and addressed all my concerns. I highly recommend Madison Law Group for estate planning needs.",
    author: "David Martinez",
    role: "Estate Planning Client",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const caseResults = [
  {
    amount: "$1.2 Million",
    area: "Personal Injury",
    description: "Settlement for a client injured in a severe car accident caused by a distracted driver."
  },
  {
    amount: "Full Custody",
    area: "Family Law",
    description: "Successfully secured full custody for a father in a challenging custody dispute case."
  },
  {
    amount: "Estate Protection",
    area: "Estate Planning",
    description: "Created a comprehensive estate plan that saved a family over $300,000 in estate taxes."
  }
];

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section id="testimonials" className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-merriweather font-bold text-gray-900 sm:text-4xl">Client Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See what our clients have to say about their experience working with Madison Law Group.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-500">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-4">
                <p className="text-lg text-gray-600 italic">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <footer className="mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonials[activeTestimonial].avatarSrc} alt={testimonials[activeTestimonial].author} />
                        <AvatarFallback>{testimonials[activeTestimonial].author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{testimonials[activeTestimonial].author}</div>
                      <div className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-3 w-3 rounded-full mx-1 ${index === activeTestimonial ? 'bg-primary-600' : 'bg-gray-300 hover:bg-primary-400'}`}
                aria-label={`View testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseResults.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{result.amount}</h3>
                <span className="text-primary-600 font-medium text-sm">{result.area}</span>
              </div>
              <p className="text-gray-600">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const caseInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  practiceArea: z.string().min(1, "Please select a practice area"),
  message: z.string().min(20, "Please provide more details about your case (at least 20 characters)"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and privacy policy" }),
  }),
});

type CaseInquiryFormValues = z.infer<typeof caseInquirySchema>;

export default function CaseInquiryForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<CaseInquiryFormValues>({
    resolver: zodResolver(caseInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      practiceArea: "",
      message: "",
      termsAccepted: false,
    },
  });

  const { isPending } = useMutation({
    mutationFn: async (values: CaseInquiryFormValues) => {
      return await apiRequest("POST", "/api/inquiries", values);
    },
    onSuccess: () => {
      setFormSubmitted(true);
      form.reset();
      toast({
        title: "Inquiry Received",
        description: "Thank you for contacting Madison Law Group. One of our attorneys will review your inquiry and contact you within 24 hours.",
      });
    },
    onError: (error) => {
      toast({
        title: "An error occurred",
        description: error.message || "Failed to submit your inquiry. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CaseInquiryFormValues) => {
    console.log(values);
    form.handleSubmit(async (data) => {
      try {
        await apiRequest("POST", "/api/inquiries", data);
        setFormSubmitted(true);
        form.reset();
        toast({
          title: "Inquiry Received",
          description: "Thank you for contacting Madison Law Group. One of our attorneys will review your inquiry and contact you within 24 hours.",
        });
      } catch (error) {
        let message = "Failed to submit your inquiry. Please try again later.";
        if (error instanceof Error) {
          message = error.message;
        }
        toast({
          title: "An error occurred",
          description: message,
          variant: "destructive",
        });
      }
    })(values);
  };

  return (
    <section id="case-inquiry" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-merriweather font-bold text-white sm:text-4xl">Ready to Discuss Your Case?</h2>
                <p className="mt-4 text-lg text-primary-100">
                  Complete our case inquiry form to schedule a free consultation with one of our experienced attorneys.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Confidential Evaluation</h3>
                      <p className="mt-1 text-primary-100">Your information remains private and protected by attorney-client privilege.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">No Obligation</h3>
                      <p className="mt-1 text-primary-100">Our initial consultation is free with no obligation to proceed.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Quick Response</h3>
                      <p className="mt-1 text-primary-100">Our team will review your case and respond within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                {formSubmitted ? (
                  <div className="rounded-md bg-green-50 p-4 mt-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Inquiry Received</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Thank you for contacting Madison Law Group. One of our attorneys will review your inquiry and contact you within 24 hours.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-100">First name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="First name" 
                                  {...field} 
                                  className="bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-100">Last name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Last name" 
                                  {...field} 
                                  className="bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="your.email@example.com" 
                                {...field} 
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">Phone</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                placeholder="(123) 456-7890" 
                                {...field} 
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="practiceArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">Practice Area</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white">
                                  <SelectValue placeholder="Select a practice area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="personal-injury">Personal Injury</SelectItem>
                                <SelectItem value="family-law">Family Law</SelectItem>
                                <SelectItem value="estate-planning">Estate Planning</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">Briefly describe your legal matter</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide details about your case" 
                                rows={4}
                                {...field} 
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-accent-600"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-primary-100">
                                I agree to the <a href="#" className="text-accent-300 hover:text-accent-200">Privacy Policy</a> and consent to be contacted about my inquiry
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-accent-500 hover:bg-accent-600"
                        disabled={isPending}
                      >
                        {isPending ? "Submitting..." : "Submit Case Inquiry"}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

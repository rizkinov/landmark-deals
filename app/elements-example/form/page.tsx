"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CBREButton } from "@/components/cbre-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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

// Define validation schema using zod
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .optional()
    .or(z.literal("")),
  country: z
    .string({
      required_error: "Please select a country.",
    }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message must not exceed 500 characters." }),
  acceptTerms: z
    .boolean()
    .refine(val => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  marketingConsent: z
    .boolean()
    .optional(),
});

export default function FormExamplePage() {
  const [submittedData, setSubmittedData] = React.useState<z.infer<typeof formSchema> | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Create form using react-hook-form and zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      message: "",
      acceptTerms: false,
      marketingConsent: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmittedData(data);
    setIsSubmitting(false);
    
    // Optional: Reset the form after submission
    // form.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Form Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Form component provides a comprehensive way to create and manage forms using react-hook-form with zod validation.
          It follows shadcn/ui's compositional pattern with various form-related components for a clean and accessible implementation.
        </p>
        
        {/* Basic Form Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Contact Form Example</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your full name as it appears on official documents.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll never share your email with anyone else.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Phone Field (Optional) */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your contact number for follow-up questions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Country Field */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="jp">Japan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the country you currently reside in.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe how we can help you..." 
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Your inquiry details, questions, or comments (10-500 characters).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Terms Checkbox Field */}
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            id="acceptTerms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel htmlFor="acceptTerms" className="cursor-pointer">
                            I accept the terms and conditions
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you agree to our <Link href="#" className="text-cbre-green underline">Terms of Service</Link> and <Link href="#" className="text-cbre-green underline">Privacy Policy</Link>.
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {/* Marketing Consent Checkbox Field */}
                  <FormField
                    control={form.control}
                    name="marketingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            id="marketingConsent"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel htmlFor="marketingConsent" className="cursor-pointer">
                            I want to receive marketing emails
                          </FormLabel>
                          <FormDescription>
                            You can unsubscribe at any time.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <CBREButton 
                      type="submit" 
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Form"}
                    </CBREButton>
                  </div>
                </form>
              </Form>
              
              {/* Display submitted data */}
              {submittedData && (
                <div className="mt-8 p-4 border border-accent-green rounded bg-accent-green/10">
                  <h3 className="text-xl font-medium text-cbre-green mb-3">Form Submitted Successfully</h3>
                  <div className="grid gap-2">
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Phone:</strong> {submittedData.phone || "Not provided"}</p>
                    <p><strong>Country:</strong> {submittedData.country}</p>
                    <p><strong>Message:</strong> {submittedData.message}</p>
                    <p><strong>Marketing Consent:</strong> {submittedData.marketingConsent ? "Yes" : "No"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// 1. First, define a zod schema for validation
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  message: z.string().min(10).max(500),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept terms and conditions.",
  }),
});

// 2. Set up the form with react-hook-form and zod resolver
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    email: "",
    country: "",
    // Additional default values...
  },
});

// 3. Handle form submission
const onSubmit = (data: z.infer<typeof formSchema>) => {
  // Process form data
};

// 4. Implement the form with shadcn/ui Form components
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" {...field} />
          </FormControl>
          <FormDescription>
            Your full name as it appears on official documents.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    
    {/* Additional form fields */}
    
    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              id="acceptTerms"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-1"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor="acceptTerms">I accept the terms and conditions</FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
    
    <Button type="submit">Submit</Button>
  </form>
</Form>`}
            </pre>
          </div>
        </div>
        
        {/* Form Composition Guide */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Form Composition Guide</h2>
          <div className="bg-white p-6 border border-light-grey">
            <div className="space-y-6">
              <p className="text-dark-grey font-calibre">
                The shadcn/ui Form component follows a specific compositional pattern to ensure proper integration with react-hook-form:
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-cbre-green">Key Components</h3>
                <ul className="list-disc pl-6 space-y-2 text-dark-grey font-calibre">
                  <li><code className="bg-lighter-grey px-1 py-0.5 rounded">Form</code> - The main wrapper that provides the FormProvider from react-hook-form.</li>
                  <li><code className="bg-lighter-grey px-1 py-0.5 rounded">FormField</code> - Connects an individual field to react-hook-form's Controller.</li>
                  <li><code className="bg-lighter-grey px-1 py-0.5 rounded">FormItem</code> - Groups related form elements together.</li>
                  <li><code className="bg-lighter-grey px-1 py-0.5 rounded">FormLabel</code> - Provides an accessible label for the form control.</li>
                  <li><code className="bg-lighter-grey px-1 py-0.5 rounded">FormControl</code> - Wraps the actual input element and connects it to the form context.</li>
                  <li><code className="bg-lighter-grey px-1 py-0.5 rounded">FormDescription</code> - Provides additional descriptive text for the field.</li>
                  <li><code className="bg-lighter-grey px-1 py-0.5 rounded">FormMessage</code> - Displays validation error messages.</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-cbre-green">Form Field Structure</h3>
                <p className="text-dark-grey font-calibre">
                  Each form field should follow this general structure:
                </p>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Field Label</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormDescription>
        Additional information about this field.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>`}
                </pre>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-cbre-green">Best Practices</h3>
                <ul className="list-disc pl-6 space-y-2 text-dark-grey font-calibre">
                  <li>Always use zod (or similar) for schema validation to ensure type safety.</li>
                  <li>Ensure each form field has a proper label with the <code className="bg-lighter-grey px-1 py-0.5 rounded">FormLabel</code> component.</li>
                  <li>Use <code className="bg-lighter-grey px-1 py-0.5 rounded">FormDescription</code> to provide helpful context where needed.</li>
                  <li>Implement proper error handling with <code className="bg-lighter-grey px-1 py-0.5 rounded">FormMessage</code> components.</li>
                  <li>Consider the accessible form structure: labels should be associated with their controls.</li>
                  <li>For checkbox and radio inputs, adjust the layout to place labels after the control.</li>
                  <li>Always add an explicit <code className="bg-lighter-grey px-1 py-0.5 rounded">id</code> to checkboxes and connect it to the <code className="bg-lighter-grey px-1 py-0.5 rounded">FormLabel</code> using <code className="bg-lighter-grey px-1 py-0.5 rounded">htmlFor</code> for proper accessibility and to allow clicking on the label text to toggle the checkbox.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
                {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component API</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Form Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Form component provides a consistent UI element following CBRE design guidelines.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          <th className="border border-light-grey px-4 py-2 text-left">Component</th>
                          <th className="border border-light-grey px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">Form</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Form Props</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          <th className="border border-light-grey px-4 py-2 text-left">Prop</th>
                          <th className="border border-light-grey px-4 py-2 text-left">Type</th>
                          <th className="border border-light-grey px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">className</td>
                          <td className="border border-light-grey px-4 py-2">string</td>
                          <td className="border border-light-grey px-4 py-2">Additional CSS classes to apply to the component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

<div className="mt-16 flex justify-center">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>
      </div>
    </div>
  );
} 
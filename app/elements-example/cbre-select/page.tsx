"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CBRESelect,
  CBREGroupedSelect,
  SelectGroupItem
} from "@/components/cbre-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";

export default function CBRESelectExamplePage() {
  // Basic select example state
  const [fruitValue, setFruitValue] = React.useState("");
  
  // Error select example state
  const [priorityValue, setPriorityValue] = React.useState("");
  
  // Form with multiple inputs state
  const [formData, setFormData] = React.useState({
    country: "",
    city: ""
  });
  
  // Handle select value changes for form
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };
  
  // Define city options based on country selection
  const getCityOptions = () => {
    switch (formData.country) {
      case "usa":
        return [
          { label: "New York", value: "ny" },
          { label: "Los Angeles", value: "la" },
          { label: "Chicago", value: "chi" },
        ];
      case "uk":
        return [
          { label: "London", value: "ldn" },
          { label: "Manchester", value: "man" },
          { label: "Liverpool", value: "liv" },
        ];
      case "fr":
        return [
          { label: "Paris", value: "par" },
          { label: "Lyon", value: "lyo" },
          { label: "Marseille", value: "mar" },
        ];
      default:
        return [];
    }
  };
  
  // Define region groups for the grouped select
  const regionGroups: SelectGroupItem[] = [
    {
      label: "West Coast",
      options: [
        { label: "California", value: "ca" },
        { label: "Washington", value: "wa" },
        { label: "Oregon", value: "or" },
      ]
    },
    {
      label: "East Coast",
      options: [
        { label: "New York", value: "ny" },
        { label: "Florida", value: "fl" },
        { label: "Massachusetts", value: "ma" },
      ]
    },
    {
      label: "Midwest",
      options: [
        { label: "Illinois", value: "il" },
        { label: "Michigan", value: "mi" },
        { label: "Ohio", value: "oh" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">CBRE Select Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The CBRESelect component extends the shadcn/ui Select component with CBRE-specific styling and additional features like labels, descriptions, and error handling.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Basic CBRESelect Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-financier text-cbre-green">Basic Select</CardTitle>
            </CardHeader>
            <CardContent>
              <CBRESelect 
                label="Favorite Fruit"
                description="Select your favorite fruit from the options below"
                value={fruitValue}
                onValueChange={setFruitValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </CBRESelect>
              
              {fruitValue && (
                <p className="mt-4 text-sm text-dark-grey">
                  You selected: <span className="font-bold">{fruitValue}</span>
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* CBRESelect with Error Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-financier text-cbre-green">Select with Error</CardTitle>
            </CardHeader>
            <CardContent>
              <CBRESelect 
                label="Priority Level"
                error={priorityValue ? "" : "Please select a priority level"}
                value={priorityValue}
                onValueChange={setPriorityValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </CBRESelect>
            </CardContent>
          </Card>
        </div>
        
        {/* CBREGroupedSelect Example */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-financier text-cbre-green">Grouped Select</CardTitle>
          </CardHeader>
          <CardContent>
            <CBREGroupedSelect
              label="US Region"
              description="Select a region in the United States"
              groups={regionGroups}
              placeholder="Select a region"
            />
          </CardContent>
        </Card>
        
        {/* Form with Multiple CBRESelects */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-financier text-cbre-green">Form with Selects</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <CBRESelect 
                label="Country"
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </CBRESelect>
              
              <CBRESelect 
                label="City"
                description="Select a city in the chosen country"
                value={formData.city}
                onValueChange={(value) => handleSelectChange("city", value)}
                disabled={!formData.country}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    formData.country ? "Select a city" : "Please select a country first"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {getCityOptions().map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </CBRESelect>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setFormData({ country: "", city: "" })}
                >
                  Reset
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
            
            {(formData.country || formData.city) && (
              <div className="mt-6 p-4 bg-gray-50 rounded">
                <h4 className="text-sm font-medium mb-2">Current Form Data:</h4>
                <pre className="text-xs">{JSON.stringify(formData, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component API</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Select Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Select component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Select</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Select Props</h3>
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
"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CBRESimpleBarChart,
  CBRESimpleLineChart,
  CBRESimplePieChart,
  CBREHorizontalBarChart,
} from "@/components/cbre-chart";

// Sample data for charts
const barData = [
  {
    name: "Jan",
    total: 4000,
  },
  {
    name: "Feb",
    total: 3000,
  },
  {
    name: "Mar",
    total: 2000,
  },
  {
    name: "Apr",
    total: 2780,
  },
  {
    name: "May",
    total: 1890,
  },
  {
    name: "Jun",
    total: 2390,
  },
  {
    name: "Jul",
    total: 3490,
  },
];

const lineData = [
  {
    name: "Jan",
    actual: 4000,
    target: 3500,
  },
  {
    name: "Feb",
    actual: 3000,
    target: 3200,
  },
  {
    name: "Mar",
    actual: 2000,
    target: 2800,
  },
  {
    name: "Apr",
    actual: 2780,
    target: 2600,
  },
  {
    name: "May",
    actual: 1890,
    target: 2400,
  },
  {
    name: "Jun",
    actual: 2390,
    target: 2200,
  },
  {
    name: "Jul",
    actual: 3490,
    target: 3000,
  },
];

const pieData = [
  {
    name: "Office",
    value: 400,
  },
  {
    name: "Industrial",
    value: 300,
  },
  {
    name: "Retail",
    value: 200,
  },
  {
    name: "Residential",
    value: 100,
  },
];

const horizontalBarData = [
  {
    name: "Jan",
    actual: 4000,
    target: 3500,
  },
  {
    name: "Feb",
    actual: 3000,
    target: 3200,
  },
  {
    name: "Mar",
    actual: 2000,
    target: 2800,
  },
  {
    name: "Apr",
    actual: 2780,
    target: 2600,
  },
  {
    name: "May",
    actual: 1890,
    target: 2400,
  },
  {
    name: "Jun",
    actual: 2390,
    target: 2200,
  },
  {
    name: "Jul",
    actual: 3490,
    target: 3000,
  },
];

export default function ChartsExamplePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Chart Components</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          Data visualization components built with Recharts, styled to match CBRE's design system.
          These components provide interactive and responsive charts for displaying various types of data.
        </p>

        {/* Bar Chart */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Bar Chart</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Monthly Revenue</p>
                <CBRESimpleBarChart data={barData} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRESimpleBarChart data={barData} />

// Sample data structure
const barData = [
  {
    name: "Jan",
    total: 4000,
  },
  // ... more months
];`}
            </pre>
          </div>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Horizontal Bar Chart</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Actual vs Target Revenue</p>
                <CBREHorizontalBarChart data={horizontalBarData} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREHorizontalBarChart data={horizontalBarData} />

// Sample data structure
const horizontalBarData = [
  {
    name: "Jan",
    actual: 4000,
    target: 3500,
  },
  // ... more months
];`}
            </pre>
          </div>
        </div>

        {/* Line Chart */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Line Chart</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Sales Trend</p>
                <CBRESimpleLineChart data={lineData} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRESimpleLineChart data={lineData} />

// Sample data structure
const lineData = [
  {
    name: "Jan",
    actual: 4000,
    target: 3500,
  },
  // ... more months
];`}
            </pre>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Pie Chart</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Property Types Distribution</p>
                <CBRESimplePieChart data={pieData} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRESimplePieChart data={pieData} />

// Sample data structure
const pieData = [
  {
    name: "Office",
    value: 400,
  },
  // ... more property types
];`}
            </pre>
          </div>
        </div>

                {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component API</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Charts Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Charts component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Charts</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Charts Props</h3>
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
"use client";

import React from 'react';

export default function TailwindTest() {
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Tailwind Color Test</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl">Custom Colors</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-cbre-green text-white">bg-cbre-green</div>
          <div className="p-4 bg-accent-green text-cbre-green">bg-accent-green</div>
          <div className="p-4 bg-dark-grey text-white">bg-dark-grey</div>
          <div className="p-4 bg-light-grey text-black">bg-light-grey</div>
          <div className="p-4 bg-[var(--lighter-grey)] text-black">bg-[var(--lighter-grey)]</div>
        </div>
        
        <h2 className="text-xl mt-6">Standard Colors</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-500 text-white">bg-red-500</div>
          <div className="p-4 bg-blue-500 text-white">bg-blue-500</div>
          <div className="p-4 bg-green-500 text-white">bg-green-500</div>
          <div className="p-4 bg-yellow-500 text-black">bg-yellow-500</div>
          <div className="p-4 bg-gray-200 text-black">bg-gray-200</div>
        </div>
        
        <h2 className="text-xl mt-6">Direct HEX Colors</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#E6E8E9] text-black">bg-[#E6E8E9] (light-grey-50p)</div>
          <div className="p-4 bg-[#003F2D] text-white">bg-[#003F2D] (cbre-green)</div>
          <div className="p-4 bg-[#17E88F] text-black">bg-[#17E88F] (accent-green)</div>
        </div>
        
        <h2 className="text-xl mt-6">CSS Variables Test</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--cbre-green)] text-white">bg-[var(--cbre-green)]</div>
          <div className="p-4 bg-[var(--accent-green)] text-black">bg-[var(--accent-green)]</div>
          <div className="p-4 bg-[var(--dark-grey)] text-white">bg-[var(--dark-grey)]</div>
          <div className="p-4 bg-[var(--light-grey)] text-black">bg-[var(--light-grey)]</div>
          <div className="p-4 bg-[var(--lighter-grey)] text-black">bg-[var(--lighter-grey)]</div>
        </div>
      </div>
    </div>
  );
} 
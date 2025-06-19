"use client";

import React from 'react';
import { cn } from "@/lib/utils";

/**
 * CBRE Design System
 * 
 * Use this component to document and manage your design system
 * 
 * Colors are defined as CSS variables in globals.css:
 * - Use bg-[var(--cbre-green)] for background colors
 * - Use text-[var(--cbre-green)] for text colors
 * - Use border-[var(--cbre-green)] for border colors
 */

type ColorName = 
  // Primary Colors
  | 'cbre-green' 
  | 'accent-green' 
  | 'dark-green' 
  | 'dark-grey' 
  | 'light-grey' 
  | 'lighter-grey'
  // Secondary Colors
  | 'midnight'
  | 'midnight-tint'
  | 'sage'
  | 'sage-tint'
  | 'celadon'
  | 'celadon-tint'
  | 'wheat'
  | 'wheat-tint'
  | 'cement'
  | 'cement-tint'
  // Charts & Graphs Colors
  | 'data-orange'
  | 'data-purple'
  | 'data-light-purple'
  | 'data-blue'
  | 'data-light-blue'
  | 'negative-red';

export const getCSSVar = (name: ColorName) => `var(--${name})`;

type ColorSwatchProps = {
  colorName: ColorName;
  hexCode: string;
  pantone?: string;
  cmyk?: string;
  rgb?: string;
  className?: string;
};

export function ColorSwatch({ 
  colorName, 
  hexCode,
  pantone,
  cmyk,
  rgb,
  className 
}: ColorSwatchProps) {
  const cssVar = getCSSVar(colorName);
  
  return (
    <div className={cn("flex flex-col", className)}>
      <div 
        className="w-full h-32 rounded-none border border-border mb-3"
        style={{ backgroundColor: cssVar }}
      />
      <div className="text-lg font-financier font-medium">{colorName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
      {pantone && <div className="text-sm font-calibre">Pantone {pantone}</div>}
      {cmyk && <div className="text-sm font-calibre">CMYK: {cmyk}</div>}
      {rgb && <div className="text-sm font-calibre">RGB: {rgb}</div>}
      <div className="text-sm font-calibre font-medium">Hex {hexCode}</div>
      <div className="text-xs font-mono mt-1 text-dark-grey/70">{`var(--${colorName})`}</div>
    </div>
  );
}

export function PrimaryColors() {
  return (
    <div>
      <h3 className="text-xl font-financier text-cbre-green mb-6">Primary colors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <ColorSwatch 
          colorName="cbre-green" 
          hexCode="#003F2D" 
          pantone="3435 C"
          cmyk="90 / 46 / 80 / 55"
          rgb="0 / 63 / 45"
        />
        <ColorSwatch 
          colorName="accent-green" 
          hexCode="#17E88F"
          pantone="7479 C"
          cmyk="62 / 0 / 65 / 0"
          rgb="23 / 232 / 143"
        />
        <ColorSwatch 
          colorName="dark-green" 
          hexCode="#012A2D"
          pantone="627 C"
          cmyk="91 / 62 / 62 / 65"
          rgb="1 / 42 / 45"
        />
        <ColorSwatch 
          colorName="dark-grey" 
          hexCode="#435254"
          pantone="431 C"
          cmyk="73 / 55 / 55 / 33"
          rgb="67 / 82 / 84"
        />
        <ColorSwatch 
          colorName="light-grey" 
          hexCode="#CAD1D3"
          pantone="428 C"
          cmyk="20 / 12 / 13 / 0"
          rgb="202 / 209 / 211"
        />
        <ColorSwatch 
          colorName="lighter-grey" 
          hexCode="#E6E8E9"
          cmyk="9 / 5 / 6 / 0"
          rgb="230 / 232 / 233"
        />
      </div>
    </div>
  );
}

export function SecondaryColors() {
  return (
    <div className="mt-16">
      <h3 className="text-xl font-financier text-cbre-green mb-6">Secondary colors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <ColorSwatch 
          colorName="midnight" 
          hexCode="#032842"
          pantone="2189 C"
          cmyk="100 / 80 / 47 / 50"
          rgb="3 / 40 / 66"
        />
        <ColorSwatch 
          colorName="sage" 
          hexCode="#538184"
          pantone="5483 C"
          cmyk="71 / 36 / 44 / 8"
          rgb="83 / 129 / 132"
        />
        <ColorSwatch 
          colorName="celadon" 
          hexCode="#80BBAD"
          pantone="558 C"
          cmyk="51 / 9 / 36 / 0"
          rgb="128 / 187 / 173"
        />
        <ColorSwatch 
          colorName="wheat" 
          hexCode="#DBD99A"
          pantone="615 C"
          cmyk="15 / 7 / 48 / 0"
          rgb="219 / 217 / 154"
        />
        <ColorSwatch 
          colorName="cement" 
          hexCode="#7F8480"
          pantone="7538 C"
          cmyk="52 / 40 / 45 / 7"
          rgb="127 / 132 / 128"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
        <ColorSwatch 
          colorName="midnight-tint" 
          hexCode="#778F9C"
          cmyk="57 / 36 / 31 / 2"
          rgb="119 / 143 / 156"
        />
        <ColorSwatch 
          colorName="sage-tint" 
          hexCode="#96B3B6"
          cmyk="43 / 19 / 25 / 0"
          rgb="150 / 179 / 182"
        />
        <ColorSwatch 
          colorName="celadon-tint" 
          hexCode="#C0D4CB"
          cmyk="24 / 7 / 20 / 0"
          rgb="192 / 212 / 203"
        />
        <ColorSwatch 
          colorName="wheat-tint" 
          hexCode="#EFECD2"
          cmyk="6 / 4 / 19 / 0"
          rgb="239 / 236 / 210"
        />
        <ColorSwatch 
          colorName="cement-tint" 
          hexCode="#CBCDCB"
          cmyk="20 / 14 / 17 / 0"
          rgb="203 / 205 / 203"
        />
      </div>
    </div>
  );
}

export function ChartsAndGraphsColors() {
  return (
    <div className="mt-16">
      <h3 className="text-xl font-financier text-cbre-green mb-6">Charts & graphs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <ColorSwatch 
          colorName="celadon" 
          hexCode="#80BBAD"
          cmyk="51 / 9 / 36 / 0"
          rgb="128 / 187 / 173"
        />
        <ColorSwatch 
          colorName="dark-grey" 
          hexCode="#435254"
          cmyk="73 / 55 / 55 / 33"
          rgb="67 / 82 / 84"
        />
        <ColorSwatch 
          colorName="accent-green" 
          hexCode="#17E88F"
          cmyk="62 / 0 / 65 / 0"
          rgb="23 / 232 / 143"
        />
        <ColorSwatch 
          colorName="wheat" 
          hexCode="#DBD99A"
          cmyk="15 / 7 / 48 / 0"
          rgb="219 / 217 / 154"
        />
        <ColorSwatch 
          colorName="data-orange" 
          hexCode="#D2785A"
          cmyk="15 / 62 / 68 / 1"
          rgb="210 / 120 / 90"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
        <ColorSwatch 
          colorName="data-purple" 
          hexCode="#885073"
          cmyk="48 / 77 / 33 / 10"
          rgb="136 / 80 / 115"
        />
        <ColorSwatch 
          colorName="data-light-purple" 
          hexCode="#A388BF"
          cmyk="37 / 49 / 0 / 0"
          rgb="163 / 136 / 191"
        />
        <ColorSwatch 
          colorName="data-blue" 
          hexCode="#1F3765"
          cmyk="99 / 86 / 33 / 22"
          rgb="31 / 55 / 101"
        />
        <ColorSwatch 
          colorName="data-light-blue" 
          hexCode="#3E7CA6"
          cmyk="78 / 44 / 19 / 1"
          rgb="62 / 125 / 166"
        />
        <ColorSwatch 
          colorName="light-grey" 
          hexCode="#CAD1D3"
          cmyk="20 / 12 / 13 / 0"
          rgb="202 / 209 / 211"
        />
      </div>
      
      <div className="mt-8">
        <ColorSwatch 
          colorName="negative-red" 
          hexCode="#AD2A2A"
          cmyk="22 / 97 / 93 / 14"
          rgb="173 / 42 / 42"
          className="max-w-xs"
        />
        <div className="mt-4 p-4 bg-[var(--lighter-grey)] text-dark-grey text-sm">
          <p className="font-medium mb-2">* DO NOT USE WITH CHARTS & GRAPHS PALETTE UNLESS INDICATING A NEGATIVE VALUE.</p>
        </div>
      </div>
    </div>
  );
}

export function InfographicsColors() {
  return (
    <div className="mt-16">
      <h3 className="text-xl font-financier text-cbre-green mb-6">Infographics & diagrams</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <ColorSwatch 
          colorName="celadon" 
          hexCode="#80BBAD"
          cmyk="51 / 9 / 36 / 0"
          rgb="128 / 187 / 173"
        />
        <ColorSwatch 
          colorName="dark-grey" 
          hexCode="#435254"
          cmyk="73 / 55 / 55 / 33"
          rgb="67 / 82 / 84"
        />
        <ColorSwatch 
          colorName="wheat" 
          hexCode="#DBD99A"
          cmyk="15 / 7 / 48 / 0"
          rgb="219 / 217 / 154"
        />
        <ColorSwatch 
          colorName="data-blue" 
          hexCode="#1F3765"
          cmyk="99 / 86 / 33 / 22"
          rgb="31 / 55 / 101"
        />
        <ColorSwatch 
          colorName="data-light-blue" 
          hexCode="#3E7CA6"
          cmyk="78 / 44 / 19 / 1"
          rgb="62 / 125 / 166"
        />
        <ColorSwatch 
          colorName="light-grey" 
          hexCode="#CAD1D3"
          cmyk="20 / 12 / 13 / 0"
          rgb="202 / 209 / 211"
        />
      </div>
    </div>
  );
}

export function DesignSystemColors() {
  return (
    <div className="space-y-12">
      <PrimaryColors />
      <SecondaryColors />
      <ChartsAndGraphsColors />
      <InfographicsColors />
    </div>
  );
} 
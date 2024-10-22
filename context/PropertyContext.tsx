'use client';

import { Property } from '@/types/property';
import { createContext, useContext, ReactNode } from 'react';

interface PropertyProviderProps {
  children: ReactNode;
  properties: Property[];
}

const PropertyContext = createContext<Property[] | []>([]);

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children, properties }: PropertyProviderProps) => {
  return (
    <PropertyContext.Provider value={properties}>
      {children}
    </PropertyContext.Provider>
  );
};

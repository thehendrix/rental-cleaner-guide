'use client';

import { createContext, useContext } from 'react';

const PropertyContext = createContext(null);

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children, properties }: Array) => {
  return (
    <PropertyContext.Provider value={properties}>
      {children}
    </PropertyContext.Provider>
  );
};

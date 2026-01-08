import React, { createContext, useState, useContext } from 'react';

interface LoadingContextType {
  isLoadingAssets: boolean;
  setIsLoadingAssets: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoadingAssets, setIsLoadingAssets }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}

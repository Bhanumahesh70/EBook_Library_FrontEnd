import React, { createContext, useContext, useState } from 'react';

type GlobalSearchContextType = {
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
};

const GlobalSearchContext = createContext<GlobalSearchContextType>({
  globalSearch: '',
  setGlobalSearch: () => {},
});

export const GlobalSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [globalSearch, setGlobalSearch] = useState('');
  return (
    <GlobalSearchContext.Provider value={{ globalSearch, setGlobalSearch }}>
      {children}
    </GlobalSearchContext.Provider>
  );
};

export const useGlobalSearch = () => useContext(GlobalSearchContext);

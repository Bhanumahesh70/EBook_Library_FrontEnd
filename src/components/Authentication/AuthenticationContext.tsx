import React, { ReactNode, useContext } from 'react';

interface AuthenticationType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthenticationContext = React.createContext<
  AuthenticationType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthenticationProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider'
    );
  }
  return context;
};

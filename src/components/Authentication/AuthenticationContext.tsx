import React, { ReactNode, useContext } from 'react';

interface AuthenticationType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}

/*
Here, we define an AuthenticationType for the context.

We need a default value when creating a context, but since we don't have a meaningful default value,
we set the context type to `AuthenticationType | undefined` and initialize it with `undefined`.

Here we want isAuthenticated and setIsAuthenticated to be accessible across all components

This context will provide `isAuthenticated` and `setIsAuthenticated` across all components.
Using this, we can check if a user is authenticated and update the authentication state when needed.
*/
const AuthenticationContext = React.createContext<
  AuthenticationType | undefined
>(undefined);

/*
We do not directly export the AuthenticationContext because its value could be `AuthenticationType` or `undefined`.

If we use this context outside of a provider, it will return `undefined`, leading to potential runtime errors.
To prevent this, we create a custom hook `useAuthentication`, 
which ensures that the context is used within an AuthenticationProvider.
If the context is accessed without a provider, an error is thrown.
*/
export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider'
    );
  }
  return context;
};

/*
We create a provider component for the AuthenticationContext.

The provider initializes the authentication state and provides `isAuthenticated` and `setIsAuthenticated` 
to all child components wrapped inside it.
*/
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

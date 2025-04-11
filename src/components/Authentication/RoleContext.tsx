import React, { useContext, ReactNode } from 'react';

interface RoleType {
  role: String;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}
interface Props {
  children: ReactNode;
}
const RoleContext = React.createContext<RoleType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within an RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }: Props) => {
  const [role, setRole] = React.useState('ROLE_USER');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

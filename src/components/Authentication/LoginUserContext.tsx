import React, { useContext, ReactNode } from 'react';
interface LoginUserDetailsProps {
  id: string | undefined;
  role: String;
}
interface LoginUserProps {
  loginUserDetails: LoginUserDetailsProps;
  setLoginUserDetails: React.Dispatch<
    React.SetStateAction<LoginUserDetailsProps>
  >;
}
interface Props {
  children: ReactNode;
}
const LoginUserContext = React.createContext<LoginUserProps | undefined>(
  undefined
);

export const useLoginUser = () => {
  const context = useContext(LoginUserContext);
  if (!context) {
    throw new Error('LoginUser must be used within an LoginUserProvider');
  }
  return context;
};

export const LoginUserProvider = ({ children }: Props) => {
  const [loginUserDetails, setLoginUserDetails] =
    React.useState<LoginUserDetailsProps>({ id: undefined, role: 'ROLE_USER' });

  return (
    <LoginUserContext.Provider
      value={{ loginUserDetails, setLoginUserDetails }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateUser, ValidateUser } from '../../services/loginService';
import { useAuthentication } from './AuthenticationContext';
import { useLoginUser } from './LoginUserContext';
interface LoginUserDetailsProps {
  id: string | undefined;
  role: String;
}
type AuthenticationRequest = {
  email: string;
  password: string;
};

type AuthenticationResponse = {
  id: string;
  token: string;
  role: string;
};
const LoginPage = () => {
  const [authRequest, setAuthReq] = React.useState<AuthenticationRequest>({
    email: '',
    password: '',
  });
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  //Access Authentication context
  const { setIsAuthenticated } = useAuthentication();

  //Access Role context
  const { setLoginUserDetails } = useLoginUser();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsError(false);
    const { id, value } = e.target;
    setAuthReq((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const authResp: AuthenticationResponse = await authenticateUser(
        authRequest
      );
      console.log('User is authenticated', authResp);
      setIsAuthenticated(true);
      const loginUSerDetails: LoginUserDetailsProps = {
        id: authResp.id,
        role: authResp.role,
      };
      setLoginUserDetails(loginUSerDetails);
      localStorage.setItem('authToken', authResp.token);
      const validResp = await ValidateUser();
      navigate('/ebook');
    } catch (error) {
      setIsError(true);
      console.log('User is not authenticated');
    }
  }

  return (
    <div className="formHeader form-wrapper">
      <h1>Welcome to Ebook Website</h1>
      <div className=" container mb-5 formContainer">
        <form className="entityform" onSubmit={handleSubmit}>
          <div className="mb-3 loginInvalidText">
            <p className="text-danger">
              {isError ? 'Invalid credentials' : ' '}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="mt-4 d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to={`/signup`} className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

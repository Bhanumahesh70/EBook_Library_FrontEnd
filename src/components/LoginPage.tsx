import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/loginService';

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
  const [authRequest, setAuthReq] = React.useState({
    email: '',
    password: ' ',
  });
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsError(false);
    const { id, value } = e.target;
    setAuthReq((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const authResp = await authenticateUser(authRequest);
      console.log('User is authenticated', authResp);
      navigate('/');
    } catch (error) {
      setIsError(true);
      console.log('User is not authenticated');
    }
  }

  return (
    <div className="loginDiv">
      <h1>Welcome to Ebook Website</h1>
      <div className=" container mb-5 loginFrom">
        <form onSubmit={handleSubmit}>
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

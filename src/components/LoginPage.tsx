import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="loginDiv">
      <h1>Welcome to Ebook Website</h1>
      <div className=" container mb-5 loginFrom">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
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
            <Link to={`/`} className="btn btn-primary">
              Submit
            </Link>
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

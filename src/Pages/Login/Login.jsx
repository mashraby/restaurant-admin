import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import "./Login.css";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context/Context";

const LOGIN_ADMIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      acces_token
    }
  }
`;

export default function Login() {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { setAdmin } = useContext(Context);

  const [loginAdmin, { loading }] = useLazyQuery(LOGIN_ADMIN, {
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      window.localStorage.setItem("acces_token", data.login.acces_token);
      setAdmin(data.login);
      return (window.location.href = "/");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    loginAdmin({ variables });
  };

  return (
    <>
      <div className="container">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="user-box">
              <input
                onChange={(e) =>
                  setVariables({ ...variables, username: e.target.value })
                }
                className={
                  errors.username ? "form-control is-invalid" : "form-control"
                }
                type="text"
              />
              <label
                className={
                  errors.username ? "form-label text-danger" : "form-label"
                }
              >
                {errors.username ?? "Username"}
              </label>
            </div>
            <div className="user-box">
              <input
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
                className={
                  errors.password ? "form-control is-invalid" : "form-control"
                }
                type="password"
              />
              <label
                className={
                  errors.password ? "form-label text-danger" : "form-label"
                }
              >
                {errors.password ?? "Password"}
              </label>
            </div>
            <button type="submit" disabled={loading}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {loading ? "loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import React from "react";

function AuthLayout({children}) {
  return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Connect with Bootcampers around the world.</h1>
          </div>
          <div className="col">
            <h1>Sign up </h1>
            {children}
          </div>
        </div>

      </div>
  );
}
export default AuthLayout
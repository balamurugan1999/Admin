import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
      <div style={{display:'block',marginLeft:'auto',marginRight:'auto',textAlign:'center',paddingTop:'5%'}}>
        <h1 style={{color:'red'}}>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <br/>
        <Link to="/" className="btn btn-primary">
          {" "}
          Back to login
        </Link>
      </div>
  );
};

export default ErrorPage;
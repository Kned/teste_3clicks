import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">User List</h1>
        <p className="lead">
          A list of Users, and CRUD, with cpf and email validation
        </p>
        <hr className="my-4" />
        <Link
          to="/users"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Users
        </Link>
      </div>
    </div>
  </div>
);
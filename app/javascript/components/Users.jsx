import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setUsers(res))
      .catch(() => navigate("/"));
  }, []);

  const onSubmit = function(){
    if(search==""){
      navigate("/users")
    }
    const url = `/api/v1/users/search/${search}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setUsers(res))
      .catch(() => navigate("/"));
  }

  const allUsers = users.map((user, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <h5 className="card-title">{user.email}</h5>
          <Link to={`/user/${user.id}`} className="btn custom-button">
            View User
          </Link>
          <Link to={`/user/${user.id}/update`} className="btn custom-button">
            Update User
          </Link>
        </div>
      </div>
    </div>
  ));
  const noUser = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No users yet. Why not <Link to="/new_user">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Users</h1>
          <p className="lead text-muted">
            List of Users with multiple addresses
          </p>
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid text-center">
      <div className="py-5">
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="search">Search</label>
              <input
                type="text"
                name="search"
                id="search"
                className="form-control"
                onChange={(event) => onChange(event, setSearch)}
              />
            </div>
            <a onClick={() => onSubmit()} className="btn btn-primary mt-3">
              Search
            </a>
          </form>
        </div>
      </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/user" className="btn custom-button">
              Create New User
            </Link>
          </div>
          <div className="row">
            {users.length > 0 ? allUsers : noUser}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Users;
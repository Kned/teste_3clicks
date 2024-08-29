import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const User = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", birthday: "", addresses: []});

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setUser(response))
      // .catch(() => navigate("/users"));
  }, [params.id]);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const addressList = () => {
    let addressList = "No address available";

    if (user.addresses.length > 0) {
      addressList=""
      for (let i = 0; i < user.addresses.length; i++) {
        addressList = addressList+""+user.addresses[i].street+", "+user.addresses[i].number+", "+user.addresses[i].complement+"<br />"
      }
    }

    return addressList;
  };

  const deleteUser = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/users"))
      .catch((error) => console.log(error.message));
  };

  const userAddresses = addHtmlEntities(user.addresses);
  
  
  return (
    <div className="container">
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-4">
              <ul className="list-group">
                <h5 className="mb-2">Name</h5>
                {user.name}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-4">
              <ul className="list-group">
                <h5 className="mb-2">Email</h5>
                {user.email}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-4">
              <ul className="list-group">
                <h5 className="mb-2">Birthday</h5>
                {user.birthday}
              </ul>
            </div>
          </div>
          
            <div className="row py-5">
              <h4 className="mb-2">Addresses</h4>
              {user.addresses.map((address, index) => {
                return (
                  <div key={index} className="row container py-5">
                    <h5>Address {index+1}</h5>
                    <div className="col-sm-12 col-lg-4">
                      <ul className="list-group">
                        <h5 className="mb-2">Street</h5>
                        {address.street}
                      </ul>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                      <ul className="list-group">
                        <h5 className="mb-2">Number</h5>
                        {address.number}
                      </ul>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                      <ul className="list-group">
                        <h5 className="mb-2">Complement</h5>
                        {address.complement}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
            
      
      <div className="row">
        <div className="col-sm-12 col-lg-4">
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteUser}>
            Delete User
          </button>
        </div>
        <div className="col-sm-12 col-lg-4">
          <Link to={`/user/${user.id}/update`} className="btn custom-button">
            Update User
          </Link>
        </div>
        <div className="col-sm-12 col-lg-4">
          <Link to="/users" className="btn btn-secondary">
            Back to users
          </Link>
        </div>
      </div>
    </div>
  </div>
      

  );
};

export default User;
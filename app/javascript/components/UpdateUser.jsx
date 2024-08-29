import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", birthday: "", addresses: []});
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [addresses_attributes, setAddressesFields] = useState([
    { street: '', number: '', complement: '' }
  ]);
  const onChange = (event, setFunction) => {
    console.log(event)
    setFunction(event.target.value);
  };

  useEffect(() => {
    const url = `/api/v1/edit/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setUser(response))
      // .catch(() => navigate("/usersa"));
  }, [params.id]);

  const addFields = (e) => {
    e.preventDefault();
    let newfield = { street: '', number: '', complement: '' }
  
    setAddressesFields([...addresses_attributes, newfield])
  }
  const removeFields = (index) => {
    let data = [...addresses_attributes];
    data.splice(index, 1)
    setAddressesFields(data)
  }
  

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/update/${params.id}`;
    const body = {
      name,
      cpf,
      email,
      birthday,
      addresses_attributes,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/user/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Update User {user.name}
          </h1>
          <form formData= {user} onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="form-control"
                required
                defaultValue={user.name}
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userCpf">CPF</label>
              <input
                defaultValue={user.cpf}
                type="text"
                name="userCpf"
                id="userCpf"
                className="form-control"
                required
                onChange={(event) => onChange(event, setCpf)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Email</label>
              <input
                defaultValue = {user.email}
                type="text"
                name="userEmail"
                id="userEmail"
                className="form-control"
                required
                onChange={(event) => onChange(event, setEmail)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userBirthday">Birthday</label>
              <input
                defaultValue = {user.birthday || ""}
                type="Date"
                name="userBirthday"
                id="userBirthday"
                className="form-control"
                onChange={(event) => onChange(event, setBirthday)}
              />
            </div>
            {user.addresses.map((input, index) => {
              return (
                <div key={index} className="container py-5">
                  <h4>Address {index+1}</h4>
                  <input
                    name='street'
                    placeholder='street'
                    defaultValue={input.street}
                    className="form-control"
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    name='number'
                    placeholder='number'
                    defaultValue={input.number}
                    className="form-control"
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    name='complement'
                    placeholder='complement'
                    defaultValue={input.complement}
                    className="form-control"
                    onChange={event => handleFormChange(index, event)}
                  />
                  {index > 0 && (
                    <a onClick={() => removeFields(index)} className="btn btn-danger mt-3">Remove address</a>
                  )}
                </div>
              )
            })}
            
            <button onClick={addFields}  className="btn btn-secondary mt-3">Add More addresses</button>
            
            
            <br />
            <button type="submit" className="btn btn-primary mt-3">
              Update User
            </button>
            <Link to="/users" className="btn btn-link mt-3">
              Back to users
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
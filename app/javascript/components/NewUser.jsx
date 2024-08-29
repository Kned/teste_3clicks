import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cpfError, setCpfError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [addresses_attributes, setAddressesFields] = useState([
    { street: '', number: '', complement: '' }
  ]);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const handleFormChange = (index, event) => {
    let data = [...addresses_attributes];
    data[index][event.target.name] = event.target.value;
    setAddressesFields(data);
  }
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
  function cpfIsValid(){
    const regex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    const sempontoehifen = cpf.replace('.', "").replace('-', "").replace('.', "");
    var dv1 = (parseInt(sempontoehifen[0]) * 10) + 
                (parseInt(sempontoehifen[1]) * 9) +
                (parseInt(sempontoehifen[2]) * 8) +
                (parseInt(sempontoehifen[3]) * 7) +
                (parseInt(sempontoehifen[4]) * 6) +
                (parseInt(sempontoehifen[5]) * 5) +
                (parseInt(sempontoehifen[6]) * 4) +
                (parseInt(sempontoehifen[7]) * 3) +
                (parseInt(sempontoehifen[8]) * 2);
    dv1 = dv1 % 11;
    dv1 = 11 - dv1;
    var dv2 = (parseInt(sempontoehifen[0]) * 11) + 
    (parseInt(sempontoehifen[1]) * 10) +
    (parseInt(sempontoehifen[2]) * 9) +
    (parseInt(sempontoehifen[3]) * 8) +
    (parseInt(sempontoehifen[4]) * 7) +
    (parseInt(sempontoehifen[5]) * 6) +
    (parseInt(sempontoehifen[6]) * 5) +
    (parseInt(sempontoehifen[7]) * 4) +
    (parseInt(sempontoehifen[8]) * 3) +
    (parseInt(sempontoehifen[9]) * 2);

    dv2 = dv2 % 11;
    dv2 = 11 - dv2;
    if(dv2>=10){
      dv2=0;
    }
    
    if(dv1 == sempontoehifen[9] && dv2 == sempontoehifen[10]){
      
      setCpfError('')
    }else{
      setCpfError('<div class="alert alert-primary" role="alert">This is CPF is invalid!</div>')
    }
    return
  }
  function emailIsValid(){
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(regex.test(email)){
      setEmailError('')
    }else{
      setEmailError('<div class="alert alert-primary" role="alert">This is email is invalid!</div>')
    }
    return
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/users/create";
    console.log("mandou?")
    // if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
    //   return;

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
            Add a new user.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
          
         
            <div className="form-group">
              <label htmlFor="userCpf">CPF</label>
              <input
                type="text"
                name="userCpf"
                id="userCpf"
                className="form-control"
                onBlur={cpfIsValid}
                required
                onChange={(event) => onChange(event, setCpf)}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: `${cpfError}`,
                }}
            />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Email</label>
              <input
                type="text"
                name="userEmail"
                id="userEmail"
                className="form-control"
                onBlur={emailIsValid}
                required
                onChange={(event) => onChange(event, setEmail)}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: `${emailError}`,
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userBirthday">Birthday</label>
              <input
                type="Date"
                name="userBirthday"
                id="userBirthday"
                className="form-control"
                onChange={(event) => onChange(event, setBirthday)}
              />
            </div>
            {addresses_attributes.map((input, index) => {
              return (
                <div key={index} className="py-5">
                  <h4>Address {index+1}</h4>
                  <input
                    name='street'
                    placeholder='street'
                    value={input.street}
                    className="form-control"
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    name='number'
                    placeholder='number'
                    value={input.number}
                    className="form-control"
                    onChange={event => handleFormChange(index, event)}
                  />
                  <input
                    name='complement'
                    placeholder='complement'
                    value={input.complement}
                    className="form-control"
                    onChange={event => handleFormChange(index, event)}
                  />
                  {index > 0 && (
                    <a onClick={() => removeFields(index)} className="btn btn-danger mt-3">Remove</a>
                  )}
                </div>
              )
            })}
            
            <button onClick={addFields}  className="btn btn-secondary mt-3">Add More..</button>
            
            
            <br />
            <button type="submit" className="btn btn-primary mt-3">
              Create User
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

export default NewUser;
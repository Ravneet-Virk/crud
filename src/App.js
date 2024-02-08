import React, { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {

  const [data, setData] = useState([]);
  const [Name, setName] = useState('')
  const [email, setEmail] = useState('') 
  const [phoneNumber, setPhonenumber] = useState('')  
  const [id, setId] = useState(0)
  const [isUpdate, setisUpdate] = useState(false)
  
  useEffect(() => {
    setData(EmployeeData)
    }, []);
  

const handleEdit = (id) => {
  const dt = data.filter(item =>  item.id === id);
  if(dt !== undefined)
  {
    setisUpdate(true)
    setId(id);
    setName(dt[0].Name);
    setEmail(dt[0].email);
    setPhonenumber(dt[0].phoneNumber);
  }
}

const handleDelete = (id) => {
  if (id > 0) {
    if (window.confirm('Are you sure you want to delete?')){
      const dt = data.filter( item => item.id !== id);
      setData(dt);
    }
}}

const handleSave = (e) => {
  let error = '';

  if(Name === '')
  error += 'Name is Missing, ';

  if(email === '')
  error += 'Email is Missing, ';

  if(phoneNumber === '')
  error += 'Phone Number is Missing. ';

  if(error === ''){

  e.preventDefault();
  const dt = [...data];
  const newObject = {
    id: EmployeeData.length + 1,
    Name: Name,
    email : email,
    phoneNumber: phoneNumber
  }
  dt.push(newObject);
  setData(dt)
  handleClear()
}
else{
  alert(error)
}
}


const handleUpdate = () => {
  const index = data.map((item) => 
  {return item.id
  }).indexOf(id);

  const dt = [...data];
  dt[index].Name = Name;
  dt[index].email = email;
  dt[index].phoneNumber = phoneNumber;

  setData(dt);
  handleClear();
}

const handleClear = (id) => {
  setId(0);
  setName('');
  setEmail('');
  setPhonenumber('');
  setisUpdate(false)
}

// const handleSearch = (Name) => {
//   const dt = data.filter( Name => item.Name === Name);
//   setData(dt);
// }

  return (
    <div className="App">

      <div>
        <h1 style={{margin: "20px 0px"}}>Contact Management System</h1>
        {/* <div>
          <input type='text' placeholder='Enter Text' value={Name} onChange={handleSearch}/>
        </div> */}
        
      </div>

      <div style={{display: 'flex'  , justifyContent:'center', marginTop:"35px" }}>
        <div style={{margin : "0px 10px"}}>
          <label>Name :
            <input type='text' placeholder='Enter Name' onChange={(e)=>setName(e.target.value)} value ={Name}/>
          </label>
        </div>
        <div style={{margin : "0px 10px"}}>
          <label>Email :
            <input type='text' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value ={email}/>
          </label>
        </div>
        <div style={{margin : "0px 10px"}}>
          <label>Phone Number :
            <input type='text' placeholder='Enter Phone Number' onChange={(e)=>setPhonenumber(e.target.value)} value ={phoneNumber}/>
          </label>
        </div>
        <div style={{width:'160px', display: 'flex', justifyContent : 'space-around'}}>
          {
            !isUpdate ?
          <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Add</button>
          :
          <button className='btn btn-success' onClick={() => handleUpdate()}>Update</button>
          }
         <button className='btn btn-outline-danger' onClick={() => handleClear()}>Clear</button>  
        </div>

      </div>
      
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone No.</td>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>
        {
          data.map((item, index) =>{
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.id}</td>
                <td>{item.Name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>
                <button className='btn btn-outline-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                <button className='btn btn-outline-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          }) 
        }
      </tbody>

      </table>  

    </div>
  );
}

export default App;

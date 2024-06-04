import React,{useState} from 'react'
import { useNavigate , useParams } from 'react-router-dom';
export default function PasswordReset() {
    const [credentials,setCredentials]=useState({password:"",confirmPassword:""})
    const [loading,setLoading] =useState(0)
    const param=useParams();
    let navigate=useNavigate();
    const setPassword = async () => {
        if(credentials.password!=credentials.confirmPassword){alert("confirmPassword is not matching");return;}
        setLoading(1)
        try {
            await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${param.token}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            }).then(async (res) => {
            let response= await res.json()
            //console.log("res in rest" ,response.data.email)
            if(response.success){
                await fetch("https://movieslibrarybackend-2tnj.onrender.com/api/updatePassword", {
                method: 'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email:response.data.email,password:credentials.password})
                }).then(response => response.json()).then(json => {
                    setLoading(0)
                    alert(json.message);
                    navigate('/Login')
                }) 
            }
            else {setLoading(0),alert(response.message);}
            })
            
        } catch (error) {
            setLoading(0)
            alert("Somthing went wrong try later")
        }
        
    } 
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
    
    return(
        <div className="wrapper" >
        <div className="logo">
            <img src={require('../websiteLogo.jpg')} alt=""/>
        </div>
        <div className="text-center m-4 name text-success">
        MoviesLibrary
        </div>
        <div><label htmlFor="exampleInputEmail1" className="form-label md-3">resetPassword</label></div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password"  id="pwd" placeholder="confirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} />
        </div>
        <button className="btn mt-3 bg-success" style={{width:'70%'}} onClick={setPassword}>update</button>
        {loading?<div class="spinner-border" role="status">
          <span class="visually-hidden text-center">Loading...</span>
        </div>:""}
      </div>
  )
}



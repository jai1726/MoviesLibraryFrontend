import React,{useEffect, useState} from 'react'
import Footer from '../components/Footer'
import Header from './Header'

export default  function About() {
    let [data,setData]=useState(["",""])
    let authToken=localStorage.getItem("token")
    try {
        const fetchUser = async () => {
            await fetch(`https://movieslibrarybackend-2tnj.onrender.com/api/getUserDetails/${authToken}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(async (res) => {
                let response= await res.json()
                if(response.success) setData([response.data.name,response.data.email])
                else alert(response.message)
            })
        }
        useEffect(() => {
            fetchUser()
        }, [])
        
    } catch (error) {
        alert("smothing went wront")
    }
    
    return (
        <div>
        <div><Header /></div>
        <div className="wrapper ">
            <div className="logo ">
                    <img src={require('../websiteLogo.jpg')} alt=""/>
            </div>
            <div className='d-flex mt-3'>
              <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Name :</label></div>
              <div className="form-label m-1 mt-4">{data[0]}</div>
            </div>
            <div className='d-flex'>
              <div><label htmlFor="exampleInputEmail1" className="form-label m-2 mt-4 text-success">Email:</label></div>
              <div className="form-label mt-4">{data[1]}</div>
            </div>
            
            <br/>
        </div>
        <div><Footer /></div>
        </div>
        
    )
}

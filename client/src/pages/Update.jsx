import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"

const Update =() => {
    const [movie,setMovie]=useState({
        title:"",
        desc:"",
        cover:"",
    })

    const navigate=useNavigate()
    const location=useLocation()

    const movieID=location.pathname.split("/")[2]

    const handleChange=(e)=>{
        setMovie(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick= async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/movies/"+ movieID, movie)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    console.log(movie)
    return (
        <div className='form'>
            <h1>Update new movie</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title"/>
            <input type="text" placeholder='desc' onChange={handleChange} name="desc"/>
            <input type="text" placeholder='cover' onChange={handleChange} name="cover"/>
            <button className='updateButton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update;
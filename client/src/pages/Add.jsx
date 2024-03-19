import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Add =() => {
    const [movie,setMovie]=useState({
        title:"",
        desc:"",
        cover:"",
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        setMovie(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick= async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/movies", movie)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    console.log(movie)
    return (
        <div className='form'>
            <h1>Add new movie</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title"/>
            <input type="text" placeholder='desc' onChange={handleChange} name="desc"/>
            <input type="text" placeholder='cover' onChange={handleChange} name="cover"/>
            <button className='addButton' onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add;
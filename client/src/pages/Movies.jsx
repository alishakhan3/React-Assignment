import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Movies =() => {
    const[movies, setMovies]= useState([])

    useEffect(()=>{
        const fetchAllMovies=async()=>{
            try{
                const res=await axios.get("http://localhost:8800/movies")

                setMovies(res.data);
            } 
            catch(err){
                console.log(err)
            }
        }
        fetchAllMovies()
    },[])
    
    const handleDelete= async (id)=>{
        try{
            await axios.delete("http://localhost:8800/movies/"+id)
            window.location.reload()
        }
        catch (err) {

        }
    }

    return (
        <div className='title'>
            <h1>Movies Catalogue</h1>
            <div className="movies">
                {movies.map(movie=>(
                    <div className="movie" key={movie.id}>
                        {movie.cover && <img src={movie.cover} alt="" />}
                        <h2>{movie.title}</h2>
                        <p>{movie.desc}</p>
                        <button className="delete" onClick={()=>handleDelete(movie.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${movie.id}`} className='updateLink'>Update</Link></button>
                    </div>
                ))}
            </div>
            <button  className='mainaddButton'><Link to="/add" className='addLink'>Add new movie</Link></button>
        </div>
    )
}

export default Movies;
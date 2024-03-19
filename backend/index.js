import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app=express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Acc0@user3",
    database: "assignment"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello")
})

app.get("/movies", (req,res)=>{
    const q="SELECT * FROM assignment.movies;"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)

        return res.json(data)
    })
})

app.post("/movies", (req,res)=>{
    const q="INSERT INTO movies (`title`, `desc`, `cover`) VALUES (?)"

    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)

        return res.json("Movie has been created successfully")
    })
})

app.delete("/movies/:id", (req, res)=>{
    const movieId=req.params.id
    const q="DELETE FROM movies WHERE id=?"
    db.query(q,[movieId], (err, data)=>{
        if(err) return res.json(err)

        return res.json("Movie has been deleted successfully")
    })
})

app.put("/movies/:id", (req, res)=>{
    const movieId=req.params.id
    const q="UPDATE movies SET `title`=?, `desc`=?, `cover`=? WHERE id=?"

    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(q,[...values, movieId], (err, data)=>{
        if(err) return res.json(err)

        return res.json("Movie has been updated successfully")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})
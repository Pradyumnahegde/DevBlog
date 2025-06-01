const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId

let postRoutes = express.Router();

// CRUD operations - Retrieve all
postRoutes.route("/posts").get(async (req,res)=>{
    let db = database.getDb()
    let data = await db.collection("posts").find({}).toArray()
    // res.json(data)     or
    if (Object.keys(data).length > 0){
        res.json(data)
    }else{
        throw new Error("Data was not found")
    }
})
// Retrieve one
postRoutes.route("/posts/:id").get(async (req,res)=>{
    let db = database.getDb()
    let data = await db.collection("posts").findOne({_id: new ObjectId(req.params.id)})
    // res.json(data)     or
    if (Object.keys(data).length > 0){
        res.json(data)
    }else{
        throw new Error("Data was not found")
    }
})

// Create one
postRoutes.route("/posts/").post(async (req,res)=>{
    let db = database.getDb()
    let mongoObject = {
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        author:req.body.author,
        dateCreated:req.body.dateCreated
    }
    let data = await db.collection("posts").insertOne(mongoObject)
    res.json(data)
})

// Update one

postRoutes.route("/posts/:id").put(async (req, res) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            author: req.body.author,
            dateCreated: req.body.dateCreated
        }
    }
    let data = await db.collection("posts").updateOne(
        { _id: new ObjectId(req.params.id) }, // Filter to find the document by ID
        mongoObject // Update operation
    )
    res.json(data);
})

//Delete one

postRoutes.route("/posts/:id").delete(async (req,res)=>{
    let db = database.getDb()
    let data = await db.collection("posts").deleteOne({_id: new ObjectId(req.params.id)})
   res.json(data)
})

module.exports = postRoutes
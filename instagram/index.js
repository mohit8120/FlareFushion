const express= require("express");
const app=express();
const path=require("path");
const {v4: uuidv4}=require('uuid');
const methodOverride=require("method-override");

const port =8080;
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"diya",
        image:"https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?cs=srgb&dl=bloom-blooming-blossom-462118.jpg&fm=jpg",
        caption:"let the butterflies fly"
    },
    {
        id:uuidv4(),
        username:"laksh",
        image:"https://th.bing.com/th/id/OIP.EolqIms1Z3o64jTya2mA3AHaLH?pid=ImgDet&w=474&h=711&rs=1",
        caption:"Mountains"
    },
    {
        id:uuidv4(),
        username:"purvee",
        image:"https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=clouds-cloudy-countryside-236047.jpg&fm=jpg",
        caption:"let the butterflies fly"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let {username,image,caption}=req.body;
    posts.push({id,username,image,caption});
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcaption=req.body.caption;
    let post=posts.find((p)=>id===p.id);
    post.caption=newcaption;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>p.id!=id);
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
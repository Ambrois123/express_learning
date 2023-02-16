const express  = require("express") //création  d'une constante qui va contenir le module express
const {Sequelize, DataTypes} = require("sequelize"); //importation de sequelize

//paramètres de connexion à la base de données
const databaseName = "apprendre";
const username = "admin";
const password = "password";
const host = "localhost";
const dialect = "mariadb";

const sequelize = new Sequelize(databaseName,username,password,{
    host: host,
    dialect: dialect
}); //instanciation de sequelize

sequelize.define("user",{
    name : DataTypes.STRING,
    lastname : DataTypes.STRING,
    age : DataTypes.INTEGER,
    passqord : DataTypes.STRING,
    email: DataTypes.STRING
}); //création d'un modèle (table) user

sequelize.sync(); //synchronisation avec la base de données.

const app = express() //instanciation de l'application express
const port = 4000;

app.use(express.json()) //pour pouvoir lire les données envoyées par le client

//création d'une route
// app.get("/contact",(req,res)=>{

//     res.send("<h1>Page de contact</h1>");
// })

//création d'une nouvelle route
// app.get("/",(req,res)=>{
//     res.sendFile("index.html", {
//         root: __dirname 
//     });
// });

app.post("/user",(req,res)=>{
    
    const user =  req.body;
    //req.originalUrl //url de la requete
    //requete sql pour ajouter un user. Tjrs préciser le statut
    res.json(user);
})


app.listen(port,function()//callback function
{
    console.log("Serveur start at localhost:" , port)
})


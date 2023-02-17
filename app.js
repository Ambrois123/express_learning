const express  = require("express") //création  d'une constante qui va contenir le module express
const {Sequelize, DataTypes} = require("sequelize"); //importation de sequelize
const bcrypt = require("bcrypt");   //importer le package bcrypt


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
    username : DataTypes.STRING,
    lastname : DataTypes.STRING,
    age : DataTypes.INTEGER,
    password : DataTypes.STRING,
    email: DataTypes.STRING
}); //création d'un modèle (table) user

const User = sequelize.models.user; //récupération du modèle user

/*différentes méthodes pour récupérer des données de la base de données :
    nom_du_modèle.findAll() : récupère tous les enregistrements
    nom_du_modèle.findByPk() : récupère un enregistrement par son id
    nom_du_modèle.findOne() : récupère un enregistrement par une condition
    nom_du_modèle.findAndCountAll() : récupère tous les enregistrements et le nombre d'enregistrements
    nom_du_modèle.findCreateFind() : récupère un enregistrement ou le crée si il n'existe pas
    nom_du_modèle.findOrBuild() : récupère un enregistrement ou le construit si il n'existe pas
    nom_du_modèle.create() : crée un enregistrement
*/

sequelize.sync(); //synchronisation avec la base de données.
//Si erreur dans la table  ecrire : sequelize.sync({force:true})

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

app.post("/user",async(req,res)=>{
    
    const user =  req.body;
    //req.originalUrl //url de la requete
    //requete sql pour ajouter un user. Tjrs préciser le statut

    await User.create({
        username :req.body.name,
        lastname : req.body.lastname,
        age : req.body.age,
        //hashage du mot de passe
        password : bcrypt.hashSync(req.body.password,10),
        email : req.body.email
    });
    // res.json(user);
    res.status(200).json({message:"Utilisateur crée"});
})

app.get("/login",async(req,res)=>{
    const User = sequelize.models.user;
    const token = null; //token d'authentification

    // - récupérer mot de passe envoyé par le client
    // - comparer le mot de passe envoyé par le client avec le mot de passe hashé dans la base de données
    // - si le mot de passe est correct, on génère un token d'authentification

    const password = req.body.password;// 1- récupérer le mot de passe envoyé par le client

    // 2-récupérer le user dans la base de données

    const user = await User.findOne({

        where : {username: req.body.name}
    });

    // 3-comparer le mot de passe envoyé par le client avec le mot de passe hashé dans la base de données

    const isPasswordCorrect = bcrypt.compareSync(password,user.password); //password = celui du formulaire, user.password = celui de la base de données
    
    if(isPasswordCorrect){
        res.status(200).json({message: "Vous êtes connecté",data:token})
        return;

    }else{
        res.status(400).json({message: "Données incorrect",data:null})
    }

})



app.listen(port,function()//callback function
{
    console.log("Serveur start at localhost:" , port)
})

//hashage du mot de passe


    //créer une constante qui va contenir le mot de passe
// const pass = "123456";
//     //hasher le mot de passe
// const hashPassword = bcrypt.hashSync(pass,10); //plus le chiffre est grand plus le hashage est long et sécurisé

// console.log(hashPassword);
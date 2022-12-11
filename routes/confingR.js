const indexR =require("./index")
const carsR =require("./cars")
const usersR =require("./users")




exports.routesInit = (app)=>{

    app.use("/",indexR);
    app.use("/cars",carsR);
    app.use("/users",usersR);
    

    
}
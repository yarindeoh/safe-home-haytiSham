const UsersService = require("./users.service");

class UsersController {
    constructor() {
        this.usersService = new UsersService();
    }

    login(req, res) {        
        const userName = req.body.userName;
        const userPaswword = req.body.password;
        if(!userName || ! userPaswword){
            return res.status(400).json({error: "userName and password are required"});
        }
        return this.usersService.validateLogIn(userName, userPaswword).then((user) =>{
            if(!user){
                return res.status(403).json({error: "wrong credentials"});
            }
            const jwt = this.usersService.generateJWTToken(user._id, user.name);
            return res.status(200).json({token: jwt});
        });
    }

    validateUserLogIn(req, res, next) {
        const token = req.get("authorization");
        if(!token){
            return res.status(401).json({ status: "error", code: "unauthorized", info: "token is missing" });
        }
        const valid = this.usersService.validateJWTToken(token);
        if(!valid){
            return res.status(401).json({ status: "error", code: "unauthorized", info: "token not valid" });
        }
        return next();       
    }
}
module.exports = UsersController;
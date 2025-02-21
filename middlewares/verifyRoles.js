const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user
        const roles = req.roles
        if (!req?.roles) return res.sendStatus(401); 
        const rolesArray = [...allowedRoles];
        console.log(req.roles)
        console.log(rolesArray)
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        console.log(user)
        console.log(roles)
        req.user = user
        req.roles = roles
        next();
    }
}

export default verifyRoles
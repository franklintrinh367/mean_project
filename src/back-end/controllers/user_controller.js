const user = require('../models/user');

//look for existing username
exports.find = (req, res) => {
    console.log("call to request");
    var username = req.params.username;
    console.log(username);
    user.findOne({username: username}).then(
        (result) =>{
                res.json(result);
        }
    ).catch(err => {
        console.log(err);
    })
}
//look for existing email
exports.findEmail = (req, res) => {
        var email = req.params.email;
        console.log(email)
        user.findOne({email: email}).then(
            result => {
                res.json(result)
            }
        ).catch(
            error => {
                if(error){
                    console.log(error);
                }
            }
        )
}

exports.register = (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    user.findOne({
        $or: [
            {username: username},
            {email: email}
        ]
    }).then(
        result => {
            if(result)
                res.json(
                    {msg: "User exists"}
                );
            else
                res.send("not found");
        }
    )
}
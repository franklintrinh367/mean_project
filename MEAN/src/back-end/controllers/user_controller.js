const user = require('../models/user');

exports.find = (req, res) => {
    console.log("call to request");
    var username = req.params.username;
    console.log(username);
    user.findOne({username: username}).then(
        (result) =>{
            if(result)
                res.json(result);
        }
    ).catch(err => {
        console.log(err);
    })
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
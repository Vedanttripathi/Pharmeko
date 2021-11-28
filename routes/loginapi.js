const express = require('express');
const userLogin = require('../models/user');
const router = express.Router();

router.post('/login', (req, res) => {
    userLogin.findByCredentials(req.body.name, req.body.password).then(result => res.send({
        loggedin : true,
        role: result.role
    })).catch(err => res.send({
        loggedin : false,
    }));
});


router.post('/signup', (req, res) => {
    const user = new userLogin(req.body);
    user.save().then(() => res.send('User created successfully')).catch((err) => res.send(err));
})


module.exports = router;
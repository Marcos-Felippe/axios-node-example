const express = require('express');
const routes = express.Router();

let users = [{
    id: 1,
    name: "Marcos",
    email: "m@gmail.com"
}];

let count = 2;


routes.get('/api', (req, res) => {
    return res.json(users);
});

routes.get('/api/:id', (req, res) => {

    const id = req.params.id;

    const user = users.find(user => Number(user.id) === Number(id));

    if (!user) {
        return res.json('user not found')
    }

    return res.json(user);
});

routes.post('/api', (req, res) => {

    const { name, email } = req.body;

    users.push({
        id: count,
        name: name,
        email: email
    });

    count = count + 1;

    return res.json('Saved user');
});

routes.put('/api/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;

    const user = users.find(user => Number(user.id) === Number(id));

    if (!user) {
        return res.json('user not found')
    }

    const updateUser = {
        ...user,
        name: name,
        email: email
    }

    users = users.map(user => {
        if(Number(user.id) === Number(id)) {
            user = updateUser;
        }
        return user
    })

    return res.json('updated user');
});

routes.delete('/api/:id', (req, res) => {

    const id = req.params.id;

    users = users.filter((user) => Number(user.id) !== Number(id));

    return res.json('deleted user');
});

module.exports = routes;
const express = require("express");

const router = express.Router();

const uuid = require("uuid");

let users = require("../../user");


router.get("/", (req, res) => {

  res.json(users);

});


router.get("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));


  if (found) {

    res.json(users.filter(user => user.id === parseInt(req.params.id)));

  } else {

    res.sendStatus(400);

  }

});


router.post("/", (req, res) => {

  const newUser = {

    id: uuid.v4(),
    fistName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email

  };

  if (!newUser.name || !newUser.email) {

    return res.sendStatus(400);

  }

  users.push(newUser);

  res.json(users);

});

//Update User

router.put("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {

    const updateUser = req.body;

    users.forEach(user => {

      if (user.id === parseInt(req.params.id)) {

        user.firstName = updateUser.firstName ? updateUser.firstName : user.firstName;
        user.lastName = updateUser.lastName ? updateUser.lastName : user.lastName;
        user.age = updateUser.age ? updateUser.age : user.age;
        user.gender = updateUser.gender ? updateUser.gender : user.gender;
        user.email = updateUser.email ? updateUser.email : user.email;

        res.json({ msg: "User updated", user });

      }

    });

  } else {

    res.sendStatus(400);

  }

});


//Delete User

router.delete("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id))

  if (found) {

    users = users.filter(user => user.id !== parseInt(req.params.id))

    res.json({

      msg: "User deleted",

      users

    });

  } else {

    res.sendStatus(400);

  }

});



module.exports = router;


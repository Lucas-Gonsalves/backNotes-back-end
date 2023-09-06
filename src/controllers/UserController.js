

class UserController { //test

  create (request, response) {
    const { name, email, password } = request.body;

    
    const user = {
      name,
      email,
      password
    };

    response.status(200).json(user);
  };
};


module.exports = UserController 
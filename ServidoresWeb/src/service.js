//Genrar una constante con los datos de la api
const data = require('./MOCK_DATA.json');

module.exports = {
  getUsers: () => data,
  getUser: (id) => {
    let identificador = parseInt(id);
    let user = data.filter((persona) => persona.id === identificador)[0];
    // let user = data.find((persona) => persona.id === identificador);
    return user;
  },
  createUser: (dataUser) => {
    let newUser = {
      id: data.length + 1,
      ...dataUser,
    };
    data.push(newUser);
    return newUser;
  },
  updateUser: (id, dataUser) => {
    let findUser = data.findIndex((user)=> user.id === id);
    let userUpdate = {
      id: findUser,
      ...dataUser
    }
    data.splice(findUser, 1, userUpdate)
    return userUpdate;
  },
  deleteUser: (id) => {
    let findUser = data.findIndex((user) => user.id === id);
    data.splice(findUser, 1)
  }
};
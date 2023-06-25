// User model
class User {
  constructor(id, email, password, roles) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}

module.exports = User;

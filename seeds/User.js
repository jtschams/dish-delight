const { User } = require('../models');

const userData = [
  {
    "name": "J.T.",
    "email": "jt@email.com",
    "password": "password12345"
  },
  {
    "name": "Jewel",
    "email": "jewel@email.com",
    "password": "password12345"
  },
  {
    "name": "Andrew",
    "email": "andrew@email.com",
    "password": "password12345"
  },
  {
    "name": "Erika",
    "email": "erika@email.com",
    "password": "password12345"
  }
];

const seedUser = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUser;
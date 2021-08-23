const seeder = require("mongoose-seed");
const dotenv = require("dotenv");

dotenv.config()

const db = process.env.MONGODB_URI;

seeder.connect(db, function () {
  seeder.loadModels([
    "./backend/src/models/Product.js"
  ]);
  seeder.clearModels(['Product']);
  seeder.populateModels(data, function (err, done) {
    if (err) {
      return console.log("seed err", err)
    }
    if (done) {
      return console.log("seed done", done);
    }
    seeder.disconnect()
  })

});

const data = [
  {
    "id": 1,
    "title": "Smartwatch",
    "img": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1378&q=80",
    "price": 150,
    "company": "",
    "description": "",
    "total": 0,
    "digitalProduct": false
  },
  {
    "id": 2,
    "title": "Headphones",
    "img": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "price": 99,
    "company": "",
    "description": "",
    "total": 0,
    "digitalProduct": false
  },
  {
    "id": 3,
    "title": "Backpack",
    "img": "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "price": 118,
    "company": "",
    "description": "",
    "total": 0,
    "digitalProduct": false
  },
  {
    "id": 4,
    "title": "Headphones",
    "img": "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
    "price": 99,
    "company": "",
    "description": "",
    "total": 0,
    "digitalProduct": false
  },
  {
    "id": 5,
    "title": "Shoes",
    "img": "https://images.unsplash.com/photo-1617689563472-c66428e83d17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "price": 90,
    "company": "",
    "description": "",
    "total": 0,
    "digitalProduct": false
  },
  {
    "id": 6,
    "title": "Perfume",
    "img": "https://images.unsplash.com/photo-1458538977777-0549b2370168?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1653&q=80",
    "price": 75,
    "company": "",
    "description": "",
    "total": 0,
    "digitalProduct": false
  }
]
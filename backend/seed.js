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
    "name": "Smartwatch",
    "img": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1378&q=80",
    "price": 150,
    "stock": "100",
    "company": "company name pending...",
    "description": "description pending...",
    "digitalProduct": false,
    "rating": 4.5,
    "ownerId": "610444e45a9b2236745dc4b3"
  },
  {
    "name": "Headphones",
    "img": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "price": 99,
    "stock": "100",
    "company": "company name pending...",
    "description": "description pending...",
    "digitalProduct": false,
    "rating": 4.5,
    "ownerId": "61058900db9f762fac6a562f"
  },
  {
    "name": "Backpack",
    "img": "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "price": 118,
    "stock": "100",
    "company": "company name pending...",
    "description": "description pending...",
    "digitalProduct": false,
    "rating": 4.5,
    "ownerId": "610593cb311478487871f611"
  },
  {
    "name": "Headphones",
    "img": "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
    "price": 99,
    "stock": "100",
    "company": "company name pending...",
    "description": "description pending...",
    "digitalProduct": false,
    "rating": 4.5,
    "ownerId": "6105945c311478487871f616"
  },
  {
    "name": "Shoes",
    "img": "https://images.unsplash.com/photo-1617689563472-c66428e83d17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "price": 90,
    "stock": "100",
    "company": "company name pending...",
    "description": "description pending...",
    "digitalProduct": false,
    "rating": 4.5,
    "ownerId": "61059606311478487871f618"
  },
  {
    "name": "Perfume",
    "img": "https://images.unsplash.com/photo-1458538977777-0549b2370168?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1653&q=80",
    "price": 75,
    "stock": "100",
    "company": "company name pending...",
    "description": "description pending...",
    "digitalProduct": false,
    "rating": 4.5,
    "ownerId": "6106ab744390753b080cf8f9"
  }
]
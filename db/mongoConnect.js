const mongoose = require('mongoose');
const { config } = require('../config/secret');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.nameDB}:${config.passDB}@cluster0.w3qrn28.mongodb.net/project-NodeJs`);
  console.log('mongodb connect project-NodeJs atlas');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
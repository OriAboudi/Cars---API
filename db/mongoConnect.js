const mongoose = require('mongoose');
const { config } = require('../config/secret');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.nameDB}:${config.passDB}@cluster0.w3qrn28.mongodb.net/project-NodeJs`);
  console.log('mongodb connect project-NodeJs atlas');
  
  
}
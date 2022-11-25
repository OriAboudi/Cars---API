require("dotenv").config();
exports.config={
    nameDB:process.env.NAME_DB,
    passDB:process.env.PASS_DB,
    tokenSecret:process.env.TOKEN_SECRET
}   
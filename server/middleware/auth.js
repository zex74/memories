// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken")

const secret = 'test';
// const secret = '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';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

// export default auth;
module.exports = auth;

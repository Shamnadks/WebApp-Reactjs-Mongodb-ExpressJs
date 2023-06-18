const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const key = "myWebAppSecretKey123"

module.exports.checkUser = (req, res, next) => {
console.log("api call");
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token,key,async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          // next();
        } else {
          // const user = await Admin.findById(decodedToken.id);
          const user = await Admin.findOne({ email: decodedToken.email })

          if (user) res.json({ status: true, user: user.email });
          else res.json({ status: false });
        
        }
      }
    );
  } else {
    res.json({ status: false });
    // next();
  }
};


userDash: async (req, res) => {
  const token = req.headers['x-access-token']
  try {
      const decoded = jwt.verify(token, 'myWebAppSecretKey123')
      const email = decoded.email
      const user = await Admin.findOne({ email: email })
      res.json({ status: 'ok', user: user.name })
  } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: "invalid token" })


  }
}



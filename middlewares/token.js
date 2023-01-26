const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(403).json({msg: 'UnAuthorization.'});
    const Bearer = req.headers.authorization;
    const token = Bearer.replace('Bearer ', ''); 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) return res.status(403).send('Your token time out.')
    next();
  } catch (error) {
    res.status(403).send("UnAuthorization.");
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(403).json({msg: 'UnAuthorization.'});
    const Bearer = req.headers.authorization;
    const token = Bearer.replace('Bearer ', ''); 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.data.role != 'admin') return res.status(403).json({msg: 'no permission denied.' })
    next();
  } catch (error) {
    res.status(403).send("UnAuthorization.");
  }
};
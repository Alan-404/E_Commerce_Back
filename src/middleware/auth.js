const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
    {
        return res.json({success: false, message: 'Invalid token'});
    }

    try 
    {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.accountId = decoded.accountId;
        next();
    }
    catch (err)
    {
        return res.json({success: false, message: err.message});
    }
}

module.exports = verifyToken;
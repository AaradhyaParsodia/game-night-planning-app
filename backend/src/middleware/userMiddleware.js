import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(req, res, next){
    // console.log(req.authorization);
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith('Bearer ')){
        res.status(403).json({
            message: 'Invalid Authorization Token or please login again'
        });
        res.end();
        return;
    }

    const authArr = auth.split(' ');
    const token = authArr[1];

    try {
        const decodeValue = jwt.verify(token, JWT_SECRET);

        if(decodeValue.email){
            req.email = decodeValue.email;
            next();
        }
        else{
            return res.status(403).json({
                message: 'Invalid Authorixation Token'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something gone wrong. Please check auth token or login again'
        });
        return;
    }
}
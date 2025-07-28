import jwt from 'jsonwebtoken'

const isauthenticated = (req, res, next) => {
    
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(401).json({message: "invalid credentials or no token provided"})
    }

    const token = header?.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "invalid credentials or no token provided"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    }
    catch (err) {
        res
          .status(401)
          .json({ message: "invalid credentials or no token provided" });
    }
}

export default isauthenticated;
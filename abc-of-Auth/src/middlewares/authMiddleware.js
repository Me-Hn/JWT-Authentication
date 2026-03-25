import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No Token was Provided | Authorization denied" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (error) {
        res.status(400).json({ message: "Token is not Valid" })
    }
}

export default verifyToken;
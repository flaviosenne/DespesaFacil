import jwt from 'jsonwebtoken'
const secret = String(process.env.JWT_SECRET)

export const generateToken = (payload: any): string => {

    return jwt.sign(payload, secret, {expiresIn: '1d'})
}

export const tokenValid = async (token: string) => {
    try{
        return jwt.verify(token, secret)
    }catch(err){
        return null
    }
}
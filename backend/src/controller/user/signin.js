import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../model/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

const userSigninSchema = zod.object({
    email: zod.string().email().max(45),
    password: zod.string().min(6).max(18)
})

export async function signin(req, res) {

    const body = req.body;

    try {
        const { success, error } = userSigninSchema.safeParse(req.body);

        if (!success) {
            return res.status(411).json({
                message: "Incorrect input's",
                details: error.issues
            });
        }

        const user = await Users.findOne({
            username: body.email
        });

        if(!user){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const { hash, firstName, lastName } = user;

        const result = await bcrypt.compare(body.password, hash);

        if(!result){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        else{

            const token = jwt.sign({
                email: body.email
            }, JWT_SECRET);
    
            return res.status(200).json({
                message: 'Login successful',
                token,
                firstName,
                lastName
            });
        }


    } catch (error) {
        console.error(`error in signin controller ${error}`);
        res.status(404).send({ message: 'Something went gone' });
    }
}
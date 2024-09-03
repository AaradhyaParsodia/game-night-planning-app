import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../../model/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = zod.object({
    firstName: zod.string().max(35),
    lastName: zod.string().max(35),
    email: zod.string().email().max(45),
    password: zod.string().min(6).max(18)
});

export async function signup(req, res) {
    
    const body = req.body;
    const { firstName, lastName, email, password } = req.body;

    try {
        const { success } = userSchema.safeParse(body);

        console.log('okay');
        const user = await Users.findOne({
            username: email
        });
        
        if (!success || user != null && user._id) {
            // console.log(success);
            return res.status(411).json({
                message: "Email already taken / Incorrect input's"
            });
        }

        const token = jwt.sign({
            email: email
        }, JWT_SECRET);

        const salt = 10;
        
        // using hashing for password storage 
        const hash = await bcrypt.hash(password, salt);

        // console.log('okay' + hashs);
        const newUser = await Users.create({
            firstName: firstName,
            lastName: lastName,
            username: email,
            hash: hash
        });

        res.status(200).json({
            message: "User created successfully",
            token: token
        });

    } catch (error) {
        console.error(`error in signup controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again' });
    }
}
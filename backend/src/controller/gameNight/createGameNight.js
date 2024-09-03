import zod from "zod";
import Users from "../../model/user.js"
import generateGameCode from "../../utils/generateGameCode.js";
import GameNight from "../../model/gameNight.js";

const gameNightSchema = zod.object({
    title: zod.string().min(2).max(70),
    time: zod.date().optional(),
    location: zod.string().optional(),
    maxPlayer: zod.number().default(6),
});

export async function createGameNight(req, res){
    const body = req.body;
    const { title, time, location, maxPlayer, gameId} = req.body;
    
    const parsedTime = time ? new Date(time) : null;
    const players = parseInt(maxPlayer);
    
    try {
        const { success, error } = gameNightSchema.safeParse({
            title,
            time: parsedTime,
            location,
            maxPlayer: players,
        });

        if (!success) {
            return res.status(411).json({
                message: "Incorrect input's",
                details: error.issues
            });
        }
        const user = await Users.findOne({ username: req.email});
        
        let gameCode;

        let existingGameNight;

        do {
            gameCode = generateGameCode();
            existingGameNight = await GameNight.findOne({ gameCode: gameCode, isDeleted: false });
        } while (existingGameNight);
        
        const gameNight = await GameNight.create({
            title,
            time: parsedTime,
            location,
            maxPlayers: players,
            gameCode,
            gameId,
            userId: user._id
        });

        res.status(200).json({
            message: "Game Night Created Successfully",
            gameCode: gameCode
        });

    } catch (error) {
        console.error(`error in createGameNight controller ${error}`);
        res.status(500).send({ message: "Something went gone :(\nInternal Server Error" });
    }
}
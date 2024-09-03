import GameNight from "../../model/gameNight.js";
import Users from "../../model/user.js";

export const updateGameNight = async (req, res)=>{
    const { gameCode } = req.params;
    const body = req.body;
    try {
        const user = await Users.findOne({ username: req.email });
        const gameNightData = await GameNight.findOne({ gameCode: gameCode, isDeleted: false});
        
        if(user._id !== gameNightData.userId){
            return res.status(411).json({
                message: "Invalid request",
            });
        }

        await GameNight.updateOne(
            {gameCode: gameCode, isDeleted: false},
            {
                title: body.title ? body.title : gameNightData.title,
                time: body.time ? new Date(body.time) : gameNightData.time,
                location: body.location ? body.location : gameNightData.location,
                maxPlayers: body.maxPlayers ? body.maxPlayers : gameNightData.maxPlayers,
                isActive: body.isActive ? body.isActive : gameNightData.isActive,
                gameId: body.gameId ? body.gameId : gameNightData.gameId
            }
        );

        res.status(200).json({
            message: "Game night updated successfully",
        });
    } catch (error) {
        console.error(`error in updateGameNight controller ${error}`);
        res.status(500).send({ message: "Something went gone :(\nInternal Server Error" });
    }
}
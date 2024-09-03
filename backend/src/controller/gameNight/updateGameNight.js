import GameNight from "../../model/gameNight.js";
import Users from "../../model/user.js";

export const updateGameNight = async (req, res)=>{
    const { gameCode } = req.params;
    try {
        const user = await Users.findOne({ username: req.email });
        const gameNightData = await GameNight.findOne({ gameCode: gameCode, isDeleted: false});
        
        if(user._id !== gameNightData.userId){
            return res.status(411).json({
                message: "Invalid request",
            });
        }

        
    } catch (error) {
        console.error(`error in updateGameNight controller ${error}`);
        res.status(500).send({ message: "Something went gone :(\nInternal Server Error" });
    }
}
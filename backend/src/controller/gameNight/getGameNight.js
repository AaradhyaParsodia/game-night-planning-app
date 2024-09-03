import GameNight from "../../model/gameNight.js";

export const getGameNight = async (req, res) => {
    const { gameCode } = req.params;
    try {
        const gameNightData = await GameNight.findOne({ gameCode: gameCode, isDeleted: false});
        
        if(gameNightData == null){
            return res.status(411).json({
                message: "Incorrect game code",
            });
        }

        res.status(200).json({
            gameNightData
        });
    } catch (error) {
        console.error(`error in getGameNight controller ${error}`);
        res.status(500).send({ message: "Something went gone :(\nInternal Server Error" });
    }
}
import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
router.delete("/cards", async (req, res) => { 
    try {
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
        res.json({message: `Database cleared`});
    } 
    catch (e) {throw new Error("Database deletion failed"); }
});
router.post("/card", async (req, res) => {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    const existing = await ScoreCard.findOne({name, subject});
    if (existing) {
        try {
            existing.score = score;
            res.json({message: `Updating (${name}, ${subject}, ${score})`, card: 1});
            return existing.save();
        }
        catch (e) { 
            const errorMessage = "ScoreCard update error: " + e;
            res.json({message: errorMessage, card: 0});
            throw new Error(errorMessage); 
        }
    }
    else {
        try {
            const newScoreCard = new ScoreCard({name, subject, score});
            console.log("Created ScoreCard", newScoreCard);
            res.json({message: `Adding (${name}, ${subject}, ${score})`, card: 1});
            return newScoreCard.save();
        }
        catch (e) { 
            const errorMessage = "ScoreCard creation error: " + e;
            res.json({message: errorMessage, card: 0});
            throw new Error(errorMessage); 
        }
    }
    
});
router.get("/cards", async (req, res) => {
    try {
        const queryString = req.query.queryString;
        const queryType = req.query.type;
        let queryResult, typeInCap;
        if (queryType === "name") {
            queryResult = await ScoreCard.find({name: queryString});
            typeInCap = "Name";
        }
        else if (queryType === "subject") {
            queryResult = await ScoreCard.find({subject: queryString});
            typeInCap = "Subject";
        }
        const existMessage = queryResult.length?
            queryResult.map(
                data => `Found card with ${queryType}: (${data.name}, ${data.subject}, ${data.score}) `
            ):
            [`${typeInCap} (${queryString}) not found!`];
        res.json({messages: existMessage});
    }
    catch(e) {
        const errorMessage = "ScoreCard query error: " + e;
        res.json({message: errorMessage});
        throw new Error(errorMessage); 
    }
    
    
});
export default router;
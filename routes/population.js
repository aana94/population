var express = require('express');
var router = express.Router();
var Population = require('../models/population');

// no prevent case sensitivity for state and city
function stringFormat(val) {
    if(val){
        let anyVal = val.toLowerCase();
        let formatVal = (anyVal[0].toUpperCase() + anyVal.slice(1));
        return formatVal;
    } else {
        return val;
    }
}

// GET method to fetch the population for provided state and city
router.get('/state/:state/city/:city', async (req, res) => {
    try{
        if(req.params.state && req.params.city) {
            let findState = stringFormat(req.params.state);
            let findCity = stringFormat(req.params.city);
            let query = {"city":findCity, "state": findState}
            let pop = await Population.find(query, {
                "_id": 0,
                "population": 1
            });
            if(pop && pop.length >= 1) {
                console.log(`The population of State:${findState} and City:${findCity} is ${pop}`)
                return res.status(200).json(pop[0]);
            } else {
                return res.status(400).json({ "message": `State: ${findState} and City: ${findCity} in a combination not found.` })
            }
        } else {
            return res.status(404).json({ "message": `Please provide the valid state and city.`})
        }
    } catch (e){
        console.log((e))
        return res.status(500).json({ "message": `An error occured.`, "errors": e })
    }
});

module.exports = router;
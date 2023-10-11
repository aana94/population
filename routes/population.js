var express = require('express');
var router = express.Router();
var request = require('request');
var Population = require('../models/population');

// no prevent case sensitivity for state and city
function stringFormat(val) {
    if(typeof val === 'string'){
        let anyVal = val.toLowerCase();
        let formatVal = (anyVal[0].toUpperCase() + anyVal.slice(1));
        return formatVal;
    } else {
        return;
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
                return res.status(400).json({ "message": `The State: ${findState} and City: ${findCity} does not exist.`})
            }
        } else {
            return res.status(404).json({ "message": `Please provide the valid state and city.`})
        }
    } catch (e){
        console.log((e))
        return res.status(500).json({ "message": `An error occured.`, "errors": e })
    }
});

// PUT method to update or insert the state, city and population
router.put('/state/:state/city/:city', async (req, res) => {
    try{
        res.set('Content-Type', 'text/plain');
        if(typeof req.params.state === 'string' && typeof req.params.city === 'string') {
            let findState = stringFormat(req.params.state);
            let findCity = stringFormat(req.params.city);
            let query = {"city":findCity, "state": findState}
            let body = req.body
            console.log(body);
            let pop = await Population.findOne(query);
            if(pop) {
                // when user wants to update the population of state and city presented in the database
                Population.findOne(query)
                .then(population => {
                    if(population){
                        population.population = body
                        return population.save();
                    }
                })
                .then(savedPop => {
                    return res.status(200).json({ "message": `State: ${findState} and City: ${findCity} has been updated.`, savedPop});
                })
                .catch(error => {
                    return res.status(400).json({ "message": `Unable to update the data.` , "error": error});
                });
            } else if(!pop) { // if state, city and population doesn't exist.
                let newData = new Population({
                    city:findCity,
                    state: findState,
                    population: body
                })
                newData.save();
                return res.status(201).json({ "message": `The State: ${findState} and City: ${findCity} has been created.`, newData})
            } else {
                return res.status(400).json({ "message": `An error occured` })
            }
        } else {
            return res.status(404).json({ "message": `Please provide the valid state and city.`})
        }
    } catch (e){
        console.log((e))
        return res.status(500).json({ "message": `An error occured.`, "errors": e.message })
    }
});

module.exports = router;
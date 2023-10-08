var express = require('express');
var router = express.Router();
var Population = require('../models/population');

router.get('/state/:state/city/:city', async (req, res) => {
    try{
        let findState = req.params.state
        let findCity = req.params.city
        let query = {"city":findCity, "state": findState}
        console.log(findState + ' and ' + findCity)
        let pop = await Population.find(query, {
            "_id": 0,
            "population": 1
        });
        if(pop) console.log(`here the data ${pop} and response ${res.json({pop})}`)
        if (pop) {
            console.log('Found document:', pop);
        } else {
            console.log('No matching document found.');
        }
        // {"state": findState, "city":findCity}, {"_id": 0, "population":1}
        // Population.find({})
        // .then((res) => {console.log(`response ${res.json}`)})
        // .catch((err) => {console.log(`error ${err}`)});
        // console.log(res.json);
    } catch (e){
        console.log((e))
        return res.status(400)
    }
});

module.exports = router;
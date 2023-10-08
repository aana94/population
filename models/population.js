const mongoose = require('mongoose');
const PopulationSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
        },
        state:{
        type:String,
        required: true,
        },
        population:{
        type:String,
        required: true,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },
        updatedAt: {
        type: Date,
        default: Date.now,
        },
    }
)

module.exports = mongoose.model('Population', PopulationSchema)
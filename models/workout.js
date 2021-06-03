const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: 'You must choose an exercise type.'
            },
            name: {
                type: String,
                trim: true,
                required: 'Please enter the name of your exercise.'
            },
            duration: {
                type: Number,
                required: 'Please enter total time spent on exercise.'
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            },
        },
    ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
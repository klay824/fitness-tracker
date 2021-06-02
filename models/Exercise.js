const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        enum: ['resistance', 'cardio'],
        required: 'You must choose an exercise type.'
    },
    name: {
        type: String,
        trim: true,
        required: 'Please enter the name of your exercise.'
    },
    distance: {
        type: Number,
        required: 'Please enter the distance traveled.'
    },
    duration: {
        type: Number,
        required: 'Please enter total time spent on exercise.'
    },
    weight: {
        type: Number,
        required: 'Please enter total weight in pounds.'
    },
    sets: {
        type: Number,
        required: 'Please enter the number of sets.'
    },
    reps: {
        type: Number,
        required: 'Please enter the number of reps'
    }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
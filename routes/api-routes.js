const router = require('express').Router();
const Workout = require('../models/workout.js');

// creates a workout
router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

// finds current workout, adds new workout to it
router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

// gets the workouts and adds the total duration of each
router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});

// gets a range of workouts for the last 7 days, adds their total duration
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});

// delete
router.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.json(err);
        });
});


module.exports = router;
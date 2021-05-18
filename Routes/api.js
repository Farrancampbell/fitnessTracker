const { Workout } = require("../models");
const db = require("../models");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true }
  )
    .then((updateWorkout) => {
      console.log(updateWorkout);
      res.json(updateWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get(`/api/workouts/range`, (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((workout) => {
        reversed = workout.reverse()
      res.json(reversed);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

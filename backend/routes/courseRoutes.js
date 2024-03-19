const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
   res.status(200).json({ message:"Get All the courses"})
});

router.route('/').post((req, res) => {
    res.status(200).json({ message:"Create a course"})
 });

 router.route('/:id').put((req, res) => {
    res.status(200).json({ message:`Update the course with id ${req.params.id}`})
 });

 router.route('/:id').delete((req, res) => {
    res.status(200).json({ message:`Delete the course with id ${req.params.id}`})
 });
 

module.exports = router;
//@desc Get all course
//@route GET /api/courses
//@access public
const getCourses = async (req,res)=>{
    res.status(200).json({message:"Get All courses"})
}

//@desc Get a course
//@route Get /api/courses/:id
//@access public
const getCourse = async (req, res) => {
    res.status(200).json({ message:`Get the course with id ${req.params.id}`})
 }

//@desc Post a course
//@route Post /api/courses
//@access public
const publishCourse = async (req, res) => {
   console.log("The request body",req.body)
   const {name,code,credits} = req.body
   if(!name || !code || !credits){
      res.status(400)
      throw new Error("All fiels are mandatory")
   }
    res.status(201).json({ message:"Create a course"})
 }

//@desc Update a course
//@route Put /api/courses/:id
//@access public
 const updateCourse = async (req, res) => {
    res.status(200).json({ message:`Update the course with id ${req.params.id}`})
 } 

//@desc Delete a course
//@route Delete /api/course/:id
//@access public
 const deleteCourese = async (req, res) => {
    res.status(200).json({ message:`Delete the course with id ${req.params.id}`})
 }
module.exports = {getCourses,getCourse,publishCourse,updateCourse,deleteCourese}
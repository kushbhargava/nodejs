const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.error('Error occured', err));

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    author: String,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('courseeds', courseSchema);

//Creating a course
async function createCourse() {
    for (let index = 0; index < 11; index++) {
        const course = new Course({
            name: 'java code' + index,
            author: 'Kushagra',
            tags: ['java', 'database'],
            isPublished: true
        });
        const result = await course.save();
        console.log(result);
    }
}

//Fetching course on some condition
async function fetchCourses() {
    const courses = await Course
        .find()
        //.find({ name: /^code/ }) // //-- starts with code
        //.find({ name: /code$/ }) // //-- ends with code
        //.find({ name: /.*code.*/i }) // //-- contains code (case insensitive)
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        .limit(10) // limits the number of result
        .sort({ name: 1 }) //1 for ascending, -1 for desc
        .count();

    console.log(courses);
}

//Updating using update returning just result not course method
async function updateCourse(id) {
    let result = await Course.update(
        { isPublished: true }, // giving the condition
        { // setting the value
            $set: {
                name: 'spring',
                isPublished: false,
                author: 'Gopal'
            }
        },
        { multi: true }// giving the option for updating multiple documents 
    );
    console.log(result);
}


async function findCourse(id) {
    return await Course.find({ _id: id });
}

async function fetchCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        .find()
        //.skip((pageNumber - 1) * pageSize)
        .sort({ name: 1 });

    console.log(courses);
}

async function getFirstThenUpdateCourse(id) {
    let course = await Course.findById(id);
    if (!course) return;
    course.isPublished = false;
    course.author = 'Shashank'
    const updatedCourse = await course.save();
    console.log(updatedCourse);

}

//Updating using update returning just result not course method
async function updateCourse(id) {
    let result = await Course.update(
        { isPublished: false }, // giving the condition
        { // setting the value
            $inc: {
                order: 1
            }
        },
        { multi: true }// giving the option for updating multiple documents 
    );
    console.log(result);
}

async function getAndUpdateCourse(id) {
    const course = await Course.findByIdAndUpdate(
        id, // first argument is always id of the document to be updated
        { //values to be updated
            $set: {
                name: 'node.js',
                isPublished: false,
                author: 'prakhar'
            }
        },
        { new: true }//setting new for fetching the updated document , if not set the promise will return the old course
    );
    console.log(course);
}


async function removeCourse(id) {
    let result = await Course.deleteOne({ _id: id });
    console.log(result);
}

async function removeMultipleCourses() {
    let result = await Course.deleteMany({ author: /.*gopal.*/ });
    console.log(result);
}

async function removeAndGetCourse(id) {
    let course = await Course.findByIdAndRemove(id);
    console.log(course);
}

async function run() {
    //await fetchCourses();
    await removeMultipleCourses();
    const course = await findCourse('5ba5e976a3f69211fb80753d');
    console.log(course);
    await removeAndGetCourse('5ba5e976a3f69211fb80753d');

    //await getFirstThenUpdateCourse('5ba5e976a3f69211fb80753d');
}

//FOr more filters please refer to solution.js in exercise
createCourse();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.error('Error occured', err));

//Required and other validations
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 25
    },

    category: {
        type: String,
        required: true,
        //enum: ['web', 'mobile', 'network'],
        //lowercase: true, // will convert the value in lower case before storing,
        uppercase: true,//will convert the value in upper case before storing
        trim: true //will trim the padding around the value
    },

    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return (v && v.length > 0); // checking wheather tags have atleast one value and is not null
            },
            message: 'Course should have atleast 1 tag!!'
        }
    },

    author: {
        type: String,
        match: /^k/i
    },

    date: { type: Date, default: Date.now },

    isPublished: Boolean,

    price: {
        type: Number,
        min: 10,
        max: 100,
        required: function () {
            return this.isPublished;
        },
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('course', courseSchema);

async function createCourses() {
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

async function createCourse() {

    const course = new Course({
        name: 'java code',
        author: 'Kushagra',
        tags: ['java', 'database'],
        isPublished: true,
        price: 10.5,
        category: 'web'
    });

    // //*****************************explicit validation******************************
    // try {
    //     const result = await course.validate();
    //     console.log(result);

    // } catch (err) {
    //     console.log(err.message);
    // }

    // adding the try catch as save is a promise which needs tobe handled. Save also calls the validate method internally 
    try {
        const result = await course.save();
        console.log(result);

    } catch (err) {
        for (const field in err.errors) {
            console.log(err.errors[field].message);
        }
    }
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

//fetchCourses();
createCourse();

//getFirstThenUpdateCourse('5ba5e976a3f69211fb80753d');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.error('Connection could not be established...', err));

const schema = new mongoose.Schema({
    name: String,
    author: String,
    date: { type: Date, default: Date.now() },
    tags: [String],
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', schema);

async function fetchCourses() {
    return await Course
        // .find({ isPublished: true })
        // .or([{ tags: 'backend' }, { tags: 'frontend' }])
        .find({ isPublished: true })
        .or([
            { name: /.*by.*/ },
            { price: { $gte: 15 } }
        ])
        .sort({ price: 1 });
}

async function run() {
    const courses = await fetchCourses();
    console.log(courses);
}

run();
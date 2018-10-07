const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
    type: [authorSchema]
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId) {
  await Course.update({
    _id: courseId
  }, {
    $set: {

    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('Node Course', [
//   new Author({
//     name: 'Mosh'
//   }),
//   new Author({
//     name: 'John'
//   }),
// ]);

//updateCourse('5bb740d41d0d9c20e62406a2');

// addAuthor('5bb7533e0c786822670e3a9f', new Author({
//   name: 'Kushagra'
// }));

removeAuthor('5bb7533e0c786822670e3a9f','5bb7535f9ea9a6227c8865e2');
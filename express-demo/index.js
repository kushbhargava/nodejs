const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course1' },
];
app.get('/', (req, res) => {
    res.send("Hello world!!!");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('course could not be found');

    res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}...`));
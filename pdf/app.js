const fs = require('fs');
const pdf = require('html-pdf');
// const html = fs.readFileSync('./test/businesscard.html', 'utf8');
const html = "<!DOCTYPE html><html><head>"
    + "<meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'>"
    + "<title>Page Title</title>"
    + "<meta name='viewport' content='width=device-width, initial-scale=1'>"
    + "<link rel='stylesheet' type='text/css' media='screen' href='main.css'> "
    + "<script src='main.js'></script></head><body>"
    + "<h1>Title</h1>"
    + "<p>This is just a paragraph</p>"
    +"<img src='file:///home/kushagra/Pictures/420903.jpg'/>"
    + "</body></html>"

const options = { format: 'Letter' };

pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});
var express = require('express');
var app = express();
var cors = require('cors')
const path = require('path');
const db = require('./config/db')

var port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use('uploads', express.static(path.join(__dirname, './public/uploads')));
app.set('view engine', 'ejs');
app.use(cors());

/**
 * User API
 */
const userRoutes = require('./routes/userRoutes')

app.use('/api/user', userRoutes)


/**
 * Web Routes
 */
app.get('/', (req, res) => {
    res.render("index", {
        title: 'Home page',
    })
})
app.get('/about', (req, res) => {
    res.send("About us")
})
app.get('/contact', (req, res) => {
    res.send("Contact Us ")
})
app.get('/faq', (req, res) => {
    res.send("Asked faqs")
})


app.listen(port, () => {
    console.log('Server is listening...', port);
})
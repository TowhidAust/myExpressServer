const express = require('express');
const { database } = require('./firebase');
const app = express();
const port = 5000;
const cors = require('cors');
var bodyParser = require('body-parser');




let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:8080',
]
// Configuring cross origin resource sharing
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = `The CORS policy for this site does not ' +
                'allow access from the specified Origin. ${allowedOrigins} & ${allowedOrigins.indexOf(origin)}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

var jsonParser = bodyParser.json();

app.use(jsonParser);

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.get('/products', function (req, res) {
    database.ref('/Products').once("value").then((snapshot) => {
        
        res.send(snapshot.val());
    })
});


app.get('/cart', function (req, res) {
    database.ref('/Cart').once("value").then((snapshot) => {
        res.send(snapshot.val());
    });
});

app.post('/addToCart', function (req, res) {
    let data = req.body;
    console.log(data);

        // add this data to the database
        // database.ref('/Cart/chosenProducts').push(data).then((snapshot) => {
        //     database.ref('/Cart').update({quantity: this.state.quantity}).then((snapshot) => {
        //         console.log('added into cart on db');
        //     });
        // });
    
    res.send({"user": "user__"});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express');
const { database } = require('./firebase');
const app = express();
const port = 5000;
const cors = require('cors');
var bodyParser = require('body-parser');



// allow the origins here.
let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:443',

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


// fetch products
app.get('/products', function (req, res) {
    console.log('product fetched');
    database.ref('/Products').once("value").then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val()) {
            res.send(snapshot.val());
        } else { res.send({ 'msg': "undefined" }); }
    }).catch(err => {
        console.log(err.code);
        res.send({ "err": err.code });
    });
});

// fetch cart
app.get('/cart', function (req, res) {
    database.ref('/Cart').once("value").then((snapshot) => {
        if (snapshot.val()) {
            res.send(snapshot.val());
        } else {
            res.send({ msg: "no cart data" });
        }
    }).catch(err => {
        console.log(err.code);
    });
});

// add product to cart
app.post('/addToCart', function (req, res) {
    let data = req.body;
    // add this data to the database
    database.ref('/Cart/chosenProducts').push(data).then((snapshot) => {
        res.send({ "success": "added product into cart database" });
    });
    
});

// after clicking minus button remove that particular data from db
app.post('/removeSingleDataFromCart', function (req, res) {
    let data = req.body;
    // add this data to the database
    database.ref('/Cart/chosenProducts').once("value").then((snapshot) => {
        let chosenProductsJson = snapshot.val();
        for (let key in chosenProductsJson) {
            let productId = chosenProductsJson[key]['_id'];
            if (data.productId === productId) {

                console.log("data.product id", data.productId);
                console.log("data.product id", productId);
                database.ref(`Cart/chosenProducts/${key}`).remove().then((snapshot) => {
                    res.send({ "msg": "removed 1 product from db" });
                });
                return false;
            }
        }
        
    })

});

// add quantity to cart
app.post('/addQuantityToCart', function (req, res) {
    let data = req.body;
    // add this data to the database
    database.ref('/Cart').update(data).then((snapshot) => {
        res.send({ "success": "added quantity into cart database" });
    });

});


// add addTotalAmount to cart
app.post('/addTotalAmount', function (req, res) {
    let data = req.body;
    // add this data to the database
    database.ref('/Cart').update(data).then((snapshot) => {
        res.send({ "success": "added quantity into cart database" });
    });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express');

const app = express();

app.get('/greetings/:userName', (req, res) => {
    res.send(`Hi again, ${req.params.userName}! How are you?`);
});

app.get('/roll/:number', (req, res) => {

    let inputNumber = Number(req.params.number);
 
    if (!isNaN(inputNumber)) {
        let randomNumber = Math.floor(Math.random() * inputNumber);
        res.send(`You rolled a ${randomNumber}`);
    } else {
        res.send('You must specify a number');
    }
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


app.get('/collectibles/:index', (req, res) => {
    if (req.params.index === '0' || req.params.index === '1' || req.params.index === '2') {
        res.send(`You like the ${collectibles[req.params.index].name}?  Do you have $${collectibles[req.params.index].price}?`);
    } else {
        res.send('This item is not yet in stock.  Check back soon!');
    }
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes/', (req, res) => {
    const minPrice = req.query.minPrice;
    // console.log(minPrice);
    const maxPrice = req.query.maxPrice;
    // console.log(maxPrice);
    const type = req.query.type;
    // console.log(type);
    let reqShoes = [];

        if (minPrice === undefined && maxPrice === undefined && type === undefined) {
            
            res.send(shoes);
        

    } else if (minPrice === undefined && maxPrice === undefined && type !== undefined) {
        console.log(type);
        for (let i = 0; i<shoes.length; i++) {
            
            if (shoes[i].type === type) {
                reqShoes.push(shoes[i])
            }
        }

    } else if (minPrice === undefined && maxPrice !== undefined && type === undefined) {
      
        for (let i = 0; i<shoes.length; i++) {
            
            if (Number(shoes[i].price) <= Number(maxPrice)) {
                reqShoes.push(shoes[i])
            }
        }
    } else if (minPrice !== undefined && maxPrice === undefined && type === undefined) {
      
        for (let i = 0; i<shoes.length; i++) {
            
            if (Number(shoes[i].price) >= Number(minPrice)) {
                reqShoes.push(shoes[i])
            }
        }
    } else if (minPrice === undefined && maxPrice !== undefined && type !== undefined) {
           
        for (let i=0; i<shoes.length; i++) {
            
            if (shoes[i].type === type && Number(shoes[i].price) <= Number(maxPrice)) {
                reqShoes.push(shoes[i]);
            }
        }
    } else if (minPrice !== undefined && maxPrice !== undefined && type === undefined) {
           
        for (let i=0; i<shoes.length; i++) {
            
            if (Number(shoes[i].price) >= Number(minPrice) && Number(shoes[i].price) <= Number(maxPrice)) {
                reqShoes.push(shoes[i]);
            }
        }
    } else if (minPrice !== undefined && maxPrice === undefined && type !== undefined) {
           
        for (let i=0; i<shoes.length; i++) {
            
            if (shoes[i].type === type && Number(shoes[i].price) >= Number(minPrice)) {
                reqShoes.push(shoes[i]);
            }
        }
    } else if (minPrice !== undefined && maxPrice !== undefined && type !== undefined) {

        for (let i=0; i<shoes.length; i++) {
            
            if (shoes[i].type === type && Number(shoes[i].price) <= Number(maxPrice) && Number(shoes[i].price) >= Number(minPrice)) {
                reqShoes.push(shoes[i]);
            }
        }
    }
    res.send(reqShoes);
    console.log(reqShoes);
});

app.listen(3000, () => {
    console.log('Listening');
});
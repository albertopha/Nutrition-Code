const request = require('request');
const router = require('express').Router();
const allFoods = require('../../script/food.json');

module.exports = router

//GET /api/foods/https://api.edamam.com/search?  (External Source)
router.get('/', (req, res, next) => {
    request({
        uri: 'https://api.edamam.com/search?',
        qs: {
            app_id:  '9baccd9b',
            app_key: '574ef5679d667541757227facbd2d56d',
            q: 'chicken',
            from: 0,
            to: 3 
        }
    },
    function(error, response, body){
        if(!error && response.statusCode === 200) {
            // console.log(body);
            res.json(JSON.parse(body).hits[0].recipe);
        } else {
            res.json(error)
        }
    })
});

//GET /api/foods/upcfood (Local file)
router.get('/upcfood', (req, res, next) => {
    res.send(allFoods);
});

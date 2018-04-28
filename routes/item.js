var express = require('express');
var router = express.Router();


var arrayData = [{name: "pandhu", usia: 27}, {name: "argan", usia: 22}, {name: "afris", usia: 25}]

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('item', {title: 'Express'});
});


router.post('/', function (req, res, next) {
    var query = req.query; // ngambil dari param
    var body = req.body;
    res.json(body);
});

router.get('/list', function (req, res, next) {
    handleAsync().then(function (data) {
        res.json(data);
    })
});

router.get('/async-await', function (req, res, next) {
    getAsync().then(function (data) {
        res.json(data);
    })
});

router.put('/', function (req, res, next) {
    res.render('item', {title: 'Express'});
});


function handleAsync() { // handle async
    var filter = [];
    arrayData.forEach(function (user) {
        filter.push(new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(user)
            }, 2000)
        }));
    });
    return Promise.all(filter);
}


async function getAsync() {
    var asyn1 = await timeAsync(1);

    return asyn1;
}

function timeAsync(number) {
    var next  = 100;
    return new Promise(function (res,rej) {
        setTimeout(function () {
            res(number + next + 100);
        }, 2000)
    })/*
    var next = 0;
    setTimeout(function () {
        next = 100;
        console.info(number + next);
        return number + next;
    }, 2000)*/
   // return number + next;
}


function promiseA() {
    return new Promise(function (res, rej) {
        res(1);
    })
}

module.exports = router;
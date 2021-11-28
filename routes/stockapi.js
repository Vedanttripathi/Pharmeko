const express = require('express');
const Stock = require('../models/stock');
const router = express.Router();

router.get('/allstock', (req, res) => {
    Stock.find({}).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(404).send(err);
    });
});

router.post('/addstocks', (req, res) => {
    Stock.findOneAndUpdate({medicine: req.body.medicine}, {$inc: {qty: req.body.qty}}, {new: true}).then((result) => {
        res.send("saved");
    }).catch(err => {
        res.send(err);
    });

    const stock = new Stock(req.body);

        stock.save().then(() => res.send("Saved")).catch((err) => {
            res.send(err);
        });
});

router.get('/dashboard_details', (req, res) => {
    let profit = 0.0;
    let cost = 0.0;
    let about_to_expire = [];
    let falling_short = [];

    // To find total profit and cost 

    Stock.find({}).then((response) => {
        response.forEach((items) => {
            profit = profit + items.profitqty;
            cost = cost + (items.costprice * items.qty);
        });

        // To find items about to expire

        response.map((items) => {
            let present_date = new Date();
            let expiry_date = new Date(items.dateofexpiry);

            let res = expiry_date.getTime() - present_date.getTime();
            let days = res.toFixed(0);

            if (days < 32) {
                about_to_expire.push(items)
            }
        });

        // To find items in less quantity


        response.map((items) => {
            switch(items.unit) {
                case 'Tab' : if (items.qty < 21) {
                                falling_short.push(items);
                            }
                            break;
    
                case 'Ampule' : if (items.qty < 6) {
                                falling_short.push(items);
                                }
                                break;
                
                case 'Bottles' : if (items.qty < 6) {
                                 falling_short.push(items);
                                }
                                break;
            }
        });

        res.send({
            profit : profit,
            cost : cost,
            nearexpiry : about_to_expire,
            falling_short : falling_short
        });
    }).catch((err) => {
        res.send(err);
    })
});


router.post('/update', (req, res) => {
    req.body.billed.forEach((item) => {
        Stock.findOneAndUpdate({medicine: item.medicine}, {$set:{qty: item.leftStock}}, {new: true}).then(() => {
            // DO something here
        }).catch((err) => {
            res.send(err);
        });
    });
    res.send("Successful");
    
});

router.post('/delete', (req, res) => {
    Stock.findOneAndDelete({medicine: req.body.medicine}).then(() => {
        res.status(200).send('Successfully removed');
    }).catch((err) => {
        res.status(500).send('Failed to remove item')
    });
});

// router.get('/totalcost', (req, res) => {
//     let cost = 0.0;
//     Stock.find({}).then((response) => {
//         response.forEach((items) => {
//             cost = cost + items.costprice;
//         })
//         res.send({cost : cost});
//     }).catch((err) => {
//         res.send(err);
//     })
// });


// router.get('/abouttoexpire', (req, res) => {
//     let about_to_expire = [];
//     Stock.find({}).then((response) => {
//         response.map((items) => {
//             let present_date = new Date();
//             let expiry_date = new Date(items.dateofexpiry);

//             let res = expiry_date.getTime() - present_date.getTime();
//             let days = res.toFixed(0);

//             if (days < 32) {
//                 about_to_expire.push(items)
//             }
//         })
//         res.send({nearexpiry : about_to_expire});
//     }).catch((err) => {
//         res.send(err);
//     })
// });

module.exports = router;


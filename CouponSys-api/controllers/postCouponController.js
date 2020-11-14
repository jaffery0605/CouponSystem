const express=require('express');

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectID

var { PostCoupons } = require("../models/postCoupon");


router.get('/',(req,res)=>{
    PostCoupons.find((err,docs)=>{
        if(!err) res.send(docs)
        else console.log("error while retrieving all records:"+JSON.stringify(err,undefined,2))
    })
})



router.post('/',(req,res)=>{
    var newRec=new PostCoupons({
        name:req.body.name,
        code:req.body.code,
        cat:req.body.cat,
        cost:req.body.cost,
        numof:req.body.numof,
        fromdate:req.body.fromdate,
        todate:req.body.todate,
    });

    newRec.save((err,docs)=>{
        if(!err) res.send(docs)
        // if(err.code===11000){
        // throw 'code already exist'
        // }
        else {
                console.log("error while creating db"+JSON.stringify(err,undefined,2))
                res.send(err)
        }
    })
})


router.put('/:id',(req,res)=>{
    if(!checkForHexRegExp.test(req.params.id))
    return res.status(400).send('No record with given Id:' + req.params.id)
    var updateRecord={
        name:req.body.name,
        code:req.body.code,
        cat:req.body.cat,
        cost:req.body.cost,
        numof:req.body.numof,
        fromdate:req.body.fromdate,
        todate:req.body.todate,
    }
    PostCoupons.findByIdAndUpdate(req.params.id,{$set:updateRecord},{new:true},(err,docs)=>{
        if(!err) res.send(docs)
        else{ console.log("error while updating record"+JSON.stringify(err,undefined,2))
        res.send(err)
    }
    })
})

router.delete('/:id',(req,res)=>{
    if(!checkForHexRegExp.test(req.params.id))
    return res.status(400).send('No record with given Id:' + req.params.id)

    PostCoupons.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err) res.send(docs)
        else console.log("error while error while deleting a record"+JSON.stringify(err,undefined,2))
    })
})

module.exports = router
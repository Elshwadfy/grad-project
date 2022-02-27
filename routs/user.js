const express= require("express");
const router=express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require("../model/products");
const { hash } = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/signup",(req, res, next) =>{
    User.find({ gmail: req.body.gmail})
    .exec()
    .then(user=>{
        if(user.length>=1){
        return res.status(409).json({
            massage: 'gmail exists'
        });
    } else {
        bcrypt.hash(req.body.password,10, (err,hash) => {
            if(err){
                return res.status(500).json({
                    error:err
                });
            } else {
            const user = new User({
            _id:new mongoose.Types.ObjectId(),
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            gmail: req.body.gmail,
            gender: req.body.gender,
            age: req.body.age,
            password: hash
    
        });
        user.save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                massege:"User Created"
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
               error: err
            });
    
        });
    }
        
    });
}
    });

});

router.post('/login',(req, res, next)=>{

    User.find({gmail: req.body.gmail})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(404).json({
                message:'mail not found user doesnt exist'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err, result)=>{
           if (err){
               return res.status(401).json({
                   massage:'AUTH FAILED'
               });
           }
           if(result){
             const token = jwt.sign({
                   gmail: user[0].gmail,
                   userId: user[0]._id
               }, process.env.JWT_KEY,
               {
                   expiresIn: "1h"
               }
               );
             return res.status(200).json({
                 massage:'Auth successful',
                 token: token
             });
           }
        });
    }) 
    .catch(err =>{
        crossOriginIsolated.log(err);
        res.status(500).json({
            error:err
        });
    });
    })


router.delete('/:userId',(req, res, next)=>{
User.remove({_id: req.params.id})
.exec()
.then(
    res =>{
        res.status(200).json({
        message: "User deleted"
        });
    })
.catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
});
});
module.exports = router;
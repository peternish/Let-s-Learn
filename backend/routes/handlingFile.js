var express = require('express');
const router=require('express').Router();
    var app = express()
    var con= require('./../dbconnection');
    module.exports.handleFile = async function(req,res,next){
        console.log(req.body)
    }
     // module.exports=router;
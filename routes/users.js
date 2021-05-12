
const conn = require('../config/db');
const fs = require('fs');
const express = require('express');

const router = express.Router();





router.post('/login', (req, res) => {

    res.send(req.body);

    

    // const { error } = validateCommentInput(req.body);
    // if(error){
    //     res.status(404).json({
    //         success: false,
    //         status: 404,
    //         message: error.message
    //     });
    //     return;
    // }

    // Blog.find({ _id: req.body.id})
    // .select({commentCount: 1})
    // .then(result => {

    //     let currentCount = result[0].commentCount;
    //     currentCount = currentCount + 1;

    //     Blog.updateOne({ _id: req.body.id }, {
    //         $set: {
    //             commentCount: currentCount
    //         }
    //     })
    //     .then(result => {
    //         pushComment();
    //     }, err => {

    //     })

      
    //     async function pushComment(){
    //         const comment = Comment({
    //             topicID: req.body.id,
    //             name: req.body.name,
    //             comment: req.body.comment
    //         });

    //         comment.save()
    //         .then(result => {
    //             res.status(200).json({
    //                 success: true,
    //                 status: 200,
    //                 data: result
    //             });
    //         }, err => {
    //             res.status(500).json({
    //                 success: false,
    //                 status: 500,
    //                 message: err
    //             });
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 success: false,
    //                 status: 500,
    //                 message: err
    //             });
    //         })

    //     }

    // }, err => {
    //     res.status(404).json({
    //         success: false,
    //         status: 404,
    //         message: error.message
    //     });
    // });

});






module.exports = router;
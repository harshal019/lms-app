const express=require('express');

const router=express.Router();
const authMiddleware=require("../middlewares/authMidddleware");
const isLibrarian=require("../helper");
const Book=require("../models/Book");
const isLibrarian = require('../helper');

router.get("/",authMiddleware,async(req,res)=>{
    try {
        const books=await Book.find({});

        res.status(200).json(books);

    } catch (error) {
        res.status(400).json({
            error:error.message,
            message:"Something while wrong fecting book data"
        });  
    }
});


router.get("/:id",authMiddleware,async(req,res)=>{
    try {
        const book=await  Book.findById(req.params.id);
        if(!book){
            res.status(400).json({
                message:"Invalid book id"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(400).json({
            error:error.message,
            message:"Something while wrong fecting book data"
        });  
    }
});


router.post("/",authMiddleware,async(req,res)=>{
        try {
            
            if(isLibrarian(req.user.userId)){
                const book=await Book(req.body);
                await book.save();

            }
            else{

            }

        } catch (error) {
            
        }
})

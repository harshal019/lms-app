const mongoose = require("mongoose");


const issueBookSchema=new mongoose.Schema({
    studentId:{
        type:'String',
        require:true
    },
    studentName:{
        type:'String',
        require:true,
    },
    bookId:{
        type:'String',
        require:true
    },
    issueDate:{
        type:Date,
        require:true
    },
    returnDate:{
        type:Date,
        require:true
    },
    status:{
        type:'String',
        enum:['Librarian','Student']
    }
})

module.exports= mongoose.model("IssueBook",issueBookSchema);
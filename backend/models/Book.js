const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({

title:String,

author:String,

category:String,

pdfUrl:String,

coverImage:String,

label:{
type:String,
default:'Trending'
}

});

module.exports=
mongoose.model(
'Book',
bookSchema
);
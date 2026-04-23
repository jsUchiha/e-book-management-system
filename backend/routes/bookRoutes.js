const router=require('express').Router();

const Book=require('../models/Book');

const multer=require('multer');

const {auth,admin}=require('../middleware/auth');



const storage=multer.diskStorage({

destination:'uploads/',

filename:(req,file,cb)=>{

cb(
null,
Date.now()+
'-'+
file.originalname
);

}

});


const upload=multer({
storage
});

router.get('/public',async(req,res)=>{
res.send(await Book.find());
});

// users view books
router.get(
'/',
auth,
async(req,res)=>{

res.send(
await Book.find()
);

}
);



// admin add book with files
router.post(
'/add',
auth,
admin,

upload.fields([
{name:'pdf'},
{name:'cover'}
]),

async(req,res)=>{

const pdf=
req.files.pdf[0].filename;

const cover=
req.files.cover[0].filename;


await Book.create({

title:req.body.title,

author:req.body.author,

category:req.body.category,

pdfUrl:pdf,

coverImage:cover

});


res.send('Book Added');

}
);




// update
router.put(
'/:id',
auth,
admin,
async(req,res)=>{

await Book.findByIdAndUpdate(
req.params.id,
req.body
);

res.send('Updated');

}
);




// delete
router.delete(
'/:id',
auth,
admin,
async(req,res)=>{

await Book.findByIdAndDelete(
req.params.id
);

res.send('Deleted');

}
);


module.exports=router;
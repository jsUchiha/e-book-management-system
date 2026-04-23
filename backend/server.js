const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

app.use(cors());

app.use(express.json());

app.use(
'/uploads',
express.static('uploads')
);


app.get(
'/download/:file',
(req,res)=>{

res.download(
'uploads/'+req.params.file
);

}
);


mongoose.connect(
'mongodb://127.0.0.1:27017/ebook'
);

app.use(
'/auth',
require('./routes/authRoutes')
);

app.use(
'/books',
require('./routes/bookRoutes')
);

app.use(
'/admin',
require('./routes/adminRoutes')
);


app.listen(5000,()=>{

console.log(
'Server running on 5000'
);

});
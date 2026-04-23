const router=require('express').Router();

const User=require('../models/User');

const bcrypt=require('bcryptjs');

const jwt=require('jsonwebtoken');



router.post('/register',async(req,res)=>{

try{

const hashed=await bcrypt.hash(
req.body.password,
10
);

await User.create({

name:req.body.name,

email:req.body.email,

password:hashed,

role:'user'

});

res.json({
message:'Registered'
});

}

catch(e){

if(e.code===11000){

return res.json({
message:'Email already exists'
});

}

res.status(500).json({
message:'Registration error'
});

}

});




router.post('/login',async(req,res)=>{

const user=await User.findOne({

email:req.body.email

});


if(!user){

return res.json({

message:'User not found'

});

}



if(user.blocked){

return res.json({

message:'User blocked'

});

}



const ok=await bcrypt.compare(

req.body.password,

user.password

);



if(!ok){

return res.json({

message:'Wrong password'

});

}



const token=jwt.sign(

{

id:user._id,

role:user.role

},

'secret'

);



res.json({

token,

user

});



});



module.exports=router;
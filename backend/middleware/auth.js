const jwt=require('jsonwebtoken');

exports.auth=(req,res,next)=>{
const token=req.header('Authorization');
if(!token) return res.send('No token');
req.user=jwt.verify(token,'secret');
next();
}

exports.admin=(req,res,next)=>{
if(req.user.role!=='admin')
 return res.send('Admin only');
next();
}
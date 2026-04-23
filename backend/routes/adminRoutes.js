const router=require('express').Router();
const User=require('../models/User');
const {auth,admin}=require('../middleware/auth');

// view users
router.get('/users',auth,admin,
async(req,res)=>{
res.send(await User.find());
});

// block user
router.put('/block/:id',auth,admin,
async(req,res)=>{
await User.findByIdAndUpdate(
req.params.id,
{blocked:true}
);
res.send('Blocked');
});

// unblock user
router.put(
'/unblock/:id',
auth,
admin,
async(req,res)=>{

await User.findByIdAndUpdate(
req.params.id,
{blocked:false}
);

res.send('Unblocked');

});

// delete user
router.delete('/users/:id',auth,admin,
async(req,res)=>{
await User.findByIdAndDelete(
req.params.id
);
res.send('Deleted');
});

module.exports=router;
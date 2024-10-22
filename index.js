const express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;
 



app.use(express.json());
let secretKey="1234";
 let useredata=[
    {
        id: 1,
        email: 'zubair123@gmail.com',
        password: '123',
        name: 'Zubair',
        post: [
            {id:1, content: 'Zubair first post', likes: 0,  comments: [{ userid: 1, text: "All is good" }]},
            {id:2,  content: 'Zubair second post', likes: 0,  comments: [{ userid: 1, text: "All is good" }] },
            {id:3,  content: 'Zubair first post', likes: 0,  comments: [{ userid: 1, text: "All is good" }]},
            {id:4,  content: 'Zubair second post', likes: 0,  comments: [{ userid: 1, text: "All is good" }]}
        ]
    },
    {
        id: 2,
        email: 'ahmed456@gmail.com',
        password: '456',
        name: 'Ahmed',
        post: [
            {id:1, content: 'Ahmed first post', likes: 3,  comments: [{ userid: 1, text: "All is good" }] },
            { id:2,content: 'Ahmed second post', likes: 5,  comments: [{ userid: 1, text: "All is good" }] }
        ]
    },
    {
        id: 3,
        email: 'saad789@gmail.com',
        password: '789',
        name: 'Saad',
        post: [
            {id:1, content: 'Saad first post', likes: 2,  comments: [{ userid: 1, text: "All is good" }] },
            { id:2,content: 'Saad second post', likes: 4,  comments: [{ userid: 1, text: "All is good" }] }
        ]
    }
]; 








 app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    const userlogin=useredata.find((data)=>data.email===email && data.password===password);
    //  console.log(userlogin);
    if(userlogin){
        var token = jwt.sign({email:userlogin.email,id:userlogin.id},secretKey);
        console.log("Login successful")
         
        res.status(200).json({ message: "Login successful", userlogin,token});
    }else{
        console.log("Login failed");
        res.status(401).json({ message: "Invalid email or password" });
    }
 },

);

// midlewirw
 
function authenticate(req,res,next){
    let token = req.headers.token;
    if(!token){
      return res.status(401).json({
        message:"Not logged In."
      })
    }
    var decoded = jwt.verify(token, secretKey);
    req.user=decoded;
    next();
  }



app.get('/islogin',authenticate,(req,res)=>{
    res.status(200).json({ message: "Login successful"});
});

// post for user logedin

app.get('/user/post',authenticate,(req,res)=>{
 const user= useredata.find((data)=>data.email===req.user.email)
if(user)
{
    res.status(200).json({post:user.post});
}else{
    req.status(404).json({message:"User data not found!"})
}

})
// post of other user
app.get('/all-post',authenticate,(req,res)=>{
    const emailToRemove = req.user.email;
    const updatedUserData = useredata.filter(user => user.email !== emailToRemove);
    res.status(200).json({post:updatedUserData});
 
});
// comments

 
  


 
     
 


 
 












app.listen(PORT, () => {
    console.log(`My server in running on ${PORT}`)
})

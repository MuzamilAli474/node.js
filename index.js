const express = require('express');
const app = express();
const PORT = 3200;

app.use(express.json());
 let useredata=[
    { "id": 2, "name": "Ali Khan", "email": "alikhan@gmail.com", "password": "password123" },
    { "id": 3, "name": "Sara Ahmed", "email": "saraahmed@gmail.com", "password": "qwerty123" },
    { "id": 4, "name": "John Doe", "email": "johndoe@gmail.com", "password": "johndoe123" },
    { "id": 5, "name": "Fatima Noor", "email": "fatimanoor@gmail.com", "password": "abcd1234" },
    { "id": 6, "name": "Khan Shah", "email": "khanshah@gmail.com", "password": "12345abc" },
    { "id": 7, "name": "Ayesha Malik", "email": "ayeshamalik@gmail.com", "password": "mypassword" },
    { "id": 8, "name": "Omar Farooq", "email": "omarfarooq@gmail.com", "password": "passw0rd" },
    { "id": 9, "name": "Nadia Hussain", "email": "nadiahussain@gmail.com", "password": "letmein123" },
    { "id": 10, "name": "Tariq Javed", "email": "tariqjaved@gmail.com", "password": "welcome2023" },
    { "id": 11, "name": "Zainab Rizvi", "email": "zainabrizvi@gmail.com", "password": "123456abc" }
]
 app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    const userlogin=useredata.find((data)=>data.email===email && data.password===password);
    if(userlogin){
        console.log("Login successful")
        res.status(200).json({ message: "Login successful", userlogin });
    }else{
        console.log("Login failed");
        res.status(401).json({ message: "Invalid email or password" });
    }
 }
);






 



app.listen(PORT, () => {
    console.log(`My server in running on ${PORT}`)
})

﻿# Your-E-commence-Store

 ## Pre Requisite
 
   node version: 20 and above  https://nodejs.org/en
   
   MongoDB URL : create your own at https://www.mongodb.com/
   
   PayPal account : create your own at https://developer.paypal.com/ 
   
##  ENV   
rename the env.example file to env & add in your MongoURL , Jwt_Secret & PayPAl_client id 
```
PORT=5000
NODE_ENV = production
MONGO_URI=
JWT_SECRET = ""
PAYPAL_CLIENT_ID = ''
```

## Installation  

Git clone the repo 
```
git clone https://github.com/xiangfengg/Your-E-commence-Store.git.

npm install
 
cd frontend

npm install
```
Run both frontend & backend 
```
npm run dev
```

Run frontend only
```
npm run client 
```


backend 
```
npm start
```


## Seed Database 
+ importing data 
```npm run data:import```
- deleting data
```npm run data:destroy```

## User Login 

```
admin@email.com (Admin)
123456

john@email.com (Customer)
123456

jane@email.com (Customer)
123456```

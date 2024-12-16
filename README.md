Project runs on PORT 4000

TO start project, follow below commands

1. copy paste the .env file in root folder
2. npm install using node 20.17.0
3. npm start

CRUD apis

1. Get user by id - /auth/getuserbyid/:id - GET
id ex - 675c219fd018db35b3fb1f1b - mongoid
curl --location 'http://localhost:4000/auth/getuserbyid/675c219fd018db35b3fb1f1b'


2. Create User - /auth/createuser - POST
body ex : { "name": "ashish","email":"fa3@gmail.com","password":"hello"} - all fields are mandatory
curl --location 'http://localhost:4000/auth/createuser' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "ashish",
    "email":"fa3@gmail.com",
    "password":"hello"
}'


3. Update user - /auth/updateUserById/:id - PATCH
id ex - 675c219fd018db35b3fb1f1b - mongoid
body ex : { "name": "ashish1", "email":"fa3@gmail.com", "password":"hello"} - all fields are optional
curl --location --request PATCH 'http://localhost:4000/auth/updateUserById/675c219fd018db35b3fb1f1b' \
--header 'Content-Type: application/json' \
--data '{
    "a":"ashish"
}'



4. Get all users - /auth/getallusers - GET
curl --location 'http://localhost:4000/auth/getallusers'


5. Delete user by id - /auth/deleteUserById/:id - DELETE
id ex - 675c219fd018db35b3fb1f1b - mongoid
curl --location --request DELETE 'http://localhost:4000/auth/deleteUserById/675c6f061e98fceb8df17f50'

6. login user - /auth/login - POST
body login - { "email":"fa3@gmail.com", "password":"hello" }
curl --location 'http://localhost:4000/auth/login' \
--data-raw '{
    "email":"fa3@gmail.com",
    "password":"hello"
}'


Libraries used
1. JWT for authentication and autherization token 
2. Bcrypt for password hashing 
3. mongoose for ORM 
4. class-validator, class-transformer for DTO's 

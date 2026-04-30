- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before startting application on 7777.
- Create a userSchema & user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try-catch block.

# ep07 === Diving deep into the api's.

- JS object vs JSON (difference)
- Add the express.json() middleware to your app
- Make your signup API dynamic to receive data from the end user.
- User.findOne with duplicate emailId,which object it will return.
- API - Get user by email
- API - Feed API - GET/feed - get all users from the database
- API - Get user by ID - findById().
- Create a delete user API
- Difference Between PATCH and PUT request
- API - Update a user
- Explore the Mongoose Documentation (specifically Model)
- What are options in a Model.findOneAndUpdate method, explore more about it.
- API === Update the user with email ID

# ep08 === Data Sanitization And Schema Validations

- Explore schematype options from the documentation.
- add required, unique, lowercase, min, minLength, trim
- Add default value
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validations on each field in Schema.
- Add time stamps to the userSchema.
- Add API level validation on Patch request and signup post api
- DATA Sanitization === Add API validation for each field
- Install validator package
- Explore the Validator functions/npm validator documentation and use validator functions for password, email and photo url
- NEVER TRUST req.body

# ep09 === Encrypting Password

- validate data in signup API
- Install bcrypt package
- Create a passwordHash using bcrypt.hash and save the user with encrypted password
- Create Login API
- Compare passwords and throw errors if email or password is invalid
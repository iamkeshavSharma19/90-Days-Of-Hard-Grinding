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

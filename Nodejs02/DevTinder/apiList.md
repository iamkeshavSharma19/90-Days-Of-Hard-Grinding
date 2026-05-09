# DevTinder APIs

## authRouter
 - POST /signup
 - POST /login
 - POST /logout


## profileRouter
 - GET /profile/view
 - PATCH /profile/edit
 - PATCH /profile/password === forgot password.


## /connectionRequestRouter
 - POST /request/send/status/:userId === The status can be either ignored or interested.
 

 - POST /request/review/accepted/:requestId
 - POST /request/review/rejected/:requestId

## userRouter
 - GET /user/connections
 - GET /user/requests/received
 - GET /user/feed - Gets you the profiles of other users on the platform.

Status: ignore, interested, accepted, rejected.

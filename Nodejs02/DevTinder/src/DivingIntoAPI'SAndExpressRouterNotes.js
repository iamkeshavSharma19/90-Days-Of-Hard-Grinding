//&Go to tinder.com website,open the network tab, so whenever I will left swipe or right swipe, filter === Fetch/XHR, there will be an api call which will be made.Let us see what is that api call.If I right you will see the api call which happened under the network tab.this api is === "https://api.gotinder.com/like/69f9c5d8b716250cf97d79da?locale=en-GB".It is like api.Whenever you are right swipping somebody,whenever you are interested,they call it as a like api.


//~So If I left swipe,this api is called Pass Api === "https://api.gotinder.com/pass/67601e79cea0a7cb423a469b?locale=en-GB"

//~If somebody is interested,then the other person can now accept the request,or a connection request can also have a rejected state.interested means that the sender is interested in the receiver's profile.Ignored means that the user ignored the profile.

//?If I right swipe, we will call it as interested api and if we left swipe,we will call it as ignore api.


//^In the networks tab search for the core api,this core api's brings you these profiles.All these profiles that you see on the home page,these are brought to you by core api.This core api is like getting you the 28 users.I have got 28 users.Some people think that when i left or right swipe,these profiles are coming one by one.If I left swipe,then a api call is made to fetch the next profile.No, there is one more api call,which is giving you the 30 profiles.As in when you left swipe or right swipe,the next user is coming up.In the core api you can basically also see a _id.I am 90% sure that Tinder would also be using mongoDB as the database.


//*Tinder basically makes a core api call,and then get you all the users,this is basically the feed api.
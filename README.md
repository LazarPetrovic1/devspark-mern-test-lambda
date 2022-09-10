The structure of the application used by Lambda requires an index.js file with an `exports.handler` function which is passed an event object (containing among other things the **HTTP Method** and **URL PATH**).

Since this is a relatively rudimentary application, I figured out that using a `switch` statement to check for which `service` method to execute would work just fine here.

I have decided to log the user in automatically after registering them, as this is a far better user experience and all major websites use it.

When a user is logged in, a token is generated, and both the `token` and the `user` object are sent to the client-side, where they will later be handled by `sessionStorage`.

Every time a page is `reset/reloaded`, the token will be checked/verified. If it has expired, the session will be terminated and the user kicked out. The token expires in 1 hour after it was generated.

The `User` model has 2 `unique` properties and can use either one of them to log in (`email` and `username`).
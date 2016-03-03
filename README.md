# Credera Cup Example Node Client

An example client for the [Credera Cup](http://www.crederacup.com) written in Node.

You must have a Credera Cup token before playing the game. Go to www.crederacup.com and sign up
for an account to receive a token.
    
To run the client, create a file called `.env` with a single environment variable `CREDERA_AUTH_TOKEN`
containing the value of your Credera Cup token.

The only required parameter is the URL for the websocket to connect to.

    node index.js play.crederacup.com/begin/race/1


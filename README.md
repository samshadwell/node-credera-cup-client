# Credera Cup Example Node Client

An example client for the [Credera Cup](http://www.crederacup.com) written in Node.

You must have a Credera Cup token before playing the game. Go to www.crederacup.com and sign up
for an account to receive a token.
    
To run the client, create a file called `.env` with a single environment variable `CREDERA_AUTH_TOKEN`
containing the value of your Credera Cup token.

The client takes only one parameter: the url of the game server. In this case, this should always be play.crederacup.com

    node index.js play.crederacup.com


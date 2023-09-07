This app uses the OpenID Connect process to verify the identity of a person.

# Web App component:
Uses effects do the following after rendering the App component:

0. Parse the query string for an email.
1. The web app tries to authenticate with the JWT stored in localStorage
2. Set a logout listener to reset all all local state (which will then show the login screen)
3. When authenticated event is published set login, email, and given name state.
4. render one of the following components.

```javascript

if ((login === null) && (email !== undefined) && (email !== null)) {
    return <Enter email={email} given_name={given_name} />;
  } else if (login) {
    return <Chat messages={messages} users={users} />;
  }  else {
    return <Enter email={null} />;
  }

```

Notes: no email parameter is in the query string when the user browses to the app so the Enter component is rendered with a null email property.

# Web Enter component:
This component takes the email and given_name parameters. It has an error state but does not have any effects.
It does the following:

```javascript

If email is null then
    render the signin button which is an href to http://localhost:3030/auth. 
If given_name is null then
    render the login button. this button calls the enter function.  The enter function call feathers authenticate function using the local strategy.
If given_name is not null then
    render the login as name button. The enter function call feathers authenticate function using the local strategy.

if email is null then the signout button is set to an empty string.
else the signout button is rendered and is an href to http://localhost:3030/signout

#Sign In process

1. the signin button is an href to http://localhost:3030/auth

# Feathers API routes:
1. http://localhost:3030/auth
This sends a redirect to microsoft's oath server with state=1111.
`https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Fauth-callback&response_mode=query&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info&state=${state}`,
If user authenticates then the feathers auth-callback route will be called with state and code.
Feathers will post to https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/oauth2/v2.0/token
with a query string containing client id, api URI, and the feathers http://localhost:3030/auth-callback redirect URI.
When microsoft oath server is done the axios.post function will return where it left off and a content-type header is created. 
Then jwt token is decoded from the response data. The jwt contains info such as: email,name, and groups.


https://github.com/simov/grant
https://grant.outofindex.com/
```
References:
**[OpenID Connect](https://openid.net/developers/how-connect-works/)**
https://jwt.io/introduction
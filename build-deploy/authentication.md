# next 
Can we logout and login with a different account?
Can we use http://localhost for a call back when this is deployed to k8s

# summary
Used the Microsoft developer account to test.
Was able to return an email address but not a security group using an auth0 saml connection and the AzureViaSaml enterprise application.

# the microsoft account used
https://developer.microsoft.com/
main account: brentgroves@1hkt5t.onmicrosoft.com
AlexW@1hkt5t.onmicrosoft.com
EAxejwisiakJip3
domain:1hkt5t.onmicrosoft.com
# the auth0 account used
brent.groves@gmail.com
Could only get the email to return using an Auth0 SAML account.
SAML connection: urn:auth0:dev-gfcd1ld5m2jtz0m0.us.auth0.com:AzureViaSaml
urn:auth0:dev-gfcd1ld5m2jtz0m0:AzureViaSaml
https://dev-gfcd1ld5m2jtz0m0.us.auth0.com/login/callback?connection=AzureViaSaml
https://login.microsoftonline.com/5269b021-533e-4702-b9d9-72acbc852c97/saml2
urn:auth0:dev-gfcd1ld5m2jtz0m0.us.auth0.com:AzureViaSaml
the config/default.json file contains the Auth0 connection info.

https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Foauth%2Fmicrosoft%2Fcallback&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info

https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
client_id=29fa39d4-de57-4009-a46a-c561fa048562&response_type=id_token
&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Foauth%2Fmicrosoft%2Fcallback
&response_mode=form_post
&scope=openid
&state=12345
&nonce=678910

"AADSTS700025: Client is public so neither 'client_assertion' nor 'client_secret' should be presented.\r\nTrace ID: 56061eb5-5df1-4f61-9d60-0e2947a50200\r\nCorrelation ID: e70c53c0-11d3-4ee2-91a1-bd57e307e936\r\nTimestamp: 2023-09-08 18:24:44Z"

https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=1da83025-d512-4625-bb74-4a1299952236&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3030%2Foauth%2Fmicrosoft%2Fcallback&scope=api%3A%2F%2F29fa39d4-de57-4009-a46a-c561fa048562%2FUser.Info

Request Id: 8a6da348-5f1e-4ab2-b9f1-fe36f4850400
Correlation Id: 0c3c0e54-f9c5-4e8f-9602-7ac9fe553950
Timestamp: 2023-09-08T18:16:19Z
Message: AADSTS700016: Application with identifier '1da83025-d512-4625-bb74-4a1299952236' was not found in the directory 'MSFT'. This can happen if the application has not been installed by the administrator of the tenant or consented to by any user in the tenant. You may have sent your authentication request to the wrong tenant.
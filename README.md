# WELCOME

## Groepsleden

- Lander Van Molle [@LanderVM](https://github.com/LanderVM)
- Sander Geuens [@SanderGeuens](https://github.com/SanderGeuens)
- Thomas Lissens [@ThomasLissens](https://github.com/ThomasLissens)
- Maurice Cantaert [@Skerath](https://github.com/Skerath)
- Kilian Ostijn [@Kilian3005](https://github.com/Kilian3005)

## Opstarten

Om de API te starten maak je een `.env` bestand aan met volgende gegevens, vervang de gegevens tussen `* *` met de correcte data:

```
NODE_ENV=*development/production*

DATABASE_USERNAME_LOCAL=*local_username*
DATABASE_PASSWORD_LOCAL=*local_password*

DATABASE_USERNAME_HOST=*host_username*
DATABASE_PASSWORD_HOST=*host_password*

AUTH_JWKS_URI=*tenant*/.well-known/jwks.json
AUTH_AUDIENCE=*API_ID*
AUTH_ISSUER=*tenant*
AUTH_USER_INFO=*tenant*/userinfo
```

Voor de testen moet er een `.env.test` bestand worden gemaakt, vervang de gegevens tussen `* *` met de correcte data:

```
NODE_ENV=test

DATABASE_USERNAME_LOCAL=*local_username*
DATABASE_PASSWORD_LOCAL=*local_password*

DATABASE_USERNAME_HOST=*host_username*
DATABASE_PASSWORD_HOST=*host_password*

AUTH_TEST_USER_USER_ID=123
AUTH_TEST_USER_USERNAME=test@mail.com
AUTH_TEST_USER_PASSWORD=test123456789?
AUTH_TOKEN_URL=https://delaware-aalstg01.eu.auth0.com/oauth/token
AUTH_CLIENT_ID=IXt0mwHRaRUlvss3jdajEM8IM4z6gdmB
AUTH_CLIENT_SECRET=4Wt21I7CQATRNPFph5EhnSPV8dqfwuWTq7TQmIZYiJB4KWADMC7AQGUccLa6qgWj
AUTH_JWKS_URI='https://delaware-aalstg01.eu.auth0.com/.well-known/jwks.json'
AUTH_AUDIENCE='https://delaware-aalstg01'
AUTH_ISSUER='https://delaware-aalstg01.eu.auth0.com/'
AUTH_USER_INFO='https://delaware-aalstg01.eu.auth0.com/userinfo'
```

Installeer yarn met behulp van <code>yarn install</code>

Vervolgens kan de applicatie gestart worden met <code>yarn start</code>

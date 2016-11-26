# ranka-jsconfasia

This is for a demo for JS Conf Asia 2016.

## Installing

You will need `localtunnel` for this demo. Optionally, you can also install `nodemon` that will automatically restart on each change.

```sh
npm i
npm i -g localtunnel
```

## Setting up

Make sure you duplicated `./config/default.json` to `./config/<env>.json`.

For example, `test.json` is used here. Put your page access tokens and validation token inside `test.json`

```json
{
  "pageAccessToken": "AAAAAunK2MwZDZDEAlIAXnUeZABNh0ufYpcteSxfYfxaMMKnhcvYpCrhiwNwXIgCBTN4C2NOI1WPrxJG8SSNHK8ZAcLdIkqNyVFxPSlOPODYIAEhkcfyAO0BAHfOJHXx6ZBNgQySyX0VitRS9l8Hs0PuzsgJgNgMmBGlC6h4p9g1Dj",
  "validationToken": "2016"
}
```


## Running

Using `nodemon`:

```sh
export NODE_ENV=test && nodemon
```

Without `nodemon`:

```sh
export NODE_ENV=test && node src/index.js
```

Start `localtunnel` for port `8955`.

```sh
lt --port 8955 --subdomain=yoursubdomain
```

Alternatively:

```sh
/usr/local/bin/lt --port 8955 --subdomain=yoursubdomain
```

## Things to try

* hi
* Book an appointment next thursday at noon
* arrange me an appointment for tomorrow at 4 PM
* i have a pen
* i have an 🍎
* i have a 🐂
* octopus

## License

ISC

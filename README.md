# ranka-jsconfasia

Messenger/Ranka demo for JSConf.Asia 2016. It recognizes greetings,
appointment phrases, locations, and emoji.

## Setup

```sh
npm install
cp config/default.json config/test.json
```

Edit `config/test.json` with your own tokens:

```json
{
  "pageAccessToken": "YOUR_PAGE_ACCESS_TOKEN",
  "validationToken": "YOUR_VALIDATION_TOKEN"
}
```

## Run

```sh
NODE_ENV=test node src/index.js
```

The server listens on port 8955. An optional HTTPS tunnel must forward that
port for external webhook callbacks. Try `hi`, `i have a pen`, or an appointment
phrase with a date. See [src/index.js](src/index.js) for handlers.

This is a historical API demo; current Messenger compatibility is unverified.
`npm test` is a failing placeholder. License: ISC, as declared in package.json.

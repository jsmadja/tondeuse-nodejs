[![Build Status](https://travis-ci.org/jsmadja/tondeuse-nodejs.svg?branch=master)](https://travis-ci.org/jsmadja/tondeuse-nodejs)
[![Coverage Status](https://coveralls.io/repos/github/jsmadja/tondeuse-nodejs/badge.svg?branch=master)](https://coveralls.io/github/jsmadja/tondeuse-nodejs?branch=master)
# Mow It Now

## Installation

```
npm install
```

## Lancer le serveur

```
npm start
```

### Lancer les tests

```
npm test
```

### Documentation Swagger

http://localhost:3000/api-docs

| Resource | Verb | Route | Description |
|----------|------|-------|-------------|
| Lawn | POST | /lawn | Create a lawn |
| Lawn | POST | /lawn/{id}/mowers | Put a mower on a lawn |
| Mower|GET |  /mower/{id} | Get mower information |
| Mower|PUT|/mower/{id}|Start mowing with a set of instructions|
| Mower|POST|/mower|Create a mower|
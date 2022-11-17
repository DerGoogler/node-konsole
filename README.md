# node-konsole

Powerful zero dependency and single import console logging tool for Node.js

## Install

```shell
npm install --save node-konsole
```

## Usage

```js
// it doesn't matter it default imported or not
// import { konsole } from 'node-konsole';
import konsole from "node-konsole";

// <0> is the same like <r> or <reset>
konsole.log("<blue><underscore>I'm blue underscored<red>!<0>");
```

### Get by code

You can get the color by thier code, like this:

```js
import konsole from "node-konsole";

konsole.log("<30>Some colored text<0>");

// Expirental usage, may not work at all.
konsole.log("<30:5>Some colored text<0>");
```

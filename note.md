## Step by Step

**1. Session**

### Global Object

### Module System

- In Node js Module use invisible away
- Mode not a global javascript object it's develop by node js
- It's call `EC` function.
- Module working flow

```
// (function (exports, require, module, __filename, __dirname) { // It's working invisible in node as like EC function
    const player = ['ashadozaaman', 'shvou', 'ali'];
    const a = 6;
    function test() {
        console.log(test);
    }
    console.log(module);
    module.exports = player;
// );
```

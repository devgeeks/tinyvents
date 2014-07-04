tinyvents
============

A very small and simple lib to attach events to plain JavaScript objects.

Inspired by / based on https://github.com/jeromeetienne/microevent.js

## Using Tinyvents

Include the `tinyvents.js` or `tinyvents.min.js` file in your html:

    <script src="tinyvents.js"></script>

...or in node.js:

    var Tinyvents = require('./tinyvents.js').Tinyvents;

### Tinyvents.observe() `Tinyvents.observe(Foobar);`

Suppose you have a class `Foobar`, and you would like it to support the observer 
pattern:

    Tinyvents.observe(Foobar);

`Foobar` now has methods for `.on()`, `once()`, `off()`, and `trigger()`.

### .on() `Foobar.on(event, callback);`

Adds a listener for an event called "change", and when triggered calls the
callback function with any arguments

    Foobar.on('myevent', function(arg1) {
      console.log("my event triggered: " + arg1);
    });

### .once() `Foobar.once(event, callback);`

Adds a listener for an event called "myevent", and when triggered calls the
callback function with any arguments. This is only called once and any subsequent 
"myevent" events will not trigger the callback.

    Foobar.once('myevent', function(arg1) {
      console.log("my event fired once: " + arg1);
    });

### .off() `Foobar.off(event [, callback]);`

Removes a listener for an event with a specified callback if the callback is specified.

    Foobar.off('myevent', myEventCallback);

...or removes ALL listeners for an event if no callback specified.

    Foobar('myevent');

### .trigger() `Foobar.trigger(event [, arg1, arg2, arg3, ...])`

Triggers an event and optionally passes any number of arguments.

    Foobar.trigger('myevent', Date.now());

### Aliases

For convenience, the following methods have the following aliases:

* `.on()` == `.bind()`
* `.once()` == `.one()`
* `.off()` == `.unbind()`
* `.trigger()` == `.fire()`



## LICENSE

The MIT License (MIT)

Copyright (c) 2011 Jerome Etienne, http://jetienne.com  
Copyright (c) 2014 tommy-carlos williams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


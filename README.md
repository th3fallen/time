# material-timepicker 

[![Build Status](https://travis-ci.org/hownowbrowncow/material-timepicker.svg)](https://travis-ci.org/hownowbrowncow/material-timepicker)

## Install

Available on NPM only currently  

```
npm install material-timepicker
```

## About

Currently the Material Design Lite project doesn't have any picker features implemented. There are a few other OS material picker libraries but they are either not actively maintained,  or require heavy dependencies.

In need of a timepicker for a current project I made this library. Built with plain JavaScript and no dependencies. Written in ES6 and SASS.

The library currently supports both 12 and 24 time formats. Module loading is support but an object named `TimePicker` is also put into the window scope when the library is loaded.

To check out live examples and view the test runner check out http://hownowbrowncow.github.io/material-timepicker/

This is my first time writing a DOM library in vanilla JS so feedback is appreciated!

## Options

Current only one option is implemented to change between 12 and 24 hour time. They are passed when one of the public API methods are called, merged with default options, and set the property `mtpOptions` on the input element specified.

`{`  
`timeFormat`: `standard` or `military` by default it will be standard  
`}`  


## API


### `bindInput`

Adds an event listener to input element specified.  When the input element triggers a focus event the timepicker will open.

#### parameters

`inputEl`: either a string selector, or a HTMLElement  
`options`: (optional) options object to be set to input element object

#### example

```javascript
const timepicker = new TimePicker();

// using a selector with no options
timepicker.bindInput('#selector');

// using a cached element with 24 time format
timepicker.bindInput(cachedEl, {timeFormat: 'military'});
```

---

### `openOnInput`

Better suited for use in a framework environment where you want more customized control over the picker. When called it will immediately open with the input element specified in context.

#### parameters

`inputEl`: either a string selector, or a HTMLElement  
`options`: (optional) options object to be set to input element object

#### example

```javascript
const timepicker = new TimePicker();
const standardInput = document.querySelectorAll('#standard-input');

standardInput.on('focus', event => timepicker.openOnInput(event.target));
```

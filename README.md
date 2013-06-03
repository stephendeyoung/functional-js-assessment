
This is a test-driven assessment for Javascript's functional features. It requires you to have Node.js installed.

## About the tests

The tests aim to assess the developer's knowledge of Javascript's functional features. It covers:

* Partial application
* Currying
* Closures
* Javascript's native "functional" methods such as `map` and `reduce`
* Recursion
* Continuations

Some of the tests borrow from Rebecca Murphey's excellent [JS Assessment](https://github.com/rmurphey/js-assessment).

In order to ensure the developer can solve these challenges without resorting to "stateful" operations the tests use [esprima](http://esprima.org/) to check that the solutions are "functional" in nature.

Therefore, using the following statements will throw an error:

* `for`
* `while`

Using the following methods will also throw an error:

* `pop`
* `push`
* `reverse`
* `shift`
* `splice`
* `unshift`
* `defineProperty`
* `defineProperties`
* `replace`

If you declare a variable and then try to change its value later on the test will throw an error.

When the tests throw an error in this manner they will report back in the terminal or the browser's console the offending statement and the line on which it occurs.

In addition, some of the tests do additional checks on the given answer so they are not too easy.

Please note that these "functional" checks are not comprehensive.

## Getting started

First clone the repository and then install the dependencies:

`npm install`

You can run the tests on the command line with Mocha. To do this first install Mocha globally:

`npm install -g mocha`

Then in the root of the directory just run:

`mocha`

You can also run the tests in the browser. You can either use your own web server to serve the index.html in the root of the directory or you can use grunt. You will need to have it [installed](http://gruntjs.com/getting-started) first. Then on the command line just run:

`grunt server`

Then go to [http://localhost:4444](http://localhost:4444) in your browser.

## Completing the tests

To complete the tests you'll need to edit the 'answers.js' file in the 'answers' directory. Please do not rename the properties of the `answers` object otherwise the tests will always fail.



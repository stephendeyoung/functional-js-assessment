
This is a test-driven assessment for Javascript's functional features. It requires you to have Node.js installed.

## About the tests

The tests aim to assess the developer's knowledge of Javascript's functional features. It covers:

* Partial application
* Currying
* Closures
* Javascript's native "functional" methods such as `map` and `reduce`
* Recursion
* Continuations

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

When the tests throw an error in this manner they will report back in the terminal or the browser's console the offending statement and the line on which it occurs.

In addition, some of the tests do additional checks on the given answer so they did not become too easy.

## Getting started

First clone the repository and then install the dependencies:

`npm install`

You can run the tests on the command line with Mocha. To do this first install Mocha globally:

`npm install -g mocha`

Then in the root of the directory just run:

`mocha`

You can also run the tests in the browser. On the command line just run:

`grunt server`

Then go to [http://localhost:4444](http://localhost:4444) in your browser.

## Completing the tests

To complete the tests you'll need to edit the 'answers.js' file in the 'answers' directory. Please do not rename the properties of the `answers` object otherwise the tests will always fail.



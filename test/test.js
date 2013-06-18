
var runTests = function(data) {

    if (typeof exports === 'undefined') {
        var script = document.createElement('script');
        script.text = data;
        document.querySelector('head').appendChild(script);
    }

    var invalidArrayMethods = [
        'map',
        'reduce',
        'every',
        'some',
        'filter',
        'reduceRight'
    ];
    var tokens = esprima.parse(data, {
        tokens: true,
        loc: true
    }).tokens;

    var fns = functionalTests;

    var statementTest = fns.loopTokens(tokens, fns.invalidStatements, fns.testStatements, 0);

    var methodTest = fns.loopTokens(tokens, fns.invalidMethods, fns.testMethods, 0);

    var mutationTest = fns.loopTokens(tokens, null, fns.testMutation, 0);

    if (statementTest === true &&
        methodTest === true &&
        mutationTest === true) {
        describe('functions as values', function() {
            it('test1: should return a function that takes an argument and returns that argument', function() {
                var v = answers.test1();
                expect(v).to.be.a('function');
                expect(v(2)).to.equal(2);
                expect(v('Hello World')).to.equal('Hello World');
                expect(v({})).to.be.a('object');
            });

            it('test2: should take a function as an argument and return the value returned by that function', function() {
                var v = answers.test2();
                expect(v(function() {return 2;})).to.equal(2);
                expect(v(function(b) {return 'Sup yo';})).to.equal('Sup yo');
            });

            it('test3: should return a function that partially applies some arguments', function() {
                // taken from Rebecca Murphey's JS Assessment:
                // https://github.com/rmurphey/js-assessment
                var sayIt = function(greeting, name, punctuation) {
                    return greeting + ', ' + name + (punctuation || '!');
                };
                var partial = answers.test3(sayIt, 'Hello', 'Ellie');
                expect(partial('!!!')).to.equal('Hello, Ellie!!!');
            });

            it('test4: should return a function that partially applies any number of arguments', function() {
                var add = function(a, b) {
                    return a + b;
                };

                var multiply = function(c, d, e) {
                    return c * e + d;
                };

                var multiply2 = function(f, g, h, i) {
                    return (f * g) * (h * i);
                };

                var partial1 = answers.test4(add, 3);
                var partial2 = answers.test4(multiply, 7, 5);
                var partial3 = answers.test4(multiply2, 8, 10, 15);

                expect(partial3(partial2(partial1(5)))).to.equal(73200);
            });

            it('test5: takes a function as an argument and should return a function that keeps returning functions until all of the arguments have been supplied (currying)', function () {
                // adapted slightly from Rebecca Murphey's JS Assessment:
                // https://github.com/rmurphey/js-assessment
                var curryMe = function (x, y, z) {
                    return x / y * z;
                };

                var a = Math.random(), b = Math.random(), c = Math.random(), result;

                var v = answers.test5;

                var recur = function(result, i) {
                    var expectFunction = function() {
                        expect(result).to.be.a('function');
                        expect(result.length).to.equal(1);
                    };

                    if (i > 1) {
                        if (i === 4) {
                            expectFunction();
                            return recur(v(curryMe)(a), i - 1);
                        } else if (i === 3) {
                            expectFunction();
                            return recur(v(curryMe)(a)(b), i - 1);
                        } else {
                            expectFunction();
                            return recur(v(curryMe)(a)(b)(c), i - 1);
                        }
                    } else {
                        expect(result).to.be.a('number');
                        expect(result).to.equal(curryMe(a, b, c));
                    }
                };

                recur(v(curryMe), 4);
            });

        });


        describe('closures', function() {
            it('test6: should use closures to calculate the result of random numbers (without using the native "bind" method)', function() {
                // adapted from Rebecca Murphey's JS Assessment:
                // https://github.com/rmurphey/js-assessment
                var arr1 = [ Math.random(), Math.random(), Math.random(), Math.random() ];

                var arr2 = [Math.random(), Math.random()];
                var doSomeStuff = function (x) {
                    return x * x;
                };

                var funcs1 = answers.test6(arr1, doSomeStuff);
                var funcs2 = answers.test6(arr2, doSomeStuff);

                var tokens = esprima.parse('var _esprima_ = ' + answers.test6.toString(), {
                    tokens: true
                }).tokens;

                expect(funcs1).to.have.length(arr1.length);
                expect(funcs2).to.have.length(arr2.length);

                expect(fns.loopTokens(tokens, ['bind'], functionalTests.testMethods, 0)).to.be.true;

                var recur = function(funcs, arr, i) {
                    if (i === arr.length) {
                        return;
                    } else {
                        expect(funcs[i]()).to.equal(doSomeStuff(arr[i]));
                        return recur(funcs, arr, i + 1);
                    }
                };

                recur(funcs1, arr1, 0);
                recur(funcs2, arr2, 0);
            });
        });

        describe('native "functional" methods', function() {

            var Employee = function(data) {
                this.user = data.user;
                this.title = data.title;
                this.project = data.project;
            };

            var data = [
                {
                    user: 'Stephen',
                    title: 'Interface Developer',
                    project: 'Project 1'
                },
                {
                    user: 'Sally',
                    title: 'Designer',
                    project: 'Project 2'
                },
                {
                    user: 'Sarah',
                    title: 'Java Developer',
                    project: 'Project 1'
                },
                {
                    user: 'Simon',
                    title: 'UX Architect',
                    project: 'Project 2'
                }
            ];

            var data2 = [
                {
                    title: 'Project Manager',
                    project: 'Project 3'
                },
                {
                    user: 'Helen',
                    title: 'Content Strategist',
                    project: 'Project 3'
                }
            ];

            var data3 = [
                new Employee(data[0]),
                new Employee(data[1]),
                new Employee(data[2]),
                new Employee(data[3])
            ];

            var data4 = [
                new Employee(data2[0]),
                new Employee(data2[1])
            ];

            it('test7: should return a new array of objects from an array of data using the "map" method', function() {

                expect(answers.test7(data, Employee).every(function(v) {
                    return v instanceof Employee;
                })).to.be.true;

                expect(answers.test7(data2, Employee).every(function(v) {
                    return v instanceof Employee;
                })).to.be.true;
            });

            it('test8: should return the earliest date from an array of dates using the "reduce" method', function() {
                var randomDate = function(start, end) {
                    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
                };

                var dates = [
                    randomDate(new Date(2013, 2, 19), new Date()),
                    randomDate(new Date(2013, 2, 19), new Date()),
                    randomDate(new Date(2013, 2, 19), new Date()),
                    randomDate(new Date(2013, 2, 19), new Date()),
                    randomDate(new Date(2013, 2, 19), new Date())
                ];

                var dates2 = [
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date()),
                    randomDate(new Date(2012, 0, 23), new Date())
                ];

                var compare = function(a, b) {
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    } else {
                        return 0;
                    }
                };

                expect(answers.test8(dates)).to.equal(dates.sort(compare)[0]);
                expect(answers.test8(dates2)).to.equal(dates2.sort(compare)[0]);
            });

            it('test9: should test that all elements of an array conform to an array of tests using only the "every" method', function() {
                var tests = [
                    function(x) {
                        return x instanceof Employee;
                    },
                    function(x) {
                        return x.user ? true : false;
                    }
                ];

                expect(answers.test9(data3, tests)).to.be.true;
                expect(answers.test9(data4, tests)).to.be.false;
            });

        });

        describe('recursion', function() {

            it('test10: should recursively loop over an array of numbers and return the result of adding them all together (without using the following Array methods: "map", "reduce", "every", "some", "filter", "reduceRight"', function() {
                var v = answers.test10();
                var answerTokens = esprima.parse('var _esprima_ = ' + v.toString(), {
                    tokens: true
                }).tokens;

                expect(fns.loopTokens(answerTokens, invalidArrayMethods, functionalTests.testMethods, 0)).to.be.true;
                expect(v([1, 2, 3, 4, 5])).to.equal(15);
                expect(v([10, 123, 6])).to.equal(139);
            });

            it('test11: should provide a "functional" implementation of Array.prototype.map (without using the following Array methods: "map", "reduce", "every", "some", "filter", "reduceRight"', function() {
                var v = answers.test11();
                var answerTokens = esprima.parse('var _esprima_ = ' + v.toString(), {
                    tokens: true
                }).tokens;

                var map1 = v([1, 2, 3], function(v, i, arr) {
                    return v * 2;
                });

                var map2 = v([4, 6, 10, 12], function(v, i, arr) {
                    return i * v;
                });

                var map3 = v(['Map'], function(v, i, arr) {
                    return arr[0] + v;
                });

                expect(fns.loopTokens(answerTokens, invalidArrayMethods, functionalTests.testMethods, 0)).to.be.true;
                expect(map1).to.eql([2, 4, 6]);
                expect(map2).to.eql([0, 6, 20, 36]);
                expect(map3).to.eql(['MapMap']);
            });
        });

        describe('continuations', function() {

            it('test12: should return a function that orders an array of numbers from smallest to largest using continuations and without using the following Array methods: "map", "reduce", "every", "some", "filter", "reduceRight"', function() {
                var nums = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
                var nums2 = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

                var compare = function(a, b) {
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    } else {
                        return 0;
                    }
                };

                var f = function(r) {
                    expect(r).to.eql(nums.sort(compare));
                    return v;
                };

                var f2 = function(r) {
                    expect(r).to.eql(nums2.sort(compare));
                    return v;
                };

                var v = answers.test12(nums, f);
                var v2 = answers.test12(nums2, f2);

                var tokens = esprima.parse('var _esprima_ = ' + answers.test12.toString(), {
                    tokens: true
                }).tokens;

                expect(fns.loopTokens(tokens, invalidArrayMethods.concat('sort'), fns.testMethods, 0)).to.be.true;
                v();
                v2();
            });
        });
        if (typeof exports === 'undefined') {
            mocha.run();
        }
    } else {
        var invalidToken = statementTest === true ? methodTest === true ? mutationTest : methodTest : statementTest;
        throw invalidToken.token + 'on line: ' + invalidToken.line;
    }
}

if (typeof exports !== 'undefined') {
    var expect = require('chai').expect;
    var answers = require('../answers/answers');
    var functionalTests = require('./functional-test');
    var esprima = require('esprima');
    var fs = require('fs');
    var esprima = require('esprima');
    var answersFile = fs.readFileSync(process.cwd() + '/answers/answers.js');

    runTests(answersFile);
} else {
    var expect = chai.expect;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            runTests(request.responseText);
        }
    };
    request.open('GET', 'answers/answers.js', true);
    request.send();
}
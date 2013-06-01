



var invalidMethods = [
    'pop',
    'push',
    'reverse',
    'shift',
    'splice',
    'unshift',
    'defineProperty',
    'defineProperties',
    'replace'
];


var invalidStatements = [
    'for',
    'while'
];

var checkTokens = function(v, invalidTokens) {
    if (invalidTokens.length < 1) {
        return {
            v: true
        };
    } else if (v.value === invalidTokens[0]) {
        return {
            v: false,
            token: 'You used the following invalid statement or method: ' + v.value + '\n',
            line: v.loc.start.line
        };
    } else {
        return checkTokens(v, invalidTokens.slice(1));
    }
};

var loopTokens = function(tokens, invalidTokens, test, index) {
    if (index === tokens.length) {
        return true;
    } else {
        var check = test(tokens, invalidTokens, index);
        if (check === true) {
            return loopTokens(tokens, invalidTokens, test, index + 1);
        } else {
            return check;
        }
    }
};

var testStatements = function(tokens, invalidTokens, index) {
    var check = checkTokens(tokens[index], invalidTokens);
    if (tokens[index].type === 'Keyword' && !check.v) {
        return check;
    } else {
        return true
    }
};


var testMethods = function(tokens, invalidTokens, index) {
    var prev = tokens[index - 1];
    var check = checkTokens(tokens[index], invalidTokens);
    if (tokens[index].type === 'Identifier' && !check.v && prev.type === 'Punctuator' && prev.value === '.') {
        return check;
    } else {
        return true;
    }
};

var testMutation = function(tokens, nil, index) {
    if (tokens[index].type === 'Punctuator' &&
        tokens[index].value === '=' &&
        tokens[index - 1].type === 'Identifier' &&
        (tokens[index - 2].value !== 'var' && tokens[index - 2].value !== '.') ) {
        return {
            v: false,
            token: 'You are using mutation ',
            line: tokens[index].loc.start.line
        };
    } else {
        return true;
    }
}

if (typeof exports !== 'undefined') {
    module.exports = {
        loopTokens: loopTokens,
        testStatements: testStatements,
        testMethods: testMethods,
        testMutation: testMutation,
        invalidStatements: invalidStatements,
        invalidMethods: invalidMethods
    };
} else {
    var functionalTests = {
        loopTokens: loopTokens,
        testStatements: testStatements,
        testMethods: testMethods,
        testMutation: testMutation,
        invalidStatements: invalidStatements,
        invalidMethods: invalidMethods
    };
}
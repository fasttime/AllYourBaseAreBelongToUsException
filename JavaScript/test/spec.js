'use strict';

function areArraysEqual(array1, array2)
{
    var length1 = array1.length;
    var length2 = array2.length;
    if (length1 !== length2)
    {
        return false;
    }
    for (var index = 0; index < length1; ++index)
    {
        var item1 = array1[index];
        var item2 = array2[index];
        if (item1 !== item2)
        {
            return false;
        }
    }
    return true;
}

function areDescriptorsEquivalent(descriptor1, descriptor2)
{
    var result =
        descriptor1.configurable === descriptor2.configurable &&
        descriptor1.enumerable === descriptor2.enumerable &&
        descriptor1.writable === descriptor2.writable;
    return result;
}

function areStacksComparable(stack1, stack2)
{
    function neutralizeStack(stack)
    {
        var result =
            stack
            .replace(/^\w+(?=Error\b)/, '*')
            .replace(/:\d+:\d+\)(?!.)/g, ':*:*)')
            .replace(/:\d+:\d+(?!.)/g, ':*:*');
        return result;
    }
    
    var neutralStack1 = neutralizeStack(stack1);
    var neutralStack2 = neutralizeStack(stack2);
    return neutralStack1 === neutralStack2;
}

function compareOwnProperties(obj1, obj2, descriptiveNames, ignoredPropertyNames)
{
    ignoredPropertyNames = ignoredPropertyNames || [];
    var names1 = getPropertyNames(obj1, ignoredPropertyNames);
    var names2 = getPropertyNames(obj2, ignoredPropertyNames);
    if (!areArraysEqual(names1, names2))
    {
        log('The ' + descriptiveNames + ' have different property names.');
        return;
    }
    names1.forEach(
        function (name)
        {
            var descriptor1 = Object.getOwnPropertyDescriptor(obj1, name);
            var descriptor2 = Object.getOwnPropertyDescriptor(obj2, name);
            if (!areDescriptorsEquivalent(descriptor1, descriptor2))
            {
                log(
                    'Descriptors of property ' + JSON.stringify(name) + ' of ' + descriptiveNames +
                    ' are different.'
                );
            }
        }
    );
}

function cookStack(rawStack, decorator)
{
    var OldError = Error;
    var NewError = function () { };
    NewError.prototype = { get stack() { return rawStack; } };
    Error = NewError;
    try
    {
        var error = AllYourBaseAreBelongToUsError();
        if (decorator)
        {
            decorator(error);
        }
        var actualStack = error.stack;
        return actualStack;
    }
    finally
    {
        Error = OldError;
    }
}

function createError(constructor)
{
    return new constructor('Custom message');
}

function getPropertyNames(obj, ignoredPropertyNames)
{
    var propertyNames =
        Object.getOwnPropertyNames(obj).filter(
            function (propertyName)
            {
                var result = ignoredPropertyNames.indexOf(propertyName) < 0;
                return result;
            }
        ).sort();
    return propertyNames;
}

function runTest()
{
    try
    {
        test();
    }
    catch (error)
    {
        log(error);
        return;
    }
    log('done');
}

function test()
{
    compareOwnProperties(
        TypeError,
        AllYourBaseAreBelongToUsError,
        'constructors',
        ['arguments', 'caller', 'length']
    );
    compareOwnProperties(
        TypeError.prototype,
        AllYourBaseAreBelongToUsError.prototype,
        'prototypes',
        ['message']
    );
    compareOwnProperties(
        new TypeError('Hello, World!'),
        new AllYourBaseAreBelongToUsError('Hello, World!'),
        'instances',
        ['stack']
    );
    var actual = createError(AllYourBaseAreBelongToUsError);
    var expected = createError(TypeError);
    var expectedStack = expected.stack;
    if (expectedStack)
    {
        var actualStack = actual.stack;
        if (!actualStack)
        {
            log('No stack :-(')
        }
        if (!areStacksComparable(actualStack, expectedStack))
        {
            log('Stack test failed.\nExpected:\n' + expectedStack + '\n but was:\n' + actualStack);
        }
    }
    else
    {
        log('Error stack not available.');
    }
    ['fileName', 'lineNumber', 'columnNumber', 'sourceURL', 'line', 'column'].forEach(
        function (propertyName)
        {
            if (actual[propertyName] !== expected[propertyName])
            {
                log(
                    'Values of property ' + JSON.stringify(propertyName) +
                    ' of instances don\'t match.'
                );
            }
        }
    );
    var str = Object.prototype.toString.call(expected);
    if (Object.prototype.toString.call(actual) !== str)
    {
        log(
            'Object.prototype.toString(AllYourBaseAreBelongToUsError()) should be ' +
            JSON.stringify(str) + '.'
        );
    }
    var str = Object.prototype.toString.call(Error.prototype);
    if (Object.prototype.toString.call(AllYourBaseAreBelongToUsError.prototype) !== str)
    {
        log(
            'Object.prototype.toString(AllYourBaseAreBelongToUsError.prototype) should be ' +
            JSON.stringify(str) + '.'
        );
    }
     
    var rawStack =
        "AllYourBaseAreBelongToUsError@file:///Users/noone/Documents/GitHub/" +
        "AllYourBaseAreBelongToUsException/JavaScript/AllYourBaseAreBelongToUsError.js:27:21\n" +
        "@debugger eval code:1:1\n@debugger eval code:1:15\n";
    var actualStack = cookStack(rawStack);
    var expectedStack = "@debugger eval code:1:1\n@debugger eval code:1:15\n";
    if (actualStack !== expectedStack)
    {
        log(
            'Stack test failed.\nExpected stack:\n' + expectedStack + '\nActual stack:\n' +
            actualStack
        );
    }
    
    var rawStack =
        "Error\n    at AllYourBaseAreBelongToUsError (file:///Users/noone/Documents/GitHub/" +
        "AllYourBaseAreBelongToUsException/JavaScript/AllYourBaseAreBelongToUsError.js:35:21)\n" +
        "    at <anonymous>:2:1\n" +
        "    at Object.InjectedScript._evaluateOn (<anonymous>:875:140)\n" +
        "    at Object.InjectedScript._evaluateAndWrap (<anonymous>:808:34)\n" +
        "    at Object.InjectedScript.evaluate (<anonymous>:664:21)";
    var actualStack = cookStack(rawStack);
    var expectedStack =
        "AllYourBaseAreBelongToUsError: All your base are belong to us\n" +
        "    at <anonymous>:2:1\n" +
        "    at Object.InjectedScript._evaluateOn (<anonymous>:875:140)\n" +
        "    at Object.InjectedScript._evaluateAndWrap (<anonymous>:808:34)\n" +
        "    at Object.InjectedScript.evaluate (<anonymous>:664:21)";
    if (actualStack !== expectedStack)
    {
        log(
            'Stack test failed.\nExpected stack:\n' + expectedStack + '\nActual stack:\n' +
            actualStack
        );
    }
    
    var rawStack =
        "Error\n    at AllYourBaseAreBelongToUsError (file:///Users/noone/Documents/GitHub/" +
        "AllYourBaseAreBelongToUsException/JavaScript/AllYourBaseAreBelongToUsError.js:35:21)\n" +
        "    at <anonymous>:2:1\n" +
        "    at Object.InjectedScript._evaluateOn (<anonymous>:875:140)\n" +
        "    at Object.InjectedScript._evaluateAndWrap (<anonymous>:808:34)\n" +
        "    at Object.InjectedScript.evaluate (<anonymous>:664:21)";
    var actualStack =
        cookStack(
            rawStack,
            function (error)
            {
                error.name = 'GFYError';
                error.message = 42;
            }
        );
    var expectedStack =
        "GFYError: 42\n" +
        "    at <anonymous>:2:1\n" +
        "    at Object.InjectedScript._evaluateOn (<anonymous>:875:140)\n" +
        "    at Object.InjectedScript._evaluateAndWrap (<anonymous>:808:34)\n" +
        "    at Object.InjectedScript.evaluate (<anonymous>:664:21)";
    if (actualStack !== expectedStack)
    {
        log(
            'Stack test failed.\nExpected stack:\n' + expectedStack + '\nActual stack:\n' +
            actualStack
        );
    }
}

this.runTest = runTest;

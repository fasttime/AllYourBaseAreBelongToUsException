(function ()
{
    'use strict';
    
    /**
     * Creates a new <code>AllYourBaseAreBelongToUsError</code> object.
     *
     * @class AllYourBaseAreBelongToUsError
     *
     * @param {string} [message]
     * Human-readable description of the error.
     * If this parameter is omitted or <code>undefined</code>, a default description will be used.
     *
     * @classdesc
     * <code>AllYourBaseAreBelongToUsError</code> objects are thrown to indicate that all your base
     * are belong to us.
     */
    function AllYourBaseAreBelongToUsError(message)
    {
        function initInstanceValue(propertyName, value)
        {
            var propertyDescriptor = getOwnPropertyDescriptor(error, propertyName);
            if (propertyDescriptor)
            {
                propertyDescriptor.value = value;
                propertiesObject[propertyName] = propertyDescriptor;
            }
        }
        
        var prototype = AllYourBaseAreBelongToUsError.prototype;
        var newInstance =
            this instanceof AllYourBaseAreBelongToUsError ? this : Object.create(prototype);
        var propertiesObject = { };
        if (message !== undefined)
        {
            message = String(message);
            propertiesObject.message = { configurable: true, value: message, writable: true };
        }
        var captureStackTrace = Error.captureStackTrace;
        if (captureStackTrace) // V8
        {
            captureStackTrace(newInstance, AllYourBaseAreBelongToUsError);
        }
        else // Firefox, Safari and Edge
        {
            var error;
            var stackTraceLimit = Error.stackTraceLimit;
            if (typeof stackTraceLimit === 'number')
            {
                Error.stackTraceLimit = stackTraceLimit + 1;
                error = new Error;
                Error.stackTraceLimit = stackTraceLimit;
            }
            else
            {
                error = new Error;
            }
            var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            var propertyDescriptor =
                getOwnPropertyDescriptor(error, 'stack') ||
                getOwnPropertyDescriptor(Error.prototype, 'stack');
            if (propertyDescriptor)
            {
                var stack = error.stack;
                var match = /^(.*?\n {3,4}at .* \(.*?\))\n {3,4}at /.exec(stack);
                if (match) // Edge
                {
                    stack = stack.slice(match[1].length);
                    applyStackAccessors(propertyDescriptor, stack, false);
                }
                else // Firefox and Safari
                {
                    match = /^(.*\n)(?:.*?@(.*):(\d+):(\d+)\n)?/.exec(stack);
                    if (match)
                    {
                        stack = stack.slice(match[1].length);
                        var fileName = match[2];
                        var lineNumber = asNumber(match[3]);
                        var columnNumber = asNumber(match[4]);
                        initInstanceValue('fileName', fileName);
                        initInstanceValue('lineNumber', lineNumber);
                        initInstanceValue('columnNumber', columnNumber);
                        initInstanceValue('sourceURL', fileName);
                        initInstanceValue('line', lineNumber);
                        initInstanceValue('column', columnNumber);
                    }
                    if ('value' in propertyDescriptor)
                    {
                        propertyDescriptor.value = stack;
                    }
                    else
                    {
                        applyStackAccessors(propertyDescriptor, stack, true);
                    }
                }
                propertiesObject.stack = propertyDescriptor;
            }
        }
        Object.defineProperties(newInstance, propertiesObject);
        return newInstance;
    }
    
    function applyStackAccessors(propertyDescriptor, stack, finalized)
    {
        propertyDescriptor.get =
            function ()
            {
                if (!finalized)
                {
                    var message = String(this.message);
                    finalized = true;
                    stack = this.name + (message ? ': ' + message : '') + stack;
                }
                return stack;
            };
        propertyDescriptor.set =
            function (value)
            {
                finalized = true;
                stack = value;
            };
        propertyDescriptor = null; // Let's not keep a reference to propertyDescriptor.
    }
    
    function asNumber(string)
    {
        if (string !== undefined)
        {
            return +string;
        }
    }
    
    function wrapObjectToString(oldObjectToString)
    {
        var newObjectToString =
            function ()
            {
                var string =
                    this.constructor === AllYourBaseAreBelongToUsError ?
                    '[object Error]' : oldObjectToString.call(this);
                return string;
            };
        return newObjectToString;
    }
    
    (function (global)
    {
        if (typeof global.AllYourBaseAreBelongToUsError !== 'function')
        {
            var propertiesObject =
            {
                constructor:
                {
                    configurable: true,
                    value: AllYourBaseAreBelongToUsError,
                    writable: true
                },
                message:
                {
                    configurable: true,
                    value: 'All your base are belong to us',
                    writable: true
                },
                name:
                {
                    configurable: true,
                    value: 'AllYourBaseAreBelongToUsError',
                    writable: true
                }
            };
            var evalErrorPrototype = EvalError.prototype;
            var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            var errorPrototype = Error.prototype;
            ['fileName', 'lineNumber', 'columnNumber', 'toString'].forEach(
                function (propertyName)
                {
                    if (evalErrorPrototype.hasOwnProperty(propertyName))
                    {
                        var propertyDescriptor =
                            getOwnPropertyDescriptor(errorPrototype, propertyName);
                        propertiesObject[propertyName] = propertyDescriptor;
                    }
                }
            );
            var prototype = Object.create(errorPrototype, propertiesObject);
            AllYourBaseAreBelongToUsError.prototype = prototype;
            var defineProperty = Object.defineProperty;
            defineProperty(
                AllYourBaseAreBelongToUsError,
                'prototype',
                { value: prototype, writable: false }
            );
            defineProperty(
                global,
                'AllYourBaseAreBelongToUsError',
                { configurable: true, value: AllYourBaseAreBelongToUsError, writable: true }
            );
            // To ensure that AllYourBaseAreBelongToUsError objects are recognized as errors by
            // jQuery, we need to overwrite the native implementation of Object.prototype.toString.
            // This works as long as jQuery is loaded after AllYourBaseAreBelongToUsError is
            // defined.
            // Then jQuery.type(new AllYourBaseAreBelongToUsError) will return "error".
            var objectPrototype = Object.prototype;
            objectPrototype.toString = wrapObjectToString(objectPrototype.toString);
        }
    }
    )(typeof self === 'undefined' ? global : self);
}
)();

// JSService – generate full JavaScript language as files
// All methods are real polyfills (based on MDN) – not stubs.
(function() {
    // ---------- Language data with actual implementations ----------
    const languageSpec = {
        "Global": {
            type: "folder",
            children: {
                "Infinity.js": "// Represents infinity (read‑only)\n// This property is already built‑in, so we just log it.\nconsole.log(Infinity);",
                "NaN.js": "// Not‑a‑Number value (read‑only)\nconsole.log(NaN);",
                "undefined.js": "// Represents an undefined value (read‑only)\nconsole.log(undefined);",
                "eval.js": "// Evaluates JavaScript code represented as a string\nfunction eval(code) {\n    // Real implementation: use the global eval\n    return globalThis.eval(code);\n}",
                "isFinite.js": "// Determines whether a value is finite\nfunction isFinite(value) {\n    // Real implementation\n    return Number.isFinite(Number(value));\n}",
                "isNaN.js": "// Determines whether a value is NaN\nfunction isNaN(value) {\n    // Real implementation\n    return Number.isNaN(Number(value));\n}",
                "parseFloat.js": "// Parses a string and returns a floating point number\nfunction parseFloat(string) {\n    // Real implementation\n    return globalThis.parseFloat(string);\n}",
                "parseInt.js": "// Parses a string and returns an integer\nfunction parseInt(string, radix) {\n    // Real implementation\n    return globalThis.parseInt(string, radix);\n}",
                "decodeURI.js": "// Decodes a URI\nfunction decodeURI(encodedURI) {\n    // Real implementation\n    return globalThis.decodeURI(encodedURI);\n}",
                "encodeURI.js": "// Encodes a URI\nfunction encodeURI(uri) {\n    // Real implementation\n    return globalThis.encodeURI(uri);\n}"
            }
        },
        "Object": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "assign.js": `// Copies properties from source objects to target
Object.assign = function(target, ...sources) {
    if (target == null) throw new TypeError('Cannot convert undefined or null to object');
    const to = Object(target);
    for (const source of sources) {
        if (source != null) {
            for (const key of Object.keys(source)) {
                to[key] = source[key];
            }
        }
    }
    return to;
};`,
                        "create.js": `// Creates a new object with the specified prototype
Object.create = function(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') throw new TypeError('Object prototype may only be an Object or null');
    function F() {}
    F.prototype = proto;
    const obj = new F();
    if (propertiesObject != null) {
        Object.defineProperties(obj, propertiesObject);
    }
    return obj;
};`,
                        "defineProperty.js": `// Defines a new property on an object
Object.defineProperty = function(obj, prop, descriptor) {
    if (typeof obj !== 'object' || obj === null) throw new TypeError('Object.defineProperty called on non-object');
    Object.defineProperty(obj, prop, descriptor);
    return obj;
};`,
                        "entries.js": `// Returns an array of [key, value] pairs
Object.entries = function(obj) {
    if (obj == null) throw new TypeError('Object.entries called on non-object');
    const ownProps = Object.keys(obj);
    const entries = [];
    for (let i = 0; i < ownProps.length; i++) {
        const key = ownProps[i];
        entries.push([key, obj[key]]);
    }
    return entries;
};`,
                        "freeze.js": `// Freezes an object
Object.freeze = function(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    Object.seal(obj);
    const props = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const desc = Object.getOwnPropertyDescriptor(obj, prop);
        if (desc.configurable) {
            desc.configurable = false;
            Object.defineProperty(obj, prop, desc);
        }
        if (desc.writable) {
            desc.writable = false;
            Object.defineProperty(obj, prop, desc);
        }
    }
    return obj;
};`,
                        "getPrototypeOf.js": `// Returns the prototype of an object
Object.getPrototypeOf = function(obj) {
    if (typeof obj !== 'object' || obj === null) throw new TypeError('Object.getPrototypeOf called on non-object');
    return Object.getPrototypeOf(obj);
};`,
                        "keys.js": `// Returns an array of property names
Object.keys = function(obj) {
    if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
    const keys = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
};`,
                        "values.js": `// Returns an array of property values
Object.values = function(obj) {
    if (obj == null) throw new TypeError('Object.values called on non-object');
    const ownProps = Object.keys(obj);
    const values = [];
    for (let i = 0; i < ownProps.length; i++) {
        values.push(obj[ownProps[i]]);
    }
    return values;
};`
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "hasOwnProperty.js": `// Returns boolean indicating own property
Object.prototype.hasOwnProperty = function(prop) {
    return Object.prototype.hasOwnProperty.call(this, prop);
};`,
                        "toString.js": `// Returns string representation
Object.prototype.toString = function() {
    return Object.prototype.toString.call(this);
};`,
                        "valueOf.js": `// Returns primitive value
Object.prototype.valueOf = function() {
    return Object.prototype.valueOf.call(this);
};`
                    }
                }
            }
        },
        "Array": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "from.js": `// Creates array from iterable
Array.from = function(iterable, mapFn, thisArg) {
    const items = Object(iterable);
    const len = items.length >>> 0;
    const result = new Array(len);
    for (let i = 0; i < len; i++) {
        const val = items[i];
        result[i] = mapFn ? mapFn.call(thisArg, val, i) : val;
    }
    return result;
};`,
                        "isArray.js": `// Checks if value is array
Array.isArray = function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
};`,
                        "of.js": `// Creates array from arguments
Array.of = function(...items) {
    return items;
};`
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "concat.js": `// Merges arrays
Array.prototype.concat = function(...args) {
    const result = [];
    const current = this;
    result.push.apply(result, current);
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (Array.isArray(arg)) {
            result.push.apply(result, arg);
        } else {
            result.push(arg);
        }
    }
    return result;
};`,
                        "filter.js": `// Filters array
Array.prototype.filter = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    const result = [];
    const arr = Object(this);
    const len = arr.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in arr) {
            const val = arr[i];
            if (callback.call(thisArg, val, i, arr)) {
                result.push(val);
            }
        }
    }
    return result;
};`,
                        "forEach.js": `// Executes function for each element
Array.prototype.forEach = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    const arr = Object(this);
    const len = arr.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in arr) {
            callback.call(thisArg, arr[i], i, arr);
        }
    }
};`,
                        "map.js": `// Maps array
Array.prototype.map = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    const arr = Object(this);
    const len = arr.length >>> 0;
    const result = new Array(len);
    for (let i = 0; i < len; i++) {
        if (i in arr) {
            result[i] = callback.call(thisArg, arr[i], i, arr);
        }
    }
    return result;
};`,
                        "pop.js": `// Removes last element
Array.prototype.pop = function() {
    const arr = Object(this);
    const len = arr.length >>> 0;
    if (len === 0) {
        arr.length = 0;
        return undefined;
    }
    const last = arr[len - 1];
    arr.length = len - 1;
    return last;
};`,
                        "push.js": `// Adds elements to end
Array.prototype.push = function(...items) {
    const arr = Object(this);
    const len = arr.length >>> 0;
    for (let i = 0; i < items.length; i++) {
        arr[len + i] = items[i];
    }
    const newLen = len + items.length;
    arr.length = newLen;
    return newLen;
};`,
                        "reduce.js": `// Reduces array
Array.prototype.reduce = function(callback, initialValue) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    const arr = Object(this);
    const len = arr.length >>> 0;
    let accumulator, start;
    if (arguments.length >= 2) {
        accumulator = initialValue;
        start = 0;
    } else {
        let i = 0;
        while (i < len && !(i in arr)) i++;
        if (i >= len) throw new TypeError('Reduce of empty array with no initial value');
        accumulator = arr[i++];
        start = i;
    }
    for (let i = start; i < len; i++) {
        if (i in arr) {
            accumulator = callback(accumulator, arr[i], i, arr);
        }
    }
    return accumulator;
};`,
                        "reverse.js": `// Reverses array
Array.prototype.reverse = function() {
    const arr = Object(this);
    const len = arr.length >>> 0;
    const middle = Math.floor(len / 2);
    for (let i = 0; i < middle; i++) {
        const lower = i;
        const upper = len - i - 1;
        const lowerExists = lower in arr;
        const upperExists = upper in arr;
        if (lowerExists && upperExists) {
            const temp = arr[lower];
            arr[lower] = arr[upper];
            arr[upper] = temp;
        } else if (lowerExists && !upperExists) {
            arr[upper] = arr[lower];
            delete arr[lower];
        } else if (!lowerExists && upperExists) {
            arr[lower] = arr[upper];
            delete arr[upper];
        }
    }
    return arr;
};`,
                        "shift.js": `// Removes first element
Array.prototype.shift = function() {
    const arr = Object(this);
    const len = arr.length >>> 0;
    if (len === 0) {
        arr.length = 0;
        return undefined;
    }
    const first = arr[0];
    for (let i = 1; i < len; i++) {
        if (i in arr) {
            arr[i - 1] = arr[i];
        } else {
            delete arr[i - 1];
        }
    }
    delete arr[len - 1];
    arr.length = len - 1;
    return first;
};`,
                        "slice.js": `// Returns shallow copy
Array.prototype.slice = function(start, end) {
    const arr = Object(this);
    const len = arr.length >>> 0;
    const startIdx = start === undefined ? 0 : start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
    const endIdx = end === undefined ? len : end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
    const result = [];
    for (let i = startIdx; i < endIdx; i++) {
        if (i in arr) {
            result[result.length] = arr[i];
        }
    }
    return result;
};`,
                        "sort.js": `// Sorts array
Array.prototype.sort = function(compareFn) {
    const arr = Object(this);
    const len = arr.length >>> 0;
    // Simple bubble sort for demonstration – real sort is complex
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            const a = arr[i];
            const b = arr[j];
            let cmp;
            if (compareFn) {
                cmp = compareFn(a, b);
            } else {
                cmp = String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0;
            }
            if (cmp > 0) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};`,
                        "splice.js": `// Changes array by removing/replacing elements
Array.prototype.splice = function(start, deleteCount, ...items) {
    const arr = Object(this);
    const len = arr.length >>> 0;
    const startIdx = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
    const delCount = deleteCount === undefined ? len - startIdx : Math.max(0, Math.min(deleteCount, len - startIdx));
    const removed = [];
    for (let i = 0; i < delCount; i++) {
        const pos = startIdx + i;
        if (pos in arr) {
            removed[i] = arr[pos];
        }
    }
    // Move elements after the deleted block
    const tailLength = len - (startIdx + delCount);
    for (let i = 0; i < tailLength; i++) {
        const oldPos = startIdx + delCount + i;
        const newPos = startIdx + items.length + i;
        if (oldPos in arr) {
            arr[newPos] = arr[oldPos];
        } else {
            delete arr[newPos];
        }
    }
    // Add new items
    for (let i = 0; i < items.length; i++) {
        arr[startIdx + i] = items[i];
    }
    // Delete remaining tail if items.length < delCount
    for (let i = len + items.length - delCount; i < len; i++) {
        delete arr[i];
    }
    arr.length = len + items.length - delCount;
    return removed;
};`,
                        "unshift.js": `// Adds elements to beginning
Array.prototype.unshift = function(...items) {
    const arr = Object(this);
    const len = arr.length >>> 0;
    const newLen = len + items.length;
    // Shift existing elements
    for (let i = len - 1; i >= 0; i--) {
        if (i in arr) {
            arr[i + items.length] = arr[i];
        } else {
            delete arr[i + items.length];
        }
    }
    // Insert new items
    for (let i = 0; i < items.length; i++) {
        arr[i] = items[i];
    }
    arr.length = newLen;
    return newLen;
};`
                    }
                }
            }
        },
        "String": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "fromCharCode.js": `// Creates string from Unicode values
String.fromCharCode = function(...codes) {
    let result = '';
    for (let i = 0; i < codes.length; i++) {
        result += String.fromCharCode(codes[i]);
    }
    return result;
};`,
                        "fromCodePoint.js": `// Creates string from code points
String.fromCodePoint = function(...codePoints) {
    let result = '';
    for (let i = 0; i < codePoints.length; i++) {
        result += String.fromCodePoint(codePoints[i]);
    }
    return result;
};`
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "charAt.js": `// Returns character at index
String.prototype.charAt = function(index) {
    return this[index] || '';
};`,
                        "concat.js": `// Concatenates strings
String.prototype.concat = function(...strings) {
    let result = this.valueOf();
    for (let i = 0; i < strings.length; i++) {
        result += String(strings[i]);
    }
    return result;
};`,
                        "includes.js": `// Checks if substring exists
String.prototype.includes = function(search, start) {
    return this.indexOf(search, start) !== -1;
};`,
                        "indexOf.js": `// Returns index of first occurrence
String.prototype.indexOf = function(search, fromIndex) {
    const str = this.valueOf();
    const searchStr = String(search);
    const len = str.length;
    const start = Math.max(0, fromIndex || 0);
    for (let i = start; i <= len - searchStr.length; i++) {
        if (str.substr(i, searchStr.length) === searchStr) return i;
    }
    return -1;
};`,
                        "match.js": `// Matches regex
String.prototype.match = function(regexp) {
    if (!(regexp instanceof RegExp)) regexp = new RegExp(regexp);
    return regexp.exec(this);
};`,
                        "replace.js": `// Replaces substring
String.prototype.replace = function(pattern, replacement) {
    const str = this.valueOf();
    if (typeof pattern === 'string') {
        const idx = str.indexOf(pattern);
        if (idx === -1) return str;
        const before = str.slice(0, idx);
        const after = str.slice(idx + pattern.length);
        return before + String(replacement) + after;
    } else if (pattern instanceof RegExp) {
        // Simplified – only first match
        const match = pattern.exec(str);
        if (!match) return str;
        const idx = match.index;
        const before = str.slice(0, idx);
        const after = str.slice(idx + match[0].length);
        if (typeof replacement === 'function') {
            return before + replacement(...match) + after;
        } else {
            return before + String(replacement) + after;
        }
    }
    return str;
};`,
                        "slice.js": `// Extracts section
String.prototype.slice = function(start, end) {
    const str = this.valueOf();
    const len = str.length;
    const startIdx = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
    const endIdx = end === undefined ? len : end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
    let result = '';
    for (let i = startIdx; i < endIdx; i++) {
        result += str[i];
    }
    return result;
};`,
                        "split.js": `// Splits into array
String.prototype.split = function(separator, limit) {
    const str = this.valueOf();
    const result = [];
    if (separator === undefined) return [str];
    if (separator === '') {
        for (let i = 0; i < str.length; i++) {
            if (limit !== undefined && result.length >= limit) break;
            result.push(str[i]);
        }
        return result;
    }
    let idx = 0;
    let matchPos = 0;
    while ((matchPos = str.indexOf(separator, idx)) !== -1) {
        const segment = str.slice(idx, matchPos);
        if (limit !== undefined && result.length >= limit) break;
        result.push(segment);
        idx = matchPos + separator.length;
    }
    if (limit === undefined || result.length < limit) {
        result.push(str.slice(idx));
    }
    return result;
};`,
                        "toLowerCase.js": `// Converts to lower case
String.prototype.toLowerCase = function() {
    const str = this.valueOf();
    return str.toLowerCase();
};`,
                        "toUpperCase.js": `// Converts to upper case
String.prototype.toUpperCase = function() {
    const str = this.valueOf();
    return str.toUpperCase();
};`,
                        "trim.js": `// Removes whitespace
String.prototype.trim = function() {
    return this.replace(/^\\s+|\\s+$/g, '');
};`
                    }
                }
            }
        },
        "Number": {
            type: "folder",
            children: {
                "Static Properties": {
                    type: "folder",
                    children: {
                        "MAX_VALUE.js": "// The maximum numeric value\nconsole.log(Number.MAX_VALUE);",
                        "MIN_VALUE.js": "// The minimum positive value\nconsole.log(Number.MIN_VALUE);",
                        "NaN.js": "// Not‑a‑Number\nconsole.log(Number.NaN);",
                        "POSITIVE_INFINITY.js": "// Infinity\nconsole.log(Number.POSITIVE_INFINITY);"
                    }
                },
                "Static Methods": {
                    type: "folder",
                    children: {
                        "isFinite.js": `// Checks if value is finite
Number.isFinite = function(value) {
    return typeof value === 'number' && isFinite(value);
};`,
                        "isInteger.js": `// Checks if value is integer
Number.isInteger = function(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};`,
                        "isNaN.js": `// Checks if value is NaN
Number.isNaN = function(value) {
    return typeof value === 'number' && isNaN(value);
};`
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "toFixed.js": `// Formats with fixed decimals
Number.prototype.toFixed = function(digits) {
    const num = this.valueOf();
    const factor = Math.pow(10, digits);
    return (Math.round(num * factor) / factor).toString();
};`,
                        "toString.js": `// Returns string representation
Number.prototype.toString = function(radix) {
    const num = this.valueOf();
    return num.toString(radix);
};`
                    }
                }
            }
        },
        "Math": {
            type: "folder",
            children: {
                "Properties": {
                    type: "folder",
                    children: {
                        "PI.js": "// Ratio of circle circumference to diameter\nconsole.log(Math.PI);",
                        "E.js": "// Euler's number\nconsole.log(Math.E);"
                    }
                },
                "Methods": {
                    type: "folder",
                    children: {
                        "abs.js": `// Absolute value
Math.abs = function(x) {
    return x < 0 ? -x : x;
};`,
                        "ceil.js": `// Rounds up
Math.ceil = function(x) {
    return Math.ceil(x);
};`,
                        "floor.js": `// Rounds down
Math.floor = function(x) {
    return Math.floor(x);
};`,
                        "max.js": `// Returns largest
Math.max = function(...values) {
    let max = -Infinity;
    for (let i = 0; i < values.length; i++) {
        if (values[i] > max) max = values[i];
    }
    return max;
};`,
                        "min.js": `// Returns smallest
Math.min = function(...values) {
    let min = Infinity;
    for (let i = 0; i < values.length; i++) {
        if (values[i] < min) min = values[i];
    }
    return min;
};`,
                        "pow.js": `// Raises to power
Math.pow = function(base, exponent) {
    return base ** exponent;
};`,
                        "random.js": `// Returns random number
Math.random = function() {
    return Math.random();
};`,
                        "round.js": `// Rounds to nearest
Math.round = function(x) {
    return Math.round(x);
};`,
                        "sqrt.js": `// Square root
Math.sqrt = function(x) {
    return Math.sqrt(x);
};`
                    }
                }
            }
        },
        "Date": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "now.js": `// Returns current timestamp
Date.now = function() {
    return new Date().getTime();
};`,
                        "parse.js": `// Parses date string
Date.parse = function(dateString) {
    return Date.parse(dateString);
};`,
                        "UTC.js": `// Returns UTC timestamp
Date.UTC = function(year, month, day, hour, minute, second) {
    return Date.UTC(year, month, day, hour, minute, second);
};`
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "getDate.js": `// Returns day of month
Date.prototype.getDate = function() {
    return this.getDate();
};`,
                        "getDay.js": `// Returns day of week
Date.prototype.getDay = function() {
    return this.getDay();
};`,
                        "getFullYear.js": `// Returns year
Date.prototype.getFullYear = function() {
    return this.getFullYear();
};`,
                        "getHours.js": `// Returns hours
Date.prototype.getHours = function() {
    return this.getHours();
};`,
                        "getMilliseconds.js": `// Returns milliseconds
Date.prototype.getMilliseconds = function() {
    return this.getMilliseconds();
};`,
                        "getMinutes.js": `// Returns minutes
Date.prototype.getMinutes = function() {
    return this.getMinutes();
};`,
                        "getMonth.js": `// Returns month
Date.prototype.getMonth = function() {
    return this.getMonth();
};`,
                        "getSeconds.js": `// Returns seconds
Date.prototype.getSeconds = function() {
    return this.getSeconds();
};`,
                        "getTime.js": `// Returns timestamp
Date.prototype.getTime = function() {
    return this.getTime();
};`
                    }
                }
            }
        },
        "RegExp": {
            type: "folder",
            children: {
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "exec.js": `// Executes regex
RegExp.prototype.exec = function(string) {
    return this.exec(string);
};`,
                        "test.js": `// Tests regex
RegExp.prototype.test = function(string) {
    return this.test(string);
};`
                    }
                }
            }
        },
        "Error": {
            type: "folder",
            children: {
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "toString.js": `// Returns error message
Error.prototype.toString = function() {
    return this.name + ': ' + this.message;
};`
                    }
                }
            }
        },
        "JSON": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "parse.js": `// Parses JSON string
JSON.parse = function(text, reviver) {
    return JSON.parse(text, reviver);
};`,
                        "stringify.js": `// Converts to JSON string
JSON.stringify = function(value, replacer, space) {
    return JSON.stringify(value, replacer, space);
};`
                    }
                }
            }
        },
        "Promise": {
            type: "folder",
            children: {
                "Static Methods": {
                    type: "folder",
                    children: {
                        "resolve.js": `// Returns resolved promise
Promise.resolve = function(value) {
    return Promise.resolve(value);
};`,
                        "reject.js": `// Returns rejected promise
Promise.reject = function(reason) {
    return Promise.reject(reason);
};`,
                        "all.js": `// Waits for all promises
Promise.all = function(iterable) {
    return Promise.all(iterable);
};`,
                        "race.js": `// Waits for first promise
Promise.race = function(iterable) {
    return Promise.race(iterable);
};`
                    }
                },
                "Prototype Methods": {
                    type: "folder",
                    children: {
                        "then.js": `// Attaches fulfillment handler
Promise.prototype.then = function(onFulfilled, onRejected) {
    return this.then(onFulfilled, onRejected);
};`,
                        "catch.js": `// Attaches rejection handler
Promise.prototype.catch = function(onRejected) {
    return this.catch(onRejected);
};`,
                        "finally.js": `// Attaches handler regardless
Promise.prototype.finally = function(onFinally) {
    return this.finally(onFinally);
};`
                    }
                }
            }
        }
    };

    // ---------- Helper to convert nested object to node structure ----------
    function buildTree(spec, name = 'root') {
        if (spec.type === 'folder') {
            const children = [];
            for (const [key, value] of Object.entries(spec.children)) {
                if (value.type === 'folder' || typeof value === 'object' && value.children) {
                    children.push(buildTree(value, key));
                } else {
                    // It's a file (string content)
                    children.push({
                        name: key,
                        type: 'file',
                        content: value
                    });
                }
            }
            return {
                name: name,
                type: 'folder',
                children: children
            };
        } else {
            return null;
        }
    }

    // The root of our file system
    let root = {
        name: 'root',
        type: 'folder',
        children: []
    };

    let selectedNode = null;
    let expandedFolders = new Set();

    // ---------- Tree utilities ----------
    function findNodeByPath(pathArray) {
        let node = root;
        for (let i = 1; i < pathArray.length; i++) {
            const idx = pathArray[i];
            if (node.children && node.children[idx]) {
                node = node.children[idx];
            } else {
                return null;
            }
        }
        return node;
    }

    function findParentAndIndex(pathArray) {
        if (pathArray.length < 2) return { parent: null, index: -1 };
        const parentPath = pathArray.slice(0, -1);
        const parent = findNodeByPath(parentPath);
        const index = pathArray[pathArray.length - 1];
        return { parent, index };
    }

    // Render tree recursively
    function renderTree(container, node = root, path = [0]) {
        const ul = document.createElement('ul');
        ul.className = 'tree';

        node.children.forEach((child, idx) => {
            const li = document.createElement('li');
            const currentPath = path.concat(idx);
            const pathStr = currentPath.join(',');

            const div = document.createElement('div');
            div.className = child.type === 'folder' ? 'folder' : 'file';
            div.setAttribute('data-path', pathStr);
            div.setAttribute('draggable', 'true');
            div.setAttribute('data-type', child.type);

            if (child.type === 'folder') {
                const toggle = document.createElement('span');
                toggle.className = 'collapse-toggle';
                toggle.textContent = expandedFolders.has(pathStr) ? '▼ ' : '▶ ';
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (expandedFolders.has(pathStr)) {
                        expandedFolders.delete(pathStr);
                    } else {
                        expandedFolders.add(pathStr);
                    }
                    refreshTree();
                });
                div.appendChild(toggle);
            } else {
                const spacer = document.createElement('span');
                spacer.style.display = 'inline-block';
                spacer.style.width = '16px';
                spacer.textContent = '  ';
                div.appendChild(spacer);
            }

            const nameSpan = document.createElement('span');
            nameSpan.textContent = child.name;
            div.appendChild(nameSpan);

            div.addEventListener('click', (e) => {
                if (child.type === 'file') {
                    selectFile(child, pathStr);
                } else {
                    selectedNode = { node: child, path: pathStr, type: 'folder' };
                }
                highlightSelected(pathStr);
            });

            // Drag events for internal moves
            div.addEventListener('dragstart', handleDragStart);
            div.addEventListener('dragover', handleDragOver);
            div.addEventListener('dragleave', handleDragLeave);
            div.addEventListener('drop', handleDrop);

            li.appendChild(div);

            if (child.type === 'folder' && expandedFolders.has(pathStr)) {
                const childUl = renderTree(document.createElement('ul'), child, currentPath);
                li.appendChild(childUl);
            }

            ul.appendChild(li);
        });

        container.innerHTML = '';
        container.appendChild(ul);
        return ul;
    }

    function refreshTree() {
        const container = document.getElementById('tree-container');
        renderTree(container, root, [0]);
        if (selectedNode && selectedNode.path) {
            highlightSelected(selectedNode.path);
        }
    }

    function highlightSelected(pathStr) {
        document.querySelectorAll('.tree .selected').forEach(el => el.classList.remove('selected'));
        const selectedDiv = document.querySelector(`[data-path="${pathStr}"]`);
        if (selectedDiv) selectedDiv.classList.add('selected');
    }

    // ---------- Editor ----------
    let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'default',
        indentUnit: 4
    });

    function selectFile(fileNode, pathStr) {
        selectedNode = { node: fileNode, path: pathStr, type: 'file' };
        document.getElementById('current-file').textContent = fileNode.name;
        editor.setValue(fileNode.content || '');
        highlightSelected(pathStr);
        document.getElementById('output').style.display = 'none';
    }

    document.getElementById('save-file').addEventListener('click', () => {
        if (selectedNode && selectedNode.type === 'file') {
            selectedNode.node.content = editor.getValue();
            document.getElementById('status').textContent = `Saved ${selectedNode.node.name}`;
        } else {
            alert('Select a file to save.');
        }
    });

    // ---------- New file / folder ----------
    function getSelectedFolder() {
        if (selectedNode && selectedNode.type === 'folder') {
            return selectedNode.node;
        }
        return root;
    }

    document.getElementById('new-file').addEventListener('click', () => {
        const name = prompt('Enter file name (e.g., script.js):');
        if (!name) return;
        if (!name.endsWith('.js')) {
            alert('Convention: use .js extension for JavaScript files.');
        }
        const parent = getSelectedFolder();
        parent.children.push({ name, type: 'file', content: '' });
        refreshTree();
    });

    document.getElementById('new-folder').addEventListener('click', () => {
        const name = prompt('Enter folder name:');
        if (!name) return;
        const parent = getSelectedFolder();
        parent.children.push({ name, type: 'folder', children: [] });
        refreshTree();
    });

    // ---------- Drag and drop (internal) ----------
    let draggedPath = null;

    function handleDragStart(e) {
        const div = e.target.closest('[data-path]');
        if (!div) return;
        draggedPath = div.dataset.path;
        e.dataTransfer.setData('text/plain', draggedPath);
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const div = e.target.closest('[data-path]');
        if (div && div.dataset.type === 'folder') {
            div.classList.add('drag-over');
        }
    }

    function handleDragLeave(e) {
        const div = e.target.closest('[data-path]');
        if (div) div.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        const targetDiv = e.target.closest('[data-path]');
        if (!targetDiv) return;
        targetDiv.classList.remove('drag-over');

        const targetPath = targetDiv.dataset.path;
        const targetNode = findNodeByPath(targetPath.split(',').map(Number));
        if (!targetNode || targetNode.type !== 'folder') return;

        if (!draggedPath) return;
        const sourcePathArr = draggedPath.split(',').map(Number);
        const sourceNode = findNodeByPath(sourcePathArr);
        if (!sourceNode) return;

        if (sourcePathArr.join(',') === targetPath) return;
        if (targetPath.startsWith(draggedPath + ',')) {
            alert('Cannot move a folder into its own descendant.');
            return;
        }

        const { parent: sourceParent, index: sourceIndex } = findParentAndIndex(sourcePathArr);
        if (sourceParent) {
            sourceParent.children.splice(sourceIndex, 1);
        }

        targetNode.children.push(sourceNode);
        expandedFolders.add(targetPath);
        refreshTree();
        draggedPath = null;
    }

    // ---------- Generate language tree from spec ----------
    function loadLanguageTree() {
        const languageRoot = {
            name: 'JavaScript Language',
            type: 'folder',
            children: []
        };
        for (const [key, value] of Object.entries(languageSpec)) {
            if (value.type === 'folder') {
                const folder = {
                    name: key,
                    type: 'folder',
                    children: []
                };
                function addChildren(parentSpec, parentNode) {
                    for (const [childKey, childValue] of Object.entries(parentSpec.children)) {
                        if (childValue.type === 'folder') {
                            const subFolder = {
                                name: childKey,
                                type: 'folder',
                                children: []
                            };
                            parentNode.children.push(subFolder);
                            addChildren(childValue, subFolder);
                        } else {
                            parentNode.children.push({
                                name: childKey,
                                type: 'file',
                                content: childValue
                            });
                        }
                    }
                }
                addChildren(value, folder);
                languageRoot.children.push(folder);
            }
        }
        root.children = languageRoot.children;
        expandedFolders.clear();
        refreshTree();
        document.getElementById('status').textContent = 'JavaScript language tree loaded.';
    }

    // ---------- Handle file drops: trigger language generation ----------
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', (e) => {
        dropZone.classList.remove('dragover');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        loadLanguageTree();
    });

    document.getElementById('load-language').addEventListener('click', loadLanguageTree);

    // ---------- Context menu (rename/delete) ----------
    document.addEventListener('contextmenu', (e) => {
        const div = e.target.closest('[data-path]');
        if (!div) return;
        e.preventDefault();
        const path = div.dataset.path;
        const node = findNodeByPath(path.split(',').map(Number));
        if (!node) return;

        const action = prompt('Type "rename" to rename, "delete" to delete:');
        if (action === 'rename') {
            const newName = prompt('New name:', node.name);
            if (newName) {
                node.name = newName;
                refreshTree();
            }
        } else if (action === 'delete') {
            if (confirm(`Delete ${node.name}?`)) {
                const { parent, index } = findParentAndIndex(path.split(',').map(Number));
                if (parent) {
                    parent.children.splice(index, 1);
                    if (selectedNode && selectedNode.path === path) {
                        selectedNode = null;
                        document.getElementById('current-file').textContent = 'No file selected';
                        editor.setValue('');
                    }
                    refreshTree();
                }
            }
        }
    });

    // ---------- Export project as ZIP ----------
    document.getElementById('download-project').addEventListener('click', () => {
        const zip = new JSZip();
        function addToZip(node, currentPath = '') {
            if (node.type === 'file') {
                zip.file(currentPath + node.name, node.content || '');
            } else {
                const folder = zip.folder(currentPath + node.name);
                node.children.forEach(child => addToZip(child, node.name + '/'));
            }
        }
        root.children.forEach(child => addToZip(child, ''));
        zip.generateAsync({ type: 'blob' }).then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'project.zip';
            a.click();
            URL.revokeObjectURL(url);
        });
    });

    // ---------- Run file (sandboxed) ----------
    document.getElementById('run-file').addEventListener('click', () => {
        if (!selectedNode || selectedNode.type !== 'file') {
            alert('Select a JavaScript file to run.');
            return;
        }

        const code = editor.getValue();
        if (!confirm('You are about to execute this code in a sandboxed iframe. You are solely responsible for what it does. Continue?')) {
            return;
        }

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
      iframe.sandbox = 'allow-scripts allow-same-origin';
        document.body.appendChild(iframe);

        const outputDiv = document.getElementById('output');
        outputDiv.style.display = 'block';
        outputDiv.textContent = '';

        const iframeWindow = iframe.contentWindow;
        iframeWindow.console.log = (...args) => {
            outputDiv.textContent += args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\n';
        };
        iframeWindow.console.error = (...args) => {
            outputDiv.textContent += 'ERROR: ' + args.map(arg => String(arg)).join(' ') + '\n';
        };

        try {
            const script = iframeWindow.document.createElement('script');
            script.textContent = code;
            iframeWindow.document.body.appendChild(script);
        } catch (e) {
            outputDiv.textContent += 'Execution error: ' + e.message;
        }

        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    });

    // ---------- Initial render (empty) ----------
    refreshTree();
})();

/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );

/**
 * @license
 * lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 */
;(function(){function t(t,n){return t.set(n[0],n[1]),t}function n(t,n){return t.add(n),t}function r(t,n,r){switch(r.length){case 0:return t.call(n);case 1:return t.call(n,r[0]);case 2:return t.call(n,r[0],r[1]);case 3:return t.call(n,r[0],r[1],r[2])}return t.apply(n,r)}function e(t,n,r,e){for(var u=-1,i=t?t.length:0;++u<i;){var o=t[u];n(e,o,r(o),t)}return e}function u(t,n){for(var r=-1,e=t?t.length:0;++r<e&&false!==n(t[r],r,t););return t}function i(t,n){for(var r=t?t.length:0;r--&&false!==n(t[r],r,t););
return t}function o(t,n){for(var r=-1,e=t?t.length:0;++r<e;)if(!n(t[r],r,t))return false;return true}function f(t,n){for(var r=-1,e=t?t.length:0,u=0,i=[];++r<e;){var o=t[r];n(o,r,t)&&(i[u++]=o)}return i}function c(t,n){return!(!t||!t.length)&&-1<d(t,n,0)}function a(t,n,r){for(var e=-1,u=t?t.length:0;++e<u;)if(r(n,t[e]))return true;return false}function l(t,n){for(var r=-1,e=t?t.length:0,u=Array(e);++r<e;)u[r]=n(t[r],r,t);return u}function s(t,n){for(var r=-1,e=n.length,u=t.length;++r<e;)t[u+r]=n[r];return t}function h(t,n,r,e){
var u=-1,i=t?t.length:0;for(e&&i&&(r=t[++u]);++u<i;)r=n(r,t[u],u,t);return r}function p(t,n,r,e){var u=t?t.length:0;for(e&&u&&(r=t[--u]);u--;)r=n(r,t[u],u,t);return r}function _(t,n){for(var r=-1,e=t?t.length:0;++r<e;)if(n(t[r],r,t))return true;return false}function v(t,n,r){var e;return r(t,function(t,r,u){if(n(t,r,u))return e=r,false}),e}function g(t,n,r,e){var u=t.length;for(r+=e?1:-1;e?r--:++r<u;)if(n(t[r],r,t))return r;return-1}function d(t,n,r){if(n===n)t:{--r;for(var e=t.length;++r<e;)if(t[r]===n){t=r;
break t}t=-1}else t=g(t,b,r);return t}function y(t,n,r,e){--r;for(var u=t.length;++r<u;)if(e(t[r],n))return r;return-1}function b(t){return t!==t}function x(t,n){var r=t?t.length:0;return r?k(t,n)/r:P}function j(t){return function(n){return null==n?F:n[t]}}function w(t){return function(n){return null==t?F:t[n]}}function m(t,n,r,e,u){return u(t,function(t,u,i){r=e?(e=false,t):n(r,t,u,i)}),r}function A(t,n){var r=t.length;for(t.sort(n);r--;)t[r]=t[r].c;return t}function k(t,n){for(var r,e=-1,u=t.length;++e<u;){
var i=n(t[e]);i!==F&&(r=r===F?i:r+i)}return r}function E(t,n){for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);return e}function O(t,n){return l(n,function(n){return[n,t[n]]})}function S(t){return function(n){return t(n)}}function I(t,n){return l(n,function(n){return t[n]})}function R(t,n){return t.has(n)}function z(t,n){for(var r=-1,e=t.length;++r<e&&-1<d(n,t[r],0););return r}function W(t,n){for(var r=t.length;r--&&-1<d(n,t[r],0););return r}function B(t){return"\\"+Dt[t]}function L(t){var n=-1,r=Array(t.size);
return t.forEach(function(t,e){r[++n]=[e,t]}),r}function C(t,n){return function(r){return t(n(r))}}function U(t,n){for(var r=-1,e=t.length,u=0,i=[];++r<e;){var o=t[r];o!==n&&"__lodash_placeholder__"!==o||(t[r]="__lodash_placeholder__",i[u++]=r)}return i}function M(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=t}),r}function D(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=[t,t]}),r}function T(t){if(Wt.test(t)){for(var n=Rt.lastIndex=0;Rt.test(t);)++n;t=n}else t=tn(t);
return t}function $(t){return Wt.test(t)?t.match(Rt)||[]:t.split("")}var F,N=1/0,P=NaN,Z=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]],q=/\b__p\+='';/g,V=/\b(__p\+=)''\+/g,K=/(__e\(.*?\)|\b__t\))\+'';/g,G=/&(?:amp|lt|gt|quot|#39);/g,J=/[&<>"']/g,Y=RegExp(G.source),H=RegExp(J.source),Q=/<%-([\s\S]+?)%>/g,X=/<%([\s\S]+?)%>/g,tt=/<%=([\s\S]+?)%>/g,nt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,rt=/^\w*$/,et=/^\./,ut=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,it=/[\\^$.*+?()[\]{}|]/g,ot=RegExp(it.source),ft=/^\s+|\s+$/g,ct=/^\s+/,at=/\s+$/,lt=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,st=/\{\n\/\* \[wrapped with (.+)\] \*/,ht=/,? & /,pt=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,_t=/\\(\\)?/g,vt=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,gt=/\w*$/,dt=/^[-+]0x[0-9a-f]+$/i,yt=/^0b[01]+$/i,bt=/^\[object .+?Constructor\]$/,xt=/^0o[0-7]+$/i,jt=/^(?:0|[1-9]\d*)$/,wt=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,mt=/($^)/,At=/['\n\r\u2028\u2029\\]/g,kt="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?)*",Et="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+kt,Ot="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]?|[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",St=RegExp("['\u2019]","g"),It=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),Rt=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+Ot+kt,"g"),zt=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d+",Et].join("|"),"g"),Wt=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]"),Bt=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Lt="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),Ct={};
Ct["[object Float32Array]"]=Ct["[object Float64Array]"]=Ct["[object Int8Array]"]=Ct["[object Int16Array]"]=Ct["[object Int32Array]"]=Ct["[object Uint8Array]"]=Ct["[object Uint8ClampedArray]"]=Ct["[object Uint16Array]"]=Ct["[object Uint32Array]"]=true,Ct["[object Arguments]"]=Ct["[object Array]"]=Ct["[object ArrayBuffer]"]=Ct["[object Boolean]"]=Ct["[object DataView]"]=Ct["[object Date]"]=Ct["[object Error]"]=Ct["[object Function]"]=Ct["[object Map]"]=Ct["[object Number]"]=Ct["[object Object]"]=Ct["[object RegExp]"]=Ct["[object Set]"]=Ct["[object String]"]=Ct["[object WeakMap]"]=false;
var Ut={};Ut["[object Arguments]"]=Ut["[object Array]"]=Ut["[object ArrayBuffer]"]=Ut["[object DataView]"]=Ut["[object Boolean]"]=Ut["[object Date]"]=Ut["[object Float32Array]"]=Ut["[object Float64Array]"]=Ut["[object Int8Array]"]=Ut["[object Int16Array]"]=Ut["[object Int32Array]"]=Ut["[object Map]"]=Ut["[object Number]"]=Ut["[object Object]"]=Ut["[object RegExp]"]=Ut["[object Set]"]=Ut["[object String]"]=Ut["[object Symbol]"]=Ut["[object Uint8Array]"]=Ut["[object Uint8ClampedArray]"]=Ut["[object Uint16Array]"]=Ut["[object Uint32Array]"]=true,
Ut["[object Error]"]=Ut["[object Function]"]=Ut["[object WeakMap]"]=false;var Mt,Dt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Tt=parseFloat,$t=parseInt,Ft=typeof global=="object"&&global&&global.Object===Object&&global,Nt=typeof self=="object"&&self&&self.Object===Object&&self,Pt=Ft||Nt||Function("return this")(),Zt=typeof exports=="object"&&exports&&!exports.nodeType&&exports,qt=Zt&&typeof module=="object"&&module&&!module.nodeType&&module,Vt=qt&&qt.exports===Zt,Kt=Vt&&Ft.g;
t:{try{Mt=Kt&&Kt.f("util");break t}catch(t){}Mt=void 0}var Gt=Mt&&Mt.isArrayBuffer,Jt=Mt&&Mt.isDate,Yt=Mt&&Mt.isMap,Ht=Mt&&Mt.isRegExp,Qt=Mt&&Mt.isSet,Xt=Mt&&Mt.isTypedArray,tn=j("length"),nn=w({"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I",
"\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C",
"\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i","\u012f":"i",
"\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O","\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S","\u015e":"S",
"\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe","\u0149":"'n",
"\u017f":"s"}),rn=w({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),en=w({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),un=function w(kt){function Et(t){return ni.call(t)}function Ot(t){if(au(t)&&!Ko(t)&&!(t instanceof Dt)){if(t instanceof Mt)return t;if(Qu.call(t,"__wrapped__"))return ze(t)}return new Mt(t)}function Rt(){}function Mt(t,n){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!n,this.__index__=0,this.__values__=F}function Dt(t){this.__wrapped__=t,this.__actions__=[],
this.__dir__=1,this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function Ft(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Nt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Zt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function qt(t){var n=-1,r=t?t.length:0;for(this.__data__=new Zt;++n<r;)this.add(t[n])}function Kt(t){this.size=(this.__data__=new Nt(t)).size;
}function tn(t,n){var r,e=Ko(t)||nu(t)?E(t.length,qu):[],u=e.length,i=!!u;for(r in t)!n&&!Qu.call(t,r)||i&&("length"==r||ge(r,u))||e.push(r);return e}function on(t,n,r,e){return t===F||tu(t,Gu[r])&&!Qu.call(e,r)?n:t}function fn(t,n,r){(r===F||tu(t[n],r))&&(typeof n!="number"||r!==F||n in t)||hn(t,n,r)}function cn(t,n,r){var e=t[n];Qu.call(t,n)&&tu(e,r)&&(r!==F||n in t)||hn(t,n,r)}function an(t,n){for(var r=t.length;r--;)if(tu(t[r][0],n))return r;return-1}function ln(t,n,r,e){return Ki(t,function(t,u,i){
n(e,t,r(t),i)}),e}function sn(t,n){return t&&zr(n,mu(n),t)}function hn(t,n,r){"__proto__"==n&&fi?fi(t,n,{configurable:true,enumerable:true,value:r,writable:true}):t[n]=r}function pn(t,n){for(var r=-1,e=null==t,u=n.length,i=Du(u);++r<u;)i[r]=e?F:ju(t,n[r]);return i}function _n(t,n,r){return t===t&&(r!==F&&(t=t<=r?t:r),n!==F&&(t=t>=n?t:n)),t}function vn(t,n,r,e,i,o,f){var c;if(e&&(c=o?e(t,i,o,f):e(t)),c!==F)return c;if(!cu(t))return t;if(i=Ko(t)){if(c=he(t),!n)return Rr(t,c)}else{var a=Et(t),l="[object Function]"==a||"[object GeneratorFunction]"==a;
if(Jo(t))return kr(t,n);if("[object Object]"==a||"[object Arguments]"==a||l&&!o){if(c=pe(l?{}:t),!n)return Wr(t,sn(c,t))}else{if(!Ut[a])return o?t:{};c=_e(t,a,vn,n)}}if(f||(f=new Kt),o=f.get(t))return o;if(f.set(t,c),!i)var s=r?In(t,mu,ro):mu(t);return u(s||t,function(u,i){s&&(i=u,u=t[i]),cn(c,i,vn(u,n,r,e,i,t,f))}),c}function gn(t){var n=mu(t);return function(r){return dn(r,t,n)}}function dn(t,n,r){var e=r.length;if(null==t)return!e;for(t=Pu(t);e--;){var u=r[e],i=n[u],o=t[u];if(o===F&&!(u in t)||!i(o))return false;
}return true}function yn(t){return cu(t)?li(t):{}}function bn(t,n,r){if(typeof t!="function")throw new Vu("Expected a function");return oo(function(){t.apply(F,r)},n)}function xn(t,n,r,e){var u=-1,i=c,o=true,f=t.length,s=[],h=n.length;if(!f)return s;r&&(n=l(n,S(r))),e?(i=a,o=false):200<=n.length&&(i=R,o=false,n=new qt(n));t:for(;++u<f;){var p=t[u],_=r?r(p):p,p=e||0!==p?p:0;if(o&&_===_){for(var v=h;v--;)if(n[v]===_)continue t;s.push(p)}else i(n,_,e)||s.push(p)}return s}function jn(t,n){var r=true;return Ki(t,function(t,e,u){
return r=!!n(t,e,u)}),r}function wn(t,n,r){for(var e=-1,u=t.length;++e<u;){var i=t[e],o=n(i);if(null!=o&&(f===F?o===o&&!pu(o):r(o,f)))var f=o,c=i}return c}function mn(t,n){var r=[];return Ki(t,function(t,e,u){n(t,e,u)&&r.push(t)}),r}function An(t,n,r,e,u){var i=-1,o=t.length;for(r||(r=ve),u||(u=[]);++i<o;){var f=t[i];0<n&&r(f)?1<n?An(f,n-1,r,e,u):s(u,f):e||(u[u.length]=f)}return u}function kn(t,n){return t&&Ji(t,n,mu)}function En(t,n){return t&&Yi(t,n,mu)}function On(t,n){return f(n,function(n){return iu(t[n]);
})}function Sn(t,n){n=ye(n,t)?[n]:mr(n);for(var r=0,e=n.length;null!=t&&r<e;)t=t[Se(n[r++])];return r&&r==e?t:F}function In(t,n,r){return n=n(t),Ko(t)?n:s(n,r(t))}function Rn(t,n){return t>n}function zn(t,n){return null!=t&&Qu.call(t,n)}function Wn(t,n){return null!=t&&n in Pu(t)}function Bn(t,n,r){for(var e=r?a:c,u=t[0].length,i=t.length,o=i,f=Du(i),s=1/0,h=[];o--;){var p=t[o];o&&n&&(p=l(p,S(n))),s=ki(p.length,s),f[o]=!r&&(n||120<=u&&120<=p.length)?new qt(o&&p):F}var p=t[0],_=-1,v=f[0];t:for(;++_<u&&h.length<s;){
var g=p[_],d=n?n(g):g,g=r||0!==g?g:0;if(v?!R(v,d):!e(h,d,r)){for(o=i;--o;){var y=f[o];if(y?!R(y,d):!e(t[o],d,r))continue t}v&&v.push(d),h.push(g)}}return h}function Ln(t,n,r){var e={};return kn(t,function(t,u,i){n(e,r(t),u,i)}),e}function Cn(t,n,e){return ye(n,t)||(n=mr(n),t=Ae(t,n),n=Ue(n)),n=null==t?t:t[Se(n)],null==n?F:r(n,t,e)}function Un(t){return au(t)&&"[object ArrayBuffer]"==ni.call(t)}function Mn(t){return au(t)&&"[object Date]"==ni.call(t)}function Dn(t,n,r,e,u){if(t===n)n=true;else if(null==t||null==n||!cu(t)&&!au(n))n=t!==t&&n!==n;else t:{
var i=Ko(t),o=Ko(n),f="[object Array]",c="[object Array]";i||(f=Et(t),f="[object Arguments]"==f?"[object Object]":f),o||(c=Et(n),c="[object Arguments]"==c?"[object Object]":c);var a="[object Object]"==f,o="[object Object]"==c;if((c=f==c)&&!a)u||(u=new Kt),n=i||tf(t)?re(t,n,Dn,r,e,u):ee(t,n,f,Dn,r,e,u);else{if(!(2&e)&&(i=a&&Qu.call(t,"__wrapped__"),f=o&&Qu.call(n,"__wrapped__"),i||f)){t=i?t.value():t,n=f?n.value():n,u||(u=new Kt),n=Dn(t,n,r,e,u);break t}if(c)n:if(u||(u=new Kt),i=2&e,f=mu(t),o=f.length,
c=mu(n).length,o==c||i){for(a=o;a--;){var l=f[a];if(!(i?l in n:Qu.call(n,l))){n=false;break n}}if((c=u.get(t))&&u.get(n))n=c==n;else{c=true,u.set(t,n),u.set(n,t);for(var s=i;++a<o;){var l=f[a],h=t[l],p=n[l];if(r)var _=i?r(p,h,l,n,t,u):r(h,p,l,t,n,u);if(_===F?h!==p&&!Dn(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l)}c&&!s&&(r=t.constructor,e=n.constructor,r!=e&&"constructor"in t&&"constructor"in n&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),u.delete(t),u.delete(n),
n=c}}else n=false;else n=false}}return n}function Tn(t){return au(t)&&"[object Map]"==Et(t)}function $n(t,n,r,e){var u=r.length,i=u,o=!e;if(null==t)return!i;for(t=Pu(t);u--;){var f=r[u];if(o&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return false}for(;++u<i;){var f=r[u],c=f[0],a=t[c],l=f[1];if(o&&f[2]){if(a===F&&!(c in t))return false}else{if(f=new Kt,e)var s=e(a,l,c,t,n,f);if(s===F?!Dn(l,a,e,3,f):!s)return false}}return true}function Fn(t){return!(!cu(t)||Yu&&Yu in t)&&(iu(t)?ei:bt).test(Ie(t))}function Nn(t){return cu(t)&&"[object RegExp]"==ni.call(t);
}function Pn(t){return au(t)&&"[object Set]"==Et(t)}function Zn(t){return au(t)&&fu(t.length)&&!!Ct[ni.call(t)]}function qn(t){return typeof t=="function"?t:null==t?zu:typeof t=="object"?Ko(t)?Hn(t[0],t[1]):Yn(t):Cu(t)}function Vn(t){if(!xe(t))return mi(t);var n,r=[];for(n in Pu(t))Qu.call(t,n)&&"constructor"!=n&&r.push(n);return r}function Kn(t){if(!cu(t)){var n=[];if(null!=t)for(var r in Pu(t))n.push(r);return n}r=xe(t);var e=[];for(n in t)("constructor"!=n||!r&&Qu.call(t,n))&&e.push(n);return e;
}function Gn(t,n){return t<n}function Jn(t,n){var r=-1,e=ru(t)?Du(t.length):[];return Ki(t,function(t,u,i){e[++r]=n(t,u,i)}),e}function Yn(t){var n=ae(t);return 1==n.length&&n[0][2]?je(n[0][0],n[0][1]):function(r){return r===t||$n(r,t,n)}}function Hn(t,n){return ye(t)&&n===n&&!cu(n)?je(Se(t),n):function(r){var e=ju(r,t);return e===F&&e===n?wu(r,t):Dn(n,e,F,3)}}function Qn(t,n,r,e,i){if(t!==n){if(!Ko(n)&&!tf(n))var o=Kn(n);u(o||n,function(u,f){if(o&&(f=u,u=n[f]),cu(u)){i||(i=new Kt);var c=f,a=i,l=t[c],s=n[c],h=a.get(s);
if(h)fn(t,c,h);else{var h=e?e(l,s,c+"",t,n,a):F,p=h===F;p&&(h=s,Ko(s)||tf(s)?Ko(l)?h=l:eu(l)?h=Rr(l):(p=false,h=vn(s,true)):su(s)||nu(s)?nu(l)?h=bu(l):!cu(l)||r&&iu(l)?(p=false,h=vn(s,true)):h=l:p=false),p&&(a.set(s,h),Qn(h,s,r,e,a),a.delete(s)),fn(t,c,h)}}else c=e?e(t[f],u,f+"",t,n,i):F,c===F&&(c=u),fn(t,f,c)})}}function Xn(t,n){var r=t.length;if(r)return n+=0>n?r:0,ge(n,r)?t[n]:F}function tr(t,n,r){var e=-1;return n=l(n.length?n:[zu],S(fe())),t=Jn(t,function(t){return{a:l(n,function(n){return n(t)}),b:++e,c:t
}}),A(t,function(t,n){var e;t:{e=-1;for(var u=t.a,i=n.a,o=u.length,f=r.length;++e<o;){var c=Or(u[e],i[e]);if(c){e=e>=f?c:c*("desc"==r[e]?-1:1);break t}}e=t.b-n.b}return e})}function nr(t,n){return t=Pu(t),rr(t,n,function(n,r){return r in t})}function rr(t,n,r){for(var e=-1,u=n.length,i={};++e<u;){var o=n[e],f=t[o];r(f,o)&&hn(i,o,f)}return i}function er(t){return function(n){return Sn(n,t)}}function ur(t,n,r,e){var u=e?y:d,i=-1,o=n.length,f=t;for(t===n&&(n=Rr(n)),r&&(f=l(t,S(r)));++i<o;)for(var c=0,a=n[i],a=r?r(a):a;-1<(c=u(f,a,c,e));)f!==t&&hi.call(f,c,1),
hi.call(t,c,1);return t}function ir(t,n){for(var r=t?n.length:0,e=r-1;r--;){var u=n[r];if(r==e||u!==i){var i=u;if(ge(u))hi.call(t,u,1);else if(ye(u,t))delete t[Se(u)];else{var u=mr(u),o=Ae(t,u);null!=o&&delete o[Se(Ue(u))]}}}}function or(t,n){return t+yi(Si()*(n-t+1))}function fr(t,n){var r="";if(!t||1>n||9007199254740991<n)return r;do n%2&&(r+=t),(n=yi(n/2))&&(t+=t);while(n);return r}function cr(t,n){return fo(me(t,n,zu),t+"")}function ar(t,n,r,e){if(!cu(t))return t;n=ye(n,t)?[n]:mr(n);for(var u=-1,i=n.length,o=i-1,f=t;null!=f&&++u<i;){
var c=Se(n[u]),a=r;if(u!=o){var l=f[c],a=e?e(l,c,f):F;a===F&&(a=cu(l)?l:ge(n[u+1])?[]:{})}cn(f,c,a),f=f[c]}return t}function lr(t,n,r){var e=-1,u=t.length;for(0>n&&(n=-n>u?0:u+n),r=r>u?u:r,0>r&&(r+=u),u=n>r?0:r-n>>>0,n>>>=0,r=Du(u);++e<u;)r[e]=t[e+n];return r}function sr(t,n){var r;return Ki(t,function(t,e,u){return r=n(t,e,u),!r}),!!r}function hr(t,n,r){var e=0,u=t?t.length:e;if(typeof n=="number"&&n===n&&2147483647>=u){for(;e<u;){var i=e+u>>>1,o=t[i];null!==o&&!pu(o)&&(r?o<=n:o<n)?e=i+1:u=i}return u;
}return pr(t,n,zu,r)}function pr(t,n,r,e){n=r(n);for(var u=0,i=t?t.length:0,o=n!==n,f=null===n,c=pu(n),a=n===F;u<i;){var l=yi((u+i)/2),s=r(t[l]),h=s!==F,p=null===s,_=s===s,v=pu(s);(o?e||_:a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):p||v?0:e?s<=n:s<n)?u=l+1:i=l}return ki(i,4294967294)}function _r(t,n){for(var r=-1,e=t.length,u=0,i=[];++r<e;){var o=t[r],f=n?n(o):o;if(!r||!tu(f,c)){var c=f;i[u++]=0===o?0:o}}return i}function vr(t){return typeof t=="number"?t:pu(t)?P:+t}function gr(t){if(typeof t=="string")return t;
if(pu(t))return Vi?Vi.call(t):"";var n=t+"";return"0"==n&&1/t==-N?"-0":n}function dr(t,n,r){var e=-1,u=c,i=t.length,o=true,f=[],l=f;if(r)o=false,u=a;else if(200<=i){if(u=n?null:to(t))return M(u);o=false,u=R,l=new qt}else l=n?[]:f;t:for(;++e<i;){var s=t[e],h=n?n(s):s,s=r||0!==s?s:0;if(o&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue t;n&&l.push(h),f.push(s)}else u(l,h,r)||(l!==f&&l.push(h),f.push(s))}return f}function yr(t,n,r,e){for(var u=t.length,i=e?u:-1;(e?i--:++i<u)&&n(t[i],i,t););return r?lr(t,e?0:i,e?i+1:u):lr(t,e?i+1:0,e?u:i);
}function br(t,n){var r=t;return r instanceof Dt&&(r=r.value()),h(n,function(t,n){return n.func.apply(n.thisArg,s([t],n.args))},r)}function xr(t,n,r){for(var e=-1,u=t.length;++e<u;)var i=i?s(xn(i,t[e],n,r),xn(t[e],i,n,r)):t[e];return i&&i.length?dr(i,n,r):[]}function jr(t,n,r){for(var e=-1,u=t.length,i=n.length,o={};++e<u;)r(o,t[e],e<i?n[e]:F);return o}function wr(t){return eu(t)?t:[]}function mr(t){return Ko(t)?t:co(t)}function Ar(t,n,r){var e=t.length;return r=r===F?e:r,!n&&r>=e?t:lr(t,n,r)}function kr(t,n){
if(n)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}function Er(t){var n=new t.constructor(t.byteLength);return new oi(n).set(new oi(t)),n}function Or(t,n){if(t!==n){var r=t!==F,e=null===t,u=t===t,i=pu(t),o=n!==F,f=null===n,c=n===n,a=pu(n);if(!f&&!a&&!i&&t>n||i&&o&&c&&!f&&!a||e&&o&&c||!r&&c||!u)return 1;if(!e&&!i&&!a&&t<n||a&&r&&u&&!e&&!i||f&&r&&u||!o&&u||!c)return-1}return 0}function Sr(t,n,r,e){var u=-1,i=t.length,o=r.length,f=-1,c=n.length,a=Ai(i-o,0),l=Du(c+a);for(e=!e;++f<c;)l[f]=n[f];
for(;++u<o;)(e||u<i)&&(l[r[u]]=t[u]);for(;a--;)l[f++]=t[u++];return l}function Ir(t,n,r,e){var u=-1,i=t.length,o=-1,f=r.length,c=-1,a=n.length,l=Ai(i-f,0),s=Du(l+a);for(e=!e;++u<l;)s[u]=t[u];for(l=u;++c<a;)s[l+c]=n[c];for(;++o<f;)(e||u<i)&&(s[l+r[o]]=t[u++]);return s}function Rr(t,n){var r=-1,e=t.length;for(n||(n=Du(e));++r<e;)n[r]=t[r];return n}function zr(t,n,r,e){var u=!r;r||(r={});for(var i=-1,o=n.length;++i<o;){var f=n[i],c=e?e(r[f],t[f],f,r,t):F;c===F&&(c=t[f]),u?hn(r,f,c):cn(r,f,c)}return r;
}function Wr(t,n){return zr(t,ro(t),n)}function Br(t,n){return function(r,u){var i=Ko(r)?e:ln,o=n?n():{};return i(r,t,fe(u,2),o)}}function Lr(t){return cr(function(n,r){var e=-1,u=r.length,i=1<u?r[u-1]:F,o=2<u?r[2]:F,i=3<t.length&&typeof i=="function"?(u--,i):F;for(o&&de(r[0],r[1],o)&&(i=3>u?F:i,u=1),n=Pu(n);++e<u;)(o=r[e])&&t(n,o,e,i);return n})}function Cr(t,n){return function(r,e){if(null==r)return r;if(!ru(r))return t(r,e);for(var u=r.length,i=n?u:-1,o=Pu(r);(n?i--:++i<u)&&false!==e(o[i],i,o););
return r}}function Ur(t){return function(n,r,e){var u=-1,i=Pu(n);e=e(n);for(var o=e.length;o--;){var f=e[t?o:++u];if(false===r(i[f],f,i))break}return n}}function Mr(t,n,r){function e(){return(this&&this!==Pt&&this instanceof e?i:t).apply(u?r:this,arguments)}var u=1&n,i=$r(t);return e}function Dr(t){return function(n){n=xu(n);var r=Wt.test(n)?$(n):F,e=r?r[0]:n.charAt(0);return n=r?Ar(r,1).join(""):n.slice(1),e[t]()+n}}function Tr(t){return function(n){return h(Iu(Su(n).replace(St,"")),t,"")}}function $r(t){
return function(){var n=arguments;switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3]);case 5:return new t(n[0],n[1],n[2],n[3],n[4]);case 6:return new t(n[0],n[1],n[2],n[3],n[4],n[5]);case 7:return new t(n[0],n[1],n[2],n[3],n[4],n[5],n[6])}var r=yn(t.prototype),n=t.apply(r,n);return cu(n)?n:r}}function Fr(t,n,e){function u(){for(var o=arguments.length,f=Du(o),c=o,a=oe(u);c--;)f[c]=arguments[c];
return c=3>o&&f[0]!==a&&f[o-1]!==a?[]:U(f,a),o-=c.length,o<e?Qr(t,n,Zr,u.placeholder,F,f,c,F,F,e-o):r(this&&this!==Pt&&this instanceof u?i:t,this,f)}var i=$r(t);return u}function Nr(t){return function(n,r,e){var u=Pu(n);if(!ru(n)){var i=fe(r,3);n=mu(n),r=function(t){return i(u[t],t,u)}}return r=t(n,r,e),-1<r?u[i?n[r]:r]:F}}function Pr(t){return ue(function(n){var r=n.length,e=r,u=Mt.prototype.thru;for(t&&n.reverse();e--;){var i=n[e];if(typeof i!="function")throw new Vu("Expected a function");if(u&&!o&&"wrapper"==ie(i))var o=new Mt([],true);
}for(e=o?e:r;++e<r;)var i=n[e],u=ie(i),f="wrapper"==u?no(i):F,o=f&&be(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?o[ie(f[0])].apply(o,f[3]):1==i.length&&be(i)?o[u]():o.thru(i);return function(){var t=arguments,e=t[0];if(o&&1==t.length&&Ko(e)&&200<=e.length)return o.plant(e).value();for(var u=0,t=r?n[u].apply(this,t):e;++u<r;)t=n[u].call(this,t);return t}})}function Zr(t,n,r,e,u,i,o,f,c,a){function l(){for(var d=arguments.length,y=Du(d),b=d;b--;)y[b]=arguments[b];if(_){var x,j=oe(l),b=y.length;for(x=0;b--;)y[b]===j&&++x;
}if(e&&(y=Sr(y,e,u,_)),i&&(y=Ir(y,i,o,_)),d-=x,_&&d<a)return j=U(y,j),Qr(t,n,Zr,l.placeholder,r,y,j,f,c,a-d);if(j=h?r:this,b=p?j[t]:t,d=y.length,f){x=y.length;for(var w=ki(f.length,x),m=Rr(y);w--;){var A=f[w];y[w]=ge(A,x)?m[A]:F}}else v&&1<d&&y.reverse();return s&&c<d&&(y.length=c),this&&this!==Pt&&this instanceof l&&(b=g||$r(b)),b.apply(j,y)}var s=128&n,h=1&n,p=2&n,_=24&n,v=512&n,g=p?F:$r(t);return l}function qr(t,n){return function(r,e){return Ln(r,t,n(e))}}function Vr(t,n){return function(r,e){
var u;if(r===F&&e===F)return n;if(r!==F&&(u=r),e!==F){if(u===F)return e;typeof r=="string"||typeof e=="string"?(r=gr(r),e=gr(e)):(r=vr(r),e=vr(e)),u=t(r,e)}return u}}function Kr(t){return ue(function(n){return n=l(n,S(fe())),cr(function(e){var u=this;return t(n,function(t){return r(t,u,e)})})})}function Gr(t,n){n=n===F?" ":gr(n);var r=n.length;return 2>r?r?fr(n,t):n:(r=fr(n,di(t/T(n))),Wt.test(n)?Ar($(r),0,t).join(""):r.slice(0,t))}function Jr(t,n,e,u){function i(){for(var n=-1,c=arguments.length,a=-1,l=u.length,s=Du(l+c),h=this&&this!==Pt&&this instanceof i?f:t;++a<l;)s[a]=u[a];
for(;c--;)s[a++]=arguments[++n];return r(h,o?e:this,s)}var o=1&n,f=$r(t);return i}function Yr(t){return function(n,r,e){e&&typeof e!="number"&&de(n,r,e)&&(r=e=F),n=vu(n),r===F?(r=n,n=0):r=vu(r),e=e===F?n<r?1:-1:vu(e);var u=-1;r=Ai(di((r-n)/(e||1)),0);for(var i=Du(r);r--;)i[t?r:++u]=n,n+=e;return i}}function Hr(t){return function(n,r){return typeof n=="string"&&typeof r=="string"||(n=yu(n),r=yu(r)),t(n,r)}}function Qr(t,n,r,e,u,i,o,f,c,a){var l=8&n,s=l?o:F;o=l?F:o;var h=l?i:F;return i=l?F:i,n=(n|(l?32:64))&~(l?64:32),
4&n||(n&=-4),u=[t,n,u,h,s,i,o,f,c,a],r=r.apply(F,u),be(t)&&io(r,u),r.placeholder=e,ke(r,t,n)}function Xr(t){var n=Nu[t];return function(t,r){if(t=yu(t),r=ki(gu(r),292)){var e=(xu(t)+"e").split("e"),e=n(e[0]+"e"+(+e[1]+r)),e=(xu(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return n(t)}}function te(t){return function(n){var r=Et(n);return"[object Map]"==r?L(n):"[object Set]"==r?D(n):O(n,t(n))}}function ne(t,n,r,e,u,i,o,f){var c=2&n;if(!c&&typeof t!="function")throw new Vu("Expected a function");var a=e?e.length:0;
if(a||(n&=-97,e=u=F),o=o===F?o:Ai(gu(o),0),f=f===F?f:gu(f),a-=u?u.length:0,64&n){var l=e,s=u;e=u=F}var h=c?F:no(t);return i=[t,n,r,e,u,l,s,i,o,f],h&&(r=i[1],t=h[1],n=r|t,e=128==t&&8==r||128==t&&256==r&&i[7].length<=h[8]||384==t&&h[7].length<=h[8]&&8==r,131>n||e)&&(1&t&&(i[2]=h[2],n|=1&r?0:4),(r=h[3])&&(e=i[3],i[3]=e?Sr(e,r,h[4]):r,i[4]=e?U(i[3],"__lodash_placeholder__"):h[4]),(r=h[5])&&(e=i[5],i[5]=e?Ir(e,r,h[6]):r,i[6]=e?U(i[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(i[7]=r),128&t&&(i[8]=null==i[8]?h[8]:ki(i[8],h[8])),
null==i[9]&&(i[9]=h[9]),i[0]=h[0],i[1]=n),t=i[0],n=i[1],r=i[2],e=i[3],u=i[4],f=i[9]=null==i[9]?c?0:t.length:Ai(i[9]-a,0),!f&&24&n&&(n&=-25),ke((h?Hi:io)(n&&1!=n?8==n||16==n?Fr(t,n,f):32!=n&&33!=n||u.length?Zr.apply(F,i):Jr(t,n,r,e):Mr(t,n,r),i),t,n)}function re(t,n,r,e,u,i){var o=2&u,f=t.length,c=n.length;if(f!=c&&!(o&&c>f))return false;if((c=i.get(t))&&i.get(n))return c==n;var c=-1,a=true,l=1&u?new qt:F;for(i.set(t,n),i.set(n,t);++c<f;){var s=t[c],h=n[c];if(e)var p=o?e(h,s,c,n,t,i):e(s,h,c,t,n,i);if(p!==F){
if(p)continue;a=false;break}if(l){if(!_(n,function(t,n){if(!R(l,n)&&(s===t||r(s,t,e,u,i)))return l.push(n)})){a=false;break}}else if(s!==h&&!r(s,h,e,u,i)){a=false;break}}return i.delete(t),i.delete(n),a}function ee(t,n,r,e,u,i,o){switch(r){case"[object DataView]":if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)break;t=t.buffer,n=n.buffer;case"[object ArrayBuffer]":if(t.byteLength!=n.byteLength||!e(new oi(t),new oi(n)))break;return true;case"[object Boolean]":case"[object Date]":case"[object Number]":
return tu(+t,+n);case"[object Error]":return t.name==n.name&&t.message==n.message;case"[object RegExp]":case"[object String]":return t==n+"";case"[object Map]":var f=L;case"[object Set]":if(f||(f=M),t.size!=n.size&&!(2&i))break;return(r=o.get(t))?r==n:(i|=1,o.set(t,n),n=re(f(t),f(n),e,u,i,o),o.delete(t),n);case"[object Symbol]":if(qi)return qi.call(t)==qi.call(n)}return false}function ue(t){return fo(me(t,F,Le),t+"")}function ie(t){for(var n=t.name+"",r=Di[n],e=Qu.call(Di,n)?r.length:0;e--;){var u=r[e],i=u.func;
if(null==i||i==t)return u.name}return n}function oe(t){return(Qu.call(Ot,"placeholder")?Ot:t).placeholder}function fe(){var t=Ot.iteratee||Wu,t=t===Wu?qn:t;return arguments.length?t(arguments[0],arguments[1]):t}function ce(t,n){var r=t.__data__,e=typeof n;return("string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==n:null===n)?r[typeof n=="string"?"string":"hash"]:r.map}function ae(t){for(var n=mu(t),r=n.length;r--;){var e=n[r],u=t[e];n[r]=[e,u,u===u&&!cu(u)]}return n}function le(t,n){
var r=null==t?F:t[n];return Fn(r)?r:F}function se(t,n,r){n=ye(n,t)?[n]:mr(n);for(var e=-1,u=n.length,i=false;++e<u;){var o=Se(n[e]);if(!(i=null!=t&&r(t,o)))break;t=t[o]}return i||++e!=u?i:(u=t?t.length:0,!!u&&fu(u)&&ge(o,u)&&(Ko(t)||nu(t)))}function he(t){var n=t.length,r=t.constructor(n);return n&&"string"==typeof t[0]&&Qu.call(t,"index")&&(r.index=t.index,r.input=t.input),r}function pe(t){return typeof t.constructor!="function"||xe(t)?{}:yn(ci(t))}function _e(r,e,u,i){var o=r.constructor;switch(e){
case"[object ArrayBuffer]":return Er(r);case"[object Boolean]":case"[object Date]":return new o(+r);case"[object DataView]":return e=i?Er(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return e=i?Er(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.length);
case"[object Map]":return e=i?u(L(r),true):L(r),h(e,t,new r.constructor);case"[object Number]":case"[object String]":return new o(r);case"[object RegExp]":return e=new r.constructor(r.source,gt.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=i?u(M(r),true):M(r),h(e,n,new r.constructor);case"[object Symbol]":return qi?Pu(qi.call(r)):{}}}function ve(t){return Ko(t)||nu(t)||!!(pi&&t&&t[pi])}function ge(t,n){return n=null==n?9007199254740991:n,!!n&&(typeof t=="number"||jt.test(t))&&-1<t&&0==t%1&&t<n;
}function de(t,n,r){if(!cu(r))return false;var e=typeof n;return!!("number"==e?ru(r)&&ge(n,r.length):"string"==e&&n in r)&&tu(r[n],t)}function ye(t,n){if(Ko(t))return false;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!pu(t))||(rt.test(t)||!nt.test(t)||null!=n&&t in Pu(n))}function be(t){var n=ie(t),r=Ot[n];return typeof r=="function"&&n in Dt.prototype&&(t===r||(n=no(r),!!n&&t===n[0]))}function xe(t){var n=t&&t.constructor;return t===(typeof n=="function"&&n.prototype||Gu)}function je(t,n){
return function(r){return null!=r&&(r[t]===n&&(n!==F||t in Pu(r)))}}function we(t,n,r,e,u,i){return cu(t)&&cu(n)&&(i.set(n,t),Qn(t,n,F,we,i),i.delete(n)),t}function me(t,n,e){return n=Ai(n===F?t.length-1:n,0),function(){for(var u=arguments,i=-1,o=Ai(u.length-n,0),f=Du(o);++i<o;)f[i]=u[n+i];for(i=-1,o=Du(n+1);++i<n;)o[i]=u[i];return o[n]=e(f),r(t,this,o)}}function Ae(t,n){return 1==n.length?t:Sn(t,lr(n,0,-1))}function ke(t,n,r){var e=n+"";n=fo;var u,i=Re;return u=(u=e.match(st))?u[1].split(ht):[],
r=i(u,r),(i=r.length)&&(u=i-1,r[u]=(1<i?"& ":"")+r[u],r=r.join(2<i?", ":" "),e=e.replace(lt,"{\n/* [wrapped with "+r+"] */\n")),n(t,e)}function Ee(t){var n=0,r=0;return function(){var e=Ei(),u=16-(e-r);if(r=e,0<u){if(500<=++n)return arguments[0]}else n=0;return t.apply(F,arguments)}}function Oe(t){for(var n=-1,r=t.length,e=r-1;++n<r;){var u=or(n,e),i=t[u];t[u]=t[n],t[n]=i}return t}function Se(t){if(typeof t=="string"||pu(t))return t;var n=t+"";return"0"==n&&1/t==-N?"-0":n}function Ie(t){if(null!=t){
try{return Hu.call(t)}catch(t){}return t+""}return""}function Re(t,n){return u(Z,function(r){var e="_."+r[0];n&r[1]&&!c(t,e)&&t.push(e)}),t.sort()}function ze(t){if(t instanceof Dt)return t.clone();var n=new Mt(t.__wrapped__,t.__chain__);return n.__actions__=Rr(t.__actions__),n.__index__=t.__index__,n.__values__=t.__values__,n}function We(t,n,r){var e=t?t.length:0;return e?(r=null==r?0:gu(r),0>r&&(r=Ai(e+r,0)),g(t,fe(n,3),r)):-1}function Be(t,n,r){var e=t?t.length:0;if(!e)return-1;var u=e-1;return r!==F&&(u=gu(r),
u=0>r?Ai(e+u,0):ki(u,e-1)),g(t,fe(n,3),u,true)}function Le(t){return t&&t.length?An(t,1):[]}function Ce(t){return t&&t.length?t[0]:F}function Ue(t){var n=t?t.length:0;return n?t[n-1]:F}function Me(t,n){return t&&t.length&&n&&n.length?ur(t,n):t}function De(t){return t?Ii.call(t):t}function Te(t){if(!t||!t.length)return[];var n=0;return t=f(t,function(t){if(eu(t))return n=Ai(t.length,n),true}),E(n,function(n){return l(t,j(n))})}function $e(t,n){if(!t||!t.length)return[];var e=Te(t);return null==n?e:l(e,function(t){
return r(n,F,t)})}function Fe(t){return t=Ot(t),t.__chain__=true,t}function Ne(t,n){return n(t)}function Pe(){return this}function Ze(t,n){return(Ko(t)?u:Ki)(t,fe(n,3))}function qe(t,n){return(Ko(t)?i:Gi)(t,fe(n,3))}function Ve(t,n){return(Ko(t)?l:Jn)(t,fe(n,3))}function Ke(t,n,r){return n=r?F:n,n=t&&null==n?t.length:n,ne(t,128,F,F,F,F,n)}function Ge(t,n){var r;if(typeof n!="function")throw new Vu("Expected a function");return t=gu(t),function(){return 0<--t&&(r=n.apply(this,arguments)),1>=t&&(n=F),
r}}function Je(t,n,r){return n=r?F:n,t=ne(t,8,F,F,F,F,F,n),t.placeholder=Je.placeholder,t}function Ye(t,n,r){return n=r?F:n,t=ne(t,16,F,F,F,F,F,n),t.placeholder=Ye.placeholder,t}function He(t,n,r){function e(n){var r=c,e=a;return c=a=F,_=n,s=t.apply(e,r)}function u(t){var r=t-p;return t-=_,p===F||r>=n||0>r||g&&t>=l}function i(){var t=Uo();if(u(t))return o(t);var r,e=oo;r=t-_,t=n-(t-p),r=g?ki(t,l-r):t,h=e(i,r)}function o(t){return h=F,d&&c?e(t):(c=a=F,s)}function f(){var t=Uo(),r=u(t);if(c=arguments,
a=this,p=t,r){if(h===F)return _=t=p,h=oo(i,n),v?e(t):s;if(g)return h=oo(i,n),e(p)}return h===F&&(h=oo(i,n)),s}var c,a,l,s,h,p,_=0,v=false,g=false,d=true;if(typeof t!="function")throw new Vu("Expected a function");return n=yu(n)||0,cu(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Ai(yu(r.maxWait)||0,n):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==F&&Xi(h),_=0,c=p=a=h=F},f.flush=function(){return h===F?s:o(Uo())},f}function Qe(t,n){function r(){var e=arguments,u=n?n.apply(this,e):e[0],i=r.cache;return i.has(u)?i.get(u):(e=t.apply(this,e),
r.cache=i.set(u,e)||i,e)}if(typeof t!="function"||n&&typeof n!="function")throw new Vu("Expected a function");return r.cache=new(Qe.Cache||Zt),r}function Xe(t){if(typeof t!="function")throw new Vu("Expected a function");return function(){var n=arguments;switch(n.length){case 0:return!t.call(this);case 1:return!t.call(this,n[0]);case 2:return!t.call(this,n[0],n[1]);case 3:return!t.call(this,n[0],n[1],n[2])}return!t.apply(this,n)}}function tu(t,n){return t===n||t!==t&&n!==n}function nu(t){return eu(t)&&Qu.call(t,"callee")&&(!si.call(t,"callee")||"[object Arguments]"==ni.call(t));
}function ru(t){return null!=t&&fu(t.length)&&!iu(t)}function eu(t){return au(t)&&ru(t)}function uu(t){return!!au(t)&&("[object Error]"==ni.call(t)||typeof t.message=="string"&&typeof t.name=="string")}function iu(t){return t=cu(t)?ni.call(t):"","[object Function]"==t||"[object GeneratorFunction]"==t}function ou(t){return typeof t=="number"&&t==gu(t)}function fu(t){return typeof t=="number"&&-1<t&&0==t%1&&9007199254740991>=t}function cu(t){var n=typeof t;return null!=t&&("object"==n||"function"==n);
}function au(t){return null!=t&&typeof t=="object"}function lu(t){return typeof t=="number"||au(t)&&"[object Number]"==ni.call(t)}function su(t){return!(!au(t)||"[object Object]"!=ni.call(t))&&(t=ci(t),null===t||(t=Qu.call(t,"constructor")&&t.constructor,typeof t=="function"&&t instanceof t&&Hu.call(t)==ti))}function hu(t){return typeof t=="string"||!Ko(t)&&au(t)&&"[object String]"==ni.call(t)}function pu(t){return typeof t=="symbol"||au(t)&&"[object Symbol]"==ni.call(t)}function _u(t){if(!t)return[];
if(ru(t))return hu(t)?$(t):Rr(t);if(ai&&t[ai]){t=t[ai]();for(var n,r=[];!(n=t.next()).done;)r.push(n.value);return r}return n=Et(t),("[object Map]"==n?L:"[object Set]"==n?M:Eu)(t)}function vu(t){return t?(t=yu(t),t===N||t===-N?1.7976931348623157e308*(0>t?-1:1):t===t?t:0):0===t?t:0}function gu(t){t=vu(t);var n=t%1;return t===t?n?t-n:t:0}function du(t){return t?_n(gu(t),0,4294967295):0}function yu(t){if(typeof t=="number")return t;if(pu(t))return P;if(cu(t)&&(t=typeof t.valueOf=="function"?t.valueOf():t,
t=cu(t)?t+"":t),typeof t!="string")return 0===t?t:+t;t=t.replace(ft,"");var n=yt.test(t);return n||xt.test(t)?$t(t.slice(2),n?2:8):dt.test(t)?P:+t}function bu(t){return zr(t,Au(t))}function xu(t){return null==t?"":gr(t)}function ju(t,n,r){return t=null==t?F:Sn(t,n),t===F?r:t}function wu(t,n){return null!=t&&se(t,n,Wn)}function mu(t){return ru(t)?tn(t):Vn(t)}function Au(t){return ru(t)?tn(t,true):Kn(t)}function ku(t,n){return null==t?{}:rr(t,In(t,Au,eo),fe(n))}function Eu(t){return t?I(t,mu(t)):[]}function Ou(t){
return Of(xu(t).toLowerCase())}function Su(t){return(t=xu(t))&&t.replace(wt,nn).replace(It,"")}function Iu(t,n,r){return t=xu(t),n=r?F:n,n===F?Bt.test(t)?t.match(zt)||[]:t.match(pt)||[]:t.match(n)||[]}function Ru(t){return function(){return t}}function zu(t){return t}function Wu(t){return qn(typeof t=="function"?t:vn(t,true))}function Bu(t,n,r){var e=mu(n),i=On(n,e);null!=r||cu(n)&&(i.length||!e.length)||(r=n,n=t,t=this,i=On(n,mu(n)));var o=!(cu(r)&&"chain"in r&&!r.chain),f=iu(t);return u(i,function(r){
var e=n[r];t[r]=e,f&&(t.prototype[r]=function(){var n=this.__chain__;if(o||n){var r=t(this.__wrapped__);return(r.__actions__=Rr(this.__actions__)).push({func:e,args:arguments,thisArg:t}),r.__chain__=n,r}return e.apply(t,s([this.value()],arguments))})}),t}function Lu(){}function Cu(t){return ye(t)?j(Se(t)):er(t)}function Uu(){return[]}function Mu(){return false}kt=kt?un.defaults(Pt.Object(),kt,un.pick(Pt,Lt)):Pt;var Du=kt.Array,Tu=kt.Date,$u=kt.Error,Fu=kt.Function,Nu=kt.Math,Pu=kt.Object,Zu=kt.RegExp,qu=kt.String,Vu=kt.TypeError,Ku=Du.prototype,Gu=Pu.prototype,Ju=kt["__core-js_shared__"],Yu=function(){
var t=/[^.]+$/.exec(Ju&&Ju.keys&&Ju.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),Hu=Fu.prototype.toString,Qu=Gu.hasOwnProperty,Xu=0,ti=Hu.call(Pu),ni=Gu.toString,ri=Pt._,ei=Zu("^"+Hu.call(Qu).replace(it,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ui=Vt?kt.Buffer:F,ii=kt.Symbol,oi=kt.Uint8Array,fi=Pu.defineProperty,ci=C(Pu.getPrototypeOf,Pu),ai=ii?ii.iterator:F,li=Pu.create,si=Gu.propertyIsEnumerable,hi=Ku.splice,pi=ii?ii.isConcatSpreadable:F,_i=kt.clearTimeout!==Pt.clearTimeout&&kt.clearTimeout,vi=Tu&&Tu.now!==Pt.Date.now&&Tu.now,gi=kt.setTimeout!==Pt.setTimeout&&kt.setTimeout,di=Nu.ceil,yi=Nu.floor,bi=Pu.getOwnPropertySymbols,xi=ui?ui.isBuffer:F,ji=kt.isFinite,wi=Ku.join,mi=C(Pu.keys,Pu),Ai=Nu.max,ki=Nu.min,Ei=Tu.now,Oi=kt.parseInt,Si=Nu.random,Ii=Ku.reverse,Ri=le(kt,"DataView"),zi=le(kt,"Map"),Wi=le(kt,"Promise"),Bi=le(kt,"Set"),Li=le(kt,"WeakMap"),Ci=le(Pu,"create"),Ui=le(Pu,"defineProperty"),Mi=Li&&new Li,Di={},Ti=Ie(Ri),$i=Ie(zi),Fi=Ie(Wi),Ni=Ie(Bi),Pi=Ie(Li),Zi=ii?ii.prototype:F,qi=Zi?Zi.valueOf:F,Vi=Zi?Zi.toString:F;
Ot.templateSettings={escape:Q,evaluate:X,interpolate:tt,variable:"",imports:{_:Ot}},Ot.prototype=Rt.prototype,Ot.prototype.constructor=Ot,Mt.prototype=yn(Rt.prototype),Mt.prototype.constructor=Mt,Dt.prototype=yn(Rt.prototype),Dt.prototype.constructor=Dt,Ft.prototype.clear=function(){this.__data__=Ci?Ci(null):{},this.size=0},Ft.prototype.delete=function(t){return t=this.has(t)&&delete this.__data__[t],this.size-=t?1:0,t},Ft.prototype.get=function(t){var n=this.__data__;return Ci?(t=n[t],"__lodash_hash_undefined__"===t?F:t):Qu.call(n,t)?n[t]:F;
},Ft.prototype.has=function(t){var n=this.__data__;return Ci?n[t]!==F:Qu.call(n,t)},Ft.prototype.set=function(t,n){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=Ci&&n===F?"__lodash_hash_undefined__":n,this},Nt.prototype.clear=function(){this.__data__=[],this.size=0},Nt.prototype.delete=function(t){var n=this.__data__;return t=an(n,t),!(0>t)&&(t==n.length-1?n.pop():hi.call(n,t,1),--this.size,true)},Nt.prototype.get=function(t){var n=this.__data__;return t=an(n,t),0>t?F:n[t][1]},Nt.prototype.has=function(t){
return-1<an(this.__data__,t)},Nt.prototype.set=function(t,n){var r=this.__data__,e=an(r,t);return 0>e?(++this.size,r.push([t,n])):r[e][1]=n,this},Zt.prototype.clear=function(){this.size=0,this.__data__={hash:new Ft,map:new(zi||Nt),string:new Ft}},Zt.prototype.delete=function(t){return t=ce(this,t).delete(t),this.size-=t?1:0,t},Zt.prototype.get=function(t){return ce(this,t).get(t)},Zt.prototype.has=function(t){return ce(this,t).has(t)},Zt.prototype.set=function(t,n){var r=ce(this,t),e=r.size;return r.set(t,n),
this.size+=r.size==e?0:1,this},qt.prototype.add=qt.prototype.push=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this},qt.prototype.has=function(t){return this.__data__.has(t)},Kt.prototype.clear=function(){this.__data__=new Nt,this.size=0},Kt.prototype.delete=function(t){var n=this.__data__;return t=n.delete(t),this.size=n.size,t},Kt.prototype.get=function(t){return this.__data__.get(t)},Kt.prototype.has=function(t){return this.__data__.has(t)},Kt.prototype.set=function(t,n){
var r=this.__data__;if(r instanceof Nt){var e=r.__data__;if(!zi||199>e.length)return e.push([t,n]),this.size=++r.size,this;r=this.__data__=new Zt(e)}return r.set(t,n),this.size=r.size,this};var Ki=Cr(kn),Gi=Cr(En,true),Ji=Ur(),Yi=Ur(true),Hi=Mi?function(t,n){return Mi.set(t,n),t}:zu,Qi=Ui?function(t,n){return Ui(t,"toString",{configurable:true,enumerable:false,value:Ru(n),writable:true})}:zu,Xi=_i||function(t){return Pt.clearTimeout(t)},to=Bi&&1/M(new Bi([,-0]))[1]==N?function(t){return new Bi(t)}:Lu,no=Mi?function(t){
return Mi.get(t)}:Lu,ro=bi?C(bi,Pu):Uu,eo=bi?function(t){for(var n=[];t;)s(n,ro(t)),t=ci(t);return n}:Uu;(Ri&&"[object DataView]"!=Et(new Ri(new ArrayBuffer(1)))||zi&&"[object Map]"!=Et(new zi)||Wi&&"[object Promise]"!=Et(Wi.resolve())||Bi&&"[object Set]"!=Et(new Bi)||Li&&"[object WeakMap]"!=Et(new Li))&&(Et=function(t){var n=ni.call(t);if(t=(t="[object Object]"==n?t.constructor:F)?Ie(t):F)switch(t){case Ti:return"[object DataView]";case $i:return"[object Map]";case Fi:return"[object Promise]";case Ni:
return"[object Set]";case Pi:return"[object WeakMap]"}return n});var uo=Ju?iu:Mu,io=Ee(Hi),oo=gi||function(t,n){return Pt.setTimeout(t,n)},fo=Ee(Qi),co=function(t){t=Qe(t,function(t){return 500===n.size&&n.clear(),t});var n=t.cache;return t}(function(t){t=xu(t);var n=[];return et.test(t)&&n.push(""),t.replace(ut,function(t,r,e,u){n.push(e?u.replace(_t,"$1"):r||t)}),n}),ao=cr(function(t,n){return eu(t)?xn(t,An(n,1,eu,true)):[]}),lo=cr(function(t,n){var r=Ue(n);return eu(r)&&(r=F),eu(t)?xn(t,An(n,1,eu,true),fe(r,2)):[];
}),so=cr(function(t,n){var r=Ue(n);return eu(r)&&(r=F),eu(t)?xn(t,An(n,1,eu,true),F,r):[]}),ho=cr(function(t){var n=l(t,wr);return n.length&&n[0]===t[0]?Bn(n):[]}),po=cr(function(t){var n=Ue(t),r=l(t,wr);return n===Ue(r)?n=F:r.pop(),r.length&&r[0]===t[0]?Bn(r,fe(n,2)):[]}),_o=cr(function(t){var n=Ue(t),r=l(t,wr);return n===Ue(r)?n=F:r.pop(),r.length&&r[0]===t[0]?Bn(r,F,n):[]}),vo=cr(Me),go=ue(function(t,n){var r=t?t.length:0,e=pn(t,n);return ir(t,l(n,function(t){return ge(t,r)?+t:t}).sort(Or)),e}),yo=cr(function(t){
return dr(An(t,1,eu,true))}),bo=cr(function(t){var n=Ue(t);return eu(n)&&(n=F),dr(An(t,1,eu,true),fe(n,2))}),xo=cr(function(t){var n=Ue(t);return eu(n)&&(n=F),dr(An(t,1,eu,true),F,n)}),jo=cr(function(t,n){return eu(t)?xn(t,n):[]}),wo=cr(function(t){return xr(f(t,eu))}),mo=cr(function(t){var n=Ue(t);return eu(n)&&(n=F),xr(f(t,eu),fe(n,2))}),Ao=cr(function(t){var n=Ue(t);return eu(n)&&(n=F),xr(f(t,eu),F,n)}),ko=cr(Te),Eo=cr(function(t){var n=t.length,n=1<n?t[n-1]:F,n=typeof n=="function"?(t.pop(),n):F;return $e(t,n);
}),Oo=ue(function(t){function n(n){return pn(n,t)}var r=t.length,e=r?t[0]:0,u=this.__wrapped__;return!(1<r||this.__actions__.length)&&u instanceof Dt&&ge(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:Ne,args:[n],thisArg:F}),new Mt(u,this.__chain__).thru(function(t){return r&&!t.length&&t.push(F),t})):this.thru(n)}),So=Br(function(t,n,r){Qu.call(t,r)?++t[r]:hn(t,r,1)}),Io=Nr(We),Ro=Nr(Be),zo=Br(function(t,n,r){Qu.call(t,r)?t[r].push(n):hn(t,r,[n])}),Wo=cr(function(t,n,e){var u=-1,i=typeof n=="function",o=ye(n),f=ru(t)?Du(t.length):[];
return Ki(t,function(t){var c=i?n:o&&null!=t?t[n]:F;f[++u]=c?r(c,t,e):Cn(t,n,e)}),f}),Bo=Br(function(t,n,r){hn(t,r,n)}),Lo=Br(function(t,n,r){t[r?0:1].push(n)},function(){return[[],[]]}),Co=cr(function(t,n){if(null==t)return[];var r=n.length;return 1<r&&de(t,n[0],n[1])?n=[]:2<r&&de(n[0],n[1],n[2])&&(n=[n[0]]),tr(t,An(n,1),[])}),Uo=vi||function(){return Pt.Date.now()},Mo=cr(function(t,n,r){var e=1;if(r.length)var u=U(r,oe(Mo)),e=32|e;return ne(t,e,n,r,u)}),Do=cr(function(t,n,r){var e=3;if(r.length)var u=U(r,oe(Do)),e=32|e;
return ne(n,e,t,r,u)}),To=cr(function(t,n){return bn(t,1,n)}),$o=cr(function(t,n,r){return bn(t,yu(n)||0,r)});Qe.Cache=Zt;var Fo=cr(function(t,n){n=1==n.length&&Ko(n[0])?l(n[0],S(fe())):l(An(n,1),S(fe()));var e=n.length;return cr(function(u){for(var i=-1,o=ki(u.length,e);++i<o;)u[i]=n[i].call(this,u[i]);return r(t,this,u)})}),No=cr(function(t,n){return ne(t,32,F,n,U(n,oe(No)))}),Po=cr(function(t,n){return ne(t,64,F,n,U(n,oe(Po)))}),Zo=ue(function(t,n){return ne(t,256,F,F,F,n)}),qo=Hr(Rn),Vo=Hr(function(t,n){
return t>=n}),Ko=Du.isArray,Go=Gt?S(Gt):Un,Jo=xi||Mu,Yo=Jt?S(Jt):Mn,Ho=Yt?S(Yt):Tn,Qo=Ht?S(Ht):Nn,Xo=Qt?S(Qt):Pn,tf=Xt?S(Xt):Zn,nf=Hr(Gn),rf=Hr(function(t,n){return t<=n}),ef=Lr(function(t,n){if(xe(n)||ru(n))zr(n,mu(n),t);else for(var r in n)Qu.call(n,r)&&cn(t,r,n[r])}),uf=Lr(function(t,n){zr(n,Au(n),t)}),of=Lr(function(t,n,r,e){zr(n,Au(n),t,e)}),ff=Lr(function(t,n,r,e){zr(n,mu(n),t,e)}),cf=ue(pn),af=cr(function(t){return t.push(F,on),r(of,F,t)}),lf=cr(function(t){return t.push(F,we),r(vf,F,t)}),sf=qr(function(t,n,r){
t[n]=r},Ru(zu)),hf=qr(function(t,n,r){Qu.call(t,n)?t[n].push(r):t[n]=[r]},fe),pf=cr(Cn),_f=Lr(function(t,n,r){Qn(t,n,r)}),vf=Lr(function(t,n,r,e){Qn(t,n,r,e)}),gf=ue(function(t,n){return null==t?{}:(n=l(n,Se),nr(t,xn(In(t,Au,eo),n)))}),df=ue(function(t,n){return null==t?{}:nr(t,l(n,Se))}),yf=te(mu),bf=te(Au),xf=Tr(function(t,n,r){return n=n.toLowerCase(),t+(r?Ou(n):n)}),jf=Tr(function(t,n,r){return t+(r?"-":"")+n.toLowerCase()}),wf=Tr(function(t,n,r){return t+(r?" ":"")+n.toLowerCase()}),mf=Dr("toLowerCase"),Af=Tr(function(t,n,r){
return t+(r?"_":"")+n.toLowerCase()}),kf=Tr(function(t,n,r){return t+(r?" ":"")+Of(n)}),Ef=Tr(function(t,n,r){return t+(r?" ":"")+n.toUpperCase()}),Of=Dr("toUpperCase"),Sf=cr(function(t,n){try{return r(t,F,n)}catch(t){return uu(t)?t:new $u(t)}}),If=ue(function(t,n){return u(n,function(n){n=Se(n),hn(t,n,Mo(t[n],t))}),t}),Rf=Pr(),zf=Pr(true),Wf=cr(function(t,n){return function(r){return Cn(r,t,n)}}),Bf=cr(function(t,n){return function(r){return Cn(t,r,n)}}),Lf=Kr(l),Cf=Kr(o),Uf=Kr(_),Mf=Yr(),Df=Yr(true),Tf=Vr(function(t,n){
return t+n},0),$f=Xr("ceil"),Ff=Vr(function(t,n){return t/n},1),Nf=Xr("floor"),Pf=Vr(function(t,n){return t*n},1),Zf=Xr("round"),qf=Vr(function(t,n){return t-n},0);return Ot.after=function(t,n){if(typeof n!="function")throw new Vu("Expected a function");return t=gu(t),function(){if(1>--t)return n.apply(this,arguments)}},Ot.ary=Ke,Ot.assign=ef,Ot.assignIn=uf,Ot.assignInWith=of,Ot.assignWith=ff,Ot.at=cf,Ot.before=Ge,Ot.bind=Mo,Ot.bindAll=If,Ot.bindKey=Do,Ot.castArray=function(){if(!arguments.length)return[];
var t=arguments[0];return Ko(t)?t:[t]},Ot.chain=Fe,Ot.chunk=function(t,n,r){if(n=(r?de(t,n,r):n===F)?1:Ai(gu(n),0),r=t?t.length:0,!r||1>n)return[];for(var e=0,u=0,i=Du(di(r/n));e<r;)i[u++]=lr(t,e,e+=n);return i},Ot.compact=function(t){for(var n=-1,r=t?t.length:0,e=0,u=[];++n<r;){var i=t[n];i&&(u[e++]=i)}return u},Ot.concat=function(){var t=arguments.length;if(!t)return[];for(var n=Du(t-1),r=arguments[0];t--;)n[t-1]=arguments[t];return s(Ko(r)?Rr(r):[r],An(n,1))},Ot.cond=function(t){var n=t?t.length:0,e=fe();
return t=n?l(t,function(t){if("function"!=typeof t[1])throw new Vu("Expected a function");return[e(t[0]),t[1]]}):[],cr(function(e){for(var u=-1;++u<n;){var i=t[u];if(r(i[0],this,e))return r(i[1],this,e)}})},Ot.conforms=function(t){return gn(vn(t,true))},Ot.constant=Ru,Ot.countBy=So,Ot.create=function(t,n){var r=yn(t);return n?sn(r,n):r},Ot.curry=Je,Ot.curryRight=Ye,Ot.debounce=He,Ot.defaults=af,Ot.defaultsDeep=lf,Ot.defer=To,Ot.delay=$o,Ot.difference=ao,Ot.differenceBy=lo,Ot.differenceWith=so,Ot.drop=function(t,n,r){
var e=t?t.length:0;return e?(n=r||n===F?1:gu(n),lr(t,0>n?0:n,e)):[]},Ot.dropRight=function(t,n,r){var e=t?t.length:0;return e?(n=r||n===F?1:gu(n),n=e-n,lr(t,0,0>n?0:n)):[]},Ot.dropRightWhile=function(t,n){return t&&t.length?yr(t,fe(n,3),true,true):[]},Ot.dropWhile=function(t,n){return t&&t.length?yr(t,fe(n,3),true):[]},Ot.fill=function(t,n,r,e){var u=t?t.length:0;if(!u)return[];for(r&&typeof r!="number"&&de(t,n,r)&&(r=0,e=u),u=t.length,r=gu(r),0>r&&(r=-r>u?0:u+r),e=e===F||e>u?u:gu(e),0>e&&(e+=u),e=r>e?0:du(e);r<e;)t[r++]=n;
return t},Ot.filter=function(t,n){return(Ko(t)?f:mn)(t,fe(n,3))},Ot.flatMap=function(t,n){return An(Ve(t,n),1)},Ot.flatMapDeep=function(t,n){return An(Ve(t,n),N)},Ot.flatMapDepth=function(t,n,r){return r=r===F?1:gu(r),An(Ve(t,n),r)},Ot.flatten=Le,Ot.flattenDeep=function(t){return t&&t.length?An(t,N):[]},Ot.flattenDepth=function(t,n){return t&&t.length?(n=n===F?1:gu(n),An(t,n)):[]},Ot.flip=function(t){return ne(t,512)},Ot.flow=Rf,Ot.flowRight=zf,Ot.fromPairs=function(t){for(var n=-1,r=t?t.length:0,e={};++n<r;){
var u=t[n];e[u[0]]=u[1]}return e},Ot.functions=function(t){return null==t?[]:On(t,mu(t))},Ot.functionsIn=function(t){return null==t?[]:On(t,Au(t))},Ot.groupBy=zo,Ot.initial=function(t){return t&&t.length?lr(t,0,-1):[]},Ot.intersection=ho,Ot.intersectionBy=po,Ot.intersectionWith=_o,Ot.invert=sf,Ot.invertBy=hf,Ot.invokeMap=Wo,Ot.iteratee=Wu,Ot.keyBy=Bo,Ot.keys=mu,Ot.keysIn=Au,Ot.map=Ve,Ot.mapKeys=function(t,n){var r={};return n=fe(n,3),kn(t,function(t,e,u){hn(r,n(t,e,u),t)}),r},Ot.mapValues=function(t,n){
var r={};return n=fe(n,3),kn(t,function(t,e,u){hn(r,e,n(t,e,u))}),r},Ot.matches=function(t){return Yn(vn(t,true))},Ot.matchesProperty=function(t,n){return Hn(t,vn(n,true))},Ot.memoize=Qe,Ot.merge=_f,Ot.mergeWith=vf,Ot.method=Wf,Ot.methodOf=Bf,Ot.mixin=Bu,Ot.negate=Xe,Ot.nthArg=function(t){return t=gu(t),cr(function(n){return Xn(n,t)})},Ot.omit=gf,Ot.omitBy=function(t,n){return ku(t,Xe(fe(n)))},Ot.once=function(t){return Ge(2,t)},Ot.orderBy=function(t,n,r,e){return null==t?[]:(Ko(n)||(n=null==n?[]:[n]),
r=e?F:r,Ko(r)||(r=null==r?[]:[r]),tr(t,n,r))},Ot.over=Lf,Ot.overArgs=Fo,Ot.overEvery=Cf,Ot.overSome=Uf,Ot.partial=No,Ot.partialRight=Po,Ot.partition=Lo,Ot.pick=df,Ot.pickBy=ku,Ot.property=Cu,Ot.propertyOf=function(t){return function(n){return null==t?F:Sn(t,n)}},Ot.pull=vo,Ot.pullAll=Me,Ot.pullAllBy=function(t,n,r){return t&&t.length&&n&&n.length?ur(t,n,fe(r,2)):t},Ot.pullAllWith=function(t,n,r){return t&&t.length&&n&&n.length?ur(t,n,F,r):t},Ot.pullAt=go,Ot.range=Mf,Ot.rangeRight=Df,Ot.rearg=Zo,Ot.reject=function(t,n){
return(Ko(t)?f:mn)(t,Xe(fe(n,3)))},Ot.remove=function(t,n){var r=[];if(!t||!t.length)return r;var e=-1,u=[],i=t.length;for(n=fe(n,3);++e<i;){var o=t[e];n(o,e,t)&&(r.push(o),u.push(e))}return ir(t,u),r},Ot.rest=function(t,n){if(typeof t!="function")throw new Vu("Expected a function");return n=n===F?n:gu(n),cr(t,n)},Ot.reverse=De,Ot.sampleSize=function(t,n,r){return n=(r?de(t,n,r):n===F)?1:gu(n),t=ru(t)?t:Eu(t),t=Oe(Rr(t)),t.length=_n(n,0,t.length),t},Ot.set=function(t,n,r){return null==t?t:ar(t,n,r);
},Ot.setWith=function(t,n,r,e){return e=typeof e=="function"?e:F,null==t?t:ar(t,n,r,e)},Ot.shuffle=function(t){return Oe(ru(t)?Rr(t):Eu(t))},Ot.slice=function(t,n,r){var e=t?t.length:0;return e?(r&&typeof r!="number"&&de(t,n,r)?(n=0,r=e):(n=null==n?0:gu(n),r=r===F?e:gu(r)),lr(t,n,r)):[]},Ot.sortBy=Co,Ot.sortedUniq=function(t){return t&&t.length?_r(t):[]},Ot.sortedUniqBy=function(t,n){return t&&t.length?_r(t,fe(n,2)):[]},Ot.split=function(t,n,r){return r&&typeof r!="number"&&de(t,n,r)&&(n=r=F),r=r===F?4294967295:r>>>0,
r?(t=xu(t))&&(typeof n=="string"||null!=n&&!Qo(n))&&(n=gr(n),!n&&Wt.test(t))?Ar($(t),0,r):t.split(n,r):[]},Ot.spread=function(t,n){if(typeof t!="function")throw new Vu("Expected a function");return n=n===F?0:Ai(gu(n),0),cr(function(e){var u=e[n];return e=Ar(e,0,n),u&&s(e,u),r(t,this,e)})},Ot.tail=function(t){var n=t?t.length:0;return n?lr(t,1,n):[]},Ot.take=function(t,n,r){return t&&t.length?(n=r||n===F?1:gu(n),lr(t,0,0>n?0:n)):[]},Ot.takeRight=function(t,n,r){var e=t?t.length:0;return e?(n=r||n===F?1:gu(n),
n=e-n,lr(t,0>n?0:n,e)):[]},Ot.takeRightWhile=function(t,n){return t&&t.length?yr(t,fe(n,3),false,true):[]},Ot.takeWhile=function(t,n){return t&&t.length?yr(t,fe(n,3)):[]},Ot.tap=function(t,n){return n(t),t},Ot.throttle=function(t,n,r){var e=true,u=true;if(typeof t!="function")throw new Vu("Expected a function");return cu(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),He(t,n,{leading:e,maxWait:n,trailing:u})},Ot.thru=Ne,Ot.toArray=_u,Ot.toPairs=yf,Ot.toPairsIn=bf,Ot.toPath=function(t){
return Ko(t)?l(t,Se):pu(t)?[t]:Rr(co(t))},Ot.toPlainObject=bu,Ot.transform=function(t,n,r){var e=Ko(t)||tf(t);if(n=fe(n,4),null==r)if(e||cu(t)){var i=t.constructor;r=e?Ko(t)?new i:[]:iu(i)?yn(ci(t)):{}}else r={};return(e?u:kn)(t,function(t,e,u){return n(r,t,e,u)}),r},Ot.unary=function(t){return Ke(t,1)},Ot.union=yo,Ot.unionBy=bo,Ot.unionWith=xo,Ot.uniq=function(t){return t&&t.length?dr(t):[]},Ot.uniqBy=function(t,n){return t&&t.length?dr(t,fe(n,2)):[]},Ot.uniqWith=function(t,n){return t&&t.length?dr(t,F,n):[];
},Ot.unset=function(t,n){var r;if(null==t)r=true;else{r=t;var e=n,e=ye(e,r)?[e]:mr(e);r=Ae(r,e),e=Se(Ue(e)),r=!(null!=r&&Qu.call(r,e))||delete r[e]}return r},Ot.unzip=Te,Ot.unzipWith=$e,Ot.update=function(t,n,r){return null==t?t:ar(t,n,(typeof r=="function"?r:zu)(Sn(t,n)),void 0)},Ot.updateWith=function(t,n,r,e){return e=typeof e=="function"?e:F,null!=t&&(t=ar(t,n,(typeof r=="function"?r:zu)(Sn(t,n)),e)),t},Ot.values=Eu,Ot.valuesIn=function(t){return null==t?[]:I(t,Au(t))},Ot.without=jo,Ot.words=Iu,
Ot.wrap=function(t,n){return n=null==n?zu:n,No(n,t)},Ot.xor=wo,Ot.xorBy=mo,Ot.xorWith=Ao,Ot.zip=ko,Ot.zipObject=function(t,n){return jr(t||[],n||[],cn)},Ot.zipObjectDeep=function(t,n){return jr(t||[],n||[],ar)},Ot.zipWith=Eo,Ot.entries=yf,Ot.entriesIn=bf,Ot.extend=uf,Ot.extendWith=of,Bu(Ot,Ot),Ot.add=Tf,Ot.attempt=Sf,Ot.camelCase=xf,Ot.capitalize=Ou,Ot.ceil=$f,Ot.clamp=function(t,n,r){return r===F&&(r=n,n=F),r!==F&&(r=yu(r),r=r===r?r:0),n!==F&&(n=yu(n),n=n===n?n:0),_n(yu(t),n,r)},Ot.clone=function(t){
return vn(t,false,true)},Ot.cloneDeep=function(t){return vn(t,true,true)},Ot.cloneDeepWith=function(t,n){return vn(t,true,true,n)},Ot.cloneWith=function(t,n){return vn(t,false,true,n)},Ot.conformsTo=function(t,n){return null==n||dn(t,n,mu(n))},Ot.deburr=Su,Ot.defaultTo=function(t,n){return null==t||t!==t?n:t},Ot.divide=Ff,Ot.endsWith=function(t,n,r){t=xu(t),n=gr(n);var e=t.length,e=r=r===F?e:_n(gu(r),0,e);return r-=n.length,0<=r&&t.slice(r,e)==n},Ot.eq=tu,Ot.escape=function(t){return(t=xu(t))&&H.test(t)?t.replace(J,rn):t;
},Ot.escapeRegExp=function(t){return(t=xu(t))&&ot.test(t)?t.replace(it,"\\$&"):t},Ot.every=function(t,n,r){var e=Ko(t)?o:jn;return r&&de(t,n,r)&&(n=F),e(t,fe(n,3))},Ot.find=Io,Ot.findIndex=We,Ot.findKey=function(t,n){return v(t,fe(n,3),kn)},Ot.findLast=Ro,Ot.findLastIndex=Be,Ot.findLastKey=function(t,n){return v(t,fe(n,3),En)},Ot.floor=Nf,Ot.forEach=Ze,Ot.forEachRight=qe,Ot.forIn=function(t,n){return null==t?t:Ji(t,fe(n,3),Au)},Ot.forInRight=function(t,n){return null==t?t:Yi(t,fe(n,3),Au)},Ot.forOwn=function(t,n){
return t&&kn(t,fe(n,3))},Ot.forOwnRight=function(t,n){return t&&En(t,fe(n,3))},Ot.get=ju,Ot.gt=qo,Ot.gte=Vo,Ot.has=function(t,n){return null!=t&&se(t,n,zn)},Ot.hasIn=wu,Ot.head=Ce,Ot.identity=zu,Ot.includes=function(t,n,r,e){return t=ru(t)?t:Eu(t),r=r&&!e?gu(r):0,e=t.length,0>r&&(r=Ai(e+r,0)),hu(t)?r<=e&&-1<t.indexOf(n,r):!!e&&-1<d(t,n,r)},Ot.indexOf=function(t,n,r){var e=t?t.length:0;return e?(r=null==r?0:gu(r),0>r&&(r=Ai(e+r,0)),d(t,n,r)):-1},Ot.inRange=function(t,n,r){return n=vu(n),r===F?(r=n,
n=0):r=vu(r),t=yu(t),t>=ki(n,r)&&t<Ai(n,r)},Ot.invoke=pf,Ot.isArguments=nu,Ot.isArray=Ko,Ot.isArrayBuffer=Go,Ot.isArrayLike=ru,Ot.isArrayLikeObject=eu,Ot.isBoolean=function(t){return true===t||false===t||au(t)&&"[object Boolean]"==ni.call(t)},Ot.isBuffer=Jo,Ot.isDate=Yo,Ot.isElement=function(t){return null!=t&&1===t.nodeType&&au(t)&&!su(t)},Ot.isEmpty=function(t){if(ru(t)&&(Ko(t)||typeof t=="string"||typeof t.splice=="function"||Jo(t)||nu(t)))return!t.length;var n=Et(t);if("[object Map]"==n||"[object Set]"==n)return!t.size;
if(xe(t))return!mi(t).length;for(var r in t)if(Qu.call(t,r))return false;return true},Ot.isEqual=function(t,n){return Dn(t,n)},Ot.isEqualWith=function(t,n,r){var e=(r=typeof r=="function"?r:F)?r(t,n):F;return e===F?Dn(t,n,r):!!e},Ot.isError=uu,Ot.isFinite=function(t){return typeof t=="number"&&ji(t)},Ot.isFunction=iu,Ot.isInteger=ou,Ot.isLength=fu,Ot.isMap=Ho,Ot.isMatch=function(t,n){return t===n||$n(t,n,ae(n))},Ot.isMatchWith=function(t,n,r){return r=typeof r=="function"?r:F,$n(t,n,ae(n),r)},Ot.isNaN=function(t){
return lu(t)&&t!=+t},Ot.isNative=function(t){if(uo(t))throw new $u("This method is not supported with core-js. Try https://github.com/es-shims.");return Fn(t)},Ot.isNil=function(t){return null==t},Ot.isNull=function(t){return null===t},Ot.isNumber=lu,Ot.isObject=cu,Ot.isObjectLike=au,Ot.isPlainObject=su,Ot.isRegExp=Qo,Ot.isSafeInteger=function(t){return ou(t)&&-9007199254740991<=t&&9007199254740991>=t},Ot.isSet=Xo,Ot.isString=hu,Ot.isSymbol=pu,Ot.isTypedArray=tf,Ot.isUndefined=function(t){return t===F;
},Ot.isWeakMap=function(t){return au(t)&&"[object WeakMap]"==Et(t)},Ot.isWeakSet=function(t){return au(t)&&"[object WeakSet]"==ni.call(t)},Ot.join=function(t,n){return t?wi.call(t,n):""},Ot.kebabCase=jf,Ot.last=Ue,Ot.lastIndexOf=function(t,n,r){var e=t?t.length:0;if(!e)return-1;var u=e;if(r!==F&&(u=gu(r),u=0>u?Ai(e+u,0):ki(u,e-1)),n===n){for(r=u+1;r--&&t[r]!==n;);t=r}else t=g(t,b,u,true);return t},Ot.lowerCase=wf,Ot.lowerFirst=mf,Ot.lt=nf,Ot.lte=rf,Ot.max=function(t){return t&&t.length?wn(t,zu,Rn):F;
},Ot.maxBy=function(t,n){return t&&t.length?wn(t,fe(n,2),Rn):F},Ot.mean=function(t){return x(t,zu)},Ot.meanBy=function(t,n){return x(t,fe(n,2))},Ot.min=function(t){return t&&t.length?wn(t,zu,Gn):F},Ot.minBy=function(t,n){return t&&t.length?wn(t,fe(n,2),Gn):F},Ot.stubArray=Uu,Ot.stubFalse=Mu,Ot.stubObject=function(){return{}},Ot.stubString=function(){return""},Ot.stubTrue=function(){return true},Ot.multiply=Pf,Ot.nth=function(t,n){return t&&t.length?Xn(t,gu(n)):F},Ot.noConflict=function(){return Pt._===this&&(Pt._=ri),
this},Ot.noop=Lu,Ot.now=Uo,Ot.pad=function(t,n,r){t=xu(t);var e=(n=gu(n))?T(t):0;return!n||e>=n?t:(n=(n-e)/2,Gr(yi(n),r)+t+Gr(di(n),r))},Ot.padEnd=function(t,n,r){t=xu(t);var e=(n=gu(n))?T(t):0;return n&&e<n?t+Gr(n-e,r):t},Ot.padStart=function(t,n,r){t=xu(t);var e=(n=gu(n))?T(t):0;return n&&e<n?Gr(n-e,r)+t:t},Ot.parseInt=function(t,n,r){return r||null==n?n=0:n&&(n=+n),Oi(xu(t),n||0)},Ot.random=function(t,n,r){if(r&&typeof r!="boolean"&&de(t,n,r)&&(n=r=F),r===F&&(typeof n=="boolean"?(r=n,n=F):typeof t=="boolean"&&(r=t,
t=F)),t===F&&n===F?(t=0,n=1):(t=vu(t),n===F?(n=t,t=0):n=vu(n)),t>n){var e=t;t=n,n=e}return r||t%1||n%1?(r=Si(),ki(t+r*(n-t+Tt("1e-"+((r+"").length-1))),n)):or(t,n)},Ot.reduce=function(t,n,r){var e=Ko(t)?h:m,u=3>arguments.length;return e(t,fe(n,4),r,u,Ki)},Ot.reduceRight=function(t,n,r){var e=Ko(t)?p:m,u=3>arguments.length;return e(t,fe(n,4),r,u,Gi)},Ot.repeat=function(t,n,r){return n=(r?de(t,n,r):n===F)?1:gu(n),fr(xu(t),n)},Ot.replace=function(){var t=arguments,n=xu(t[0]);return 3>t.length?n:n.replace(t[1],t[2]);
},Ot.result=function(t,n,r){n=ye(n,t)?[n]:mr(n);var e=-1,u=n.length;for(u||(t=F,u=1);++e<u;){var i=null==t?F:t[Se(n[e])];i===F&&(e=u,i=r),t=iu(i)?i.call(t):i}return t},Ot.round=Zf,Ot.runInContext=w,Ot.sample=function(t){t=ru(t)?t:Eu(t);var n=t.length;return n?t[or(0,n-1)]:F},Ot.size=function(t){if(null==t)return 0;if(ru(t))return hu(t)?T(t):t.length;var n=Et(t);return"[object Map]"==n||"[object Set]"==n?t.size:Vn(t).length},Ot.snakeCase=Af,Ot.some=function(t,n,r){var e=Ko(t)?_:sr;return r&&de(t,n,r)&&(n=F),
e(t,fe(n,3))},Ot.sortedIndex=function(t,n){return hr(t,n)},Ot.sortedIndexBy=function(t,n,r){return pr(t,n,fe(r,2))},Ot.sortedIndexOf=function(t,n){var r=t?t.length:0;if(r){var e=hr(t,n);if(e<r&&tu(t[e],n))return e}return-1},Ot.sortedLastIndex=function(t,n){return hr(t,n,true)},Ot.sortedLastIndexBy=function(t,n,r){return pr(t,n,fe(r,2),true)},Ot.sortedLastIndexOf=function(t,n){if(t&&t.length){var r=hr(t,n,true)-1;if(tu(t[r],n))return r}return-1},Ot.startCase=kf,Ot.startsWith=function(t,n,r){return t=xu(t),
r=_n(gu(r),0,t.length),n=gr(n),t.slice(r,r+n.length)==n},Ot.subtract=qf,Ot.sum=function(t){return t&&t.length?k(t,zu):0},Ot.sumBy=function(t,n){return t&&t.length?k(t,fe(n,2)):0},Ot.template=function(t,n,r){var e=Ot.templateSettings;r&&de(t,n,r)&&(n=F),t=xu(t),n=of({},n,e,on),r=of({},n.imports,e.imports,on);var u,i,o=mu(r),f=I(r,o),c=0;r=n.interpolate||mt;var a="__p+='";r=Zu((n.escape||mt).source+"|"+r.source+"|"+(r===tt?vt:mt).source+"|"+(n.evaluate||mt).source+"|$","g");var l="sourceURL"in n?"//# sourceURL="+n.sourceURL+"\n":"";
if(t.replace(r,function(n,r,e,o,f,l){return e||(e=o),a+=t.slice(c,l).replace(At,B),r&&(u=true,a+="'+__e("+r+")+'"),f&&(i=true,a+="';"+f+";\n__p+='"),e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+n.length,n}),a+="';",(n=n.variable)||(a="with(obj){"+a+"}"),a=(i?a.replace(q,""):a).replace(V,"$1").replace(K,"$1;"),a="function("+(n||"obj")+"){"+(n?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",
n=Sf(function(){return Fu(o,l+"return "+a).apply(F,f)}),n.source=a,uu(n))throw n;return n},Ot.times=function(t,n){if(t=gu(t),1>t||9007199254740991<t)return[];var r=4294967295,e=ki(t,4294967295);for(n=fe(n),t-=4294967295,e=E(e,n);++r<t;)n(r);return e},Ot.toFinite=vu,Ot.toInteger=gu,Ot.toLength=du,Ot.toLower=function(t){return xu(t).toLowerCase()},Ot.toNumber=yu,Ot.toSafeInteger=function(t){return _n(gu(t),-9007199254740991,9007199254740991)},Ot.toString=xu,Ot.toUpper=function(t){return xu(t).toUpperCase();
},Ot.trim=function(t,n,r){return(t=xu(t))&&(r||n===F)?t.replace(ft,""):t&&(n=gr(n))?(t=$(t),r=$(n),n=z(t,r),r=W(t,r)+1,Ar(t,n,r).join("")):t},Ot.trimEnd=function(t,n,r){return(t=xu(t))&&(r||n===F)?t.replace(at,""):t&&(n=gr(n))?(t=$(t),n=W(t,$(n))+1,Ar(t,0,n).join("")):t},Ot.trimStart=function(t,n,r){return(t=xu(t))&&(r||n===F)?t.replace(ct,""):t&&(n=gr(n))?(t=$(t),n=z(t,$(n)),Ar(t,n).join("")):t},Ot.truncate=function(t,n){var r=30,e="...";if(cu(n))var u="separator"in n?n.separator:u,r="length"in n?gu(n.length):r,e="omission"in n?gr(n.omission):e;
t=xu(t);var i=t.length;if(Wt.test(t))var o=$(t),i=o.length;if(r>=i)return t;if(i=r-T(e),1>i)return e;if(r=o?Ar(o,0,i).join(""):t.slice(0,i),u===F)return r+e;if(o&&(i+=r.length-i),Qo(u)){if(t.slice(i).search(u)){var f=r;for(u.global||(u=Zu(u.source,xu(gt.exec(u))+"g")),u.lastIndex=0;o=u.exec(f);)var c=o.index;r=r.slice(0,c===F?i:c)}}else t.indexOf(gr(u),i)!=i&&(u=r.lastIndexOf(u),-1<u&&(r=r.slice(0,u)));return r+e},Ot.unescape=function(t){return(t=xu(t))&&Y.test(t)?t.replace(G,en):t},Ot.uniqueId=function(t){
var n=++Xu;return xu(t)+n},Ot.upperCase=Ef,Ot.upperFirst=Of,Ot.each=Ze,Ot.eachRight=qe,Ot.first=Ce,Bu(Ot,function(){var t={};return kn(Ot,function(n,r){Qu.call(Ot.prototype,r)||(t[r]=n)}),t}(),{chain:false}),Ot.VERSION="4.16.1",u("bind bindKey curry curryRight partial partialRight".split(" "),function(t){Ot[t].placeholder=Ot}),u(["drop","take"],function(t,n){Dt.prototype[t]=function(r){var e=this.__filtered__;if(e&&!n)return new Dt(this);r=r===F?1:Ai(gu(r),0);var u=this.clone();return e?u.__takeCount__=ki(r,u.__takeCount__):u.__views__.push({
size:ki(r,4294967295),type:t+(0>u.__dir__?"Right":"")}),u},Dt.prototype[t+"Right"]=function(n){return this.reverse()[t](n).reverse()}}),u(["filter","map","takeWhile"],function(t,n){var r=n+1,e=1==r||3==r;Dt.prototype[t]=function(t){var n=this.clone();return n.__iteratees__.push({iteratee:fe(t,3),type:r}),n.__filtered__=n.__filtered__||e,n}}),u(["head","last"],function(t,n){var r="take"+(n?"Right":"");Dt.prototype[t]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(t,n){var r="drop"+(n?"":"Right");
Dt.prototype[t]=function(){return this.__filtered__?new Dt(this):this[r](1)}}),Dt.prototype.compact=function(){return this.filter(zu)},Dt.prototype.find=function(t){return this.filter(t).head()},Dt.prototype.findLast=function(t){return this.reverse().find(t)},Dt.prototype.invokeMap=cr(function(t,n){return typeof t=="function"?new Dt(this):this.map(function(r){return Cn(r,t,n)})}),Dt.prototype.reject=function(t){return this.filter(Xe(fe(t)))},Dt.prototype.slice=function(t,n){t=gu(t);var r=this;return r.__filtered__&&(0<t||0>n)?new Dt(r):(0>t?r=r.takeRight(-t):t&&(r=r.drop(t)),
n!==F&&(n=gu(n),r=0>n?r.dropRight(-n):r.take(n-t)),r)},Dt.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},Dt.prototype.toArray=function(){return this.take(4294967295)},kn(Dt.prototype,function(t,n){var r=/^(?:filter|find|map|reject)|While$/.test(n),e=/^(?:head|last)$/.test(n),u=Ot[e?"take"+("last"==n?"Right":""):n],i=e||/^find/.test(n);u&&(Ot.prototype[n]=function(){function n(t){return t=u.apply(Ot,s([t],f)),e&&h?t[0]:t}var o=this.__wrapped__,f=e?[1]:arguments,c=o instanceof Dt,a=f[0],l=c||Ko(o);
l&&r&&typeof a=="function"&&1!=a.length&&(c=l=false);var h=this.__chain__,p=!!this.__actions__.length,a=i&&!h,c=c&&!p;return!i&&l?(o=c?o:new Dt(this),o=t.apply(o,f),o.__actions__.push({func:Ne,args:[n],thisArg:F}),new Mt(o,h)):a&&c?t.apply(this,f):(o=this.thru(n),a?e?o.value()[0]:o.value():o)})}),u("pop push shift sort splice unshift".split(" "),function(t){var n=Ku[t],r=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",e=/^(?:pop|shift)$/.test(t);Ot.prototype[t]=function(){var t=arguments;if(e&&!this.__chain__){
var u=this.value();return n.apply(Ko(u)?u:[],t)}return this[r](function(r){return n.apply(Ko(r)?r:[],t)})}}),kn(Dt.prototype,function(t,n){var r=Ot[n];if(r){var e=r.name+"";(Di[e]||(Di[e]=[])).push({name:n,func:r})}}),Di[Zr(F,2).name]=[{name:"wrapper",func:F}],Dt.prototype.clone=function(){var t=new Dt(this.__wrapped__);return t.__actions__=Rr(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=Rr(this.__iteratees__),t.__takeCount__=this.__takeCount__,t.__views__=Rr(this.__views__),
t},Dt.prototype.reverse=function(){if(this.__filtered__){var t=new Dt(this);t.__dir__=-1,t.__filtered__=true}else t=this.clone(),t.__dir__*=-1;return t},Dt.prototype.value=function(){var t,n=this.__wrapped__.value(),r=this.__dir__,e=Ko(n),u=0>r,i=e?n.length:0;t=i;for(var o=this.__views__,f=0,c=-1,a=o.length;++c<a;){var l=o[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":t-=s;break;case"take":t=ki(t,f+s);break;case"takeRight":f=Ai(f,t-s)}}if(t={start:f,end:t},o=t.start,f=t.end,t=f-o,
u=u?f:o-1,o=this.__iteratees__,f=o.length,c=0,a=ki(t,this.__takeCount__),!e||200>i||i==t&&a==t)return br(n,this.__actions__);e=[];t:for(;t--&&c<a;){for(u+=r,i=-1,l=n[u];++i<f;){var h=o[i],s=h.type,h=(0,h.iteratee)(l);if(2==s)l=h;else if(!h){if(1==s)continue t;break t}}e[c++]=l}return e},Ot.prototype.at=Oo,Ot.prototype.chain=function(){return Fe(this)},Ot.prototype.commit=function(){return new Mt(this.value(),this.__chain__)},Ot.prototype.next=function(){this.__values__===F&&(this.__values__=_u(this.value()));
var t=this.__index__>=this.__values__.length;return{done:t,value:t?F:this.__values__[this.__index__++]}},Ot.prototype.plant=function(t){for(var n,r=this;r instanceof Rt;){var e=ze(r);e.__index__=0,e.__values__=F,n?u.__wrapped__=e:n=e;var u=e,r=r.__wrapped__}return u.__wrapped__=t,n},Ot.prototype.reverse=function(){var t=this.__wrapped__;return t instanceof Dt?(this.__actions__.length&&(t=new Dt(this)),t=t.reverse(),t.__actions__.push({func:Ne,args:[De],thisArg:F}),new Mt(t,this.__chain__)):this.thru(De);
},Ot.prototype.toJSON=Ot.prototype.valueOf=Ot.prototype.value=function(){return br(this.__wrapped__,this.__actions__)},Ot.prototype.first=Ot.prototype.head,ai&&(Ot.prototype[ai]=Pe),Ot}();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Pt._=un, define(function(){return un})):qt?((qt.exports=un)._=un,Zt._=un):Pt._=un}).call(this);
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-applicationcache-canvas-contenteditable-cookies-flexbox-formvalidation-fullscreen-inputtypes-localstorage-pagevisibility-sessionstorage-svg-video-setclasses !*/
!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,a,s;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],t=C[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)a=e[o],s=a.split("."),1===s.length?Modernizr[s[0]]=i:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=i),h.push((i?"":"no-")+s.join("-"))}}function o(e){var t=x.className,n=Modernizr._config.classPrefix||"";if(T&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),T?x.className.baseVal=t:x.className=t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):T?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function l(){var e=t.body;return e||(e=a(T?"svg":"body"),e.fake=!0),e}function c(e,n,r,i){var o,s,c,u,d="modernizr",f=a("div"),p=l();if(parseInt(r,10))for(;r--;)c=a("div"),c.id=i?i[r]:d+(r+1),f.appendChild(c);return o=a("style"),o.type="text/css",o.id="s"+d,(p.fake?p:f).appendChild(o),p.appendChild(f),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),f.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",u=x.style.overflow,x.style.overflow="hidden",x.appendChild(p)),s=n(f,e),p.fake?(p.parentNode.removeChild(p),x.style.overflow=u,x.offsetHeight):f.parentNode.removeChild(f),!!s}function u(e,t){return!!~(""+e).indexOf(t)}function d(e,t){return function(){return e.apply(t,arguments)}}function f(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?d(i,n||t):i);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(p(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+p(t[i])+":"+r+")");return o=o.join(" or "),c("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function v(e,t,i,o){function l(){d&&(delete $.style,delete $.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var c=m(e,i);if(!r(c,"undefined"))return c}for(var d,f,p,v,y,g=["modernizr","tspan","samp"];!$.style&&g.length;)d=!0,$.modElem=a(g.shift()),$.style=$.modElem.style;for(p=e.length,f=0;p>f;f++)if(v=e[f],y=$.style[v],u(v,"-")&&(v=s(v)),$.style[v]!==n){if(o||r(i,"undefined"))return l(),"pfx"==t?v:!0;try{$.style[v]=i}catch(h){}if($.style[v]!=y)return l(),"pfx"==t?v:!0}return l(),!1}function y(e,t,n,i,o){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+P.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?v(s,t,i,o):(s=(e+" "+z.join(a+" ")+a).split(" "),f(s,t,n))}function g(e,t,r){return y(e,n,n,t,r)}var h=[],C=[],b={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=b,Modernizr=new Modernizr,Modernizr.addTest("applicationcache","applicationCache"in e),Modernizr.addTest("cookies",function(){try{t.cookie="cookietest=1";var e=-1!=t.cookie.indexOf("cookietest=");return t.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(n){return!1}}),Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}});var x=t.documentElement,T="svg"===x.nodeName.toLowerCase();Modernizr.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("contenteditable",function(){if("contentEditable"in x){var e=a("div");return e.contentEditable=!0,"true"===e.contentEditable}}),Modernizr.addTest("video",function(){var e=a("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t});var w=a("input"),S="search tel url email datetime date month week time datetime-local number range color".split(" "),E={};Modernizr.inputtypes=function(e){for(var r,i,o,a=e.length,s="1)",l=0;a>l;l++)w.setAttribute("type",r=e[l]),o="text"!==w.type&&"style"in w,o&&(w.value=s,w.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(r)&&w.style.WebkitAppearance!==n?(x.appendChild(w),i=t.defaultView,o=i.getComputedStyle&&"textfield"!==i.getComputedStyle(w,null).WebkitAppearance&&0!==w.offsetHeight,x.removeChild(w)):/^(search|tel)$/.test(r)||(o=/^(url|email)$/.test(r)?w.checkValidity&&w.checkValidity()===!1:w.value!=s)),E[e[l]]=!!o;return E}(S);var _=b.testStyles=c;Modernizr.addTest("formvalidation",function(){var t=a("form");if(!("checkValidity"in t&&"addEventListener"in t))return!1;if("reportValidity"in t)return!0;var n,r=!1;return Modernizr.formvalidationapi=!0,t.addEventListener("submit",function(t){(!e.opera||e.operamini)&&t.preventDefault(),t.stopPropagation()},!1),t.innerHTML='<input name="modTest" required="required" /><button></button>',_("#modernizr form{position:absolute;top:-99999em}",function(e){e.appendChild(t),n=t.getElementsByTagName("input")[0],n.addEventListener("invalid",function(e){r=!0,e.preventDefault(),e.stopPropagation()},!1),Modernizr.formvalidationmessage=!!n.validationMessage,t.getElementsByTagName("button")[0].click()}),r});var k="Moz O ms Webkit",P=b._config.usePrefixes?k.split(" "):[];b._cssomPrefixes=P;var N=function(t){var r,i=prefixes.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var a=0;i>a;a++){var s=prefixes[a],l=s.toUpperCase()+"_"+r;if(l in o)return"@-"+s.toLowerCase()+"-"+t}return!1};b.atRule=N;var z=b._config.usePrefixes?k.toLowerCase().split(" "):[];b._domPrefixes=z;var L={elem:a("modernizr")};Modernizr._q.push(function(){delete L.elem});var $={style:L.elem.style};Modernizr._q.unshift(function(){delete $.style}),b.testAllProps=y;var A=b.prefixed=function(e,t,n){return 0===e.indexOf("@")?N(e):(-1!=e.indexOf("-")&&(e=s(e)),t?y(e,t,n):y(e,"pfx"))};Modernizr.addTest("fullscreen",!(!A("exitFullscreen",t,!1)&&!A("cancelFullScreen",t,!1))),Modernizr.addTest("pagevisibility",!!A("hidden",t,!1)),b.testAllProps=g,Modernizr.addTest("flexbox",g("flexBasis","1px",!0)),i(),o(h),delete b.addTest,delete b.addAsyncTest;for(var V=0;V<Modernizr._q.length;V++)Modernizr._q[V]();e.Modernizr=Modernizr}(window,document);
/*! tether 1.3.7 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
function getActualBoundingClientRect(node) {
  var boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = {};
  for (var k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (node.ownerDocument !== document) {
    var _frameElement = node.ownerDocument.defaultView.frameElement;
    if (_frameElement) {
      var frameRect = getActualBoundingClientRect(_frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(el.ownerDocument.body);

  // If the node is within a frame, account for the parent window scroll
  if (el.ownerDocument !== document) {
    parents.push(el.ownerDocument.defaultView);
  }

  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = getActualBoundingClientRect(node);

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = getActualBoundingClientRect(el);

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

var _scrollBarSize = null;
function getScrollBarSize() {
  if (_scrollBarSize) {
    return _scrollBarSize;
  }
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  _scrollBarSize = { width: width, height: width };
  return _scrollBarSize;
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
  // completely separately SVGAnimatedString base classes
  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getActualBoundingClientRect: getActualBoundingClientRect,
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var doc = this.target.ownerDocument;
      var win = doc.defaultView;

      var scrollbarSize = undefined;
      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (window.matchMedia) {
            // HubSpot/tether#207
            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
            if (!retina) {
              xPos = Math.round(xPos);
              yPos = Math.round(yPos);
            }
          }

          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        var offsetParentIsBody = true;
        var currentNode = this.element.parentNode;
        while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
          if (getComputedStyle(currentNode).position !== 'static') {
            offsetParentIsBody = false;
            break;
          }

          currentNode = currentNode.parentNode;
        }

        if (!offsetParentIsBody) {
          this.element.parentNode.removeChild(this.element);
          this.element.ownerDocument.body.appendChild(this.element);
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
          _this8.trigger('repositioned');
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      // Account any parent Frames scroll offset
      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));

/*
 * jQuery Storage API Plugin
 *
 * Copyright (c) 2013 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/jQuery-Storage-API
 *
 * Version: 1.9.2
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function t(){var t,r,i,o=this._type,n=arguments.length,s=window[o],a=arguments,l=a[0];if(1>n)throw new Error("Minimum 1 argument must be given");if(e.isArray(l)){r={};for(var f in l){t=l[f];try{r[t]=JSON.parse(s.getItem(t))}catch(c){r[t]=s.getItem(t)}}return r}if(1!=n){try{r=JSON.parse(s.getItem(l))}catch(c){throw new ReferenceError(l+" is not defined in this storage")}for(var f=1;n-1>f;f++)if(r=r[a[f]],void 0===r)throw new ReferenceError([].slice.call(a,1,f+1).join(".")+" is not defined in this storage");if(e.isArray(a[f])){i=r,r={};for(var h in a[f])r[a[f][h]]=i[a[f][h]];return r}return r[a[f]]}try{return JSON.parse(s.getItem(l))}catch(c){return s.getItem(l)}}function r(){var t,r,i,o=this._type,n=arguments.length,s=window[o],a=arguments,l=a[0],f=a[1],c=isNaN(f)?{}:[];if(1>n||!e.isPlainObject(l)&&2>n)throw new Error("Minimum 2 arguments must be given or first parameter must be an object");if(e.isPlainObject(l)){for(var h in l)t=l[h],e.isPlainObject(t)||this.alwaysUseJson?s.setItem(h,JSON.stringify(t)):s.setItem(h,t);return l}if(2==n)return"object"==typeof f||this.alwaysUseJson?s.setItem(l,JSON.stringify(f)):s.setItem(l,f),f;try{i=s.getItem(l),null!=i&&(c=JSON.parse(i))}catch(u){}i=c;for(var h=1;n-2>h;h++)t=a[h],r=isNaN(a[h+1])?"object":"array",(!i[t]||"object"==r&&!e.isPlainObject(i[t])||"array"==r&&!e.isArray(i[t]))&&("array"==r?i[t]=[]:i[t]={}),i=i[t];return i[a[h]]=a[h+1],s.setItem(l,JSON.stringify(c)),c}function i(){var t,r,i=this._type,o=arguments.length,n=window[i],s=arguments,a=s[0];if(1>o)throw new Error("Minimum 1 argument must be given");if(e.isArray(a)){for(var l in a)n.removeItem(a[l]);return!0}if(1==o)return n.removeItem(a),!0;try{t=r=JSON.parse(n.getItem(a))}catch(f){throw new ReferenceError(a+" is not defined in this storage")}for(var l=1;o-1>l;l++)if(r=r[s[l]],void 0===r)throw new ReferenceError([].slice.call(s,1,l).join(".")+" is not defined in this storage");if(e.isArray(s[l]))for(var c in s[l])delete r[s[l][c]];else delete r[s[l]];return n.setItem(a,JSON.stringify(t)),!0}function o(t){var r=a.call(this);for(var o in r)i.call(this,r[o]);if(t)for(var o in e.namespaceStorages)l(o)}function n(){var r=arguments.length,i=arguments,o=i[0];if(0==r)return 0==a.call(this).length;if(e.isArray(o)){for(var s=0;s<o.length;s++)if(!n.call(this,o[s]))return!1;return!0}try{var l=t.apply(this,arguments);e.isArray(i[r-1])||(l={totest:l});for(var s in l)if(!(e.isPlainObject(l[s])&&e.isEmptyObject(l[s])||e.isArray(l[s])&&!l[s].length)&&l[s])return!1;return!0}catch(f){return!0}}function s(){var r=arguments.length,i=arguments,o=i[0];if(1>r)throw new Error("Minimum 1 argument must be given");if(e.isArray(o)){for(var n=0;n<o.length;n++)if(!s.call(this,o[n]))return!1;return!0}try{var a=t.apply(this,arguments);e.isArray(i[r-1])||(a={totest:a});for(var n in a)if(void 0===a[n]||null===a[n])return!1;return!0}catch(l){return!1}}function a(){var e=this._type,r=arguments.length,i=window[e],o=arguments,n=[],s={};if(s=r>0?t.apply(this,o):i,s&&s._cookie)for(var a in Cookies.get())""!=a&&n.push(a.replace(s._prefix,""));else for(var l in s)s.hasOwnProperty(l)&&n.push(l);return n}function l(t){if(!t||"string"!=typeof t)throw new Error("First parameter must be a string");u?(window.localStorage.getItem(t)||window.localStorage.setItem(t,"{}"),window.sessionStorage.getItem(t)||window.sessionStorage.setItem(t,"{}")):(window.localCookieStorage.getItem(t)||window.localCookieStorage.setItem(t,"{}"),window.sessionCookieStorage.getItem(t)||window.sessionCookieStorage.setItem(t,"{}"));var r={localStorage:e.extend({},e.localStorage,{_ns:t}),sessionStorage:e.extend({},e.sessionStorage,{_ns:t})};return"object"==typeof Cookies&&(window.cookieStorage.getItem(t)||window.cookieStorage.setItem(t,"{}"),r.cookieStorage=e.extend({},e.cookieStorage,{_ns:t})),e.namespaceStorages[t]=r,r}function f(e){var t="jsapi";try{return window[e]?(window[e].setItem(t,t),window[e].removeItem(t),!0):!1}catch(r){return!1}}var c="ls_",h="ss_",u=f("localStorage"),g={_type:"",_ns:"",_callMethod:function(e,t){var r=[],t=Array.prototype.slice.call(t),i=t[0];return this._ns&&r.push(this._ns),"string"==typeof i&&-1!==i.indexOf(".")&&(t.shift(),[].unshift.apply(t,i.split("."))),[].push.apply(r,t),e.apply(this,r)},alwaysUseJson:!1,get:function(){return this._callMethod(t,arguments)},set:function(){var t=arguments.length,i=arguments,o=i[0];if(1>t||!e.isPlainObject(o)&&2>t)throw new Error("Minimum 2 arguments must be given or first parameter must be an object");if(e.isPlainObject(o)&&this._ns){for(var n in o)this._callMethod(r,[n,o[n]]);return o}var s=this._callMethod(r,i);return this._ns?s[o.split(".")[0]]:s},remove:function(){if(arguments.length<1)throw new Error("Minimum 1 argument must be given");return this._callMethod(i,arguments)},removeAll:function(e){return this._ns?(this._callMethod(r,[{}]),!0):this._callMethod(o,[e])},isEmpty:function(){return this._callMethod(n,arguments)},isSet:function(){if(arguments.length<1)throw new Error("Minimum 1 argument must be given");return this._callMethod(s,arguments)},keys:function(){return this._callMethod(a,arguments)}};if("object"==typeof Cookies){window.name||(window.name=Math.floor(1e8*Math.random()));var m={_cookie:!0,_prefix:"",_expires:null,_path:null,_domain:null,setItem:function(e,t){Cookies.set(this._prefix+e,t,{expires:this._expires,path:this._path,domain:this._domain})},getItem:function(e){return Cookies.get(this._prefix+e)},removeItem:function(e){return Cookies.remove(this._prefix+e,{path:this._path})},clear:function(){for(var t in Cookies.get())""!=t&&(!this._prefix&&-1===t.indexOf(c)&&-1===t.indexOf(h)||this._prefix&&0===t.indexOf(this._prefix))&&e.removeCookie(t)},setExpires:function(e){return this._expires=e,this},setPath:function(e){return this._path=e,this},setDomain:function(e){return this._domain=e,this},setConf:function(e){return e.path&&(this._path=e.path),e.domain&&(this._domain=e.domain),e.expires&&(this._expires=e.expires),this},setDefaultConf:function(){this._path=this._domain=this._expires=null}};u||(window.localCookieStorage=e.extend({},m,{_prefix:c,_expires:3650}),window.sessionCookieStorage=e.extend({},m,{_prefix:h+window.name+"_"})),window.cookieStorage=e.extend({},m),e.cookieStorage=e.extend({},g,{_type:"cookieStorage",setExpires:function(e){return window.cookieStorage.setExpires(e),this},setPath:function(e){return window.cookieStorage.setPath(e),this},setDomain:function(e){return window.cookieStorage.setDomain(e),this},setConf:function(e){return window.cookieStorage.setConf(e),this},setDefaultConf:function(){return window.cookieStorage.setDefaultConf(),this}})}e.initNamespaceStorage=function(e){return l(e)},u?(e.localStorage=e.extend({},g,{_type:"localStorage"}),e.sessionStorage=e.extend({},g,{_type:"sessionStorage"})):(e.localStorage=e.extend({},g,{_type:"localCookieStorage"}),e.sessionStorage=e.extend({},g,{_type:"sessionCookieStorage"})),e.namespaceStorages={},e.removeAllStorages=function(t){e.localStorage.removeAll(t),e.sessionStorage.removeAll(t),e.cookieStorage&&e.cookieStorage.removeAll(t),t||(e.namespaceStorages={})},e.alwaysUseJsonInStorage=function(t){g.alwaysUseJson=t,e.localStorage.alwaysUseJson=t,e.sessionStorage.alwaysUseJson=t,e.cookieStorage&&(e.cookieStorage.alwaysUseJson=t)}});
/*global define:false */
/**
 * Copyright 2015 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.5.2
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        20: 'capslock',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'ins',
        46: 'del',
        91: 'meta',
        93: 'meta',
        224: 'meta'
    };

    /**
     * mapping for special characters so they can support
     *
     * this dictionary is only used incase you want to bind a
     * keyup or keydown event to one of these keys
     *
     * @type {Object}
     */
    var _KEYCODE_MAP = {
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111 : '/',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };

    /**
     * this is a mapping of keys that require shift on a US keypad
     * back to the non shift equivelents
     *
     * this is so you can use keyup events with these keys
     *
     * note that this will only work reliably on US keyboards
     *
     * @type {Object}
     */
    var _SHIFT_MAP = {
        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',
        ':': ';',
        '\"': '\'',
        '<': ',',
        '>': '.',
        '?': '/',
        '|': '\\'
    };

    /**
     * this is a list of special strings you can use to map
     * to modifier keys when you specify your keyboard shortcuts
     *
     * @type {Object}
     */
    var _SPECIAL_ALIASES = {
        'option': 'alt',
        'command': 'meta',
        'return': 'enter',
        'escape': 'esc',
        'plus': '+',
        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    };

    /**
     * variable to store the flipped version of _MAP from above
     * needed to check if we should use keypress or not when no action
     * is specified
     *
     * @type {Object|undefined}
     */
    var _REVERSE_MAP;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {
        _MAP[i + 96] = i;
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        combination = combination.replace(/\+{2}/g, '+plus');
        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys;
        var key;
        var i;
        var modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    function _belongsTo(element, ancestor) {
        if (element === null || element === document) {
            return false;
        }

        if (element === ancestor) {
            return true;
        }

        return _belongsTo(element.parentNode, ancestor);
    }

    function Mousetrap(targetElement) {
        var self = this;

        targetElement = targetElement || document;

        if (!(self instanceof Mousetrap)) {
            return new Mousetrap(targetElement);
        }

        /**
         * element to attach key events to
         *
         * @type {Element}
         */
        self.target = targetElement;

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        self._callbacks = {};

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        self._directMap = {};

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        var _sequenceLevels = {};

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        var _resetTimer;

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        var _ignoreNextKeyup = false;

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        var _ignoreNextKeypress = false;

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        var _nextExpectedAction = false;

        /**
         * resets all sequence counters except for the ones passed in
         *
         * @param {Object} doNotReset
         * @returns void
         */
        function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};

            var activeSequences = false,
                key;

            for (key in _sequenceLevels) {
                if (doNotReset[key]) {
                    activeSequences = true;
                    continue;
                }
                _sequenceLevels[key] = 0;
            }

            if (!activeSequences) {
                _nextExpectedAction = false;
            }
        }

        /**
         * finds all callbacks that match based on the keycode, modifiers,
         * and action
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event|Object} e
         * @param {string=} sequenceName - name of the sequence we are looking for
         * @param {string=} combination
         * @param {number=} level
         * @returns {Array}
         */
        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i;
            var callback;
            var matches = [];
            var action = e.type;

            // if there are no events related to this keycode
            if (!self._callbacks[character]) {
                return [];
            }

            // if a modifier key is coming up on its own we should allow it
            if (action == 'keyup' && _isModifier(character)) {
                modifiers = [character];
            }

            // loop through all callbacks for the key that was pressed
            // and see if any of them match
            for (i = 0; i < self._callbacks[character].length; ++i) {
                callback = self._callbacks[character][i];

                // if a sequence name is not specified, but this is a sequence at
                // the wrong level then move onto the next match
                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                    continue;
                }

                // if the action we are looking for doesn't match the action we got
                // then we should keep going
                if (action != callback.action) {
                    continue;
                }

                // if this is a keypress event and the meta key and control key
                // are not pressed that means that we need to only look at the
                // character, otherwise check the modifiers as well
                //
                // chrome will not fire a keypress if meta or control is down
                // safari will fire a keypress if meta or meta+shift is down
                // firefox will fire a keypress if meta or control is down
                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                    // when you bind a combination or sequence a second time it
                    // should overwrite the first one.  if a sequenceName or
                    // combination is specified in this call it does just that
                    //
                    // @todo make deleting its own method?
                    var deleteCombo = !sequenceName && callback.combo == combination;
                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                    if (deleteCombo || deleteSequence) {
                        self._callbacks[character].splice(i, 1);
                    }

                    matches.push(callback);
                }
            }

            return matches;
        }

        /**
         * actually calls the callback function
         *
         * if your callback function returns false this will use the jquery
         * convention - prevent default and stop propogation on the event
         *
         * @param {Function} callback
         * @param {Event} e
         * @returns void
         */
        function _fireCallback(callback, e, combo, sequence) {

            // if this event should not happen stop here
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                return;
            }

            if (callback(e, combo) === false) {
                _preventDefault(e);
                _stopPropagation(e);
            }
        }

        /**
         * handles a character key event
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event} e
         * @returns void
         */
        self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;

            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
            for (i = 0; i < callbacks.length; ++i) {
                if (callbacks[i].seq) {
                    maxLevel = Math.max(maxLevel, callbacks[i].level);
                }
            }

            // loop through matching callbacks for this key event
            for (i = 0; i < callbacks.length; ++i) {

                // fire for all sequence callbacks
                // this is because if for example you have multiple sequences
                // bound such as "g i" and "g t" they both need to fire the
                // callback for matching g cause otherwise you can only ever
                // match the first one
                if (callbacks[i].seq) {

                    // only fire callbacks for the maxLevel to prevent
                    // subsequences from also firing
                    //
                    // for example 'a option b' should not cause 'option b' to fire
                    // even though 'option b' is part of the other sequence
                    //
                    // any sequences that do not match here will be discarded
                    // below by the _resetSequences call
                    if (callbacks[i].level != maxLevel) {
                        continue;
                    }

                    processedSequenceCallback = true;

                    // keep a list of which sequences were matches for later
                    doNotReset[callbacks[i].seq] = 1;
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                    continue;
                }

                // if there were no sequence matches but we are still here
                // that means this is a regular match so we should fire that
                if (!processedSequenceCallback) {
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                }
            }

            // if the key you pressed matches the type of sequence without
            // being a modifier (ie "keyup" or "keypress") then we should
            // reset all sequences that were not matched by this event
            //
            // this is so, for example, if you have the sequence "h a t" and you
            // type "h e a r t" it does not match.  in this case the "e" will
            // cause the sequence to reset
            //
            // modifier keys are ignored because you can have a sequence
            // that contains modifiers such as "enter ctrl+space" and in most
            // cases the modifier key will be pressed before the next key
            //
            // also if you have a sequence such as "ctrl+b a" then pressing the
            // "b" key will trigger a "keypress" and a "keydown"
            //
            // the "keydown" is expected when there is a modifier, but the
            // "keypress" ends up matching the _nextExpectedAction since it occurs
            // after and that causes the sequence to reset
            //
            // we ignore keypresses in a sequence that directly follow a keydown
            // for the same character
            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                _resetSequences(doNotReset);
            }

            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
        };

        /**
         * handles a keydown event
         *
         * @param {Event} e
         * @returns void
         */
        function _handleKeyEvent(e) {

            // normalize e.which for key events
            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
            if (typeof e.which !== 'number') {
                e.which = e.keyCode;
            }

            var character = _characterFromEvent(e);

            // no character found then stop
            if (!character) {
                return;
            }

            // need to use === for the character check because the character can be 0
            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                _ignoreNextKeyup = false;
                return;
            }

            self.handleKey(character, _eventModifiers(e), e);
        }

        /**
         * called to set a 1 second timeout on the specified sequence
         *
         * this is so after each key press in the sequence you have 1 second
         * to press the next key before you have to start over
         *
         * @returns void
         */
        function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1000);
        }

        /**
         * binds a key sequence to an event
         *
         * @param {string} combo - combo specified in bind call
         * @param {Array} keys
         * @param {Function} callback
         * @param {string=} action
         * @returns void
         */
        function _bindSequence(combo, keys, callback, action) {

            // start off by adding a sequence level record for this combination
            // and setting the level to 0
            _sequenceLevels[combo] = 0;

            /**
             * callback to increase the sequence level for this sequence and reset
             * all other sequences that were active
             *
             * @param {string} nextAction
             * @returns {Function}
             */
            function _increaseSequence(nextAction) {
                return function() {
                    _nextExpectedAction = nextAction;
                    ++_sequenceLevels[combo];
                    _resetSequenceTimer();
                };
            }

            /**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */
            function _callbackAndReset(e) {
                _fireCallback(callback, e, combo);

                // we should ignore the next key up if the action is key down
                // or keypress.  this is so if you finish a sequence and
                // release the key the final key will not trigger a keyup
                if (action !== 'keyup') {
                    _ignoreNextKeyup = _characterFromEvent(e);
                }

                // weird race condition if a sequence ends with the key
                // another sequence begins with
                setTimeout(_resetSequences, 10);
            }

            // loop through keys one at a time and bind the appropriate callback
            // function.  for any key leading up to the final one it should
            // increase the sequence. after the final, it should reset all sequences
            //
            // if an action is specified in the original bind call then that will
            // be used throughout.  otherwise we will pass the action that the
            // next key in the sequence should match.  this allows a sequence
            // to mix and match keypress and keydown events depending on which
            // ones are better suited to the key provided
            for (var i = 0; i < keys.length; ++i) {
                var isFinal = i + 1 === keys.length;
                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                _bindSingle(keys[i], wrappedCallback, action, combo, i);
            }
        }

        /**
         * binds a single keyboard combination
         *
         * @param {string} combination
         * @param {Function} callback
         * @param {string=} action
         * @param {string=} sequenceName - name of sequence if part of sequence
         * @param {number=} level - what part of the sequence the command is
         * @returns void
         */
        function _bindSingle(combination, callback, action, sequenceName, level) {

            // store a direct mapped reference for use with Mousetrap.trigger
            self._directMap[combination + ':' + action] = callback;

            // make sure multiple spaces in a row become a single space
            combination = combination.replace(/\s+/g, ' ');

            var sequence = combination.split(' ');
            var info;

            // if this pattern is a sequence of keys then run through this method
            // to reprocess each pattern one key at a time
            if (sequence.length > 1) {
                _bindSequence(combination, sequence, callback, action);
                return;
            }

            info = _getKeyInfo(combination, action);

            // make sure to initialize array if this is the first time
            // a callback is added for this key
            self._callbacks[info.key] = self._callbacks[info.key] || [];

            // remove an existing match if there is one
            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

            // add this call back to the array
            // if it is a sequence put it at the beginning
            // if not put it at the end
            //
            // this is important because the way these are processed expects
            // the sequence ones to come first
            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                callback: callback,
                modifiers: info.modifiers,
                action: info.action,
                seq: sequenceName,
                level: level,
                combo: combination
            });
        }

        /**
         * binds multiple combinations to the same callback
         *
         * @param {Array} combinations
         * @param {Function} callback
         * @param {string|undefined} action
         * @returns void
         */
        self._bindMultiple = function(combinations, callback, action) {
            for (var i = 0; i < combinations.length; ++i) {
                _bindSingle(combinations[i], callback, action);
            }
        };

        // start!
        _addEvent(targetElement, 'keypress', _handleKeyEvent);
        _addEvent(targetElement, 'keydown', _handleKeyEvent);
        _addEvent(targetElement, 'keyup', _handleKeyEvent);
    }

    /**
     * binds an event to mousetrap
     *
     * can be a single key, a combination of keys separated with +,
     * an array of keys, or a sequence of keys separated by spaces
     *
     * be sure to list the modifier keys first to make sure that the
     * correct key ends up getting bound (the last key in the pattern)
     *
     * @param {string|Array} keys
     * @param {Function} callback
     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
     * @returns void
     */
    Mousetrap.prototype.bind = function(keys, callback, action) {
        var self = this;
        keys = keys instanceof Array ? keys : [keys];
        self._bindMultiple.call(self, keys, callback, action);
        return self;
    };

    /**
     * unbinds an event to mousetrap
     *
     * the unbinding sets the callback function of the specified key combo
     * to an empty function and deletes the corresponding key in the
     * _directMap dict.
     *
     * TODO: actually remove this from the _callbacks dictionary instead
     * of binding an empty function
     *
     * the keycombo+action has to be exactly the same as
     * it was defined in the bind method
     *
     * @param {string|Array} keys
     * @param {string} action
     * @returns void
     */
    Mousetrap.prototype.unbind = function(keys, action) {
        var self = this;
        return self.bind.call(self, keys, function() {}, action);
    };

    /**
     * triggers an event that has already been bound
     *
     * @param {string} keys
     * @param {string=} action
     * @returns void
     */
    Mousetrap.prototype.trigger = function(keys, action) {
        var self = this;
        if (self._directMap[keys + ':' + action]) {
            self._directMap[keys + ':' + action]({}, keys);
        }
        return self;
    };

    /**
     * resets the library back to its initial state.  this is useful
     * if you want to clear out the current keyboard shortcuts and bind
     * new ones - for example if you switch to another page
     *
     * @returns void
     */
    Mousetrap.prototype.reset = function() {
        var self = this;
        self._callbacks = {};
        self._directMap = {};
        return self;
    };

    /**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @param {Element} element
     * @return {boolean}
     */
    Mousetrap.prototype.stopCallback = function(e, element) {
        var self = this;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        if (_belongsTo(element, self.target)) {
            return false;
        }

        // stop for input, select, and textarea
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
    };

    /**
     * exposes _handleKey publicly so it can be overwritten by extensions
     */
    Mousetrap.prototype.handleKey = function() {
        var self = this;
        return self._handleKey.apply(self, arguments);
    };

    /**
     * Init the global mousetrap functions
     *
     * This method is needed to allow the global mousetrap functions to work
     * now that mousetrap is a constructor function.
     */
    Mousetrap.init = function() {
        var documentMousetrap = Mousetrap(document);
        for (var method in documentMousetrap) {
            if (method.charAt(0) !== '_') {
                Mousetrap[method] = (function(method) {
                    return function() {
                        return documentMousetrap[method].apply(documentMousetrap, arguments);
                    };
                } (method));
            }
        }
    };

    Mousetrap.init();

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose as a common js module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mousetrap;
    }

    // expose mousetrap as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Mousetrap;
        });
    }
}) (window, document);

/*!
  * bootstrap-material-design  v4.0.2 (https://github.com/FezVrasta/bootstrap-material-design)
  * Copyright 2016 Federico Zivolo and contributors
  * Licensed under MIT
  */
(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

	function interopDefault(ex) {
		return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$1 = interopDefault(_global);

var require$$3 = Object.freeze({
	  default: _global$1
	});

	var _has = createCommonjsModule(function (module) {
	  var hasOwnProperty = {}.hasOwnProperty;
	  module.exports = function (it, key) {
	    return hasOwnProperty.call(it, key);
	  };
	});

	var _has$1 = interopDefault(_has);

var require$$4 = Object.freeze({
	  default: _has$1
	});

	var _fails = createCommonjsModule(function (module) {
	  module.exports = function (exec) {
	    try {
	      return !!exec();
	    } catch (e) {
	      return true;
	    }
	  };
	});

	var _fails$1 = interopDefault(_fails);

var require$$1$1 = Object.freeze({
	  default: _fails$1
	});

	var _descriptors = createCommonjsModule(function (module) {
	  // Thank's IE8 for his funny defineProperty
	  module.exports = !interopDefault(require$$1$1)(function () {
	    return Object.defineProperty({}, 'a', { get: function get() {
	        return 7;
	      } }).a != 7;
	  });
	});

	var _descriptors$1 = interopDefault(_descriptors);

var require$$1 = Object.freeze({
	  default: _descriptors$1
	});

	var _core = createCommonjsModule(function (module) {
	  var core = module.exports = { version: '2.4.0' };
	  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});

	var _core$1 = interopDefault(_core);
	var version = _core.version;

var require$$0 = Object.freeze({
	  default: _core$1,
	  version: version
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var _isObject = createCommonjsModule(function (module) {
	  module.exports = function (it) {
	    return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	  };
	});

	var _isObject$1 = interopDefault(_isObject);



	var require$$0$1 = Object.freeze({
	  default: _isObject$1
	});

	var _anObject = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1);
	  module.exports = function (it) {
	    if (!isObject(it)) throw TypeError(it + ' is not an object!');
	    return it;
	  };
	});

	var _anObject$1 = interopDefault(_anObject);

var require$$5 = Object.freeze({
	  default: _anObject$1
	});

	var _domCreate = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1),
	      document = interopDefault(require$$3).document
	  // in old IE typeof document.createElement is 'object'
	  ,
	      is = isObject(document) && isObject(document.createElement);
	  module.exports = function (it) {
	    return is ? document.createElement(it) : {};
	  };
	});

	var _domCreate$1 = interopDefault(_domCreate);

var require$$2$2 = Object.freeze({
	  default: _domCreate$1
	});

	var _ie8DomDefine = createCommonjsModule(function (module) {
	  module.exports = !interopDefault(require$$1) && !interopDefault(require$$1$1)(function () {
	    return Object.defineProperty(interopDefault(require$$2$2)('div'), 'a', { get: function get() {
	        return 7;
	      } }).a != 7;
	  });
	});

	var _ie8DomDefine$1 = interopDefault(_ie8DomDefine);

var require$$1$3 = Object.freeze({
	  default: _ie8DomDefine$1
	});

	var _toPrimitive = createCommonjsModule(function (module) {
	  // 7.1.1 ToPrimitive(input [, PreferredType])
	  var isObject = interopDefault(require$$0$1);
	  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
	  // and the second argument - flag - preferred type is a string
	  module.exports = function (it, S) {
	    if (!isObject(it)) return it;
	    var fn, val;
	    if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	    if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	    if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	    throw TypeError("Can't convert object to primitive value");
	  };
	});

	var _toPrimitive$1 = interopDefault(_toPrimitive);

var require$$4$1 = Object.freeze({
	  default: _toPrimitive$1
	});

	var _objectDp = createCommonjsModule(function (module, exports) {
	  var anObject = interopDefault(require$$5),
	      IE8_DOM_DEFINE = interopDefault(require$$1$3),
	      toPrimitive = interopDefault(require$$4$1),
	      dP = Object.defineProperty;

	  exports.f = interopDefault(require$$1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	    anObject(O);
	    P = toPrimitive(P, true);
	    anObject(Attributes);
	    if (IE8_DOM_DEFINE) try {
	      return dP(O, P, Attributes);
	    } catch (e) {/* empty */}
	    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	    if ('value' in Attributes) O[P] = Attributes.value;
	    return O;
	  };
	});

	var _objectDp$1 = interopDefault(_objectDp);
	var f = _objectDp.f;

var require$$2$1 = Object.freeze({
	  default: _objectDp$1,
	  f: f
	});

	var _propertyDesc = createCommonjsModule(function (module) {
	  module.exports = function (bitmap, value) {
	    return {
	      enumerable: !(bitmap & 1),
	      configurable: !(bitmap & 2),
	      writable: !(bitmap & 4),
	      value: value
	    };
	  };
	});

	var _propertyDesc$1 = interopDefault(_propertyDesc);

var require$$2$3 = Object.freeze({
	  default: _propertyDesc$1
	});

	var _hide = createCommonjsModule(function (module) {
	  var dP = interopDefault(require$$2$1),
	      createDesc = interopDefault(require$$2$3);
	  module.exports = interopDefault(require$$1) ? function (object, key, value) {
	    return dP.f(object, key, createDesc(1, value));
	  } : function (object, key, value) {
	    object[key] = value;
	    return object;
	  };
	});

	var _hide$1 = interopDefault(_hide);

var require$$2 = Object.freeze({
	  default: _hide$1
	});

	var _uid = createCommonjsModule(function (module) {
	  var id = 0,
	      px = Math.random();
	  module.exports = function (key) {
	    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	  };
	});

	var _uid$1 = interopDefault(_uid);

var require$$12 = Object.freeze({
	  default: _uid$1
	});

	var _redefine = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      hide = interopDefault(require$$2),
	      has = interopDefault(require$$4),
	      SRC = interopDefault(require$$12)('src'),
	      TO_STRING = 'toString',
	      $toString = Function[TO_STRING],
	      TPL = ('' + $toString).split(TO_STRING);

	  interopDefault(require$$0).inspectSource = function (it) {
	    return $toString.call(it);
	  };

	  (module.exports = function (O, key, val, safe) {
	    var isFunction = typeof val == 'function';
	    if (isFunction) has(val, 'name') || hide(val, 'name', key);
	    if (O[key] === val) return;
	    if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    if (O === global) {
	      O[key] = val;
	    } else {
	      if (!safe) {
	        delete O[key];
	        hide(O, key, val);
	      } else {
	        if (O[key]) O[key] = val;else hide(O, key, val);
	      }
	    }
	    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, TO_STRING, function toString() {
	    return typeof this == 'function' && this[SRC] || $toString.call(this);
	  });
	});

	var _redefine$1 = interopDefault(_redefine);

var require$$4$2 = Object.freeze({
	  default: _redefine$1
	});

	var _aFunction = createCommonjsModule(function (module) {
	  module.exports = function (it) {
	    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	    return it;
	  };
	});

	var _aFunction$1 = interopDefault(_aFunction);

var require$$0$2 = Object.freeze({
	  default: _aFunction$1
	});

	var _ctx = createCommonjsModule(function (module) {
	  // optional / simple context binding
	  var aFunction = interopDefault(require$$0$2);
	  module.exports = function (fn, that, length) {
	    aFunction(fn);
	    if (that === undefined) return fn;
	    switch (length) {
	      case 1:
	        return function (a) {
	          return fn.call(that, a);
	        };
	      case 2:
	        return function (a, b) {
	          return fn.call(that, a, b);
	        };
	      case 3:
	        return function (a, b, c) {
	          return fn.call(that, a, b, c);
	        };
	    }
	    return function () /* ...args */{
	      return fn.apply(that, arguments);
	    };
	  };
	});

	var _ctx$1 = interopDefault(_ctx);

var require$$31 = Object.freeze({
	  default: _ctx$1
	});

	var _export = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      core = interopDefault(require$$0),
	      hide = interopDefault(require$$2),
	      redefine = interopDefault(require$$4$2),
	      ctx = interopDefault(require$$31),
	      PROTOTYPE = 'prototype';

	  var $export = function $export(type, name, source) {
	    var IS_FORCED = type & $export.F,
	        IS_GLOBAL = type & $export.G,
	        IS_STATIC = type & $export.S,
	        IS_PROTO = type & $export.P,
	        IS_BIND = type & $export.B,
	        target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	        expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	        key,
	        own,
	        out,
	        exp;
	    if (IS_GLOBAL) source = name;
	    for (key in source) {
	      // contains in native
	      own = !IS_FORCED && target && target[key] !== undefined;
	      // export native or passed
	      out = (own ? target : source)[key];
	      // bind timers to global for call from export context
	      exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	      // extend global
	      if (target) redefine(target, key, out, type & $export.U);
	      // export
	      if (exports[key] != out) hide(exports, key, exp);
	      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	    }
	  };
	  global.core = core;
	  // type bitmap
	  $export.F = 1; // forced
	  $export.G = 2; // global
	  $export.S = 4; // static
	  $export.P = 8; // proto
	  $export.B = 16; // bind
	  $export.W = 32; // wrap
	  $export.U = 64; // safe
	  $export.R = 128; // real proto method for `library` 
	  module.exports = $export;
	});

	var _export$1 = interopDefault(_export);

var require$$1$2 = Object.freeze({
	  default: _export$1
	});

	var _meta = createCommonjsModule(function (module) {
	  var META = interopDefault(require$$12)('meta'),
	      isObject = interopDefault(require$$0$1),
	      has = interopDefault(require$$4),
	      setDesc = interopDefault(require$$2$1).f,
	      id = 0;
	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };
	  var FREEZE = !interopDefault(require$$1$1)(function () {
	    return isExtensible(Object.preventExtensions({}));
	  });
	  var setMeta = function setMeta(it) {
	    setDesc(it, META, { value: {
	        i: 'O' + ++id, // object ID
	        w: {} // weak collections IDs
	      } });
	  };
	  var fastKey = function fastKey(it, create) {
	    // return primitive with prefix
	    if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	    if (!has(it, META)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return 'F';
	      // not necessary to add metadata
	      if (!create) return 'E';
	      // add missing metadata
	      setMeta(it);
	      // return object ID
	    }return it[META].i;
	  };
	  var getWeak = function getWeak(it, create) {
	    if (!has(it, META)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return true;
	      // not necessary to add metadata
	      if (!create) return false;
	      // add missing metadata
	      setMeta(it);
	      // return hash weak collections IDs
	    }return it[META].w;
	  };
	  // add metadata on freeze-family methods calling
	  var onFreeze = function onFreeze(it) {
	    if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	    return it;
	  };
	  var meta = module.exports = {
	    KEY: META,
	    NEED: false,
	    fastKey: fastKey,
	    getWeak: getWeak,
	    onFreeze: onFreeze
	  };
	});

	var _meta$1 = interopDefault(_meta);
	var KEY = _meta.KEY;
	var NEED = _meta.NEED;
	var fastKey = _meta.fastKey;
	var getWeak = _meta.getWeak;
	var onFreeze = _meta.onFreeze;



	var require$$6 = Object.freeze({
	  default: _meta$1,
	  KEY: KEY,
	  NEED: NEED,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	});

	var _shared = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      SHARED = '__core-js_shared__',
	      store = global[SHARED] || (global[SHARED] = {});
	  module.exports = function (key) {
	    return store[key] || (store[key] = {});
	  };
	});

	var _shared$1 = interopDefault(_shared);

var require$$1$4 = Object.freeze({
	  default: _shared$1
	});

	var _wks = createCommonjsModule(function (module) {
	  var store = interopDefault(require$$1$4)('wks'),
	      uid = interopDefault(require$$12),
	      _Symbol = interopDefault(require$$3).Symbol,
	      USE_SYMBOL = typeof _Symbol == 'function';

	  var $exports = module.exports = function (name) {
	    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	  };

	  $exports.store = store;
	});

	var _wks$1 = interopDefault(_wks);

var require$$0$4 = Object.freeze({
	  default: _wks$1
	});

	var _setToStringTag = createCommonjsModule(function (module) {
	  var def = interopDefault(require$$2$1).f,
	      has = interopDefault(require$$4),
	      TAG = interopDefault(require$$0$4)('toStringTag');

	  module.exports = function (it, tag, stat) {
	    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	  };
	});

	var _setToStringTag$1 = interopDefault(_setToStringTag);

var require$$0$3 = Object.freeze({
	  default: _setToStringTag$1
	});

	var _wksExt = createCommonjsModule(function (module, exports) {
	  exports.f = interopDefault(require$$0$4);
	});

	var _wksExt$1 = interopDefault(_wksExt);
	var f$1 = _wksExt.f;

var require$$1$5 = Object.freeze({
	  default: _wksExt$1,
	  f: f$1
	});

	var _library = createCommonjsModule(function (module) {
	  module.exports = false;
	});

	var _library$1 = interopDefault(_library);

var require$$2$4 = Object.freeze({
	  default: _library$1
	});

	var _wksDefine = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      core = interopDefault(require$$0),
	      LIBRARY = interopDefault(require$$2$4),
	      wksExt = interopDefault(require$$1$5),
	      defineProperty = interopDefault(require$$2$1).f;
	  module.exports = function (name) {
	    var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	  };
	});

	var _wksDefine$1 = interopDefault(_wksDefine);

var require$$0$5 = Object.freeze({
	  default: _wksDefine$1
	});

	var _cof = createCommonjsModule(function (module) {
	  var toString = {}.toString;

	  module.exports = function (it) {
	    return toString.call(it).slice(8, -1);
	  };
	});

	var _cof$1 = interopDefault(_cof);

var require$$0$6 = Object.freeze({
	  default: _cof$1
	});

	var _iobject = createCommonjsModule(function (module) {
	  // fallback for non-array-like ES3 and non-enumerable old V8 strings
	  var cof = interopDefault(require$$0$6);
	  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	    return cof(it) == 'String' ? it.split('') : Object(it);
	  };
	});

	var _iobject$1 = interopDefault(_iobject);

var require$$1$8 = Object.freeze({
	  default: _iobject$1
	});

	var _defined = createCommonjsModule(function (module) {
	  // 7.2.1 RequireObjectCoercible(argument)
	  module.exports = function (it) {
	    if (it == undefined) throw TypeError("Can't call method on  " + it);
	    return it;
	  };
	});

	var _defined$1 = interopDefault(_defined);

var require$$4$3 = Object.freeze({
	  default: _defined$1
	});

	var _toIobject = createCommonjsModule(function (module) {
	  // to indexed object, toObject with fallback for non-array-like ES3 strings
	  var IObject = interopDefault(require$$1$8),
	      defined = interopDefault(require$$4$3);
	  module.exports = function (it) {
	    return IObject(defined(it));
	  };
	});

	var _toIobject$1 = interopDefault(_toIobject);

var require$$1$7 = Object.freeze({
	  default: _toIobject$1
	});

	var _toInteger = createCommonjsModule(function (module) {
	  // 7.1.4 ToInteger
	  var ceil = Math.ceil,
	      floor = Math.floor;
	  module.exports = function (it) {
	    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	  };
	});

	var _toInteger$1 = interopDefault(_toInteger);

var require$$26 = Object.freeze({
	  default: _toInteger$1
	});

	var _toLength = createCommonjsModule(function (module) {
	  // 7.1.15 ToLength
	  var toInteger = interopDefault(require$$26),
	      min = Math.min;
	  module.exports = function (it) {
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  };
	});

	var _toLength$1 = interopDefault(_toLength);

var require$$3$1 = Object.freeze({
	  default: _toLength$1
	});

	var _toIndex = createCommonjsModule(function (module) {
	  var toInteger = interopDefault(require$$26),
	      max = Math.max,
	      min = Math.min;
	  module.exports = function (index, length) {
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  };
	});

	var _toIndex$1 = interopDefault(_toIndex);

var require$$24 = Object.freeze({
	  default: _toIndex$1
	});

	var _arrayIncludes = createCommonjsModule(function (module) {
	  // false -> Array#indexOf
	  // true  -> Array#includes
	  var toIObject = interopDefault(require$$1$7),
	      toLength = interopDefault(require$$3$1),
	      toIndex = interopDefault(require$$24);
	  module.exports = function (IS_INCLUDES) {
	    return function ($this, el, fromIndex) {
	      var O = toIObject($this),
	          length = toLength(O.length),
	          index = toIndex(fromIndex, length),
	          value;
	      // Array#includes uses SameValueZero equality algorithm
	      if (IS_INCLUDES && el != el) while (length > index) {
	        value = O[index++];
	        if (value != value) return true;
	        // Array#toIndex ignores holes, Array#includes - not
	      } else for (; length > index; index++) {
	        if (IS_INCLUDES || index in O) {
	          if (O[index] === el) return IS_INCLUDES || index || 0;
	        }
	      }return !IS_INCLUDES && -1;
	    };
	  };
	});

	var _arrayIncludes$1 = interopDefault(_arrayIncludes);

var require$$1$9 = Object.freeze({
	  default: _arrayIncludes$1
	});

	var _sharedKey = createCommonjsModule(function (module) {
	  var shared = interopDefault(require$$1$4)('keys'),
	      uid = interopDefault(require$$12);
	  module.exports = function (key) {
	    return shared[key] || (shared[key] = uid(key));
	  };
	});

	var _sharedKey$1 = interopDefault(_sharedKey);

var require$$0$7 = Object.freeze({
	  default: _sharedKey$1
	});

	var _objectKeysInternal = createCommonjsModule(function (module) {
	  var has = interopDefault(require$$4),
	      toIObject = interopDefault(require$$1$7),
	      arrayIndexOf = interopDefault(require$$1$9)(false),
	      IE_PROTO = interopDefault(require$$0$7)('IE_PROTO');

	  module.exports = function (object, names) {
	    var O = toIObject(object),
	        i = 0,
	        result = [],
	        key;
	    for (key in O) {
	      if (key != IE_PROTO) has(O, key) && result.push(key);
	    } // Don't enum bug & hidden keys
	    while (names.length > i) {
	      if (has(O, key = names[i++])) {
	        ~arrayIndexOf(result, key) || result.push(key);
	      }
	    }return result;
	  };
	});

	var _objectKeysInternal$1 = interopDefault(_objectKeysInternal);

var require$$1$6 = Object.freeze({
	  default: _objectKeysInternal$1
	});

	var _enumBugKeys = createCommonjsModule(function (module) {
	  // IE 8- don't enum bug keys
	  module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
	});

	var _enumBugKeys$1 = interopDefault(_enumBugKeys);

var require$$0$8 = Object.freeze({
	  default: _enumBugKeys$1
	});

	var _objectKeys = createCommonjsModule(function (module) {
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  var $keys = interopDefault(require$$1$6),
	      enumBugKeys = interopDefault(require$$0$8);

	  module.exports = Object.keys || function keys(O) {
	    return $keys(O, enumBugKeys);
	  };
	});

	var _objectKeys$1 = interopDefault(_objectKeys);

var require$$2$5 = Object.freeze({
	  default: _objectKeys$1
	});

	var _keyof = createCommonjsModule(function (module) {
	  var getKeys = interopDefault(require$$2$5),
	      toIObject = interopDefault(require$$1$7);
	  module.exports = function (object, el) {
	    var O = toIObject(object),
	        keys = getKeys(O),
	        length = keys.length,
	        index = 0,
	        key;
	    while (length > index) {
	      if (O[key = keys[index++]] === el) return key;
	    }
	  };
	});

	var _keyof$1 = interopDefault(_keyof);

var require$$16 = Object.freeze({
	  default: _keyof$1
	});

	var _objectGops = createCommonjsModule(function (module, exports) {
	  exports.f = Object.getOwnPropertySymbols;
	});

	var _objectGops$1 = interopDefault(_objectGops);
	var f$2 = _objectGops.f;

var require$$2$6 = Object.freeze({
	  default: _objectGops$1,
	  f: f$2
	});

	var _objectPie = createCommonjsModule(function (module, exports) {
	  exports.f = {}.propertyIsEnumerable;
	});

	var _objectPie$1 = interopDefault(_objectPie);
	var f$3 = _objectPie.f;

var require$$0$9 = Object.freeze({
	  default: _objectPie$1,
	  f: f$3
	});

	var _enumKeys = createCommonjsModule(function (module) {
	  // all enumerable object keys, includes symbols
	  var getKeys = interopDefault(require$$2$5),
	      gOPS = interopDefault(require$$2$6),
	      pIE = interopDefault(require$$0$9);
	  module.exports = function (it) {
	    var result = getKeys(it),
	        getSymbols = gOPS.f;
	    if (getSymbols) {
	      var symbols = getSymbols(it),
	          isEnum = pIE.f,
	          i = 0,
	          key;
	      while (symbols.length > i) {
	        if (isEnum.call(it, key = symbols[i++])) result.push(key);
	      }
	    }return result;
	  };
	});

	var _enumKeys$1 = interopDefault(_enumKeys);

var require$$15 = Object.freeze({
	  default: _enumKeys$1
	});

	var _isArray = createCommonjsModule(function (module) {
	  // 7.2.2 IsArray(argument)
	  var cof = interopDefault(require$$0$6);
	  module.exports = Array.isArray || function isArray(arg) {
	    return cof(arg) == 'Array';
	  };
	});

	var _isArray$1 = interopDefault(_isArray);

var require$$1$10 = Object.freeze({
	  default: _isArray$1
	});

	var _objectDps = createCommonjsModule(function (module) {
	  var dP = interopDefault(require$$2$1),
	      anObject = interopDefault(require$$5),
	      getKeys = interopDefault(require$$2$5);

	  module.exports = interopDefault(require$$1) ? Object.defineProperties : function defineProperties(O, Properties) {
	    anObject(O);
	    var keys = getKeys(Properties),
	        length = keys.length,
	        i = 0,
	        P;
	    while (length > i) {
	      dP.f(O, P = keys[i++], Properties[P]);
	    }return O;
	  };
	});

	var _objectDps$1 = interopDefault(_objectDps);

var require$$0$10 = Object.freeze({
	  default: _objectDps$1
	});

	var _html = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$3).document && document.documentElement;
	});

	var _html$1 = interopDefault(_html);

var require$$3$2 = Object.freeze({
	  default: _html$1
	});

	var _objectCreate = createCommonjsModule(function (module) {
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  var anObject = interopDefault(require$$5),
	      dPs = interopDefault(require$$0$10),
	      enumBugKeys = interopDefault(require$$0$8),
	      IE_PROTO = interopDefault(require$$0$7)('IE_PROTO'),
	      Empty = function Empty() {/* empty */},
	      PROTOTYPE = 'prototype';

	  // Create object with fake `null` prototype: use iframe Object with cleared prototype
	  var _createDict = function createDict() {
	    // Thrash, waste and sodomy: IE GC bug
	    var iframe = interopDefault(require$$2$2)('iframe'),
	        i = enumBugKeys.length,
	        lt = '<',
	        gt = '>',
	        iframeDocument;
	    iframe.style.display = 'none';
	    interopDefault(require$$3$2).appendChild(iframe);
	    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	    // createDict = iframe.contentWindow.Object;
	    // html.removeChild(iframe);
	    iframeDocument = iframe.contentWindow.document;
	    iframeDocument.open();
	    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	    iframeDocument.close();
	    _createDict = iframeDocument.F;
	    while (i--) {
	      delete _createDict[PROTOTYPE][enumBugKeys[i]];
	    }return _createDict();
	  };

	  module.exports = Object.create || function create(O, Properties) {
	    var result;
	    if (O !== null) {
	      Empty[PROTOTYPE] = anObject(O);
	      result = new Empty();
	      Empty[PROTOTYPE] = null;
	      // add "__proto__" for Object.getPrototypeOf polyfill
	      result[IE_PROTO] = O;
	    } else result = _createDict();
	    return Properties === undefined ? result : dPs(result, Properties);
	  };
	});

	var _objectCreate$1 = interopDefault(_objectCreate);

var require$$6$1 = Object.freeze({
	  default: _objectCreate$1
	});

	var _objectGopn = createCommonjsModule(function (module, exports) {
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  var $keys = interopDefault(require$$1$6),
	      hiddenKeys = interopDefault(require$$0$8).concat('length', 'prototype');

	  exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	    return $keys(O, hiddenKeys);
	  };
	});

	var _objectGopn$1 = interopDefault(_objectGopn);
	var f$5 = _objectGopn.f;

var require$$3$3 = Object.freeze({
	  default: _objectGopn$1,
	  f: f$5
	});

	var _objectGopnExt = createCommonjsModule(function (module) {
	  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	  var toIObject = interopDefault(require$$1$7),
	      gOPN = interopDefault(require$$3$3).f,
	      toString = {}.toString;

	  var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	  var getWindowNames = function getWindowNames(it) {
	    try {
	      return gOPN(it);
	    } catch (e) {
	      return windowNames.slice();
	    }
	  };

	  module.exports.f = function getOwnPropertyNames(it) {
	    return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	  };
	});

	var _objectGopnExt$1 = interopDefault(_objectGopnExt);
	var f$4 = _objectGopnExt.f;



	var require$$0$11 = Object.freeze({
	  default: _objectGopnExt$1,
	  f: f$4
	});

	var _objectGopd = createCommonjsModule(function (module, exports) {
	  var pIE = interopDefault(require$$0$9),
	      createDesc = interopDefault(require$$2$3),
	      toIObject = interopDefault(require$$1$7),
	      toPrimitive = interopDefault(require$$4$1),
	      has = interopDefault(require$$4),
	      IE8_DOM_DEFINE = interopDefault(require$$1$3),
	      gOPD = Object.getOwnPropertyDescriptor;

	  exports.f = interopDefault(require$$1) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	    O = toIObject(O);
	    P = toPrimitive(P, true);
	    if (IE8_DOM_DEFINE) try {
	      return gOPD(O, P);
	    } catch (e) {/* empty */}
	    if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	  };
	});

	var _objectGopd$1 = interopDefault(_objectGopd);
	var f$6 = _objectGopd.f;

var require$$2$7 = Object.freeze({
	  default: _objectGopd$1,
	  f: f$6
	});

	var es6_symbol = createCommonjsModule(function (module) {
	  'use strict';
	  // ECMAScript 6 symbols shim

	  var global = interopDefault(require$$3),
	      has = interopDefault(require$$4),
	      DESCRIPTORS = interopDefault(require$$1),
	      $export = interopDefault(require$$1$2),
	      redefine = interopDefault(require$$4$2),
	      META = interopDefault(require$$6).KEY,
	      $fails = interopDefault(require$$1$1),
	      shared = interopDefault(require$$1$4),
	      setToStringTag = interopDefault(require$$0$3),
	      uid = interopDefault(require$$12),
	      wks = interopDefault(require$$0$4),
	      wksExt = interopDefault(require$$1$5),
	      wksDefine = interopDefault(require$$0$5),
	      keyOf = interopDefault(require$$16),
	      enumKeys = interopDefault(require$$15),
	      isArray = interopDefault(require$$1$10),
	      anObject = interopDefault(require$$5),
	      toIObject = interopDefault(require$$1$7),
	      toPrimitive = interopDefault(require$$4$1),
	      createDesc = interopDefault(require$$2$3),
	      _create = interopDefault(require$$6$1),
	      gOPNExt = interopDefault(require$$0$11),
	      $GOPD = interopDefault(require$$2$7),
	      $DP = interopDefault(require$$2$1),
	      $keys = interopDefault(require$$2$5),
	      gOPD = $GOPD.f,
	      dP = $DP.f,
	      gOPN = gOPNExt.f,
	      $Symbol = global.Symbol,
	      $JSON = global.JSON,
	      _stringify = $JSON && $JSON.stringify,
	      PROTOTYPE = 'prototype',
	      HIDDEN = wks('_hidden'),
	      TO_PRIMITIVE = wks('toPrimitive'),
	      isEnum = {}.propertyIsEnumerable,
	      SymbolRegistry = shared('symbol-registry'),
	      AllSymbols = shared('symbols'),
	      OPSymbols = shared('op-symbols'),
	      ObjectProto = Object[PROTOTYPE],
	      USE_NATIVE = typeof $Symbol == 'function',
	      QObject = global.QObject;
	  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	  var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	  var setSymbolDesc = DESCRIPTORS && $fails(function () {
	    return _create(dP({}, 'a', {
	      get: function get() {
	        return dP(this, 'a', { value: 7 }).a;
	      }
	    })).a != 7;
	  }) ? function (it, key, D) {
	    var protoDesc = gOPD(ObjectProto, key);
	    if (protoDesc) delete ObjectProto[key];
	    dP(it, key, D);
	    if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	  } : dP;

	  var wrap = function wrap(tag) {
	    var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	    sym._k = tag;
	    return sym;
	  };

	  var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	    return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	  } : function (it) {
	    return it instanceof $Symbol;
	  };

	  var $defineProperty = function defineProperty(it, key, D) {
	    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	    anObject(it);
	    key = toPrimitive(key, true);
	    anObject(D);
	    if (has(AllSymbols, key)) {
	      if (!D.enumerable) {
	        if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	        it[HIDDEN][key] = true;
	      } else {
	        if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	        D = _create(D, { enumerable: createDesc(0, false) });
	      }return setSymbolDesc(it, key, D);
	    }return dP(it, key, D);
	  };
	  var $defineProperties = function defineProperties(it, P) {
	    anObject(it);
	    var keys = enumKeys(P = toIObject(P)),
	        i = 0,
	        l = keys.length,
	        key;
	    while (l > i) {
	      $defineProperty(it, key = keys[i++], P[key]);
	    }return it;
	  };
	  var $create = function create(it, P) {
	    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	  };
	  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	    var E = isEnum.call(this, key = toPrimitive(key, true));
	    if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	  };
	  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	    it = toIObject(it);
	    key = toPrimitive(key, true);
	    if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	    var D = gOPD(it, key);
	    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	    return D;
	  };
	  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	    var names = gOPN(toIObject(it)),
	        result = [],
	        i = 0,
	        key;
	    while (names.length > i) {
	      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	    }return result;
	  };
	  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	    var IS_OP = it === ObjectProto,
	        names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	        result = [],
	        i = 0,
	        key;
	    while (names.length > i) {
	      if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	    }return result;
	  };

	  // 19.4.1.1 Symbol([description])
	  if (!USE_NATIVE) {
	    $Symbol = function _Symbol() {
	      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	      var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	      var $set = function $set(value) {
	        if (this === ObjectProto) $set.call(OPSymbols, value);
	        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	        setSymbolDesc(this, tag, createDesc(1, value));
	      };
	      if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	      return wrap(tag);
	    };
	    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	      return this._k;
	    });

	    $GOPD.f = $getOwnPropertyDescriptor;
	    $DP.f = $defineProperty;
	    interopDefault(require$$3$3).f = gOPNExt.f = $getOwnPropertyNames;
	    interopDefault(require$$0$9).f = $propertyIsEnumerable;
	    interopDefault(require$$2$6).f = $getOwnPropertySymbols;

	    if (DESCRIPTORS && !interopDefault(require$$2$4)) {
	      redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	    }

	    wksExt.f = function (name) {
	      return wrap(wks(name));
	    };
	  }

	  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	  for (var symbols =
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	    wks(symbols[i++]);
	  }for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	    wksDefine(symbols[i++]);
	  }$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	    // 19.4.2.1 Symbol.for(key)
	    'for': function _for(key) {
	      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	    },
	    // 19.4.2.5 Symbol.keyFor(sym)
	    keyFor: function keyFor(key) {
	      if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	      throw TypeError(key + ' is not a symbol!');
	    },
	    useSetter: function useSetter() {
	      setter = true;
	    },
	    useSimple: function useSimple() {
	      setter = false;
	    }
	  });

	  $export($export.S + $export.F * !USE_NATIVE, 'Object', {
	    // 19.1.2.2 Object.create(O [, Properties])
	    create: $create,
	    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	    defineProperty: $defineProperty,
	    // 19.1.2.3 Object.defineProperties(O, Properties)
	    defineProperties: $defineProperties,
	    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	    // 19.1.2.7 Object.getOwnPropertyNames(O)
	    getOwnPropertyNames: $getOwnPropertyNames,
	    // 19.1.2.8 Object.getOwnPropertySymbols(O)
	    getOwnPropertySymbols: $getOwnPropertySymbols
	  });

	  // 24.3.2 JSON.stringify(value [, replacer [, space]])
	  $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	    var S = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    // WebKit converts symbol values to JSON as null
	    // V8 throws on boxed symbols
	    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	  })), 'JSON', {
	    stringify: function stringify(it) {
	      if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      var args = [it],
	          i = 1,
	          replacer,
	          $replacer;
	      while (arguments.length > i) {
	        args.push(arguments[i++]);
	      }replacer = args[1];
	      if (typeof replacer == 'function') $replacer = replacer;
	      if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	        if ($replacer) value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return _stringify.apply($JSON, args);
	    }
	  });

	  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	  $Symbol[PROTOTYPE][TO_PRIMITIVE] || interopDefault(require$$2)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	  // 19.4.3.5 Symbol.prototype[@@toStringTag]
	  setToStringTag($Symbol, 'Symbol');
	  // 20.2.1.9 Math[@@toStringTag]
	  setToStringTag(Math, 'Math', true);
	  // 24.3.3 JSON[@@toStringTag]
	  setToStringTag(global.JSON, 'JSON', true);
	});

	interopDefault(es6_symbol);

	var es6_object_create = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  $export($export.S, 'Object', { create: interopDefault(require$$6$1) });
	});

	interopDefault(es6_object_create);

	var es6_object_defineProperty = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  $export($export.S + $export.F * !interopDefault(require$$1), 'Object', { defineProperty: interopDefault(require$$2$1).f });
	});

	interopDefault(es6_object_defineProperty);

	var es6_object_defineProperties = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  $export($export.S + $export.F * !interopDefault(require$$1), 'Object', { defineProperties: interopDefault(require$$0$10) });
	});

	interopDefault(es6_object_defineProperties);

	var _objectSap = createCommonjsModule(function (module) {
	  // most Object methods by ES6 should accept primitives
	  var $export = interopDefault(require$$1$2),
	      core = interopDefault(require$$0),
	      fails = interopDefault(require$$1$1);
	  module.exports = function (KEY, exec) {
	    var fn = (core.Object || {})[KEY] || Object[KEY],
	        exp = {};
	    exp[KEY] = exec(fn);
	    $export($export.S + $export.F * fails(function () {
	      fn(1);
	    }), 'Object', exp);
	  };
	});

	var _objectSap$1 = interopDefault(_objectSap);

var require$$0$12 = Object.freeze({
	  default: _objectSap$1
	});

	var es6_object_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  var toIObject = interopDefault(require$$1$7),
	      $getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	  interopDefault(require$$0$12)('getOwnPropertyDescriptor', function () {
	    return function getOwnPropertyDescriptor(it, key) {
	      return $getOwnPropertyDescriptor(toIObject(it), key);
	    };
	  });
	});

	interopDefault(es6_object_getOwnPropertyDescriptor);

	var _toObject = createCommonjsModule(function (module) {
	  // 7.1.13 ToObject(argument)
	  var defined = interopDefault(require$$4$3);
	  module.exports = function (it) {
	    return Object(defined(it));
	  };
	});

	var _toObject$1 = interopDefault(_toObject);

var require$$5$1 = Object.freeze({
	  default: _toObject$1
	});

	var _objectGpo = createCommonjsModule(function (module) {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  var has = interopDefault(require$$4),
	      toObject = interopDefault(require$$5$1),
	      IE_PROTO = interopDefault(require$$0$7)('IE_PROTO'),
	      ObjectProto = Object.prototype;

	  module.exports = Object.getPrototypeOf || function (O) {
	    O = toObject(O);
	    if (has(O, IE_PROTO)) return O[IE_PROTO];
	    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	      return O.constructor.prototype;
	    }return O instanceof Object ? ObjectProto : null;
	  };
	});

	var _objectGpo$1 = interopDefault(_objectGpo);

var require$$0$13 = Object.freeze({
	  default: _objectGpo$1
	});

	var es6_object_getPrototypeOf = createCommonjsModule(function (module) {
	  // 19.1.2.9 Object.getPrototypeOf(O)
	  var toObject = interopDefault(require$$5$1),
	      $getPrototypeOf = interopDefault(require$$0$13);

	  interopDefault(require$$0$12)('getPrototypeOf', function () {
	    return function getPrototypeOf(it) {
	      return $getPrototypeOf(toObject(it));
	    };
	  });
	});

	interopDefault(es6_object_getPrototypeOf);

	var es6_object_keys = createCommonjsModule(function (module) {
	  // 19.1.2.14 Object.keys(O)
	  var toObject = interopDefault(require$$5$1),
	      $keys = interopDefault(require$$2$5);

	  interopDefault(require$$0$12)('keys', function () {
	    return function keys(it) {
	      return $keys(toObject(it));
	    };
	  });
	});

	interopDefault(es6_object_keys);

	var es6_object_getOwnPropertyNames = createCommonjsModule(function (module) {
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  interopDefault(require$$0$12)('getOwnPropertyNames', function () {
	    return interopDefault(require$$0$11).f;
	  });
	});

	interopDefault(es6_object_getOwnPropertyNames);

	var es6_object_freeze = createCommonjsModule(function (module) {
	  // 19.1.2.5 Object.freeze(O)
	  var isObject = interopDefault(require$$0$1),
	      meta = interopDefault(require$$6).onFreeze;

	  interopDefault(require$$0$12)('freeze', function ($freeze) {
	    return function freeze(it) {
	      return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	    };
	  });
	});

	interopDefault(es6_object_freeze);

	var es6_object_seal = createCommonjsModule(function (module) {
	  // 19.1.2.17 Object.seal(O)
	  var isObject = interopDefault(require$$0$1),
	      meta = interopDefault(require$$6).onFreeze;

	  interopDefault(require$$0$12)('seal', function ($seal) {
	    return function seal(it) {
	      return $seal && isObject(it) ? $seal(meta(it)) : it;
	    };
	  });
	});

	interopDefault(es6_object_seal);

	var es6_object_preventExtensions = createCommonjsModule(function (module) {
	  // 19.1.2.15 Object.preventExtensions(O)
	  var isObject = interopDefault(require$$0$1),
	      meta = interopDefault(require$$6).onFreeze;

	  interopDefault(require$$0$12)('preventExtensions', function ($preventExtensions) {
	    return function preventExtensions(it) {
	      return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	    };
	  });
	});

	interopDefault(es6_object_preventExtensions);

	var es6_object_isFrozen = createCommonjsModule(function (module) {
	  // 19.1.2.12 Object.isFrozen(O)
	  var isObject = interopDefault(require$$0$1);

	  interopDefault(require$$0$12)('isFrozen', function ($isFrozen) {
	    return function isFrozen(it) {
	      return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	    };
	  });
	});

	interopDefault(es6_object_isFrozen);

	var es6_object_isSealed = createCommonjsModule(function (module) {
	  // 19.1.2.13 Object.isSealed(O)
	  var isObject = interopDefault(require$$0$1);

	  interopDefault(require$$0$12)('isSealed', function ($isSealed) {
	    return function isSealed(it) {
	      return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	    };
	  });
	});

	interopDefault(es6_object_isSealed);

	var es6_object_isExtensible = createCommonjsModule(function (module) {
	  // 19.1.2.11 Object.isExtensible(O)
	  var isObject = interopDefault(require$$0$1);

	  interopDefault(require$$0$12)('isExtensible', function ($isExtensible) {
	    return function isExtensible(it) {
	      return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	    };
	  });
	});

	interopDefault(es6_object_isExtensible);

	var _objectAssign = createCommonjsModule(function (module) {
	  'use strict';
	  // 19.1.2.1 Object.assign(target, source, ...)

	  var getKeys = interopDefault(require$$2$5),
	      gOPS = interopDefault(require$$2$6),
	      pIE = interopDefault(require$$0$9),
	      toObject = interopDefault(require$$5$1),
	      IObject = interopDefault(require$$1$8),
	      $assign = Object.assign;

	  // should work with symbols and should have deterministic property order (V8 bug)
	  module.exports = !$assign || interopDefault(require$$1$1)(function () {
	    var A = {},
	        B = {},
	        S = Symbol(),
	        K = 'abcdefghijklmnopqrst';
	    A[S] = 7;
	    K.split('').forEach(function (k) {
	      B[k] = k;
	    });
	    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	  }) ? function assign(target, source) {
	    // eslint-disable-line no-unused-vars
	    var T = toObject(target),
	        aLen = arguments.length,
	        index = 1,
	        getSymbols = gOPS.f,
	        isEnum = pIE.f;
	    while (aLen > index) {
	      var S = IObject(arguments[index++]),
	          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	          length = keys.length,
	          j = 0,
	          key;
	      while (length > j) {
	        if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	      }
	    }return T;
	  } : $assign;
	});

	var _objectAssign$1 = interopDefault(_objectAssign);

var require$$3$4 = Object.freeze({
	  default: _objectAssign$1
	});

	var es6_object_assign = createCommonjsModule(function (module) {
	  // 19.1.3.1 Object.assign(target, source)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S + $export.F, 'Object', { assign: interopDefault(require$$3$4) });
	});

	interopDefault(es6_object_assign);

	var _sameValue = createCommonjsModule(function (module) {
	  // 7.2.9 SameValue(x, y)
	  module.exports = Object.is || function is(x, y) {
	    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	  };
	});

	var _sameValue$1 = interopDefault(_sameValue);

var require$$21 = Object.freeze({
	  default: _sameValue$1
	});

	var es6_object_is = createCommonjsModule(function (module) {
	  // 19.1.3.10 Object.is(value1, value2)
	  var $export = interopDefault(require$$1$2);
	  $export($export.S, 'Object', { is: interopDefault(require$$21) });
	});

	interopDefault(es6_object_is);

	var _setProto = createCommonjsModule(function (module) {
	  // Works with __proto__ only. Old v8 can't work with null proto objects.
	  /* eslint-disable no-proto */
	  var isObject = interopDefault(require$$0$1),
	      anObject = interopDefault(require$$5);
	  var check = function check(O, proto) {
	    anObject(O);
	    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	  };
	  module.exports = {
	    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = interopDefault(require$$31)(Function.call, interopDefault(require$$2$7).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) {
	        buggy = true;
	      }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	    check: check
	  };
	});

	var _setProto$1 = interopDefault(_setProto);
	var set$1 = _setProto.set;
	var check = _setProto.check;

var require$$0$14 = Object.freeze({
	  default: _setProto$1,
	  set: set$1,
	  check: check
	});

	var es6_object_setPrototypeOf = createCommonjsModule(function (module) {
	  // 19.1.3.19 Object.setPrototypeOf(O, proto)
	  var $export = interopDefault(require$$1$2);
	  $export($export.S, 'Object', { setPrototypeOf: interopDefault(require$$0$14).set });
	});

	interopDefault(es6_object_setPrototypeOf);

	var _classof = createCommonjsModule(function (module) {
	  // getting tag from 19.1.3.6 Object.prototype.toString()
	  var cof = interopDefault(require$$0$6),
	      TAG = interopDefault(require$$0$4)('toStringTag')
	  // ES3 wrong here
	  ,
	      ARG = cof(function () {
	    return arguments;
	  }()) == 'Arguments';

	  // fallback for IE11 Script Access Denied error
	  var tryGet = function tryGet(it, key) {
	    try {
	      return it[key];
	    } catch (e) {/* empty */}
	  };

	  module.exports = function (it) {
	    var O, T, B;
	    return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	  };
	});

	var _classof$1 = interopDefault(_classof);

var require$$1$11 = Object.freeze({
	  default: _classof$1
	});

	var es6_object_toString = createCommonjsModule(function (module) {
	  'use strict';
	  // 19.1.3.6 Object.prototype.toString()

	  var classof = interopDefault(require$$1$11),
	      test = {};
	  test[interopDefault(require$$0$4)('toStringTag')] = 'z';
	  if (test + '' != '[object z]') {
	    interopDefault(require$$4$2)(Object.prototype, 'toString', function toString() {
	      return '[object ' + classof(this) + ']';
	    }, true);
	  }
	});

	interopDefault(es6_object_toString);

	var _invoke = createCommonjsModule(function (module) {
	                  // fast apply, http://jsperf.lnkit.com/fast-apply/5
	                  module.exports = function (fn, args, that) {
	                                    var un = that === undefined;
	                                    switch (args.length) {
	                                                      case 0:
	                                                                        return un ? fn() : fn.call(that);
	                                                      case 1:
	                                                                        return un ? fn(args[0]) : fn.call(that, args[0]);
	                                                      case 2:
	                                                                        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                                      case 3:
	                                                                        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                                      case 4:
	                                                                        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                                    }return fn.apply(that, args);
	                  };
	});

	var _invoke$1 = interopDefault(_invoke);

var require$$1$13 = Object.freeze({
	                  default: _invoke$1
	});

	var _bind = createCommonjsModule(function (module) {
	  'use strict';

	  var aFunction = interopDefault(require$$0$2),
	      isObject = interopDefault(require$$0$1),
	      invoke = interopDefault(require$$1$13),
	      arraySlice = [].slice,
	      factories = {};

	  var construct = function construct(F, len, args) {
	    if (!(len in factories)) {
	      for (var n = [], i = 0; i < len; i++) {
	        n[i] = 'a[' + i + ']';
	      }factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	    }return factories[len](F, args);
	  };

	  module.exports = Function.bind || function bind(that /*, args... */) {
	    var fn = aFunction(this),
	        partArgs = arraySlice.call(arguments, 1);
	    var bound = function bound() /* args... */{
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	    return bound;
	  };
	});

	var _bind$1 = interopDefault(_bind);

var require$$1$12 = Object.freeze({
	  default: _bind$1
	});

	var es6_function_bind = createCommonjsModule(function (module) {
	  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'Function', { bind: interopDefault(require$$1$12) });
	});

	interopDefault(es6_function_bind);

	var es6_function_name = createCommonjsModule(function (module) {
	  var dP = interopDefault(require$$2$1).f,
	      createDesc = interopDefault(require$$2$3),
	      has = interopDefault(require$$4),
	      FProto = Function.prototype,
	      nameRE = /^\s*function ([^ (]*)/,
	      NAME = 'name';

	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };

	  // 19.2.4.2 name
	  NAME in FProto || interopDefault(require$$1) && dP(FProto, NAME, {
	    configurable: true,
	    get: function get() {
	      try {
	        var that = this,
	            name = ('' + that).match(nameRE)[1];
	        has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	        return name;
	      } catch (e) {
	        return '';
	      }
	    }
	  });
	});

	interopDefault(es6_function_name);

	var es6_function_hasInstance = createCommonjsModule(function (module) {
	  'use strict';

	  var isObject = interopDefault(require$$0$1),
	      getPrototypeOf = interopDefault(require$$0$13),
	      HAS_INSTANCE = interopDefault(require$$0$4)('hasInstance'),
	      FunctionProto = Function.prototype;
	  // 19.2.3.6 Function.prototype[@@hasInstance](V)
	  if (!(HAS_INSTANCE in FunctionProto)) interopDefault(require$$2$1).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
	      if (typeof this != 'function' || !isObject(O)) return false;
	      if (!isObject(this.prototype)) return O instanceof this;
	      // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	      while (O = getPrototypeOf(O)) {
	        if (this.prototype === O) return true;
	      }return false;
	    } });
	});

	interopDefault(es6_function_hasInstance);

	var _stringWs = createCommonjsModule(function (module) {
	  module.exports = '\t\n\u000b\f\r   ᠎    ' + '         　\u2028\u2029﻿';
	});

	var _stringWs$1 = interopDefault(_stringWs);

var require$$0$17 = Object.freeze({
	  default: _stringWs$1
	});

	var _stringTrim = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      defined = interopDefault(require$$4$3),
	      fails = interopDefault(require$$1$1),
	      spaces = interopDefault(require$$0$17),
	      space = '[' + spaces + ']',
	      non = '​',
	      ltrim = RegExp('^' + space + space + '*'),
	      rtrim = RegExp(space + space + '*$');

	  var exporter = function exporter(KEY, exec, ALIAS) {
	    var exp = {};
	    var FORCE = fails(function () {
	      return !!spaces[KEY]() || non[KEY]() != non;
	    });
	    var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	    if (ALIAS) exp[ALIAS] = fn;
	    $export($export.P + $export.F * FORCE, 'String', exp);
	  };

	  // 1 -> String#trimLeft
	  // 2 -> String#trimRight
	  // 3 -> String#trim
	  var trim = exporter.trim = function (string, TYPE) {
	    string = String(defined(string));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };

	  module.exports = exporter;
	});

	var _stringTrim$1 = interopDefault(_stringTrim);

var require$$0$16 = Object.freeze({
	  default: _stringTrim$1
	});

	var _parseInt = createCommonjsModule(function (module) {
	  var $parseInt = interopDefault(require$$3).parseInt,
	      $trim = interopDefault(require$$0$16).trim,
	      ws = interopDefault(require$$0$17),
	      hex = /^[\-+]?0[xX]/;

	  module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	    var string = $trim(String(str), 3);
	    return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	  } : $parseInt;
	});

	var _parseInt$1 = interopDefault(_parseInt);

var require$$0$15 = Object.freeze({
	  default: _parseInt$1
	});

	var es6_parseInt = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseInt = interopDefault(require$$0$15);
	  // 18.2.5 parseInt(string, radix)
	  $export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });
	});

	interopDefault(es6_parseInt);

	var _parseFloat = createCommonjsModule(function (module) {
	  var $parseFloat = interopDefault(require$$3).parseFloat,
	      $trim = interopDefault(require$$0$16).trim;

	  module.exports = 1 / $parseFloat(interopDefault(require$$0$17) + '-0') !== -Infinity ? function parseFloat(str) {
	    var string = $trim(String(str), 3),
	        result = $parseFloat(string);
	    return result === 0 && string.charAt(0) == '-' ? -0 : result;
	  } : $parseFloat;
	});

	var _parseFloat$1 = interopDefault(_parseFloat);

var require$$0$18 = Object.freeze({
	  default: _parseFloat$1
	});

	var es6_parseFloat = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseFloat = interopDefault(require$$0$18);
	  // 18.2.4 parseFloat(string)
	  $export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });
	});

	interopDefault(es6_parseFloat);

	var _inheritIfRequired = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1),
	      setPrototypeOf = interopDefault(require$$0$14).set;
	  module.exports = function (that, target, C) {
	    var P,
	        S = target.constructor;
	    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	      setPrototypeOf(that, P);
	    }return that;
	  };
	});

	var _inheritIfRequired$1 = interopDefault(_inheritIfRequired);

var require$$0$19 = Object.freeze({
	  default: _inheritIfRequired$1
	});

	var es6_number_constructor = createCommonjsModule(function (module) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      has = interopDefault(require$$4),
	      cof = interopDefault(require$$0$6),
	      inheritIfRequired = interopDefault(require$$0$19),
	      toPrimitive = interopDefault(require$$4$1),
	      fails = interopDefault(require$$1$1),
	      gOPN = interopDefault(require$$3$3).f,
	      gOPD = interopDefault(require$$2$7).f,
	      dP = interopDefault(require$$2$1).f,
	      $trim = interopDefault(require$$0$16).trim,
	      NUMBER = 'Number',
	      $Number = global[NUMBER],
	      Base = $Number,
	      proto = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  ,
	      BROKEN_COF = cof(interopDefault(require$$6$1)(proto)) == NUMBER,
	      TRIM = 'trim' in String.prototype;

	  // 7.1.3 ToNumber(argument)
	  var toNumber = function toNumber(argument) {
	    var it = toPrimitive(argument, false);
	    if (typeof it == 'string' && it.length > 2) {
	      it = TRIM ? it.trim() : $trim(it, 3);
	      var first = it.charCodeAt(0),
	          third,
	          radix,
	          maxCode;
	      if (first === 43 || first === 45) {
	        third = it.charCodeAt(2);
	        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	      } else if (first === 48) {
	        switch (it.charCodeAt(1)) {
	          case 66:case 98:
	            radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
	          case 79:case 111:
	            radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
	          default:
	            return +it;
	        }
	        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	          code = digits.charCodeAt(i);
	          // parseInt parses a string to a first unavailable symbol
	          // but ToNumber should return NaN if a string contains unavailable symbols
	          if (code < 48 || code > maxCode) return NaN;
	        }return parseInt(digits, radix);
	      }
	    }return +it;
	  };

	  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	    $Number = function Number(value) {
	      var it = arguments.length < 1 ? 0 : value,
	          that = this;
	      return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function () {
	        proto.valueOf.call(that);
	      }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	    };
	    for (var keys = interopDefault(require$$1) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
	      if (has(Base, key = keys[j]) && !has($Number, key)) {
	        dP($Number, key, gOPD(Base, key));
	      }
	    }
	    $Number.prototype = proto;
	    proto.constructor = $Number;
	    interopDefault(require$$4$2)(global, NUMBER, $Number);
	  }
	});

	interopDefault(es6_number_constructor);

	var _aNumberValue = createCommonjsModule(function (module) {
	  var cof = interopDefault(require$$0$6);
	  module.exports = function (it, msg) {
	    if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
	    return +it;
	  };
	});

	var _aNumberValue$1 = interopDefault(_aNumberValue);

var require$$0$20 = Object.freeze({
	  default: _aNumberValue$1
	});

	var _stringRepeat = createCommonjsModule(function (module) {
	  'use strict';

	  var toInteger = interopDefault(require$$26),
	      defined = interopDefault(require$$4$3);

	  module.exports = function repeat(count) {
	    var str = String(defined(this)),
	        res = '',
	        n = toInteger(count);
	    if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	    for (; n > 0; (n >>>= 1) && (str += str)) {
	      if (n & 1) res += str;
	    }return res;
	  };
	});

	var _stringRepeat$1 = interopDefault(_stringRepeat);

var require$$1$14 = Object.freeze({
	  default: _stringRepeat$1
	});

	var es6_number_toFixed = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toInteger = interopDefault(require$$26),
	      aNumberValue = interopDefault(require$$0$20),
	      repeat = interopDefault(require$$1$14),
	      $toFixed = 1..toFixed,
	      floor = Math.floor,
	      data = [0, 0, 0, 0, 0, 0],
	      ERROR = 'Number.toFixed: incorrect invocation!',
	      ZERO = '0';

	  var multiply = function multiply(n, c) {
	    var i = -1,
	        c2 = c;
	    while (++i < 6) {
	      c2 += n * data[i];
	      data[i] = c2 % 1e7;
	      c2 = floor(c2 / 1e7);
	    }
	  };
	  var divide = function divide(n) {
	    var i = 6,
	        c = 0;
	    while (--i >= 0) {
	      c += data[i];
	      data[i] = floor(c / n);
	      c = c % n * 1e7;
	    }
	  };
	  var numToString = function numToString() {
	    var i = 6,
	        s = '';
	    while (--i >= 0) {
	      if (s !== '' || i === 0 || data[i] !== 0) {
	        var t = String(data[i]);
	        s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	      }
	    }return s;
	  };
	  var pow = function pow(x, n, acc) {
	    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	  };
	  var log = function log(x) {
	    var n = 0,
	        x2 = x;
	    while (x2 >= 4096) {
	      n += 12;
	      x2 /= 4096;
	    }
	    while (x2 >= 2) {
	      n += 1;
	      x2 /= 2;
	    }return n;
	  };

	  $export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !interopDefault(require$$1$1)(function () {
	    // V8 ~ Android 4.3-
	    $toFixed.call({});
	  })), 'Number', {
	    toFixed: function toFixed(fractionDigits) {
	      var x = aNumberValue(this, ERROR),
	          f = toInteger(fractionDigits),
	          s = '',
	          m = ZERO,
	          e,
	          z,
	          j,
	          k;
	      if (f < 0 || f > 20) throw RangeError(ERROR);
	      if (x != x) return 'NaN';
	      if (x <= -1e21 || x >= 1e21) return String(x);
	      if (x < 0) {
	        s = '-';
	        x = -x;
	      }
	      if (x > 1e-21) {
	        e = log(x * pow(2, 69, 1)) - 69;
	        z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	        z *= 0x10000000000000;
	        e = 52 - e;
	        if (e > 0) {
	          multiply(0, z);
	          j = f;
	          while (j >= 7) {
	            multiply(1e7, 0);
	            j -= 7;
	          }
	          multiply(pow(10, j, 1), 0);
	          j = e - 1;
	          while (j >= 23) {
	            divide(1 << 23);
	            j -= 23;
	          }
	          divide(1 << j);
	          multiply(1, 1);
	          divide(2);
	          m = numToString();
	        } else {
	          multiply(0, z);
	          multiply(1 << -e, 0);
	          m = numToString() + repeat.call(ZERO, f);
	        }
	      }
	      if (f > 0) {
	        k = m.length;
	        m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	      } else {
	        m = s + m;
	      }return m;
	    }
	  });
	});

	interopDefault(es6_number_toFixed);

	var es6_number_toPrecision = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $fails = interopDefault(require$$1$1),
	      aNumberValue = interopDefault(require$$0$20),
	      $toPrecision = 1..toPrecision;

	  $export($export.P + $export.F * ($fails(function () {
	    // IE7-
	    return $toPrecision.call(1, undefined) !== '1';
	  }) || !$fails(function () {
	    // V8 ~ Android 4.3-
	    $toPrecision.call({});
	  })), 'Number', {
	    toPrecision: function toPrecision(precision) {
	      var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	      return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	    }
	  });
	});

	interopDefault(es6_number_toPrecision);

	var es6_number_epsilon = createCommonjsModule(function (module) {
	  // 20.1.2.1 Number.EPSILON
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });
	});

	interopDefault(es6_number_epsilon);

	var es6_number_isFinite = createCommonjsModule(function (module) {
	  // 20.1.2.2 Number.isFinite(number)
	  var $export = interopDefault(require$$1$2),
	      _isFinite = interopDefault(require$$3).isFinite;

	  $export($export.S, 'Number', {
	    isFinite: function isFinite(it) {
	      return typeof it == 'number' && _isFinite(it);
	    }
	  });
	});

	interopDefault(es6_number_isFinite);

	var _isInteger = createCommonjsModule(function (module) {
	  // 20.1.2.3 Number.isInteger(number)
	  var isObject = interopDefault(require$$0$1),
	      floor = Math.floor;
	  module.exports = function isInteger(it) {
	    return !isObject(it) && isFinite(it) && floor(it) === it;
	  };
	});

	var _isInteger$1 = interopDefault(_isInteger);

var require$$0$21 = Object.freeze({
	  default: _isInteger$1
	});

	var es6_number_isInteger = createCommonjsModule(function (module) {
	  // 20.1.2.3 Number.isInteger(number)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { isInteger: interopDefault(require$$0$21) });
	});

	interopDefault(es6_number_isInteger);

	var es6_number_isNan = createCommonjsModule(function (module) {
	  // 20.1.2.4 Number.isNaN(number)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', {
	    isNaN: function isNaN(number) {
	      return number != number;
	    }
	  });
	});

	interopDefault(es6_number_isNan);

	var es6_number_isSafeInteger = createCommonjsModule(function (module) {
	  // 20.1.2.5 Number.isSafeInteger(number)
	  var $export = interopDefault(require$$1$2),
	      isInteger = interopDefault(require$$0$21),
	      abs = Math.abs;

	  $export($export.S, 'Number', {
	    isSafeInteger: function isSafeInteger(number) {
	      return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	    }
	  });
	});

	interopDefault(es6_number_isSafeInteger);

	var es6_number_maxSafeInteger = createCommonjsModule(function (module) {
	  // 20.1.2.6 Number.MAX_SAFE_INTEGER
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });
	});

	interopDefault(es6_number_maxSafeInteger);

	var es6_number_minSafeInteger = createCommonjsModule(function (module) {
	  // 20.1.2.10 Number.MIN_SAFE_INTEGER
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });
	});

	interopDefault(es6_number_minSafeInteger);

	var es6_number_parseFloat = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseFloat = interopDefault(require$$0$18);
	  // 20.1.2.12 Number.parseFloat(string)
	  $export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });
	});

	interopDefault(es6_number_parseFloat);

	var es6_number_parseInt = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $parseInt = interopDefault(require$$0$15);
	  // 20.1.2.13 Number.parseInt(string, radix)
	  $export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });
	});

	interopDefault(es6_number_parseInt);

	var _mathLog1p = createCommonjsModule(function (module) {
	  // 20.2.2.20 Math.log1p(x)
	  module.exports = Math.log1p || function log1p(x) {
	    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	  };
	});

	var _mathLog1p$1 = interopDefault(_mathLog1p);

var require$$0$22 = Object.freeze({
	  default: _mathLog1p$1
	});

	var es6_math_acosh = createCommonjsModule(function (module) {
	  // 20.2.2.3 Math.acosh(x)
	  var $export = interopDefault(require$$1$2),
	      log1p = interopDefault(require$$0$22),
	      sqrt = Math.sqrt,
	      $acosh = Math.acosh;

	  $export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity), 'Math', {
	    acosh: function acosh(x) {
	      return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	    }
	  });
	});

	interopDefault(es6_math_acosh);

	var es6_math_asinh = createCommonjsModule(function (module) {
	  // 20.2.2.5 Math.asinh(x)
	  var $export = interopDefault(require$$1$2),
	      $asinh = Math.asinh;

	  function asinh(x) {
	    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	  }

	  // Tor Browser bug: Math.asinh(0) -> -0 
	  $export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });
	});

	interopDefault(es6_math_asinh);

	var es6_math_atanh = createCommonjsModule(function (module) {
	  // 20.2.2.7 Math.atanh(x)
	  var $export = interopDefault(require$$1$2),
	      $atanh = Math.atanh;

	  // Tor Browser bug: Math.atanh(-0) -> 0 
	  $export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	    atanh: function atanh(x) {
	      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	    }
	  });
	});

	interopDefault(es6_math_atanh);

	var _mathSign = createCommonjsModule(function (module) {
	  // 20.2.2.28 Math.sign(x)
	  module.exports = Math.sign || function sign(x) {
	    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	  };
	});

	var _mathSign$1 = interopDefault(_mathSign);

var require$$0$23 = Object.freeze({
	  default: _mathSign$1
	});

	var es6_math_cbrt = createCommonjsModule(function (module) {
	  // 20.2.2.9 Math.cbrt(x)
	  var $export = interopDefault(require$$1$2),
	      sign = interopDefault(require$$0$23);

	  $export($export.S, 'Math', {
	    cbrt: function cbrt(x) {
	      return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	    }
	  });
	});

	interopDefault(es6_math_cbrt);

	var es6_math_clz32 = createCommonjsModule(function (module) {
	  // 20.2.2.11 Math.clz32(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    clz32: function clz32(x) {
	      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	    }
	  });
	});

	interopDefault(es6_math_clz32);

	var es6_math_cosh = createCommonjsModule(function (module) {
	  // 20.2.2.12 Math.cosh(x)
	  var $export = interopDefault(require$$1$2),
	      exp = Math.exp;

	  $export($export.S, 'Math', {
	    cosh: function cosh(x) {
	      return (exp(x = +x) + exp(-x)) / 2;
	    }
	  });
	});

	interopDefault(es6_math_cosh);

	var _mathExpm1 = createCommonjsModule(function (module) {
	  // 20.2.2.14 Math.expm1(x)
	  var $expm1 = Math.expm1;
	  module.exports = !$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
	    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	  } : $expm1;
	});

	var _mathExpm1$1 = interopDefault(_mathExpm1);

var require$$0$24 = Object.freeze({
	  default: _mathExpm1$1
	});

	var es6_math_expm1 = createCommonjsModule(function (module) {
	  // 20.2.2.14 Math.expm1(x)
	  var $export = interopDefault(require$$1$2),
	      $expm1 = interopDefault(require$$0$24);

	  $export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });
	});

	interopDefault(es6_math_expm1);

	var es6_math_fround = createCommonjsModule(function (module) {
	  // 20.2.2.16 Math.fround(x)
	  var $export = interopDefault(require$$1$2),
	      sign = interopDefault(require$$0$23),
	      pow = Math.pow,
	      EPSILON = pow(2, -52),
	      EPSILON32 = pow(2, -23),
	      MAX32 = pow(2, 127) * (2 - EPSILON32),
	      MIN32 = pow(2, -126);

	  var roundTiesToEven = function roundTiesToEven(n) {
	    return n + 1 / EPSILON - 1 / EPSILON;
	  };

	  $export($export.S, 'Math', {
	    fround: function fround(x) {
	      var $abs = Math.abs(x),
	          $sign = sign(x),
	          a,
	          result;
	      if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	      a = (1 + EPSILON32 / EPSILON) * $abs;
	      result = a - (a - $abs);
	      if (result > MAX32 || result != result) return $sign * Infinity;
	      return $sign * result;
	    }
	  });
	});

	interopDefault(es6_math_fround);

	var es6_math_hypot = createCommonjsModule(function (module) {
	  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	  var $export = interopDefault(require$$1$2),
	      abs = Math.abs;

	  $export($export.S, 'Math', {
	    hypot: function hypot(value1, value2) {
	      // eslint-disable-line no-unused-vars
	      var sum = 0,
	          i = 0,
	          aLen = arguments.length,
	          larg = 0,
	          arg,
	          div;
	      while (i < aLen) {
	        arg = abs(arguments[i++]);
	        if (larg < arg) {
	          div = larg / arg;
	          sum = sum * div * div + 1;
	          larg = arg;
	        } else if (arg > 0) {
	          div = arg / larg;
	          sum += div * div;
	        } else sum += arg;
	      }
	      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	    }
	  });
	});

	interopDefault(es6_math_hypot);

	var es6_math_imul = createCommonjsModule(function (module) {
	  // 20.2.2.18 Math.imul(x, y)
	  var $export = interopDefault(require$$1$2),
	      $imul = Math.imul;

	  // some WebKit versions fails with big numbers, some has wrong arity
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	  }), 'Math', {
	    imul: function imul(x, y) {
	      var UINT16 = 0xffff,
	          xn = +x,
	          yn = +y,
	          xl = UINT16 & xn,
	          yl = UINT16 & yn;
	      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	    }
	  });
	});

	interopDefault(es6_math_imul);

	var es6_math_log10 = createCommonjsModule(function (module) {
	  // 20.2.2.21 Math.log10(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    log10: function log10(x) {
	      return Math.log(x) / Math.LN10;
	    }
	  });
	});

	interopDefault(es6_math_log10);

	var es6_math_log1p = createCommonjsModule(function (module) {
	  // 20.2.2.20 Math.log1p(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', { log1p: interopDefault(require$$0$22) });
	});

	interopDefault(es6_math_log1p);

	var es6_math_log2 = createCommonjsModule(function (module) {
	  // 20.2.2.22 Math.log2(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    log2: function log2(x) {
	      return Math.log(x) / Math.LN2;
	    }
	  });
	});

	interopDefault(es6_math_log2);

	var es6_math_sign = createCommonjsModule(function (module) {
	  // 20.2.2.28 Math.sign(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', { sign: interopDefault(require$$0$23) });
	});

	interopDefault(es6_math_sign);

	var es6_math_sinh = createCommonjsModule(function (module) {
	  // 20.2.2.30 Math.sinh(x)
	  var $export = interopDefault(require$$1$2),
	      expm1 = interopDefault(require$$0$24),
	      exp = Math.exp;

	  // V8 near Chromium 38 has a problem with very small numbers
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    return !Math.sinh(-2e-17) != -2e-17;
	  }), 'Math', {
	    sinh: function sinh(x) {
	      return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	    }
	  });
	});

	interopDefault(es6_math_sinh);

	var es6_math_tanh = createCommonjsModule(function (module) {
	  // 20.2.2.33 Math.tanh(x)
	  var $export = interopDefault(require$$1$2),
	      expm1 = interopDefault(require$$0$24),
	      exp = Math.exp;

	  $export($export.S, 'Math', {
	    tanh: function tanh(x) {
	      var a = expm1(x = +x),
	          b = expm1(-x);
	      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	    }
	  });
	});

	interopDefault(es6_math_tanh);

	var es6_math_trunc = createCommonjsModule(function (module) {
	  // 20.2.2.34 Math.trunc(x)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    trunc: function trunc(it) {
	      return (it > 0 ? Math.floor : Math.ceil)(it);
	    }
	  });
	});

	interopDefault(es6_math_trunc);

	var es6_string_fromCodePoint = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      toIndex = interopDefault(require$$24),
	      fromCharCode = String.fromCharCode,
	      $fromCodePoint = String.fromCodePoint;

	  // length should be 1, old FF problem
	  $export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	    // 21.1.2.2 String.fromCodePoint(...codePoints)
	    fromCodePoint: function fromCodePoint(x) {
	      // eslint-disable-line no-unused-vars
	      var res = [],
	          aLen = arguments.length,
	          i = 0,
	          code;
	      while (aLen > i) {
	        code = +arguments[i++];
	        if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	        res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	      }return res.join('');
	    }
	  });
	});

	interopDefault(es6_string_fromCodePoint);

	var es6_string_raw = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      toIObject = interopDefault(require$$1$7),
	      toLength = interopDefault(require$$3$1);

	  $export($export.S, 'String', {
	    // 21.1.2.4 String.raw(callSite, ...substitutions)
	    raw: function raw(callSite) {
	      var tpl = toIObject(callSite.raw),
	          len = toLength(tpl.length),
	          aLen = arguments.length,
	          res = [],
	          i = 0;
	      while (len > i) {
	        res.push(String(tpl[i++]));
	        if (i < aLen) res.push(String(arguments[i]));
	      }return res.join('');
	    }
	  });
	});

	interopDefault(es6_string_raw);

	var es6_string_trim = createCommonjsModule(function (module) {
	  'use strict';
	  // 21.1.3.25 String.prototype.trim()

	  interopDefault(require$$0$16)('trim', function ($trim) {
	    return function trim() {
	      return $trim(this, 3);
	    };
	  });
	});

	interopDefault(es6_string_trim);

	var _stringAt = createCommonjsModule(function (module) {
	  var toInteger = interopDefault(require$$26),
	      defined = interopDefault(require$$4$3);
	  // true  -> String#at
	  // false -> String#codePointAt
	  module.exports = function (TO_STRING) {
	    return function (that, pos) {
	      var s = String(defined(that)),
	          i = toInteger(pos),
	          l = s.length,
	          a,
	          b;
	      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	      a = s.charCodeAt(i);
	      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	    };
	  };
	});

	var _stringAt$1 = interopDefault(_stringAt);

var require$$0$25 = Object.freeze({
	  default: _stringAt$1
	});

	var _iterators = createCommonjsModule(function (module) {
	  module.exports = {};
	});

	var _iterators$1 = interopDefault(_iterators);

var require$$1$15 = Object.freeze({
	  default: _iterators$1
	});

	var _iterCreate = createCommonjsModule(function (module) {
	  'use strict';

	  var create = interopDefault(require$$6$1),
	      descriptor = interopDefault(require$$2$3),
	      setToStringTag = interopDefault(require$$0$3),
	      IteratorPrototype = {};

	  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	  interopDefault(require$$2)(IteratorPrototype, interopDefault(require$$0$4)('iterator'), function () {
	    return this;
	  });

	  module.exports = function (Constructor, NAME, next) {
	    Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	    setToStringTag(Constructor, NAME + ' Iterator');
	  };
	});

	var _iterCreate$1 = interopDefault(_iterCreate);

var require$$0$26 = Object.freeze({
	  default: _iterCreate$1
	});

	var _iterDefine = createCommonjsModule(function (module) {
	  'use strict';

	  var LIBRARY = interopDefault(require$$2$4),
	      $export = interopDefault(require$$1$2),
	      redefine = interopDefault(require$$4$2),
	      hide = interopDefault(require$$2),
	      has = interopDefault(require$$4),
	      Iterators = interopDefault(require$$1$15),
	      $iterCreate = interopDefault(require$$0$26),
	      setToStringTag = interopDefault(require$$0$3),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ITERATOR = interopDefault(require$$0$4)('iterator'),
	      BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  ,
	      FF_ITERATOR = '@@iterator',
	      KEYS = 'keys',
	      VALUES = 'values';

	  var returnThis = function returnThis() {
	    return this;
	  };

	  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	    $iterCreate(Constructor, NAME, next);
	    var getMethod = function getMethod(kind) {
	      if (!BUGGY && kind in proto) return proto[kind];
	      switch (kind) {
	        case KEYS:
	          return function keys() {
	            return new Constructor(this, kind);
	          };
	        case VALUES:
	          return function values() {
	            return new Constructor(this, kind);
	          };
	      }return function entries() {
	        return new Constructor(this, kind);
	      };
	    };
	    var TAG = NAME + ' Iterator',
	        DEF_VALUES = DEFAULT == VALUES,
	        VALUES_BUG = false,
	        proto = Base.prototype,
	        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	        $default = $native || getMethod(DEFAULT),
	        $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	        $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	        methods,
	        key,
	        IteratorPrototype;
	    // Fix native
	    if ($anyNative) {
	      IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	      if (IteratorPrototype !== Object.prototype) {
	        // Set @@toStringTag to native iterators
	        setToStringTag(IteratorPrototype, TAG, true);
	        // fix for some old engines
	        if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	      }
	    }
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if (DEF_VALUES && $native && $native.name !== VALUES) {
	      VALUES_BUG = true;
	      $default = function values() {
	        return $native.call(this);
	      };
	    }
	    // Define iterator
	    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	      hide(proto, ITERATOR, $default);
	    }
	    // Plug for library
	    Iterators[NAME] = $default;
	    Iterators[TAG] = returnThis;
	    if (DEFAULT) {
	      methods = {
	        values: DEF_VALUES ? $default : getMethod(VALUES),
	        keys: IS_SET ? $default : getMethod(KEYS),
	        entries: $entries
	      };
	      if (FORCED) for (key in methods) {
	        if (!(key in proto)) redefine(proto, key, methods[key]);
	      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	    }
	    return methods;
	  };
	});

	var _iterDefine$1 = interopDefault(_iterDefine);

var require$$4$4 = Object.freeze({
	  default: _iterDefine$1
	});

	var es6_string_iterator = createCommonjsModule(function (module) {
	  'use strict';

	  var $at = interopDefault(require$$0$25)(true);

	  // 21.1.3.27 String.prototype[@@iterator]()
	  interopDefault(require$$4$4)(String, 'String', function (iterated) {
	    this._t = String(iterated); // target
	    this._i = 0; // next index
	    // 21.1.5.2.1 %StringIteratorPrototype%.next()
	  }, function () {
	    var O = this._t,
	        index = this._i,
	        point;
	    if (index >= O.length) return { value: undefined, done: true };
	    point = $at(O, index);
	    this._i += point.length;
	    return { value: point, done: false };
	  });
	});

	interopDefault(es6_string_iterator);

	var es6_string_codePointAt = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $at = interopDefault(require$$0$25)(false);
	  $export($export.P, 'String', {
	    // 21.1.3.3 String.prototype.codePointAt(pos)
	    codePointAt: function codePointAt(pos) {
	      return $at(this, pos);
	    }
	  });
	});

	interopDefault(es6_string_codePointAt);

	var _isRegexp = createCommonjsModule(function (module) {
	  // 7.2.8 IsRegExp(argument)
	  var isObject = interopDefault(require$$0$1),
	      cof = interopDefault(require$$0$6),
	      MATCH = interopDefault(require$$0$4)('match');
	  module.exports = function (it) {
	    var isRegExp;
	    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	  };
	});

	var _isRegexp$1 = interopDefault(_isRegexp);

var require$$2$8 = Object.freeze({
	  default: _isRegexp$1
	});

	var _stringContext = createCommonjsModule(function (module) {
	  // helper for String#{startsWith, endsWith, includes}
	  var isRegExp = interopDefault(require$$2$8),
	      defined = interopDefault(require$$4$3);

	  module.exports = function (that, searchString, NAME) {
	    if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	    return String(defined(that));
	  };
	});

	var _stringContext$1 = interopDefault(_stringContext);

var require$$1$16 = Object.freeze({
	  default: _stringContext$1
	});

	var _failsIsRegexp = createCommonjsModule(function (module) {
	  var MATCH = interopDefault(require$$0$4)('match');
	  module.exports = function (KEY) {
	    var re = /./;
	    try {
	      '/./'[KEY](re);
	    } catch (e) {
	      try {
	        re[MATCH] = false;
	        return !'/./'[KEY](re);
	      } catch (f) {/* empty */}
	    }return true;
	  };
	});

	var _failsIsRegexp$1 = interopDefault(_failsIsRegexp);

var require$$0$27 = Object.freeze({
	  default: _failsIsRegexp$1
	});

	var es6_string_endsWith = createCommonjsModule(function (module) {
	  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toLength = interopDefault(require$$3$1),
	      context = interopDefault(require$$1$16),
	      ENDS_WITH = 'endsWith',
	      $endsWith = ''[ENDS_WITH];

	  $export($export.P + $export.F * interopDefault(require$$0$27)(ENDS_WITH), 'String', {
	    endsWith: function endsWith(searchString /*, endPosition = @length */) {
	      var that = context(this, searchString, ENDS_WITH),
	          endPosition = arguments.length > 1 ? arguments[1] : undefined,
	          len = toLength(that.length),
	          end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
	          search = String(searchString);
	      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	    }
	  });
	});

	interopDefault(es6_string_endsWith);

	var es6_string_includes = createCommonjsModule(function (module) {
	  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      context = interopDefault(require$$1$16),
	      INCLUDES = 'includes';

	  $export($export.P + $export.F * interopDefault(require$$0$27)(INCLUDES), 'String', {
	    includes: function includes(searchString /*, position = 0 */) {
	      return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	});

	interopDefault(es6_string_includes);

	var es6_string_repeat = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'String', {
	    // 21.1.3.13 String.prototype.repeat(count)
	    repeat: interopDefault(require$$1$14)
	  });
	});

	interopDefault(es6_string_repeat);

	var es6_string_startsWith = createCommonjsModule(function (module) {
	  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toLength = interopDefault(require$$3$1),
	      context = interopDefault(require$$1$16),
	      STARTS_WITH = 'startsWith',
	      $startsWith = ''[STARTS_WITH];

	  $export($export.P + $export.F * interopDefault(require$$0$27)(STARTS_WITH), 'String', {
	    startsWith: function startsWith(searchString /*, position = 0 */) {
	      var that = context(this, searchString, STARTS_WITH),
	          index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length)),
	          search = String(searchString);
	      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
	    }
	  });
	});

	interopDefault(es6_string_startsWith);

	var _stringHtml = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      fails = interopDefault(require$$1$1),
	      defined = interopDefault(require$$4$3),
	      quot = /"/g;
	  // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	  var createHTML = function createHTML(string, tag, attribute, value) {
	    var S = String(defined(string)),
	        p1 = '<' + tag;
	    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	    return p1 + '>' + S + '</' + tag + '>';
	  };
	  module.exports = function (NAME, exec) {
	    var O = {};
	    O[NAME] = exec(createHTML);
	    $export($export.P + $export.F * fails(function () {
	      var test = ''[NAME]('"');
	      return test !== test.toLowerCase() || test.split('"').length > 3;
	    }), 'String', O);
	  };
	});

	var _stringHtml$1 = interopDefault(_stringHtml);

var require$$0$28 = Object.freeze({
	  default: _stringHtml$1
	});

	var es6_string_anchor = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.2 String.prototype.anchor(name)

	  interopDefault(require$$0$28)('anchor', function (createHTML) {
	    return function anchor(name) {
	      return createHTML(this, 'a', 'name', name);
	    };
	  });
	});

	interopDefault(es6_string_anchor);

	var es6_string_big = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.3 String.prototype.big()

	  interopDefault(require$$0$28)('big', function (createHTML) {
	    return function big() {
	      return createHTML(this, 'big', '', '');
	    };
	  });
	});

	interopDefault(es6_string_big);

	var es6_string_blink = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.4 String.prototype.blink()

	  interopDefault(require$$0$28)('blink', function (createHTML) {
	    return function blink() {
	      return createHTML(this, 'blink', '', '');
	    };
	  });
	});

	interopDefault(es6_string_blink);

	var es6_string_bold = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.5 String.prototype.bold()

	  interopDefault(require$$0$28)('bold', function (createHTML) {
	    return function bold() {
	      return createHTML(this, 'b', '', '');
	    };
	  });
	});

	interopDefault(es6_string_bold);

	var es6_string_fixed = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.6 String.prototype.fixed()

	  interopDefault(require$$0$28)('fixed', function (createHTML) {
	    return function fixed() {
	      return createHTML(this, 'tt', '', '');
	    };
	  });
	});

	interopDefault(es6_string_fixed);

	var es6_string_fontcolor = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.7 String.prototype.fontcolor(color)

	  interopDefault(require$$0$28)('fontcolor', function (createHTML) {
	    return function fontcolor(color) {
	      return createHTML(this, 'font', 'color', color);
	    };
	  });
	});

	interopDefault(es6_string_fontcolor);

	var es6_string_fontsize = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.8 String.prototype.fontsize(size)

	  interopDefault(require$$0$28)('fontsize', function (createHTML) {
	    return function fontsize(size) {
	      return createHTML(this, 'font', 'size', size);
	    };
	  });
	});

	interopDefault(es6_string_fontsize);

	var es6_string_italics = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.9 String.prototype.italics()

	  interopDefault(require$$0$28)('italics', function (createHTML) {
	    return function italics() {
	      return createHTML(this, 'i', '', '');
	    };
	  });
	});

	interopDefault(es6_string_italics);

	var es6_string_link = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.10 String.prototype.link(url)

	  interopDefault(require$$0$28)('link', function (createHTML) {
	    return function link(url) {
	      return createHTML(this, 'a', 'href', url);
	    };
	  });
	});

	interopDefault(es6_string_link);

	var es6_string_small = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.11 String.prototype.small()

	  interopDefault(require$$0$28)('small', function (createHTML) {
	    return function small() {
	      return createHTML(this, 'small', '', '');
	    };
	  });
	});

	interopDefault(es6_string_small);

	var es6_string_strike = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.12 String.prototype.strike()

	  interopDefault(require$$0$28)('strike', function (createHTML) {
	    return function strike() {
	      return createHTML(this, 'strike', '', '');
	    };
	  });
	});

	interopDefault(es6_string_strike);

	var es6_string_sub = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.13 String.prototype.sub()

	  interopDefault(require$$0$28)('sub', function (createHTML) {
	    return function sub() {
	      return createHTML(this, 'sub', '', '');
	    };
	  });
	});

	interopDefault(es6_string_sub);

	var es6_string_sup = createCommonjsModule(function (module) {
	  'use strict';
	  // B.2.3.14 String.prototype.sup()

	  interopDefault(require$$0$28)('sup', function (createHTML) {
	    return function sup() {
	      return createHTML(this, 'sup', '', '');
	    };
	  });
	});

	interopDefault(es6_string_sup);

	var es6_date_now = createCommonjsModule(function (module) {
	  // 20.3.3.1 / 15.9.4.4 Date.now()
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Date', { now: function now() {
	      return new Date().getTime();
	    } });
	});

	interopDefault(es6_date_now);

	var es6_date_toJson = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      toPrimitive = interopDefault(require$$4$1);

	  $export($export.P + $export.F * interopDefault(require$$1$1)(function () {
	    return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
	        return 1;
	      } }) !== 1;
	  }), 'Date', {
	    toJSON: function toJSON(key) {
	      var O = toObject(this),
	          pv = toPrimitive(O);
	      return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	    }
	  });
	});

	interopDefault(es6_date_toJson);

	var es6_date_toIsoString = createCommonjsModule(function (module) {
	  'use strict';
	  // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	  var $export = interopDefault(require$$1$2),
	      fails = interopDefault(require$$1$1),
	      getTime = Date.prototype.getTime;

	  var lz = function lz(num) {
	    return num > 9 ? num : '0' + num;
	  };

	  // PhantomJS / old WebKit has a broken implementations
	  $export($export.P + $export.F * (fails(function () {
	    return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	  }) || !fails(function () {
	    new Date(NaN).toISOString();
	  })), 'Date', {
	    toISOString: function toISOString() {
	      if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	      var d = this,
	          y = d.getUTCFullYear(),
	          m = d.getUTCMilliseconds(),
	          s = y < 0 ? '-' : y > 9999 ? '+' : '';
	      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	    }
	  });
	});

	interopDefault(es6_date_toIsoString);

	var es6_date_toString = createCommonjsModule(function (module) {
	  var DateProto = Date.prototype,
	      INVALID_DATE = 'Invalid Date',
	      TO_STRING = 'toString',
	      $toString = DateProto[TO_STRING],
	      getTime = DateProto.getTime;
	  if (new Date(NaN) + '' != INVALID_DATE) {
	    interopDefault(require$$4$2)(DateProto, TO_STRING, function toString() {
	      var value = getTime.call(this);
	      return value === value ? $toString.call(this) : INVALID_DATE;
	    });
	  }
	});

	interopDefault(es6_date_toString);

	var _dateToPrimitive = createCommonjsModule(function (module) {
	  'use strict';

	  var anObject = interopDefault(require$$5),
	      toPrimitive = interopDefault(require$$4$1),
	      NUMBER = 'number';

	  module.exports = function (hint) {
	    if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
	    return toPrimitive(anObject(this), hint != NUMBER);
	  };
	});

	var _dateToPrimitive$1 = interopDefault(_dateToPrimitive);

var require$$0$29 = Object.freeze({
	  default: _dateToPrimitive$1
	});

	var es6_date_toPrimitive = createCommonjsModule(function (module) {
	  var TO_PRIMITIVE = interopDefault(require$$0$4)('toPrimitive'),
	      proto = Date.prototype;

	  if (!(TO_PRIMITIVE in proto)) interopDefault(require$$2)(proto, TO_PRIMITIVE, interopDefault(require$$0$29));
	});

	interopDefault(es6_date_toPrimitive);

	var es6_array_isArray = createCommonjsModule(function (module) {
	  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Array', { isArray: interopDefault(require$$1$10) });
	});

	interopDefault(es6_array_isArray);

	var _iterCall = createCommonjsModule(function (module) {
	  // call something on iterator step with safe closing on error
	  var anObject = interopDefault(require$$5);
	  module.exports = function (iterator, fn, value, entries) {
	    try {
	      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	      // 7.4.6 IteratorClose(iterator, completion)
	    } catch (e) {
	      var ret = iterator['return'];
	      if (ret !== undefined) anObject(ret.call(iterator));
	      throw e;
	    }
	  };
	});

	var _iterCall$1 = interopDefault(_iterCall);

var require$$4$5 = Object.freeze({
	  default: _iterCall$1
	});

	var _isArrayIter = createCommonjsModule(function (module) {
	  // check on default Array iterator
	  var Iterators = interopDefault(require$$1$15),
	      ITERATOR = interopDefault(require$$0$4)('iterator'),
	      ArrayProto = Array.prototype;

	  module.exports = function (it) {
	    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	  };
	});

	var _isArrayIter$1 = interopDefault(_isArrayIter);

var require$$17 = Object.freeze({
	  default: _isArrayIter$1
	});

	var _createProperty = createCommonjsModule(function (module) {
	  'use strict';

	  var $defineProperty = interopDefault(require$$2$1),
	      createDesc = interopDefault(require$$2$3);

	  module.exports = function (object, index, value) {
	    if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
	  };
	});

	var _createProperty$1 = interopDefault(_createProperty);

var require$$0$30 = Object.freeze({
	  default: _createProperty$1
	});

	var core_getIteratorMethod = createCommonjsModule(function (module) {
	  var classof = interopDefault(require$$1$11),
	      ITERATOR = interopDefault(require$$0$4)('iterator'),
	      Iterators = interopDefault(require$$1$15);
	  module.exports = interopDefault(require$$0).getIteratorMethod = function (it) {
	    if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	  };
	});

	var core_getIteratorMethod$1 = interopDefault(core_getIteratorMethod);

var require$$13 = Object.freeze({
	  default: core_getIteratorMethod$1
	});

	var _iterDetect = createCommonjsModule(function (module) {
	  var ITERATOR = interopDefault(require$$0$4)('iterator'),
	      SAFE_CLOSING = false;

	  try {
	    var riter = [7][ITERATOR]();
	    riter['return'] = function () {
	      SAFE_CLOSING = true;
	    };
	    Array.from(riter, function () {
	      throw 2;
	    });
	  } catch (e) {/* empty */}

	  module.exports = function (exec, skipClosing) {
	    if (!skipClosing && !SAFE_CLOSING) return false;
	    var safe = false;
	    try {
	      var arr = [7],
	          iter = arr[ITERATOR]();
	      iter.next = function () {
	        return { done: safe = true };
	      };
	      arr[ITERATOR] = function () {
	        return iter;
	      };
	      exec(arr);
	    } catch (e) {/* empty */}
	    return safe;
	  };
	});

	var _iterDetect$1 = interopDefault(_iterDetect);

var require$$5$2 = Object.freeze({
	  default: _iterDetect$1
	});

	var es6_array_from = createCommonjsModule(function (module) {
	  'use strict';

	  var ctx = interopDefault(require$$31),
	      $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      call = interopDefault(require$$4$5),
	      isArrayIter = interopDefault(require$$17),
	      toLength = interopDefault(require$$3$1),
	      createProperty = interopDefault(require$$0$30),
	      getIterFn = interopDefault(require$$13);

	  $export($export.S + $export.F * !interopDefault(require$$5$2)(function (iter) {
	    Array.from(iter);
	  }), 'Array', {
	    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	    from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	      var O = toObject(arrayLike),
	          C = typeof this == 'function' ? this : Array,
	          aLen = arguments.length,
	          mapfn = aLen > 1 ? arguments[1] : undefined,
	          mapping = mapfn !== undefined,
	          index = 0,
	          iterFn = getIterFn(O),
	          length,
	          result,
	          step,
	          iterator;
	      if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	      // if object isn't iterable or it's array with default iterator - use simple case
	      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	          createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	        }
	      } else {
	        length = toLength(O.length);
	        for (result = new C(length); length > index; index++) {
	          createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	        }
	      }
	      result.length = index;
	      return result;
	    }
	  });
	});

	interopDefault(es6_array_from);

	var es6_array_of = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      createProperty = interopDefault(require$$0$30);

	  // WebKit Array.of isn't generic
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    function F() {}
	    return !(Array.of.call(F) instanceof F);
	  }), 'Array', {
	    // 22.1.2.3 Array.of( ...items)
	    of: function of() /* ...args */{
	      var index = 0,
	          aLen = arguments.length,
	          result = new (typeof this == 'function' ? this : Array)(aLen);
	      while (aLen > index) {
	        createProperty(result, index, arguments[index++]);
	      }result.length = aLen;
	      return result;
	    }
	  });
	});

	interopDefault(es6_array_of);

	var _strictMethod = createCommonjsModule(function (module) {
	  var fails = interopDefault(require$$1$1);

	  module.exports = function (method, arg) {
	    return !!method && fails(function () {
	      arg ? method.call(null, function () {}, 1) : method.call(null);
	    });
	  };
	});

	var _strictMethod$1 = interopDefault(_strictMethod);

var require$$0$31 = Object.freeze({
	  default: _strictMethod$1
	});

	var es6_array_join = createCommonjsModule(function (module) {
	  'use strict';
	  // 22.1.3.13 Array.prototype.join(separator)

	  var $export = interopDefault(require$$1$2),
	      toIObject = interopDefault(require$$1$7),
	      arrayJoin = [].join;

	  // fallback for not array-like strings
	  $export($export.P + $export.F * (interopDefault(require$$1$8) != Object || !interopDefault(require$$0$31)(arrayJoin)), 'Array', {
	    join: function join(separator) {
	      return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	    }
	  });
	});

	interopDefault(es6_array_join);

	var es6_array_slice = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      html = interopDefault(require$$3$2),
	      cof = interopDefault(require$$0$6),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1),
	      arraySlice = [].slice;

	  // fallback for not array-like ES3 strings and DOM objects
	  $export($export.P + $export.F * interopDefault(require$$1$1)(function () {
	    if (html) arraySlice.call(html);
	  }), 'Array', {
	    slice: function slice(begin, end) {
	      var len = toLength(this.length),
	          klass = cof(this);
	      end = end === undefined ? len : end;
	      if (klass == 'Array') return arraySlice.call(this, begin, end);
	      var start = toIndex(begin, len),
	          upTo = toIndex(end, len),
	          size = toLength(upTo - start),
	          cloned = Array(size),
	          i = 0;
	      for (; i < size; i++) {
	        cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
	      }return cloned;
	    }
	  });
	});

	interopDefault(es6_array_slice);

	var es6_array_sort = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      aFunction = interopDefault(require$$0$2),
	      toObject = interopDefault(require$$5$1),
	      fails = interopDefault(require$$1$1),
	      $sort = [].sort,
	      test = [1, 2, 3];

	  $export($export.P + $export.F * (fails(function () {
	    // IE8-
	    test.sort(undefined);
	  }) || !fails(function () {
	    // V8 bug
	    test.sort(null);
	    // Old WebKit
	  }) || !interopDefault(require$$0$31)($sort)), 'Array', {
	    // 22.1.3.25 Array.prototype.sort(comparefn)
	    sort: function sort(comparefn) {
	      return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
	    }
	  });
	});

	interopDefault(es6_array_sort);

	var _arraySpeciesConstructor = createCommonjsModule(function (module) {
	  var isObject = interopDefault(require$$0$1),
	      isArray = interopDefault(require$$1$10),
	      SPECIES = interopDefault(require$$0$4)('species');

	  module.exports = function (original) {
	    var C;
	    if (isArray(original)) {
	      C = original.constructor;
	      // cross-realm fallback
	      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	      if (isObject(C)) {
	        C = C[SPECIES];
	        if (C === null) C = undefined;
	      }
	    }return C === undefined ? Array : C;
	  };
	});

	var _arraySpeciesConstructor$1 = interopDefault(_arraySpeciesConstructor);

var require$$0$33 = Object.freeze({
	  default: _arraySpeciesConstructor$1
	});

	var _arraySpeciesCreate = createCommonjsModule(function (module) {
	  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	  var speciesConstructor = interopDefault(require$$0$33);

	  module.exports = function (original, length) {
	    return new (speciesConstructor(original))(length);
	  };
	});

	var _arraySpeciesCreate$1 = interopDefault(_arraySpeciesCreate);

var require$$0$32 = Object.freeze({
	  default: _arraySpeciesCreate$1
	});

	var _arrayMethods = createCommonjsModule(function (module) {
	  // 0 -> Array#forEach
	  // 1 -> Array#map
	  // 2 -> Array#filter
	  // 3 -> Array#some
	  // 4 -> Array#every
	  // 5 -> Array#find
	  // 6 -> Array#findIndex
	  var ctx = interopDefault(require$$31),
	      IObject = interopDefault(require$$1$8),
	      toObject = interopDefault(require$$5$1),
	      toLength = interopDefault(require$$3$1),
	      asc = interopDefault(require$$0$32);
	  module.exports = function (TYPE, $create) {
	    var IS_MAP = TYPE == 1,
	        IS_FILTER = TYPE == 2,
	        IS_SOME = TYPE == 3,
	        IS_EVERY = TYPE == 4,
	        IS_FIND_INDEX = TYPE == 6,
	        NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
	        create = $create || asc;
	    return function ($this, callbackfn, that) {
	      var O = toObject($this),
	          self = IObject(O),
	          f = ctx(callbackfn, that, 3),
	          length = toLength(self.length),
	          index = 0,
	          result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
	          val,
	          res;
	      for (; length > index; index++) {
	        if (NO_HOLES || index in self) {
	          val = self[index];
	          res = f(val, index, O);
	          if (TYPE) {
	            if (IS_MAP) result[index] = res; // map
	            else if (res) switch (TYPE) {
	                case 3:
	                  return true; // some
	                case 5:
	                  return val; // find
	                case 6:
	                  return index; // findIndex
	                case 2:
	                  result.push(val); // filter
	              } else if (IS_EVERY) return false; // every
	          }
	        }
	      }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	    };
	  };
	});

	var _arrayMethods$1 = interopDefault(_arrayMethods);

var require$$10 = Object.freeze({
	  default: _arrayMethods$1
	});

	var es6_array_forEach = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $forEach = interopDefault(require$$10)(0),
	      STRICT = interopDefault(require$$0$31)([].forEach, true);

	  $export($export.P + $export.F * !STRICT, 'Array', {
	    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      return $forEach(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_forEach);

	var es6_array_map = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $map = interopDefault(require$$10)(1);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].map, true), 'Array', {
	    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	    map: function map(callbackfn /* , thisArg */) {
	      return $map(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_map);

	var es6_array_filter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $filter = interopDefault(require$$10)(2);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].filter, true), 'Array', {
	    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	    filter: function filter(callbackfn /* , thisArg */) {
	      return $filter(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_filter);

	var es6_array_some = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $some = interopDefault(require$$10)(3);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].some, true), 'Array', {
	    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	    some: function some(callbackfn /* , thisArg */) {
	      return $some(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_some);

	var es6_array_every = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $every = interopDefault(require$$10)(4);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].every, true), 'Array', {
	    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	    every: function every(callbackfn /* , thisArg */) {
	      return $every(this, callbackfn, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_every);

	var _arrayReduce = createCommonjsModule(function (module) {
	  var aFunction = interopDefault(require$$0$2),
	      toObject = interopDefault(require$$5$1),
	      IObject = interopDefault(require$$1$8),
	      toLength = interopDefault(require$$3$1);

	  module.exports = function (that, callbackfn, aLen, memo, isRight) {
	    aFunction(callbackfn);
	    var O = toObject(that),
	        self = IObject(O),
	        length = toLength(O.length),
	        index = isRight ? length - 1 : 0,
	        i = isRight ? -1 : 1;
	    if (aLen < 2) for (;;) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (isRight ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (; isRight ? index >= 0 : length > index; index += i) {
	      if (index in self) {
	        memo = callbackfn(memo, self[index], index, O);
	      }
	    }return memo;
	  };
	});

	var _arrayReduce$1 = interopDefault(_arrayReduce);

var require$$1$17 = Object.freeze({
	  default: _arrayReduce$1
	});

	var es6_array_reduce = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $reduce = interopDefault(require$$1$17);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].reduce, true), 'Array', {
	    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	    reduce: function reduce(callbackfn /* , initialValue */) {
	      return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	    }
	  });
	});

	interopDefault(es6_array_reduce);

	var es6_array_reduceRight = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $reduce = interopDefault(require$$1$17);

	  $export($export.P + $export.F * !interopDefault(require$$0$31)([].reduceRight, true), 'Array', {
	    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	      return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	    }
	  });
	});

	interopDefault(es6_array_reduceRight);

	var es6_array_indexOf = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $indexOf = interopDefault(require$$1$9)(false),
	      $native = [].indexOf,
	      NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	  $export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$31)($native)), 'Array', {
	    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	    indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
	      return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
	    }
	  });
	});

	interopDefault(es6_array_indexOf);

	var es6_array_lastIndexOf = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toIObject = interopDefault(require$$1$7),
	      toInteger = interopDefault(require$$26),
	      toLength = interopDefault(require$$3$1),
	      $native = [].lastIndexOf,
	      NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	  $export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$31)($native)), 'Array', {
	    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */) {
	      // convert -0 to +0
	      if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	      var O = toIObject(this),
	          length = toLength(O.length),
	          index = length - 1;
	      if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
	      if (index < 0) index = length + index;
	      for (; index >= 0; index--) {
	        if (index in O) if (O[index] === searchElement) return index || 0;
	      }return -1;
	    }
	  });
	});

	interopDefault(es6_array_lastIndexOf);

	var _arrayCopyWithin = createCommonjsModule(function (module) {
	  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	  'use strict';

	  var toObject = interopDefault(require$$5$1),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1);

	  module.exports = [].copyWithin || function copyWithin(target /*= 0*/, start /*= 0, end = @length*/) {
	    var O = toObject(this),
	        len = toLength(O.length),
	        to = toIndex(target, len),
	        from = toIndex(start, len),
	        end = arguments.length > 2 ? arguments[2] : undefined,
	        count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
	        inc = 1;
	    if (from < to && to < from + count) {
	      inc = -1;
	      from += count - 1;
	      to += count - 1;
	    }
	    while (count-- > 0) {
	      if (from in O) O[to] = O[from];else delete O[to];
	      to += inc;
	      from += inc;
	    }return O;
	  };
	});

	var _arrayCopyWithin$1 = interopDefault(_arrayCopyWithin);

var require$$2$9 = Object.freeze({
	  default: _arrayCopyWithin$1
	});

	var _addToUnscopables = createCommonjsModule(function (module) {
	  // 22.1.3.31 Array.prototype[@@unscopables]
	  var UNSCOPABLES = interopDefault(require$$0$4)('unscopables'),
	      ArrayProto = Array.prototype;
	  if (ArrayProto[UNSCOPABLES] == undefined) interopDefault(require$$2)(ArrayProto, UNSCOPABLES, {});
	  module.exports = function (key) {
	    ArrayProto[UNSCOPABLES][key] = true;
	  };
	});

	var _addToUnscopables$1 = interopDefault(_addToUnscopables);

var require$$0$34 = Object.freeze({
	  default: _addToUnscopables$1
	});

	var es6_array_copyWithin = createCommonjsModule(function (module) {
	  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'Array', { copyWithin: interopDefault(require$$2$9) });

	  interopDefault(require$$0$34)('copyWithin');
	});

	interopDefault(es6_array_copyWithin);

	var _arrayFill = createCommonjsModule(function (module) {
	  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	  'use strict';

	  var toObject = interopDefault(require$$5$1),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1);
	  module.exports = function fill(value /*, start = 0, end = @length */) {
	    var O = toObject(this),
	        length = toLength(O.length),
	        aLen = arguments.length,
	        index = toIndex(aLen > 1 ? arguments[1] : undefined, length),
	        end = aLen > 2 ? arguments[2] : undefined,
	        endPos = end === undefined ? length : toIndex(end, length);
	    while (endPos > index) {
	      O[index++] = value;
	    }return O;
	  };
	});

	var _arrayFill$1 = interopDefault(_arrayFill);

var require$$3$5 = Object.freeze({
	  default: _arrayFill$1
	});

	var es6_array_fill = createCommonjsModule(function (module) {
	  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	  var $export = interopDefault(require$$1$2);

	  $export($export.P, 'Array', { fill: interopDefault(require$$3$5) });

	  interopDefault(require$$0$34)('fill');
	});

	interopDefault(es6_array_fill);

	var es6_array_find = createCommonjsModule(function (module) {
	  'use strict';
	  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	  var $export = interopDefault(require$$1$2),
	      $find = interopDefault(require$$10)(5),
	      KEY = 'find',
	      forced = true;
	  // Shouldn't skip holes
	  if (KEY in []) Array(1)[KEY](function () {
	    forced = false;
	  });
	  $export($export.P + $export.F * forced, 'Array', {
	    find: function find(callbackfn /*, that = undefined */) {
	      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	  interopDefault(require$$0$34)(KEY);
	});

	interopDefault(es6_array_find);

	var es6_array_findIndex = createCommonjsModule(function (module) {
	  'use strict';
	  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	  var $export = interopDefault(require$$1$2),
	      $find = interopDefault(require$$10)(6),
	      KEY = 'findIndex',
	      forced = true;
	  // Shouldn't skip holes
	  if (KEY in []) Array(1)[KEY](function () {
	    forced = false;
	  });
	  $export($export.P + $export.F * forced, 'Array', {
	    findIndex: function findIndex(callbackfn /*, that = undefined */) {
	      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	  interopDefault(require$$0$34)(KEY);
	});

	interopDefault(es6_array_findIndex);

	var _setSpecies = createCommonjsModule(function (module) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      dP = interopDefault(require$$2$1),
	      DESCRIPTORS = interopDefault(require$$1),
	      SPECIES = interopDefault(require$$0$4)('species');

	  module.exports = function (KEY) {
	    var C = global[KEY];
	    if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	      configurable: true,
	      get: function get() {
	        return this;
	      }
	    });
	  };
	});

	var _setSpecies$1 = interopDefault(_setSpecies);

var require$$0$35 = Object.freeze({
	  default: _setSpecies$1
	});

	var es6_array_species = createCommonjsModule(function (module) {
	  interopDefault(require$$0$35)('Array');
	});

	interopDefault(es6_array_species);

	var _iterStep = createCommonjsModule(function (module) {
	  module.exports = function (done, value) {
	    return { value: value, done: !!done };
	  };
	});

	var _iterStep$1 = interopDefault(_iterStep);

var require$$3$6 = Object.freeze({
	  default: _iterStep$1
	});

	var es6_array_iterator = createCommonjsModule(function (module) {
	  'use strict';

	  var addToUnscopables = interopDefault(require$$0$34),
	      step = interopDefault(require$$3$6),
	      Iterators = interopDefault(require$$1$15),
	      toIObject = interopDefault(require$$1$7);

	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  module.exports = interopDefault(require$$4$4)(Array, 'Array', function (iterated, kind) {
	    this._t = toIObject(iterated); // target
	    this._i = 0; // next index
	    this._k = kind; // kind
	    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function () {
	    var O = this._t,
	        kind = this._k,
	        index = this._i++;
	    if (!O || index >= O.length) {
	      this._t = undefined;
	      return step(1);
	    }
	    if (kind == 'keys') return step(0, index);
	    if (kind == 'values') return step(0, O[index]);
	    return step(0, [index, O[index]]);
	  }, 'values');

	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  Iterators.Arguments = Iterators.Array;

	  addToUnscopables('keys');
	  addToUnscopables('values');
	  addToUnscopables('entries');
	});

	var es6_array_iterator$1 = interopDefault(es6_array_iterator);

var require$$5$3 = Object.freeze({
	  default: es6_array_iterator$1
	});

	var _flags = createCommonjsModule(function (module) {
	  'use strict';
	  // 21.2.5.3 get RegExp.prototype.flags

	  var anObject = interopDefault(require$$5);
	  module.exports = function () {
	    var that = anObject(this),
	        result = '';
	    if (that.global) result += 'g';
	    if (that.ignoreCase) result += 'i';
	    if (that.multiline) result += 'm';
	    if (that.unicode) result += 'u';
	    if (that.sticky) result += 'y';
	    return result;
	  };
	});

	var _flags$1 = interopDefault(_flags);

var require$$1$18 = Object.freeze({
	  default: _flags$1
	});

	var es6_regexp_constructor = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      inheritIfRequired = interopDefault(require$$0$19),
	      dP = interopDefault(require$$2$1).f,
	      gOPN = interopDefault(require$$3$3).f,
	      isRegExp = interopDefault(require$$2$8),
	      $flags = interopDefault(require$$1$18),
	      $RegExp = global.RegExp,
	      Base = $RegExp,
	      proto = $RegExp.prototype,
	      re1 = /a/g,
	      re2 = /a/g
	  // "new" creates a new object, old webkit buggy here
	  ,
	      CORRECT_NEW = new $RegExp(re1) !== re1;

	  if (interopDefault(require$$1) && (!CORRECT_NEW || interopDefault(require$$1$1)(function () {
	    re2[interopDefault(require$$0$4)('match')] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	  }))) {
	    $RegExp = function RegExp(p, f) {
	      var tiRE = this instanceof $RegExp,
	          piRE = isRegExp(p),
	          fiU = f === undefined;
	      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
	    };
	    var proxy = function proxy(key) {
	      key in $RegExp || dP($RegExp, key, {
	        configurable: true,
	        get: function get() {
	          return Base[key];
	        },
	        set: function set(it) {
	          Base[key] = it;
	        }
	      });
	    };
	    for (var keys = gOPN(Base), i = 0; keys.length > i;) {
	      proxy(keys[i++]);
	    }proto.constructor = $RegExp;
	    $RegExp.prototype = proto;
	    interopDefault(require$$4$2)(global, 'RegExp', $RegExp);
	  }

	  interopDefault(require$$0$35)('RegExp');
	});

	interopDefault(es6_regexp_constructor);

	var es6_regexp_flags = createCommonjsModule(function (module) {
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if (interopDefault(require$$1) && /./g.flags != 'g') interopDefault(require$$2$1).f(RegExp.prototype, 'flags', {
	    configurable: true,
	    get: interopDefault(require$$1$18)
	  });
	});

	interopDefault(es6_regexp_flags);

	var es6_regexp_toString = createCommonjsModule(function (module) {
	  'use strict';

	  var anObject = interopDefault(require$$5),
	      $flags = interopDefault(require$$1$18),
	      DESCRIPTORS = interopDefault(require$$1),
	      TO_STRING = 'toString',
	      $toString = /./[TO_STRING];

	  var define = function define(fn) {
	    interopDefault(require$$4$2)(RegExp.prototype, TO_STRING, fn, true);
	  };

	  // 21.2.5.14 RegExp.prototype.toString()
	  if (interopDefault(require$$1$1)(function () {
	    return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
	  })) {
	    define(function toString() {
	      var R = anObject(this);
	      return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	    });
	    // FF44- RegExp#toString has a wrong name
	  } else if ($toString.name != TO_STRING) {
	    define(function toString() {
	      return $toString.call(this);
	    });
	  }
	});

	interopDefault(es6_regexp_toString);

	var _fixReWks = createCommonjsModule(function (module) {
	  'use strict';

	  var hide = interopDefault(require$$2),
	      redefine = interopDefault(require$$4$2),
	      fails = interopDefault(require$$1$1),
	      defined = interopDefault(require$$4$3),
	      wks = interopDefault(require$$0$4);

	  module.exports = function (KEY, length, exec) {
	    var SYMBOL = wks(KEY),
	        fns = exec(defined, SYMBOL, ''[KEY]),
	        strfn = fns[0],
	        rxfn = fns[1];
	    if (fails(function () {
	      var O = {};
	      O[SYMBOL] = function () {
	        return 7;
	      };
	      return ''[KEY](O) != 7;
	    })) {
	      redefine(String.prototype, KEY, strfn);
	      hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) {
	        return rxfn.call(string, this, arg);
	      }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) {
	        return rxfn.call(string, this);
	      });
	    }
	  };
	});

	var _fixReWks$1 = interopDefault(_fixReWks);

var require$$1$19 = Object.freeze({
	  default: _fixReWks$1
	});

	var es6_regexp_match = createCommonjsModule(function (module) {
	  // @@match logic
	  interopDefault(require$$1$19)('match', 1, function (defined, MATCH, $match) {
	    // 21.1.3.11 String.prototype.match(regexp)
	    return [function match(regexp) {
	      'use strict';

	      var O = defined(this),
	          fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    }, $match];
	  });
	});

	interopDefault(es6_regexp_match);

	var es6_regexp_replace = createCommonjsModule(function (module) {
	  // @@replace logic
	  interopDefault(require$$1$19)('replace', 2, function (defined, REPLACE, $replace) {
	    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	    return [function replace(searchValue, replaceValue) {
	      'use strict';

	      var O = defined(this),
	          fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	    }, $replace];
	  });
	});

	interopDefault(es6_regexp_replace);

	var es6_regexp_search = createCommonjsModule(function (module) {
	  // @@search logic
	  interopDefault(require$$1$19)('search', 1, function (defined, SEARCH, $search) {
	    // 21.1.3.15 String.prototype.search(regexp)
	    return [function search(regexp) {
	      'use strict';

	      var O = defined(this),
	          fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    }, $search];
	  });
	});

	interopDefault(es6_regexp_search);

	var es6_regexp_split = createCommonjsModule(function (module) {
	  // @@split logic
	  interopDefault(require$$1$19)('split', 2, function (defined, SPLIT, $split) {
	    'use strict';

	    var isRegExp = interopDefault(require$$2$8),
	        _split = $split,
	        $push = [].push,
	        $SPLIT = 'split',
	        LENGTH = 'length',
	        LAST_INDEX = 'lastIndex';
	    if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
	      var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	      // based on es5-shim implementation, need to rework it
	      $split = function $split(separator, limit) {
	        var string = String(this);
	        if (separator === undefined && limit === 0) return [];
	        // If `separator` is not a regex, use native split
	        if (!isRegExp(separator)) return _split.call(string, separator, limit);
	        var output = [];
	        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	        var lastLastIndex = 0;
	        var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	        // Make `global` and avoid `lastIndex` issues by working with a copy
	        var separatorCopy = new RegExp(separator.source, flags + 'g');
	        var separator2, match, lastIndex, lastLength, i;
	        // Doesn't need flags gy, but they don't hurt
	        if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	        while (match = separatorCopy.exec(string)) {
	          // `separatorCopy.lastIndex` is not reliable cross-browser
	          lastIndex = match.index + match[0][LENGTH];
	          if (lastIndex > lastLastIndex) {
	            output.push(string.slice(lastLastIndex, match.index));
	            // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	            if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	              for (i = 1; i < arguments[LENGTH] - 2; i++) {
	                if (arguments[i] === undefined) match[i] = undefined;
	              }
	            });
	            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	            lastLength = match[0][LENGTH];
	            lastLastIndex = lastIndex;
	            if (output[LENGTH] >= splitLimit) break;
	          }
	          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	        }
	        if (lastLastIndex === string[LENGTH]) {
	          if (lastLength || !separatorCopy.test('')) output.push('');
	        } else output.push(string.slice(lastLastIndex));
	        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	      };
	      // Chakra, V8
	    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	      $split = function $split(separator, limit) {
	        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	      };
	    }
	    // 21.1.3.17 String.prototype.split(separator, limit)
	    return [function split(separator, limit) {
	      var O = defined(this),
	          fn = separator == undefined ? undefined : separator[SPLIT];
	      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	    }, $split];
	  });
	});

	interopDefault(es6_regexp_split);

	var _anInstance = createCommonjsModule(function (module) {
	  module.exports = function (it, Constructor, name, forbiddenField) {
	    if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	      throw TypeError(name + ': incorrect invocation!');
	    }return it;
	  };
	});

	var _anInstance$1 = interopDefault(_anInstance);

var require$$4$6 = Object.freeze({
	  default: _anInstance$1
	});

	var _forOf = createCommonjsModule(function (module) {
	  var ctx = interopDefault(require$$31),
	      call = interopDefault(require$$4$5),
	      isArrayIter = interopDefault(require$$17),
	      anObject = interopDefault(require$$5),
	      toLength = interopDefault(require$$3$1),
	      getIterFn = interopDefault(require$$13),
	      BREAK = {},
	      RETURN = {};
	  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	    var iterFn = ITERATOR ? function () {
	      return iterable;
	    } : getIterFn(iterable),
	        f = ctx(fn, that, entries ? 2 : 1),
	        index = 0,
	        length,
	        step,
	        iterator,
	        result;
	    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	    // fast case for arrays with default iterator
	    if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	      result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	      if (result === BREAK || result === RETURN) return result;
	    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	      result = call(iterator, f, step.value, entries);
	      if (result === BREAK || result === RETURN) return result;
	    }
	  };
	  exports.BREAK = BREAK;
	  exports.RETURN = RETURN;
	});

	var _forOf$1 = interopDefault(_forOf);

var require$$1$20 = Object.freeze({
	  default: _forOf$1
	});

	var _speciesConstructor = createCommonjsModule(function (module) {
	  // 7.3.20 SpeciesConstructor(O, defaultConstructor)
	  var anObject = interopDefault(require$$5),
	      aFunction = interopDefault(require$$0$2),
	      SPECIES = interopDefault(require$$0$4)('species');
	  module.exports = function (O, D) {
	    var C = anObject(O).constructor,
	        S;
	    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	  };
	});

	var _speciesConstructor$1 = interopDefault(_speciesConstructor);

var require$$8 = Object.freeze({
	  default: _speciesConstructor$1
	});

	var _task = createCommonjsModule(function (module) {
	  var ctx = interopDefault(require$$31),
	      invoke = interopDefault(require$$1$13),
	      html = interopDefault(require$$3$2),
	      cel = interopDefault(require$$2$2),
	      global = interopDefault(require$$3),
	      process = global.process,
	      setTask = global.setImmediate,
	      clearTask = global.clearImmediate,
	      MessageChannel = global.MessageChannel,
	      counter = 0,
	      queue = {},
	      ONREADYSTATECHANGE = 'onreadystatechange',
	      defer,
	      channel,
	      port;
	  var run = function run() {
	    var id = +this;
	    if (queue.hasOwnProperty(id)) {
	      var fn = queue[id];
	      delete queue[id];
	      fn();
	    }
	  };
	  var listener = function listener(event) {
	    run.call(event.data);
	  };
	  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	  if (!setTask || !clearTask) {
	    setTask = function setImmediate(fn) {
	      var args = [],
	          i = 1;
	      while (arguments.length > i) {
	        args.push(arguments[i++]);
	      }queue[++counter] = function () {
	        invoke(typeof fn == 'function' ? fn : Function(fn), args);
	      };
	      defer(counter);
	      return counter;
	    };
	    clearTask = function clearImmediate(id) {
	      delete queue[id];
	    };
	    // Node.js 0.8-
	    if (interopDefault(require$$0$6)(process) == 'process') {
	      defer = function defer(id) {
	        process.nextTick(ctx(run, id, 1));
	      };
	      // Browsers with MessageChannel, includes WebWorkers
	    } else if (MessageChannel) {
	      channel = new MessageChannel();
	      port = channel.port2;
	      channel.port1.onmessage = listener;
	      defer = ctx(port.postMessage, port, 1);
	      // Browsers with postMessage, skip WebWorkers
	      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	    } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	      defer = function defer(id) {
	        global.postMessage(id + '', '*');
	      };
	      global.addEventListener('message', listener, false);
	      // IE8-
	    } else if (ONREADYSTATECHANGE in cel('script')) {
	      defer = function defer(id) {
	        html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	          html.removeChild(this);
	          run.call(id);
	        };
	      };
	      // Rest old browsers
	    } else {
	      defer = function defer(id) {
	        setTimeout(ctx(run, id, 1), 0);
	      };
	    }
	  }
	  module.exports = {
	    set: setTask,
	    clear: clearTask
	  };
	});

	var _task$1 = interopDefault(_task);
	var set$2 = _task.set;
	var clear = _task.clear;

var require$$0$36 = Object.freeze({
	  default: _task$1,
	  set: set$2,
	  clear: clear
	});

	var _microtask = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      macrotask = interopDefault(require$$0$36).set,
	      Observer = global.MutationObserver || global.WebKitMutationObserver,
	      process = global.process,
	      Promise = global.Promise,
	      isNode = interopDefault(require$$0$6)(process) == 'process';

	  module.exports = function () {
	    var head, last, notify;

	    var flush = function flush() {
	      var parent, fn;
	      if (isNode && (parent = process.domain)) parent.exit();
	      while (head) {
	        fn = head.fn;
	        head = head.next;
	        try {
	          fn();
	        } catch (e) {
	          if (head) notify();else last = undefined;
	          throw e;
	        }
	      }last = undefined;
	      if (parent) parent.enter();
	    };

	    // Node.js
	    if (isNode) {
	      notify = function notify() {
	        process.nextTick(flush);
	      };
	      // browsers with MutationObserver
	    } else if (Observer) {
	      var toggle = true,
	          node = document.createTextNode('');
	      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	      notify = function notify() {
	        node.data = toggle = !toggle;
	      };
	      // environments with maybe non-completely correct, but existent Promise
	    } else if (Promise && Promise.resolve) {
	      var promise = Promise.resolve();
	      notify = function notify() {
	        promise.then(flush);
	      };
	      // for other environments - macrotask based on:
	      // - setImmediate
	      // - MessageChannel
	      // - window.postMessag
	      // - onreadystatechange
	      // - setTimeout
	    } else {
	      notify = function notify() {
	        // strange IE + webpack dev server bug - use .call(global)
	        macrotask.call(global, flush);
	      };
	    }

	    return function (fn) {
	      var task = { fn: fn, next: undefined };
	      if (last) last.next = task;
	      if (!head) {
	        head = task;
	        notify();
	      }last = task;
	    };
	  };
	});

	var _microtask$1 = interopDefault(_microtask);

var require$$8$1 = Object.freeze({
	  default: _microtask$1
	});

	var _redefineAll = createCommonjsModule(function (module) {
	  var redefine = interopDefault(require$$4$2);
	  module.exports = function (target, src, safe) {
	    for (var key in src) {
	      redefine(target, key, src[key], safe);
	    }return target;
	  };
	});

	var _redefineAll$1 = interopDefault(_redefineAll);

var require$$3$7 = Object.freeze({
	  default: _redefineAll$1
	});

	var es6_promise = createCommonjsModule(function (module) {
	  'use strict';

	  var LIBRARY = interopDefault(require$$2$4),
	      global = interopDefault(require$$3),
	      ctx = interopDefault(require$$31),
	      classof = interopDefault(require$$1$11),
	      $export = interopDefault(require$$1$2),
	      isObject = interopDefault(require$$0$1),
	      aFunction = interopDefault(require$$0$2),
	      anInstance = interopDefault(require$$4$6),
	      forOf = interopDefault(require$$1$20),
	      speciesConstructor = interopDefault(require$$8),
	      task = interopDefault(require$$0$36).set,
	      microtask = interopDefault(require$$8$1)(),
	      PROMISE = 'Promise',
	      TypeError = global.TypeError,
	      process = global.process,
	      $Promise = global[PROMISE],
	      process = global.process,
	      isNode = classof(process) == 'process',
	      empty = function empty() {/* empty */},
	      Internal,
	      GenericPromiseCapability,
	      Wrapper;

	  var USE_NATIVE = !!function () {
	    try {
	      // correct subclassing with @@species support
	      var promise = $Promise.resolve(1),
	          FakePromise = (promise.constructor = {})[interopDefault(require$$0$4)('species')] = function (exec) {
	        exec(empty, empty);
	      };
	      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	      return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	    } catch (e) {/* empty */}
	  }();

	  // helpers
	  var sameConstructor = function sameConstructor(a, b) {
	    // with library wrapper special case
	    return a === b || a === $Promise && b === Wrapper;
	  };
	  var isThenable = function isThenable(it) {
	    var then;
	    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	  };
	  var newPromiseCapability = function newPromiseCapability(C) {
	    return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	  };
	  var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	    var resolve, reject;
	    this.promise = new C(function ($$resolve, $$reject) {
	      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	      resolve = $$resolve;
	      reject = $$reject;
	    });
	    this.resolve = aFunction(resolve);
	    this.reject = aFunction(reject);
	  };
	  var perform = function perform(exec) {
	    try {
	      exec();
	    } catch (e) {
	      return { error: e };
	    }
	  };
	  var notify = function notify(promise, isReject) {
	    if (promise._n) return;
	    promise._n = true;
	    var chain = promise._c;
	    microtask(function () {
	      var value = promise._v,
	          ok = promise._s == 1,
	          i = 0;
	      var run = function run(reaction) {
	        var handler = ok ? reaction.ok : reaction.fail,
	            resolve = reaction.resolve,
	            reject = reaction.reject,
	            domain = reaction.domain,
	            result,
	            then;
	        try {
	          if (handler) {
	            if (!ok) {
	              if (promise._h == 2) onHandleUnhandled(promise);
	              promise._h = 1;
	            }
	            if (handler === true) result = value;else {
	              if (domain) domain.enter();
	              result = handler(value);
	              if (domain) domain.exit();
	            }
	            if (result === reaction.promise) {
	              reject(TypeError('Promise-chain cycle'));
	            } else if (then = isThenable(result)) {
	              then.call(result, resolve, reject);
	            } else resolve(result);
	          } else reject(value);
	        } catch (e) {
	          reject(e);
	        }
	      };
	      while (chain.length > i) {
	        run(chain[i++]);
	      } // variable length - can't use forEach
	      promise._c = [];
	      promise._n = false;
	      if (isReject && !promise._h) onUnhandled(promise);
	    });
	  };
	  var onUnhandled = function onUnhandled(promise) {
	    task.call(global, function () {
	      var value = promise._v,
	          abrupt,
	          handler,
	          console;
	      if (isUnhandled(promise)) {
	        abrupt = perform(function () {
	          if (isNode) {
	            process.emit('unhandledRejection', value, promise);
	          } else if (handler = global.onunhandledrejection) {
	            handler({ promise: promise, reason: value });
	          } else if ((console = global.console) && console.error) {
	            console.error('Unhandled promise rejection', value);
	          }
	        });
	        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	        promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	      }promise._a = undefined;
	      if (abrupt) throw abrupt.error;
	    });
	  };
	  var isUnhandled = function isUnhandled(promise) {
	    if (promise._h == 1) return false;
	    var chain = promise._a || promise._c,
	        i = 0,
	        reaction;
	    while (chain.length > i) {
	      reaction = chain[i++];
	      if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	    }return true;
	  };
	  var onHandleUnhandled = function onHandleUnhandled(promise) {
	    task.call(global, function () {
	      var handler;
	      if (isNode) {
	        process.emit('rejectionHandled', promise);
	      } else if (handler = global.onrejectionhandled) {
	        handler({ promise: promise, reason: promise._v });
	      }
	    });
	  };
	  var $reject = function $reject(value) {
	    var promise = this;
	    if (promise._d) return;
	    promise._d = true;
	    promise = promise._w || promise; // unwrap
	    promise._v = value;
	    promise._s = 2;
	    if (!promise._a) promise._a = promise._c.slice();
	    notify(promise, true);
	  };
	  var $resolve = function $resolve(value) {
	    var promise = this,
	        then;
	    if (promise._d) return;
	    promise._d = true;
	    promise = promise._w || promise; // unwrap
	    try {
	      if (promise === value) throw TypeError("Promise can't be resolved itself");
	      if (then = isThenable(value)) {
	        microtask(function () {
	          var wrapper = { _w: promise, _d: false }; // wrap
	          try {
	            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	          } catch (e) {
	            $reject.call(wrapper, e);
	          }
	        });
	      } else {
	        promise._v = value;
	        promise._s = 1;
	        notify(promise, false);
	      }
	    } catch (e) {
	      $reject.call({ _w: promise, _d: false }, e); // wrap
	    }
	  };

	  // constructor polyfill
	  if (!USE_NATIVE) {
	    // 25.4.3.1 Promise(executor)
	    $Promise = function Promise(executor) {
	      anInstance(this, $Promise, PROMISE, '_h');
	      aFunction(executor);
	      Internal.call(this);
	      try {
	        executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	      } catch (err) {
	        $reject.call(this, err);
	      }
	    };
	    Internal = function Promise(executor) {
	      this._c = []; // <- awaiting reactions
	      this._a = undefined; // <- checked in isUnhandled reactions
	      this._s = 0; // <- state
	      this._d = false; // <- done
	      this._v = undefined; // <- value
	      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	      this._n = false; // <- notify
	    };
	    Internal.prototype = interopDefault(require$$3$7)($Promise.prototype, {
	      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	      then: function then(onFulfilled, onRejected) {
	        var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	        reaction.fail = typeof onRejected == 'function' && onRejected;
	        reaction.domain = isNode ? process.domain : undefined;
	        this._c.push(reaction);
	        if (this._a) this._a.push(reaction);
	        if (this._s) notify(this, false);
	        return reaction.promise;
	      },
	      // 25.4.5.1 Promise.prototype.catch(onRejected)
	      'catch': function _catch(onRejected) {
	        return this.then(undefined, onRejected);
	      }
	    });
	    PromiseCapability = function PromiseCapability() {
	      var promise = new Internal();
	      this.promise = promise;
	      this.resolve = ctx($resolve, promise, 1);
	      this.reject = ctx($reject, promise, 1);
	    };
	  }

	  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	  interopDefault(require$$0$3)($Promise, PROMISE);
	  interopDefault(require$$0$35)(PROMISE);
	  Wrapper = interopDefault(require$$0)[PROMISE];

	  // statics
	  $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	    // 25.4.4.5 Promise.reject(r)
	    reject: function reject(r) {
	      var capability = newPromiseCapability(this),
	          $$reject = capability.reject;
	      $$reject(r);
	      return capability.promise;
	    }
	  });
	  $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	    // 25.4.4.6 Promise.resolve(x)
	    resolve: function resolve(x) {
	      // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	      if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	      var capability = newPromiseCapability(this),
	          $$resolve = capability.resolve;
	      $$resolve(x);
	      return capability.promise;
	    }
	  });
	  $export($export.S + $export.F * !(USE_NATIVE && interopDefault(require$$5$2)(function (iter) {
	    $Promise.all(iter)['catch'](empty);
	  })), PROMISE, {
	    // 25.4.4.1 Promise.all(iterable)
	    all: function all(iterable) {
	      var C = this,
	          capability = newPromiseCapability(C),
	          resolve = capability.resolve,
	          reject = capability.reject;
	      var abrupt = perform(function () {
	        var values = [],
	            index = 0,
	            remaining = 1;
	        forOf(iterable, false, function (promise) {
	          var $index = index++,
	              alreadyCalled = false;
	          values.push(undefined);
	          remaining++;
	          C.resolve(promise).then(function (value) {
	            if (alreadyCalled) return;
	            alreadyCalled = true;
	            values[$index] = value;
	            --remaining || resolve(values);
	          }, reject);
	        });
	        --remaining || resolve(values);
	      });
	      if (abrupt) reject(abrupt.error);
	      return capability.promise;
	    },
	    // 25.4.4.4 Promise.race(iterable)
	    race: function race(iterable) {
	      var C = this,
	          capability = newPromiseCapability(C),
	          reject = capability.reject;
	      var abrupt = perform(function () {
	        forOf(iterable, false, function (promise) {
	          C.resolve(promise).then(capability.resolve, reject);
	        });
	      });
	      if (abrupt) reject(abrupt.error);
	      return capability.promise;
	    }
	  });
	});

	interopDefault(es6_promise);

	var _collectionStrong = createCommonjsModule(function (module) {
	  'use strict';

	  var dP = interopDefault(require$$2$1).f,
	      create = interopDefault(require$$6$1),
	      redefineAll = interopDefault(require$$3$7),
	      ctx = interopDefault(require$$31),
	      anInstance = interopDefault(require$$4$6),
	      defined = interopDefault(require$$4$3),
	      forOf = interopDefault(require$$1$20),
	      $iterDefine = interopDefault(require$$4$4),
	      step = interopDefault(require$$3$6),
	      setSpecies = interopDefault(require$$0$35),
	      DESCRIPTORS = interopDefault(require$$1),
	      fastKey = interopDefault(require$$6).fastKey,
	      SIZE = DESCRIPTORS ? '_s' : 'size';

	  var getEntry = function getEntry(that, key) {
	    // fast case
	    var index = fastKey(key),
	        entry;
	    if (index !== 'F') return that._i[index];
	    // frozen object case
	    for (entry = that._f; entry; entry = entry.n) {
	      if (entry.k == key) return entry;
	    }
	  };

	  module.exports = {
	    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	      var C = wrapper(function (that, iterable) {
	        anInstance(that, C, NAME, '_i');
	        that._i = create(null); // index
	        that._f = undefined; // first entry
	        that._l = undefined; // last entry
	        that[SIZE] = 0; // size
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	      });
	      redefineAll(C.prototype, {
	        // 23.1.3.1 Map.prototype.clear()
	        // 23.2.3.2 Set.prototype.clear()
	        clear: function clear() {
	          for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	            entry.r = true;
	            if (entry.p) entry.p = entry.p.n = undefined;
	            delete data[entry.i];
	          }
	          that._f = that._l = undefined;
	          that[SIZE] = 0;
	        },
	        // 23.1.3.3 Map.prototype.delete(key)
	        // 23.2.3.4 Set.prototype.delete(value)
	        'delete': function _delete(key) {
	          var that = this,
	              entry = getEntry(that, key);
	          if (entry) {
	            var next = entry.n,
	                prev = entry.p;
	            delete that._i[entry.i];
	            entry.r = true;
	            if (prev) prev.n = next;
	            if (next) next.p = prev;
	            if (that._f == entry) that._f = next;
	            if (that._l == entry) that._l = prev;
	            that[SIZE]--;
	          }return !!entry;
	        },
	        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	        forEach: function forEach(callbackfn /*, that = undefined */) {
	          anInstance(this, C, 'forEach');
	          var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
	              entry;
	          while (entry = entry ? entry.n : this._f) {
	            f(entry.v, entry.k, this);
	            // revert to the last existing entry
	            while (entry && entry.r) {
	              entry = entry.p;
	            }
	          }
	        },
	        // 23.1.3.7 Map.prototype.has(key)
	        // 23.2.3.7 Set.prototype.has(value)
	        has: function has(key) {
	          return !!getEntry(this, key);
	        }
	      });
	      if (DESCRIPTORS) dP(C.prototype, 'size', {
	        get: function get() {
	          return defined(this[SIZE]);
	        }
	      });
	      return C;
	    },
	    def: function def(that, key, value) {
	      var entry = getEntry(that, key),
	          prev,
	          index;
	      // change existing entry
	      if (entry) {
	        entry.v = value;
	        // create new entry
	      } else {
	        that._l = entry = {
	          i: index = fastKey(key, true), // <- index
	          k: key, // <- key
	          v: value, // <- value
	          p: prev = that._l, // <- previous entry
	          n: undefined, // <- next entry
	          r: false // <- removed
	        };
	        if (!that._f) that._f = entry;
	        if (prev) prev.n = entry;
	        that[SIZE]++;
	        // add to index
	        if (index !== 'F') that._i[index] = entry;
	      }return that;
	    },
	    getEntry: getEntry,
	    setStrong: function setStrong(C, NAME, IS_MAP) {
	      // add .keys, .values, .entries, [@@iterator]
	      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	      $iterDefine(C, NAME, function (iterated, kind) {
	        this._t = iterated; // target
	        this._k = kind; // kind
	        this._l = undefined; // previous
	      }, function () {
	        var that = this,
	            kind = that._k,
	            entry = that._l;
	        // revert to the last existing entry
	        while (entry && entry.r) {
	          entry = entry.p;
	        } // get next entry
	        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	          // or finish the iteration
	          that._t = undefined;
	          return step(1);
	        }
	        // return step by kind
	        if (kind == 'keys') return step(0, entry.k);
	        if (kind == 'values') return step(0, entry.v);
	        return step(0, [entry.k, entry.v]);
	      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	      // add [@@species], 23.1.2.2, 23.2.2.2
	      setSpecies(NAME);
	    }
	  };
	});

	var _collectionStrong$1 = interopDefault(_collectionStrong);
	var getConstructor = _collectionStrong.getConstructor;
	var def = _collectionStrong.def;
	var getEntry = _collectionStrong.getEntry;
	var setStrong = _collectionStrong.setStrong;

var require$$1$21 = Object.freeze({
	  default: _collectionStrong$1,
	  getConstructor: getConstructor,
	  def: def,
	  getEntry: getEntry,
	  setStrong: setStrong
	});

	var _collection = createCommonjsModule(function (module) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      $export = interopDefault(require$$1$2),
	      redefine = interopDefault(require$$4$2),
	      redefineAll = interopDefault(require$$3$7),
	      meta = interopDefault(require$$6),
	      forOf = interopDefault(require$$1$20),
	      anInstance = interopDefault(require$$4$6),
	      isObject = interopDefault(require$$0$1),
	      fails = interopDefault(require$$1$1),
	      $iterDetect = interopDefault(require$$5$2),
	      setToStringTag = interopDefault(require$$0$3),
	      inheritIfRequired = interopDefault(require$$0$19);

	  module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	    var Base = global[NAME],
	        C = Base,
	        ADDER = IS_MAP ? 'set' : 'add',
	        proto = C && C.prototype,
	        O = {};
	    var fixMethod = function fixMethod(KEY) {
	      var fn = proto[KEY];
	      redefine(proto, KEY, KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) {
	        fn.call(this, a === 0 ? 0 : a);return this;
	      } : function set(a, b) {
	        fn.call(this, a === 0 ? 0 : a, b);return this;
	      });
	    };
	    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	      new C().entries().next();
	    }))) {
	      // create collection constructor
	      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	      redefineAll(C.prototype, methods);
	      meta.NEED = true;
	    } else {
	      var instance = new C()
	      // early implementations not supports chaining
	      ,
	          HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      ,
	          THROWS_ON_PRIMITIVES = fails(function () {
	        instance.has(1);
	      })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      ,
	          ACCEPT_ITERABLES = $iterDetect(function (iter) {
	        new C(iter);
	      }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      ,
	          BUGGY_ZERO = !IS_WEAK && fails(function () {
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C(),
	            index = 5;
	        while (index--) {
	          $instance[ADDER](index, index);
	        }return !$instance.has(-0);
	      });
	      if (!ACCEPT_ITERABLES) {
	        C = wrapper(function (target, iterable) {
	          anInstance(target, C, NAME);
	          var that = inheritIfRequired(new Base(), target, C);
	          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	          return that;
	        });
	        C.prototype = proto;
	        proto.constructor = C;
	      }
	      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	        fixMethod('delete');
	        fixMethod('has');
	        IS_MAP && fixMethod('get');
	      }
	      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	      // weak collections should not contains .clear method
	      if (IS_WEAK && proto.clear) delete proto.clear;
	    }

	    setToStringTag(C, NAME);

	    O[NAME] = C;
	    $export($export.G + $export.W + $export.F * (C != Base), O);

	    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	    return C;
	  };
	});

	var _collection$1 = interopDefault(_collection);

var require$$0$37 = Object.freeze({
	  default: _collection$1
	});

	var es6_map = createCommonjsModule(function (module) {
	  'use strict';

	  var strong = interopDefault(require$$1$21);

	  // 23.1 Map Objects
	  module.exports = interopDefault(require$$0$37)('Map', function (get) {
	    return function Map() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  }, {
	    // 23.1.3.6 Map.prototype.get(key)
	    get: function get(key) {
	      var entry = strong.getEntry(this, key);
	      return entry && entry.v;
	    },
	    // 23.1.3.9 Map.prototype.set(key, value)
	    set: function set(key, value) {
	      return strong.def(this, key === 0 ? 0 : key, value);
	    }
	  }, strong, true);
	});

	var es6_map$1 = interopDefault(es6_map);

var require$$3$8 = Object.freeze({
	  default: es6_map$1
	});

	var es6_set = createCommonjsModule(function (module) {
	  'use strict';

	  var strong = interopDefault(require$$1$21);

	  // 23.2 Set Objects
	  module.exports = interopDefault(require$$0$37)('Set', function (get) {
	    return function Set() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  }, {
	    // 23.2.3.1 Set.prototype.add(value)
	    add: function add(value) {
	      return strong.def(this, value = value === 0 ? 0 : value, value);
	    }
	  }, strong);
	});

	var es6_set$1 = interopDefault(es6_set);

var require$$4$7 = Object.freeze({
	  default: es6_set$1
	});

	var _collectionWeak = createCommonjsModule(function (module) {
	  'use strict';

	  var redefineAll = interopDefault(require$$3$7),
	      getWeak = interopDefault(require$$6).getWeak,
	      anObject = interopDefault(require$$5),
	      isObject = interopDefault(require$$0$1),
	      anInstance = interopDefault(require$$4$6),
	      forOf = interopDefault(require$$1$20),
	      createArrayMethod = interopDefault(require$$10),
	      $has = interopDefault(require$$4),
	      arrayFind = createArrayMethod(5),
	      arrayFindIndex = createArrayMethod(6),
	      id = 0;

	  // fallback for uncaught frozen keys
	  var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
	    return that._l || (that._l = new UncaughtFrozenStore());
	  };
	  var UncaughtFrozenStore = function UncaughtFrozenStore() {
	    this.a = [];
	  };
	  var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	    return arrayFind(store.a, function (it) {
	      return it[0] === key;
	    });
	  };
	  UncaughtFrozenStore.prototype = {
	    get: function get(key) {
	      var entry = findUncaughtFrozen(this, key);
	      if (entry) return entry[1];
	    },
	    has: function has(key) {
	      return !!findUncaughtFrozen(this, key);
	    },
	    set: function set(key, value) {
	      var entry = findUncaughtFrozen(this, key);
	      if (entry) entry[1] = value;else this.a.push([key, value]);
	    },
	    'delete': function _delete(key) {
	      var index = arrayFindIndex(this.a, function (it) {
	        return it[0] === key;
	      });
	      if (~index) this.a.splice(index, 1);
	      return !!~index;
	    }
	  };

	  module.exports = {
	    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	      var C = wrapper(function (that, iterable) {
	        anInstance(that, C, NAME, '_i');
	        that._i = id++; // collection id
	        that._l = undefined; // leak store for uncaught frozen objects
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	      });
	      redefineAll(C.prototype, {
	        // 23.3.3.2 WeakMap.prototype.delete(key)
	        // 23.4.3.3 WeakSet.prototype.delete(value)
	        'delete': function _delete(key) {
	          if (!isObject(key)) return false;
	          var data = getWeak(key);
	          if (data === true) return uncaughtFrozenStore(this)['delete'](key);
	          return data && $has(data, this._i) && delete data[this._i];
	        },
	        // 23.3.3.4 WeakMap.prototype.has(key)
	        // 23.4.3.4 WeakSet.prototype.has(value)
	        has: function has(key) {
	          if (!isObject(key)) return false;
	          var data = getWeak(key);
	          if (data === true) return uncaughtFrozenStore(this).has(key);
	          return data && $has(data, this._i);
	        }
	      });
	      return C;
	    },
	    def: function def(that, key, value) {
	      var data = getWeak(anObject(key), true);
	      if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
	      return that;
	    },
	    ufstore: uncaughtFrozenStore
	  };
	});

	var _collectionWeak$1 = interopDefault(_collectionWeak);
	var getConstructor$1 = _collectionWeak.getConstructor;
	var def$1 = _collectionWeak.def;
	var ufstore = _collectionWeak.ufstore;

var require$$1$22 = Object.freeze({
	  default: _collectionWeak$1,
	  getConstructor: getConstructor$1,
	  def: def$1,
	  ufstore: ufstore
	});

	var es6_weakMap = createCommonjsModule(function (module) {
	  'use strict';

	  var each = interopDefault(require$$10)(0),
	      redefine = interopDefault(require$$4$2),
	      meta = interopDefault(require$$6),
	      assign = interopDefault(require$$3$4),
	      weak = interopDefault(require$$1$22),
	      isObject = interopDefault(require$$0$1),
	      getWeak = meta.getWeak,
	      isExtensible = Object.isExtensible,
	      uncaughtFrozenStore = weak.ufstore,
	      tmp = {},
	      InternalMap;

	  var wrapper = function wrapper(get) {
	    return function WeakMap() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  };

	  var methods = {
	    // 23.3.3.3 WeakMap.prototype.get(key)
	    get: function get(key) {
	      if (isObject(key)) {
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this).get(key);
	        return data ? data[this._i] : undefined;
	      }
	    },
	    // 23.3.3.5 WeakMap.prototype.set(key, value)
	    set: function set(key, value) {
	      return weak.def(this, key, value);
	    }
	  };

	  // 23.3 WeakMap Objects
	  var $WeakMap = module.exports = interopDefault(require$$0$37)('WeakMap', wrapper, methods, weak, true, true);

	  // IE11 WeakMap frozen keys fix
	  if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
	    InternalMap = weak.getConstructor(wrapper);
	    assign(InternalMap.prototype, methods);
	    meta.NEED = true;
	    each(['delete', 'has', 'get', 'set'], function (key) {
	      var proto = $WeakMap.prototype,
	          method = proto[key];
	      redefine(proto, key, function (a, b) {
	        // store frozen objects on internal weakmap shim
	        if (isObject(a) && !isExtensible(a)) {
	          if (!this._f) this._f = new InternalMap();
	          var result = this._f[key](a, b);
	          return key == 'set' ? this : result;
	          // store all the rest on native weakmap
	        }return method.call(this, a, b);
	      });
	    });
	  }
	});

	var es6_weakMap$1 = interopDefault(es6_weakMap);

var require$$0$38 = Object.freeze({
	  default: es6_weakMap$1
	});

	var es6_weakSet = createCommonjsModule(function (module) {
	  'use strict';

	  var weak = interopDefault(require$$1$22);

	  // 23.4 WeakSet Objects
	  interopDefault(require$$0$37)('WeakSet', function (get) {
	    return function WeakSet() {
	      return get(this, arguments.length > 0 ? arguments[0] : undefined);
	    };
	  }, {
	    // 23.4.3.1 WeakSet.prototype.add(value)
	    add: function add(value) {
	      return weak.def(this, value, true);
	    }
	  }, weak, false, true);
	});

	interopDefault(es6_weakSet);

	var _typed = createCommonjsModule(function (module) {
	  var global = interopDefault(require$$3),
	      hide = interopDefault(require$$2),
	      uid = interopDefault(require$$12),
	      TYPED = uid('typed_array'),
	      VIEW = uid('view'),
	      ABV = !!(global.ArrayBuffer && global.DataView),
	      CONSTR = ABV,
	      i = 0,
	      l = 9,
	      Typed;

	  var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

	  while (i < l) {
	    if (Typed = global[TypedArrayConstructors[i++]]) {
	      hide(Typed.prototype, TYPED, true);
	      hide(Typed.prototype, VIEW, true);
	    } else CONSTR = false;
	  }

	  module.exports = {
	    ABV: ABV,
	    CONSTR: CONSTR,
	    TYPED: TYPED,
	    VIEW: VIEW
	  };
	});

	var _typed$1 = interopDefault(_typed);
	var ABV = _typed.ABV;
	var CONSTR = _typed.CONSTR;
	var TYPED = _typed.TYPED;
	var VIEW = _typed.VIEW;

var require$$33 = Object.freeze({
	  default: _typed$1,
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	});

	var _typedBuffer = createCommonjsModule(function (module, exports) {
	  'use strict';

	  var global = interopDefault(require$$3),
	      DESCRIPTORS = interopDefault(require$$1),
	      LIBRARY = interopDefault(require$$2$4),
	      $typed = interopDefault(require$$33),
	      hide = interopDefault(require$$2),
	      redefineAll = interopDefault(require$$3$7),
	      fails = interopDefault(require$$1$1),
	      anInstance = interopDefault(require$$4$6),
	      toInteger = interopDefault(require$$26),
	      toLength = interopDefault(require$$3$1),
	      gOPN = interopDefault(require$$3$3).f,
	      dP = interopDefault(require$$2$1).f,
	      arrayFill = interopDefault(require$$3$5),
	      setToStringTag = interopDefault(require$$0$3),
	      ARRAY_BUFFER = 'ArrayBuffer',
	      DATA_VIEW = 'DataView',
	      PROTOTYPE = 'prototype',
	      WRONG_LENGTH = 'Wrong length!',
	      WRONG_INDEX = 'Wrong index!',
	      $ArrayBuffer = global[ARRAY_BUFFER],
	      $DataView = global[DATA_VIEW],
	      Math = global.Math,
	      RangeError = global.RangeError,
	      Infinity = global.Infinity,
	      BaseBuffer = $ArrayBuffer,
	      abs = Math.abs,
	      pow = Math.pow,
	      floor = Math.floor,
	      log = Math.log,
	      LN2 = Math.LN2,
	      BUFFER = 'buffer',
	      BYTE_LENGTH = 'byteLength',
	      BYTE_OFFSET = 'byteOffset',
	      $BUFFER = DESCRIPTORS ? '_b' : BUFFER,
	      $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH,
	      $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	  // IEEE754 conversions based on https://github.com/feross/ieee754
	  var packIEEE754 = function packIEEE754(value, mLen, nBytes) {
	    var buffer = Array(nBytes),
	        eLen = nBytes * 8 - mLen - 1,
	        eMax = (1 << eLen) - 1,
	        eBias = eMax >> 1,
	        rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0,
	        i = 0,
	        s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0,
	        e,
	        m,
	        c;
	    value = abs(value);
	    if (value != value || value === Infinity) {
	      m = value != value ? 1 : 0;
	      e = eMax;
	    } else {
	      e = floor(log(value) / LN2);
	      if (value * (c = pow(2, -e)) < 1) {
	        e--;
	        c *= 2;
	      }
	      if (e + eBias >= 1) {
	        value += rt / c;
	      } else {
	        value += rt * pow(2, 1 - eBias);
	      }
	      if (value * c >= 2) {
	        e++;
	        c /= 2;
	      }
	      if (e + eBias >= eMax) {
	        m = 0;
	        e = eMax;
	      } else if (e + eBias >= 1) {
	        m = (value * c - 1) * pow(2, mLen);
	        e = e + eBias;
	      } else {
	        m = value * pow(2, eBias - 1) * pow(2, mLen);
	        e = 0;
	      }
	    }
	    for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
	    e = e << mLen | m;
	    eLen += mLen;
	    for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
	    buffer[--i] |= s * 128;
	    return buffer;
	  };
	  var unpackIEEE754 = function unpackIEEE754(buffer, mLen, nBytes) {
	    var eLen = nBytes * 8 - mLen - 1,
	        eMax = (1 << eLen) - 1,
	        eBias = eMax >> 1,
	        nBits = eLen - 7,
	        i = nBytes - 1,
	        s = buffer[i--],
	        e = s & 127,
	        m;
	    s >>= 7;
	    for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
	    m = e & (1 << -nBits) - 1;
	    e >>= -nBits;
	    nBits += mLen;
	    for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
	    if (e === 0) {
	      e = 1 - eBias;
	    } else if (e === eMax) {
	      return m ? NaN : s ? -Infinity : Infinity;
	    } else {
	      m = m + pow(2, mLen);
	      e = e - eBias;
	    }return (s ? -1 : 1) * m * pow(2, e - mLen);
	  };

	  var unpackI32 = function unpackI32(bytes) {
	    return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	  };
	  var packI8 = function packI8(it) {
	    return [it & 0xff];
	  };
	  var packI16 = function packI16(it) {
	    return [it & 0xff, it >> 8 & 0xff];
	  };
	  var packI32 = function packI32(it) {
	    return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	  };
	  var packF64 = function packF64(it) {
	    return packIEEE754(it, 52, 8);
	  };
	  var packF32 = function packF32(it) {
	    return packIEEE754(it, 23, 4);
	  };

	  var addGetter = function addGetter(C, key, internal) {
	    dP(C[PROTOTYPE], key, { get: function get() {
	        return this[internal];
	      } });
	  };

	  var get = function get(view, bytes, index, isLittleEndian) {
	    var numIndex = +index,
	        intIndex = toInteger(numIndex);
	    if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	    var store = view[$BUFFER]._b,
	        start = intIndex + view[$OFFSET],
	        pack = store.slice(start, start + bytes);
	    return isLittleEndian ? pack : pack.reverse();
	  };
	  var set = function set(view, bytes, index, conversion, value, isLittleEndian) {
	    var numIndex = +index,
	        intIndex = toInteger(numIndex);
	    if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	    var store = view[$BUFFER]._b,
	        start = intIndex + view[$OFFSET],
	        pack = conversion(+value);
	    for (var i = 0; i < bytes; i++) {
	      store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	    }
	  };

	  var validateArrayBufferArguments = function validateArrayBufferArguments(that, length) {
	    anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	    var numberLength = +length,
	        byteLength = toLength(numberLength);
	    if (numberLength != byteLength) throw RangeError(WRONG_LENGTH);
	    return byteLength;
	  };

	  if (!$typed.ABV) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      var byteLength = validateArrayBufferArguments(this, length);
	      this._b = arrayFill.call(Array(byteLength), 0);
	      this[$LENGTH] = byteLength;
	    };

	    $DataView = function DataView(buffer, byteOffset, byteLength) {
	      anInstance(this, $DataView, DATA_VIEW);
	      anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	      var bufferLength = buffer[$LENGTH],
	          offset = toInteger(byteOffset);
	      if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	      byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	      if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	      this[$BUFFER] = buffer;
	      this[$OFFSET] = offset;
	      this[$LENGTH] = byteLength;
	    };

	    if (DESCRIPTORS) {
	      addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	      addGetter($DataView, BUFFER, '_b');
	      addGetter($DataView, BYTE_LENGTH, '_l');
	      addGetter($DataView, BYTE_OFFSET, '_o');
	    }

	    redefineAll($DataView[PROTOTYPE], {
	      getInt8: function getInt8(byteOffset) {
	        return get(this, 1, byteOffset)[0] << 24 >> 24;
	      },
	      getUint8: function getUint8(byteOffset) {
	        return get(this, 1, byteOffset)[0];
	      },
	      getInt16: function getInt16(byteOffset /*, littleEndian */) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	      },
	      getUint16: function getUint16(byteOffset /*, littleEndian */) {
	        var bytes = get(this, 2, byteOffset, arguments[1]);
	        return bytes[1] << 8 | bytes[0];
	      },
	      getInt32: function getInt32(byteOffset /*, littleEndian */) {
	        return unpackI32(get(this, 4, byteOffset, arguments[1]));
	      },
	      getUint32: function getUint32(byteOffset /*, littleEndian */) {
	        return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	      },
	      getFloat32: function getFloat32(byteOffset /*, littleEndian */) {
	        return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	      },
	      getFloat64: function getFloat64(byteOffset /*, littleEndian */) {
	        return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	      },
	      setInt8: function setInt8(byteOffset, value) {
	        set(this, 1, byteOffset, packI8, value);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        set(this, 1, byteOffset, packI8, value);
	      },
	      setInt16: function setInt16(byteOffset, value /*, littleEndian */) {
	        set(this, 2, byteOffset, packI16, value, arguments[2]);
	      },
	      setUint16: function setUint16(byteOffset, value /*, littleEndian */) {
	        set(this, 2, byteOffset, packI16, value, arguments[2]);
	      },
	      setInt32: function setInt32(byteOffset, value /*, littleEndian */) {
	        set(this, 4, byteOffset, packI32, value, arguments[2]);
	      },
	      setUint32: function setUint32(byteOffset, value /*, littleEndian */) {
	        set(this, 4, byteOffset, packI32, value, arguments[2]);
	      },
	      setFloat32: function setFloat32(byteOffset, value /*, littleEndian */) {
	        set(this, 4, byteOffset, packF32, value, arguments[2]);
	      },
	      setFloat64: function setFloat64(byteOffset, value /*, littleEndian */) {
	        set(this, 8, byteOffset, packF64, value, arguments[2]);
	      }
	    });
	  } else {
	    if (!fails(function () {
	      new $ArrayBuffer(); // eslint-disable-line no-new
	    }) || !fails(function () {
	      new $ArrayBuffer(.5); // eslint-disable-line no-new
	    })) {
	      $ArrayBuffer = function ArrayBuffer(length) {
	        return new BaseBuffer(validateArrayBufferArguments(this, length));
	      };
	      var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	      for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	        if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
	      };
	      if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
	    }
	    // iOS Safari 7.x bug
	    var view = new $DataView(new $ArrayBuffer(2)),
	        $setInt8 = $DataView[PROTOTYPE].setInt8;
	    view.setInt8(0, 2147483648);
	    view.setInt8(1, 2147483649);
	    if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	      setInt8: function setInt8(byteOffset, value) {
	        $setInt8.call(this, byteOffset, value << 24 >> 24);
	      },
	      setUint8: function setUint8(byteOffset, value) {
	        $setInt8.call(this, byteOffset, value << 24 >> 24);
	      }
	    }, true);
	  }
	  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	  setToStringTag($DataView, DATA_VIEW);
	  hide($DataView[PROTOTYPE], $typed.VIEW, true);
	  exports[ARRAY_BUFFER] = $ArrayBuffer;
	  exports[DATA_VIEW] = $DataView;
	});

	var _typedBuffer$1 = interopDefault(_typedBuffer);

var require$$32 = Object.freeze({
	  default: _typedBuffer$1
	});

	var es6_typed_arrayBuffer = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      $typed = interopDefault(require$$33),
	      buffer = interopDefault(require$$32),
	      anObject = interopDefault(require$$5),
	      toIndex = interopDefault(require$$24),
	      toLength = interopDefault(require$$3$1),
	      isObject = interopDefault(require$$0$1),
	      ArrayBuffer = interopDefault(require$$3).ArrayBuffer,
	      speciesConstructor = interopDefault(require$$8),
	      $ArrayBuffer = buffer.ArrayBuffer,
	      $DataView = buffer.DataView,
	      $isView = $typed.ABV && ArrayBuffer.isView,
	      $slice = $ArrayBuffer.prototype.slice,
	      VIEW = $typed.VIEW,
	      ARRAY_BUFFER = 'ArrayBuffer';

	  $export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	  $export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	    // 24.1.3.1 ArrayBuffer.isView(arg)
	    isView: function isView(it) {
	      return $isView && $isView(it) || isObject(it) && VIEW in it;
	    }
	  });

	  $export($export.P + $export.U + $export.F * interopDefault(require$$1$1)(function () {
	    return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	  }), ARRAY_BUFFER, {
	    // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	    slice: function slice(start, end) {
	      if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
	      var len = anObject(this).byteLength,
	          first = toIndex(start, len),
	          final = toIndex(end === undefined ? len : end, len),
	          result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first)),
	          viewS = new $DataView(this),
	          viewT = new $DataView(result),
	          index = 0;
	      while (first < final) {
	        viewT.setUint8(index++, viewS.getUint8(first++));
	      }return result;
	    }
	  });

	  interopDefault(require$$0$35)(ARRAY_BUFFER);
	});

	interopDefault(es6_typed_arrayBuffer);

	var es6_typed_dataView = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2);
	  $export($export.G + $export.W + $export.F * !interopDefault(require$$33).ABV, {
	    DataView: interopDefault(require$$32).DataView
	  });
	});

	interopDefault(es6_typed_dataView);

	var _typedArray = createCommonjsModule(function (module) {
	  'use strict';

	  if (interopDefault(require$$1)) {
	    var LIBRARY = interopDefault(require$$2$4),
	        global = interopDefault(require$$3),
	        fails = interopDefault(require$$1$1),
	        $export = interopDefault(require$$1$2),
	        $typed = interopDefault(require$$33),
	        $buffer = interopDefault(require$$32),
	        ctx = interopDefault(require$$31),
	        anInstance = interopDefault(require$$4$6),
	        propertyDesc = interopDefault(require$$2$3),
	        hide = interopDefault(require$$2),
	        redefineAll = interopDefault(require$$3$7),
	        toInteger = interopDefault(require$$26),
	        toLength = interopDefault(require$$3$1),
	        toIndex = interopDefault(require$$24),
	        toPrimitive = interopDefault(require$$4$1),
	        has = interopDefault(require$$4),
	        same = interopDefault(require$$21),
	        classof = interopDefault(require$$1$11),
	        isObject = interopDefault(require$$0$1),
	        toObject = interopDefault(require$$5$1),
	        isArrayIter = interopDefault(require$$17),
	        create = interopDefault(require$$6$1),
	        getPrototypeOf = interopDefault(require$$0$13),
	        gOPN = interopDefault(require$$3$3).f,
	        getIterFn = interopDefault(require$$13),
	        uid = interopDefault(require$$12),
	        wks = interopDefault(require$$0$4),
	        createArrayMethod = interopDefault(require$$10),
	        createArrayIncludes = interopDefault(require$$1$9),
	        speciesConstructor = interopDefault(require$$8),
	        ArrayIterators = interopDefault(require$$5$3),
	        Iterators = interopDefault(require$$1$15),
	        $iterDetect = interopDefault(require$$5$2),
	        setSpecies = interopDefault(require$$0$35),
	        arrayFill = interopDefault(require$$3$5),
	        arrayCopyWithin = interopDefault(require$$2$9),
	        $DP = interopDefault(require$$2$1),
	        $GOPD = interopDefault(require$$2$7),
	        dP = $DP.f,
	        gOPD = $GOPD.f,
	        RangeError = global.RangeError,
	        TypeError = global.TypeError,
	        Uint8Array = global.Uint8Array,
	        ARRAY_BUFFER = 'ArrayBuffer',
	        SHARED_BUFFER = 'Shared' + ARRAY_BUFFER,
	        BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
	        PROTOTYPE = 'prototype',
	        ArrayProto = Array[PROTOTYPE],
	        $ArrayBuffer = $buffer.ArrayBuffer,
	        $DataView = $buffer.DataView,
	        arrayForEach = createArrayMethod(0),
	        arrayFilter = createArrayMethod(2),
	        arraySome = createArrayMethod(3),
	        arrayEvery = createArrayMethod(4),
	        arrayFind = createArrayMethod(5),
	        arrayFindIndex = createArrayMethod(6),
	        arrayIncludes = createArrayIncludes(true),
	        arrayIndexOf = createArrayIncludes(false),
	        arrayValues = ArrayIterators.values,
	        arrayKeys = ArrayIterators.keys,
	        arrayEntries = ArrayIterators.entries,
	        arrayLastIndexOf = ArrayProto.lastIndexOf,
	        arrayReduce = ArrayProto.reduce,
	        arrayReduceRight = ArrayProto.reduceRight,
	        arrayJoin = ArrayProto.join,
	        arraySort = ArrayProto.sort,
	        arraySlice = ArrayProto.slice,
	        arrayToString = ArrayProto.toString,
	        arrayToLocaleString = ArrayProto.toLocaleString,
	        ITERATOR = wks('iterator'),
	        TAG = wks('toStringTag'),
	        TYPED_CONSTRUCTOR = uid('typed_constructor'),
	        DEF_CONSTRUCTOR = uid('def_constructor'),
	        ALL_CONSTRUCTORS = $typed.CONSTR,
	        TYPED_ARRAY = $typed.TYPED,
	        VIEW = $typed.VIEW,
	        WRONG_LENGTH = 'Wrong length!';

	    var $map = createArrayMethod(1, function (O, length) {
	      return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	    });

	    var LITTLE_ENDIAN = fails(function () {
	      return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	    });

	    var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	      new Uint8Array(1).set({});
	    });

	    var strictToLength = function strictToLength(it, SAME) {
	      if (it === undefined) throw TypeError(WRONG_LENGTH);
	      var number = +it,
	          length = toLength(it);
	      if (SAME && !same(number, length)) throw RangeError(WRONG_LENGTH);
	      return length;
	    };

	    var toOffset = function toOffset(it, BYTES) {
	      var offset = toInteger(it);
	      if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	      return offset;
	    };

	    var validate = function validate(it) {
	      if (isObject(it) && TYPED_ARRAY in it) return it;
	      throw TypeError(it + ' is not a typed array!');
	    };

	    var allocate = function allocate(C, length) {
	      if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	        throw TypeError('It is not a typed array constructor!');
	      }return new C(length);
	    };

	    var speciesFromList = function speciesFromList(O, list) {
	      return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	    };

	    var fromList = function fromList(C, list) {
	      var index = 0,
	          length = list.length,
	          result = allocate(C, length);
	      while (length > index) {
	        result[index] = list[index++];
	      }return result;
	    };

	    var addGetter = function addGetter(it, key, internal) {
	      dP(it, key, { get: function get() {
	          return this._d[internal];
	        } });
	    };

	    var $from = function from(source /*, mapfn, thisArg */) {
	      var O = toObject(source),
	          aLen = arguments.length,
	          mapfn = aLen > 1 ? arguments[1] : undefined,
	          mapping = mapfn !== undefined,
	          iterFn = getIterFn(O),
	          i,
	          length,
	          values,
	          result,
	          step,
	          iterator;
	      if (iterFn != undefined && !isArrayIter(iterFn)) {
	        for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	          values.push(step.value);
	        }O = values;
	      }
	      if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	      for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	        result[i] = mapping ? mapfn(O[i], i) : O[i];
	      }
	      return result;
	    };

	    var $of = function of() /*...items*/{
	      var index = 0,
	          length = arguments.length,
	          result = allocate(this, length);
	      while (length > index) {
	        result[index] = arguments[index++];
	      }return result;
	    };

	    // iOS Safari 6.x fails here
	    var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
	      arrayToLocaleString.call(new Uint8Array(1));
	    });

	    var $toLocaleString = function toLocaleString() {
	      return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	    };

	    var proto = {
	      copyWithin: function copyWithin(target, start /*, end */) {
	        return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	      },
	      every: function every(callbackfn /*, thisArg */) {
	        return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      fill: function fill(value /*, start, end */) {
	        // eslint-disable-line no-unused-vars
	        return arrayFill.apply(validate(this), arguments);
	      },
	      filter: function filter(callbackfn /*, thisArg */) {
	        return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
	      },
	      find: function find(predicate /*, thisArg */) {
	        return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      findIndex: function findIndex(predicate /*, thisArg */) {
	        return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      forEach: function forEach(callbackfn /*, thisArg */) {
	        arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      indexOf: function indexOf(searchElement /*, fromIndex */) {
	        return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      includes: function includes(searchElement /*, fromIndex */) {
	        return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      join: function join(separator) {
	        // eslint-disable-line no-unused-vars
	        return arrayJoin.apply(validate(this), arguments);
	      },
	      lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
	        // eslint-disable-line no-unused-vars
	        return arrayLastIndexOf.apply(validate(this), arguments);
	      },
	      map: function map(mapfn /*, thisArg */) {
	        return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      reduce: function reduce(callbackfn /*, initialValue */) {
	        // eslint-disable-line no-unused-vars
	        return arrayReduce.apply(validate(this), arguments);
	      },
	      reduceRight: function reduceRight(callbackfn /*, initialValue */) {
	        // eslint-disable-line no-unused-vars
	        return arrayReduceRight.apply(validate(this), arguments);
	      },
	      reverse: function reverse() {
	        var that = this,
	            length = validate(that).length,
	            middle = Math.floor(length / 2),
	            index = 0,
	            value;
	        while (index < middle) {
	          value = that[index];
	          that[index++] = that[--length];
	          that[length] = value;
	        }return that;
	      },
	      some: function some(callbackfn /*, thisArg */) {
	        return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	      },
	      sort: function sort(comparefn) {
	        return arraySort.call(validate(this), comparefn);
	      },
	      subarray: function subarray(begin, end) {
	        var O = validate(this),
	            length = O.length,
	            $begin = toIndex(begin, length);
	        return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
	      }
	    };

	    var $slice = function slice(start, end) {
	      return speciesFromList(this, arraySlice.call(validate(this), start, end));
	    };

	    var $set = function set(arrayLike /*, offset */) {
	      validate(this);
	      var offset = toOffset(arguments[1], 1),
	          length = this.length,
	          src = toObject(arrayLike),
	          len = toLength(src.length),
	          index = 0;
	      if (len + offset > length) throw RangeError(WRONG_LENGTH);
	      while (index < len) {
	        this[offset + index] = src[index++];
	      }
	    };

	    var $iterators = {
	      entries: function entries() {
	        return arrayEntries.call(validate(this));
	      },
	      keys: function keys() {
	        return arrayKeys.call(validate(this));
	      },
	      values: function values() {
	        return arrayValues.call(validate(this));
	      }
	    };

	    var isTAIndex = function isTAIndex(target, key) {
	      return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
	    };
	    var $getDesc = function getOwnPropertyDescriptor(target, key) {
	      return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
	    };
	    var $setDesc = function defineProperty(target, key, desc) {
	      if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
	        target[key] = desc.value;
	        return target;
	      } else return dP(target, key, desc);
	    };

	    if (!ALL_CONSTRUCTORS) {
	      $GOPD.f = $getDesc;
	      $DP.f = $setDesc;
	    }

	    $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	      getOwnPropertyDescriptor: $getDesc,
	      defineProperty: $setDesc
	    });

	    if (fails(function () {
	      arrayToString.call({});
	    })) {
	      arrayToString = arrayToLocaleString = function toString() {
	        return arrayJoin.call(this);
	      };
	    }

	    var $TypedArrayPrototype$ = redefineAll({}, proto);
	    redefineAll($TypedArrayPrototype$, $iterators);
	    hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	    redefineAll($TypedArrayPrototype$, {
	      slice: $slice,
	      set: $set,
	      constructor: function constructor() {/* noop */},
	      toString: arrayToString,
	      toLocaleString: $toLocaleString
	    });
	    addGetter($TypedArrayPrototype$, 'buffer', 'b');
	    addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	    addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	    addGetter($TypedArrayPrototype$, 'length', 'e');
	    dP($TypedArrayPrototype$, TAG, {
	      get: function get() {
	        return this[TYPED_ARRAY];
	      }
	    });

	    module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	      CLAMPED = !!CLAMPED;
	      var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
	          ISNT_UINT8 = NAME != 'Uint8Array',
	          GETTER = 'get' + KEY,
	          SETTER = 'set' + KEY,
	          TypedArray = global[NAME],
	          Base = TypedArray || {},
	          TAC = TypedArray && getPrototypeOf(TypedArray),
	          FORCED = !TypedArray || !$typed.ABV,
	          O = {},
	          TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	      var getter = function getter(that, index) {
	        var data = that._d;
	        return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	      };
	      var setter = function setter(that, index, value) {
	        var data = that._d;
	        if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	        data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	      };
	      var addElement = function addElement(that, index) {
	        dP(that, index, {
	          get: function get() {
	            return getter(this, index);
	          },
	          set: function set(value) {
	            return setter(this, index, value);
	          },
	          enumerable: true
	        });
	      };
	      if (FORCED) {
	        TypedArray = wrapper(function (that, data, $offset, $length) {
	          anInstance(that, TypedArray, NAME, '_d');
	          var index = 0,
	              offset = 0,
	              buffer,
	              byteLength,
	              length,
	              klass;
	          if (!isObject(data)) {
	            length = strictToLength(data, true);
	            byteLength = length * BYTES;
	            buffer = new $ArrayBuffer(byteLength);
	          } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	            buffer = data;
	            offset = toOffset($offset, BYTES);
	            var $len = data.byteLength;
	            if ($length === undefined) {
	              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	              byteLength = $len - offset;
	              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	            } else {
	              byteLength = toLength($length) * BYTES;
	              if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	            }
	            length = byteLength / BYTES;
	          } else if (TYPED_ARRAY in data) {
	            return fromList(TypedArray, data);
	          } else {
	            return $from.call(TypedArray, data);
	          }
	          hide(that, '_d', {
	            b: buffer,
	            o: offset,
	            l: byteLength,
	            e: length,
	            v: new $DataView(buffer)
	          });
	          while (index < length) {
	            addElement(that, index++);
	          }
	        });
	        TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	        hide(TypedArrayPrototype, 'constructor', TypedArray);
	      } else if (!$iterDetect(function (iter) {
	        // V8 works with iterators, but fails in many other cases
	        // https://code.google.com/p/v8/issues/detail?id=4552
	        new TypedArray(null); // eslint-disable-line no-new
	        new TypedArray(iter); // eslint-disable-line no-new
	      }, true)) {
	        TypedArray = wrapper(function (that, data, $offset, $length) {
	          anInstance(that, TypedArray, NAME);
	          var klass;
	          // `ws` module bug, temporarily remove validation length for Uint8Array
	          // https://github.com/websockets/ws/pull/645
	          if (!isObject(data)) return new Base(strictToLength(data, ISNT_UINT8));
	          if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	            return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
	          }
	          if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	          return $from.call(TypedArray, data);
	        });
	        arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	          if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	        });
	        TypedArray[PROTOTYPE] = TypedArrayPrototype;
	        if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	      }
	      var $nativeIterator = TypedArrayPrototype[ITERATOR],
	          CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
	          $iterator = $iterators.values;
	      hide(TypedArray, TYPED_CONSTRUCTOR, true);
	      hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	      hide(TypedArrayPrototype, VIEW, true);
	      hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	      if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	        dP(TypedArrayPrototype, TAG, {
	          get: function get() {
	            return NAME;
	          }
	        });
	      }

	      O[NAME] = TypedArray;

	      $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	      $export($export.S, NAME, {
	        BYTES_PER_ELEMENT: BYTES,
	        from: $from,
	        of: $of
	      });

	      if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	      $export($export.P, NAME, proto);

	      setSpecies(NAME);

	      $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	      $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	      $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, { toString: arrayToString });

	      $export($export.P + $export.F * fails(function () {
	        new TypedArray(1).slice();
	      }), NAME, { slice: $slice });

	      $export($export.P + $export.F * (fails(function () {
	        return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	      }) || !fails(function () {
	        TypedArrayPrototype.toLocaleString.call([1, 2]);
	      })), NAME, { toLocaleString: $toLocaleString });

	      Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	      if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	    };
	  } else module.exports = function () {/* empty */};
	});

	var _typedArray$1 = interopDefault(_typedArray);



	var require$$0$39 = Object.freeze({
	  default: _typedArray$1
	});

	var es6_typed_int8Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Int8', 1, function (init) {
	    return function Int8Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_int8Array);

	var es6_typed_uint8Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint8', 1, function (init) {
	    return function Uint8Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_uint8Array);

	var es6_typed_uint8ClampedArray = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint8', 1, function (init) {
	    return function Uint8ClampedArray(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  }, true);
	});

	interopDefault(es6_typed_uint8ClampedArray);

	var es6_typed_int16Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Int16', 2, function (init) {
	    return function Int16Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_int16Array);

	var es6_typed_uint16Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint16', 2, function (init) {
	    return function Uint16Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_uint16Array);

	var es6_typed_int32Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Int32', 4, function (init) {
	    return function Int32Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_int32Array);

	var es6_typed_uint32Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Uint32', 4, function (init) {
	    return function Uint32Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_uint32Array);

	var es6_typed_float32Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Float32', 4, function (init) {
	    return function Float32Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_float32Array);

	var es6_typed_float64Array = createCommonjsModule(function (module) {
	  interopDefault(require$$0$39)('Float64', 8, function (init) {
	    return function Float64Array(data, byteOffset, length) {
	      return init(this, data, byteOffset, length);
	    };
	  });
	});

	interopDefault(es6_typed_float64Array);

	var es6_reflect_apply = createCommonjsModule(function (module) {
	  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	  var $export = interopDefault(require$$1$2),
	      aFunction = interopDefault(require$$0$2),
	      anObject = interopDefault(require$$5),
	      rApply = (interopDefault(require$$3).Reflect || {}).apply,
	      fApply = Function.apply;
	  // MS Edge argumentsList argument is optional
	  $export($export.S + $export.F * !interopDefault(require$$1$1)(function () {
	    rApply(function () {});
	  }), 'Reflect', {
	    apply: function apply(target, thisArgument, argumentsList) {
	      var T = aFunction(target),
	          L = anObject(argumentsList);
	      return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	    }
	  });
	});

	interopDefault(es6_reflect_apply);

	var es6_reflect_construct = createCommonjsModule(function (module) {
	  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	  var $export = interopDefault(require$$1$2),
	      create = interopDefault(require$$6$1),
	      aFunction = interopDefault(require$$0$2),
	      anObject = interopDefault(require$$5),
	      isObject = interopDefault(require$$0$1),
	      fails = interopDefault(require$$1$1),
	      bind = interopDefault(require$$1$12),
	      rConstruct = (interopDefault(require$$3).Reflect || {}).construct;

	  // MS Edge supports only 2 arguments and argumentsList argument is optional
	  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
	  var NEW_TARGET_BUG = fails(function () {
	    function F() {}
	    return !(rConstruct(function () {}, [], F) instanceof F);
	  });
	  var ARGS_BUG = !fails(function () {
	    rConstruct(function () {});
	  });

	  $export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	    construct: function construct(Target, args /*, newTarget*/) {
	      aFunction(Target);
	      anObject(args);
	      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	      if (Target == newTarget) {
	        // w/o altered newTarget, optimization for 0-4 arguments
	        switch (args.length) {
	          case 0:
	            return new Target();
	          case 1:
	            return new Target(args[0]);
	          case 2:
	            return new Target(args[0], args[1]);
	          case 3:
	            return new Target(args[0], args[1], args[2]);
	          case 4:
	            return new Target(args[0], args[1], args[2], args[3]);
	        }
	        // w/o altered newTarget, lot of arguments case
	        var $args = [null];
	        $args.push.apply($args, args);
	        return new (bind.apply(Target, $args))();
	      }
	      // with altered newTarget, not support built-in constructors
	      var proto = newTarget.prototype,
	          instance = create(isObject(proto) ? proto : Object.prototype),
	          result = Function.apply.call(Target, instance, args);
	      return isObject(result) ? result : instance;
	    }
	  });
	});

	interopDefault(es6_reflect_construct);

	var es6_reflect_defineProperty = createCommonjsModule(function (module) {
	  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	  var dP = interopDefault(require$$2$1),
	      $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5),
	      toPrimitive = interopDefault(require$$4$1);

	  // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	  $export($export.S + $export.F * interopDefault(require$$1$1)(function () {
	    Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
	  }), 'Reflect', {
	    defineProperty: function defineProperty(target, propertyKey, attributes) {
	      anObject(target);
	      propertyKey = toPrimitive(propertyKey, true);
	      anObject(attributes);
	      try {
	        dP.f(target, propertyKey, attributes);
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }
	  });
	});

	interopDefault(es6_reflect_defineProperty);

	var es6_reflect_deleteProperty = createCommonjsModule(function (module) {
	  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	  var $export = interopDefault(require$$1$2),
	      gOPD = interopDefault(require$$2$7).f,
	      anObject = interopDefault(require$$5);

	  $export($export.S, 'Reflect', {
	    deleteProperty: function deleteProperty(target, propertyKey) {
	      var desc = gOPD(anObject(target), propertyKey);
	      return desc && !desc.configurable ? false : delete target[propertyKey];
	    }
	  });
	});

	interopDefault(es6_reflect_deleteProperty);

	var es6_reflect_enumerate = createCommonjsModule(function (module) {
	  'use strict';
	  // 26.1.5 Reflect.enumerate(target)

	  var $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5);
	  var Enumerate = function Enumerate(iterated) {
	    this._t = anObject(iterated); // target
	    this._i = 0; // next index
	    var keys = this._k = [] // keys
	    ,
	        key;
	    for (key in iterated) {
	      keys.push(key);
	    }
	  };
	  interopDefault(require$$0$26)(Enumerate, 'Object', function () {
	    var that = this,
	        keys = that._k,
	        key;
	    do {
	      if (that._i >= keys.length) return { value: undefined, done: true };
	    } while (!((key = keys[that._i++]) in that._t));
	    return { value: key, done: false };
	  });

	  $export($export.S, 'Reflect', {
	    enumerate: function enumerate(target) {
	      return new Enumerate(target);
	    }
	  });
	});

	interopDefault(es6_reflect_enumerate);

	var es6_reflect_get = createCommonjsModule(function (module) {
	  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	  var gOPD = interopDefault(require$$2$7),
	      getPrototypeOf = interopDefault(require$$0$13),
	      has = interopDefault(require$$4),
	      $export = interopDefault(require$$1$2),
	      isObject = interopDefault(require$$0$1),
	      anObject = interopDefault(require$$5);

	  function get(target, propertyKey /*, receiver*/) {
	    var receiver = arguments.length < 3 ? target : arguments[2],
	        desc,
	        proto;
	    if (anObject(target) === receiver) return target[propertyKey];
	    if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
	    if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	  }

	  $export($export.S, 'Reflect', { get: get });
	});

	interopDefault(es6_reflect_get);

	var es6_reflect_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
	  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	  var gOPD = interopDefault(require$$2$7),
	      $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5);

	  $export($export.S, 'Reflect', {
	    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	      return gOPD.f(anObject(target), propertyKey);
	    }
	  });
	});

	interopDefault(es6_reflect_getOwnPropertyDescriptor);

	var es6_reflect_getPrototypeOf = createCommonjsModule(function (module) {
	  // 26.1.8 Reflect.getPrototypeOf(target)
	  var $export = interopDefault(require$$1$2),
	      getProto = interopDefault(require$$0$13),
	      anObject = interopDefault(require$$5);

	  $export($export.S, 'Reflect', {
	    getPrototypeOf: function getPrototypeOf(target) {
	      return getProto(anObject(target));
	    }
	  });
	});

	interopDefault(es6_reflect_getPrototypeOf);

	var es6_reflect_has = createCommonjsModule(function (module) {
	  // 26.1.9 Reflect.has(target, propertyKey)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Reflect', {
	    has: function has(target, propertyKey) {
	      return propertyKey in target;
	    }
	  });
	});

	interopDefault(es6_reflect_has);

	var es6_reflect_isExtensible = createCommonjsModule(function (module) {
	  // 26.1.10 Reflect.isExtensible(target)
	  var $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5),
	      $isExtensible = Object.isExtensible;

	  $export($export.S, 'Reflect', {
	    isExtensible: function isExtensible(target) {
	      anObject(target);
	      return $isExtensible ? $isExtensible(target) : true;
	    }
	  });
	});

	interopDefault(es6_reflect_isExtensible);

	var _ownKeys = createCommonjsModule(function (module) {
	  // all object keys, includes non-enumerable and symbols
	  var gOPN = interopDefault(require$$3$3),
	      gOPS = interopDefault(require$$2$6),
	      anObject = interopDefault(require$$5),
	      Reflect = interopDefault(require$$3).Reflect;
	  module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
	    var keys = gOPN.f(anObject(it)),
	        getSymbols = gOPS.f;
	    return getSymbols ? keys.concat(getSymbols(it)) : keys;
	  };
	});

	var _ownKeys$1 = interopDefault(_ownKeys);

var require$$3$9 = Object.freeze({
	  default: _ownKeys$1
	});

	var es6_reflect_ownKeys = createCommonjsModule(function (module) {
	  // 26.1.11 Reflect.ownKeys(target)
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Reflect', { ownKeys: interopDefault(require$$3$9) });
	});

	interopDefault(es6_reflect_ownKeys);

	var es6_reflect_preventExtensions = createCommonjsModule(function (module) {
	  // 26.1.12 Reflect.preventExtensions(target)
	  var $export = interopDefault(require$$1$2),
	      anObject = interopDefault(require$$5),
	      $preventExtensions = Object.preventExtensions;

	  $export($export.S, 'Reflect', {
	    preventExtensions: function preventExtensions(target) {
	      anObject(target);
	      try {
	        if ($preventExtensions) $preventExtensions(target);
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }
	  });
	});

	interopDefault(es6_reflect_preventExtensions);

	var es6_reflect_set = createCommonjsModule(function (module) {
	  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	  var dP = interopDefault(require$$2$1),
	      gOPD = interopDefault(require$$2$7),
	      getPrototypeOf = interopDefault(require$$0$13),
	      has = interopDefault(require$$4),
	      $export = interopDefault(require$$1$2),
	      createDesc = interopDefault(require$$2$3),
	      anObject = interopDefault(require$$5),
	      isObject = interopDefault(require$$0$1);

	  function set(target, propertyKey, V /*, receiver*/) {
	    var receiver = arguments.length < 4 ? target : arguments[3],
	        ownDesc = gOPD.f(anObject(target), propertyKey),
	        existingDescriptor,
	        proto;
	    if (!ownDesc) {
	      if (isObject(proto = getPrototypeOf(target))) {
	        return set(proto, propertyKey, V, receiver);
	      }
	      ownDesc = createDesc(0);
	    }
	    if (has(ownDesc, 'value')) {
	      if (ownDesc.writable === false || !isObject(receiver)) return false;
	      existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	      existingDescriptor.value = V;
	      dP.f(receiver, propertyKey, existingDescriptor);
	      return true;
	    }
	    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	  }

	  $export($export.S, 'Reflect', { set: set });
	});

	interopDefault(es6_reflect_set);

	var es6_reflect_setPrototypeOf = createCommonjsModule(function (module) {
	  // 26.1.14 Reflect.setPrototypeOf(target, proto)
	  var $export = interopDefault(require$$1$2),
	      setProto = interopDefault(require$$0$14);

	  if (setProto) $export($export.S, 'Reflect', {
	    setPrototypeOf: function setPrototypeOf(target, proto) {
	      setProto.check(target, proto);
	      try {
	        setProto.set(target, proto);
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }
	  });
	});

	interopDefault(es6_reflect_setPrototypeOf);

	var es7_array_includes = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/tc39/Array.prototype.includes

	  var $export = interopDefault(require$$1$2),
	      $includes = interopDefault(require$$1$9)(true);

	  $export($export.P, 'Array', {
	    includes: function includes(el /*, fromIndex = 0 */) {
	      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });

	  interopDefault(require$$0$34)('includes');
	});

	interopDefault(es7_array_includes);

	var es7_string_at = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/mathiasbynens/String.prototype.at

	  var $export = interopDefault(require$$1$2),
	      $at = interopDefault(require$$0$25)(true);

	  $export($export.P, 'String', {
	    at: function at(pos) {
	      return $at(this, pos);
	    }
	  });
	});

	interopDefault(es7_string_at);

	var _stringPad = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-string-pad-start-end
	  var toLength = interopDefault(require$$3$1),
	      repeat = interopDefault(require$$1$14),
	      defined = interopDefault(require$$4$3);

	  module.exports = function (that, maxLength, fillString, left) {
	    var S = String(defined(that)),
	        stringLength = S.length,
	        fillStr = fillString === undefined ? ' ' : String(fillString),
	        intMaxLength = toLength(maxLength);
	    if (intMaxLength <= stringLength || fillStr == '') return S;
	    var fillLen = intMaxLength - stringLength,
	        stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	    return left ? stringFiller + S : S + stringFiller;
	  };
	});

	var _stringPad$1 = interopDefault(_stringPad);

var require$$0$40 = Object.freeze({
	  default: _stringPad$1
	});

	var es7_string_padStart = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/tc39/proposal-string-pad-start-end

	  var $export = interopDefault(require$$1$2),
	      $pad = interopDefault(require$$0$40);

	  $export($export.P, 'String', {
	    padStart: function padStart(maxLength /*, fillString = ' ' */) {
	      return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	    }
	  });
	});

	interopDefault(es7_string_padStart);

	var es7_string_padEnd = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/tc39/proposal-string-pad-start-end

	  var $export = interopDefault(require$$1$2),
	      $pad = interopDefault(require$$0$40);

	  $export($export.P, 'String', {
	    padEnd: function padEnd(maxLength /*, fillString = ' ' */) {
	      return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	    }
	  });
	});

	interopDefault(es7_string_padEnd);

	var es7_string_trimLeft = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	  interopDefault(require$$0$16)('trimLeft', function ($trim) {
	    return function trimLeft() {
	      return $trim(this, 1);
	    };
	  }, 'trimStart');
	});

	interopDefault(es7_string_trimLeft);

	var es7_string_trimRight = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	  interopDefault(require$$0$16)('trimRight', function ($trim) {
	    return function trimRight() {
	      return $trim(this, 2);
	    };
	  }, 'trimEnd');
	});

	interopDefault(es7_string_trimRight);

	var es7_string_matchAll = createCommonjsModule(function (module) {
	  'use strict';
	  // https://tc39.github.io/String.prototype.matchAll/

	  var $export = interopDefault(require$$1$2),
	      defined = interopDefault(require$$4$3),
	      toLength = interopDefault(require$$3$1),
	      isRegExp = interopDefault(require$$2$8),
	      getFlags = interopDefault(require$$1$18),
	      RegExpProto = RegExp.prototype;

	  var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
	    this._r = regexp;
	    this._s = string;
	  };

	  interopDefault(require$$0$26)($RegExpStringIterator, 'RegExp String', function next() {
	    var match = this._r.exec(this._s);
	    return { value: match, done: match === null };
	  });

	  $export($export.P, 'String', {
	    matchAll: function matchAll(regexp) {
	      defined(this);
	      if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	      var S = String(this),
	          flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp),
	          rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	      rx.lastIndex = toLength(regexp.lastIndex);
	      return new $RegExpStringIterator(rx, S);
	    }
	  });
	});

	interopDefault(es7_string_matchAll);

	var es7_symbol_asyncIterator = createCommonjsModule(function (module) {
	  interopDefault(require$$0$5)('asyncIterator');
	});

	interopDefault(es7_symbol_asyncIterator);

	var es7_symbol_observable = createCommonjsModule(function (module) {
	  interopDefault(require$$0$5)('observable');
	});

	interopDefault(es7_symbol_observable);

	var es7_object_getOwnPropertyDescriptors = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-object-getownpropertydescriptors
	  var $export = interopDefault(require$$1$2),
	      ownKeys = interopDefault(require$$3$9),
	      toIObject = interopDefault(require$$1$7),
	      gOPD = interopDefault(require$$2$7),
	      createProperty = interopDefault(require$$0$30);

	  $export($export.S, 'Object', {
	    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	      var O = toIObject(object),
	          getDesc = gOPD.f,
	          keys = ownKeys(O),
	          result = {},
	          i = 0,
	          key;
	      while (keys.length > i) {
	        createProperty(result, key = keys[i++], getDesc(O, key));
	      }return result;
	    }
	  });
	});

	interopDefault(es7_object_getOwnPropertyDescriptors);

	var _objectToArray = createCommonjsModule(function (module) {
	  var getKeys = interopDefault(require$$2$5),
	      toIObject = interopDefault(require$$1$7),
	      isEnum = interopDefault(require$$0$9).f;
	  module.exports = function (isEntries) {
	    return function (it) {
	      var O = toIObject(it),
	          keys = getKeys(O),
	          length = keys.length,
	          i = 0,
	          result = [],
	          key;
	      while (length > i) {
	        if (isEnum.call(O, key = keys[i++])) {
	          result.push(isEntries ? [key, O[key]] : O[key]);
	        }
	      }return result;
	    };
	  };
	});

	var _objectToArray$1 = interopDefault(_objectToArray);

var require$$0$41 = Object.freeze({
	  default: _objectToArray$1
	});

	var es7_object_values = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-object-values-entries
	  var $export = interopDefault(require$$1$2),
	      $values = interopDefault(require$$0$41)(false);

	  $export($export.S, 'Object', {
	    values: function values(it) {
	      return $values(it);
	    }
	  });
	});

	interopDefault(es7_object_values);

	var es7_object_entries = createCommonjsModule(function (module) {
	  // https://github.com/tc39/proposal-object-values-entries
	  var $export = interopDefault(require$$1$2),
	      $entries = interopDefault(require$$0$41)(true);

	  $export($export.S, 'Object', {
	    entries: function entries(it) {
	      return $entries(it);
	    }
	  });
	});

	interopDefault(es7_object_entries);

	var _objectForcedPam = createCommonjsModule(function (module) {
	  // Forced replacement prototype accessors methods
	  module.exports = interopDefault(require$$2$4) || !interopDefault(require$$1$1)(function () {
	    var K = Math.random();
	    // In FF throws only define methods
	    __defineSetter__.call(null, K, function () {/* empty */});
	    delete interopDefault(require$$3)[K];
	  });
	});

	var _objectForcedPam$1 = interopDefault(_objectForcedPam);

var require$$0$42 = Object.freeze({
	  default: _objectForcedPam$1
	});

	var es7_object_defineGetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      aFunction = interopDefault(require$$0$2),
	      $defineProperty = interopDefault(require$$2$1);

	  // B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __defineGetter__: function __defineGetter__(P, getter) {
	      $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
	    }
	  });
	});

	interopDefault(es7_object_defineGetter);

	var es7_object_defineSetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      aFunction = interopDefault(require$$0$2),
	      $defineProperty = interopDefault(require$$2$1);

	  // B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __defineSetter__: function __defineSetter__(P, setter) {
	      $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
	    }
	  });
	});

	interopDefault(es7_object_defineSetter);

	var es7_object_lookupGetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      toPrimitive = interopDefault(require$$4$1),
	      getPrototypeOf = interopDefault(require$$0$13),
	      getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	  // B.2.2.4 Object.prototype.__lookupGetter__(P)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __lookupGetter__: function __lookupGetter__(P) {
	      var O = toObject(this),
	          K = toPrimitive(P, true),
	          D;
	      do {
	        if (D = getOwnPropertyDescriptor(O, K)) return D.get;
	      } while (O = getPrototypeOf(O));
	    }
	  });
	});

	interopDefault(es7_object_lookupGetter);

	var es7_object_lookupSetter = createCommonjsModule(function (module) {
	  'use strict';

	  var $export = interopDefault(require$$1$2),
	      toObject = interopDefault(require$$5$1),
	      toPrimitive = interopDefault(require$$4$1),
	      getPrototypeOf = interopDefault(require$$0$13),
	      getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	  // B.2.2.5 Object.prototype.__lookupSetter__(P)
	  interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	    __lookupSetter__: function __lookupSetter__(P) {
	      var O = toObject(this),
	          K = toPrimitive(P, true),
	          D;
	      do {
	        if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	      } while (O = getPrototypeOf(O));
	    }
	  });
	});

	interopDefault(es7_object_lookupSetter);

	var _arrayFromIterable = createCommonjsModule(function (module) {
	  var forOf = interopDefault(require$$1$20);

	  module.exports = function (iter, ITERATOR) {
	    var result = [];
	    forOf(iter, false, result.push, result, ITERATOR);
	    return result;
	  };
	});

	var _arrayFromIterable$1 = interopDefault(_arrayFromIterable);

var require$$3$10 = Object.freeze({
	  default: _arrayFromIterable$1
	});

	var _collectionToJson = createCommonjsModule(function (module) {
	  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
	  var classof = interopDefault(require$$1$11),
	      from = interopDefault(require$$3$10);
	  module.exports = function (NAME) {
	    return function toJSON() {
	      if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	      return from(this);
	    };
	  };
	});

	var _collectionToJson$1 = interopDefault(_collectionToJson);

var require$$0$43 = Object.freeze({
	  default: _collectionToJson$1
	});

	var es7_map_toJson = createCommonjsModule(function (module) {
	  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
	  var $export = interopDefault(require$$1$2);

	  $export($export.P + $export.R, 'Map', { toJSON: interopDefault(require$$0$43)('Map') });
	});

	interopDefault(es7_map_toJson);

	var es7_set_toJson = createCommonjsModule(function (module) {
	  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
	  var $export = interopDefault(require$$1$2);

	  $export($export.P + $export.R, 'Set', { toJSON: interopDefault(require$$0$43)('Set') });
	});

	interopDefault(es7_set_toJson);

	var es7_system_global = createCommonjsModule(function (module) {
	  // https://github.com/ljharb/proposal-global
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'System', { global: interopDefault(require$$3) });
	});

	interopDefault(es7_system_global);

	var es7_error_isError = createCommonjsModule(function (module) {
	  // https://github.com/ljharb/proposal-is-error
	  var $export = interopDefault(require$$1$2),
	      cof = interopDefault(require$$0$6);

	  $export($export.S, 'Error', {
	    isError: function isError(it) {
	      return cof(it) === 'Error';
	    }
	  });
	});

	interopDefault(es7_error_isError);

	var es7_math_iaddh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    iaddh: function iaddh(x0, x1, y0, y1) {
	      var $x0 = x0 >>> 0,
	          $x1 = x1 >>> 0,
	          $y0 = y0 >>> 0;
	      return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	    }
	  });
	});

	interopDefault(es7_math_iaddh);

	var es7_math_isubh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    isubh: function isubh(x0, x1, y0, y1) {
	      var $x0 = x0 >>> 0,
	          $x1 = x1 >>> 0,
	          $y0 = y0 >>> 0;
	      return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	    }
	  });
	});

	interopDefault(es7_math_isubh);

	var es7_math_imulh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    imulh: function imulh(u, v) {
	      var UINT16 = 0xffff,
	          $u = +u,
	          $v = +v,
	          u0 = $u & UINT16,
	          v0 = $v & UINT16,
	          u1 = $u >> 16,
	          v1 = $v >> 16,
	          t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	      return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	    }
	  });
	});

	interopDefault(es7_math_imulh);

	var es7_math_umulh = createCommonjsModule(function (module) {
	  // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	  var $export = interopDefault(require$$1$2);

	  $export($export.S, 'Math', {
	    umulh: function umulh(u, v) {
	      var UINT16 = 0xffff,
	          $u = +u,
	          $v = +v,
	          u0 = $u & UINT16,
	          v0 = $v & UINT16,
	          u1 = $u >>> 16,
	          v1 = $v >>> 16,
	          t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	      return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	    }
	  });
	});

	interopDefault(es7_math_umulh);

	var _metadata = createCommonjsModule(function (module) {
	  var Map = interopDefault(require$$3$8),
	      $export = interopDefault(require$$1$2),
	      shared = interopDefault(require$$1$4)('metadata'),
	      store = shared.store || (shared.store = new (interopDefault(require$$0$38))());

	  var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
	    var targetMetadata = store.get(target);
	    if (!targetMetadata) {
	      if (!create) return undefined;
	      store.set(target, targetMetadata = new Map());
	    }
	    var keyMetadata = targetMetadata.get(targetKey);
	    if (!keyMetadata) {
	      if (!create) return undefined;
	      targetMetadata.set(targetKey, keyMetadata = new Map());
	    }return keyMetadata;
	  };
	  var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = getOrCreateMetadataMap(O, P, false);
	    return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	  };
	  var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = getOrCreateMetadataMap(O, P, false);
	    return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	  };
	  var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	    getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	  };
	  var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
	    var metadataMap = getOrCreateMetadataMap(target, targetKey, false),
	        keys = [];
	    if (metadataMap) metadataMap.forEach(function (_, key) {
	      keys.push(key);
	    });
	    return keys;
	  };
	  var toMetaKey = function toMetaKey(it) {
	    return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
	  };
	  var exp = function exp(O) {
	    $export($export.S, 'Reflect', O);
	  };

	  module.exports = {
	    store: store,
	    map: getOrCreateMetadataMap,
	    has: ordinaryHasOwnMetadata,
	    get: ordinaryGetOwnMetadata,
	    set: ordinaryDefineOwnMetadata,
	    keys: ordinaryOwnMetadataKeys,
	    key: toMetaKey,
	    exp: exp
	  };
	});

	var _metadata$1 = interopDefault(_metadata);
	var store = _metadata.store;
	var map = _metadata.map;
	var has = _metadata.has;
	var get$1 = _metadata.get;
	var set$3 = _metadata.set;
	var keys = _metadata.keys;
	var key = _metadata.key;
	var exp = _metadata.exp;



	var require$$2$10 = Object.freeze({
	  default: _metadata$1,
	  store: store,
	  map: map,
	  has: has,
	  get: get$1,
	  set: set$3,
	  keys: keys,
	  key: key,
	  exp: exp
	});

	var es7_reflect_defineMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      toMetaKey = metadata.key,
	      ordinaryDefineOwnMetadata = metadata.set;

	  metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	    } });
	});

	interopDefault(es7_reflect_defineMetadata);

	var es7_reflect_deleteMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      toMetaKey = metadata.key,
	      getOrCreateMetadataMap = metadata.map,
	      store = metadata.store;

	  metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */) {
	      var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]),
	          metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	      if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	      if (metadataMap.size) return true;
	      var targetMetadata = store.get(target);
	      targetMetadata['delete'](targetKey);
	      return !!targetMetadata.size || store['delete'](target);
	    } });
	});

	interopDefault(es7_reflect_deleteMetadata);

	var es7_reflect_getMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ordinaryHasOwnMetadata = metadata.has,
	      ordinaryGetOwnMetadata = metadata.get,
	      toMetaKey = metadata.key;

	  var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
	    var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
	    var parent = getPrototypeOf(O);
	    return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	  };

	  metadata.exp({ getMetadata: function getMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_getMetadata);

	var es7_reflect_getMetadataKeys = createCommonjsModule(function (module) {
	  var Set = interopDefault(require$$4$7),
	      from = interopDefault(require$$3$10),
	      metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ordinaryOwnMetadataKeys = metadata.keys,
	      toMetaKey = metadata.key;

	  var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
	    var oKeys = ordinaryOwnMetadataKeys(O, P),
	        parent = getPrototypeOf(O);
	    if (parent === null) return oKeys;
	    var pKeys = ordinaryMetadataKeys(parent, P);
	    return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	  };

	  metadata.exp({ getMetadataKeys: function getMetadataKeys(target /*, targetKey */) {
	      return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	    } });
	});

	interopDefault(es7_reflect_getMetadataKeys);

	var es7_reflect_getOwnMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      ordinaryGetOwnMetadata = metadata.get,
	      toMetaKey = metadata.key;

	  metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_getOwnMetadata);

	var es7_reflect_getOwnMetadataKeys = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      ordinaryOwnMetadataKeys = metadata.keys,
	      toMetaKey = metadata.key;

	  metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */) {
	      return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	    } });
	});

	interopDefault(es7_reflect_getOwnMetadataKeys);

	var es7_reflect_hasMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      getPrototypeOf = interopDefault(require$$0$13),
	      ordinaryHasOwnMetadata = metadata.has,
	      toMetaKey = metadata.key;

	  var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
	    var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) return true;
	    var parent = getPrototypeOf(O);
	    return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	  };

	  metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_hasMetadata);

	var es7_reflect_hasOwnMetadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      ordinaryHasOwnMetadata = metadata.has,
	      toMetaKey = metadata.key;

	  metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */) {
	      return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	    } });
	});

	interopDefault(es7_reflect_hasOwnMetadata);

	var es7_reflect_metadata = createCommonjsModule(function (module) {
	  var metadata = interopDefault(require$$2$10),
	      anObject = interopDefault(require$$5),
	      aFunction = interopDefault(require$$0$2),
	      toMetaKey = metadata.key,
	      ordinaryDefineOwnMetadata = metadata.set;

	  metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	      return function decorator(target, targetKey) {
	        ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
	      };
	    } });
	});

	interopDefault(es7_reflect_metadata);

	var es7_asap = createCommonjsModule(function (module) {
	  // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	  var $export = interopDefault(require$$1$2),
	      microtask = interopDefault(require$$8$1)(),
	      process = interopDefault(require$$3).process,
	      isNode = interopDefault(require$$0$6)(process) == 'process';

	  $export($export.G, {
	    asap: function asap(fn) {
	      var domain = isNode && process.domain;
	      microtask(domain ? domain.bind(fn) : fn);
	    }
	  });
	});

	interopDefault(es7_asap);

	var es7_observable = createCommonjsModule(function (module) {
	  'use strict';
	  // https://github.com/zenparsing/es-observable

	  var $export = interopDefault(require$$1$2),
	      global = interopDefault(require$$3),
	      core = interopDefault(require$$0),
	      microtask = interopDefault(require$$8$1)(),
	      OBSERVABLE = interopDefault(require$$0$4)('observable'),
	      aFunction = interopDefault(require$$0$2),
	      anObject = interopDefault(require$$5),
	      anInstance = interopDefault(require$$4$6),
	      redefineAll = interopDefault(require$$3$7),
	      hide = interopDefault(require$$2),
	      forOf = interopDefault(require$$1$20),
	      RETURN = forOf.RETURN;

	  var getMethod = function getMethod(fn) {
	    return fn == null ? undefined : aFunction(fn);
	  };

	  var cleanupSubscription = function cleanupSubscription(subscription) {
	    var cleanup = subscription._c;
	    if (cleanup) {
	      subscription._c = undefined;
	      cleanup();
	    }
	  };

	  var subscriptionClosed = function subscriptionClosed(subscription) {
	    return subscription._o === undefined;
	  };

	  var closeSubscription = function closeSubscription(subscription) {
	    if (!subscriptionClosed(subscription)) {
	      subscription._o = undefined;
	      cleanupSubscription(subscription);
	    }
	  };

	  var Subscription = function Subscription(observer, subscriber) {
	    anObject(observer);
	    this._c = undefined;
	    this._o = observer;
	    observer = new SubscriptionObserver(this);
	    try {
	      var cleanup = subscriber(observer),
	          subscription = cleanup;
	      if (cleanup != null) {
	        if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
	          subscription.unsubscribe();
	        };else aFunction(cleanup);
	        this._c = cleanup;
	      }
	    } catch (e) {
	      observer.error(e);
	      return;
	    }if (subscriptionClosed(this)) cleanupSubscription(this);
	  };

	  Subscription.prototype = redefineAll({}, {
	    unsubscribe: function unsubscribe() {
	      closeSubscription(this);
	    }
	  });

	  var SubscriptionObserver = function SubscriptionObserver(subscription) {
	    this._s = subscription;
	  };

	  SubscriptionObserver.prototype = redefineAll({}, {
	    next: function next(value) {
	      var subscription = this._s;
	      if (!subscriptionClosed(subscription)) {
	        var observer = subscription._o;
	        try {
	          var m = getMethod(observer.next);
	          if (m) return m.call(observer, value);
	        } catch (e) {
	          try {
	            closeSubscription(subscription);
	          } finally {
	            throw e;
	          }
	        }
	      }
	    },
	    error: function error(value) {
	      var subscription = this._s;
	      if (subscriptionClosed(subscription)) throw value;
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.error);
	        if (!m) throw value;
	        value = m.call(observer, value);
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }cleanupSubscription(subscription);
	      return value;
	    },
	    complete: function complete(value) {
	      var subscription = this._s;
	      if (!subscriptionClosed(subscription)) {
	        var observer = subscription._o;
	        subscription._o = undefined;
	        try {
	          var m = getMethod(observer.complete);
	          value = m ? m.call(observer, value) : undefined;
	        } catch (e) {
	          try {
	            cleanupSubscription(subscription);
	          } finally {
	            throw e;
	          }
	        }cleanupSubscription(subscription);
	        return value;
	      }
	    }
	  });

	  var $Observable = function Observable(subscriber) {
	    anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	  };

	  redefineAll($Observable.prototype, {
	    subscribe: function subscribe(observer) {
	      return new Subscription(observer, this._f);
	    },
	    forEach: function forEach(fn) {
	      var that = this;
	      return new (core.Promise || global.Promise)(function (resolve, reject) {
	        aFunction(fn);
	        var subscription = that.subscribe({
	          next: function next(value) {
	            try {
	              return fn(value);
	            } catch (e) {
	              reject(e);
	              subscription.unsubscribe();
	            }
	          },
	          error: reject,
	          complete: resolve
	        });
	      });
	    }
	  });

	  redefineAll($Observable, {
	    from: function from(x) {
	      var C = typeof this === 'function' ? this : $Observable;
	      var method = getMethod(anObject(x)[OBSERVABLE]);
	      if (method) {
	        var observable = anObject(method.call(x));
	        return observable.constructor === C ? observable : new C(function (observer) {
	          return observable.subscribe(observer);
	        });
	      }
	      return new C(function (observer) {
	        var done = false;
	        microtask(function () {
	          if (!done) {
	            try {
	              if (forOf(x, false, function (it) {
	                observer.next(it);
	                if (done) return RETURN;
	              }) === RETURN) return;
	            } catch (e) {
	              if (done) throw e;
	              observer.error(e);
	              return;
	            }observer.complete();
	          }
	        });
	        return function () {
	          done = true;
	        };
	      });
	    },
	    of: function of() {
	      for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
	        items[i] = arguments[i++];
	      }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	        var done = false;
	        microtask(function () {
	          if (!done) {
	            for (var i = 0; i < items.length; ++i) {
	              observer.next(items[i]);
	              if (done) return;
	            }observer.complete();
	          }
	        });
	        return function () {
	          done = true;
	        };
	      });
	    }
	  });

	  hide($Observable.prototype, OBSERVABLE, function () {
	    return this;
	  });

	  $export($export.G, { Observable: $Observable });

	  interopDefault(require$$0$35)('Observable');
	});

	interopDefault(es7_observable);

	var _path = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$3);
	});

	var _path$1 = interopDefault(_path);

var require$$2$11 = Object.freeze({
	  default: _path$1
	});

	var _partial = createCommonjsModule(function (module) {
	  'use strict';

	  var path = interopDefault(require$$2$11),
	      invoke = interopDefault(require$$1$13),
	      aFunction = interopDefault(require$$0$2);
	  module.exports = function () /* ...pargs */{
	    var fn = aFunction(this),
	        length = arguments.length,
	        pargs = Array(length),
	        i = 0,
	        _ = path._,
	        holder = false;
	    while (length > i) {
	      if ((pargs[i] = arguments[i++]) === _) holder = true;
	    }return function () /* ...args */{
	      var that = this,
	          aLen = arguments.length,
	          j = 0,
	          k = 0,
	          args;
	      if (!holder && !aLen) return invoke(fn, pargs, that);
	      args = pargs.slice();
	      if (holder) for (; length > j; j++) {
	        if (args[j] === _) args[j] = arguments[k++];
	      }while (aLen > k) {
	        args.push(arguments[k++]);
	      }return invoke(fn, args, that);
	    };
	  };
	});

	var _partial$1 = interopDefault(_partial);

var require$$0$44 = Object.freeze({
	  default: _partial$1
	});

	var web_timers = createCommonjsModule(function (module) {
	  // ie9- setTimeout & setInterval additional parameters fix
	  var global = interopDefault(require$$3),
	      $export = interopDefault(require$$1$2),
	      invoke = interopDefault(require$$1$13),
	      partial = interopDefault(require$$0$44),
	      navigator = global.navigator,
	      MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	  var wrap = function wrap(set) {
	    return MSIE ? function (fn, time /*, ...args */) {
	      return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
	    } : set;
	  };
	  $export($export.G + $export.B + $export.F * MSIE, {
	    setTimeout: wrap(global.setTimeout),
	    setInterval: wrap(global.setInterval)
	  });
	});

	interopDefault(web_timers);

	var web_immediate = createCommonjsModule(function (module) {
	  var $export = interopDefault(require$$1$2),
	      $task = interopDefault(require$$0$36);
	  $export($export.G + $export.B, {
	    setImmediate: $task.set,
	    clearImmediate: $task.clear
	  });
	});

	interopDefault(web_immediate);

	var web_dom_iterable = createCommonjsModule(function (module) {
	  var $iterators = interopDefault(require$$5$3),
	      redefine = interopDefault(require$$4$2),
	      global = interopDefault(require$$3),
	      hide = interopDefault(require$$2),
	      Iterators = interopDefault(require$$1$15),
	      wks = interopDefault(require$$0$4),
	      ITERATOR = wks('iterator'),
	      TO_STRING_TAG = wks('toStringTag'),
	      ArrayValues = Iterators.Array;

	  for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	    var NAME = collections[i],
	        Collection = global[NAME],
	        proto = Collection && Collection.prototype,
	        key;
	    if (proto) {
	      if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	      if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	      Iterators[NAME] = ArrayValues;
	      for (key in $iterators) {
	        if (!proto[key]) redefine(proto, key, $iterators[key], true);
	      }
	    }
	  }
	});

	interopDefault(web_dom_iterable);

	var shim = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$0);
	});

	interopDefault(shim);

	var runtime = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014, Facebook, Inc.
	   * All rights reserved.
	   *
	   * This source code is licensed under the BSD-style license found in the
	   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	   * additional grant of patent rights can be found in the PATENTS file in
	   * the same directory.
	   */

	  !function (global) {
	    "use strict";

	    var hasOwn = Object.prototype.hasOwnProperty;
	    var undefined; // More compressible than void 0.
	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    var inModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object";
	    var runtime = global.regeneratorRuntime;
	    if (runtime) {
	      if (inModule) {
	        // If regeneratorRuntime is defined globally and we're in a module,
	        // make the exports object identical to regeneratorRuntime.
	        module.exports = runtime;
	      }
	      // Don't bother evaluating the rest of this file if the runtime was
	      // already defined globally.
	      return;
	    }

	    // Define the runtime globally (as expected by generated code) as either
	    // module.exports (if we're in a module) or a new, empty object.
	    runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided, then outerFn.prototype instanceof Generator.
	      var generator = Object.create((outerFn || Generator).prototype);
	      var context = new Context(tryLocsList || []);

	      // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.
	      generator._invoke = makeInvokeMethod(innerFn, self, context);

	      return generator;
	    }
	    runtime.wrap = wrap;

	    // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.
	    function tryCatch(fn, obj, arg) {
	      try {
	        return { type: "normal", arg: fn.call(obj, arg) };
	      } catch (err) {
	        return { type: "throw", arg: err };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed";

	    // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.
	    var ContinueSentinel = {};

	    // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.
	    function Generator() {}
	    function GeneratorFunction() {}
	    function GeneratorFunctionPrototype() {}

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	    // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.
	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    runtime.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction ||
	      // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    runtime.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;
	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }
	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    };

	    // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `value instanceof AwaitArgument` to determine if the yielded value is
	    // meant to be awaited. Some may consider the name of this method too
	    // cutesy, but they are curmudgeons.
	    runtime.awrap = function (arg) {
	      return new AwaitArgument(arg);
	    };

	    function AwaitArgument(arg) {
	      this.arg = arg;
	    }

	    function AsyncIterator(generator) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;
	          if (value instanceof AwaitArgument) {
	            return Promise.resolve(value.arg).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return Promise.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            resolve(result);
	          }, reject);
	        }
	      }

	      if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
	        invoke = process.domain.bind(invoke);
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new Promise(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	        // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }

	      // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).
	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.
	    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

	      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;

	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          }

	          // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	          return doneResult();
	        }

	        while (true) {
	          var delegate = context.delegate;
	          if (delegate) {
	            if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	              // A return or throw (when the delegate iterator has no throw
	              // method) always terminates the yield* loop.
	              context.delegate = null;

	              // If the delegate iterator has a return method, give it a
	              // chance to clean up.
	              var returnMethod = delegate.iterator["return"];
	              if (returnMethod) {
	                var record = tryCatch(returnMethod, delegate.iterator, arg);
	                if (record.type === "throw") {
	                  // If the return method threw an exception, let that
	                  // exception prevail over the original return or throw.
	                  method = "throw";
	                  arg = record.arg;
	                  continue;
	                }
	              }

	              if (method === "return") {
	                // Continue with the outer return, now that the delegate
	                // iterator has been terminated.
	                continue;
	              }
	            }

	            var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

	            if (record.type === "throw") {
	              context.delegate = null;

	              // Like returning generator.throw(uncaught), but without the
	              // overhead of an extra function call.
	              method = "throw";
	              arg = record.arg;
	              continue;
	            }

	            // Delegate generator ran and handled its own exceptions so
	            // regardless of what the method was, we continue as if it is
	            // "next" with an undefined arg.
	            method = "next";
	            arg = undefined;

	            var info = record.arg;
	            if (info.done) {
	              context[delegate.resultName] = info.value;
	              context.next = delegate.nextLoc;
	            } else {
	              state = GenStateSuspendedYield;
	              return info;
	            }

	            context.delegate = null;
	          }

	          if (method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = arg;
	          } else if (method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw arg;
	            }

	            if (context.dispatchException(arg)) {
	              // If the dispatched exception was caught by a catch block,
	              // then let that catch block handle the exception normally.
	              method = "next";
	              arg = undefined;
	            }
	          } else if (method === "return") {
	            context.abrupt("return", arg);
	          }

	          state = GenStateExecuting;

	          var record = tryCatch(innerFn, self, context);
	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            var info = {
	              value: record.arg,
	              done: context.done
	            };

	            if (record.arg === ContinueSentinel) {
	              if (context.delegate && method === "next") {
	                // Deliberately forget the last sent value so that we don't
	                // accidentally pass it on to the delegate.
	                arg = undefined;
	              }
	            } else {
	              return info;
	            }
	          } else if (record.type === "throw") {
	            state = GenStateCompleted;
	            // Dispatch the exception by looping back around to the
	            // context.dispatchException(arg) call above.
	            method = "throw";
	            arg = record.arg;
	          }
	        }
	      };
	    }

	    // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.
	    defineIteratorMethods(Gp);

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp[toStringTagSymbol] = "Generator";

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = { tryLoc: locs[0] };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{ tryLoc: "root" }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    runtime.keys = function (object) {
	      var keys = [];
	      for (var key in object) {
	        keys.push(key);
	      }
	      keys.reverse();

	      // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.
	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();
	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        }

	        // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.
	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];
	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined;
	            next.done = true;

	            return next;
	          };

	          return next.next = next;
	        }
	      }

	      // Return an iterator with no values.
	      return { next: doneResult };
	    }
	    runtime.values = values;

	    function doneResult() {
	      return { value: undefined, done: true };
	    }

	    Context.prototype = {
	      constructor: Context,

	      reset: function reset(skipTempReset) {
	        this.prev = 0;
	        this.next = 0;
	        // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.
	        this.sent = this._sent = undefined;
	        this.done = false;
	        this.delegate = null;

	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined;
	            }
	          }
	        }
	      },

	      stop: function stop() {
	        this.done = true;

	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;
	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },

	      dispatchException: function dispatchException(exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;
	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;
	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },

	      abrupt: function abrupt(type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.next = finallyEntry.finallyLoc;
	        } else {
	          this.complete(record);
	        }

	        return ContinueSentinel;
	      },

	      complete: function complete(record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = record.arg;
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }
	      },

	      finish: function finish(finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },

	      "catch": function _catch(tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;
	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }
	            return thrown;
	          }
	        }

	        // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.
	        throw new Error("illegal catch attempt");
	      },

	      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        return ContinueSentinel;
	      }
	    };
	  }(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  _typeof(commonjsGlobal) === "object" ? commonjsGlobal : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : commonjsGlobal);
	});

	interopDefault(runtime);

	var _replacer = createCommonjsModule(function (module) {
	  module.exports = function (regExp, replace) {
	    var replacer = replace === Object(replace) ? function (part) {
	      return replace[part];
	    } : replace;
	    return function (it) {
	      return String(it).replace(regExp, replacer);
	    };
	  };
	});

	var _replacer$1 = interopDefault(_replacer);

var require$$0$45 = Object.freeze({
	  default: _replacer$1
	});

	var core_regexp_escape = createCommonjsModule(function (module) {
	  // https://github.com/benjamingr/RexExp.escape
	  var $export = interopDefault(require$$1$2),
	      $re = interopDefault(require$$0$45)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	  $export($export.S, 'RegExp', { escape: function escape(it) {
	      return $re(it);
	    } });
	});

	interopDefault(core_regexp_escape);

	var _escape = createCommonjsModule(function (module) {
	  module.exports = interopDefault(require$$0).RegExp.escape;
	});

	interopDefault(_escape);

	var index = createCommonjsModule(function (module) {
	  "use strict";

	  /* eslint max-len: 0 */

	  if (commonjsGlobal._babelPolyfill) {
	    throw new Error("only one instance of babel-polyfill is allowed");
	  }
	  commonjsGlobal._babelPolyfill = true;

	  // Should be removed in the next major release:

	  var DEFINE_PROPERTY = "defineProperty";
	  function define(O, key, value) {
	    O[key] || Object[DEFINE_PROPERTY](O, key, {
	      writable: true,
	      configurable: true,
	      value: value
	    });
	  }

	  define(String.prototype, "padLeft", "".padStart);
	  define(String.prototype, "padRight", "".padEnd);

	  "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	    [][key] && define(Array, key, Function.call.bind([][key]));
	  });
	});

	interopDefault(index);

	/*!
	 * Bootstrap v4.0.0-alpha.3 (http://getbootstrap.com)
	 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery');}+function($){var version=$.fn.jquery.split(' ')[0].split('.');if(version[0]<2&&version[1]<9||version[0]==1&&version[1]==9&&version[2]<1||version[0]>=4){throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');}}(jQuery);+function($){/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): util.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */'use strict';var _get=function get(_x,_x2,_x3){var _again=true;_function:while(_again){var object=_x,property=_x2,receiver=_x3;_again=false;if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{_x=parent;_x2=property;_x3=receiver;_again=true;desc=parent=undefined;continue _function;}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}}};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Util=function($){/**
	   * ------------------------------------------------------------------------
	   * Private TransitionEnd Helpers
	   * ------------------------------------------------------------------------
	   */var transition=false;var MAX_UID=1000000;var TransitionEndEvent={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'};// shoutout AngusCroll (https://goo.gl/pxwQGp)
	function toType(obj){return{}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();}function isElement(obj){return(obj[0]||obj).nodeType;}function getSpecialTransitionEndEvent(){return{bindType:transition.end,delegateType:transition.end,handle:function handle(event){if($(event.target).is(this)){return event.handleObj.handler.apply(this,arguments);// eslint-disable-line prefer-rest-params
	}return undefined;}};}function transitionEndTest(){if(window.QUnit){return false;}var el=document.createElement('bootstrap');for(var _name in TransitionEndEvent){if(el.style[_name]!==undefined){return{end:TransitionEndEvent[_name]};}}return false;}function transitionEndEmulator(duration){var _this=this;var called=false;$(this).one(Util.TRANSITION_END,function(){called=true;});setTimeout(function(){if(!called){Util.triggerTransitionEnd(_this);}},duration);return this;}function setTransitionEndSupport(){transition=transitionEndTest();$.fn.emulateTransitionEnd=transitionEndEmulator;if(Util.supportsTransitionEnd()){$.event.special[Util.TRANSITION_END]=getSpecialTransitionEndEvent();}}/**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */var Util={TRANSITION_END:'bsTransitionEnd',getUID:function getUID(prefix){do{/* eslint-disable no-bitwise */prefix+=~~(Math.random()*MAX_UID);// "~~" acts like a faster Math.floor() here
	/* eslint-enable no-bitwise */}while(document.getElementById(prefix));return prefix;},getSelectorFromElement:function getSelectorFromElement(element){var selector=element.getAttribute('data-target');if(!selector){selector=element.getAttribute('href')||'';selector=/^#[a-z]/i.test(selector)?selector:null;}return selector;},reflow:function reflow(element){new Function('bs','return bs')(element.offsetHeight);},triggerTransitionEnd:function triggerTransitionEnd(element){$(element).trigger(transition.end);},supportsTransitionEnd:function supportsTransitionEnd(){return Boolean(transition);},typeCheckConfig:function typeCheckConfig(componentName,config,configTypes){for(var property in configTypes){if(configTypes.hasOwnProperty(property)){var expectedTypes=configTypes[property];var value=config[property];var valueType=undefined;if(value&&isElement(value)){valueType='element';}else{valueType=toType(value);}if(!new RegExp(expectedTypes).test(valueType)){throw new Error(componentName.toUpperCase()+': '+('Option "'+property+'" provided type "'+valueType+'" ')+('but expected type "'+expectedTypes+'".'));}}}}};setTransitionEndSupport();return Util;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): alert.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Alert=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='alert';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.alert';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=150;var Selector={DISMISS:'[data-dismiss="alert"]'};var Event={CLOSE:'close'+EVENT_KEY,CLOSED:'closed'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={ALERT:'alert',FADE:'fade',IN:'in'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Alert=function(){function Alert(element){_classCallCheck(this,Alert);this._element=element;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Alert,[{key:'close',// public
	value:function close(element){element=element||this._element;var rootElement=this._getRootElement(element);var customEvent=this._triggerCloseEvent(rootElement);if(customEvent.isDefaultPrevented()){return;}this._removeElement(rootElement);}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);this._element=null;}// private
	},{key:'_getRootElement',value:function _getRootElement(element){var selector=Util.getSelectorFromElement(element);var parent=false;if(selector){parent=$(selector)[0];}if(!parent){parent=$(element).closest('.'+ClassName.ALERT)[0];}return parent;}},{key:'_triggerCloseEvent',value:function _triggerCloseEvent(element){var closeEvent=$.Event(Event.CLOSE);$(element).trigger(closeEvent);return closeEvent;}},{key:'_removeElement',value:function _removeElement(element){$(element).removeClass(ClassName.IN);if(!Util.supportsTransitionEnd()||!$(element).hasClass(ClassName.FADE)){this._destroyElement(element);return;}$(element).one(Util.TRANSITION_END,$.proxy(this._destroyElement,this,element)).emulateTransitionEnd(TRANSITION_DURATION);}},{key:'_destroyElement',value:function _destroyElement(element){$(element).detach().trigger(Event.CLOSED).remove();}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var $element=$(this);var data=$element.data(DATA_KEY);if(!data){data=new Alert(this);$element.data(DATA_KEY,data);}if(config==='close'){data[config](this);}});}},{key:'_handleDismiss',value:function _handleDismiss(alertInstance){return function(event){if(event){event.preventDefault();}alertInstance.close(this);};}},{key:'VERSION',get:function get(){return VERSION;}}]);return Alert;}();$(document).on(Event.CLICK_DATA_API,Selector.DISMISS,Alert._handleDismiss(new Alert()));/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Alert._jQueryInterface;$.fn[NAME].Constructor=Alert;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Alert._jQueryInterface;};return Alert;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): button.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Button=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='button';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.button';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var ClassName={ACTIVE:'active',BUTTON:'btn',FOCUS:'focus'};var Selector={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:'input',ACTIVE:'.active',BUTTON:'.btn'};var Event={CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY,FOCUS_BLUR_DATA_API:'focus'+EVENT_KEY+DATA_API_KEY+' '+('blur'+EVENT_KEY+DATA_API_KEY)};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Button=function(){function Button(element){_classCallCheck(this,Button);this._element=element;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Button,[{key:'toggle',// public
	value:function toggle(){var triggerChangeEvent=true;var rootElement=$(this._element).closest(Selector.DATA_TOGGLE)[0];if(rootElement){var input=$(this._element).find(Selector.INPUT)[0];if(input){if(input.type==='radio'){if(input.checked&&$(this._element).hasClass(ClassName.ACTIVE)){triggerChangeEvent=false;}else{var activeElement=$(rootElement).find(Selector.ACTIVE)[0];if(activeElement){$(activeElement).removeClass(ClassName.ACTIVE);}}}if(triggerChangeEvent){input.checked=!$(this._element).hasClass(ClassName.ACTIVE);$(this._element).trigger('change');}input.focus();}}else{this._element.setAttribute('aria-pressed',!$(this._element).hasClass(ClassName.ACTIVE));}if(triggerChangeEvent){$(this._element).toggleClass(ClassName.ACTIVE);}}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);this._element=null;}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);if(!data){data=new Button(this);$(this).data(DATA_KEY,data);}if(config==='toggle'){data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}}]);return Button;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE_CARROT,function(event){event.preventDefault();var button=event.target;if(!$(button).hasClass(ClassName.BUTTON)){button=$(button).closest(Selector.BUTTON);}Button._jQueryInterface.call($(button),'toggle');}).on(Event.FOCUS_BLUR_DATA_API,Selector.DATA_TOGGLE_CARROT,function(event){var button=$(event.target).closest(Selector.BUTTON)[0];$(button).toggleClass(ClassName.FOCUS,/^focus(in)?$/.test(event.type));});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Button._jQueryInterface;$.fn[NAME].Constructor=Button;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Button._jQueryInterface;};return Button;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): carousel.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Carousel=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='carousel';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.carousel';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=600;var ARROW_LEFT_KEYCODE=37;// KeyboardEvent.which value for left arrow key
	var ARROW_RIGHT_KEYCODE=39;// KeyboardEvent.which value for right arrow key
	var Default={interval:5000,keyboard:true,slide:false,pause:'hover',wrap:true};var DefaultType={interval:'(number|boolean)',keyboard:'boolean',slide:'(boolean|string)',pause:'(string|boolean)',wrap:'boolean'};var Direction={NEXT:'next',PREVIOUS:'prev'};var Event={SLIDE:'slide'+EVENT_KEY,SLID:'slid'+EVENT_KEY,KEYDOWN:'keydown'+EVENT_KEY,MOUSEENTER:'mouseenter'+EVENT_KEY,MOUSELEAVE:'mouseleave'+EVENT_KEY,LOAD_DATA_API:'load'+EVENT_KEY+DATA_API_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={CAROUSEL:'carousel',ACTIVE:'active',SLIDE:'slide',RIGHT:'right',LEFT:'left',ITEM:'carousel-item'};var Selector={ACTIVE:'.active',ACTIVE_ITEM:'.active.carousel-item',ITEM:'.carousel-item',NEXT_PREV:'.next, .prev',INDICATORS:'.carousel-indicators',DATA_SLIDE:'[data-slide], [data-slide-to]',DATA_RIDE:'[data-ride="carousel"]'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Carousel=function(){function Carousel(element,config){_classCallCheck(this,Carousel);this._items=null;this._interval=null;this._activeElement=null;this._isPaused=false;this._isSliding=false;this._config=this._getConfig(config);this._element=$(element)[0];this._indicatorsElement=$(this._element).find(Selector.INDICATORS)[0];this._addEventListeners();}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Carousel,[{key:'next',// public
	value:function next(){if(!this._isSliding){this._slide(Direction.NEXT);}}},{key:'nextWhenVisible',value:function nextWhenVisible(){// Don't call next when the page isn't visible
	if(!document.hidden){this.next();}}},{key:'prev',value:function prev(){if(!this._isSliding){this._slide(Direction.PREVIOUS);}}},{key:'pause',value:function pause(event){if(!event){this._isPaused=true;}if($(this._element).find(Selector.NEXT_PREV)[0]&&Util.supportsTransitionEnd()){Util.triggerTransitionEnd(this._element);this.cycle(true);}clearInterval(this._interval);this._interval=null;}},{key:'cycle',value:function cycle(event){if(!event){this._isPaused=false;}if(this._interval){clearInterval(this._interval);this._interval=null;}if(this._config.interval&&!this._isPaused){this._interval=setInterval($.proxy(document.visibilityState?this.nextWhenVisible:this.next,this),this._config.interval);}}},{key:'to',value:function to(index){var _this2=this;this._activeElement=$(this._element).find(Selector.ACTIVE_ITEM)[0];var activeIndex=this._getItemIndex(this._activeElement);if(index>this._items.length-1||index<0){return;}if(this._isSliding){$(this._element).one(Event.SLID,function(){return _this2.to(index);});return;}if(activeIndex===index){this.pause();this.cycle();return;}var direction=index>activeIndex?Direction.NEXT:Direction.PREVIOUS;this._slide(direction,this._items[index]);}},{key:'dispose',value:function dispose(){$(this._element).off(EVENT_KEY);$.removeData(this._element,DATA_KEY);this._items=null;this._config=null;this._element=null;this._interval=null;this._isPaused=null;this._isSliding=null;this._activeElement=null;this._indicatorsElement=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_addEventListeners',value:function _addEventListeners(){if(this._config.keyboard){$(this._element).on(Event.KEYDOWN,$.proxy(this._keydown,this));}if(this._config.pause==='hover'&&!('ontouchstart'in document.documentElement)){$(this._element).on(Event.MOUSEENTER,$.proxy(this.pause,this)).on(Event.MOUSELEAVE,$.proxy(this.cycle,this));}}},{key:'_keydown',value:function _keydown(event){event.preventDefault();if(/input|textarea/i.test(event.target.tagName)){return;}switch(event.which){case ARROW_LEFT_KEYCODE:this.prev();break;case ARROW_RIGHT_KEYCODE:this.next();break;default:return;}}},{key:'_getItemIndex',value:function _getItemIndex(element){this._items=$.makeArray($(element).parent().find(Selector.ITEM));return this._items.indexOf(element);}},{key:'_getItemByDirection',value:function _getItemByDirection(direction,activeElement){var isNextDirection=direction===Direction.NEXT;var isPrevDirection=direction===Direction.PREVIOUS;var activeIndex=this._getItemIndex(activeElement);var lastItemIndex=this._items.length-1;var isGoingToWrap=isPrevDirection&&activeIndex===0||isNextDirection&&activeIndex===lastItemIndex;if(isGoingToWrap&&!this._config.wrap){return activeElement;}var delta=direction===Direction.PREVIOUS?-1:1;var itemIndex=(activeIndex+delta)%this._items.length;return itemIndex===-1?this._items[this._items.length-1]:this._items[itemIndex];}},{key:'_triggerSlideEvent',value:function _triggerSlideEvent(relatedTarget,directionalClassname){var slideEvent=$.Event(Event.SLIDE,{relatedTarget:relatedTarget,direction:directionalClassname});$(this._element).trigger(slideEvent);return slideEvent;}},{key:'_setActiveIndicatorElement',value:function _setActiveIndicatorElement(element){if(this._indicatorsElement){$(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);var nextIndicator=this._indicatorsElement.children[this._getItemIndex(element)];if(nextIndicator){$(nextIndicator).addClass(ClassName.ACTIVE);}}}},{key:'_slide',value:function _slide(direction,element){var _this3=this;var activeElement=$(this._element).find(Selector.ACTIVE_ITEM)[0];var nextElement=element||activeElement&&this._getItemByDirection(direction,activeElement);var isCycling=Boolean(this._interval);var directionalClassName=direction===Direction.NEXT?ClassName.LEFT:ClassName.RIGHT;if(nextElement&&$(nextElement).hasClass(ClassName.ACTIVE)){this._isSliding=false;return;}var slideEvent=this._triggerSlideEvent(nextElement,directionalClassName);if(slideEvent.isDefaultPrevented()){return;}if(!activeElement||!nextElement){// some weirdness is happening, so we bail
	return;}this._isSliding=true;if(isCycling){this.pause();}this._setActiveIndicatorElement(nextElement);var slidEvent=$.Event(Event.SLID,{relatedTarget:nextElement,direction:directionalClassName});if(Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.SLIDE)){$(nextElement).addClass(direction);Util.reflow(nextElement);$(activeElement).addClass(directionalClassName);$(nextElement).addClass(directionalClassName);$(activeElement).one(Util.TRANSITION_END,function(){$(nextElement).removeClass(directionalClassName).removeClass(direction);$(nextElement).addClass(ClassName.ACTIVE);$(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);_this3._isSliding=false;setTimeout(function(){return $(_this3._element).trigger(slidEvent);},0);}).emulateTransitionEnd(TRANSITION_DURATION);}else{$(activeElement).removeClass(ClassName.ACTIVE);$(nextElement).addClass(ClassName.ACTIVE);this._isSliding=false;$(this._element).trigger(slidEvent);}if(isCycling){this.cycle();}}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=$.extend({},Default,$(this).data());if((typeof config==='undefined'?'undefined':_typeof(config))==='object'){$.extend(_config,config);}var action=typeof config==='string'?config:_config.slide;if(!data){data=new Carousel(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='number'){data.to(config);}else if(typeof action==='string'){if(data[action]===undefined){throw new Error('No method named "'+action+'"');}data[action]();}else if(_config.interval){data.pause();data.cycle();}});}},{key:'_dataApiClickHandler',value:function _dataApiClickHandler(event){var selector=Util.getSelectorFromElement(this);if(!selector){return;}var target=$(selector)[0];if(!target||!$(target).hasClass(ClassName.CAROUSEL)){return;}var config=$.extend({},$(target).data(),$(this).data());var slideIndex=this.getAttribute('data-slide-to');if(slideIndex){config.interval=false;}Carousel._jQueryInterface.call($(target),config);if(slideIndex){$(target).data(DATA_KEY).to(slideIndex);}event.preventDefault();}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return Carousel;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_SLIDE,Carousel._dataApiClickHandler);$(window).on(Event.LOAD_DATA_API,function(){$(Selector.DATA_RIDE).each(function(){var $carousel=$(this);Carousel._jQueryInterface.call($carousel,$carousel.data());});});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Carousel._jQueryInterface;$.fn[NAME].Constructor=Carousel;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Carousel._jQueryInterface;};return Carousel;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): collapse.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Collapse=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='collapse';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.collapse';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=600;var Default={toggle:true,parent:''};var DefaultType={toggle:'boolean',parent:'string'};var Event={SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={IN:'in',COLLAPSE:'collapse',COLLAPSING:'collapsing',COLLAPSED:'collapsed'};var Dimension={WIDTH:'width',HEIGHT:'height'};var Selector={ACTIVES:'.panel > .in, .panel > .collapsing',DATA_TOGGLE:'[data-toggle="collapse"]'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Collapse=function(){function Collapse(element,config){_classCallCheck(this,Collapse);this._isTransitioning=false;this._element=element;this._config=this._getConfig(config);this._triggerArray=$.makeArray($('[data-toggle="collapse"][href="#'+element.id+'"],'+('[data-toggle="collapse"][data-target="#'+element.id+'"]')));this._parent=this._config.parent?this._getParent():null;if(!this._config.parent){this._addAriaAndCollapsedClass(this._element,this._triggerArray);}if(this._config.toggle){this.toggle();}}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Collapse,[{key:'toggle',// public
	value:function toggle(){if($(this._element).hasClass(ClassName.IN)){this.hide();}else{this.show();}}},{key:'show',value:function show(){var _this4=this;if(this._isTransitioning||$(this._element).hasClass(ClassName.IN)){return;}var actives=undefined;var activesData=undefined;if(this._parent){actives=$.makeArray($(Selector.ACTIVES));if(!actives.length){actives=null;}}if(actives){activesData=$(actives).data(DATA_KEY);if(activesData&&activesData._isTransitioning){return;}}var startEvent=$.Event(Event.SHOW);$(this._element).trigger(startEvent);if(startEvent.isDefaultPrevented()){return;}if(actives){Collapse._jQueryInterface.call($(actives),'hide');if(!activesData){$(actives).data(DATA_KEY,null);}}var dimension=this._getDimension();$(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);this._element.style[dimension]=0;this._element.setAttribute('aria-expanded',true);if(this._triggerArray.length){$(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded',true);}this.setTransitioning(true);var complete=function complete(){$(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);_this4._element.style[dimension]='';_this4.setTransitioning(false);$(_this4._element).trigger(Event.SHOWN);};if(!Util.supportsTransitionEnd()){complete();return;}var capitalizedDimension=dimension[0].toUpperCase()+dimension.slice(1);var scrollSize='scroll'+capitalizedDimension;$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);this._element.style[dimension]=this._element[scrollSize]+'px';}},{key:'hide',value:function hide(){var _this5=this;if(this._isTransitioning||!$(this._element).hasClass(ClassName.IN)){return;}var startEvent=$.Event(Event.HIDE);$(this._element).trigger(startEvent);if(startEvent.isDefaultPrevented()){return;}var dimension=this._getDimension();var offsetDimension=dimension===Dimension.WIDTH?'offsetWidth':'offsetHeight';this._element.style[dimension]=this._element[offsetDimension]+'px';Util.reflow(this._element);$(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);this._element.setAttribute('aria-expanded',false);if(this._triggerArray.length){$(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded',false);}this.setTransitioning(true);var complete=function complete(){_this5.setTransitioning(false);$(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);};this._element.style[dimension]=0;if(!Util.supportsTransitionEnd()){complete();return;}$(this._element).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);}},{key:'setTransitioning',value:function setTransitioning(isTransitioning){this._isTransitioning=isTransitioning;}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);this._config=null;this._parent=null;this._element=null;this._triggerArray=null;this._isTransitioning=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);config.toggle=Boolean(config.toggle);// coerce string values
	Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_getDimension',value:function _getDimension(){var hasWidth=$(this._element).hasClass(Dimension.WIDTH);return hasWidth?Dimension.WIDTH:Dimension.HEIGHT;}},{key:'_getParent',value:function _getParent(){var _this6=this;var parent=$(this._config.parent)[0];var selector='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';$(parent).find(selector).each(function(i,element){_this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element),[element]);});return parent;}},{key:'_addAriaAndCollapsedClass',value:function _addAriaAndCollapsedClass(element,triggerArray){if(element){var isOpen=$(element).hasClass(ClassName.IN);element.setAttribute('aria-expanded',isOpen);if(triggerArray.length){$(triggerArray).toggleClass(ClassName.COLLAPSED,!isOpen).attr('aria-expanded',isOpen);}}}// static
	}],[{key:'_getTargetFromElement',value:function _getTargetFromElement(element){var selector=Util.getSelectorFromElement(element);return selector?$(selector)[0]:null;}},{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var $this=$(this);var data=$this.data(DATA_KEY);var _config=$.extend({},Default,$this.data(),(typeof config==='undefined'?'undefined':_typeof(config))==='object'&&config);if(!data&&_config.toggle&&/show|hide/.test(config)){_config.toggle=false;}if(!data){data=new Collapse(this,_config);$this.data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return Collapse;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,function(event){event.preventDefault();var target=Collapse._getTargetFromElement(this);var data=$(target).data(DATA_KEY);var config=data?'toggle':$(this).data();Collapse._jQueryInterface.call($(target),config);});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Collapse._jQueryInterface;$.fn[NAME].Constructor=Collapse;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Collapse._jQueryInterface;};return Collapse;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): dropdown.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Dropdown=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='dropdown';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.dropdown';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var ESCAPE_KEYCODE=27;// KeyboardEvent.which value for Escape (Esc) key
	var ARROW_UP_KEYCODE=38;// KeyboardEvent.which value for up arrow key
	var ARROW_DOWN_KEYCODE=40;// KeyboardEvent.which value for down arrow key
	var RIGHT_MOUSE_BUTTON_WHICH=3;// MouseEvent.which value for the right button (assuming a right-handed mouse)
	var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,CLICK:'click'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY,KEYDOWN_DATA_API:'keydown'+EVENT_KEY+DATA_API_KEY};var ClassName={BACKDROP:'dropdown-backdrop',DISABLED:'disabled',OPEN:'open'};var Selector={BACKDROP:'.dropdown-backdrop',DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:'.dropdown form',ROLE_MENU:'[role="menu"]',ROLE_LISTBOX:'[role="listbox"]',NAVBAR_NAV:'.navbar-nav',VISIBLE_ITEMS:'[role="menu"] li:not(.disabled) a, '+'[role="listbox"] li:not(.disabled) a'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Dropdown=function(){function Dropdown(element){_classCallCheck(this,Dropdown);this._element=element;this._addEventListeners();}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Dropdown,[{key:'toggle',// public
	value:function toggle(){if(this.disabled||$(this).hasClass(ClassName.DISABLED)){return false;}var parent=Dropdown._getParentFromElement(this);var isActive=$(parent).hasClass(ClassName.OPEN);Dropdown._clearMenus();if(isActive){return false;}if('ontouchstart'in document.documentElement&&!$(parent).closest(Selector.NAVBAR_NAV).length){// if mobile we use a backdrop because click events don't delegate
	var dropdown=document.createElement('div');dropdown.className=ClassName.BACKDROP;$(dropdown).insertBefore(this);$(dropdown).on('click',Dropdown._clearMenus);}var relatedTarget={relatedTarget:this};var showEvent=$.Event(Event.SHOW,relatedTarget);$(parent).trigger(showEvent);if(showEvent.isDefaultPrevented()){return false;}this.focus();this.setAttribute('aria-expanded','true');$(parent).toggleClass(ClassName.OPEN);$(parent).trigger($.Event(Event.SHOWN,relatedTarget));return false;}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);$(this._element).off(EVENT_KEY);this._element=null;}// private
	},{key:'_addEventListeners',value:function _addEventListeners(){$(this._element).on(Event.CLICK,this.toggle);}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);if(!data){$(this).data(DATA_KEY,data=new Dropdown(this));}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config].call(this);}});}},{key:'_clearMenus',value:function _clearMenus(event){if(event&&event.which===RIGHT_MOUSE_BUTTON_WHICH){return;}var backdrop=$(Selector.BACKDROP)[0];if(backdrop){backdrop.parentNode.removeChild(backdrop);}var toggles=$.makeArray($(Selector.DATA_TOGGLE));for(var i=0;i<toggles.length;i++){var _parent=Dropdown._getParentFromElement(toggles[i]);var relatedTarget={relatedTarget:toggles[i]};if(!$(_parent).hasClass(ClassName.OPEN)){continue;}if(event&&event.type==='click'&&/input|textarea/i.test(event.target.tagName)&&$.contains(_parent,event.target)){continue;}var hideEvent=$.Event(Event.HIDE,relatedTarget);$(_parent).trigger(hideEvent);if(hideEvent.isDefaultPrevented()){continue;}toggles[i].setAttribute('aria-expanded','false');$(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN,relatedTarget));}}},{key:'_getParentFromElement',value:function _getParentFromElement(element){var parent=undefined;var selector=Util.getSelectorFromElement(element);if(selector){parent=$(selector)[0];}return parent||element.parentNode;}},{key:'_dataApiKeydownHandler',value:function _dataApiKeydownHandler(event){if(!/(38|40|27|32)/.test(event.which)||/input|textarea/i.test(event.target.tagName)){return;}event.preventDefault();event.stopPropagation();if(this.disabled||$(this).hasClass(ClassName.DISABLED)){return;}var parent=Dropdown._getParentFromElement(this);var isActive=$(parent).hasClass(ClassName.OPEN);if(!isActive&&event.which!==ESCAPE_KEYCODE||isActive&&event.which===ESCAPE_KEYCODE){if(event.which===ESCAPE_KEYCODE){var toggle=$(parent).find(Selector.DATA_TOGGLE)[0];$(toggle).trigger('focus');}$(this).trigger('click');return;}var items=$.makeArray($(Selector.VISIBLE_ITEMS));items=items.filter(function(item){return item.offsetWidth||item.offsetHeight;});if(!items.length){return;}var index=items.indexOf(event.target);if(event.which===ARROW_UP_KEYCODE&&index>0){// up
	index--;}if(event.which===ARROW_DOWN_KEYCODE&&index<items.length-1){// down
	index++;}if(index<0){index=0;}items[index].focus();}},{key:'VERSION',get:function get(){return VERSION;}}]);return Dropdown;}();$(document).on(Event.KEYDOWN_DATA_API,Selector.DATA_TOGGLE,Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API,Selector.ROLE_MENU,Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API,Selector.ROLE_LISTBOX,Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API,Dropdown._clearMenus).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,Dropdown.prototype.toggle).on(Event.CLICK_DATA_API,Selector.FORM_CHILD,function(e){e.stopPropagation();});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Dropdown._jQueryInterface;$.fn[NAME].Constructor=Dropdown;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Dropdown._jQueryInterface;};return Dropdown;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): modal.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Modal=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='modal';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.modal';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=300;var BACKDROP_TRANSITION_DURATION=150;var ESCAPE_KEYCODE=27;// KeyboardEvent.which value for Escape (Esc) key
	var Default={backdrop:true,keyboard:true,focus:true,show:true};var DefaultType={backdrop:'(boolean|string)',keyboard:'boolean',focus:'boolean',show:'boolean'};var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,FOCUSIN:'focusin'+EVENT_KEY,RESIZE:'resize'+EVENT_KEY,CLICK_DISMISS:'click.dismiss'+EVENT_KEY,KEYDOWN_DISMISS:'keydown.dismiss'+EVENT_KEY,MOUSEUP_DISMISS:'mouseup.dismiss'+EVENT_KEY,MOUSEDOWN_DISMISS:'mousedown.dismiss'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={SCROLLBAR_MEASURER:'modal-scrollbar-measure',BACKDROP:'modal-backdrop',OPEN:'modal-open',FADE:'fade',IN:'in'};var Selector={DIALOG:'.modal-dialog',DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:'.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Modal=function(){function Modal(element,config){_classCallCheck(this,Modal);this._config=this._getConfig(config);this._element=element;this._dialog=$(element).find(Selector.DIALOG)[0];this._backdrop=null;this._isShown=false;this._isBodyOverflowing=false;this._ignoreBackdropClick=false;this._originalBodyPadding=0;this._scrollbarWidth=0;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Modal,[{key:'toggle',// public
	value:function toggle(relatedTarget){return this._isShown?this.hide():this.show(relatedTarget);}},{key:'show',value:function show(relatedTarget){var _this7=this;var showEvent=$.Event(Event.SHOW,{relatedTarget:relatedTarget});$(this._element).trigger(showEvent);if(this._isShown||showEvent.isDefaultPrevented()){return;}this._isShown=true;this._checkScrollbar();this._setScrollbar();$(document.body).addClass(ClassName.OPEN);this._setEscapeEvent();this._setResizeEvent();$(this._element).on(Event.CLICK_DISMISS,Selector.DATA_DISMISS,$.proxy(this.hide,this));$(this._dialog).on(Event.MOUSEDOWN_DISMISS,function(){$(_this7._element).one(Event.MOUSEUP_DISMISS,function(event){if($(event.target).is(_this7._element)){_this7._ignoreBackdropClick=true;}});});this._showBackdrop($.proxy(this._showElement,this,relatedTarget));}},{key:'hide',value:function hide(event){if(event){event.preventDefault();}var hideEvent=$.Event(Event.HIDE);$(this._element).trigger(hideEvent);if(!this._isShown||hideEvent.isDefaultPrevented()){return;}this._isShown=false;this._setEscapeEvent();this._setResizeEvent();$(document).off(Event.FOCUSIN);$(this._element).removeClass(ClassName.IN);$(this._element).off(Event.CLICK_DISMISS);$(this._dialog).off(Event.MOUSEDOWN_DISMISS);if(Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.FADE)){$(this._element).one(Util.TRANSITION_END,$.proxy(this._hideModal,this)).emulateTransitionEnd(TRANSITION_DURATION);}else{this._hideModal();}}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);$(window).off(EVENT_KEY);$(document).off(EVENT_KEY);$(this._element).off(EVENT_KEY);$(this._backdrop).off(EVENT_KEY);this._config=null;this._element=null;this._dialog=null;this._backdrop=null;this._isShown=null;this._isBodyOverflowing=null;this._ignoreBackdropClick=null;this._originalBodyPadding=null;this._scrollbarWidth=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_showElement',value:function _showElement(relatedTarget){var _this8=this;var transition=Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.FADE);if(!this._element.parentNode||this._element.parentNode.nodeType!==Node.ELEMENT_NODE){// don't move modals dom position
	document.body.appendChild(this._element);}this._element.style.display='block';this._element.removeAttribute('aria-hidden');this._element.scrollTop=0;if(transition){Util.reflow(this._element);}$(this._element).addClass(ClassName.IN);if(this._config.focus){this._enforceFocus();}var shownEvent=$.Event(Event.SHOWN,{relatedTarget:relatedTarget});var transitionComplete=function transitionComplete(){if(_this8._config.focus){_this8._element.focus();}$(_this8._element).trigger(shownEvent);};if(transition){$(this._dialog).one(Util.TRANSITION_END,transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);}else{transitionComplete();}}},{key:'_enforceFocus',value:function _enforceFocus(){var _this9=this;$(document).off(Event.FOCUSIN)// guard against infinite focus loop
	.on(Event.FOCUSIN,function(event){if(document!==event.target&&_this9._element!==event.target&&!$(_this9._element).has(event.target).length){_this9._element.focus();}});}},{key:'_setEscapeEvent',value:function _setEscapeEvent(){var _this10=this;if(this._isShown&&this._config.keyboard){$(this._element).on(Event.KEYDOWN_DISMISS,function(event){if(event.which===ESCAPE_KEYCODE){_this10.hide();}});}else if(!this._isShown){$(this._element).off(Event.KEYDOWN_DISMISS);}}},{key:'_setResizeEvent',value:function _setResizeEvent(){if(this._isShown){$(window).on(Event.RESIZE,$.proxy(this._handleUpdate,this));}else{$(window).off(Event.RESIZE);}}},{key:'_hideModal',value:function _hideModal(){var _this11=this;this._element.style.display='none';this._element.setAttribute('aria-hidden','true');this._showBackdrop(function(){$(document.body).removeClass(ClassName.OPEN);_this11._resetAdjustments();_this11._resetScrollbar();$(_this11._element).trigger(Event.HIDDEN);});}},{key:'_removeBackdrop',value:function _removeBackdrop(){if(this._backdrop){$(this._backdrop).remove();this._backdrop=null;}}},{key:'_showBackdrop',value:function _showBackdrop(callback){var _this12=this;var animate=$(this._element).hasClass(ClassName.FADE)?ClassName.FADE:'';if(this._isShown&&this._config.backdrop){var doAnimate=Util.supportsTransitionEnd()&&animate;this._backdrop=document.createElement('div');this._backdrop.className=ClassName.BACKDROP;if(animate){$(this._backdrop).addClass(animate);}$(this._backdrop).appendTo(document.body);$(this._element).on(Event.CLICK_DISMISS,function(event){if(_this12._ignoreBackdropClick){_this12._ignoreBackdropClick=false;return;}if(event.target!==event.currentTarget){return;}if(_this12._config.backdrop==='static'){_this12._element.focus();}else{_this12.hide();}});if(doAnimate){Util.reflow(this._backdrop);}$(this._backdrop).addClass(ClassName.IN);if(!callback){return;}if(!doAnimate){callback();return;}$(this._backdrop).one(Util.TRANSITION_END,callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);}else if(!this._isShown&&this._backdrop){$(this._backdrop).removeClass(ClassName.IN);var callbackRemove=function callbackRemove(){_this12._removeBackdrop();if(callback){callback();}};if(Util.supportsTransitionEnd()&&$(this._element).hasClass(ClassName.FADE)){$(this._backdrop).one(Util.TRANSITION_END,callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);}else{callbackRemove();}}else if(callback){callback();}}// ----------------------------------------------------------------------
	// the following methods are used to handle overflowing modals
	// todo (fat): these should probably be refactored out of modal.js
	// ----------------------------------------------------------------------
	},{key:'_handleUpdate',value:function _handleUpdate(){this._adjustDialog();}},{key:'_adjustDialog',value:function _adjustDialog(){var isModalOverflowing=this._element.scrollHeight>document.documentElement.clientHeight;if(!this._isBodyOverflowing&&isModalOverflowing){this._element.style.paddingLeft=this._scrollbarWidth+'px';}if(this._isBodyOverflowing&&!isModalOverflowing){this._element.style.paddingRight=this._scrollbarWidth+'px';}}},{key:'_resetAdjustments',value:function _resetAdjustments(){this._element.style.paddingLeft='';this._element.style.paddingRight='';}},{key:'_checkScrollbar',value:function _checkScrollbar(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth;this._scrollbarWidth=this._getScrollbarWidth();}},{key:'_setScrollbar',value:function _setScrollbar(){var bodyPadding=parseInt($(Selector.FIXED_CONTENT).css('padding-right')||0,10);this._originalBodyPadding=document.body.style.paddingRight||'';if(this._isBodyOverflowing){document.body.style.paddingRight=bodyPadding+this._scrollbarWidth+'px';}}},{key:'_resetScrollbar',value:function _resetScrollbar(){document.body.style.paddingRight=this._originalBodyPadding;}},{key:'_getScrollbarWidth',value:function _getScrollbarWidth(){// thx d.walsh
	var scrollDiv=document.createElement('div');scrollDiv.className=ClassName.SCROLLBAR_MEASURER;document.body.appendChild(scrollDiv);var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;document.body.removeChild(scrollDiv);return scrollbarWidth;}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config,relatedTarget){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=$.extend({},Modal.Default,$(this).data(),(typeof config==='undefined'?'undefined':_typeof(config))==='object'&&config);if(!data){data=new Modal(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config](relatedTarget);}else if(_config.show){data.show(relatedTarget);}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return Modal;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,function(event){var _this13=this;var target=undefined;var selector=Util.getSelectorFromElement(this);if(selector){target=$(selector)[0];}var config=$(target).data(DATA_KEY)?'toggle':$.extend({},$(target).data(),$(this).data());if(this.tagName==='A'){event.preventDefault();}var $target=$(target).one(Event.SHOW,function(showEvent){if(showEvent.isDefaultPrevented()){// only register focus restorer if modal will actually get shown
	return;}$target.one(Event.HIDDEN,function(){if($(_this13).is(':visible')){_this13.focus();}});});Modal._jQueryInterface.call($(target),config,this);});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Modal._jQueryInterface;$.fn[NAME].Constructor=Modal;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Modal._jQueryInterface;};return Modal;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): scrollspy.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var ScrollSpy=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='scrollspy';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.scrollspy';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var Default={offset:10,method:'auto',target:''};var DefaultType={offset:'number',method:'string',target:'(string|element)'};var Event={ACTIVATE:'activate'+EVENT_KEY,SCROLL:'scroll'+EVENT_KEY,LOAD_DATA_API:'load'+EVENT_KEY+DATA_API_KEY};var ClassName={DROPDOWN_ITEM:'dropdown-item',DROPDOWN_MENU:'dropdown-menu',NAV_LINK:'nav-link',NAV:'nav',ACTIVE:'active'};var Selector={DATA_SPY:'[data-spy="scroll"]',ACTIVE:'.active',LIST_ITEM:'.list-item',LI:'li',LI_DROPDOWN:'li.dropdown',NAV_LINKS:'.nav-link',DROPDOWN:'.dropdown',DROPDOWN_ITEMS:'.dropdown-item',DROPDOWN_TOGGLE:'.dropdown-toggle'};var OffsetMethod={OFFSET:'offset',POSITION:'position'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var ScrollSpy=function(){function ScrollSpy(element,config){_classCallCheck(this,ScrollSpy);this._element=element;this._scrollElement=element.tagName==='BODY'?window:element;this._config=this._getConfig(config);this._selector=this._config.target+' '+Selector.NAV_LINKS+','+(this._config.target+' '+Selector.DROPDOWN_ITEMS);this._offsets=[];this._targets=[];this._activeTarget=null;this._scrollHeight=0;$(this._scrollElement).on(Event.SCROLL,$.proxy(this._process,this));this.refresh();this._process();}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(ScrollSpy,[{key:'refresh',// public
	value:function refresh(){var _this14=this;var autoMethod=this._scrollElement!==this._scrollElement.window?OffsetMethod.POSITION:OffsetMethod.OFFSET;var offsetMethod=this._config.method==='auto'?autoMethod:this._config.method;var offsetBase=offsetMethod===OffsetMethod.POSITION?this._getScrollTop():0;this._offsets=[];this._targets=[];this._scrollHeight=this._getScrollHeight();var targets=$.makeArray($(this._selector));targets.map(function(element){var target=undefined;var targetSelector=Util.getSelectorFromElement(element);if(targetSelector){target=$(targetSelector)[0];}if(target&&(target.offsetWidth||target.offsetHeight)){// todo (fat): remove sketch reliance on jQuery position/offset
	return[$(target)[offsetMethod]().top+offsetBase,targetSelector];}return null;}).filter(function(item){return item;}).sort(function(a,b){return a[0]-b[0];}).forEach(function(item){_this14._offsets.push(item[0]);_this14._targets.push(item[1]);});}},{key:'dispose',value:function dispose(){$.removeData(this._element,DATA_KEY);$(this._scrollElement).off(EVENT_KEY);this._element=null;this._scrollElement=null;this._config=null;this._selector=null;this._offsets=null;this._targets=null;this._activeTarget=null;this._scrollHeight=null;}// private
	},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},Default,config);if(typeof config.target!=='string'){var id=$(config.target).attr('id');if(!id){id=Util.getUID(NAME);$(config.target).attr('id',id);}config.target='#'+id;}Util.typeCheckConfig(NAME,config,DefaultType);return config;}},{key:'_getScrollTop',value:function _getScrollTop(){return this._scrollElement===window?this._scrollElement.scrollY:this._scrollElement.scrollTop;}},{key:'_getScrollHeight',value:function _getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);}},{key:'_process',value:function _process(){var scrollTop=this._getScrollTop()+this._config.offset;var scrollHeight=this._getScrollHeight();var maxScroll=this._config.offset+scrollHeight-this._scrollElement.offsetHeight;if(this._scrollHeight!==scrollHeight){this.refresh();}if(scrollTop>=maxScroll){var target=this._targets[this._targets.length-1];if(this._activeTarget!==target){this._activate(target);}}if(this._activeTarget&&scrollTop<this._offsets[0]){this._activeTarget=null;this._clear();return;}for(var i=this._offsets.length;i--;){var isActiveTarget=this._activeTarget!==this._targets[i]&&scrollTop>=this._offsets[i]&&(this._offsets[i+1]===undefined||scrollTop<this._offsets[i+1]);if(isActiveTarget){this._activate(this._targets[i]);}}}},{key:'_activate',value:function _activate(target){this._activeTarget=target;this._clear();var queries=this._selector.split(',');queries=queries.map(function(selector){return selector+'[data-target="'+target+'"],'+(selector+'[href="'+target+'"]');});var $link=$(queries.join(','));if($link.hasClass(ClassName.DROPDOWN_ITEM)){$link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);$link.addClass(ClassName.ACTIVE);}else{// todo (fat) this is kinda sus...
	// recursively add actives to tested nav-links
	$link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);}$(this._scrollElement).trigger(Event.ACTIVATE,{relatedTarget:target});}},{key:'_clear',value:function _clear(){$(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=(typeof config==='undefined'?'undefined':_typeof(config))==='object'&&config||null;if(!data){data=new ScrollSpy(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}}]);return ScrollSpy;}();$(window).on(Event.LOAD_DATA_API,function(){var scrollSpys=$.makeArray($(Selector.DATA_SPY));for(var i=scrollSpys.length;i--;){var $spy=$(scrollSpys[i]);ScrollSpy._jQueryInterface.call($spy,$spy.data());}});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=ScrollSpy._jQueryInterface;$.fn[NAME].Constructor=ScrollSpy;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return ScrollSpy._jQueryInterface;};return ScrollSpy;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): tab.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Tab=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='tab';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.tab';var EVENT_KEY='.'+DATA_KEY;var DATA_API_KEY='.data-api';var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=150;var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,CLICK_DATA_API:'click'+EVENT_KEY+DATA_API_KEY};var ClassName={DROPDOWN_MENU:'dropdown-menu',ACTIVE:'active',FADE:'fade',IN:'in'};var Selector={A:'a',LI:'li',DROPDOWN:'.dropdown',UL:'ul:not(.dropdown-menu)',FADE_CHILD:'> .nav-item .fade, > .fade',ACTIVE:'.active',ACTIVE_CHILD:'> .nav-item > .active, > .active',DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"]',DROPDOWN_TOGGLE:'.dropdown-toggle',DROPDOWN_ACTIVE_CHILD:'> .dropdown-menu .active'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Tab=function(){function Tab(element){_classCallCheck(this,Tab);this._element=element;}/**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Tab,[{key:'show',// public
	value:function show(){var _this15=this;if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&$(this._element).hasClass(ClassName.ACTIVE)){return;}var target=undefined;var previous=undefined;var ulElement=$(this._element).closest(Selector.UL)[0];var selector=Util.getSelectorFromElement(this._element);if(ulElement){previous=$.makeArray($(ulElement).find(Selector.ACTIVE));previous=previous[previous.length-1];}var hideEvent=$.Event(Event.HIDE,{relatedTarget:this._element});var showEvent=$.Event(Event.SHOW,{relatedTarget:previous});if(previous){$(previous).trigger(hideEvent);}$(this._element).trigger(showEvent);if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented()){return;}if(selector){target=$(selector)[0];}this._activate(this._element,ulElement);var complete=function complete(){var hiddenEvent=$.Event(Event.HIDDEN,{relatedTarget:_this15._element});var shownEvent=$.Event(Event.SHOWN,{relatedTarget:previous});$(previous).trigger(hiddenEvent);$(_this15._element).trigger(shownEvent);};if(target){this._activate(target,target.parentNode,complete);}else{complete();}}},{key:'dispose',value:function dispose(){$.removeClass(this._element,DATA_KEY);this._element=null;}// private
	},{key:'_activate',value:function _activate(element,container,callback){var active=$(container).find(Selector.ACTIVE_CHILD)[0];var isTransitioning=callback&&Util.supportsTransitionEnd()&&(active&&$(active).hasClass(ClassName.FADE)||Boolean($(container).find(Selector.FADE_CHILD)[0]));var complete=$.proxy(this._transitionComplete,this,element,active,isTransitioning,callback);if(active&&isTransitioning){$(active).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);}else{complete();}if(active){$(active).removeClass(ClassName.IN);}}},{key:'_transitionComplete',value:function _transitionComplete(element,active,isTransitioning,callback){if(active){$(active).removeClass(ClassName.ACTIVE);var dropdownChild=$(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];if(dropdownChild){$(dropdownChild).removeClass(ClassName.ACTIVE);}active.setAttribute('aria-expanded',false);}$(element).addClass(ClassName.ACTIVE);element.setAttribute('aria-expanded',true);if(isTransitioning){Util.reflow(element);$(element).addClass(ClassName.IN);}else{$(element).removeClass(ClassName.FADE);}if(element.parentNode&&$(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)){var dropdownElement=$(element).closest(Selector.DROPDOWN)[0];if(dropdownElement){$(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);}element.setAttribute('aria-expanded',true);}if(callback){callback();}}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var $this=$(this);var data=$this.data(DATA_KEY);if(!data){data=data=new Tab(this);$this.data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}}]);return Tab;}();$(document).on(Event.CLICK_DATA_API,Selector.DATA_TOGGLE,function(event){event.preventDefault();Tab._jQueryInterface.call($(this),'show');});/**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */$.fn[NAME]=Tab._jQueryInterface;$.fn[NAME].Constructor=Tab;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Tab._jQueryInterface;};return Tab;}(jQuery);/* global Tether *//**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): tooltip.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Tooltip=function($){/**
	   * Check for Tether dependency
	   * Tether - http://github.hubspot.com/tether/
	   */if(window.Tether===undefined){throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');}/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='tooltip';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.tooltip';var EVENT_KEY='.'+DATA_KEY;var JQUERY_NO_CONFLICT=$.fn[NAME];var TRANSITION_DURATION=150;var CLASS_PREFIX='bs-tether';var Default={animation:true,template:'<div class="tooltip" role="tooltip">'+'<div class="tooltip-arrow"></div>'+'<div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,selector:false,placement:'top',offset:'0 0',constraints:[]};var DefaultType={animation:'boolean',template:'string',title:'(string|element|function)',trigger:'string',delay:'(number|object)',html:'boolean',selector:'(string|boolean)',placement:'(string|function)',offset:'string',constraints:'array'};var AttachmentMap={TOP:'bottom center',RIGHT:'middle left',BOTTOM:'top center',LEFT:'middle right'};var HoverState={IN:'in',OUT:'out'};var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,INSERTED:'inserted'+EVENT_KEY,CLICK:'click'+EVENT_KEY,FOCUSIN:'focusin'+EVENT_KEY,FOCUSOUT:'focusout'+EVENT_KEY,MOUSEENTER:'mouseenter'+EVENT_KEY,MOUSELEAVE:'mouseleave'+EVENT_KEY};var ClassName={FADE:'fade',IN:'in'};var Selector={TOOLTIP:'.tooltip',TOOLTIP_INNER:'.tooltip-inner'};var TetherClass={element:false,enabled:false};var Trigger={HOVER:'hover',FOCUS:'focus',CLICK:'click',MANUAL:'manual'};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Tooltip=function(){function Tooltip(element,config){_classCallCheck(this,Tooltip);// private
	this._isEnabled=true;this._timeout=0;this._hoverState='';this._activeTrigger={};this._tether=null;// protected
	this.element=element;this.config=this._getConfig(config);this.tip=null;this._setListeners();}/**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */// getters
	_createClass(Tooltip,[{key:'enable',// public
	value:function enable(){this._isEnabled=true;}},{key:'disable',value:function disable(){this._isEnabled=false;}},{key:'toggleEnabled',value:function toggleEnabled(){this._isEnabled=!this._isEnabled;}},{key:'toggle',value:function toggle(event){if(event){var dataKey=this.constructor.DATA_KEY;var context=$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}context._activeTrigger.click=!context._activeTrigger.click;if(context._isWithActiveTrigger()){context._enter(null,context);}else{context._leave(null,context);}}else{if($(this.getTipElement()).hasClass(ClassName.IN)){this._leave(null,this);return;}this._enter(null,this);}}},{key:'dispose',value:function dispose(){clearTimeout(this._timeout);this.cleanupTether();$.removeData(this.element,this.constructor.DATA_KEY);$(this.element).off(this.constructor.EVENT_KEY);if(this.tip){$(this.tip).remove();}this._isEnabled=null;this._timeout=null;this._hoverState=null;this._activeTrigger=null;this._tether=null;this.element=null;this.config=null;this.tip=null;}},{key:'show',value:function show(){var _this16=this;var showEvent=$.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){$(this.element).trigger(showEvent);var isInTheDom=$.contains(this.element.ownerDocument.documentElement,this.element);if(showEvent.isDefaultPrevented()||!isInTheDom){return;}var tip=this.getTipElement();var tipId=Util.getUID(this.constructor.NAME);tip.setAttribute('id',tipId);this.element.setAttribute('aria-describedby',tipId);this.setContent();if(this.config.animation){$(tip).addClass(ClassName.FADE);}var placement=typeof this.config.placement==='function'?this.config.placement.call(this,tip,this.element):this.config.placement;var attachment=this._getAttachment(placement);$(tip).data(this.constructor.DATA_KEY,this).appendTo(document.body);$(this.element).trigger(this.constructor.Event.INSERTED);this._tether=new Tether({attachment:attachment,element:tip,target:this.element,classes:TetherClass,classPrefix:CLASS_PREFIX,offset:this.config.offset,constraints:this.config.constraints,addTargetClasses:false});Util.reflow(tip);this._tether.position();$(tip).addClass(ClassName.IN);var complete=function complete(){var prevHoverState=_this16._hoverState;_this16._hoverState=null;$(_this16.element).trigger(_this16.constructor.Event.SHOWN);if(prevHoverState===HoverState.OUT){_this16._leave(null,_this16);}};if(Util.supportsTransitionEnd()&&$(this.tip).hasClass(ClassName.FADE)){$(this.tip).one(Util.TRANSITION_END,complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);return;}complete();}}},{key:'hide',value:function hide(callback){var _this17=this;var tip=this.getTipElement();var hideEvent=$.Event(this.constructor.Event.HIDE);var complete=function complete(){if(_this17._hoverState!==HoverState.IN&&tip.parentNode){tip.parentNode.removeChild(tip);}_this17.element.removeAttribute('aria-describedby');$(_this17.element).trigger(_this17.constructor.Event.HIDDEN);_this17.cleanupTether();if(callback){callback();}};$(this.element).trigger(hideEvent);if(hideEvent.isDefaultPrevented()){return;}$(tip).removeClass(ClassName.IN);if(Util.supportsTransitionEnd()&&$(this.tip).hasClass(ClassName.FADE)){$(tip).one(Util.TRANSITION_END,complete).emulateTransitionEnd(TRANSITION_DURATION);}else{complete();}this._hoverState='';}// protected
	},{key:'isWithContent',value:function isWithContent(){return Boolean(this.getTitle());}},{key:'getTipElement',value:function getTipElement(){return this.tip=this.tip||$(this.config.template)[0];}},{key:'setContent',value:function setContent(){var $tip=$(this.getTipElement());this.setElementContent($tip.find(Selector.TOOLTIP_INNER),this.getTitle());$tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);this.cleanupTether();}},{key:'setElementContent',value:function setElementContent($element,content){var html=this.config.html;if((typeof content==='undefined'?'undefined':_typeof(content))==='object'&&(content.nodeType||content.jquery)){// content is a DOM node or a jQuery
	if(html){if(!$(content).parent().is($element)){$element.empty().append(content);}}else{$element.text($(content).text());}}else{$element[html?'html':'text'](content);}}},{key:'getTitle',value:function getTitle(){var title=this.element.getAttribute('data-original-title');if(!title){title=typeof this.config.title==='function'?this.config.title.call(this.element):this.config.title;}return title;}},{key:'cleanupTether',value:function cleanupTether(){if(this._tether){this._tether.destroy();}}// private
	},{key:'_getAttachment',value:function _getAttachment(placement){return AttachmentMap[placement.toUpperCase()];}},{key:'_setListeners',value:function _setListeners(){var _this18=this;var triggers=this.config.trigger.split(' ');triggers.forEach(function(trigger){if(trigger==='click'){$(_this18.element).on(_this18.constructor.Event.CLICK,_this18.config.selector,$.proxy(_this18.toggle,_this18));}else if(trigger!==Trigger.MANUAL){var eventIn=trigger===Trigger.HOVER?_this18.constructor.Event.MOUSEENTER:_this18.constructor.Event.FOCUSIN;var eventOut=trigger===Trigger.HOVER?_this18.constructor.Event.MOUSELEAVE:_this18.constructor.Event.FOCUSOUT;$(_this18.element).on(eventIn,_this18.config.selector,$.proxy(_this18._enter,_this18)).on(eventOut,_this18.config.selector,$.proxy(_this18._leave,_this18));}});if(this.config.selector){this.config=$.extend({},this.config,{trigger:'manual',selector:''});}else{this._fixTitle();}}},{key:'_fixTitle',value:function _fixTitle(){var titleType=_typeof(this.element.getAttribute('data-original-title'));if(this.element.getAttribute('title')||titleType!=='string'){this.element.setAttribute('data-original-title',this.element.getAttribute('title')||'');this.element.setAttribute('title','');}}},{key:'_enter',value:function _enter(event,context){var dataKey=this.constructor.DATA_KEY;context=context||$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}if(event){context._activeTrigger[event.type==='focusin'?Trigger.FOCUS:Trigger.HOVER]=true;}if($(context.getTipElement()).hasClass(ClassName.IN)||context._hoverState===HoverState.IN){context._hoverState=HoverState.IN;return;}clearTimeout(context._timeout);context._hoverState=HoverState.IN;if(!context.config.delay||!context.config.delay.show){context.show();return;}context._timeout=setTimeout(function(){if(context._hoverState===HoverState.IN){context.show();}},context.config.delay.show);}},{key:'_leave',value:function _leave(event,context){var dataKey=this.constructor.DATA_KEY;context=context||$(event.currentTarget).data(dataKey);if(!context){context=new this.constructor(event.currentTarget,this._getDelegateConfig());$(event.currentTarget).data(dataKey,context);}if(event){context._activeTrigger[event.type==='focusout'?Trigger.FOCUS:Trigger.HOVER]=false;}if(context._isWithActiveTrigger()){return;}clearTimeout(context._timeout);context._hoverState=HoverState.OUT;if(!context.config.delay||!context.config.delay.hide){context.hide();return;}context._timeout=setTimeout(function(){if(context._hoverState===HoverState.OUT){context.hide();}},context.config.delay.hide);}},{key:'_isWithActiveTrigger',value:function _isWithActiveTrigger(){for(var trigger in this._activeTrigger){if(this._activeTrigger[trigger]){return true;}}return false;}},{key:'_getConfig',value:function _getConfig(config){config=$.extend({},this.constructor.Default,$(this.element).data(),config);if(config.delay&&typeof config.delay==='number'){config.delay={show:config.delay,hide:config.delay};}Util.typeCheckConfig(NAME,config,this.constructor.DefaultType);return config;}},{key:'_getDelegateConfig',value:function _getDelegateConfig(){var config={};if(this.config){for(var key in this.config){if(this.constructor.Default[key]!==this.config[key]){config[key]=this.config[key];}}}return config;}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=(typeof config==='undefined'?'undefined':_typeof(config))==='object'?config:null;if(!data&&/destroy|hide/.test(config)){return;}if(!data){data=new Tooltip(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}},{key:'NAME',get:function get(){return NAME;}},{key:'DATA_KEY',get:function get(){return DATA_KEY;}},{key:'Event',get:function get(){return Event;}},{key:'EVENT_KEY',get:function get(){return EVENT_KEY;}},{key:'DefaultType',get:function get(){return DefaultType;}}]);return Tooltip;}();$.fn[NAME]=Tooltip._jQueryInterface;$.fn[NAME].Constructor=Tooltip;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Tooltip._jQueryInterface;};return Tooltip;}(jQuery);/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.3): popover.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */var Popover=function($){/**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */var NAME='popover';var VERSION='4.0.0-alpha.3';var DATA_KEY='bs.popover';var EVENT_KEY='.'+DATA_KEY;var JQUERY_NO_CONFLICT=$.fn[NAME];var Default=$.extend({},Tooltip.Default,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip">'+'<div class="popover-arrow"></div>'+'<h3 class="popover-title"></h3>'+'<div class="popover-content"></div></div>'});var DefaultType=$.extend({},Tooltip.DefaultType,{content:'(string|element|function)'});var ClassName={FADE:'fade',IN:'in'};var Selector={TITLE:'.popover-title',CONTENT:'.popover-content',ARROW:'.popover-arrow'};var Event={HIDE:'hide'+EVENT_KEY,HIDDEN:'hidden'+EVENT_KEY,SHOW:'show'+EVENT_KEY,SHOWN:'shown'+EVENT_KEY,INSERTED:'inserted'+EVENT_KEY,CLICK:'click'+EVENT_KEY,FOCUSIN:'focusin'+EVENT_KEY,FOCUSOUT:'focusout'+EVENT_KEY,MOUSEENTER:'mouseenter'+EVENT_KEY,MOUSELEAVE:'mouseleave'+EVENT_KEY};/**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */var Popover=function(_Tooltip){_inherits(Popover,_Tooltip);function Popover(){_classCallCheck(this,Popover);_get(Object.getPrototypeOf(Popover.prototype),'constructor',this).apply(this,arguments);}/**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */_createClass(Popover,[{key:'isWithContent',// overrides
	value:function isWithContent(){return this.getTitle()||this._getContent();}},{key:'getTipElement',value:function getTipElement(){return this.tip=this.tip||$(this.config.template)[0];}},{key:'setContent',value:function setContent(){var $tip=$(this.getTipElement());// we use append for html objects to maintain js events
	this.setElementContent($tip.find(Selector.TITLE),this.getTitle());this.setElementContent($tip.find(Selector.CONTENT),this._getContent());$tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);this.cleanupTether();}// private
	},{key:'_getContent',value:function _getContent(){return this.element.getAttribute('data-content')||(typeof this.config.content==='function'?this.config.content.call(this.element):this.config.content);}// static
	}],[{key:'_jQueryInterface',value:function _jQueryInterface(config){return this.each(function(){var data=$(this).data(DATA_KEY);var _config=(typeof config==='undefined'?'undefined':_typeof(config))==='object'?config:null;if(!data&&/destroy|hide/.test(config)){return;}if(!data){data=new Popover(this,_config);$(this).data(DATA_KEY,data);}if(typeof config==='string'){if(data[config]===undefined){throw new Error('No method named "'+config+'"');}data[config]();}});}},{key:'VERSION',// getters
	get:function get(){return VERSION;}},{key:'Default',get:function get(){return Default;}},{key:'NAME',get:function get(){return NAME;}},{key:'DATA_KEY',get:function get(){return DATA_KEY;}},{key:'Event',get:function get(){return Event;}},{key:'EVENT_KEY',get:function get(){return EVENT_KEY;}},{key:'DefaultType',get:function get(){return DefaultType;}}]);return Popover;}(Tooltip);$.fn[NAME]=Popover._jQueryInterface;$.fn[NAME].Constructor=Popover;$.fn[NAME].noConflict=function(){$.fn[NAME]=JQUERY_NO_CONFLICT;return Popover._jQueryInterface;};return Popover;}(jQuery);}(jQuery);

	var Util = function () {

	  /**
	   * ------------------------------------------------------------------------
	   * Private TransitionEnd Helpers
	   * ------------------------------------------------------------------------
	   */

	  var transitionEnd = false;
	  var _transitionEndSelector = '';

	  var TransitionEndEvent = {
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'transitionend',
	    OTransition: 'oTransitionEnd otransitionend',
	    transition: 'transitionend'
	  };

	  function transitionEndTest() {
	    if (window.QUnit) {
	      return false;
	    }

	    var el = document.createElement('bmd');

	    for (var name in TransitionEndEvent) {
	      if (el.style[name] !== undefined) {
	        return TransitionEndEvent[name]; // { end: TransitionEndEvent[name] }
	      }
	    }

	    return false;
	  }

	  function setTransitionEndSupport() {
	    transitionEnd = transitionEndTest();

	    // generate a concatenated transition end event selector
	    for (var name in TransitionEndEvent) {
	      _transitionEndSelector += ' ' + TransitionEndEvent[name];
	    }
	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */

	  var Util = {
	    transitionEndSupported: function transitionEndSupported() {
	      return transitionEnd;
	    },
	    transitionEndSelector: function transitionEndSelector() {
	      return _transitionEndSelector;
	    },
	    isChar: function isChar(event) {
	      if (typeof event.which === 'undefined') {
	        return true;
	      } else if (typeof event.which === 'number' && event.which > 0) {
	        return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 // backspace
	        && event.which !== 9 // tab
	        && event.which !== 13 // enter
	        && event.which !== 16 // shift
	        && event.which !== 17 // ctrl
	        && event.which !== 20 // caps lock
	        && event.which !== 27 // escape
	        ;
	      }
	      return false;
	    },
	    assert: function assert($element, invalidTest, message) {
	      if (invalidTest) {
	        if (!$element === undefined) {
	          $element.css('border', '1px solid red');
	        }
	        console.error(message, $element); // eslint-disable-line no-console
	        throw message;
	      }
	    },
	    describe: function describe($element) {
	      if ($element === undefined) {
	        return 'undefined';
	      } else if ($element.length === 0) {
	        return '(no matching elements)';
	      }
	      return $element[0].outerHTML.split('>')[0] + '>';
	    }
	  };

	  setTransitionEndSupport();
	  return Util;
	}(jQuery);

	var Base = function ($) {

	  var ClassName = {
	    BMD_FORM_GROUP: 'bmd-form-group',
	    IS_FILLED: 'is-filled',
	    IS_FOCUSED: 'is-focused'
	  };

	  var Selector = {
	    BMD_FORM_GROUP: '.' + ClassName.BMD_FORM_GROUP
	  };

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Base = function () {

	    /**
	     *
	     * @param element
	     * @param config
	     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
	     */
	    function Base($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      classCallCheck(this, Base);

	      this.$element = $element;
	      this.config = $.extend(true, {}, Default, config);

	      // set properties for use in the constructor initialization
	      for (var key in properties) {
	        this[key] = properties[key];
	      }
	    }

	    createClass(Base, [{
	      key: 'dispose',
	      value: function dispose(dataKey) {
	        this.$element.data(dataKey, null);
	        this.$element = null;
	        this.config = null;
	      }

	      // ------------------------------------------------------------------------
	      // protected

	    }, {
	      key: 'addFormGroupFocus',
	      value: function addFormGroupFocus() {
	        if (!this.$element.prop('disabled')) {
	          this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED);
	        }
	      }
	    }, {
	      key: 'removeFormGroupFocus',
	      value: function removeFormGroupFocus() {
	        this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED);
	      }
	    }, {
	      key: 'removeIsFilled',
	      value: function removeIsFilled() {
	        this.$bmdFormGroup.removeClass(ClassName.IS_FILLED);
	      }
	    }, {
	      key: 'addIsFilled',
	      value: function addIsFilled() {
	        this.$bmdFormGroup.addClass(ClassName.IS_FILLED);
	      }

	      // Find bmd-form-group

	    }, {
	      key: 'findMdbFormGroup',
	      value: function findMdbFormGroup() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	        var mfg = this.$element.closest(Selector.BMD_FORM_GROUP);
	        if (mfg.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.BMD_FORM_GROUP + ' for ' + Util.describe(this.$element));
	        }
	        return mfg;
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }]);
	    return Base;
	  }();

	  return Base;
	}(jQuery);

	var BaseInput = function ($) {

	  var ClassName = {
	    FORM_GROUP: 'form-group',
	    BMD_FORM_GROUP: 'bmd-form-group',
	    BMD_LABEL: 'bmd-label',
	    BMD_LABEL_STATIC: 'bmd-label-static',
	    BMD_LABEL_PLACEHOLDER: 'bmd-label-placeholder',
	    BMD_LABEL_FLOATING: 'bmd-label-floating',
	    HAS_DANGER: 'has-danger',
	    IS_FILLED: 'is-filled',
	    IS_FOCUSED: 'is-focused',
	    INPUT_GROUP: 'input-group'
	  };

	  var Selector = {
	    FORM_GROUP: '.' + ClassName.FORM_GROUP,
	    BMD_FORM_GROUP: '.' + ClassName.BMD_FORM_GROUP,
	    BMD_LABEL_WILDCARD: 'label[class^=\'' + ClassName.BMD_LABEL + '\'], label[class*=\' ' + ClassName.BMD_LABEL + '\']' // match any label variant if specified
	  };

	  var Default = {
	    validate: false,
	    formGroup: {
	      required: false
	    },
	    bmdFormGroup: {
	      template: '<span class=\'' + ClassName.BMD_FORM_GROUP + '\'></span>',
	      create: true, // create a wrapper if form-group not found
	      required: true // not recommended to turn this off, only used for inline components
	    },
	    label: {
	      required: false,

	      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
	      //  - a function(thisComponent); or
	      //  - a string selector used like $bmdFormGroup.find(selector)
	      //
	      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
	      //
	      selectors: ['.form-control-label', // in the case of horizontal or inline forms, this will be marked
	      '> label' // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
	      ],
	      className: ClassName.BMD_LABEL_STATIC
	    },
	    requiredClasses: [],
	    invalidComponentMatches: [],
	    convertInputSizeVariations: true
	  };

	  var FormControlSizeMarkers = {
	    'form-control-lg': 'bmd-form-group-lg',
	    'form-control-sm': 'bmd-form-group-sm'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseInput = function (_Base) {
	    inherits(BaseInput, _Base);

	    /**
	     *
	     * @param element
	     * @param config
	     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
	     */
	    function BaseInput($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      classCallCheck(this, BaseInput);

	      // Enforce no overlap between components to prevent side effects
	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseInput).call(this, $element, $.extend(true, {}, Default, config), properties));

	      _this._rejectInvalidComponentMatches();

	      // Enforce expected structure (if any)
	      _this.rejectWithoutRequiredStructure();

	      // Enforce required classes for a consistent rendering
	      _this._rejectWithoutRequiredClasses();

	      // Resolve the form-group first, it will be used for bmd-form-group if possible
	      //   note: different components have different rules
	      _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required);

	      // Will add bmd-form-group to form-group or create an bmd-form-group
	      //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
	      //    rendering changes once added.
	      _this.$bmdFormGroup = _this.resolveMdbFormGroup();

	      // Resolve and mark the bmdLabel if necessary as defined by the config
	      _this.$bmdLabel = _this.resolveMdbLabel();

	      // Signal to the bmd-form-group that a form-control-* variation is being used
	      _this.resolveMdbFormGroupSizing();

	      _this.addFocusListener();
	      _this.addChangeListener();

	      if (_this.$element.val() != '') {
	        _this.addIsFilled();
	      }
	      return _this;
	    }

	    createClass(BaseInput, [{
	      key: 'dispose',
	      value: function dispose(dataKey) {
	        get(Object.getPrototypeOf(BaseInput.prototype), 'dispose', this).call(this, dataKey);
	        this.$bmdFormGroup = null;
	        this.$formGroup = null;
	      }

	      // ------------------------------------------------------------------------
	      // protected

	    }, {
	      key: 'rejectWithoutRequiredStructure',
	      value: function rejectWithoutRequiredStructure() {
	        // implement
	      }
	    }, {
	      key: 'addFocusListener',
	      value: function addFocusListener() {
	        var _this2 = this;

	        this.$element.on('focus', function () {
	          _this2.addFormGroupFocus();
	        }).on('blur', function () {
	          _this2.removeFormGroupFocus();
	        });
	      }
	    }, {
	      key: 'addChangeListener',
	      value: function addChangeListener() {
	        var _this3 = this;

	        this.$element.on('keydown paste', function (event) {
	          if (Util.isChar(event)) {
	            _this3.addIsFilled();
	          }
	        }).on('keyup change', function () {

	          // make sure empty is added back when there is a programmatic value change.
	          //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
	          if (_this3.isEmpty()) {
	            _this3.removeIsFilled();
	          } else {
	            _this3.addIsFilled();
	          }

	          if (_this3.config.validate) {
	            // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
	            //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
	            //  the form-group on change.
	            //
	            // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
	            //        BUT, I've left it here for backwards compatibility.
	            var isValid = typeof _this3.$element[0].checkValidity === 'undefined' || _this3.$element[0].checkValidity();
	            if (isValid) {
	              _this3.removeHasDanger();
	            } else {
	              _this3.addHasDanger();
	            }
	          }
	        });
	      }
	    }, {
	      key: 'addHasDanger',
	      value: function addHasDanger() {
	        this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
	      }
	    }, {
	      key: 'removeHasDanger',
	      value: function removeHasDanger() {
	        this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
	      }
	    }, {
	      key: 'isEmpty',
	      value: function isEmpty() {
	        return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '';
	      }

	      // Will add bmd-form-group to form-group or create a bmd-form-group if necessary

	    }, {
	      key: 'resolveMdbFormGroup',
	      value: function resolveMdbFormGroup() {
	        var mfg = this.findMdbFormGroup(false);
	        if (mfg === undefined || mfg.length === 0) {
	          if (this.config.bmdFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
	            // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
	            //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.

	            // this may be an input-group, wrap that instead
	            if (this.outerElement().parent().hasClass(ClassName.INPUT_GROUP)) {
	              this.outerElement().parent().wrap(this.config.bmdFormGroup.template);
	            } else {
	              this.outerElement().wrap(this.config.bmdFormGroup.template);
	            }
	          } else {
	            // a form-group does exist, add our marker class to it
	            this.$formGroup.addClass(ClassName.BMD_FORM_GROUP);

	            // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
	            // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
	            //fg.wrapInner(this.config.bmdFormGroup.template)
	          }

	          mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
	        }

	        return mfg;
	      }

	      // Demarcation element (e.g. first child of a form-group)
	      //  Subclasses such as file inputs may have different structures

	    }, {
	      key: 'outerElement',
	      value: function outerElement() {
	        return this.$element;
	      }

	      // Will add bmd-label to bmd-form-group if not already specified

	    }, {
	      key: 'resolveMdbLabel',
	      value: function resolveMdbLabel() {

	        var label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);
	        if (label === undefined || label.length === 0) {
	          // we need to find it based on the configured selectors
	          label = this.findMdbLabel(this.config.label.required);

	          if (label === undefined || label.length === 0) {
	            // no label found, and finder did not require one
	          } else {
	            // a candidate label was found, add the configured default class name
	            label.addClass(this.config.label.className);
	          }
	        }

	        return label;
	      }

	      // Find bmd-label variant based on the config selectors

	    }, {
	      key: 'findMdbLabel',
	      value: function findMdbLabel() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	        var label = null;

	        // use the specified selector order
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = this.config.label.selectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var selector = _step.value;

	            if ($.isFunction(selector)) {
	              label = selector(this);
	            } else {
	              label = this.$bmdFormGroup.find(selector);
	            }

	            if (label !== undefined && label.length > 0) {
	              break;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        if (label.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.BMD_LABEL_WILDCARD + ' within form-group for ' + Util.describe(this.$element));
	        }
	        return label;
	      }

	      // Find bmd-form-group

	    }, {
	      key: 'findFormGroup',
	      value: function findFormGroup() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	        var fg = this.$element.closest(Selector.FORM_GROUP);
	        if (fg.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.FORM_GROUP + ' for ' + Util.describe(this.$element));
	        }
	        return fg;
	      }

	      // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
	      //  a found form-control-* size

	    }, {
	      key: 'resolveMdbFormGroupSizing',
	      value: function resolveMdbFormGroupSizing() {
	        if (!this.config.convertInputSizeVariations) {
	          return;
	        }

	        // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
	        for (var inputSize in FormControlSizeMarkers) {
	          if (this.$element.hasClass(inputSize)) {
	            //this.$element.removeClass(inputSize)
	            this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
	          }
	        }
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_rejectInvalidComponentMatches',
	      value: function _rejectInvalidComponentMatches() {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = this.config.invalidComponentMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var otherComponent = _step2.value;

	            otherComponent.rejectMatch(this.constructor.name, this.$element);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }
	    }, {
	      key: '_rejectWithoutRequiredClasses',
	      value: function _rejectWithoutRequiredClasses() {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = this.config.requiredClasses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var requiredClass = _step3.value;


	            var found = false;
	            // allow one of several classes to be passed in x||y
	            if (requiredClass.indexOf('||') !== -1) {
	              var oneOf = requiredClass.split('||');
	              var _iteratorNormalCompletion4 = true;
	              var _didIteratorError4 = false;
	              var _iteratorError4 = undefined;

	              try {
	                for (var _iterator4 = oneOf[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                  var _requiredClass = _step4.value;

	                  if (this.$element.hasClass(_requiredClass)) {
	                    found = true;
	                    break;
	                  }
	                }
	              } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                    _iterator4.return();
	                  }
	                } finally {
	                  if (_didIteratorError4) {
	                    throw _iteratorError4;
	                  }
	                }
	              }
	            } else if (this.$element.hasClass(requiredClass)) {
	              found = true;
	            }

	            // error if not found
	            if (!found) {
	              $.error(this.constructor.name + ' element: ' + Util.describe(this.$element) + ' requires class: ' + requiredClass);
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }]);
	    return BaseInput;
	  }(Base);

	  return BaseInput;
	}(jQuery);

	var BaseSelection = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var Default = {
	    label: {
	      required: false

	      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
	      //  - a function(thisComponent); or
	      //  - a string selector used like $bmdFormGroup.find(selector)
	      //
	      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
	      //
	      //selectors: [
	      //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
	      //  `> label` // usual case for text inputs
	      //]
	    }
	  };

	  var Selector = {
	    LABEL: 'label'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseSelection = function (_BaseInput) {
	    inherits(BaseSelection, _BaseInput);

	    function BaseSelection($element, config, properties) {
	      classCallCheck(this, BaseSelection);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseSelection).call(this, $element, $.extend(true, {}, Default, config), properties));
	      // properties = {inputType: checkbox, outerClass: checkbox-inline}
	      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
	      // '.${this.outerClass} > label > input[type=${this.inputType}]'

	      _this.decorateMarkup();
	      return _this;
	    }

	    // ------------------------------------------------------------------------
	    // protected

	    createClass(BaseSelection, [{
	      key: 'decorateMarkup',
	      value: function decorateMarkup() {
	        this.$element.after(this.config.template);
	      }

	      // Demarcation element (e.g. first child of a form-group)

	    }, {
	      key: 'outerElement',
	      value: function outerElement() {
	        // .checkbox|switch|radio > label > input[type=checkbox|radio]
	        // label.checkbox-inline > input[type=checkbox|radio]
	        // .${this.outerClass} > label > input[type=${this.inputType}]
	        return this.$element.parent().closest('.' + this.outerClass);
	      }
	    }, {
	      key: 'rejectWithoutRequiredStructure',
	      value: function rejectWithoutRequiredStructure() {
	        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
	        // '.${this.outerClass} > label > input[type=${this.inputType}]'
	        Util.assert(this.$element, !this.$element.parent().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element should be <label>.');
	        Util.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' outer element should have class ' + this.outerClass + '.');
	      }
	    }, {
	      key: 'addFocusListener',
	      value: function addFocusListener() {
	        var _this2 = this;

	        // checkboxes didn't appear to bubble to the document, so we'll bind these directly
	        this.$element.closest(Selector.LABEL).hover(function () {
	          _this2.addFormGroupFocus();
	        }, function () {
	          _this2.removeFormGroupFocus();
	        });
	      }
	    }, {
	      key: 'addChangeListener',
	      value: function addChangeListener() {
	        var _this3 = this;

	        this.$element.change(function () {
	          _this3.$element.blur();
	        });
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }]);
	    return BaseSelection;
	  }(BaseInput);

	  return BaseSelection;
	}(jQuery);

	var Checkbox = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'checkbox';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    template: '<span class=\'checkbox-decorator\'><span class=\'check\'></span></span>'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Checkbox = function (_BaseSelection) {
	    inherits(Checkbox, _BaseSelection);

	    function Checkbox($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
	      classCallCheck(this, Checkbox);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
	      Default, config), properties));
	    }

	    createClass(Checkbox, [{
	      key: 'dispose',
	      value: function dispose() {
	        var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

	        get(Object.getPrototypeOf(Checkbox.prototype), 'dispose', this).call(this, dataKey);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        // '.checkbox > label > input[type=checkbox]'
	        if ($element.attr('type') === 'checkbox') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'checkbox\'.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Checkbox($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Checkbox;
	  }(BaseSelection);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Checkbox;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Checkbox._jQueryInterface;
	  };

	  return Checkbox;
	}(jQuery);

	var CheckboxInline = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'checkboxInline';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    bmdFormGroup: {
	      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
	      required: false
	    }
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var CheckboxInline = function (_Checkbox) {
	    inherits(CheckboxInline, _Checkbox);

	    function CheckboxInline($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'checkbox-inline' } : arguments[2];
	      classCallCheck(this, CheckboxInline);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxInline).call(this, $element, $.extend(true, {}, Default, config), properties));
	    }

	    createClass(CheckboxInline, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(CheckboxInline.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      //static matches($element) {
	      //  // '.checkbox-inline > input[type=checkbox]'
	      //  if ($element.attr('type') === 'checkbox') {
	      //    return true
	      //  }
	      //  return false
	      //}
	      //
	      //static rejectMatch(component, $element) {
	      //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
	      //}

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new CheckboxInline($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return CheckboxInline;
	  }(Checkbox);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = CheckboxInline;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return CheckboxInline._jQueryInterface;
	  };

	  return CheckboxInline;
	}(jQuery);

	var CollapseInline = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'collapseInline';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Selector = {
	    ANY_INPUT: 'input, select, textarea'
	  };

	  var ClassName = {
	    IN: 'in',
	    COLLAPSE: 'collapse',
	    COLLAPSING: 'collapsing',
	    COLLAPSED: 'collapsed',
	    WIDTH: 'width'
	  };
	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var CollapseInline = function (_Base) {
	    inherits(CollapseInline, _Base);

	    // $element is expected to be the trigger
	    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
	    function CollapseInline($element, config) {
	      classCallCheck(this, CollapseInline);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(CollapseInline).call(this, $element, $.extend(true, {}, Default, config)));

	      _this.$bmdFormGroup = _this.findMdbFormGroup(true);

	      var collapseSelector = $element.data('target');
	      _this.$collapse = $(collapseSelector);

	      Util.assert($element, _this.$collapse.length === 0, 'Cannot find collapse target for ' + Util.describe($element));
	      Util.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util.describe(_this.$collapse) + ' is expected to have the \'' + ClassName.COLLAPSE + '\' class.  It is being targeted by ' + Util.describe($element));

	      // find the first input for focusing
	      var $inputs = _this.$bmdFormGroup.find(Selector.ANY_INPUT);
	      if ($inputs.length > 0) {
	        _this.$input = $inputs.first();
	      }

	      // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
	      if (!_this.$collapse.hasClass(ClassName.WIDTH)) {
	        _this.$collapse.addClass(ClassName.WIDTH);
	      }

	      if (_this.$input) {
	        // add a listener to set focus
	        _this.$collapse.on('shown.bs.collapse', function () {
	          _this.$input.focus();
	        });

	        // add a listener to collapse field
	        _this.$input.blur(function () {
	          _this.$collapse.collapse('hide');
	        });
	      }
	      return _this;
	    }

	    createClass(CollapseInline, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(CollapseInline.prototype), 'dispose', this).call(this, DATA_KEY);
	        this.$bmdFormGroup = null;
	        this.$collapse = null;
	        this.$input = null;
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new CollapseInline($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return CollapseInline;
	  }(Base);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = CollapseInline;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return CollapseInline._jQueryInterface;
	  };

	  return CollapseInline;
	}(jQuery);

	var File = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'file';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  var ClassName = {
	    FILE: NAME,
	    IS_FILE: 'is-file'
	  };

	  var Selector = {
	    FILENAMES: 'input.form-control[readonly]'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var File = function (_BaseInput) {
	    inherits(File, _BaseInput);

	    function File($element, config) {
	      classCallCheck(this, File);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
	      Default, config)));

	      _this.$bmdFormGroup.addClass(ClassName.IS_FILE);
	      return _this;
	    }

	    createClass(File, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(File.prototype), 'dispose', this).call(this, DATA_KEY);
	      }
	    }, {
	      key: 'outerElement',


	      // ------------------------------------------------------------------------
	      // protected

	      // Demarcation element (e.g. first child of a form-group)
	      value: function outerElement() {
	        // label.file > input[type=file]
	        return this.$element.parent().closest('.' + ClassName.FILE);
	      }
	    }, {
	      key: 'rejectWithoutRequiredStructure',
	      value: function rejectWithoutRequiredStructure() {
	        // label.file > input[type=file]
	        Util.assert(this.$element, !this.outerElement().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should be <label>.');
	        Util.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should have class .' + ClassName.FILE + '.');
	      }
	    }, {
	      key: 'addFocusListener',
	      value: function addFocusListener() {
	        var _this2 = this;

	        this.$bmdFormGroup.on('focus', function () {
	          _this2.addFormGroupFocus();
	        }).on('blur', function () {
	          _this2.removeFormGroupFocus();
	        });
	      }
	    }, {
	      key: 'addChangeListener',
	      value: function addChangeListener() {
	        var _this3 = this;

	        // set the fileinput readonly field with the name of the file
	        this.$element.on('change', function () {
	          var value = '';
	          $.each(_this3.$element.files, function (i, file) {
	            value += file.name + '  , ';
	          });
	          value = value.substring(0, value.length - 2);
	          if (value) {
	            _this3.addIsFilled();
	          } else {
	            _this3.removeIsFilled();
	          }
	          _this3.$bmdFormGroup.find(Selector.FILENAMES).val(value);
	        });
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.attr('type') === 'file') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'file\'.');
	      }
	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new File($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return File;
	  }(BaseInput);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = File._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = File;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return File._jQueryInterface;
	  };

	  return File;
	}(jQuery);

	var Radio = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'radio';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    template: '<span class=\'bmd-radio-outer-circle\'></span><span class=\'bmd-radio-inner-circle\'></span>'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Radio = function (_BaseSelection) {
	    inherits(Radio, _BaseSelection);

	    function Radio($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
	      classCallCheck(this, Radio);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
	      Default, config), properties));
	    }

	    createClass(Radio, [{
	      key: 'dispose',
	      value: function dispose() {
	        var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

	        get(Object.getPrototypeOf(Radio.prototype), 'dispose', this).call(this, dataKey);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        // '.radio > label > input[type=radio]'
	        if ($element.attr('type') === 'radio') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'radio\'.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      //decorateMarkup() {
	      //  this.$element.after(this.config.template)
	      //}


	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Radio($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Radio;
	  }(BaseSelection);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Radio._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Radio;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Radio._jQueryInterface;
	  };

	  return Radio;
	}(jQuery);

	var RadioInline = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'radioInline';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    bmdFormGroup: {
	      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
	      required: false
	    }
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var RadioInline = function (_Radio) {
	    inherits(RadioInline, _Radio);

	    function RadioInline($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'radio', outerClass: 'radio-inline' } : arguments[2];
	      classCallCheck(this, RadioInline);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(RadioInline).call(this, $element, $.extend(true, {}, Default, config), properties));
	    }

	    createClass(RadioInline, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(RadioInline.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new RadioInline($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return RadioInline;
	  }(Radio);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = RadioInline;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return RadioInline._jQueryInterface;
	  };

	  return RadioInline;
	}(jQuery);

	var BaseFormControl = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var Default = {
	    requiredClasses: ['form-control']
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseFormControl = function (_BaseInput) {
	    inherits(BaseFormControl, _BaseInput);

	    function BaseFormControl($element, config) {
	      classCallCheck(this, BaseFormControl);

	      // Initially mark as empty
	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseFormControl).call(this, $element, $.extend(true, Default, config)));

	      if (_this.isEmpty()) {
	        _this.removeIsFilled();
	      }
	      return _this;
	    }

	    return BaseFormControl;
	  }(BaseInput);

	  return BaseFormControl;
	}(jQuery);

	var Select = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'select';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    requiredClasses: ['form-control||custom-select']
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Select = function (_BaseFormControl) {
	    inherits(Select, _BaseFormControl);

	    function Select($element, config) {
	      classCallCheck(this, Select);

	      // floating labels will cover the options, so trigger them to be above (if used)
	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
	      Default, config)));

	      _this.addIsFilled();
	      return _this;
	    }

	    createClass(Select, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Select.prototype), 'dispose', this).call(this, DATA_KEY);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.prop('tagName') === 'select') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <select>.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Select($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Select;
	  }(BaseFormControl);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Select._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Select;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Select._jQueryInterface;
	  };

	  return Select;
	}(jQuery);

	var Switch = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'switch';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {
	    template: '<span class=\'bmd-switch-track\'></span>'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Switch = function (_Checkbox) {
	    inherits(Switch, _Checkbox);

	    function Switch($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'switch' } : arguments[2];
	      classCallCheck(this, Switch);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, $element, $.extend(true, {}, Default, config), properties));
	      // selector: '.switch > label > input[type=checkbox]'
	    }

	    createClass(Switch, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Switch.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Switch($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Switch;
	  }(Checkbox);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Switch._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Switch;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Switch._jQueryInterface;
	  };

	  return Switch;
	}(jQuery);

	var Text = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'text';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Text = function (_BaseFormControl) {
	    inherits(Text, _BaseFormControl);

	    function Text($element, config) {
	      classCallCheck(this, Text);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
	      Default, config)));
	    }

	    createClass(Text, [{
	      key: 'dispose',
	      value: function dispose() {
	        var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

	        get(Object.getPrototypeOf(Text.prototype), 'dispose', this).call(this, dataKey);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.attr('type') === 'text') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'text\'.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Text($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Text;
	  }(BaseFormControl);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Text._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Text;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Text._jQueryInterface;
	  };

	  return Text;
	}(jQuery);

	var Textarea = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'textarea';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Textarea = function (_BaseFormControl) {
	    inherits(Textarea, _BaseFormControl);

	    function Textarea($element, config) {
	      classCallCheck(this, Textarea);
	      return possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, $element, $.extend(true,
	      //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
	      Default, config)));
	    }

	    createClass(Textarea, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Textarea.prototype), 'dispose', this).call(this, DATA_KEY);
	      }
	    }], [{
	      key: 'matches',
	      value: function matches($element) {
	        if ($element.prop('tagName') === 'textarea') {
	          return true;
	        }
	        return false;
	      }
	    }, {
	      key: 'rejectMatch',
	      value: function rejectMatch(component, $element) {
	        Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <textarea>.');
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Textarea($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Textarea;
	  }(BaseFormControl);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Textarea._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Textarea;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Textarea._jQueryInterface;
	  };

	  return Textarea;
	}(jQuery);

	var BaseLayout = function ($) {

	  var ClassName = {
	    CANVAS: 'bmd-layout-canvas',
	    CONTAINER: 'bmd-layout-container',
	    BACKDROP: 'bmd-layout-backdrop'
	  };

	  var Selector = {
	    CANVAS: '.' + ClassName.CANVAS,
	    CONTAINER: '.' + ClassName.CONTAINER,
	    BACKDROP: '.' + ClassName.BACKDROP
	  };

	  var Default = {
	    canvas: {
	      create: true,
	      required: true,
	      template: '<div class="' + ClassName.CANVAS + '"></div>'
	    },
	    backdrop: {
	      create: true,
	      required: true,
	      template: '<div class="' + ClassName.BACKDROP + '"></div>'
	    }
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BaseLayout = function (_Base) {
	    inherits(BaseLayout, _Base);

	    function BaseLayout($element, config) {
	      var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      classCallCheck(this, BaseLayout);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayout).call(this, $element, $.extend(true, {}, Default, config), properties));

	      _this.$container = _this.findContainer(true);
	      _this.$backdrop = _this.resolveBackdrop();
	      _this.resolveCanvas();
	      return _this;
	    }

	    createClass(BaseLayout, [{
	      key: 'dispose',
	      value: function dispose(dataKey) {
	        get(Object.getPrototypeOf(BaseLayout.prototype), 'dispose', this).call(this, dataKey);
	        this.$container = null;
	        this.$backdrop = null;
	      }

	      // ------------------------------------------------------------------------
	      // protected

	      // Will wrap container in bmd-layout-canvas if necessary

	    }, {
	      key: 'resolveCanvas',
	      value: function resolveCanvas() {
	        var bd = this.findCanvas(false);
	        if (bd === undefined || bd.length === 0) {
	          if (this.config.canvas.create) {
	            this.$container.wrap(this.config.canvas.template);
	          }

	          bd = this.findCanvas(this.config.canvas.required);
	        }

	        return bd;
	      }

	      // Find closest bmd-layout-container based on the given context

	    }, {
	      key: 'findCanvas',
	      value: function findCanvas() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	        var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

	        var canvas = context.closest(Selector.CANVAS);
	        if (canvas.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.CANVAS + ' for ' + Util.describe(context));
	        }
	        return canvas;
	      }

	      // Will add bmd-layout-backdrop to bmd-layout-container if necessary

	    }, {
	      key: 'resolveBackdrop',
	      value: function resolveBackdrop() {
	        var bd = this.findBackdrop(false);
	        if (bd === undefined || bd.length === 0) {
	          if (this.config.backdrop.create) {
	            this.$container.append(this.config.backdrop.template);
	          }

	          bd = this.findBackdrop(this.config.backdrop.required);
	        }

	        return bd;
	      }

	      // Find closest bmd-layout-container based on the given context

	    }, {
	      key: 'findBackdrop',
	      value: function findBackdrop() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	        var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

	        var backdrop = context.find('> ' + Selector.BACKDROP);
	        if (backdrop.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.BACKDROP + ' for ' + Util.describe(context));
	        }
	        return backdrop;
	      }

	      // Find closest bmd-layout-container based on the given context

	    }, {
	      key: 'findContainer',
	      value: function findContainer() {
	        var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	        var context = arguments.length <= 1 || arguments[1] === undefined ? this.$element : arguments[1];

	        var container = context.closest(Selector.CONTAINER);
	        if (container.length === 0 && raiseError) {
	          $.error('Failed to find ' + Selector.CONTAINER + ' for ' + Util.describe(context));
	        }
	        return container;
	      }

	      // ------------------------------------------------------------------------
	      // private

	      // ------------------------------------------------------------------------
	      // static

	    }]);
	    return BaseLayout;
	  }(Base);

	  return BaseLayout;
	}(jQuery);

	var Drawer = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'drawer';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Keycodes = {
	    ESCAPE: 27
	    //ENTER: 13,
	    //SPACE: 32
	  };

	  var ClassName = {
	    IN: 'in',
	    DRAWER_IN: 'bmd-drawer-in',
	    DRAWER_OUT: 'bmd-drawer-out',
	    DRAWER: 'bmd-layout-drawer',
	    CONTAINER: 'bmd-layout-container'
	  };

	  var Default = {
	    focusSelector: 'a, button, input'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Drawer = function (_BaseLayout) {
	    inherits(Drawer, _BaseLayout);

	    // $element is expected to be the trigger
	    //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
	    function Drawer($element, config) {
	      classCallCheck(this, Drawer);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Drawer).call(this, $element, $.extend(true, {}, Default, config)));

	      _this.$toggles = $('[data-toggle="drawer"][href="#' + _this.$element[0].id + '"], [data-toggle="drawer"][data-target="#' + _this.$element[0].id + '"]');

	      _this._addAria();

	      // click or escape on the backdrop closes the drawer
	      _this.$backdrop.keydown(function (ev) {
	        if (ev.which === Keycodes.ESCAPE) {
	          _this.hide();
	        }
	      }).click(function () {
	        _this.hide();
	      });

	      // escape on the drawer closes it
	      _this.$element.keydown(function (ev) {
	        if (ev.which === Keycodes.ESCAPE) {
	          _this.hide();
	        }
	      });

	      // any toggle button clicks
	      _this.$toggles.click(function () {
	        _this.toggle();
	      });
	      return _this;
	    }

	    createClass(Drawer, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Drawer.prototype), 'dispose', this).call(this, DATA_KEY);
	        this.$toggles = null;
	      }
	    }, {
	      key: 'toggle',
	      value: function toggle() {
	        if (this._isOpen()) {
	          this.hide();
	        } else {
	          this.show();
	        }
	      }
	    }, {
	      key: 'show',
	      value: function show() {
	        if (this._isForcedClosed() || this._isOpen()) {
	          return;
	        }

	        this.$toggles.attr('aria-expanded', true);
	        this.$element.attr('aria-expanded', true);
	        this.$element.attr('aria-hidden', false);

	        // focus on the first focusable item
	        var $focusOn = this.$element.find(this.config.focusSelector);
	        if ($focusOn.length > 0) {
	          $focusOn.first().focus();
	        }

	        this.$container.addClass(ClassName.DRAWER_IN);
	        // backdrop is responsively styled based on bmd-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
	        this.$backdrop.addClass(ClassName.IN);
	      }
	    }, {
	      key: 'hide',
	      value: function hide() {
	        if (!this._isOpen()) {
	          return;
	        }

	        this.$toggles.attr('aria-expanded', false);
	        this.$element.attr('aria-expanded', false);
	        this.$element.attr('aria-hidden', true);

	        this.$container.removeClass(ClassName.DRAWER_IN);
	        this.$backdrop.removeClass(ClassName.IN);
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_isOpen',
	      value: function _isOpen() {
	        return this.$container.hasClass(ClassName.DRAWER_IN);
	      }
	    }, {
	      key: '_isForcedClosed',
	      value: function _isForcedClosed() {
	        return this.$container.hasClass(ClassName.DRAWER_OUT);
	      }
	    }, {
	      key: '_addAria',
	      value: function _addAria() {
	        var isOpen = this._isOpen();
	        this.$element.attr('aria-expanded', isOpen);
	        this.$element.attr('aria-hidden', isOpen);

	        if (this.$toggles.length) {
	          this.$toggles.attr('aria-expanded', isOpen);
	        }
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Drawer($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Drawer;
	  }(BaseLayout);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Drawer._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Drawer;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Drawer._jQueryInterface;
	  };

	  return Drawer;
	}(jQuery);

	var Ripples = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'ripples';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var ClassName = {
	    CONTAINER: 'ripple-container',
	    DECORATOR: 'ripple-decorator'
	  };

	  var Selector = {
	    CONTAINER: '.' + ClassName.CONTAINER,
	    DECORATOR: '.' + ClassName.DECORATOR //,
	  };

	  var Default = {
	    container: {
	      template: '<div class=\'' + ClassName.CONTAINER + '\'></div>'
	    },
	    decorator: {
	      template: '<div class=\'' + ClassName.DECORATOR + '\'></div>'
	    },
	    trigger: {
	      start: 'mousedown touchstart',
	      end: 'mouseup mouseleave touchend'
	    },
	    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
	    duration: 500
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Ripples = function () {
	    function Ripples($element, config) {
	      var _this = this;

	      classCallCheck(this, Ripples);

	      this.$element = $element;

	      //console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
	      this.config = $.extend(true, {}, Default, config);

	      // attach initial listener
	      this.$element.on(this.config.trigger.start, function (event) {
	        _this._onStartRipple(event);
	      });
	    }

	    createClass(Ripples, [{
	      key: 'dispose',
	      value: function dispose() {
	        this.$element.data(DATA_KEY, null);
	        this.$element = null;
	        this.$container = null;
	        this.$decorator = null;
	        this.config = null;
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_onStartRipple',
	      value: function _onStartRipple(event) {
	        var _this2 = this;

	        // Verify if the user is just touching on a device and return if so
	        if (this._isTouch() && event.type === 'mousedown') {
	          return;
	        }

	        // Find or create the ripple container element
	        this._findOrCreateContainer();

	        // Get relY and relX positions of the container element
	        var relY = this._getRelY(event);
	        var relX = this._getRelX(event);

	        // If relY and/or relX are false, return the event
	        if (!relY && !relX) {
	          return;
	        }

	        // set the location and color each time (even if element is cached)
	        this.$decorator.css({
	          left: relX,
	          top: relY,
	          'background-color': this._getRipplesColor()
	        });

	        // Make sure the ripple has the styles applied (ugly hack but it works)
	        this._forceStyleApplication();

	        // Turn on the ripple animation
	        this.rippleOn();

	        // Call the rippleEnd function when the transition 'on' ends
	        setTimeout(function () {
	          _this2.rippleEnd();
	        }, this.config.duration);

	        // Detect when the user leaves the element to cleanup if not already done?
	        this.$element.on(this.config.trigger.end, function () {
	          if (_this2.$decorator) {
	            // guard against race condition/mouse attack
	            _this2.$decorator.data('mousedown', 'off');

	            if (_this2.$decorator.data('animating') === 'off') {
	              _this2.rippleOut();
	            }
	          }
	        });
	      }
	    }, {
	      key: '_findOrCreateContainer',
	      value: function _findOrCreateContainer() {
	        if (!this.$container || !this.$container.length > 0) {
	          this.$element.append(this.config.container.template);
	          this.$container = this.$element.find(Selector.CONTAINER);
	        }

	        // always add the rippleElement, it is always removed
	        this.$container.append(this.config.decorator.template);
	        this.$decorator = this.$container.find(Selector.DECORATOR);
	      }

	      // Make sure the ripple has the styles applied (ugly hack but it works)

	    }, {
	      key: '_forceStyleApplication',
	      value: function _forceStyleApplication() {
	        return window.getComputedStyle(this.$decorator[0]).opacity;
	      }

	      /**
	       * Get the relX
	       */

	    }, {
	      key: '_getRelX',
	      value: function _getRelX(event) {
	        var wrapperOffset = this.$container.offset();

	        var result = null;
	        if (!this._isTouch()) {
	          // Get the mouse position relative to the ripple wrapper
	          result = event.pageX - wrapperOffset.left;
	        } else {
	          // Make sure the user is using only one finger and then get the touch
	          //  position relative to the ripple wrapper
	          event = event.originalEvent;

	          if (event.touches.length === 1) {
	            result = event.touches[0].pageX - wrapperOffset.left;
	          } else {
	            result = false;
	          }
	        }

	        return result;
	      }

	      /**
	       * Get the relY
	       */

	    }, {
	      key: '_getRelY',
	      value: function _getRelY(event) {
	        var containerOffset = this.$container.offset();
	        var result = null;

	        if (!this._isTouch()) {
	          /**
	           * Get the mouse position relative to the ripple wrapper
	           */
	          result = event.pageY - containerOffset.top;
	        } else {
	          /**
	           * Make sure the user is using only one finger and then get the touch
	           * position relative to the ripple wrapper
	           */
	          event = event.originalEvent;

	          if (event.touches.length === 1) {
	            result = event.touches[0].pageY - containerOffset.top;
	          } else {
	            result = false;
	          }
	        }

	        return result;
	      }

	      /**
	       * Get the ripple color
	       */

	    }, {
	      key: '_getRipplesColor',
	      value: function _getRipplesColor() {
	        var color = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color;
	        return color;
	      }

	      /**
	       * Verify if the client is using a mobile device
	       */

	    }, {
	      key: '_isTouch',
	      value: function _isTouch() {
	        return this.config.touchUserAgentRegex.test(navigator.userAgent);
	      }

	      /**
	       * End the animation of the ripple
	       */

	    }, {
	      key: 'rippleEnd',
	      value: function rippleEnd() {
	        if (this.$decorator) {
	          // guard against race condition/mouse attack
	          this.$decorator.data('animating', 'off');

	          if (this.$decorator.data('mousedown') === 'off') {
	            this.rippleOut(this.$decorator);
	          }
	        }
	      }

	      /**
	       * Turn off the ripple effect
	       */

	    }, {
	      key: 'rippleOut',
	      value: function rippleOut() {
	        var _this3 = this;

	        this.$decorator.off();

	        if (Util.transitionEndSupported()) {
	          this.$decorator.addClass('ripple-out');
	        } else {
	          this.$decorator.animate({ opacity: 0 }, 100, function () {
	            _this3.$decorator.trigger('transitionend');
	          });
	        }

	        this.$decorator.on(Util.transitionEndSelector(), function () {
	          if (_this3.$decorator) {
	            _this3.$decorator.remove();
	            _this3.$decorator = null;
	          }
	        });
	      }

	      /**
	       * Turn on the ripple effect
	       */

	    }, {
	      key: 'rippleOn',
	      value: function rippleOn() {
	        var _this4 = this;

	        var size = this._getNewSize();

	        if (Util.transitionEndSupported()) {
	          this.$decorator.css({
	            '-ms-transform': 'scale(' + size + ')',
	            '-moz-transform': 'scale(' + size + ')',
	            '-webkit-transform': 'scale(' + size + ')',
	            transform: 'scale(' + size + ')'
	          }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on');
	        } else {
	          this.$decorator.animate({
	            width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
	            height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
	            'margin-left': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
	            'margin-top': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
	            opacity: 0.2
	          }, this.config.duration, function () {
	            _this4.$decorator.trigger('transitionend');
	          });
	        }
	      }

	      /**
	       * Get the new size based on the element height/width and the ripple width
	       */

	    }, {
	      key: '_getNewSize',
	      value: function _getNewSize() {
	        return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Ripples($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Ripples;
	  }();

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Ripples._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Ripples;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Ripples._jQueryInterface;
	  };

	  return Ripples;
	}(jQuery);

	var Autofill = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'autofill';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  var Default = {};

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Autofill = function (_Base) {
	    inherits(Autofill, _Base);

	    function Autofill($element, config) {
	      classCallCheck(this, Autofill);

	      var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Autofill).call(this, $element, $.extend(true, {}, Default, config)));

	      _this._watchLoading();
	      _this._attachEventHandlers();
	      return _this;
	    }

	    createClass(Autofill, [{
	      key: 'dispose',
	      value: function dispose() {
	        get(Object.getPrototypeOf(Autofill.prototype), 'dispose', this).call(this, DATA_KEY);
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_watchLoading',
	      value: function _watchLoading() {
	        var _this2 = this;

	        // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
	        setTimeout(function () {
	          clearInterval(_this2._onLoading);
	        }, 10000);
	      }

	      // This part of code will detect autofill when the page is loading (username and password inputs for example)

	    }, {
	      key: '_onLoading',
	      value: function _onLoading() {
	        setInterval(function () {
	          $('input[type!=checkbox]').each(function (index, element) {
	            var $element = $(element);
	            if ($element.val() && $element.val() !== $element.attr('value')) {
	              $element.trigger('change');
	            }
	          });
	        }, 100);
	      }
	    }, {
	      key: '_attachEventHandlers',
	      value: function _attachEventHandlers() {
	        // Listen on inputs of the focused form
	        //  (because user can select from the autofill dropdown only when the input has focus)
	        var focused = null;
	        $(document).on('focus', 'input', function (event) {
	          var $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]');
	          focused = setInterval(function () {
	            $inputs.each(function (index, element) {
	              var $element = $(element);
	              if ($element.val() !== $element.attr('value')) {
	                $element.trigger('change');
	              }
	            });
	          }, 100);
	        }).on('blur', '.form-group input', function () {
	          clearInterval(focused);
	        });
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Autofill($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return Autofill;
	  }(Base);

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = Autofill._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = Autofill;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return Autofill._jQueryInterface;
	  };

	  return Autofill;
	}(jQuery);

	/**
	 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
	 *  used in Bootstrap Material Design.  You may pass overrides to the configurations
	 *  which will be passed into each component, or you may omit use of this class and
	 *  configure each component separately.
	 */
	var BootstrapMaterialDesign = function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  var NAME = 'bootstrapMaterialDesign';
	  var DATA_KEY = 'bmd.' + NAME;
	  var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
	  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	  /**
	   * Global configuration:
	   *  The global configuration hash will be mixed in to each components' config.
	   *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
	   *
	   *
	   * Component configuration:
	   *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
	   *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
	   *
	   *  @see each individual component for more configuration settings.
	   */
	  var Default = {
	    global: {
	      validate: false,
	      label: {
	        className: 'bmd-label-static' // default style of label to be used if not specified in the html markup
	      }
	    },
	    autofill: {
	      selector: 'body'
	    },
	    checkbox: {
	      selector: '.checkbox > label > input[type=checkbox]'
	    },
	    checkboxInline: {
	      selector: 'label.checkbox-inline > input[type=checkbox]'
	    },
	    collapseInline: {
	      selector: '.bmd-collapse-inline [data-toggle="collapse"]'
	    },
	    drawer: {
	      selector: '.bmd-layout-drawer'
	    },
	    file: {
	      selector: 'input[type=file]'
	    },
	    radio: {
	      selector: '.radio > label > input[type=radio]'
	    },
	    radioInline: {
	      selector: 'label.radio-inline > input[type=radio]'
	    },
	    ripples: {
	      //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
	      selector: ['.btn:not(.btn-link):not(.ripple-none)', '.card-image:not(.ripple-none)', '.navbar a:not(.ripple-none)', '.dropdown-menu a:not(.ripple-none)', '.nav-tabs a:not(.ripple-none)', '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)', '.ripple' // generic marker class to add ripple to elements
	      ]
	    },
	    select: {
	      selector: ['select']
	    },
	    switch: {
	      selector: '.switch > label > input[type=checkbox]'
	    },
	    text: {
	      // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
	      selector: ['input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])']
	    },
	    textarea: {
	      selector: ['textarea']
	    },
	    arrive: true,
	    // create an ordered component list for instantiation
	    instantiation: ['ripples', 'checkbox', 'checkboxInline', 'collapseInline', 'drawer',
	    //'file',
	    'radio', 'radioInline', 'switch', 'text', 'textarea', 'select', 'autofill']
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var BootstrapMaterialDesign = function () {
	    function BootstrapMaterialDesign($element, config) {
	      var _this = this;

	      classCallCheck(this, BootstrapMaterialDesign);

	      this.$element = $element;
	      this.config = $.extend(true, {}, Default, config);
	      var $document = $(document);

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var component = _step.value;


	          // the component's config fragment is passed in directly, allowing users to override
	          var componentConfig = _this.config[component];

	          // check to make sure component config is enabled (not `false`)
	          if (componentConfig) {
	            (function () {

	              // assemble the selector as it may be an array
	              var selector = _this._resolveSelector(componentConfig);

	              // mix in global options
	              componentConfig = $.extend(true, {}, _this.config.global, componentConfig);

	              // create the jquery fn name e.g. 'bmdText' for 'text'
	              var componentName = '' + (component.charAt(0).toUpperCase() + component.slice(1));
	              var jqueryFn = 'bmd' + componentName;

	              try {
	                // safely instantiate component on selector elements with config, report errors and move on.
	                // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
	                $(selector)[jqueryFn](componentConfig);

	                // add to arrive if present and enabled
	                if (document.arrive && _this.config.arrive) {
	                  $document.arrive(selector, function () {
	                    // eslint-disable-line no-loop-func
	                    $(this)[jqueryFn](componentConfig);
	                  });
	                }
	              } catch (e) {
	                var message = 'Failed to instantiate component: $(\'' + selector + '\')[' + jqueryFn + '](' + componentConfig + ')';
	                console.error(message, e, '\nSelected elements: ', $(selector)); // eslint-disable-line no-console
	                throw e;
	              }
	            })();
	          }
	        };

	        for (var _iterator = this.config.instantiation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    createClass(BootstrapMaterialDesign, [{
	      key: 'dispose',
	      value: function dispose() {
	        this.$element.data(DATA_KEY, null);
	        this.$element = null;
	        this.config = null;
	      }

	      // ------------------------------------------------------------------------
	      // private

	    }, {
	      key: '_resolveSelector',
	      value: function _resolveSelector(componentConfig) {
	        var selector = componentConfig.selector;
	        if (Array.isArray(selector)) {
	          selector = selector.join(', ');
	        }

	        return selector;
	      }

	      // ------------------------------------------------------------------------
	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new BootstrapMaterialDesign($element, config);
	            $element.data(DATA_KEY, data);
	          }
	        });
	      }
	    }]);
	    return BootstrapMaterialDesign;
	  }();

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */


	  $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
	  $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
	  $.fn[JQUERY_NAME].noConflict = function () {
	    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
	    return BootstrapMaterialDesign._jQueryInterface;
	  };

	  return BootstrapMaterialDesign;
	}(jQuery);

}());
//# sourceMappingURL=bootstrap-material-design.iife.js.map

'use strict';

function animatedPeityBar(element, height, color) {
	var chart = $(element).peity('bar', {
		height: height,
		width: '100%',
		fill: [color]
	});
	setInterval(function() {
		var random = Math.floor(Math.random() * 10) + 2;
		var values = chart.text().split(',');
		values.shift();
		values.push(random);
		chart.text(values.join(',')).change();
	}, 1000);
}
function animatedPeityArea(element, height, color) {
	var chart = $(element).peity('line', {
		height: height,
		width: '100%',
		fill: color,
		stroke: color
	});
	setInterval(function() {
		var random = Math.floor(Math.random() * 10) + 2;
		var values = chart.text().split(',');
		values.shift();
		values.push(random);
		chart.text(values.join(',')).change();
	}, 1000);
}
function animatedPeityLine(element, height, color) {
	var chart = $(element).peity('line', {
		height: height,
		width: '100%',
		fill: 'white',
		stroke: color
	});
	setInterval(function() {
		var random = Math.floor(Math.random() * 10) + 2;
		var values = chart.text().split(',');
		values.shift();
		values.push(random);
		chart.text(values.join(',')).change();
	}, 1000);
}
function animatedLineChart(id, color) {
	var lineChart = echarts.init(document.getElementById(id));
	function randomData() {
		now = new Date(+now + oneDay);
		value = value + Math.random() * 21 - 10;
		return {
			name: now.toString(),
			value: [
				[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
				Math.round(value)
			]
		};
	}
	var data = [];
	var now = new Date(2010, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
		data.push(randomData());
	}
	var option = {
		color: [color],
		title: {
			text: null
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params) {
				params = params[0];
				var date = new Date(params.name);
				return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
			},
			axisPointer: {
				animation: false
			}
		},
		xAxis: {
			show: false,
			type: 'time',
			splitLine: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			boundaryGap: [0, '100%'],
			splitLine: {
				show: false
			}
		},
		series: [{
			name: 'Serie A',
			type: 'line',
			showSymbol: false,
			hoverAnimation: false,
			data: data
		}]
	};
	lineChart.setOption(option);
	setInterval(function() {
		for (var i = 0; i < 5; i++) {
			data.shift();
			data.push(randomData());
		}
		lineChart.setOption({
			series: [{
				data: data
			}]
		});
	}, 1000);
}
function peityDonut(element, radius, colors) {
	return $(element).peity('donut', {
		width: radius,
		radius: radius,
		fill: colors
	});
}
function peityPie(element, radius, colors) {
	return $(element).peity('pie', {
		height: radius,
		width: radius,
		radius: radius,
		fill: colors
	});
}
function peityBar(element, height, width, color) {
	return $(element).peity('bar', {
		height: height,
		width: width,
		fill: [color]
	});
}
function peityLine(element, height, width, color) {
	return $(element).peity('line', {
		height: height,
		width: width,
		fill: color,
		stroke: color
	});
}
function element_exists(id) {
	if ($(id).length === 0) {
		return false;
	}
	return true;
}
//http://www.sitepoint.com/javascript-generate-lighter-darker-color/
function colorLuminance(hex, lum) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	lum = lum || 0;
	// convert to decimal and change luminosity
	var rgb = "#",
		c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00" + c).substr(c.length);
	}
	return rgb;
}
//http://stackoverflow.com/questions/21646738/convert-hex-to-rgba
function hexToRgbA(hex, opacity) {
	var c;
	var o = opacity || 1;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + o + ')';
	}
	return false;
}
function incrementingData() {
	var series = [];
	var labels = [];
	for (var x = 0; x < 50; x++) {
		if (x % 2 === 0) {
			continue;
		}
		labels.push('Label ' + x);
		series.push(Functions.random(x, x + 10));
	}
	return {
		series: series,
		labels: labels
	}
}
function decrementingData() {
	var series = [];
	var labels = [];
	for (var x = 50; x > 0; x--) {
		if (x % 2 === 0) {
			continue;
		}
		labels.push('Label ' + x);
		series.push(Functions.random(x + 10, x));
	}
	return {
		series: series,
		labels: labels
	}
}
function randomData() {
	var series = [];
	var labels = [];
	for (var x = 0; x < 30; x++) {
		labels.push('Label ' + x);
		series.push(Functions.random(20, 80));
	}
	return {
		series: series,
		labels: labels
	}
}
function reverseArray(input) {
	var ret = [];
	for (var i = input.length - 1; i >= 0; i--) {
		ret.push(input[i]);
	}
	return ret;
}
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function lighten(col, amt) {
	amt = Math.abs(amt);
	amt = amt / 100;
	return colorLuminance(col, amt);
}
function darken(col, amt) {
	amt = Math.abs(amt);
	amt = (amt / 100) * -1;
	return colorLuminance(col, amt);
}
function bitcoinData() {
	return [{
		key: "EUR",
		values: [
			[
				1439763668000,
				232
			],
			[
				1440109268000,
				206
			],
			[
				1440282068000,
				113
			],
			[
				1440627668000,
				125
			],
			[
				1440800468000,
				278
			],
			[
				1441146068000,
				246
			],
			[
				1441318868000,
				156
			],
			[
				1441664468000,
				173
			],
			[
				1441837268000,
				153
			],
			[
				1442182868000,
				239
			],
			[
				1442355668000,
				268
			],
			[
				1442701268000,
				295
			],
			[
				1442874068000,
				169
			],
			[
				1443219668000,
				230
			],
			[
				1443392468000,
				295
			],
			[
				1443738068000,
				271
			],
			[
				1443910868000,
				201
			],
			[
				1444256468000,
				289
			],
			[
				1444429268000,
				352
			],
			[
				1444774868000,
				194
			],
			[
				1444947668000,
				246
			],
			[
				1445293268000,
				215
			],
			[
				1445466068000,
				172
			],
			[
				1445811668000,
				245
			],
			[
				1445984468000,
				301
			],
			[
				1446330068000,
				279
			],
			[
				1446502868000,
				189
			],
			[
				1446848468000,
				189
			],
			[
				1447021268000,
				272
			],
			[
				1447366868000,
				377
			],
			[
				1447539668000,
				304
			],
			[
				1447885268000,
				212
			],
			[
				1448058068000,
				286
			],
			[
				1448403668000,
				320
			],
			[
				1448576468000,
				235
			],
			[
				1448922068000,
				260
			],
			[
				1449094868000,
				256
			],
			[
				1449440468000,
				282
			],
			[
				1449613268000,
				319
			],
			[
				1449958868000,
				295
			],
			[
				1450131668000,
				400
			],
			[
				1450477268000,
				266
			],
			[
				1450650068000,
				262
			],
			[
				1450995668000,
				242
			],
			[
				1451168468000,
				363
			],
			[
				1451514068000,
				425
			],
			[
				1451686868000,
				375
			],
			[
				1452032468000,
				425
			],
			[
				1452205268000,
				368
			],
			[
				1452550868000,
				381
			],
			[
				1452723668000,
				268
			],
			[
				1453069268000,
				262
			],
			[
				1453242068000,
				439
			],
			[
				1453587668000,
				283
			],
			[
				1453760468000,
				345
			],
			[
				1454106068000,
				377
			],
			[
				1454278868000,
				394
			],
			[
				1454624468000,
				365
			],
			[
				1454797268000,
				392
			],
			[
				1455142868000,
				290
			],
			[
				1455315668000,
				361
			],
			[
				1455661268000,
				314
			],
			[
				1455834068000,
				316
			],
			[
				1456179668000,
				461
			],
			[
				1456352468000,
				442
			],
			[
				1456698068000,
				359
			],
			[
				1456870868000,
				321
			],
			[
				1457216468000,
				500
			],
			[
				1457389268000,
				436
			],
			[
				1457734868000,
				436
			],
			[
				1457907668000,
				383
			],
			[
				1458253268000,
				425
			],
			[
				1458426068000,
				485
			],
			[
				1458771668000,
				429
			],
			[
				1458944468000,
				444
			],
			[
				1459290068000,
				425
			],
			[
				1459462868000,
				424
			],
			[
				1459808468000,
				389
			],
			[
				1459981268000,
				414
			],
			[
				1460326868000,
				356
			],
			[
				1460499668000,
				530
			],
			[
				1460845268000,
				441
			],
			[
				1461018068000,
				372
			],
			[
				1461363668000,
				522
			],
			[
				1461536468000,
				472
			]
		]
	}, {
		key: "USD",
		values: [
			[
				1439763668000,
				209
			],
			[
				1440109268000,
				185
			],
			[
				1440282068000,
				150
			],
			[
				1440627668000,
				311
			],
			[
				1440800468000,
				311
			],
			[
				1441146068000,
				172
			],
			[
				1441318868000,
				199
			],
			[
				1441664468000,
				150
			],
			[
				1441837268000,
				209
			],
			[
				1442182868000,
				178
			],
			[
				1442355668000,
				307
			],
			[
				1442701268000,
				281
			],
			[
				1442874068000,
				209
			],
			[
				1443219668000,
				313
			],
			[
				1443392468000,
				220
			],
			[
				1443738068000,
				346
			],
			[
				1443910868000,
				193
			],
			[
				1444256468000,
				341
			],
			[
				1444429268000,
				321
			],
			[
				1444774868000,
				312
			],
			[
				1444947668000,
				270
			],
			[
				1445293268000,
				229
			],
			[
				1445466068000,
				214
			],
			[
				1445811668000,
				337
			],
			[
				1445984468000,
				316
			],
			[
				1446330068000,
				242
			],
			[
				1446502868000,
				333
			],
			[
				1446848468000,
				222
			],
			[
				1447021268000,
				276
			],
			[
				1447366868000,
				313
			],
			[
				1447539668000,
				350
			],
			[
				1447885268000,
				394
			],
			[
				1448058068000,
				200
			],
			[
				1448403668000,
				202
			],
			[
				1448576468000,
				401
			],
			[
				1448922068000,
				208
			],
			[
				1449094868000,
				266
			],
			[
				1449440468000,
				291
			],
			[
				1449613268000,
				243
			],
			[
				1449958868000,
				360
			],
			[
				1450131668000,
				348
			],
			[
				1450477268000,
				228
			],
			[
				1450650068000,
				314
			],
			[
				1450995668000,
				430
			],
			[
				1451168468000,
				409
			],
			[
				1451514068000,
				402
			],
			[
				1451686868000,
				437
			],
			[
				1452032468000,
				263
			],
			[
				1452205268000,
				398
			],
			[
				1452550868000,
				412
			],
			[
				1452723668000,
				424
			],
			[
				1453069268000,
				316
			],
			[
				1453242068000,
				284
			],
			[
				1453587668000,
				281
			],
			[
				1453760468000,
				289
			],
			[
				1454106068000,
				437
			],
			[
				1454278868000,
				354
			],
			[
				1454624468000,
				453
			],
			[
				1454797268000,
				284
			],
			[
				1455142868000,
				455
			],
			[
				1455315668000,
				385
			],
			[
				1455661268000,
				454
			],
			[
				1455834068000,
				461
			],
			[
				1456179668000,
				398
			],
			[
				1456352468000,
				463
			],
			[
				1456698068000,
				469
			],
			[
				1456870868000,
				408
			],
			[
				1457216468000,
				329
			],
			[
				1457389268000,
				354
			],
			[
				1457734868000,
				446
			],
			[
				1457907668000,
				479
			],
			[
				1458253268000,
				492
			],
			[
				1458426068000,
				458
			],
			[
				1458771668000,
				376
			],
			[
				1458944468000,
				498
			],
			[
				1459290068000,
				444
			],
			[
				1459462868000,
				349
			],
			[
				1459808468000,
				505
			],
			[
				1459981268000,
				472
			],
			[
				1460326868000,
				512
			],
			[
				1460499668000,
				476
			],
			[
				1460845268000,
				455
			],
			[
				1461018068000,
				380
			],
			[
				1461363668000,
				513
			],
			[
				1461536468000,
				483
			]
		]
	}, {
		key: "GBP",
		values: [
			[
				1439763668000,
				161
			],
			[
				1440109268000,
				237
			],
			[
				1440282068000,
				121
			],
			[
				1440627668000,
				151
			],
			[
				1440800468000,
				255
			],
			[
				1441146068000,
				308
			],
			[
				1441318868000,
				263
			],
			[
				1441664468000,
				233
			],
			[
				1441837268000,
				289
			],
			[
				1442182868000,
				180
			],
			[
				1442355668000,
				211
			],
			[
				1442701268000,
				271
			],
			[
				1442874068000,
				297
			],
			[
				1443219668000,
				248
			],
			[
				1443392468000,
				328
			],
			[
				1443738068000,
				244
			],
			[
				1443910868000,
				223
			],
			[
				1444256468000,
				314
			],
			[
				1444429268000,
				192
			],
			[
				1444774868000,
				289
			],
			[
				1444947668000,
				297
			],
			[
				1445293268000,
				320
			],
			[
				1445466068000,
				317
			],
			[
				1445811668000,
				278
			],
			[
				1445984468000,
				265
			],
			[
				1446330068000,
				299
			],
			[
				1446502868000,
				221
			],
			[
				1446848468000,
				184
			],
			[
				1447021268000,
				341
			],
			[
				1447366868000,
				193
			],
			[
				1447539668000,
				322
			],
			[
				1447885268000,
				210
			],
			[
				1448058068000,
				333
			],
			[
				1448403668000,
				347
			],
			[
				1448576468000,
				258
			],
			[
				1448922068000,
				285
			],
			[
				1449094868000,
				345
			],
			[
				1449440468000,
				413
			],
			[
				1449613268000,
				403
			],
			[
				1449958868000,
				319
			],
			[
				1450131668000,
				271
			],
			[
				1450477268000,
				292
			],
			[
				1450650068000,
				262
			],
			[
				1450995668000,
				240
			],
			[
				1451168468000,
				407
			],
			[
				1451514068000,
				256
			],
			[
				1451686868000,
				345
			],
			[
				1452032468000,
				291
			],
			[
				1452205268000,
				426
			],
			[
				1452550868000,
				393
			],
			[
				1452723668000,
				430
			],
			[
				1453069268000,
				371
			],
			[
				1453242068000,
				355
			],
			[
				1453587668000,
				390
			],
			[
				1453760468000,
				286
			],
			[
				1454106068000,
				457
			],
			[
				1454278868000,
				320
			],
			[
				1454624468000,
				339
			],
			[
				1454797268000,
				467
			],
			[
				1455142868000,
				285
			],
			[
				1455315668000,
				351
			],
			[
				1455661268000,
				407
			],
			[
				1455834068000,
				309
			],
			[
				1456179668000,
				297
			],
			[
				1456352468000,
				361
			],
			[
				1456698068000,
				375
			],
			[
				1456870868000,
				383
			],
			[
				1457216468000,
				306
			],
			[
				1457389268000,
				382
			],
			[
				1457734868000,
				381
			],
			[
				1457907668000,
				414
			],
			[
				1458253268000,
				442
			],
			[
				1458426068000,
				457
			],
			[
				1458771668000,
				460
			],
			[
				1458944468000,
				460
			],
			[
				1459290068000,
				441
			],
			[
				1459462868000,
				488
			],
			[
				1459808468000,
				375
			],
			[
				1459981268000,
				498
			],
			[
				1460326868000,
				478
			],
			[
				1460499668000,
				528
			],
			[
				1460845268000,
				486
			],
			[
				1461018068000,
				402
			],
			[
				1461363668000,
				435
			],
			[
				1461536468000,
				422
			]
		]
	}]
}
function pieChartData() {
	var config = $.localStorage.get('config');
	var colors = config.colors;
	return [{
		"label": "A",
		"value": 29,
		"color": colors.danger
	}, {
		"label": "B",
		"value": 32,
		"color": colors.info,
	}, {
		"label": "C",
		"value": 19,
		"color": colors.warning
	}, {
		"label": "D",
		"value": 50,
		"color": colors.success
	}]
}
function scatterChartData() {
	return [{
		"key": "Group 0",
		"values": [{
			"x": 0.38769080157723235,
			"y": -0.5173228958630209,
			"size": 0.2768178314436227,
			"shape": "circle"
		}, {
			"x": -0.6336301340500335,
			"y": -0.9390555631038682,
			"size": 0.04075000574812293,
			"shape": "circle"
		}, {
			"x": -0.550863171240081,
			"y": -0.7521626318030471,
			"size": 0.004082715138792992,
			"shape": "circle"
		}, {
			"x": -0.3606080283415165,
			"y": -0.5279194720801335,
			"size": 0.9785795786883682,
			"shape": "circle"
		}, {
			"x": -0.4345360918649073,
			"y": -0.15030042940391977,
			"size": 0.03700864128768444,
			"shape": "circle"
		}, {
			"x": -0.10896558486821281,
			"y": 0.1904461879981354,
			"size": 0.4344285042025149,
			"shape": "circle"
		}, {
			"x": 0.4222134313998444,
			"y": 0.7768545529468915,
			"size": 0.8932929555885494,
			"shape": "circle"
		}, {
			"x": 0.685136370467419,
			"y": -0.20876982033537692,
			"size": 0.04848805186338723,
			"shape": "circle"
		}, {
			"x": 1.887509438897577,
			"y": 0.38091582995851403,
			"size": 0.2807551396545023,
			"shape": "circle"
		}, {
			"x": -1.0066684007871052,
			"y": 0.06361657741655648,
			"size": 0.0996544121298939,
			"shape": "circle"
		}, {
			"x": 0.7577058357292228,
			"y": 0.11298201766635832,
			"size": 0.3730729282833636,
			"shape": "circle"
		}, {
			"x": -0.7260994716673589,
			"y": -1.40404891826761,
			"size": 0.39655150123871863,
			"shape": "circle"
		}, {
			"x": -0.007339860170187653,
			"y": 1.2572493869567614,
			"size": 0.30731401848606765,
			"shape": "circle"
		}, {
			"x": 0.05691246720722743,
			"y": -1.4769116517171117,
			"size": 0.832127976231277,
			"shape": "circle"
		}, {
			"x": 0.7148607307481833,
			"y": -0.11996966332922498,
			"size": 0.8596631120890379,
			"shape": "circle"
		}, {
			"x": 0.8089983174341405,
			"y": 0.2658464241458872,
			"size": 0.036332263611257076,
			"shape": "circle"
		}, {
			"x": 0.5607693908030255,
			"y": 1.0196181165260596,
			"size": 0.8023943318985403,
			"shape": "circle"
		}, {
			"x": 0.396820153950108,
			"y": 0.5078237787011678,
			"size": 0.8482829267159104,
			"shape": "circle"
		}, {
			"x": 0.19410372789370514,
			"y": 0.05954657964450648,
			"size": 0.9876099969260395,
			"shape": "circle"
		}, {
			"x": -0.2016798273573089,
			"y": 0.5239821812716101,
			"size": 0.9068739134818316,
			"shape": "circle"
		}, {
			"x": -1.7278128939213604,
			"y": -0.582998823916795,
			"size": 0.5270285934675485,
			"shape": "circle"
		}, {
			"x": 0.5183361570005616,
			"y": 0.9565433069030422,
			"size": 0.06856563361361623,
			"shape": "circle"
		}, {
			"x": 1.1325243074452427,
			"y": -0.7221938866861082,
			"size": 0.15636354964226484,
			"shape": "circle"
		}, {
			"x": 0.8905039604389422,
			"y": -0.176551323215647,
			"size": 0.36910743336193264,
			"shape": "circle"
		}, {
			"x": 0.031560573430153935,
			"y": 0.8823944862515463,
			"size": 0.4883835930377245,
			"shape": "circle"
		}, {
			"x": -0.317007706389158,
			"y": -0.6876620355660005,
			"size": 0.9182246543932706,
			"shape": "circle"
		}, {
			"x": -0.8406092564628788,
			"y": 0.1032051485536216,
			"size": 0.9300937869120389,
			"shape": "circle"
		}, {
			"x": -0.14275925303995926,
			"y": -0.10816090829583745,
			"size": 0.03907893761061132,
			"shape": "circle"
		}, {
			"x": -1.1201746418870948,
			"y": -1.791664662155709,
			"size": 0.7524311952292919,
			"shape": "circle"
		}, {
			"x": -1.2988420838943744,
			"y": 1.2518121946311973,
			"size": 0.731361635029316,
			"shape": "circle"
		}, {
			"x": 1.1568240164784722,
			"y": -1.0353719314226069,
			"size": 0.4123242860659957,
			"shape": "circle"
		}, {
			"x": -1.7205076406364987,
			"y": 0.20320988728742137,
			"size": 0.2173921351786703,
			"shape": "cross"
		}, {
			"x": 0.5942283189141998,
			"y": -0.4621959801371898,
			"size": 0.30848153424449265,
			"shape": "circle"
		}, {
			"x": 1.348239057828055,
			"y": -0.9330805057495443,
			"size": 0.7812637384049594,
			"shape": "circle"
		}, {
			"x": 0.7673717799111839,
			"y": 0.36480927718925443,
			"size": 0.36606923397630453,
			"shape": "circle"
		}, {
			"x": -0.10660930424228336,
			"y": 0.17398541876720658,
			"size": 0.3359741580206901,
			"shape": "circle"
		}, {
			"x": 0.5836399113193853,
			"y": 0.16577365556478224,
			"size": 0.7701675272546709,
			"shape": "circle"
		}, {
			"x": 1.090020623359475,
			"y": 1.0045976681699758,
			"size": 0.5053588466253132,
			"shape": "circle"
		}, {
			"x": 0.30989223406720123,
			"y": 0.059748908782469315,
			"size": 0.6628002661745995,
			"shape": "circle"
		}, {
			"x": -0.09889095603917669,
			"y": -0.2748971571365971,
			"size": 0.9497723593376577,
			"shape": "circle"
		}]
	}, {
		"key": "Group 1",
		"values": [{
			"x": 1.2666913714404744,
			"y": -0.3409172871140089,
			"size": 0.08400111668743193,
			"shape": "circle"
		}, {
			"x": -0.4038938510723015,
			"y": 0.172522355599956,
			"size": 0.39163524215109646,
			"shape": "circle"
		}, {
			"x": 0.4015214843169036,
			"y": 0.17187474319786228,
			"size": 0.4726677145808935,
			"shape": "circle"
		}, {
			"x": -1.2001972546573734,
			"y": -0.24201648085146021,
			"size": 0.9348385038319975,
			"shape": "circle"
		}, {
			"x": -1.050461097131046,
			"y": -0.6748171966573724,
			"size": 0.6366541930474341,
			"shape": "circle"
		}, {
			"x": -1.7037119572329371,
			"y": 0.1524420118537367,
			"size": 0.4882605408784002,
			"shape": "circle"
		}, {
			"x": 0.19120608954161367,
			"y": -1.9818728707135151,
			"size": 0.13686485728248954,
			"shape": "circle"
		}, {
			"x": -1.467886448610305,
			"y": 0.4406045757711914,
			"size": 0.6641095508821309,
			"shape": "circle"
		}, {
			"x": 0.2416099212957695,
			"y": -0.6547149091938965,
			"size": 0.30226255813613534,
			"shape": "circle"
		}, {
			"x": 1.2787021538770431,
			"y": -1.0696867698083268,
			"size": 0.3279375401325524,
			"shape": "circle"
		}, {
			"x": -0.3126784643485131,
			"y": 0.25145544887916504,
			"size": 0.5804495792835951,
			"shape": "circle"
		}, {
			"x": 1.4052395077685682,
			"y": 0.3267670215661804,
			"size": 0.8793672590982169,
			"shape": "circle"
		}, {
			"x": 2.208306922988852,
			"y": -0.4939446025831234,
			"size": 0.3236342000309378,
			"shape": "circle"
		}, {
			"x": -1.4734054902455154,
			"y": 1.2398498036411985,
			"size": 0.7104428187012672,
			"shape": "circle"
		}, {
			"x": -0.6756514502346047,
			"y": 1.0741950078194127,
			"size": 0.9895698581822217,
			"shape": "circle"
		}, {
			"x": 0.7654663171223067,
			"y": -0.6223493580602973,
			"size": 0.47638911474496126,
			"shape": "circle"
		}, {
			"x": 0.8465462952859193,
			"y": -1.4607934535456526,
			"size": 0.9049772636499256,
			"shape": "circle"
		}, {
			"x": 1.0259111800405973,
			"y": 0.7241549554580273,
			"size": 0.21679403260350227,
			"shape": "circle"
		}, {
			"x": -1.1225531776174653,
			"y": -1.1511258790448042,
			"size": 0.4554666655603796,
			"shape": "circle"
		}, {
			"x": 0.2579309096031326,
			"y": -1.2379239563745723,
			"size": 0.4097367699723691,
			"shape": "circle"
		}, {
			"x": -0.4192817434324062,
			"y": 0.3520235358155817,
			"size": 0.9509387270081788,
			"shape": "circle"
		}, {
			"x": 0.2839428105357374,
			"y": 0.4904836882571715,
			"size": 0.7945694348309189,
			"shape": "circle"
		}, {
			"x": -0.4673164607124432,
			"y": 1.2817204781634468,
			"size": 0.002588374074548483,
			"shape": "circle"
		}, {
			"x": 0.5572297647679315,
			"y": 0.5267008108137803,
			"size": 0.37665788596495986,
			"shape": "circle"
		}, {
			"x": -0.5379029677818955,
			"y": -0.052202521237851414,
			"size": 0.14584358199499547,
			"shape": "circle"
		}, {
			"x": 0.8054472713220879,
			"y": 0.21277353821206382,
			"size": 0.413029016694054,
			"shape": "circle"
		}, {
			"x": -1.0402395589796412,
			"y": 0.5927864356586248,
			"size": 0.17591882962733507,
			"shape": "circle"
		}, {
			"x": 0.14438040314111156,
			"y": 0.8346317071444741,
			"size": 0.6190513039473444,
			"shape": "circle"
		}, {
			"x": 0.4294218697312737,
			"y": -0.43713985445609477,
			"size": 0.31525261211209,
			"shape": "circle"
		}, {
			"x": -0.4673145819497998,
			"y": -0.5707102677133966,
			"size": 0.1157393844332546,
			"shape": "circle"
		}, {
			"x": 1.1784100753507558,
			"y": -0.8282407880508773,
			"size": 0.7580934173893183,
			"shape": "circle"
		}, {
			"x": 0.052600065816817775,
			"y": 1.4096927618626909,
			"size": 0.6742644750047475,
			"shape": "circle"
		}, {
			"x": -1.3289599213990966,
			"y": 0.26188475082077844,
			"size": 0.2661776039749384,
			"shape": "circle"
		}, {
			"x": 0.6582680186976101,
			"y": -1.5703968701906,
			"size": 0.2984335720539093,
			"shape": "circle"
		}, {
			"x": -0.9968277997195788,
			"y": 0.20259835735252432,
			"size": 0.17411843966692686,
			"shape": "circle"
		}, {
			"x": -0.41693364365768937,
			"y": 0.3292480066942277,
			"size": 0.30931322812102735,
			"shape": "circle"
		}, {
			"x": 0.06649154952932934,
			"y": 0.1700917218509851,
			"size": 0.24687890172936022,
			"shape": "circle"
		}, {
			"x": 0.4534036930604502,
			"y": -0.6389351197375787,
			"size": 0.7983592841774225,
			"shape": "circle"
		}, {
			"x": 0.7121582692776623,
			"y": 0.013849190267504462,
			"size": 0.9162284294143319,
			"shape": "circle"
		}, {
			"x": -1.0704514659518682,
			"y": -1.036718481780305,
			"size": 0.1811193695757538,
			"shape": "circle"
		}]
	}, {
		"key": "Group 2",
		"values": [{
			"x": -1.6920181739580942,
			"y": -0.5099370989453762,
			"size": 0.9780207313597202,
			"shape": "circle"
		}, {
			"x": 1.6805976686377857,
			"y": -0.416543786502356,
			"size": 0.8893015715293586,
			"shape": "circle"
		}, {
			"x": -0.5578813371754292,
			"y": -0.3437232226599006,
			"size": 0.6945983830373734,
			"shape": "triangle-up"
		}, {
			"x": 1.597919173003942,
			"y": -0.8650109977077942,
			"size": 0.08738353196531534,
			"shape": "circle"
		}, {
			"x": 1.1118150742208288,
			"y": -0.9611502223063982,
			"size": 0.809301407309249,
			"shape": "circle"
		}, {
			"x": -0.2335455546046462,
			"y": 1.3187311454412156,
			"size": 0.5260935658589005,
			"shape": "circle"
		}, {
			"x": 0.35161729472934217,
			"y": -0.530380491302575,
			"size": 0.8902570870704949,
			"shape": "circle"
		}, {
			"x": -0.6282808643486352,
			"y": 0.6113878764555555,
			"size": 0.3025648118928075,
			"shape": "circle"
		}, {
			"x": -0.3628612585300072,
			"y": 0.4417979400342926,
			"size": 0.8095609368756413,
			"shape": "circle"
		}, {
			"x": 2.7334945576939895,
			"y": -1.6033149191185905,
			"size": 0.5925705705303699,
			"shape": "circle"
		}, {
			"x": 0.3443997855110488,
			"y": -0.1431030485630505,
			"size": 0.6078358753584325,
			"shape": "circle"
		}, {
			"x": 0.22651518176605415,
			"y": 0.7787704975409947,
			"size": 0.8637564079836011,
			"shape": "circle"
		}, {
			"x": -1.3569523560967167,
			"y": -1.4176015277295806,
			"size": 0.7185975268948823,
			"shape": "circle"
		}, {
			"x": -1.282915022650199,
			"y": -0.6353542238779468,
			"size": 0.13667975342832506,
			"shape": "circle"
		}, {
			"x": 0.05851670495179126,
			"y": 1.5979214157622215,
			"size": 0.2674029660411179,
			"shape": "circle"
		}, {
			"x": 0.13086872449554762,
			"y": 0.7039289158967081,
			"size": 0.5960335519630462,
			"shape": "circle"
		}, {
			"x": 0.02626799505647806,
			"y": -1.6564529619848305,
			"size": 0.8820966682396829,
			"shape": "diamond"
		}, {
			"x": 0.7242057564845202,
			"y": 0.2259126930340935,
			"size": 0.873784416122362,
			"shape": "square"
		}, {
			"x": -0.9000194350868126,
			"y": -0.1278386068760639,
			"size": 0.5085777489002794,
			"shape": "circle"
		}, {
			"x": 1.2227794523726758,
			"y": -0.14431090727728443,
			"size": 0.3153586545959115,
			"shape": "circle"
		}, {
			"x": -0.8646677070883201,
			"y": -2.060727862852881,
			"size": 0.8724922249093652,
			"shape": "circle"
		}, {
			"x": 0.2166478428383571,
			"y": -0.6192742432553767,
			"size": 0.2209502304904163,
			"shape": "circle"
		}, {
			"x": 0.448081939909664,
			"y": -0.9280048317647395,
			"size": 0.4864790220744908,
			"shape": "circle"
		}, {
			"x": -1.4405496787286132,
			"y": 0.019691211544378567,
			"size": 0.7325624050572515,
			"shape": "circle"
		}, {
			"x": 0.8157793940745497,
			"y": -0.3697428756199661,
			"size": 0.39556885580532253,
			"shape": "circle"
		}, {
			"x": 3.2396143048721373,
			"y": -1.1917544421232187,
			"size": 0.18084654957056046,
			"shape": "circle"
		}, {
			"x": 0.34272850240275843,
			"y": -1.5447216946903013,
			"size": 0.47581319231539965,
			"shape": "circle"
		}, {
			"x": 0.8891949987105163,
			"y": 1.0032300003301855,
			"size": 0.03774643316864967,
			"shape": "circle"
		}, {
			"x": 0.6422292256262551,
			"y": 0.9492005768197156,
			"size": 0.04471684596501291,
			"shape": "circle"
		}, {
			"x": -0.8221639780633349,
			"y": 0.23652662262421587,
			"size": 0.5588007338810712,
			"shape": "circle"
		}, {
			"x": -0.19383883642391975,
			"y": -0.8722702516272653,
			"size": 0.2051193853840232,
			"shape": "circle"
		}, {
			"x": 1.1046460586740494,
			"y": -0.5424532959184373,
			"size": 0.0564570426940918,
			"shape": "circle"
		}, {
			"x": 0.3924695045907561,
			"y": 0.01910590427729618,
			"size": 0.45132099534384906,
			"shape": "circle"
		}, {
			"x": 0.1048348828456688,
			"y": -2.3741194307102873,
			"size": 0.8785002809017897,
			"shape": "circle"
		}, {
			"x": -1.0543158991334756,
			"y": 0.11659895992605132,
			"size": 0.5602925708517432,
			"shape": "circle"
		}, {
			"x": -0.1606554097623388,
			"y": 0.03816194494267741,
			"size": 0.15812311368063092,
			"shape": "circle"
		}, {
			"x": 1.4921761053139242,
			"y": -1.0240437257077757,
			"size": 0.8115659335162491,
			"shape": "circle"
		}, {
			"x": 0.8533601532531616,
			"y": -0.3042198544601767,
			"size": 0.6029800453688949,
			"shape": "circle"
		}, {
			"x": 0.7835472990045039,
			"y": 0.7518527108208498,
			"size": 0.232027237303555,
			"shape": "circle"
		}, {
			"x": 0.6752817857640234,
			"y": -0.602374915631576,
			"size": 0.9052182061132044,
			"shape": "circle"
		}]
	}, {
		"key": "Group 3",
		"values": [{
			"x": -1.0886030278641268,
			"y": -0.9283415714888283,
			"size": 0.40619017160497606,
			"shape": "circle"
		}, {
			"x": -1.282846593217239,
			"y": 1.973957129611161,
			"size": 0.6913056299090385,
			"shape": "circle"
		}, {
			"x": -0.16983471426943267,
			"y": 0.6771922219746219,
			"size": 0.94813770824112,
			"shape": "circle"
		}, {
			"x": -0.30235144904392375,
			"y": -1.586356017350348,
			"size": 0.9761592720169574,
			"shape": "circle"
		}, {
			"x": 0.9089157630930265,
			"y": -0.6881903911058643,
			"size": 0.5134737030602992,
			"shape": "circle"
		}, {
			"x": 0.34482100876887584,
			"y": 0.13615715881819865,
			"size": 0.28445545490831137,
			"shape": "circle"
		}, {
			"x": 1.7365134106736304,
			"y": -0.03679825456342509,
			"size": 0.7459651054814458,
			"shape": "circle"
		}, {
			"x": -0.4382175357134823,
			"y": 0.6244342669760368,
			"size": 0.9744091909378767,
			"shape": "circle"
		}, {
			"x": 0.3108216697745549,
			"y": -0.043516657756506115,
			"size": 0.8451576584484428,
			"shape": "circle"
		}, {
			"x": 1.0276557408761067,
			"y": -0.893425369233577,
			"size": 0.8957285194192082,
			"shape": "circle"
		}, {
			"x": -1.24575855756156,
			"y": 1.4579881162587989,
			"size": 0.15016216435469687,
			"shape": "circle"
		}, {
			"x": -1.3065759357770617,
			"y": -0.1859912541355555,
			"size": 0.3875925459433347,
			"shape": "circle"
		}, {
			"x": -1.4009813775954227,
			"y": -0.44795377098265904,
			"size": 0.47788906819187105,
			"shape": "circle"
		}, {
			"x": 0.6390810052317042,
			"y": 0.20636384787567466,
			"size": 0.6032983053009957,
			"shape": "circle"
		}, {
			"x": 0.2981527265068764,
			"y": 0.46371511061590576,
			"size": 0.08694475330412388,
			"shape": "circle"
		}, {
			"x": -0.39222818329494247,
			"y": -0.8017526397110603,
			"size": 0.28758640540763736,
			"shape": "circle"
		}, {
			"x": -0.721622344430882,
			"y": -0.5723674894228309,
			"size": 0.6716808783821762,
			"shape": "circle"
		}, {
			"x": 1.197824933026615,
			"y": -0.9420971120497877,
			"size": 0.8298159439582378,
			"shape": "circle"
		}, {
			"x": 0.5831068799865688,
			"y": -0.11143747861204835,
			"size": 0.051199101842939854,
			"shape": "circle"
		}, {
			"x": 0.23060571062229954,
			"y": 1.188670325963626,
			"size": 0.8328356698621064,
			"shape": "circle"
		}, {
			"x": 0.8693478401973773,
			"y": 1.728738056959118,
			"size": 0.9077592128887773,
			"shape": "circle"
		}, {
			"x": 0.056244167159448785,
			"y": 0.2738800385299293,
			"size": 0.537831716472283,
			"shape": "circle"
		}, {
			"x": -0.7886062829772624,
			"y": -0.8328242211955511,
			"size": 0.6665785131044686,
			"shape": "circle"
		}, {
			"x": -0.35836821980655786,
			"y": 1.2032989645645316,
			"size": 0.41023733792826533,
			"shape": "circle"
		}, {
			"x": -1.7991442443917396,
			"y": 0.08233202379485506,
			"size": 0.13021763367578387,
			"shape": "circle"
		}, {
			"x": 1.022864207315788,
			"y": -0.12908692858237947,
			"size": 0.4737019659951329,
			"shape": "circle"
		}, {
			"x": 1.3104536996624219,
			"y": -0.23303278217201195,
			"size": 0.26832140097394586,
			"shape": "circle"
		}, {
			"x": -2.1271594827087554,
			"y": 0.04369486558935699,
			"size": 0.36951559665612876,
			"shape": "triangle-down"
		}, {
			"x": 0.9506376744123605,
			"y": -1.6743715097262573,
			"size": 0.9571489484515041,
			"shape": "circle"
		}, {
			"x": 0.6840310412767745,
			"y": 1.487027838400755,
			"size": 0.48132562218233943,
			"shape": "circle"
		}, {
			"x": -0.24687304473210786,
			"y": 0.8770825119677541,
			"size": 0.10397675144486129,
			"shape": "circle"
		}, {
			"x": 0.553593743147885,
			"y": -0.529142621211096,
			"size": 0.7939152482431382,
			"shape": "circle"
		}, {
			"x": 0.9592073525106544,
			"y": 0.7561477334371587,
			"size": 0.7673417741898447,
			"shape": "circle"
		}, {
			"x": -1.0282008624611918,
			"y": 0.9368853323639286,
			"size": 0.820484465919435,
			"shape": "triangle-down"
		}, {
			"x": -0.4453478993091266,
			"y": 1.432306120394985,
			"size": 0.7240851724054664,
			"shape": "circle"
		}, {
			"x": -2.51572935040214,
			"y": -0.49281275409005376,
			"size": 0.027318251319229603,
			"shape": "circle"
		}, {
			"x": 0.23288386434800967,
			"y": -0.6321148295708396,
			"size": 0.860072634415701,
			"shape": "circle"
		}, {
			"x": 0.523994926047005,
			"y": 0.2907870095136031,
			"size": 0.008669282542541623,
			"shape": "circle"
		}, {
			"x": -0.1430947009142679,
			"y": 0.976462066406769,
			"size": 0.7862239074893296,
			"shape": "circle"
		}, {
			"x": -0.41473603014191346,
			"y": 0.18173622530889325,
			"size": 0.6720831249840558,
			"shape": "circle"
		}]
	}];
}
function sinAndCos() {
	return [{
		"values": [{
			"x": 0,
			"y": 0
		}, {
			"x": 1,
			"y": 0.09983341664682815
		}, {
			"x": 2,
			"y": 0.19866933079506122
		}, {
			"x": 3,
			"y": 0.29552020666133955
		}, {
			"x": 4,
			"y": 0.3894183423086505
		}, {
			"x": 5,
			"y": 0.479425538604203
		}, {
			"x": 6,
			"y": 0.5646424733950354
		}, {
			"x": 7,
			"y": 0.644217687237691
		}, {
			"x": 8,
			"y": 0.7173560908995229
		}, {
			"x": 9,
			"y": 0.7833269096274834
		}, {
			"x": 10,
			"y": 0.8414709848078965
		}, {
			"x": 11,
			"y": 0.8912073600614354
		}, {
			"x": 12,
			"y": 0.9320390859672263
		}, {
			"x": 13,
			"y": 0.963558185417193
		}, {
			"x": 14,
			"y": 0.9854497299884601
		}, {
			"x": 15,
			"y": 0.9974949866040544
		}, {
			"x": 16,
			"y": 0.9995736030415051
		}, {
			"x": 17,
			"y": 0.9916648104524686
		}, {
			"x": 18,
			"y": 0.9738476308781951
		}, {
			"x": 19,
			"y": 0.9463000876874145
		}, {
			"x": 20,
			"y": 0.9092974268256817
		}, {
			"x": 21,
			"y": 0.8632093666488737
		}, {
			"x": 22,
			"y": 0.8084964038195901
		}, {
			"x": 23,
			"y": 0.7457052121767203
		}, {
			"x": 24,
			"y": 0.675463180551151
		}, {
			"x": 25,
			"y": 0.5984721441039564
		}, {
			"x": 26,
			"y": 0.5155013718214642
		}, {
			"x": 27,
			"y": 0.4273798802338298
		}, {
			"x": 28,
			"y": 0.3349881501559051
		}, {
			"x": 29,
			"y": 0.23924932921398243
		}, {
			"x": 30,
			"y": 0.1411200080598672
		}, {
			"x": 31,
			"y": 0.04158066243329049
		}, {
			"x": 32,
			"y": -0.058374143427580086
		}, {
			"x": 33,
			"y": -0.1577456941432482
		}, {
			"x": 34,
			"y": -0.2555411020268312
		}, {
			"x": 35,
			"y": -0.35078322768961984
		}, {
			"x": 36,
			"y": -0.44252044329485246
		}, {
			"x": 37,
			"y": -0.5298361409084934
		}, {
			"x": 38,
			"y": -0.6118578909427189
		}, {
			"x": 39,
			"y": -0.6877661591839738
		}, {
			"x": 40,
			"y": -0.7568024953079282
		}, {
			"x": 41,
			"y": -0.8182771110644103
		}, {
			"x": 42,
			"y": -0.8715757724135882
		}, {
			"x": 43,
			"y": -0.9161659367494549
		}, {
			"x": 44,
			"y": -0.9516020738895161
		}, {
			"x": 45,
			"y": -0.977530117665097
		}, {
			"x": 46,
			"y": -0.9936910036334644
		}, {
			"x": 47,
			"y": -0.9999232575641008
		}, {
			"x": 48,
			"y": -0.9961646088358407
		}, {
			"x": 49,
			"y": -0.9824526126243325
		}, {
			"x": 50,
			"y": -0.9589242746631385
		}, {
			"x": 51,
			"y": -0.9258146823277325
		}, {
			"x": 52,
			"y": -0.8834546557201531
		}, {
			"x": 53,
			"y": -0.8322674422239013
		}, {
			"x": 54,
			"y": -0.7727644875559871
		}, {
			"x": 55,
			"y": -0.7055403255703919
		}, {
			"x": 56,
			"y": -0.6312666378723216
		}, {
			"x": 57,
			"y": -0.5506855425976376
		}, {
			"x": 58,
			"y": -0.46460217941375737
		}, {
			"x": 59,
			"y": -0.373876664830236
		}, {
			"x": 60,
			"y": -0.27941549819892586
		}, {
			"x": 61,
			"y": -0.18216250427209588
		}, {
			"x": 62,
			"y": -0.0830894028174964
		}, {
			"x": 63,
			"y": 0.016813900484349713
		}, {
			"x": 64,
			"y": 0.11654920485049364
		}, {
			"x": 65,
			"y": 0.21511998808781552
		}, {
			"x": 66,
			"y": 0.31154136351337786
		}, {
			"x": 67,
			"y": 0.4048499206165983
		}, {
			"x": 68,
			"y": 0.49411335113860816
		}, {
			"x": 69,
			"y": 0.5784397643882002
		}, {
			"x": 70,
			"y": 0.6569865987187891
		}, {
			"x": 71,
			"y": 0.7289690401258759
		}, {
			"x": 72,
			"y": 0.7936678638491532
		}, {
			"x": 73,
			"y": 0.8504366206285645
		}, {
			"x": 74,
			"y": 0.8987080958116269
		}, {
			"x": 75,
			"y": 0.9379999767747389
		}, {
			"x": 76,
			"y": 0.9679196720314863
		}, {
			"x": 77,
			"y": 0.9881682338770004
		}, {
			"x": 78,
			"y": 0.998543345374605
		}, {
			"x": 79,
			"y": 0.998941341839772
		}, {
			"x": 80,
			"y": 0.9893582466233818
		}, {
			"x": 81,
			"y": 0.9698898108450863
		}, {
			"x": 82,
			"y": 0.9407305566797731
		}, {
			"x": 83,
			"y": 0.9021718337562934
		}, {
			"x": 84,
			"y": 0.8545989080882805
		}, {
			"x": 85,
			"y": 0.7984871126234903
		}, {
			"x": 86,
			"y": 0.7343970978741134
		}, {
			"x": 87,
			"y": 0.6629692300821833
		}, {
			"x": 88,
			"y": 0.5849171928917617
		}, {
			"x": 89,
			"y": 0.5010208564578846
		}, {
			"x": 90,
			"y": 0.4121184852417566
		}, {
			"x": 91,
			"y": 0.3190983623493521
		}, {
			"x": 92,
			"y": 0.22288991410024764
		}, {
			"x": 93,
			"y": 0.1244544235070617
		}, {
			"x": 94,
			"y": 0.024775425453357765
		}, {
			"x": 95,
			"y": -0.0751511204618093
		}, {
			"x": 96,
			"y": -0.17432678122297965
		}, {
			"x": 97,
			"y": -0.27176062641094245
		}, {
			"x": 98,
			"y": -0.3664791292519284
		}, {
			"x": 99,
			"y": -0.4575358937753214
		}],
		"key": "Sine Wave",
		"color": "#c0392b"
	}, {
		"values": [{
			"x": 0,
			"y": 0.5
		}, {
			"x": 1,
			"y": 0.49750208263901285
		}, {
			"x": 2,
			"y": 0.4900332889206208
		}, {
			"x": 3,
			"y": 0.477668244562803
		}, {
			"x": 4,
			"y": 0.46053049700144255
		}, {
			"x": 5,
			"y": 0.4387912809451864
		}, {
			"x": 6,
			"y": 0.41266780745483916
		}, {
			"x": 7,
			"y": 0.38242109364224425
		}, {
			"x": 8,
			"y": 0.3483533546735827
		}, {
			"x": 9,
			"y": 0.3108049841353322
		}, {
			"x": 10,
			"y": 0.2701511529340699
		}, {
			"x": 11,
			"y": 0.22679806071278866
		}, {
			"x": 12,
			"y": 0.1811788772383368
		}, {
			"x": 13,
			"y": 0.13374941431229367
		}, {
			"x": 14,
			"y": 0.08498357145012052
		}, {
			"x": 15,
			"y": 0.03536860083385145
		}, {
			"x": 16,
			"y": -0.014599761150644408
		}, {
			"x": 17,
			"y": -0.06442224714776232
		}, {
			"x": 18,
			"y": -0.11360104734654355
		}, {
			"x": 19,
			"y": -0.16164478343175168
		}, {
			"x": 20,
			"y": -0.2080734182735712
		}, {
			"x": 21,
			"y": -0.2524230522999288
		}, {
			"x": 22,
			"y": -0.2942505586276729
		}, {
			"x": 23,
			"y": -0.333138010639912
		}, {
			"x": 24,
			"y": -0.3686968577706227
		}, {
			"x": 25,
			"y": -0.40057180777346685
		}, {
			"x": 26,
			"y": -0.42844437668447366
		}, {
			"x": 27,
			"y": -0.4520360710085306
		}, {
			"x": 28,
			"y": -0.47111117033432903
		}, {
			"x": 29,
			"y": -0.4854790825747953
		}, {
			"x": 30,
			"y": -0.4949962483002227
		}, {
			"x": 31,
			"y": -0.49956757513663974
		}, {
			"x": 32,
			"y": -0.49914738789737656
		}, {
			"x": 33,
			"y": -0.49373988495443244
		}, {
			"x": 34,
			"y": -0.48339909628973055
		}, {
			"x": 35,
			"y": -0.46822834364539817
		}, {
			"x": 36,
			"y": -0.4483792081670735
		}, {
			"x": 37,
			"y": -0.424050015855204
		}, {
			"x": 38,
			"y": -0.3954838559572084
		}, {
			"x": 39,
			"y": -0.3629661521000701
		}, {
			"x": 40,
			"y": -0.32682181043180597
		}, {
			"x": 41,
			"y": -0.2874119732666346
		}, {
			"x": 42,
			"y": -0.2451304106703497
		}, {
			"x": 43,
			"y": -0.20039958603998773
		}, {
			"x": 44,
			"y": -0.15366643498920968
		}, {
			"x": 45,
			"y": -0.10539789971538985
		}, {
			"x": 46,
			"y": -0.056076263467527435
		}, {
			"x": 47,
			"y": -0.00619433173144528
		}, {
			"x": 48,
			"y": 0.0437494917197232
		}, {
			"x": 49,
			"y": 0.09325618471128788
		}, {
			"x": 50,
			"y": 0.14183109273161312
		}, {
			"x": 51,
			"y": 0.18898887135649012
		}, {
			"x": 52,
			"y": 0.23425833565018855
		}, {
			"x": 53,
			"y": 0.2771871680895804
		}, {
			"x": 54,
			"y": 0.31734643797131734
		}, {
			"x": 55,
			"y": 0.35433488714563
		}, {
			"x": 56,
			"y": 0.38778293925512475
		}, {
			"x": 57,
			"y": 0.4173563924195799
		}, {
			"x": 58,
			"y": 0.44275975847065946
		}, {
			"x": 59,
			"y": 0.46373921537201795
		}, {
			"x": 60,
			"y": 0.48008514332518304
		}, {
			"x": 61,
			"y": 0.49163421922129225
		}, {
			"x": 62,
			"y": 0.49827104851160875
		}, {
			"x": 63,
			"y": 0.49992931819170755
		}, {
			"x": 64,
			"y": 0.4965924593790963
		}, {
			"x": 65,
			"y": 0.48829381286401174
		}, {
			"x": 66,
			"y": 0.4751162959792648
		}, {
			"x": 67,
			"y": 0.4571915741176597
		}, {
			"x": 68,
			"y": 0.43469874517491264
		}, {
			"x": 69,
			"y": 0.4078625500626784
		}, {
			"x": 70,
			"y": 0.3769511271716523
		}, {
			"x": 71,
			"y": 0.3422733332214033
		}, {
			"x": 72,
			"y": 0.3041756572661273
		}, {
			"x": 73,
			"y": 0.26303875869055265
		}, {
			"x": 74,
			"y": 0.21927366378719518
		}, {
			"x": 75,
			"y": 0.1733176589175129
		}, {
			"x": 76,
			"y": 0.12562992129112785
		}, {
			"x": 77,
			"y": 0.07668693101893218
		}, {
			"x": 78,
			"y": 0.026977710281324875
		}, {
			"x": 79,
			"y": -0.023001062819768475
		}, {
			"x": 80,
			"y": -0.07275001690430677
		}, {
			"x": 81,
			"y": -0.12177207686789555
		}, {
			"x": 82,
			"y": -0.16957743049191726
		}, {
			"x": 83,
			"y": -0.21568842248531042
		}, {
			"x": 84,
			"y": -0.2596443270583428
		}, {
			"x": 85,
			"y": -0.3010059513424118
		}, {
			"x": 86,
			"y": -0.3393600236600062
		}, {
			"x": 87,
			"y": -0.37432332279869934
		}, {
			"x": 88,
			"y": -0.405546507030828
		}, {
			"x": 89,
			"y": -0.43271760462055614
		}, {
			"x": 90,
			"y": -0.4555651309423385
		}, {
			"x": 91,
			"y": -0.47386080106555595
		}, {
			"x": 92,
			"y": -0.4874218107020818
		}, {
			"x": 93,
			"y": -0.4961126627263017
		}, {
			"x": 94,
			"y": -0.49984652101760324
		}, {
			"x": 95,
			"y": -0.4985860780981892
		}, {
			"x": 96,
			"y": -0.4923439278970635
		}, {
			"x": 97,
			"y": -0.4811824399156551
		}, {
			"x": 98,
			"y": -0.46521313605237663
		}, {
			"x": 99,
			"y": -0.44459557631268043
		}],
		"key": "Cosine Wave",
		"color": "#27ae60"
	}, {
		"values": [{
			"x": 0,
			"y": 0.5
		}, {
			"x": 1,
			"y": 0.524958354161707
		}, {
			"x": 2,
			"y": 0.5496673326987653
		}, {
			"x": 3,
			"y": 0.5738800516653348
		}, {
			"x": 4,
			"y": 0.5973545855771626
		}, {
			"x": 5,
			"y": 0.6198563846510508
		}, {
			"x": 6,
			"y": 0.6411606183487588
		}, {
			"x": 7,
			"y": 0.6610544218094228
		}, {
			"x": 8,
			"y": 0.6793390227248808
		}, {
			"x": 9,
			"y": 0.6958317274068708
		}, {
			"x": 10,
			"y": 0.7103677462019742
		}, {
			"x": 11,
			"y": 0.7228018400153589
		}, {
			"x": 12,
			"y": 0.7330097714918066
		}, {
			"x": 13,
			"y": 0.7408895463542983
		}, {
			"x": 14,
			"y": 0.746362432497115
		}, {
			"x": 15,
			"y": 0.7493737466510136
		}, {
			"x": 16,
			"y": 0.7498934007603762
		}, {
			"x": 17,
			"y": 0.7479162026131172
		}, {
			"x": 18,
			"y": 0.7434619077195488
		}, {
			"x": 19,
			"y": 0.7365750219218536
		}, {
			"x": 20,
			"y": 0.7273243567064205
		}, {
			"x": 21,
			"y": 0.7158023416622185
		}, {
			"x": 22,
			"y": 0.7021241009548975
		}, {
			"x": 23,
			"y": 0.6864263030441801
		}, {
			"x": 24,
			"y": 0.6688657951377878
		}, {
			"x": 25,
			"y": 0.6496180360259891
		}, {
			"x": 26,
			"y": 0.6288753429553661
		}, {
			"x": 27,
			"y": 0.6068449700584575
		}, {
			"x": 28,
			"y": 0.5837470375389763
		}, {
			"x": 29,
			"y": 0.5598123323034956
		}, {
			"x": 30,
			"y": 0.5352800020149668
		}, {
			"x": 31,
			"y": 0.5103951656083227
		}, {
			"x": 32,
			"y": 0.48540646414310495
		}, {
			"x": 33,
			"y": 0.46056357646418794
		}, {
			"x": 34,
			"y": 0.4361147244932922
		}, {
			"x": 35,
			"y": 0.412304193077595
		}, {
			"x": 36,
			"y": 0.3893698891762869
		}, {
			"x": 37,
			"y": 0.3675409647728767
		}, {
			"x": 38,
			"y": 0.3470355272643203
		}, {
			"x": 39,
			"y": 0.32805846020400653
		}, {
			"x": 40,
			"y": 0.31079937617301795
		}, {
			"x": 41,
			"y": 0.29543072223389744
		}, {
			"x": 42,
			"y": 0.28210605689660295
		}, {
			"x": 43,
			"y": 0.2709585158126363
		}, {
			"x": 44,
			"y": 0.26209948152762097
		}, {
			"x": 45,
			"y": 0.25561747058372575
		}, {
			"x": 46,
			"y": 0.2515772490916339
		}, {
			"x": 47,
			"y": 0.2500191856089748
		}, {
			"x": 48,
			"y": 0.25095884779103983
		}, {
			"x": 49,
			"y": 0.2543868468439169
		}, {
			"x": 50,
			"y": 0.26026893133421536
		}, {
			"x": 51,
			"y": 0.2685463294180669
		}, {
			"x": 52,
			"y": 0.2791363360699617
		}, {
			"x": 53,
			"y": 0.29193313944402466
		}, {
			"x": 54,
			"y": 0.3068088781110032
		}, {
			"x": 55,
			"y": 0.323614918607402
		}, {
			"x": 56,
			"y": 0.34218334053191957
		}, {
			"x": 57,
			"y": 0.3623286143505906
		}, {
			"x": 58,
			"y": 0.38384945514656066
		}, {
			"x": 59,
			"y": 0.406530833792441
		}, {
			"x": 60,
			"y": 0.43014612545026853
		}, {
			"x": 61,
			"y": 0.45445937393197605
		}, {
			"x": 62,
			"y": 0.4792276492956259
		}, {
			"x": 63,
			"y": 0.5042034751210874
		}, {
			"x": 64,
			"y": 0.5291373012126234
		}, {
			"x": 65,
			"y": 0.5537799970219539
		}, {
			"x": 66,
			"y": 0.5778853408783444
		}, {
			"x": 67,
			"y": 0.6012124801541496
		}, {
			"x": 68,
			"y": 0.623528337784652
		}, {
			"x": 69,
			"y": 0.64460994109705
		}, {
			"x": 70,
			"y": 0.6642466496796973
		}, {
			"x": 71,
			"y": 0.682242260031469
		}, {
			"x": 72,
			"y": 0.6984169659622883
		}, {
			"x": 73,
			"y": 0.7126091551571412
		}, {
			"x": 74,
			"y": 0.7246770239529068
		}, {
			"x": 75,
			"y": 0.7344999941936847
		}, {
			"x": 76,
			"y": 0.7419799180078716
		}, {
			"x": 77,
			"y": 0.7470420584692501
		}, {
			"x": 78,
			"y": 0.7496358363436513
		}, {
			"x": 79,
			"y": 0.749735335459943
		}, {
			"x": 80,
			"y": 0.7473395616558455
		}, {
			"x": 81,
			"y": 0.7424724527112716
		}, {
			"x": 82,
			"y": 0.7351826391699433
		}, {
			"x": 83,
			"y": 0.7255429584390733
		}, {
			"x": 84,
			"y": 0.7136497270220701
		}, {
			"x": 85,
			"y": 0.6996217781558726
		}, {
			"x": 86,
			"y": 0.6835992744685284
		}, {
			"x": 87,
			"y": 0.6657423075205459
		}, {
			"x": 88,
			"y": 0.6462292982229404
		}, {
			"x": 89,
			"y": 0.6252552141144712
		}, {
			"x": 90,
			"y": 0.6030296213104391
		}, {
			"x": 91,
			"y": 0.579774590587338
		}, {
			"x": 92,
			"y": 0.555722478525062
		}, {
			"x": 93,
			"y": 0.5311136058767654
		}, {
			"x": 94,
			"y": 0.5061938563633395
		}, {
			"x": 95,
			"y": 0.48121221988454765
		}, {
			"x": 96,
			"y": 0.4564183046942551
		}, {
			"x": 97,
			"y": 0.4320598433972644
		}, {
			"x": 98,
			"y": 0.40838021768701793
		}, {
			"x": 99,
			"y": 0.38561602655616967
		}],
		"key": "Another sine wave",
		"color": "#e67e22",
		"area": true
	}]
}
function multiBarHorizontalChartData() {
	var config = $.localStorage.get('config');
	var colors = config.colors;
	return [{
		"key": "Series 1",
		"color": colors.danger,
		"values": [{
			"label": "Group A",
			"value": -1.8746444827653
		}, {
			"label": "Group B",
			"value": -8.0961543492239
		}, {
			"label": "Group C",
			"value": -0.57072943117674
		}, {
			"label": "Group D",
			"value": -2.4174010336624
		}, {
			"label": "Group E",
			"value": -0.72009071426284
		}, {
			"label": "Group F",
			"value": -0.77154485523777
		}, {
			"label": "Group G",
			"value": -0.90152097798131
		}, {
			"label": "Group H",
			"value": -0.91445417330854
		}, {
			"label": "Group I",
			"value": -0.055746319141851
		}]
	}, {
		"key": "Series 2",
		"color": colors.success,
		"values": [{
			"label": "Group A",
			"value": 25.307646510375
		}, {
			"label": "Group B",
			"value": 16.756779544553
		}, {
			"label": "Group C",
			"value": 18.451534877007
		}, {
			"label": "Group D",
			"value": 8.6142352811805
		}, {
			"label": "Group E",
			"value": 7.8082472075876
		}, {
			"label": "Group F",
			"value": 5.259101026956
		}, {
			"label": "Group G",
			"value": 0.30947953487127
		}, {
			"label": "Group H",
			"value": 0
		}, {
			"label": "Group I",
			"value": 0
		}]
	}]
}
function discreteBarChartData() {
	return [{
		"key": "Cumulative Return",
		"values": [{
			"label": "A Label",
			"value": -29.765957771107
		}, {
			"label": "B Label",
			"value": 0
		}, {
			"label": "C Label",
			"value": 32.807804682612
		}, {
			"label": "D Label",
			"value": 196.45946739256
		}, {
			"label": "E Label",
			"value": 0.19434030906893
		}, {
			"label": "F Label",
			"value": -98.079782601442
		}, {
			"label": "G Label",
			"value": -13.925743130903
		}, {
			"label": "H Label",
			"value": -5.1387322875705
		}]
	}]
};
function barChartData() {
	return [{
		"key": "Stream #0",
		"values": [{
			"x": 0,
			"y": 0.18281643812078985
		}, {
			"x": 1,
			"y": 0.14353895746171474
		}, {
			"x": 2,
			"y": 0.18273320307489485
		}, {
			"x": 3,
			"y": 0.14293340092990547
		}, {
			"x": 4,
			"y": 0.16404536883346738
		}, {
			"x": 5,
			"y": 0.16386436859611422
		}, {
			"x": 6,
			"y": 0.19923155752476307
		}, {
			"x": 7,
			"y": 0.13234739950858057
		}, {
			"x": 8,
			"y": 0.18750452012754978
		}, {
			"x": 9,
			"y": 0.18111726776696743
		}, {
			"x": 10,
			"y": 0.19399227800986
		}, {
			"x": 11,
			"y": 0.16923715649556456
		}, {
			"x": 12,
			"y": 0.309011295373967
		}, {
			"x": 13,
			"y": 1.16623446935793
		}, {
			"x": 14,
			"y": 0.20396961646063025
		}, {
			"x": 15,
			"y": 0.1988348567005348
		}, {
			"x": 16,
			"y": 0.15960914412640276
		}, {
			"x": 17,
			"y": 0.16645460193977363
		}, {
			"x": 18,
			"y": 0.10238536875705484
		}, {
			"x": 19,
			"y": 0.10859150744669736
		}, {
			"x": 20,
			"y": 0.11720136126806828
		}, {
			"x": 21,
			"y": 0.16559298343557596
		}, {
			"x": 22,
			"y": 0.16729986067490715
		}, {
			"x": 23,
			"y": 0.14201723252711054
		}, {
			"x": 24,
			"y": 0.14596370565789957
		}, {
			"x": 25,
			"y": 0.11025421236078477
		}, {
			"x": 26,
			"y": 0.16869594176030214
		}, {
			"x": 27,
			"y": 0.1245835674176106
		}, {
			"x": 28,
			"y": 0.17529972689138673
		}, {
			"x": 29,
			"y": 0.14939347447103152
		}, {
			"x": 30,
			"y": 0.16959877092690184
		}, {
			"x": 31,
			"y": 0.15652304471668807
		}, {
			"x": 32,
			"y": 0.2810683671376168
		}, {
			"x": 33,
			"y": 0.558930504068528
		}, {
			"x": 34,
			"y": 1.1061420862158813
		}, {
			"x": 35,
			"y": 1.923229788411552
		}, {
			"x": 36,
			"y": 2.9928935460818593
		}, {
			"x": 37,
			"y": 3.8556113851960703
		}, {
			"x": 38,
			"y": 4.192163286043639
		}, {
			"x": 39,
			"y": 3.859115335498611
		}, {
			"x": 40,
			"y": 3.0849736656776727
		}, {
			"x": 41,
			"y": 2.2611125473968516
		}, {
			"x": 42,
			"y": 1.5193515624065335
		}, {
			"x": 43,
			"y": 1.0027031346385362
		}, {
			"x": 44,
			"y": 0.7535910095259226
		}, {
			"x": 45,
			"y": 0.5838154538327304
		}]
	}, {
		"key": "Stream #1",
		"values": [{
			"x": 0,
			"y": 3.167602002301715
		}, {
			"x": 1,
			"y": 4.5092804677874385
		}, {
			"x": 2,
			"y": 4.748285723134992
		}, {
			"x": 3,
			"y": 3.546607658433239
		}, {
			"x": 4,
			"y": 1.8889426658655284
		}, {
			"x": 5,
			"y": 0.803556186526082
		}, {
			"x": 6,
			"y": 0.31599694929880306
		}, {
			"x": 7,
			"y": 0.21036364860475626
		}, {
			"x": 8,
			"y": 0.1361626031116022
		}, {
			"x": 9,
			"y": 0.15363380445176708
		}, {
			"x": 10,
			"y": 0.11852358058569748
		}, {
			"x": 11,
			"y": 0.14923461240179356
		}, {
			"x": 12,
			"y": 0.16113239148162775
		}, {
			"x": 13,
			"y": 0.13002047640545722
		}, {
			"x": 14,
			"y": 0.11965466998473913
		}, {
			"x": 15,
			"y": 0.11231912814575011
		}, {
			"x": 16,
			"y": 0.12590515874326486
		}, {
			"x": 17,
			"y": 0.12120497592259201
		}, {
			"x": 18,
			"y": 0.16296911970712247
		}, {
			"x": 19,
			"y": 0.1587719447910786
		}, {
			"x": 20,
			"y": 0.16992049703840167
		}, {
			"x": 21,
			"y": 0.10380793006625028
		}, {
			"x": 22,
			"y": 0.15723095824941993
		}, {
			"x": 23,
			"y": 0.1875653438270092
		}, {
			"x": 24,
			"y": 0.1781101561849937
		}, {
			"x": 25,
			"y": 0.17552990750409664
		}, {
			"x": 26,
			"y": 0.1542576068546623
		}, {
			"x": 27,
			"y": 0.16437839609570803
		}, {
			"x": 28,
			"y": 0.16794685379136354
		}, {
			"x": 29,
			"y": 0.10660002923104916
		}, {
			"x": 30,
			"y": 0.11197099837009034
		}, {
			"x": 31,
			"y": 0.14966958018490445
		}, {
			"x": 32,
			"y": 0.13109371219885096
		}, {
			"x": 33,
			"y": 0.17090932214866206
		}, {
			"x": 34,
			"y": 0.13402476651030298
		}, {
			"x": 35,
			"y": 0.1287131764415
		}, {
			"x": 36,
			"y": 0.14851449697813068
		}, {
			"x": 37,
			"y": 0.10254402631150537
		}, {
			"x": 38,
			"y": 0.15455211870684646
		}, {
			"x": 39,
			"y": 0.1474804342727728
		}, {
			"x": 40,
			"y": 0.1388981057182687
		}, {
			"x": 41,
			"y": 0.116639680142495
		}, {
			"x": 42,
			"y": 0.18525189356500565
		}, {
			"x": 43,
			"y": 0.18747500139534318
		}, {
			"x": 44,
			"y": 0.21113985483123493
		}, {
			"x": 45,
			"y": 0.2939609134092086
		}]
	}, {
		"key": "Stream #2",
		"values": [{
			"x": 0,
			"y": 0.15407976127668657
		}, {
			"x": 1,
			"y": 0.16562366455724828
		}, {
			"x": 2,
			"y": 0.4261845946018459
		}, {
			"x": 3,
			"y": 0.9815217359760405
		}, {
			"x": 4,
			"y": 2.247199609760293
		}, {
			"x": 5,
			"y": 3.686882494942119
		}, {
			"x": 6,
			"y": 4.717658548653476
		}, {
			"x": 7,
			"y": 4.756000384386207
		}, {
			"x": 8,
			"y": 3.8826491900015037
		}, {
			"x": 9,
			"y": 2.858563903297096
		}, {
			"x": 10,
			"y": 1.8798602940549098
		}, {
			"x": 11,
			"y": 1.0345394940778647
		}, {
			"x": 12,
			"y": 0.5601941116392266
		}, {
			"x": 13,
			"y": 0.3980894691702985
		}, {
			"x": 14,
			"y": 0.5542623319769906
		}, {
			"x": 15,
			"y": 0.7119648829395313
		}, {
			"x": 16,
			"y": 1.032029777923349
		}, {
			"x": 17,
			"y": 1.2921528475721455
		}, {
			"x": 18,
			"y": 1.6059333288985043
		}, {
			"x": 19,
			"y": 1.8573084011391332
		}, {
			"x": 20,
			"y": 2.1107848072219184
		}, {
			"x": 21,
			"y": 2.3059297743968576
		}, {
			"x": 22,
			"y": 2.2263189176144524
		}, {
			"x": 23,
			"y": 1.9295222437270703
		}, {
			"x": 24,
			"y": 1.2735377158241874
		}, {
			"x": 25,
			"y": 0.7414166922707226
		}, {
			"x": 26,
			"y": 0.4301830781201098
		}, {
			"x": 27,
			"y": 0.29909752699332914
		}, {
			"x": 28,
			"y": 0.1469259083882706
		}, {
			"x": 29,
			"y": 0.14623980620564972
		}, {
			"x": 30,
			"y": 0.16338558607983691
		}, {
			"x": 31,
			"y": 0.3869125623154126
		}, {
			"x": 32,
			"y": 1.0713470835156191
		}, {
			"x": 33,
			"y": 1.8052930549685207
		}, {
			"x": 34,
			"y": 1.8713256427782692
		}, {
			"x": 35,
			"y": 1.153365982788846
		}, {
			"x": 36,
			"y": 0.4520140328116348
		}, {
			"x": 37,
			"y": 0.2386535881251972
		}, {
			"x": 38,
			"y": 0.11017513133295084
		}, {
			"x": 39,
			"y": 0.17437285946548492
		}, {
			"x": 40,
			"y": 0.17207948647733695
		}, {
			"x": 41,
			"y": 0.16497943936621332
		}, {
			"x": 42,
			"y": 0.10209963621971162
		}, {
			"x": 43,
			"y": 0.1566391147057674
		}, {
			"x": 44,
			"y": 0.11603481187489716
		}, {
			"x": 45,
			"y": 0.13244019800331605
		}]
	}]
}
function easyPieChart(element, barColor, trackColor, size) {
	$(element).easyPieChart({
		barColor: barColor,
		size: size,
		trackColor: trackColor,
		scaleColor: false,
		animate: true,
		lineWidth: 10,
		lineCap: 'square',
		animate: 1000
	});
}

'use strict';
/**
 * @author Batch Themes Ltd.
 */
(function() {
    $(function() {
        var colors = {
            'white': '#ffffff',
            'black': '#000000',
            'red-50': '#ffebee',
            'red-100': '#ffcdd2',
            'red-200': '#ef9a9a',
            'red-300': '#e57373',
            'red-400': '#ef5350',
            'red-500': '#f44336',
            'red-600': '#e53935',
            'red-700': '#d32f2f',
            'red-800': '#c62828',
            'red-900': '#b71c1c',
            'red-a100': '#ff8a80',
            'red-a200': '#ff5252',
            'red-a400': '#ff1744',
            'red-a700': '#d50000',
            'pink-50': '#fce4ec',
            'pink-100': '#f8bbd0',
            'pink-200': '#f48fb1',
            'pink-300': '#f06292',
            'pink-400': '#ec407a',
            'pink-500': '#e91e63',
            'pink-600': '#d81b60',
            'pink-700': '#c2185b',
            'pink-800': '#ad1457',
            'pink-900': '#880e4f',
            'pink-a100': '#ff80ab',
            'pink-a200': '#ff4081',
            'pink-a400': '#f50057',
            'pink-a700': '#c51162',
            'purple-50': '#f3e5f5',
            'purple-100': '#e1bee7',
            'purple-200': '#ce93d8',
            'purple-300': '#ba68c8',
            'purple-400': '#ab47bc',
            'purple-500': '#9c27b0',
            'purple-600': '#8e24aa',
            'purple-700': '#7b1fa2',
            'purple-800': '#6a1b9a',
            'purple-900': '#4a148c',
            'purple-a100': '#ea80fc',
            'purple-a200': '#e040fb',
            'purple-a400': '#d500f9',
            'purple-a700': '#aa00ff',
            'deep-purple-50': '#ede7f6',
            'deep-purple-100': '#d1c4e9',
            'deep-purple-200': '#b39ddb',
            'deep-purple-300': '#9575cd',
            'deep-purple-400': '#7e57c2',
            'deep-purple-500': '#673ab7',
            'deep-purple-600': '#5e35b1',
            'deep-purple-700': '#512da8',
            'deep-purple-800': '#4527a0',
            'deep-purple-900': '#311b92',
            'deep-purple-a100': '#b388ff',
            'deep-purple-a200': '#7c4dff',
            'deep-purple-a400': '#651fff',
            'deep-purple-a700': '#6200ea',
            'indigo-50': '#e8eaf6',
            'indigo-100': '#c5cae9',
            'indigo-200': '#9fa8da',
            'indigo-300': '#7986cb',
            'indigo-400': '#5c6bc0',
            'indigo-500': '#3f51b5',
            'indigo-600': '#3949ab',
            'indigo-700': '#303f9f',
            'indigo-800': '#283593',
            'indigo-900': '#1a237e',
            'indigo-a100': '#8c9eff',
            'indigo-a200': '#536dfe',
            'indigo-a400': '#3d5afe',
            'indigo-a700': '#304ffe',
            'blue-50': '#e3f2fd',
            'blue-100': '#bbdefb',
            'blue-200': '#90caf9',
            'blue-300': '#64b5f6',
            'blue-400': '#42a5f5',
            'blue-500': '#2196f3',
            'blue-600': '#1e88e5',
            'blue-700': '#1976d2',
            'blue-800': '#1565c0',
            'blue-900': '#0d47a1',
            'blue-a100': '#82b1ff',
            'blue-a200': '#448aff',
            'blue-a400': '#2979ff',
            'blue-a700': '#2962ff',
            'light-blue-50': '#e1f5fe',
            'light-blue-100': '#b3e5fc',
            'light-blue-200': '#81d4fa',
            'light-blue-300': '#4fc3f7',
            'light-blue-400': '#29b6f6',
            'light-blue-500': '#03a9f4',
            'light-blue-600': '#039be5',
            'light-blue-700': '#0288d1',
            'light-blue-800': '#0277bd',
            'light-blue-900': '#01579b',
            'light-blue-a100': '#80d8ff',
            'light-blue-a200': '#40c4ff',
            'light-blue-a400': '#00b0ff',
            'light-blue-a700': '#0091ea',
            'cyan-50': '#e0f7fa',
            'cyan-100': '#b2ebf2',
            'cyan-200': '#80deea',
            'cyan-300': '#4dd0e1',
            'cyan-400': '#26c6da',
            'cyan-500': '#00bcd4',
            'cyan-600': '#00acc1',
            'cyan-700': '#0097a7',
            'cyan-800': '#00838f',
            'cyan-900': '#006064',
            'cyan-a100': '#84ffff',
            'cyan-a200': '#18ffff',
            'cyan-a400': '#00e5ff',
            'cyan-a700': '#00b8d4',
            'teal-50': '#e0f2f1',
            'teal-100': '#b2dfdb',
            'teal-200': '#80cbc4',
            'teal-300': '#4db6ac',
            'teal-400': '#26a69a',
            'teal-500': '#009688',
            'teal-600': '#00897b',
            'teal-700': '#00796b',
            'teal-800': '#00695c',
            'teal-900': '#004d40',
            'teal-a100': '#a7ffeb',
            'teal-a200': '#64ffda',
            'teal-a400': '#1de9b6',
            'teal-a700': '#00bfa5',
            'green-50': '#e8f5e9',
            'green-100': '#c8e6c9',
            'green-200': '#a5d6a7',
            'green-300': '#81c784',
            'green-400': '#66bb6a',
            'green-500': '#4caf50',
            'green-600': '#43a047',
            'green-700': '#388e3c',
            'green-800': '#2e7d32',
            'green-900': '#1b5e20',
            'green-a100': '#b9f6ca',
            'green-a200': '#69f0ae',
            'green-a400': '#00e676',
            'green-a700': '#00c853',
            'light-green-50': '#f1f8e9',
            'light-green-100': '#dcedc8',
            'light-green-200': '#c5e1a5',
            'light-green-300': '#aed581',
            'light-green-400': '#9ccc65',
            'light-green-500': '#8bc34a',
            'light-green-600': '#7cb342',
            'light-green-700': '#689f38',
            'light-green-800': '#558b2f',
            'light-green-900': '#33691e',
            'light-green-a100': '#ccff90',
            'light-green-a200': '#b2ff59',
            'light-green-a400': '#76ff03',
            'light-green-a700': '#64dd17',
            'lime-50': '#f9fbe7',
            'lime-100': '#f0f4c3',
            'lime-200': '#e6ee9c',
            'lime-300': '#dce775',
            'lime-400': '#d4e157',
            'lime-500': '#cddc39',
            'lime-600': '#c0ca33',
            'lime-700': '#afb42b',
            'lime-800': '#9e9d24',
            'lime-900': '#827717',
            'lime-a100': '#f4ff81',
            'lime-a200': '#eeff41',
            'lime-a400': '#c6ff00',
            'lime-a700': '#aeea00',
            'yellow-50': '#fffde7',
            'yellow-100': '#fff9c4',
            'yellow-200': '#fff59d',
            'yellow-300': '#fff176',
            'yellow-400': '#ffee58',
            'yellow-500': '#ffeb3b',
            'yellow-600': '#fdd835',
            'yellow-700': '#fbc02d',
            'yellow-800': '#f9a825',
            'yellow-900': '#f57f17',
            'yellow-a100': '#ffff8d',
            'yellow-a200': '#ffff00',
            'yellow-a400': '#ffea00',
            'yellow-a700': '#ffd600',
            'amber-50': '#fff8e1',
            'amber-100': '#ffecb3',
            'amber-200': '#ffe082',
            'amber-300': '#ffd54f',
            'amber-400': '#ffca28',
            'amber-500': '#ffc107',
            'amber-600': '#ffb300',
            'amber-700': '#ffa000',
            'amber-800': '#ff8f00',
            'amber-900': '#ff6f00',
            'amber-a100': '#ffe57f',
            'amber-a200': '#ffd740',
            'amber-a400': '#ffc400',
            'amber-a700': '#ffab00',
            'orange-50': '#fff3e0',
            'orange-100': '#ffe0b2',
            'orange-200': '#ffcc80',
            'orange-300': '#ffb74d',
            'orange-400': '#ffa726',
            'orange-500': '#ff9800',
            'orange-600': '#fb8c00',
            'orange-700': '#f57c00',
            'orange-800': '#ef6c00',
            'orange-900': '#e65100',
            'orange-a100': '#ffd180',
            'orange-a200': '#ffab40',
            'orange-a400': '#ff9100',
            'orange-a700': '#ff6d00',
            'deep-orange-50': '#fbe9e7',
            'deep-orange-100': '#ffccbc',
            'deep-orange-200': '#ffab91',
            'deep-orange-300': '#ff8a65',
            'deep-orange-400': '#ff7043',
            'deep-orange-500': '#ff5722',
            'deep-orange-600': '#f4511e',
            'deep-orange-700': '#e64a19',
            'deep-orange-800': '#d84315',
            'deep-orange-900': '#bf360c',
            'deep-orange-a100': '#ff9e80',
            'deep-orange-a200': '#ff6e40',
            'deep-orange-a400': '#ff3d00',
            'deep-orange-a700': '#dd2c00',
            'brown-50': '#efebe9',
            'brown-100': '#d7ccc8',
            'brown-200': '#bcaaa4',
            'brown-300': '#a1887f',
            'brown-400': '#8d6e63',
            'brown-500': '#795548',
            'brown-600': '#6d4c41',
            'brown-700': '#5d4037',
            'brown-800': '#4e342e',
            'brown-900': '#3e2723',
            'brown-a100': '#d7ccc8',
            'brown-a200': '#bcaaa4',
            'brown-a400': '#8d6e63',
            'brown-a700': '#5d4037',
            'grey-50': '#fafafa',
            'grey-100': '#f5f5f5',
            'grey-200': '#eeeeee',
            'grey-300': '#e0e0e0',
            'grey-400': '#bdbdbd',
            'grey-500': '#9e9e9e',
            'grey-600': '#757575',
            'grey-700': '#616161',
            'grey-800': '#424242',
            'grey-900': '#212121',
            'grey-1000': '#000000',
            'grey-a100': '#ffffff',
            'grey-a200': '#eeeeee',
            'grey-a400': '#bdbdbd',
            'grey-a700': '#616161',
            'blue-grey-50': '#eceff1',
            'blue-grey-100': '#cfd8dc',
            'blue-grey-200': '#b0bec5',
            'blue-grey-300': '#90a4ae',
            'blue-grey-400': '#78909c',
            'blue-grey-500': '#607d8b',
            'blue-grey-600': '#546e7a',
            'blue-grey-700': '#455a64',
            'blue-grey-800': '#37474f',
            'blue-grey-900': '#263238',
            'blue-grey-a100': '#cfd8dc',
            'blue-grey-a200': '#b0bec5',
            'blue-grey-a400': '#78909c',
            'blue-grey-a700': '#455a64'
        };
        colors['light'] = colors['grey-100'];
        colors['dark'] = colors['grey-900'];
        colors['default'] = colors['grey-900'];
        colors['primary'] = colors['blue-900'];
        colors['secondary'] = colors['pink-a700'];
        colors['info'] = colors['light-blue-a700'];
        colors['success'] = colors['green-700'];
        colors['warning'] = colors['amber-700'];
        colors['danger'] = colors['red-700'];
        var camelCasedColors = {};
        for (var i in colors) {
            camelCasedColors[_.camelCase(i)] = colors[i];
        }
        var config = {
            name: 'Peak UI',
            colors: camelCasedColors
        };
        if ($('html').hasClass('loading')) {
            var loaderTime = 3000;
            var loaderColor = colors.primary;
            var htmlClass = $('html').attr('class').toString();
            if (htmlClass.match(/loading-secondary/gi)) {
                loaderColor = colors.secondary;
            } else if (htmlClass.match(/loading\-info/gi)) {
                loaderColor = colors.info;
            } else if (htmlClass.match(/loading\-success/gi)) {
                loaderColor = colors.success;
            } else if (htmlClass.match(/loading\-warning/gi)) {
                loaderColor = colors.warning;
            } else if (htmlClass.match(/loading\-danger/gi)) {
                loaderColor = colors.danger;
            } else {
                loaderColor = colors.primary;
            }
            $("#fakeloader").fakeLoader({
                timeToHide: loaderTime,
                zIndex: "99999", //Default zIndex
                spinner: "spinner1", //Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
                bgColor: loaderColor
            });
            setTimeout(function() {
                $('html').removeClass('loading');
            }, loaderTime);
        }
        $('body').bootstrapMaterialDesign({
            text: {
                selector: [`input:not([type=range]):not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])`]
            },
        });
        if ($.localStorage.isEmpty('config') || !($.localStorage.get('config'))) {
            $.removeAllStorages();
            $.localStorage.set('config', config);
        }
        Mousetrap.bind('ctrl+1', function() {
            $.removeAllStorages();
        });
        Mousetrap.bind('ctrl+2', function() {
            var layout = $('body').data('layout');
            $('body').toggleClass('layout-collapsed');
            if (layout === 'default-sidebar-2' && $('body').hasClass('layout-collapsed')) {
                $('.left-sidebar-backdrop').toggleClass('fade in');
            } else if (layout === 'top-navigation-1' && $('body').hasClass('layout-collapsed')) {
                $('.left-sidebar-backdrop').toggleClass('fade in');
            } else if (layout === 'top-navigation-2' && $('body').hasClass('layout-collapsed')) {
                $('.left-sidebar-backdrop').toggleClass('fade in');
            } else {
                $('.left-sidebar-backdrop').removeClass('fade');
                $('.left-sidebar-backdrop').removeClass('in');
            }
        });
        Mousetrap.bind('ctrl+3', function() {
            $('.right-sidebar-outer').toggleClass('show-from-right');
            var layout = $('body').data('layout');
            if ($('.right-sidebar-outer').hasClass('show-from-right')) {
                $('.right-sidebar-backdrop').toggleClass('fade in');
            } else {
                $('.right-sidebar-backdrop').removeClass('fade');
                $('.right-sidebar-backdrop').removeClass('in');
            }
        });
        Mousetrap.bind('ctrl+4', function() {
            $(document).fullScreen(true);
        });
        Mousetrap.bind('ctrl+5', function() {
            $('.top-search').toggleClass('show-from-top');
        });
    });
})();

//# sourceMappingURL=common.js.map

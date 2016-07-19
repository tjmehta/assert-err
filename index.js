var assert = require('assert')

module.exports = assertErr

function assertErr (value, Err/*, ...args */) {
  assert(typeof Err === 'function', '"Error" must be a function')
  var args = Array.prototype.slice.call(arguments, 2)
  assert(args.length <= 5, 'assertErr does not support more than five Error args')
  if (!value) {
    var err = createInstance(Err, args)
    // remove `assertErr` and `createInstance` from stack
    if (err.stack) {
      var stackLines = err.stack.split('\n')
      stackLines
        .splice(1, 2)
        .filter(matches(new RegExp('.* ' + __dirname)))
      err.stack = stackLines.join('\n')
    }
    // throw the error
    throw err
  }
}

function createInstance (Class, args) {
  return (args.length === 0)
    ? new Class()
    : (args.length === 1)
      ? new Class(args[0])
      : (args.length === 2)
        ? new Class(args[0], args[1])
        : (args.length === 3)
          ? new Class(args[0], args[1], args[2])
          : (args.length === 4)
            ? new Class(args[0], args[1], args[2], args[3])
            : new Class(args[0], args[1], args[2], args[3], args[4])
}

function matches (re) {
  return re.test.bind(re)
}
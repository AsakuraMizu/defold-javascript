// https://defold.com/ref/stable/base/
// https://github.com/TypeScriptToLua/lua-types/blob/master/core/global.d.ts

/**
 * A global variable (not a function) that holds a string containing the running
 * Lua version.
 */
export const _VERSION: string = lua._VERSION;

/**
 * Calls error if the value of its argument `v` is false (i.e., nil or false);
 * otherwise, returns all its arguments. In case of error, `message` is the
 * error object; when absent, it defaults to "assertion failed!"
 */
export function assert(v: any, message?: string): asserts v {
  return lua.assert(1, v, message);
}

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Performs a full garbage-collection cycle. This is the default option.
 */
export function collectgarbage(opt?: 'collect'): void;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Stops automatic execution of the garbage collector. The collector will run
 * only when explicitly invoked, until a call to restart it.
 */
export function collectgarbage(opt: 'stop'): void;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Restarts automatic execution of the garbage collector.
 */
export function collectgarbage(opt: 'restart'): void;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Sets arg as the new value for the pause of the collector (see §2.5). Returns
 * the previous value for pause.
 */
export function collectgarbage(opt: 'setpause', arg: number): number;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Sets arg as the new value for the step multiplier of the collector (see
 * §2.5). Returns the previous value for step.
 */
export function collectgarbage(opt: 'setstepmul', arg: number): number;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Performs a garbage-collection step. The step "size" is controlled by arg.
 * With a zero value, the collector will perform one basic (indivisible) step.
 * For non-zero values, the collector will perform as if that amount of memory
 * (in KBytes) had been allocated by Lua. Returns true if the step finished a
 * collection cycle.
 */
export function collectgarbage(opt: 'step', arg: number): boolean;

export function collectgarbage(opt?: string, arg?: number): any {
  return lua.collectgarbage(1, opt, arg);
}

/**
 * Opens the named file and executes its contents as a Lua chunk. When called
 * without arguments, dofile executes the contents of the standard input
 * (stdin). Returns all values returned by the chunk. In case of errors, dofile
 * propagates the error to its caller (that is, dofile does not run in protected
 * mode).
 */
export function dofile(filename?: string): any {
  return lua.dofile(1, filename);
}

/**
 * Terminates the last protected function called and returns message as the
 * error object. Function error never returns.
 *
 * Usually, error adds some information about the error position at the
 * beginning of the message, if the message is a string. The level argument
 * specifies how to get the error position. With level 1 (the default), the
 * error position is where the error function was called. Level 2 points the
 * error to where the function that called error was called; and so on. Passing
 * a level 0 avoids the addition of error position information to the message.
 */
export function error(message: string, level?: number): never {
  throw lua.error(0, message, level);
}

/**
 * Receives any number of arguments, and prints their values to stdout,
 * using the tostring function to convert them to strings. print is not intended for
 * formatted output, but only as a quick way to show a value, typically for debugging.
 * For formatted output, use string.format.
 */
export function print(...args: any[]): void {
  lua.print(0, ...args);
}
// https://defold.com/ref/stable/html5/

/**
 * Executes the supplied string as JavaScript inside the browser.
 * A call to this function is blocking, the result is returned as-is, as a string.
 * (Internally this will execute the string using the `eval()` JavaScript function.)
 *
 * @param code Javascript code to run
 * @returns result as string
 */
export function run(code: string): string {
  return lua.html5.run(1, code);
}

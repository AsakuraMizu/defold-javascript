// https://defold.com/ref/stable/json/

/**
 * Decode a string of JSON data into a Lua table. A Lua error is raised for syntax errors.
 *
 * @param json json data
 * @returns decoded json
 */
export function decode(json: string): any {
  return lua.json.decode(1, json);
}

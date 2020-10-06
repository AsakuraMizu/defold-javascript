// https://defold.com/ref/stable/builtins/

export declare type Hash = {};

export type HashOrString = string | Hash;

/**
 * All ids in the engine are represented as hashes,
 * so a string needs to be hashed before it can be compared with an id.
 *
 * @param s string to hash
 * @returns a hashed string
 */
export function hash(s: HashOrString): Hash {
  return lua.hash(1, s);
}

/**
 * Returns a hexadecimal representation of a hash value.
 * The returned string is always padded with leading zeros.
 *
 * @param h hash value to get hex string for
 * @returns hex representation of the hash
 */
export function hash_to_hex(h: Hash): string {
  return lua.hash_to_hex(1, h);
}

/**
 * Pretty printing of Lua values.
 * This function prints Lua values in a manner similar to +print()+,
 * but will also recurse into tables and pretty print them.
 * There is a limit to how deep the function will recurse.
 *
 * @param v value to print
 */
export function pprint(v: any): void {
  lua.pprint(0, v);
}

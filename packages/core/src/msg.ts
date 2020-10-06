// https://defold.com/ref/stable/msg/

import { Hash, HashOrString } from './builtins';

export declare type Url = {
  socket: number;
  path: Hash;
  fragment: Hash;
};

export declare type HashOrStringOrUrl = HashOrString | Url;

/**
 * Post a message to a receiving URL.
 * The most common case is to send messages to a component.
 * If the component part of the receiver is omitted,
 * the message is broadcast to all components in the game object.
 *
 * The following receiver shorthands are available:
 *
 *    "." the current game object
 *    "#" the current component
 * There is a 2 kilobyte limit to the message parameter table size.
 *
 * @param receiver The receiver must be a string in URL-format, a URL object or a hashed string.
 * @param message_id The id must be a string or a hashed string.
 * @param message a lua table with message parameters to send.
 */
export function post(receiver: HashOrStringOrUrl, message_id: HashOrString, message?: Object): void {
  if (message === undefined) {
    lua.msg.post(0, receiver, message_id);
  } else {
    lua.msg.post(0, receiver, message_id, message);
  }
}

/**
 * This is equivalent to msg.url(nil) or msg.url("#"),
 * which creates an url to the current script component.
 *
 * @returns a new URL
 */
export function url(): Url;

/**
 * The format of the string must be [socket:][path][#fragment],
 * which is similar to a HTTP URL.
 * When addressing instances:
 *
 * `socket` is the name of a valid world (a collection)
 *
 * `path` is the id of the instance,
 *   which can either be relative the instance of the calling script or global
 *
 * `fragment` would be the id of the desired component
 * In addition, the following shorthands are available:
 *
 * "." the current game object
 *
 * "#" the current component
 *
 * @param urlstring string to create the url from
 * @returns a new URL
 */
export function url(urlstring: string): Url;

/**
 * @param socket socket of the URL
 * @param path path of the URL
 * @param fragment fragment of the URL
 * @returns a new URL
 */
export function url(socket: HashOrString, path: HashOrString, fragment: HashOrString): Url;

export function url(s?: HashOrString, path?: HashOrString, fragment?: HashOrString): Url {
  return lua.msg.url(1, s, path, fragment);
}

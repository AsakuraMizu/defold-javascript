import { hash, HashOrString, hash_to_hex } from './builtins';

export declare type SelfData = {};

export interface OnInputAction {
  /**
   * The amount of input given by the user. This is usually 1 for buttons and 0-1 for
   * analogue inputs. This is not present for mouse movement.
   */
  value?: number;

  /**
   * If the input was pressed this frame. This is not present for mouse movement.
   */
  pressed?: boolean;

  /**
   * If the input was released this frame. This is not present for mouse movement.
   */
  released?: boolean;

  /**
   * If the input was repeated this frame. This is similar to how a key on a keyboard
   * is repeated when you hold it down. This is not present for mouse movement.
   */
  repeated?: boolean;

  /**
   * The x value of a pointer device, if present.
   */
  x?: number;

  /**
   * The y value of a pointer device, if present.
   */
  y?: number;

  /**
   * The screen space x value of a pointer device, if present.
   */
  screen_x?: number;

  /**
   * The screen space y value of a pointer device, if present.
   */
  screen_y?: number;

  /**
   * The change in x value of a pointer device, if present.
   */
  dx?: number;

  /**
   * The change in y value of a pointer device, if present.
   */
  dy?: number;

  /**
   * The change in screen space x value of a pointer device, if present.
   */
  screen_dx?: number;

  /**
   * The change in screen space y value of a pointer device, if present.
   */
  screen_dy?: number;

  /**
   * The index of the gamepad device that provided the input.
   */
  gamepad?: number;

  /**
   * List of touch input, one element per finger, if present.
   */
  touch?: OnInputActionTouch[];
}

export interface OnInputActionTouch {
  /**
   * A number identifying the touch input during its duration.
   */
  id: number;

  /**
   * True if the finger was pressed this frame.
   */
  pressed: boolean;

  /**
   * True if the finger was released this frame.
   */
  released: boolean;

  /**
   * Number of taps, one for single, two for double-tap, etc
   */
  tap_count: number;

  /**
   * The x touch location.
   */
  x: number;

  /**
   * The y touch location.
   */
  y: number;

  /**
   * The change in x value.
   */
  dx: number;

  /**
   * The change in y value.
   */
  dy: number;

  /**
   * Accelerometer x value (if present).
   */
  acc_x?: number;

  /**
   * Accelerometer y value (if present).
   */
  acc_y?: number;

  /**
   * Accelerometer z value (if present).
   */
  acc_z?: number;
}

/**
 * Check if two hashes (or hash and string) is the same.
 *
 * @param h1 first hash or string
 * @param h2 second hash or string
 */
export function hasheq(h1: HashOrString, h2: HashOrString): boolean {
  return hash_to_hex(hash(h1)) === hash_to_hex(hash(h2));
}

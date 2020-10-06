// https://defold.com/ref/stable/go/

import { Hash, HashOrString } from './builtins';
import { HashOrStringOrUrl, Url } from './msg';
import { ResourcePropertyBase, ResourcePropertyType } from './resource';
import { SelfData } from './support';
import { Matrix4, Quaternion, Vector3, Vector4 } from './vmath';

export enum EASING {
  /** in-back */
  EASING_INBACK = lua.go.EASING_INBACK,

  /** in-bounce */
  EASING_INBOUNCE = lua.go.EASING_INBOUNCE,

  /** in-circlic */
  EASING_INCIRC = lua.go.EASING_INCIRC,

  /** in-cubic */
  EASING_INCUBIC = lua.go.EASING_INCUBIC,

  /** in-elastic */
  EASING_INELASTIC = lua.go.EASING_INELASTIC,

  /** in-exponential */
  EASING_INEXPO = lua.go.EASING_INEXPO,

  /** in-out-back */
  EASING_INOUTBACK = lua.go.EASING_INOUTBACK,

  /** in-out-bounce */
  EASING_INOUTBOUNCE = lua.go.EASING_INOUTBOUNCE,

  /** in-out-circlic */
  EASING_INOUTCIRC = lua.go.EASING_INOUTCIRC,

  /** in-out-cubic */
  EASING_INOUTCUBIC = lua.go.EASING_INOUTCUBIC,

  /** in-out-elastic */
  EASING_INOUTELASTIC = lua.go.EASING_INOUTELASTIC,

  /** in-out-exponential */
  EASING_INOUTEXPO = lua.go.EASING_INOUTEXPO,

  /** in-out-quadratic */
  EASING_INOUTQUAD = lua.go.EASING_INOUTQUAD,

  /** in-out-quartic */
  EASING_INOUTQUART = lua.go.EASING_INOUTQUART,

  /** in-out-quintic */
  EASING_INOUTQUINT = lua.go.EASING_INOUTQUINT,

  /** in-out-sine */
  EASING_INOUTSINE = lua.go.EASING_INOUTSINE,

  /** in-quadratic */
  EASING_INQUAD = lua.go.EASING_INQUAD,

  /** in-quartic */
  EASING_INQUART = lua.go.EASING_INQUART,

  /** in-quintic */
  EASING_INQUINT = lua.go.EASING_INQUINT,

  /** in-sine */
  EASING_INSINE = lua.go.EASING_INSINE,

  /** linear interpolation */
  EASING_LINEAR = lua.go.EASING_LINEAR,

  /** out-back */
  EASING_OUTBACK = lua.go.EASING_OUTBACK,

  /** out-bounce */
  EASING_OUTBOUNCE = lua.go.EASING_OUTBOUNCE,

  /** out-circlic */
  EASING_OUTCIRC = lua.go.EASING_OUTCIRC,

  /** out-cubic */
  EASING_OUTCUBIC = lua.go.EASING_OUTCUBIC,

  /** out-elastic */
  EASING_OUTELASTIC = lua.go.EASING_OUTELASTIC,

  /** out-exponential */
  EASING_OUTEXPO = lua.go.EASING_OUTEXPO,

  /** out-in-back */
  EASING_OUTINBACK = lua.go.EASING_OUTINBACK,

  /** out-in-bounce */
  EASING_OUTINBOUNCE = lua.go.EASING_OUTINBOUNCE,

  /** out-in-circlic */
  EASING_OUTINCIRC = lua.go.EASING_OUTINCIRC,

  /** out-in-cubic */
  EASING_OUTINCUBIC = lua.go.EASING_OUTINCUBIC,

  /** out-in-elastic */
  EASING_OUTINELASTIC = lua.go.EASING_OUTINELASTIC,

  /** out-in-exponential */
  EASING_OUTINEXPO = lua.go.EASING_OUTINEXPO,

  /** out-in-quadratic */
  EASING_OUTINQUAD = lua.go.EASING_OUTINQUAD,

  /** out-in-quartic */
  EASING_OUTINQUART = lua.go.EASING_OUTINQUART,

  /** out-in-quintic */
  EASING_OUTINQUINT = lua.go.EASING_OUTINQUINT,

  /** out-in-sine */
  EASING_OUTINSINE = lua.go.EASING_OUTINSINE,

  /** out-quadratic */
  EASING_OUTQUAD = lua.go.EASING_OUTQUAD,

  /** out-quartic */
  EASING_OUTQUART = lua.go.EASING_OUTQUART,

  /** out-quintic */
  EASING_OUTQUINT = lua.go.EASING_OUTQUINT,

  /** out-sine */
  EASING_OUTSINE = lua.go.EASING_OUTSINE,
}

export enum PLAYBACK {
  /** loop backward */
  PLAYBACK_LOOP_BACKWARD = lua.go.PLAYBACK_LOOP_BACKWARD,

  /** loop forward */
  PLAYBACK_LOOP_FORWARD = lua.go.PLAYBACK_LOOP_FORWARD,

  /** ping pong loop */
  PLAYBACK_LOOP_PINGPONG = lua.go.PLAYBACK_LOOP_PINGPONG,

  /** no playback */
  PLAYBACK_NONE = lua.go.PLAYBACK_NONE,

  /** once backward */
  PLAYBACK_ONCE_BACKWARD = lua.go.PLAYBACK_ONCE_BACKWARD,

  /** once forward */
  PLAYBACK_ONCE_FORWARD = lua.go.PLAYBACK_ONCE_FORWARD,

  /** once ping pong */
  PLAYBACK_ONCE_PINGPONG = lua.go.PLAYBACK_ONCE_PINGPONG,
}

/**
 * @param {SelfData} self The current object.
 * @param {Url} url The game object or component instance for which the property is animated.
 * @param {Hash} property The id of the animated property.
 */
type CompleteFunction = (self: SelfData, url: Url, property: Hash) => void;

/**
 * This is only supported for numerical properties.
 * If the node property is already being animated,
 * that animation will be canceled and replaced by the new one.
 *
 * If a complete_function (lua function) is specified,
 * that function will be called when the animation has completed.
 * By starting a new animation in that function,
 * several animations can be sequenced together.
 * See the examples for more information.
 *
 * If you call go.animate() from a game object's final() function,
 * any passed complete_function will be ignored and never called upon animation completion.
 *
 * See the properties guide for which properties can be animated
 * and the animation guide for how to animate them.
 *
 * @param url url of the game object or component having the property
 * @param property id of the property to animate
 * @param playback playback mode of the animation
 * @param to target property value
 * @param easing easing to use during animation. Either specify a constant, see the animation guide for a complete list, or a vmath.vector with a curve
 * @param duration duration of the animation in seconds
 * @param delay delay before the animation starts in seconds
 * @param complete_function optional function to call when the animation has completed
 */
export function animate(
  url: HashOrStringOrUrl,
  property: HashOrString,
  playback: PLAYBACK,
  to: number,
  easing: EASING,
  duration: number,
  delay?: number,
  complete_function?: CompleteFunction
): void {
  lua.go.animate(0, url, property, playback, to, easing, duration, delay, complete_function);
}

/**
 * By calling this function, all stored animations of the given property will be canceled.
 *
 * See the properties guide for which properties can be animated
 * and the animation guide for how to animate them.
 * @param url url of the game object or component having the property
 * @param property id of the property to animate
 */
export function cancel_animations(url: HashOrStringOrUrl, property: HashOrString): void {
  lua.go.cancel_animations(0, url, property);
}

/**
 * Delete one or more game objects identified by id.
 * Deletion is asynchronous meaning that the game object(s) are scheduled
 * for deletion which will happen at the end of the current frame.
 * Note that game objects scheduled for deletion will be counted against
 * max_instances in "game.project" until they are actually removed.
 *
 * Deleting a game object containing a particle FX component emitting particles
 * will not immediately stop the particle FX from emitting particles.
 * You need to manually stop the particle FX using particlefx.stop().
 *
 * Deleting a game object containing a sound component that is playing
 * will not immediately stop the sound from playing.
 * You need to manually stop the sound using sound.stop().
 *
 * @param id optional id or table of id's of the instance(s) to delete, the instance of the calling script is deleted by default
 * @param recursive optional boolean, set to true to recursively delete child hiearchy in child to parent order
 */
export function delete_(id: HashOrStringOrUrl | Array<HashOrStringOrUrl>, recursive?: boolean): void {
  if (Array.isArray(id)) {
    const table = {};
    id.forEach((value, index) => table[index + 1] = value);
    lua.go['delete'](0, table, recursive);
  } else {
    lua.go['delete'](0, id, recursive);
  }
}

/**
 * @param url url of the game object or component having the property
 * @param property id of the property to retrieve
 * @returns the value of the specified property
 */
export function get(url: HashOrStringOrUrl, property: HashOrString): any {
  return lua.go.get(1, url, property);
}

/**
 * Returns or constructs an instance identifier.
 * The instance id is a hash of the absolute path to the instance.
 *
 * If `path` is specified, it can either be absolute or relative to
 * the instance of the calling script.
 *
 * If `path` is not specified, the id of the game object instance
 * the script is attached to will be returned.
 *
 * @param path of the instance for which to return the id
 * @returns instance id
 */
export function get_id(path?: string): Hash {
  return lua.go.get_id(1, path);
}

/**
 * The position is relative the parent (if any).
 * Use `go.get_world_position` to retrieve the global world position. 
 *
 * @param id optional id of the game object instance to get the position for, by default the instance of the calling script
 * @returns instance position
 */
export function get_position(id?: HashOrStringOrUrl): Vector3 {
  return new Vector3(lua.go.get_position(1, id));
}

/**
 * The rotation is relative to the parent (if any).
 * Use `go.get_world_rotation` to retrieve the global world rotation.
 *
 * @param id optional id of the game object instance to get the rotation for, by default the instance of the calling script
 * @returns instance rotation
 */
export function get_rotation(id?: HashOrStringOrUrl): Quaternion {
  return new Quaternion(lua.go.get_rotation(1, id));
}

/**
 * The scale is relative the parent (if any).
 * Use `go.get_world_scale` to retrieve the global world 3D scale factor.
 *
 * @param id optional id of the game object instance to get the scale for, by default the instance of the calling script
 * @returns instance scale factor
 */
export function get_scale(id?: HashOrStringOrUrl): Vector3 {
  return new Vector3(lua.go.get_scale(1, id));
}

/**
 * The uniform scale is relative the parent (if any). If the underlying scale vector is
 * non-uniform the min element of the vector is returned as the uniform scale factor.
 *
 * @param id optional id of the game object instance to get the uniform scale for, by default the instance of the calling script
 * @returns uniform instance scale factor
 */
export function get_scale_uniform(id?: HashOrStringOrUrl): number {
  return lua.go.get_scale_uniform(1, id);
}

/**
 * Use `go.get_position` to retrieve the position relative to the parent.
 *
 * @param id optional id of the game object instance to get the world position for, by default the instance of the calling script
 * @returns instance world position
 */
export function get_world_position(id?: HashOrStringOrUrl): Vector3 {
  return new Vector3(lua.go.get_world_position(1, id));
}

/**
 * Use `go.get_rotation` to retrieve the rotation relative to the parent.
 *
 * @param id optional id of the game object instance to get the world rotation for, by default the instance of the calling script
 * @returns instance world rotation
 */
export function get_world_rotation(id?: HashOrStringOrUrl): Quaternion {
  return new Quaternion(lua.go.get_world_rotation(1, id));
}

/**
 * Use `go.get_scale` to retrieve the 3D scale factor relative to the parent.
 * This vector is derived by decomposing the transformation matrix and should be used with care.
 * For most cases it should be fine to use go.get_world_scale_uniform instead.
 *
 * @param id optional id of the game object instance to get the world scale for, by default the instance of the calling script
 * @returns instance world 3D scale factor
 */
export function get_world_scale(id?: HashOrStringOrUrl): Vector3 {
  return new Vector3(lua.go.get_world_scale(1, id));
}

/**
 * Use `go.get_scale_uniform` to retrieve the scale factor relative to the parent.
 *
 * @param id optional id of the game object instance to get the world scale for, by default the instance of the calling script
 * @returns instance world scale factor
 */
export function get_world_scale_uniform(id?: HashOrStringOrUrl): number {
  return lua.go.get_world_scale_uniform(1, id);
}

/**
 * @param id optional id of the game object instance to get the world transform for, by default the instance of the calling script
 * @returns instance world transform
 */
export function get_world_transform(id?: HashOrStringOrUrl): Matrix4 {
  return new Matrix4(lua.go.get_world_transform(1, id));
}

export type PropertyType = number | Hash | Url | Vector3 | Vector4 | Quaternion | ResourcePropertyType;

/**
 * This function defines a property which can then be used in the script through the
 * self-reference. The properties defined this way are automatically exposed in the editor
 * in game objects and collections which use the script. Note that you can only use this
 * function outside any callback-functions like init and update.
 *
 * @param name the id of the property
 * @param value default value of the property. In the case of a url, only the empty constructor msg.url() is allowed. In the case of a resource one of the resource constructors (eg resource.atlas(), resource.font() etc) is expected.
 */
export function property(name: string, value: PropertyType): void {
  if (value instanceof ResourcePropertyBase || value instanceof Vector3 || value instanceof Vector4 || value instanceof Quaternion) {
    lua.go.property(0, name, value.data);
  } else {
    lua.go.property(0, name, value);
  }
}

/**
 * @param id url of the game object or component having the property
 * @param property id of the property to set
 * @param value the value to set
 */
export function set(id: HashOrStringOrUrl, property: HashOrString, value: any): void {
  lua.go.set(0, id, property, value);
}
/**
 * Sets the parent for a game object instance.
 * This means that the instance will exist in the geometrical space of its parent,
 * like a basic transformation hierarchy or scene graph. If no parent is specified,
 * the instance will be detached from any parent and exist in world space.
 * This function will generate a `set_parent` message.
 * It is not until the message has been processed that the change actually takes effect.
 * This typically happens later in the same frame or the beginning of the next frame.
 * Refer to the manual to learn how messages are processed by the engine.
 *
 * @param id optional id of the game object instance to set parent for, defaults to the instance containing the calling script
 * @param parent_id optional id of the new parent game object, defaults to detaching game object from its parent
 * @param keep_world_transform optional boolean, set to true to maintain the world transform when changing spaces. Defaults to false.
 */
export function set_parent(id?: HashOrStringOrUrl, parent_id?: HashOrStringOrUrl, keep_world_transform?: boolean): void {
  lua.go.set_parent(0, id, parent_id, keep_world_transform);
}

/**
 * The position is relative to the parent (if any). The global world position cannot be manually set.
 *
 * @param position position to set
 * @param id optional id of the game object instance to set the position for, by default the instance of the calling script
 */
export function set_position(position: Vector3, id?: HashOrStringOrUrl): void {
  lua.go.set_position(0, position.data, id);
}

/**
 * The rotation is relative to the parent (if any). The global world rotation cannot be manually set.
 *
 * @param rotation rotation to set
 * @param id optional id of the game object instance to set the rotation for, by default the instance of the calling script
 */
export function set_rotation(rotation: Quaternion, id?: HashOrStringOrUrl): void {
  lua.go.set_rotation(0, rotation.data, id);
}

/**
 * The scale factor is relative to the parent (if any).
 * The global world scale factor cannot be manually set.
 *
 * Physics are currently not affected when setting scale from this function.
 *
 * @param scale vector or uniform scale factor, must be greater than 0
 * @param id optional id of the game object instance to set the scale for, by default the instance of the calling script
 */
export function set_scale(scale: number | Vector3, id?: HashOrStringOrUrl): void {
  if (typeof scale === 'number') {
    lua.go.set_scale(0, scale, id);
  } else {
    lua.go.set_scale(0, scale.data, id);
  }
}

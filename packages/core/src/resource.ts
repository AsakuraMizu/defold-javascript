// https://defold.com/ref/stable/resource/

import { Buffer } from './buffer';
import { HashOrString } from './builtins';
import { SelfData } from './support';

declare type ResourceData = {};

export class ResourcePropertyBase {
  data: ResourceData;
}

export class AtlasResource extends ResourcePropertyBase {
  constructor() {
    super();
    this.data = lua.resource.atlas(1);
  }
}

export class BufferResource extends ResourcePropertyBase {
  constructor() {
    super();
    this.data = lua.resource.buffer(1);
  }
}

export class FontResource extends ResourcePropertyBase {
  constructor() {
    super();
    this.data = lua.resource.font(1);
  }
}

export class MaterialResource extends ResourcePropertyBase {
  constructor() {
    super();
    this.data = lua.resource.material(1);
  }
}

export class TextureResource extends ResourcePropertyBase {
  constructor() {
    super();
    this.data = lua.resource.texture(1);
  }
}

export class TileSourceResource extends ResourcePropertyBase {
  constructor() {
    super();
    this.data = lua.resource.tile_source(1);
  }
}

export type ResourcePropertyType = AtlasResource | BufferResource | FontResource | MaterialResource | TextureResource | TileSourceResource;

export enum LIVEUPDATE_STATUS {
  /** Mismatch between between expected bundled resources and actual bundled resources. The manifest expects a resource to be in the bundle, but it was not found in the bundle. This is typically the case when a non-excluded resource was modified between publishing the bundle and publishing the manifest. */
  LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH = lua.resource.LIVEUPDATE_BUNDLED_RESOURCE_MISMATCH,

  /** Mismatch between running engine version and engine versions supported by manifest. */
  LIVEUPDATE_ENGINE_VERSION_MISMATCH = lua.resource.LIVEUPDATE_ENGINE_VERSION_MISMATCH,

  /** Failed to parse manifest data buffer. The manifest was probably produced by a different engine version. */
  LIVEUPDATE_FORMAT_ERROR = lua.resource.LIVEUPDATE_FORMAT_ERROR,

  /** The handled resource is invalid. */
  LIVEUPDATE_INVALID_RESOURCE = lua.resource.LIVEUPDATE_INVALID_RESOURCE,

  LIVEUPDATE_OK = lua.resource.LIVEUPDATE_OK,

  /** Mismatch between scheme used to load resources. Resources are loaded with a different scheme than from manifest, for example over HTTP or directly from file. This is typically the case when running the game directly from the editor instead of from a bundle. */
  LIVEUPDATE_SCHEME_MISMATCH = lua.resource.LIVEUPDATE_SCHEME_MISMATCH,

  /** Mismatch between manifest expected signature and actual signature. */
  LIVEUPDATE_SIGNATURE_MISMATCH = lua.resource.LIVEUPDATE_SIGNATURE_MISMATCH,

  /** Mismatch between manifest expected version and actual version. */
  LIVEUPDATE_VERSION_MISMATCH = lua.resource.LIVEUPDATE_VERSION_MISMATCH,
}

export enum TEXTURE_FORMAT {
  /** luminance type texture format */
  TEXTURE_FORMAT_LUMINANCE = lua.resource.TEXTURE_FORMAT_LUMINANCE,

  /** RGB type texture format */
  TEXTURE_FORMAT_RGB = lua.resource.TEXTURE_FORMAT_RGB,

  /** RGBA type texture format */
  TEXTURE_FORMAT_RGBA = lua.resource.TEXTURE_FORMAT_RGBA,
}

export enum TEXTURE_TYPE {
  /** 2D texture type */
  TEXTURE_TYPE_2D = lua.resource.TEXTURE_TYPE_2D,
}

/**
 * gets the buffer from a resource
 *
 * @param path The path to the resource
 * @returns The resource buffer
 */
export function get_buffer(path: HashOrString): Buffer {
  return new Buffer(lua.resource.get_buffer(1, path));
}

export type ManifestReference = number;

/**
 * Return a reference to the Manifest that is currently loaded.
 *
 * @returns reference to the Manifest that is currently loaded
 */
export function get_current_manifest(): ManifestReference {
  return lua.resource.get_current_manifest(1);
}

/**
 * Loads the resource data for a specific resource.
 *
 * @param path The path to the resource
 * @returns Returns the buffer stored on disc
 */
export function load(path: string): Buffer {
  return new Buffer(lua.resource.load(1, path));
}

/**
 * Sets the resource data for a specific resource
 *
 * @param path The path to the resource
 * @param buffer The buffer of precreated data, suitable for the intended resource type
 */
export function set(path: HashOrString, buffer: Buffer): void {
  lua.resource.set(0, path, buffer.data);
}

/**
 * sets the buffer of a resource
 *
 * @param path The path to the resource
 * @param buffer The resource buffer
 */
export function set_buffer(path: HashOrString, buffer: Buffer): void {
  lua.resource.set_buffer(0, path, buffer.data);
}

/**
 * A table containing info about the texture.
 */
export interface TextureInfo {
  /** The texture type. */
  type: TEXTURE_TYPE;

  /** The width of the texture (in pixels) */
  width: number;

  /** The width of the texture (in pixels) */
  height: number;

  /** The texture format. */
  format: TEXTURE_FORMAT;
}

/**
 * Sets the pixel data for a specific texture.
 *
 * @param path The path to the resource
 * @param table A table containing info about the texture.
 * @param buffer The buffer of precreated pixel data. (Currently, only 1 mipmap is generated.)
 */
export function set_texture(path: HashOrString, table: TextureInfo, buffer: Buffer): void {
  lua.resource.set_texture(0, path, table, buffer.data);
}

/**
 * the callback function executed once the engine has attempted to store the manifest.
 * 
 * @param self The current object.
 * @param status the status of the store operation
 */
type StoreManifestCallback = (self: SelfData, status: LIVEUPDATE_STATUS) => void;

/**
 * Create a new manifest from a buffer. The created manifest is verified by ensuring tha
 * the manifest was signed using the bundled public/private key-pair during the bundle process
 * and that the manifest supports the current running engine version. Once the manifest is
 * verified it is stored on device. The next time the engine starts (or is rebooted) it will
 * look for the stored manifest before loading resources. Storing a new manifest allows the
 * developer to update the game, modify existing resources, or add new resources to the game
 * through LiveUpdate.
 * 
 * @param manifest_buffer the binary data that represents the manifest
 * @param callback the callback function executed once the engine has attempted to store the manifest.
 */
export function store_manifest(manifest_buffer: string, callback: StoreManifestCallback): void {
  lua.resource.store_manifest(0, manifest_buffer, callback);
}

/**
 * The callback function that is executed once the engine has been attempted to store the resource.
 *
 * @param self The current object.
 * @param hexdigest The hexdigest of the resource.
 * @param status Whether or not the resource was successfully stored.
 */
type StoreResourceCallback = (self: SelfData, hexdigest: string, status: boolean) => void;

/**
 * add a resource to the data archive and runtime index. The resource will be verified
 * internally before being added to the data archive.
 *
 * @param manifest_reference The manifest to check against.
 * @param data The resource data that should be stored.
 * @param hexdigest The expected hash for the resource, retrieved through collectionproxy.missing_resources.
 * @param callback The callback function that is executed once the engine has been attempted to store the resource.
 */
export function store_resource(manifest_reference: number, data: string, hexdigest: string, callback: StoreResourceCallback): void {
  lua.resource.store_resource(0, manifest_reference, data, hexdigest, callback);
}

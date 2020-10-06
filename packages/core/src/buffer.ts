// https://defold.com/ref/stable/buffer/

import { HashOrString } from './builtins';

export enum CONSTANT {
  /** Float, single precision, 4 bytes */
  VALUE_TYPE_FLOAT32 = lua.buffer.VALUE_TYPE_FLOAT32,

  /** Signed integer, 2 bytes */
  VALUE_TYPE_INT16 = lua.buffer.VALUE_TYPE_INT16,

  /** Signed integer, 4 bytes */
  VALUE_TYPE_INT32 = lua.buffer.VALUE_TYPE_INT32,

  /** Signed integer, 8 bytes */
  VALUE_TYPE_INT64 = lua.buffer.VALUE_TYPE_INT64,

  /** Signed integer, 1 byte */
  VALUE_TYPE_INT8 = lua.buffer.VALUE_TYPE_INT8,

  /** Unsigned integer, 2 bytes */
  VALUE_TYPE_UINT16 = lua.buffer.VALUE_TYPE_UINT16,

  /** Unsigned integer, 4 bytes */
  VALUE_TYPE_UINT32 = lua.buffer.VALUE_TYPE_UINT32,

  /** Unsigned integer, 8 bytes */
  VALUE_TYPE_UINT64 = lua.buffer.VALUE_TYPE_UINT64,

  /** Unsigned integer, 1 byte */
  VALUE_TYPE_UINT8 = lua.buffer.VALUE_TYPE_UINT8,
}

/**
 * A table where each entry (table) describes a stream
 */
export interface BufferDeclaration {
  /** The name of the stream */
  name: HashOrString;

  /** The data type of the stream */
  type: CONSTANT;

  /** The number of values each element should hold */
  count: number;
}

export declare type BufferStream = {
  [index: number]: number;
};

export declare type BufferData = {};

export class Buffer {
  data: BufferData;

  /**
   * Create a new data buffer containing a specified set of streams.
   * A data buffer can contain one or more streams with typed data.
   * This is useful for managing compound data, for instance a vertex buffer could contain
   * separate streams for vertex position, color, normal etc.
   * 
   * @param element_count The number of elements the buffer should hold
   * @param declaration A table where each entry (table) describes a stream
   */
  constructor(element_count: number, declaration: BufferDeclaration);

  constructor(buffer: BufferData);

  constructor(arg0: number | BufferData, arg1?: BufferDeclaration) {
    if (typeof arg0 === 'number')
      this.data = lua.buffer.create(1, arg0, arg1);
    else
      this.data = arg0;
  }

  /**
   * Get a copy of all the bytes from a specified stream as a Lua string.
   *
   * @param stream_name the name of the stream
   * @returns the buffer data as a Lua string
   */
  get_bytes(stream_name: HashOrString): string {
    return lua.buffer.get_bytes(1, this.data, stream_name);
  }

  /**
   * Get a specified stream from a buffer.
   *
   * @param stream_name the stream name
   * @returns the data stream
   */
  get_stream(stream_name: HashOrString): BufferStream {
    return lua.buffer.get_stream(1, this.data, stream_name);
  }
}

/**
 * Copy all data streams from one buffer to another, element wise.
 *
 * Each of the source streams must have a matching stream in the destination buffer.
 * The streams must match in both type and size. The source and destination buffer can be the same.
 *
 * @param dst the destination buffer
 * @param dstoffset the offset to start copying data to
 * @param src the source data buffer
 * @param srcoffset the offset to start copying data from
 * @param count the number of elements to copy
 */
export function copy_buffer(dst: Buffer, dstoffset: number, src: Buffer, srcoffset: number, count: number): void {
  lua.buffer.copy_buffer(dst.data, dstoffset, src.data, srcoffset, count);
}

/**
 * Copy a specified amount of data from one stream to another.
 *
 * The value type and size must match between source and destination streams.
 * The source and destination streams can be the same.
 *
 * @param dst the destination stream
 * @param dstoffset the offset to start copying data to (measured in value type)
 * @param src the source data stream
 * @param srcoffset the offset to start copying data from (measured in value type)
 * @param count the number of elements to copy (measured in value type)
 */
export function copy_stream(dst: BufferStream, dstoffset: number, src: BufferStream, srcoffset: number, count: number): void {
  lua.buffer.copy_stream(dst, dstoffset, src, srcoffset, count);
}

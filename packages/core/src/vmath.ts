// https://defold.com/ref/stable/vmath/

export class Vector3 {
  data: Vector3.Data;

  get x(): number { return this.data.x; }
  set x(x) { this.data.x = x; }
  get y(): number { return this.data.y; }
  set y(y) { this.data.y = y; }
  get z(): number { return this.data.z; }
  set z(z) { this.data.z = z; }

  /**
   * Creates a new zero vector with all components set to 0.
   *
   * @returns new zero vector
   */
  constructor();

  /**
   * Creates a new vector with all components set to the supplied scalar value.
   *
   * @param n scalar value to splat
   * @returns new vector
   */
  constructor(n: number);

  /**
   * Creates a new vector with all components set to the corresponding values
   * from the supplied vector. I.e. This function creates a copy of the given vector.
   *
   * @param v1 existing vector
   * @returns new vector
   */
  constructor(v1: Vector3);

  /**
   * Creates a new vector with the components set to the supplied values.
   *
   * @param x x coordinate
   * @param y y coordinate
   * @param z z coordinate
   * @returns new vector
   */
  constructor(x: number, y: number, z: number);

  /**
   * Creates a new vector with all components set to the corresponding values
   * from the supplied vector. I.e. This function creates a copy of the given vector.
   *
   * @param v1 existing vector
   * @returns new vector
   */
  constructor(v1: Vector3.Data);

  constructor(x?: number | Vector3 | Vector3.Data, y?: number, z?: number) {
    if (typeof x === 'undefined' || typeof x === 'number' || x instanceof Vector3) {
      this.data = lua.vmath.vector3(1, x, y, z);
    } else {
      this.data = x;
    }
  }

  /**
   * Returns the length of the supplied vector or quaternion.
   *
   * If you are comparing the lengths of vectors or quaternions, you should compare
   * the length squared instead as it is slightly more efficient to calculate
   * (it eliminates a square root calculation).
   *
   * @returns length
   */
  length(): number {
    return lua.vmath.length(1, this.data);
  }

  /**
   * Returns the squared length of the supplied vector or quaternion.
   *
   * @returns squared length
   */
  length_sqr(): number {
    return lua.vmath.length_sqr(1, this.data);
  }

  /**
   * Normalizes a vector, i.e. returns a new vector with the same direction
   * as the input vector, but with length 1.
   *
   * The length of the vector must be above 0, otherwise a division-by-zero will occur.
   *
   * @returns new nomalized vector
   */
  normalize(): Vector3 {
    return new Vector3(lua.vmath.normalize(1, this.data));
  }

  /**
   * Returns a new vector from the supplied vector that is rotated by the rotation described
   * by the supplied quaternion.
   *
   * @param q quaternion
   * @returns the rotated vector
   */
  rotate(q: Quaternion): Vector3 {
    return new Vector3(lua.vmath.rotate(1, q.data, this.data));
  }
}

export namespace Vector3 {
  export declare type Data = {
    x: number;
    y: number;
    z: number;
  };

  /**
   * Given two linearly independent vectors P and Q, the cross product,
   * P × Q, is a vector that is perpendicular to both P and Q
   * and therefore normal to the plane containing them.
   *
   * If the two vectors have the same direction (or have the exact opposite direction from
   * one another, i.e. are not linearly independent) or if either one has zero length,
   * then their cross product is zero.
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns a new vector representing the cross product
   */
  export function cross(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(lua.vmath.cross(1, v1.data, v2.data));
  }

  /**
   * The returned value is a scalar defined as:
   * `P ⋅ Q = |P| |Q| cos θ`
   * where θ is the angle between the vectors P and Q.
   *
   * If the dot product is positive then the angle between the vectors is below 90 degrees.
   *
   * If the dot product is zero the vectors are perpendicular (at right-angles to each other).
   *
   * If the dot product is negative then the angle between the vectors is more than 90 degrees.
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns dot product
   */
  export function dot(v1: Vector3, v2: Vector3): number {
    return lua.vmath.dot(1, v1.data, v2.data);
  }

  /**
   * Linearly interpolate between two vectors. The function treats the vectors as
   * positions and interpolates between the positions in a straight line. Lerp is
   * useful to describe transitions from one place to another over time.
   *
   * The function does not clamp t between 0 and 1.
   *
   * @param t interpolation parameter, 0-1
   * @param v1 vector to lerp from
   * @param v2 vector to lerp to
   * @returns the lerped vector
   */
  export function lerp(t: number, v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(lua.vmath.lerp(1, t, v1.data, v2.data));
  }

  /**
   * Spherically interpolates between two vectors. The difference to lerp is that slerp
   * treats the vectors as directions instead of positions in space.
   *
   * The direction of the returned vector is interpolated by the angle and the magnitude
   * is interpolated between the magnitudes of the from and to vectors.
   *
   * Slerp is computationally more expensive than lerp.
   * The function does not clamp t between 0 and 1.
   *
   * @param t interpolation parameter, 0-1
   * @param v1 vector to slerp from
   * @param v2 vector to slerp to
   * @returns the slerped vector
   */
  export function slerp(t: number, v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(lua.vmath.slerp(1, t, v1.data, v2.data));
  }

  /**
   * Performs an element wise multiplication between two vectors of the same type.
   * The returned value is a vector defined as (e.g. for a vector3):
   * `v = vmath.mul_per_elem(a, b) = vmath.vector3(a.x * b.x, a.y * b.y, a.z * b.z)`
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns multiplied vector
   */
  export function mul_per_elem(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(lua.vmath.mul_per_elem(1, v1.data, v2.data));
  }

  /**
   * Calculates the extent the projection of the first vector onto the second.
   * The returned value is a scalar p defined as:
   * `p = |P| cos θ / |Q|`
   * where θ is the angle between the vectors P and Q.
   *
   * @param v1 vector to be projected on the second
   * @param v2 vector onto which the first will be projected, must not have zero length
   * @returns the projected extent of the first vector onto the second
   */
  export function project(v1: Vector3, v2: Vector3): number {
    return lua.vmath.project(1, v1.data, v2.data);
  }

  /**
   * Operators for Vector3. Since JavaScript does not have an operator
   * overloading feature, we provide these helper functions.
   */

  /**
   * Vector3 addition. Equals to `v1 + v2`
   */
  export function add(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  /**
   * Vector3 subtraction. Equals to `v1 - v2`
   */
  export function sub(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  /**
   * Vector3 negation. Equals to `-v1`
   */
  export function neg(v1: Vector3): Vector3 {
    return new Vector3(-v1.x, -v1.y, -v1.z);
  }

  /**
   * Vector3 multiplication. Equals to `v1 * n`
   */
  export function mul(v1: Vector3, n: number) {
    return new Vector3(v1.x * n, v1.y * n, v1.z * n);
  }

  /**
   * Vector3 division. Equals to `v1 / n`
   */
  export function div(v1: Vector3, n: number) {
    return Vector3.mul(v1, 1 / n);
  }
}

export class Vector4 {
  data: Vector4.Data;

  get x(): number { return this.data.x; }
  set x(x) { this.data.x = x; }
  get y(): number { return this.data.y; }
  set y(y) { this.data.y = y; }
  get z(): number { return this.data.z; }
  set z(z) { this.data.z = z; }
  get w(): number { return this.data.w; }
  set w(w) { this.data.w = w; }

  /**
   * Creates a new zero vector with all components set to 0.
   *
   * @returns new zero vector
   */
  constructor();

  /**
   * Creates a new vector with all components set to the supplied scalar value.
   *
   * @param n scalar value to splat
   * @returns new vector
   */
  constructor(n: number);

  /**
   * Creates a new vector with all components set to the corresponding values
   * from the supplied vector. I.e. This function creates a copy of the given vector.
   *
   * @param v1 existing vector
   * @returns new vector
   */
  constructor(v1: Vector4);

  /**
   * Creates a new vector with the components set to the supplied values.
   *
   * @param x x coordinate
   * @param y y coordinate
   * @param z z coordinate
   * @param w w coordinate
   * @returns new vector
   */
  constructor(x: number, y: number, z: number, w: number);

  /**
   * Creates a new vector with all components set to the corresponding values
   * from the supplied vector. I.e. This function creates a copy of the given vector.
   *
   * @param v1 existing vector
   * @returns new vector
   */
  constructor(v1: Vector4.Data);

  constructor(x?: number | Vector4 | Vector4.Data, y?: number, z?: number, w?: number) {
    if (typeof x === 'undefined' || typeof x === 'number' || x instanceof Vector4) {
      this.data = lua.vmath.vector4(1, x, y, z, w);
    } else {
      this.data = x;
    }
  }
  /**
   * Returns the length of the supplied vector or quaternion.
   *
   * If you are comparing the lengths of vectors or quaternions, you should compare
   * the length squared instead as it is slightly more efficient to calculate
   * (it eliminates a square root calculation).
   *
   * @returns length
   */
  length(): number {
    return lua.vmath.length(1, this.data);
  }

  /**
   * Returns the squared length of the supplied vector or quaternion.
   *
   * @returns squared length
   */
  length_sqr(): number {
    return lua.vmath.length_sqr(1, this.data);
  }

  /**
   * Normalizes a vector, i.e. returns a new vector with the same direction
   * as the input vector, but with length 1.
   *
   * The length of the vector must be above 0, otherwise a division-by-zero will occur.
   *
   * @returns new nomalized vector
   */
  normalize(): Vector4 {
    return new Vector4(lua.vmath.normalize(1, this.data));
  }
}

export namespace Vector4 {
  export declare type Data = {
    x: number;
    y: number;
    z: number;
    w: number;
  };

  /**
   * The returned value is a scalar defined as:
   * `P ⋅ Q = |P| |Q| cos θ`
   * where θ is the angle between the vectors P and Q.
   *
   * If the dot product is positive then the angle between the vectors is below 90 degrees.
   *
   * If the dot product is zero the vectors are perpendicular (at right-angles to each other).
   *
   * If the dot product is negative then the angle between the vectors is more than 90 degrees.
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns dot product
   */
  export function dot(v1: Vector4, v2: Vector4): number {
    return lua.vmath.dot(1, v1.data, v2.data);
  }

  /**
   * Linearly interpolate between two vectors. The function treats the vectors as
   * positions and interpolates between the positions in a straight line. Lerp is
   * useful to describe transitions from one place to another over time.
   *
   * The function does not clamp t between 0 and 1.
   *
   * @param t interpolation parameter, 0-1
   * @param v1 vector to lerp from
   * @param v2 vector to lerp to
   * @returns the lerped vector
   */
  export function lerp(t: number, v1: Vector4, v2: Vector4): Vector4 {
    return new Vector4(lua.vmath.lerp(1, t, v1.data, v2.data));
  }

  /**
   * Spherically interpolates between two vectors. The difference to lerp is that slerp
   * treats the vectors as directions instead of positions in space.
   *
   * The direction of the returned vector is interpolated by the angle and the magnitude
   * is interpolated between the magnitudes of the from and to vectors.
   *
   * Slerp is computationally more expensive than lerp.
   * The function does not clamp t between 0 and 1.
   *
   * @param t interpolation parameter, 0-1
   * @param v1 vector to slerp from
   * @param v2 vector to slerp to
   * @returns the slerped vector
   */
  export function slerp(t: number, v1: Vector4, v2: Vector4): Vector4 {
    return new Vector4(lua.vmath.slerp(1, t, v1.data, v2.data));
  }

  /**
   * Performs an element wise multiplication between two vectors of the same type.
   * The returned value is a vector defined as (e.g. for a vector3):
   * `v = vmath.mul_per_elem(a, b) = vmath.vector3(a.x * b.x, a.y * b.y, a.z * b.z)`
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns multiplied vector
   */
  export function mul_per_elem(v1: Vector4, v2: Vector4): Vector4 {
    return new Vector4(lua.vmath.mul_per_elem(1, v1.data, v2.data));
  }

  /**
   * Operators for Vector4. Since JavaScript does not have an operator
   * overloading feature, we provide these helper functions.
   */

  /**
   * Vector4 addition. Equals to `v1 + v2`
   */
  export function add(v1: Vector4, v2: Vector4): Vector4 {
    return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }

  /**
   * Vector4 subtraction. Equals to `v1 - v2`
   */
  export function sub(v1: Vector4, v2: Vector4): Vector4 {
    return new Vector4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
  }

  /**
   * Vector4 negation. Equals to `-v1`
   */
  export function neg(v1: Vector4): Vector4 {
    return new Vector4(-v1.x, -v1.y, -v1.z, -v1.w);
  }

  /**
   * Vector4 multiplication. Equals to `v1 * n`
   */
  export function mul(v1: Vector4, n: number) {
    return new Vector4(v1.x * n, v1.y * n, v1.z * n, v1.w * n);
  }

  /**
   * Vector4 division. Equals to `v1 / n`
   */
  export function div(v1: Vector4, n: number) {
    return Vector4.mul(v1, 1 / n);
  }
}

export class Quaternion {
  data: Quaternion.Data;

  get x(): number { return this.data.x; }
  set x(x) { this.data.x = x; }
  get y(): number { return this.data.y; }
  set y(y) { this.data.y = y; }
  get z(): number { return this.data.z; }
  set z(z) { this.data.z = z; }
  get w(): number { return this.data.w; }
  set w(w) { this.data.w = w; }

  /**
   * Creates a new identity quaternion. The identity quaternion is equal to:
   * `vmath.quat(0, 0, 0, 1)`
   *
   * @returns new identity quaternion
   */
  constructor();

  /**
   * Creates a new quaternion with all components set to the corresponding values
   * from the supplied quaternion. I.e. This function creates a copy of the given quaternion.
   * @param q1 existing quaternion
   * @returns new quaternion
   */
  constructor(q1: Quaternion);

  /**
   * Creates a new quaternion with the components set to the supplied values.
   *
   * @param x x coordinate
   * @param y y coordinate
   * @param z z coordinate
   * @param w w coordinate
   * @returns new quaternion
   */
  constructor(x: number, y: number, z: number, w: number);

  /**
   * Creates a new quaternion with all components set to the corresponding values
   * from the supplied quaternion. I.e. This function creates a copy of the given quaternion.
   * @param q1 existing quaternion
   * @returns new quaternion
   */
  constructor(q1: Quaternion.Data);

  constructor(x?: number | Quaternion | Quaternion.Data, y?: number, z?: number, w?: number) {
    if (typeof x === 'undefined' || typeof x === 'number' || x instanceof Quaternion) {
      this.data = lua.vmath.quat(1, x, y, z, w);
    } else {
      this.data = x;
    }
  }

  /**
   * Calculates the conjugate of a quaternion.
   * The result is a quaternion with the same magnitudes
   * but with the sign of the imaginary (vector) parts changed:
   * `q* = [w, -v]`
   *
   * @returns the conjugate
   */
  conj(): Quaternion {
    return new Quaternion(lua.vmath.conj(1, this.data));
  }
  /**
   * Returns the length of the supplied vector or quaternion.
   *
   * If you are comparing the lengths of vectors or quaternions, you should compare
   * the length squared instead as it is slightly more efficient to calculate
   * (it eliminates a square root calculation).
   *
   * @returns length
   */
  length(): number {
    return lua.vmath.length(1, this.data);
  }

  /**
   * Returns the squared length of the supplied vector or quaternion.
   *
   * @returns squared length
   */
  length_sqr(): number {
    return lua.vmath.length_sqr(1, this.data);
  }

  /**
   * Normalizes a vector, i.e. returns a new vector with the same direction
   * as the input vector, but with length 1.
   *
   * The length of the vector must be above 0, otherwise a division-by-zero will occur.
   *
   * @returns new nomalized vector
   */
  normalize(): Quaternion {
    return new Quaternion(lua.vmath.normalize(1, this.data));
  }

  /**
   * Returns a new vector from the supplied vector that is rotated by the rotation described
   * by the supplied quaternion.
   *
   * @param v1 vector to rotate
   * @returns the rotated vector
   */
  rotate(v1: Vector3): Vector3 {
    return new Vector3(lua.vmath.rotate(1, this.data, v1.data));
  }
};

export namespace Quaternion {
  export declare type Data = {
    x: number;
    y: number;
    z: number;
    w: number;
  };

  /**
   * Linearly interpolate between two quaternions. Linear interpolation of rotations
   * are only useful for small rotations. For interpolations of arbitrary rotations,
   * `vmath.slerp` yields much better results.
   *
   * The function does not clamp t between 0 and 1.
   *
   * @param t interpolation parameter, 0-1
   * @param q1 quaternion to lerp from
   * @param q2 quaternion to lerp to
   * @returns the lerped quaternion
   */
  export function lerp(t: number, q1: Quaternion, q2: Quaternion): Quaternion {
    return new Quaternion(lua.vmath.lerp(1, t, q1.data, q2.data));
  }

  /**
   * Slerp travels the torque-minimal path maintaining constant velocity, which means it
   * travels along the straightest path along the rounded surface of a sphere.
   * Slerp is useful for interpolation of rotations.
   *
   * Slerp travels the torque-minimal path, which means it travels along the straightest
   * path the rounded surface of a sphere.
   *
   * The function does not clamp t between 0 and 1.
   *
   * @param t interpolation parameter, 0-1
   * @param q1 quaternion to slerp from
   * @param q2 quaternion to slerp to
   * @returns the slerped quaternion
   */
  export function slerp(t: number, v1: Quaternion, v2: Quaternion): Quaternion {
    return new Quaternion(lua.vmath.slerp(1, t, v1.data, v2.data));
  }

  /**
   * Performs an element wise multiplication between two vectors of the same type.
   * The returned value is a vector defined as (e.g. for a vector3):
   * `v = vmath.mul_per_elem(a, b) = vmath.vector3(a.x * b.x, a.y * b.y, a.z * b.z)`
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns multiplied vector
   */
  export function mul_per_elem(v1: Quaternion, v2: Quaternion): Quaternion {
    return new Quaternion(lua.vmath.mul_per_elem(1, v1.data, v2.data));
  }

  /**
   * The resulting quaternion describes a rotation of `angle` radians around the axis
   * described by the unit vector `v`.
   *
   * @param v axis
   * @param angle angle
   * @returns quaternion representing the axis-angle rotation
   */
  export function axis_angle(v: Vector3, angle: number): Quaternion {
    return new Quaternion(lua.vmath.quat_axis_angle(1, v.data, angle));
  }

  /**
   * The resulting quaternion describes the rotation from the identity quaternion (no rotation)
   * to the coordinate system as described by the given x, y and z base unit vectors.
   *
   * @param x x base vector
   * @param y y base vector
   * @param z z base vector
   * @returns quaternion representing the rotation of the specified base vectors
   */
  export function basis(x: Vector3, y: Vector3, z: Vector3): Quaternion {
    return new Quaternion(lua.vmath.quat_basis(1, x.data, y.data, z.data));
  }

  /**
   * The resulting quaternion describes the rotation that, if applied to the first vector,
   * would rotate the first vector to the second. The two vectors must be unit vectors (of length 1).
   *
   * The result is undefined if the two vectors point in opposite directions
   *
   * @param v1 first unit vector, before rotation
   * @param v2 second unit vector, after rotation
   * @returns quaternion representing the rotation from first to second vector
   */
  export function from_to(v1: Vector3, v2: Vector3): Quaternion {
    return new Quaternion(lua.vmath.quat_from_to(1, v1.data, v2.data));
  }
  
  /**
   * The resulting quaternion describes a rotation of `angle` radians around the x-axis.
   *
   * @param angle angle in radians around x-axis
   * @returns quaternion representing the rotation around the x-axis
   */
  export function rotation_x(angle: number): Quaternion {
    return new Quaternion(lua.vmath.quat_rotation_x(1, angle));
  }
  
  /**
   * The resulting quaternion describes a rotation of `angle` radians around the y-axis.
   *
   * @param angle angle in radians around y-axis
   * @returns quaternion representing the rotation around the y-axis
   */
  export function rotation_y(angle: number): Quaternion {
    return new Quaternion(lua.vmath.quat_rotation_y(1, angle));
  }
  
  /**
   * The resulting quaternion describes a rotation of `angle` radians around the z-axis.
   *
   * @param angle angle in radians around z-axis
   * @returns quaternion representing the rotation around the z-axis
   */
  export function rotation_z(angle: number): Quaternion {
    return new Quaternion(lua.vmath.quat_rotation_z(1, angle));
  }

  /**
   * Operators for Quaternion. Since JavaScript does not have an operator
   * overloading feature, we provide these helper functions.
   */

  /**
   * Quaternion multiplication. Equals to `q1 * q2`
   */
  export function mul(q1: Quaternion, q2: Quaternion): Quaternion {
    const { x: x1, y: y1, z: z1, w: w1 } = q1;
    const { x: x2, y: y2, z: z2, w: w2 } = q2;
    return new Quaternion(
      w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
      w1 * y2 + y1 * w2 + z1 * x2 - x1 * z2,
      w1 * z2 + z1 * w2 + x1 * y2 - y1 * x2,
      w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2
    );
  }
}

export class Matrix4 {
  data: Matrix4.Data;

  get c0(): Vector4 { return new Vector4(this.data.c0); }
  set c0(c0) { this.data.c0 = c0; }
  get c1(): Vector4 { return new Vector4(this.data.c1); }
  set c1(c1) { this.data.c1 = c1; }
  get c2(): Vector4 { return new Vector4(this.data.c2); }
  set c2(c2) { this.data.c2 = c2; }
  get c3(): Vector4 { return new Vector4(this.data.c3); }
  set c3(c3) { this.data.c3 = c3; }
  get m00(): number { return this.data.m00; }
  set m00(m00) { this.data.m00 = m00; }
  get m01(): number { return this.data.m01; }
  set m01(m01) { this.data.m01 = m01; }
  get m02(): number { return this.data.m02; }
  set m02(m02) { this.data.m02 = m02; }
  get m03(): number { return this.data.m03; }
  set m03(m03) { this.data.m03 = m03; }
  get m10(): number { return this.data.m10; }
  set m10(m10) { this.data.m10 = m10; }
  get m11(): number { return this.data.m11; }
  set m11(m11) { this.data.m11 = m11; }
  get m12(): number { return this.data.m12; }
  set m12(m12) { this.data.m12 = m12; }
  get m13(): number { return this.data.m13; }
  set m13(m13) { this.data.m13 = m13; }
  get m20(): number { return this.data.m20; }
  set m20(m20) { this.data.m20 = m20; }
  get m21(): number { return this.data.m21; }
  set m21(m21) { this.data.m21 = m21; }
  get m22(): number { return this.data.m22; }
  set m22(m22) { this.data.m22 = m22; }
  get m23(): number { return this.data.m23; }
  set m23(m23) { this.data.m23 = m23; }
  get m30(): number { return this.data.m30; }
  set m30(m30) { this.data.m30 = m30; }
  get m31(): number { return this.data.m31; }
  set m31(m31) { this.data.m31 = m31; }
  get m32(): number { return this.data.m32; }
  set m32(m32) { this.data.m32 = m32; }
  get m33(): number { return this.data.m33; }
  set m33(m33) { this.data.m33 = m33; }

  /**
   * The resulting identity matrix describes a transform with no translation or rotation.
   *
   * @returns identity matrix
   */
  constructor();

  /**
   * Creates a new matrix with all components set to the corresponding values
   * from the supplied matrix. I.e. the function creates a copy of the given matrix.
   *
   * @param m1 existing matrix
   * @returns matrix which is a copy of the specified matrix
   */
  constructor(m1: Matrix4);

  /**
   * Creates a new matrix with all components set to the corresponding values
   * from the supplied matrix. I.e. the function creates a copy of the given matrix.
   *
   * @param m1 existing matrix
   * @returns matrix which is a copy of the specified matrix
   */
  constructor(m1: Matrix4.Data);

  constructor(c0: Vector4, c1: Vector4, c2: Vector4, c3: Vector4);

  constructor(x?: Matrix4 | Vector4 | Matrix4.Data, y?: Vector4, z?: Vector4, w?: Vector4) {
    if (x instanceof Matrix4) {
      this.data = lua.vmath.matrix4(1, x);
    } else if (x instanceof Vector4) {
      this.data = lua.vmath.matrix4(1);
      this.c0 = x;
      this.c1 = y;
      this.c2 = z;
      this.c3 = w;
    } else {
      this.data = x;
    }
  }

  /**
   * The resulting matrix is the inverse of the supplied matrix.
   *
   * For ortho-normal matrices, e.g. regular object transformation, use
   * `vmath.ortho_inv()` instead. The specialized inverse for ortho-normalized
   * matrices is much faster than the general inverse.
   *
   * @returns inverse of the supplied matrix
   */
  inv(): Matrix4 {
    return new Matrix4(lua.vmath.inv(1, this.data));
  }

  /**
   * The resulting matrix is the inverse of the supplied matrix.
   * The supplied matrix has to be an ortho-normal matrix,
   * e.g. describe a regular object transformation.
   *
   * For matrices that are not ortho-normal use the general inverse `vmath.inv()` instead.
   * 
   * @returns inverse of the supplied matrix
   */
  ortho_inv(): Matrix4 {
    return new Matrix4(lua.vmath.ortho_inv(1, this.data));
  }
}

export namespace Matrix4 {
  export declare type Data = {
    c0: Vector4.Data;
    c1: Vector4.Data;
    c2: Vector4.Data;
    c3: Vector4.Data;
    m00: number;
    m01: number;
    m02: number;
    m03: number;
    m10: number;
    m11: number;
    m12: number;
    m13: number;
    m20: number;
    m21: number;
    m22: number;
    m23: number;
    m30: number;
    m31: number;
    m32: number;
    m33: number;
  };

  /**
   * Constructs a frustum matrix from the given values.
   * The left, right, top and bottom coordinates of the view cone are
   * expressed as distances from the center of the near clipping plane.
   * The near and far coordinates are expressed as distances from the tip of the view frustum cone.
   *
   * @param left coordinate for left clipping plane
   * @param right coordinate for right clipping plane
   * @param bottom coordinate for bottom clipping plane
   * @param top coordinate for top clipping plane
   * @param near coordinate for near clipping plane
   * @param far coordinate for far clipping plane
   * @returns matrix representing the frustum
   */
  export function frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_frustum(1, left, right, bottom, top, near, far));
  }

  /**
   * The resulting matrix is created from the supplied look-at parameters.
   * This is useful for constructing a view matrix for a camera or rendering in general.
   *
   * @param eye eye position
   * @param look_at loot-at position
   * @param up up vector
   * @returns look-at matrix
   */
  export function look_at(eye: Vector3, look_at: Vector3, up: Vector3): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_look_at(1, eye, look_at, up));
  }

  /**
   * Creates an orthographic projection matrix.
   * This is useful to construct a projection matrix for a camera or rendering in general.
   *
   * @param left coordinate for left clipping plane
   * @param right coordinate for right clipping plane
   * @param bottom coordinate for bottom clipping plane
   * @param top coordinate for top clipping plane
   * @param near coordinate for near clipping plane
   * @param far coordinate for far clipping plane
   * @returns orthographic projection matrix
   */
  export function orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_orthographic(1, left, right, bottom, top, near, far));
  }

  /**
   * Creates a perspective projection matrix.
   * This is useful to construct a projection matrix for a camera or rendering in general.
   *
   * @param fov angle of the full vertical field of view in radians
   * @param aspect aspect ratio
   * @param near coordinate for near clipping plane
   * @param far coordinate for far clipping plane
   * @returns perspective projection matrix
   */
  export function perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_perspective(1, fov, aspect, near, far));
  }

  /**
   * The resulting matrix describes a rotation around the x-axis by the specified angle.
   *
   * @param angle angle in radians around x-axis
   * @returns matrix from rotation around x-axis
   */
  export function rotation_x(angle: number): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_rotation_x(1, angle));
  }

  /**
   * The resulting matrix describes a rotation around the y-axis by the specified angle.
   *
   * @param angle angle in radians around y-axis
   * @returns matrix from rotation around y-axis
   */
  export function rotation_y(angle: number): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_rotation_y(1, angle));
  }
  
  /**
   * The resulting matrix describes a rotation around the z-axis by the specified angle.
   *
   * @param angle angle in radians around z-axis
   * @returns matrix from rotation around z-axis
   */
  export function rotation_z(angle: number): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_rotation_z(1, angle));
  }

  /**
   * The resulting matrix describes the same rotation as the quaternion,
   * but does not have any translation (also like the quaternion).
   *
   * @param q quaternion to create matrix from
   * @returns matrix represented by quaternion
   */
  export function from_quat(q: Quaternion): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_from_quat(1, q.data));
  }

  /**
   * The resulting matrix describes a translation of a point in euclidean space.
   *
   * @param position position vector to create matrix from
   * @returns matrix from the supplied position vector
   */
  export function translation(position: Vector3 | Vector4): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_translation(1, position.data));
  }

  /**
   * The resulting matrix describes a rotation around the axis by the specified angle.
   *
   * @param v axis
   * @param angle angle in radians
   * @returns matrix represented by axis and angle
   */
  export function axis_angle(v: Vector3, angle: number): Matrix4 {
    return new Matrix4(lua.vmath.matrix4_axis_angle(1, v.data, angle));
  }

  /**
   * Operators for Matrix4. Since JavaScript does not have an operator
   * overloading feature, we provide these helper functions.
   */

   /**
    * Matrix4 multiplication with number. Equals to `m1 * n`
    */
  export function mul(m1: Matrix4, n: number): Matrix4;

   /**
    * Matrix4 multiplication with other matrices. Equals to `m1 * m2`
    */
  export function mul(m1: Matrix4, m2: Matrix4): Matrix4;

  /**
   * Matrix4 multiplication with Vector4. Equals to `m1 * v`
   */
  export function mul(m1: Matrix4, v: Vector4): Vector4;

  export function mul(m1: Matrix4, xn: Matrix4 | Vector4 | number): Matrix4 | Vector4 {
    if (xn instanceof Matrix4) {
      return new Matrix4(
        Matrix4.mul(m1, xn.c0),
        Matrix4.mul(m1, xn.c1),
        Matrix4.mul(m1, xn.c2),
        Matrix4.mul(m1, xn.c3)
      )
    } else if (xn instanceof Vector4) {
      const {
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33
      } = m1;
      const { x, y, z, w } = xn;
      return new Vector4(
        m00 * x + m10 * y + m20 * z + m30 * w,
        m01 * x + m11 * y + m21 * z + m31 * w,
        m02 * x + m12 * y + m22 * z + m32 * w,
        m03 * x + m13 * y + m23 * z + m33 * w
      )
    } else {
      return new Matrix4(
        Vector4.mul(m1.c0, xn),
        Vector4.mul(m1.c1, xn),
        Vector4.mul(m1.c2, xn),
        Vector4.mul(m1.c3, xn)
      );
    }
  }
}

/**
 * Linearly interpolate between two values.
 * Lerp is useful to describe transitions from one value to another over time.
 *
 * The function does not clamp t between 0 and 1.
 *
 * @param t interpolation parameter, 0-1
 * @param n1 number to lerp from
 * @param n2 number to lerp to
 * @returns the lerped number
 */
export function lerp(t: number, v1: number, v2: number): number {
  return lua.vmath.lerp(1, t, v1, v2);
}

/**
 * Vector3 addition. Equals to `v1 + v2`
 */
export function add(v1: Vector3, v2: Vector3): Vector3;

/**
 * Vector4 addition. Equals to `v1 + v2`
 */
export function add(v1: Vector4, v2: Vector4): Vector4;

export function add(a: any, b: any): any {
  if (a instanceof Vector3) {
    if (b instanceof Vector3) {
      return Vector3.add(a, b);
    } else {
      throw TypeError('Vector3 should add Vector3');
    }
  } else if (a instanceof Vector4) {
    if (b instanceof Vector4) {
      return Vector4.add(a, b);
    } else {
      throw TypeError('Vector4 should add Vector4');
    }
  } else {
    throw TypeError('not supported');
  }
}

/**
 * Vector3 subtraction. Equals to `v1 + v2`
 */
export function sub(v1: Vector3, v2: Vector3): Vector3;

/**
 * Vector4 subtraction. Equals to `v1 + v2`
 */
export function sub(v1: Vector4, v2: Vector4): Vector4;

export function sub(a: any, b: any): any {
  if (a instanceof Vector3) {
    if (b instanceof Vector3) {
      return Vector3.sub(a, b);
    } else {
      throw TypeError('Vector3 should subtract Vector3');
    }
  } else if (a instanceof Vector4) {
    if (b instanceof Vector4) {
      return Vector4.sub(a, b);
    } else {
      throw TypeError('Vector4 should subtract Vector4');
    }
  } else {
    throw TypeError('not supported');
  }
}

/**
 * Vector3 negation. Equals to `-v1`
 */
export function neg(v1: Vector3): Vector3;

/**
 * Vector4 negation. Equals to `-v1`
 */
export function neg(v1: Vector4): Vector4;

export function neg(a: any): any {
  if (a instanceof Vector3) {
    return Vector3.neg(a);
  } else if (a instanceof Vector4) {
    return Vector4.neg(a);
  } else {
    throw TypeError('not supported');
  }
}

/**
 * Vector3 multiplication. Equals to `v1 * n`
 */
export function mul(v1: Vector3, n: number): Vector3;

/**
 * Vector3 multiplication. Equals to `v1 * n`
 */
export function mul(n: number, v1: Vector3): Vector3;

/**
 * Vector4 multiplication. Equals to `v1 * n`
 */
export function mul(v1: Vector4, n: number): Vector4;

/**
 * Vector4 multiplication. Equals to `v1 * n`
 */
export function mul(n: number, v1: Vector4): Vector4;

/**
 * Quaternion multiplication. Equals to `q1 * q2`
 */
export function mul(q1: Quaternion, q2: Quaternion): Quaternion;

/**
 * Matrix4 multiplication with number. Equals to `m1 * n`
 */
export function mul(m1: Matrix4, n: number): Matrix4;

/**
 * Matrix4 multiplication with number. Equals to `m1 * n`
 */
export function mul(n: number, m1: Matrix4): Matrix4;

/**
 * Matrix4 multiplication with other matrices. Equals to `m1 * m2`
 */
export function mul(m1: Matrix4, m2: Matrix4): Matrix4;

/**
* Matrix4 multiplication with Vector4. Equals to `m1 * v`
*/
export function mul(m1: Matrix4, v: Vector4): Vector4;

/**
* Matrix4 multiplication with Vector4. Equals to `m1 * v`
*/
export function mul(v: Vector4, m1: Matrix4): Vector4;

export function mul(a: any, b: any): any {
  if (a instanceof Vector3) {
    if (typeof b === 'number') {
      return Vector3.mul(a, b);
    } else {
      throw TypeError('Vector3 should multiply number');
    }
  } else if (a instanceof Vector4) {
    if (b instanceof Matrix4) {
      return Matrix4.mul(b, a);
    } else if (typeof b === 'number') {
      return Vector4.mul(a, b);
    } else {
      throw TypeError('Vector4 should multiply Matrix4 or number');
    }
  } else if (a instanceof Matrix4) {
    if (b instanceof Vector4) {
      return Matrix4.mul(a, b);
    } else if (b instanceof Matrix4) {
      return Matrix4.mul(a, b);
    } else if (typeof b === 'number') {
      return Matrix4.mul(a, b);
    } else {
      throw TypeError('Matrix4 should multiply Vector4, Matrix4 or number');
    }
  } else if (typeof a === 'number') {
    if (b instanceof Vector3)  {
      return Vector3.mul(b, a);
    } else if (b instanceof Vector4) {
      return Vector4.mul(b, a);
    } else if (b instanceof Matrix4) {
      return Matrix4.mul(b, a);
    } else {
      throw TypeError('number should multiply Vector3, Vector4 or Matrix4');
    }
  } else if (a instanceof Quaternion) {
    if (b instanceof Quaternion) {
      return Quaternion.mul(a, b);
    } else {
      throw TypeError('Quaternion should multiply Quaternion');
    }
  } else {
    throw TypeError('not supported');
  }
}

/**
 * Vector3 division. Equals to `v1 / n`
 */
export function div(v1: Vector3, n: number): Vector3;

/**
 * Vector4 division. Equals to `v1 / n`
 */
export function div(v1: Vector4, n: number): Vector4;

export function div(a: any, b: any): any {
  if (a instanceof Vector3) {
    if (typeof b === 'number') {
      return Vector3.div(a, b);
    } else {
      throw TypeError('Vector3 should divide number');
    }
  } else if (a instanceof Vector4) {
    if (typeof b === 'number') {
      return Vector4.div(a, b);
    } else {
      throw TypeError('Vector4 should divide number');
    }
  } else {
    throw TypeError('not supported');
  }
}

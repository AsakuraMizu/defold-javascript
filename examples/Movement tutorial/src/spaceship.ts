import { go, Hash, hasheq, msg, OnInputAction, print } from '@defold/core';
import { Vector3, add, mul } from '@defold/core/lib/vmath';

interface ShipData {
  a: number;
  velocity: Vector3.Data;
  input: Vector3.Data;
}

export function init(self: ShipData) {
  self.a = 114514;
  self.velocity = new Vector3().data;
  self.input = new Vector3().data;
  msg.post('.', 'acquire_input_focus');
}

export function update(self: ShipData, dt: number) {
  var input = new Vector3(self.input);
  var velocity = new Vector3(self.velocity);

  if (input.length_sqr() > 1) {
    input = input.normalize();
  }

  var acceleration = mul(input, 200);
  var v = add(velocity, mul(acceleration, dt));
  var p = go.get_position();
  go.set_position(add(p, mul(add(velocity, v), dt * 0.5)));

  self.velocity = v.data;
  self.input = new Vector3().data;
}

export function on_input(self: ShipData, action_id: Hash, action: OnInputAction) {
  if (action_id === undefined) {
    return false;
  } else if (hasheq(action_id, 'up')) {
    self.input.y = 1;
  } else if (hasheq(action_id, 'down')) {
    self.input.y = -1;
  } else if (hasheq(action_id, 'left')) {
    self.input.x = -1;
  } else if (hasheq(action_id, 'right')) {
    self.input.x = 1;
  } else if (hasheq(action_id, 'click') && action.pressed) {
    print('CLICK!');
  }
}

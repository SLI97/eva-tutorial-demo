export enum TILE_TYPE_ENUM {
  WALL_ROW = 'WALL_ROW',
  WALL_COLUMN = 'WALL_COLUMN',
  WALL_LEFT_TOP = 'WALL_LEFT_TOP',
  WALL_LEFT_BOTTOM = 'WALL_LEFT_BOTTOM',
  WALL_RIGHT_TOP = 'WALL_RIGHT_TOP',
  WALL_RIGHT_BOTTOM = 'WALL_RIGHT_BOTTOM',
  CLIFF_CENTER = 'CLIFF_CENTER',
  CLIFF_LEFT = 'CLIFF_LEFT',
  CLIFF_RIGHT = 'CLIFF_RIGHT',
  FLOOR = 'FLOOR',
}

export enum EVENT_ENUM {
  PLAYER_CTRL = 'PLAYER_CTRL',
  PLAYER_MOVE_END = 'PLAYER_MOVE_END',
  NEXT_LEVEL = 'NEXT_LEVEL',
}

export enum CONTROLLER_ENUM {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT',
}

export enum FSM_PARAMS_TYPE_ENUM {
  NUMBER = 'NUMBER',
  TRIGGER = 'TRIGGER',
}

export enum PARAMS_NAME_ENUM {
  IDLE = 'IDLE',
  ATTACK = 'ATTACK',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT',
  BLOCKFRONT = 'BLOCKFRONT',
  BLOCKBACK = 'BLOCKBACK',
  BLOCKLEFT = 'BLOCKLEFT',
  BLOCKRIGHT = 'BLOCKRIGHT',
  BLOCKTURNLEFT = 'BLOCKTURNLEFT',
  BLOCKTURNRIGHT = 'BLOCKTURNRIGHT',
  DIRECTION = 'DIRECTION',
}

export enum DIRECTION_ENUM {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum ENTITY_STATE_ENUM {
  IDLE = 'IDLE',
  ATTACK = 'ATTACK',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT',
  BLOCKFRONT = 'BLOCKFRONT',
  BLOCKBACK = 'BLOCKBACK',
  BLOCKLEFT = 'BLOCKLEFT',
  BLOCKRIGHT = 'BLOCKRIGHT',
  BLOCKTURNLEFT = 'BLOCKTURNLEFT',
  BLOCKTURNRIGHT = 'BLOCKTURNRIGHT',
}

export enum DIRECTION_ORDER_ENUM {
  TOP = 0,
  BOTTOM = 1,
  LEFT = 2,
  RIGHT = 3,
}

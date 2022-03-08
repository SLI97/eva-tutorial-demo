import { Component } from '@eva/eva.js';
import { DIRECTION_ENUM, DIRECTION_ORDER_ENUM, ENTITY_STATE_ENUM, ENTITY_TYPE_ENUM, PARAMS_NAME_ENUM } from '../Enums';
import PlayerStateMachine from '../Scenes/Battle/GameObjects/Player/Scripts/PlayerStateMachine';
import { TILE_HEIGHT, TILE_WIDTH } from '../Scenes/Battle/GameObjects/Tile';
import { randomByLen } from '../Utils';
import { IEntity } from '../Levels';

export const ENTITY_WIDTH = 128;
export const ENTITY_HEIGHT = 128;

export default abstract class EntityManager extends Component {
  static componentName = 'EntityManager'; // 设置组件的名字

  id: string = randomByLen(12);
  x: number;
  y: number;
  private _direction: DIRECTION_ENUM;
  private _state: ENTITY_STATE_ENUM;
  fsm: PlayerStateMachine;
  type: ENTITY_TYPE_ENUM;

  init(params: IEntity) {
    this.x = params.x;
    this.y = params.y;
    this.type = params.type;
    this.direction = params.direction;
    this.state = params.state;
  }

  get direction() {
    return this._direction;
  }

  set direction(newDirection) {
    this._direction = newDirection;
    this.fsm.setParams(PARAMS_NAME_ENUM.DIRECTION, DIRECTION_ORDER_ENUM[newDirection]);
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    this.fsm.setParams(newState, true);
  }

  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - TILE_WIDTH * 1.5;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - TILE_HEIGHT * 1.5;
  }
}

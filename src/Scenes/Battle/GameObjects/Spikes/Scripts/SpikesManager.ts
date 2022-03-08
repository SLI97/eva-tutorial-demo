import { Component } from '@eva/eva.js';
import { randomByLen } from '../../../../../Utils';
import SpikesStateMachine from './SpikesStateMachine';
import {
  ENTITY_STATE_ENUM,
  ENTITY_TYPE_ENUM,
  EVENT_ENUM,
  PARAMS_NAME_ENUM,
  SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM,
} from '../../../../../Enums';
import { TILE_HEIGHT, TILE_WIDTH } from '../../Tile';
import EventManager from '../../../../../Runtime/EventManager';
import DataManager from '../../../../../Runtime/DataManager';
import { ISpikes } from '../../../../../Levels';

export default class SpikesManager extends Component {
  static componentName = 'SpikesManager'; // 设置组件的名字

  id: string = randomByLen(12);
  x: number;
  y: number;
  private _count: number;
  private _totalCount: number;
  fsm: SpikesStateMachine;
  type: ENTITY_TYPE_ENUM;

  get count() {
    return this._count;
  }

  set count(newCount) {
    this._count = newCount;
    this.fsm.setParams(PARAMS_NAME_ENUM.SPIKES_CUR_COUNT, newCount);
  }

  get totalCount() {
    return this._totalCount;
  }

  set totalCount(newCount) {
    this._totalCount = newCount;
    this.fsm.setParams(PARAMS_NAME_ENUM.SPIKES_TOTAL_COUNT, newCount);
  }

  init(params: ISpikes) {
    this.fsm = this.gameObject.addComponent(new SpikesStateMachine());
    this.x = params.x;
    this.y = params.y;
    this.type = params.type;
    this.totalCount =
      SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM[this.type as 'SPIKES_ONE' | 'SPIKES_TWO' | 'SPIKES_THREE' | 'SPIKES_FOUR'];
    this.count = params.count;
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onLoop, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onLoop);
  }

  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - TILE_WIDTH * 1.5;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - TILE_HEIGHT * 1.5;
  }

  onLoop() {
    if (this.count === this.totalCount) {
      this.count = 1;
    } else {
      this.count++;
    }
    this.onAttack();
  }

  backZero() {
    this.count = 0;
  }

  onAttack() {
    const { x: playerX, y: playerY } = DataManager.Instance.player;
    if (this.count === this.totalCount && this.x === playerX && this.y === playerY) {
      EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, ENTITY_STATE_ENUM.DEATH);
    }
  }
}

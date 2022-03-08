import { Component } from '@eva/eva.js';
import { randomByLen } from '../../../../../Utils';
import SpikesStateMachine from './SpikesStateMachine';
import { ENTITY_TYPE_ENUM, PARAMS_NAME_ENUM, SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM } from '../../../../../Enums';
import { TILE_HEIGHT, TILE_WIDTH } from '../../Tile';

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

  init() {
    this.fsm = this.gameObject.addComponent(new SpikesStateMachine());
    this.x = 2;
    this.y = 4;
    this.type = ENTITY_TYPE_ENUM.SPIKES_ONE;
    this.totalCount = SPIKES_TYPE_MAP_TOTAL_COUNT_ENUM[this.type];
    this.count = 0;
  }

  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - TILE_WIDTH * 1.5;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - TILE_HEIGHT * 1.5;
  }
}

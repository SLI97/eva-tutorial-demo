import { Component } from '@eva/eva.js';
import { FSM_PARAMS_TYPE_ENUM, PARAMS_NAME_ENUM } from '../../../../../Enums';
import State from '../../../../../Base/State';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { ANIMATION_SPEED } from '../index';

type ParmasValueType = number | boolean;

export interface IParams {
  type: FSM_PARAMS_TYPE_ENUM;
  value: ParmasValueType;
}

export const getInitParamsTrigger = () => {
  return {
    type: FSM_PARAMS_TYPE_ENUM.TRIGGER,
    value: false,
  };
};

export default class PlayerStateMachine extends Component {
  private _currentState: State = null;
  params: Map<string, IParams> = new Map();
  stateMachines: Map<string, State> = new Map();

  getParams(parmaName: PARAMS_NAME_ENUM) {
    if (this.params.has(parmaName)) {
      return this.params.get(parmaName);
    }
  }

  setParams(parmaName: PARAMS_NAME_ENUM, value: ParmasValueType) {
    if (this.params.has(parmaName)) {
      this.params.get(parmaName).value = value;
      this.run();
    }
  }

  get currentState() {
    return this._currentState;
  }

  set currentState(newState) {
    this._currentState = newState;
    this._currentState.run();
  }

  init() {
    this.gameObject.addComponent(
      new SpriteAnimation({
        resource: 'player_idle_top',
        speed: ANIMATION_SPEED,
        forwards: true,
        autoPlay: false,
      }),
    );

    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.TURNLEFT, getInitParamsTrigger());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new State(spriteAnimation, 'player_idle_top'));
    this.stateMachines.set(PARAMS_NAME_ENUM.TURNLEFT, new State(spriteAnimation, 'player_turn_left_top', 1));
  }

  initAnimationEvent() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
    });
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
        if (this.params.get(PARAMS_NAME_ENUM.TURNLEFT)) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT);
        } else {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        }
        break;
      default:
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        break;
    }
  }
}

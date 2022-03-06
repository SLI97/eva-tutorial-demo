import EventManager from '../../../../../Runtime/EventManager';
import { CONTROLLER_ENUM, DIRECTION_ENUM, ENTITY_STATE_ENUM, EVENT_ENUM } from '../../../../../Enums';
import PlayerStateMachine from './PlayerStateMachine';
import EntityManager from '../../../../../Base/EntityManager';
import DataManager from '../../../../../Runtime/DataManager';

export default class PlayerManager extends EntityManager {
  static componentName = 'PlayerManager'; // 设置组件的名字

  targetX: number;
  targetY: number;
  readonly speed = 1 / 10;

  init() {
    this.fsm = this.gameObject.addComponent(new PlayerStateMachine());
    this.x = 2;
    this.y = 8;
    this.targetX = this.x;
    this.targetY = this.y;
    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.inputHandler, this);
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;
  }

  update() {
    this.updateXY();
    super.update();
  }

  updateXY() {
    if (this.targetX < this.x) {
      this.x -= this.speed;
    } else if (this.targetX > this.x) {
      this.x += this.speed;
    }

    if (this.targetY < this.y) {
      this.y -= this.speed;
    } else if (this.targetY > this.y) {
      this.y += this.speed;
    }

    if (Math.abs(this.targetX - this.x) < 0.01 && Math.abs(this.targetY - this.y) < 0.01) {
      this.x = this.targetX;
      this.y = this.targetY;
    }
  }

  inputHandler(inputDirection: CONTROLLER_ENUM) {
    if (this.willBlock(inputDirection)) {
      return;
    }

    this.move(inputDirection);
  }

  move(inputDirection: CONTROLLER_ENUM) {
    if (inputDirection === CONTROLLER_ENUM.TOP) {
      this.targetY -= 1;
    } else if (inputDirection === CONTROLLER_ENUM.BOTTOM) {
      this.targetY += 1;
    } else if (inputDirection === CONTROLLER_ENUM.LEFT) {
      this.targetX -= 1;
    } else if (inputDirection === CONTROLLER_ENUM.RIGHT) {
      this.targetX += 1;
    } else if (inputDirection === CONTROLLER_ENUM.TURNLEFT) {
      if (this.direction === DIRECTION_ENUM.TOP) {
        this.direction = DIRECTION_ENUM.LEFT;
      } else if (this.direction === DIRECTION_ENUM.LEFT) {
        this.direction = DIRECTION_ENUM.BOTTOM;
      } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
        this.direction = DIRECTION_ENUM.RIGHT;
      } else if (this.direction === DIRECTION_ENUM.RIGHT) {
        this.direction = DIRECTION_ENUM.TOP;
      }
      this.state = ENTITY_STATE_ENUM.TURNLEFT;
    } else if (inputDirection === CONTROLLER_ENUM.TURNRIGHT) {
      if (this.direction === DIRECTION_ENUM.TOP) {
        this.direction = DIRECTION_ENUM.RIGHT;
      } else if (this.direction === DIRECTION_ENUM.RIGHT) {
        this.direction = DIRECTION_ENUM.BOTTOM;
      } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
        this.direction = DIRECTION_ENUM.LEFT;
      } else if (this.direction === DIRECTION_ENUM.LEFT) {
        this.direction = DIRECTION_ENUM.TOP;
      }
      this.state = ENTITY_STATE_ENUM.TURNRIGHT;
    }
  }

  willBlock(type: CONTROLLER_ENUM) {
    const { targetX: x, targetY: y, direction } = this;
    const { tileInfo: tileInfo } = DataManager.Instance;

    const { mapRowCount: row, mapColumnCount: column } = DataManager.Instance;

    //按钮方向——向上
    if (type === CONTROLLER_ENUM.TOP) {
      const playerNextY = y - 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;
          return true;
        }

        const weaponNextY = y - 2;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;
          return true;
        }

        const weaponNextY = y;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;
          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        //判断是否超出地图
        if (playerNextY < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;
          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;
          return true;
        }
      }

      //按钮方向——向下
    } else if (type === CONTROLLER_ENUM.BOTTOM) {
      const playerNextY = y + 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        if (playerNextY > column - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;

          return true;
        }

        const weaponNextY = y;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        if (playerNextY > column - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;

          return true;
        }

        const weaponNextY = y + 2;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[x]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        if (playerNextY > column - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;

          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        if (playerNextY > column - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;

          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[x]?.[playerNextY];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;
          return true;
        }
      }

      //按钮方向——向左
    } else if (type === CONTROLLER_ENUM.LEFT) {
      const playerNextX = x - 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;

          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;

          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;

          return true;
        }

        const weaponNextX = x - 2;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        //判断是否超出地图
        if (playerNextX < 0) {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;

          return true;
        }

        const weaponNextX = x;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;
          return true;
        }
      }

      //按钮方向——向右
    } else if (type === CONTROLLER_ENUM.RIGHT) {
      const playerNextX = x + 1;

      //玩家方向——向上
      if (direction === DIRECTION_ENUM.TOP) {
        if (playerNextX > row - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;

          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y - 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKRIGHT;
          return true;
        }

        //玩家方向——向下
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        if (playerNextX > row - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;

          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y + 1;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[weaponNextY];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKLEFT;
          return true;
        }

        //玩家方向——向左
      } else if (direction === DIRECTION_ENUM.LEFT) {
        if (playerNextX > row - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;

          return true;
        }

        const weaponNextX = x;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKBACK;
          return true;
        }

        //玩家方向——向右
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        if (playerNextX > row - 1) {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;

          return true;
        }

        const weaponNextX = x + 2;
        const nextPlayerTile = tileInfo[playerNextX]?.[y];
        const nextWeaponTile = tileInfo[weaponNextX]?.[y];

        //最后判断地图元素
        if (nextPlayerTile && nextPlayerTile.moveable && (!nextWeaponTile || nextWeaponTile.turnable)) {
          // empty
        } else {
          this.state = ENTITY_STATE_ENUM.BLOCKFRONT;
          return true;
        }
      }

      //按钮方向——左转
    } else if (type === CONTROLLER_ENUM.TURNLEFT) {
      let nextY, nextX;
      if (direction === DIRECTION_ENUM.TOP) {
        //朝上左转的话，左上角三个tile都必须turnable为true，并且没有敌人
        nextY = y - 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextY = y + 1;
        nextX = x + 1;
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextY = y + 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextY = y - 1;
        nextX = x + 1;
      }

      //最后判断地图元素
      if (
        (!tileInfo[x]?.[nextY] || tileInfo[x]?.[nextY].turnable) &&
        (!tileInfo[nextX]?.[y] || tileInfo[nextX]?.[y].turnable) &&
        (!tileInfo[nextX]?.[nextY] || tileInfo[nextX]?.[nextY].turnable)
      ) {
        // empty
      } else {
        this.state = ENTITY_STATE_ENUM.BLOCKTURNLEFT;
        return true;
      }

      //按钮方向——右转
    } else if (type === CONTROLLER_ENUM.TURNRIGHT) {
      let nextX, nextY;
      if (direction === DIRECTION_ENUM.TOP) {
        //朝上右转的话，右上角三个tile都必须turnable为true
        nextY = y - 1;
        nextX = x + 1;
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextY = y + 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextY = y - 1;
        nextX = x - 1;
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextY = y + 1;
        nextX = x + 1;
      }

      //最后判断地图元素
      if (
        (!tileInfo[x]?.[nextY] || tileInfo[x]?.[nextY].turnable) &&
        (!tileInfo[nextX]?.[y] || tileInfo[nextX]?.[y].turnable) &&
        (!tileInfo[nextX]?.[nextY] || tileInfo[nextX]?.[nextY].turnable)
      ) {
        // empty
      } else {
        this.state = ENTITY_STATE_ENUM.BLOCKTURNRIGHT;
        return true;
      }
    }

    return false;
  }
}

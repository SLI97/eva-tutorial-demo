import { Component } from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';
import levels, { ILevel } from '../../Levels';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { TILE_HEIGHT, TILE_WIDTH } from './GameObjects/Tile';
import DataManager from '../../Runtime/DataManager';
import EventManager from '../../Runtime/EventManager';
import { DIRECTION_ENUM, ENTITY_STATE_ENUM, ENTITY_TYPE_ENUM, EVENT_ENUM } from '../../Enums';
import Player from './GameObjects/Player';
import WoodenSkeleton from './GameObjects/WoodenSkeleton';
import PlayerManager from './GameObjects/Player/Scripts/PlayerManager';
import WoodenSkeletonManager from './GameObjects/WoodenSkeleton/Scripts/WoodenSkeletonManager';
import DoorManager from './GameObjects/Door/Scripts/DoorManager';
import Door from './GameObjects/Door';
import IronSkeleton from './GameObjects/IronSkeleton';
import IronSkeletonManager from './GameObjects/IronSkeleton/Scripts/IronSkeletonManager';
import Burst from './GameObjects/Burst';
import BurstManager from './GameObjects/Burst/Scripts/BurstManager';
import Spikes from './GameObjects/Spikes';
import SpikesManager from './GameObjects/Spikes/Scripts/SpikesManager';
import Smoke from './GameObjects/Smoke';
import SmokeManager from './GameObjects/Smoke/Scripts/SmokeManager';
import FaderManager from '../../Runtime/FaderManager';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字
  level: ILevel;

  init() {
    DataManager.Instance.levelIndex = 1;

    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this);
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkArrived, this);
    EventManager.Instance.on(EVENT_ENUM.SHOW_SMOKE, this.generateSmoke, this);
  }

  start() {
    this.initLevel();
  }

  async initLevel() {
    const level = levels[`level${DataManager.Instance.levelIndex}`];
    if (level) {
      await FaderManager.Instance.fadeIn();
      this.clearLevel();
      this.level = level;
      DataManager.Instance.mapInfo = level.mapInfo;
      DataManager.Instance.mapRowCount = level.mapInfo.length;
      DataManager.Instance.mapColumnCount = level.mapInfo[0].length;

      this.generateTileMap();
      this.generateBursts();
      this.generateDoor();
      this.generateSpikes();
      this.generateEnemies();
      this.generatePlayer();
      await FaderManager.Instance.fadeOut();
    }
  }

  clearLevel() {
    Array.from(this.gameObject.transform.children).forEach(({ gameObject }) => {
      gameObject.destroy();
    });

    DataManager.Instance.reset();
  }

  generateTileMap() {
    this.gameObject.addChild(TileMap());
    this.adaptPos();
  }

  generateBursts() {
    DataManager.Instance.bursts = this.level.bursts.map(item => {
      const burst = Burst(item);
      this.gameObject.addChild(burst);
      return burst.getComponent(BurstManager);
    });
  }

  generateDoor() {
    const door = Door(this.level.door);
    this.gameObject.addChild(door);
    DataManager.Instance.door = door.getComponent(DoorManager);
  }

  generatePlayer() {
    const player = Player(this.level.player);
    this.gameObject.addChild(player);
    DataManager.Instance.player = player.getComponent(PlayerManager);
  }

  generateEnemies() {
    DataManager.Instance.enemies = this.level.enemies.map(item => {
      if (item.type === ENTITY_TYPE_ENUM.SKELETON_WOODEN) {
        const enemy1 = WoodenSkeleton(item);
        this.gameObject.addChild(enemy1);
        return enemy1.getComponent(WoodenSkeletonManager);
      } else if (item.type === ENTITY_TYPE_ENUM.SKELETON_IRON) {
        const enemy2 = IronSkeleton(item);
        this.gameObject.addChild(enemy2);
        return enemy2.getComponent(IronSkeletonManager);
      }
    });
  }

  generateSpikes() {
    DataManager.Instance.spikes = this.level.spikes.map(item => {
      const spikes = Spikes(item);
      this.gameObject.addChild(spikes);
      return spikes.getComponent(SpikesManager);
    });
  }

  generateSmoke(x: number, y: number, direction: DIRECTION_ENUM) {
    const item = DataManager.Instance.smokes.find(smoke => smoke.state === ENTITY_STATE_ENUM.DEATH);
    if (item) {
      item.x = x;
      item.y = y;
      item.direction = direction;
      item.state = ENTITY_STATE_ENUM.IDLE;
    } else {
      const smoke = Smoke({
        x,
        y,
        direction,
        state: ENTITY_STATE_ENUM.IDLE,
        type: ENTITY_TYPE_ENUM.SMOKE,
      });
      this.gameObject.addChild(smoke);
      DataManager.Instance.smokes.push(smoke.getComponent(SmokeManager));
    }
  }

  adaptPos() {
    const { mapRowCount, mapColumnCount } = DataManager.Instance;
    const disX = (SCREEN_WIDTH - TILE_WIDTH * mapRowCount) / 2;
    const disY = (SCREEN_HEIGHT - TILE_HEIGHT * mapColumnCount) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }

  nextLevel() {
    DataManager.Instance.levelIndex++;
    this.initLevel();
  }

  checkArrived() {
    const {
      player: { x: playerX, y: playerY },
      door: { x: doorX, y: doorY, state: doorState },
    } = DataManager.Instance;
    if (playerX === doorX && playerY === doorY && doorState === ENTITY_STATE_ENUM.DEATH) {
      EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL);
    }
  }
}

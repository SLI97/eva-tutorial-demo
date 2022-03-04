import { Component } from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';
import levels from '../../Levels';
import DataManagerInstance from '../../Runtime/DataManager';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { TILE_HEIGHT, TILE_WIDTH } from './GameObjects/Tile';

export class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  init() {
    this.initLevel();
  }

  initLevel() {
    const { levelIndex } = DataManagerInstance;
    const level = levels[`level${levelIndex}`];
    DataManagerInstance.mapInfo = level.mapInfo;
    DataManagerInstance.mapRowCount = level.mapInfo[0].length;
    DataManagerInstance.mapColumnCount = level.mapInfo.length;

    this.generateTileMap();
  }

  generateTileMap() {
    this.gameObject.addChild(TileMap());
    this.adaptPos();
  }

  adaptPos() {
    const { mapRowCount, mapColumnCount } = DataManagerInstance;
    const disX = (SCREEN_WIDTH - TILE_WIDTH * mapRowCount) / 2;
    const disY = (SCREEN_HEIGHT - TILE_HEIGHT * mapColumnCount) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }
}

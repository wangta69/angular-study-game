
import { Polygon } from './polygon';

export class Rectangle extends Polygon {

  /**
   * 
   * @param x : 시작점(lefttop x)
   * @param y : 시작점(lefttop y)
   * @param w : 넓이
   * @param h : 높이
   */
  constructor(x: number, y: number, w: number,  h: number) {
    super();
    const half = {w: w / 2, h: h / 2};

    this.points = [[-half.w, -half.h], [half.w, -half.h], [half.w, half.h], [-half.w, half.h]];
    this.setOrigin(x + half.w, y + half.h);
  }
}
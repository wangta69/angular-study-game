
import { Polygon } from './polygon';

export class Triangle extends Polygon {

  // private min = {x: 0, y: 0};
  // private max = {x: 0, y: 0};
  private g = {x: 0, y: 0}; // 삼각형의 중심축

  // private bouds: number[][]; // lefttop, rightbottom
  // private points: number[][];
  /**
   * 
   * @param x : 시작점(lefttop x)
   * @param y : 시작점(lefttop y)
   * @param w : 넓이
   * @param h : 높이
   */
  constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    super();

    // 중심축을 구한다.
    this.g = {x: (x1 + x2 + x3) / 3,  y:(y1 + y2 + y3) / 3};

    this.points = [[x1-this.g.x, y1-this.g.y], [x2-this.g.x, y2-this.g.y], [x3-this.g.x, y3-this.g.y]];
    this.setOrigin(this.g.x,  this.g.y);
  }


  // isIntersect(xc: number, yc: number) {
  //   // 사각형일 경우
  //   const m = this.matrix;
  //   if (this.points) {
  //     // if (yc > this.min.y + m[5] && yc < this.max.y + m[5] && xc > this.min.x + m[4] && xc < this.max.x+ m[4]) {
  //     if (yc > m[5] - this.g.y  && yc < this.g.y + m[5] && xc > m[4] && xc < this.g.x+ m[4]) {
  //       this.xc = xc;
  //       this.yc = yc;
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}

import { Objects } from './objects';

export class Circle extends Objects {

  private r: number;
  private sAngle: number;
  private eAngle: number;

  /**
   * 
   * @param x  중심 x
   * @param y  중심 y
   * @param r  반경 r
   * @param sAngle 
   * @param eAngle 
   */
  constructor(x: number, y: number, r: number,  sAngle?: number, eAngle?: number) {
    super();
    this.r = r;
    this.sAngle = sAngle || 0;
    this.eAngle = eAngle || 2;

    this.setOrigin(x, y);

  }

  override draw(ctx: any) {
    ctx.save();
    
    ctx.beginPath();
    ctx.strokeStyle = this.property.strokeStyle;
    ctx.lineWidth = this.property.lineWidth;
    ctx.fillStyle = this.property.fillStyle;
    const trans = [...this.transfromPoint(0, 0)];

    // ctx.transform(1.6,0,0,1,0,0);

    ctx.arc(trans[0], trans[1], this.r, this.sAngle * Math.PI,  this.eAngle * Math.PI, false);

    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  // mousedown   isIntersect
  // https://medium.com/@lavrton/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8
  // isIntersect(xc: number, yc: number) {
    
  //   //  타원일 경우 이 부분과 radius를 활용하여 touch 되었는지 확인
  //   const m = this.matrix;
    
  //   const distance = Math.sqrt(
  //     (xc - (m[4])) * (xc - (m[4])) +
  //       (yc - (m[5])) * (yc - (m[5])) 
  //   );
  //   if (distance < this.r) {
  //     this.xc = xc;
  //     this.yc = yc;
  //     return true;
  //   }

  //   return false;
  // }
}
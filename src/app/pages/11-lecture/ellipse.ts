
import { Objects } from './objects';

export class Ellipse extends Objects {

  private w: number;
  private h: number;

 
  constructor(x: number, y: number, w: number,  h: number) {
    super();
    this.w = w;
    this.h = h;

    // this.setOrigin(x - w /2, y - h /2);

    this.setOrigin(x, y);
  }

  override draw(ctx: any) {
    
    const lx = - this.w/2,
    rx = this.w/2,
    ty = - this.h/2,
    by = this.h/2;
    const magic = 0.551784;
    const xmagic = magic * this.w/2;
    const ymagic = this.h * magic/2;

    ctx.beginPath();
    ctx.strokeStyle = this.property.strokeStyle;
    ctx.lineWidth = this.property.lineWidth;
    ctx.fillStyle = this.property.fillStyle;

    ctx.moveTo(...this.transfromPoint(0,ty));
    ctx.bezierCurveTo(...this.transfromPoint(xmagic,ty) ,...this.transfromPoint(rx,-ymagic), ...this.transfromPoint(rx,0));
    ctx.bezierCurveTo(...this.transfromPoint(rx,ymagic) ,...this.transfromPoint(xmagic,by),...this.transfromPoint(0,by));
    ctx.bezierCurveTo(...this.transfromPoint(-xmagic,by) ,...this.transfromPoint(lx,ymagic),...this.transfromPoint(lx,0));
    ctx.bezierCurveTo(...this.transfromPoint(lx,-ymagic) ,...this.transfromPoint(-xmagic,ty),...this.transfromPoint(0,ty));

    ctx.fill();
    ctx.stroke(); 
    // ctx.closePath();
    // ctx.restore();
  }

  // mousedown 
  // isIntersect(xc: number, yc: number) {
    
  //   //  타원일 경우 이 부분과 radius를 활용하여 touch 되었는지 확인
  //   const m = this.matrix;
    
  //   const distance = Math.sqrt(
  //     (xc - (m[4])) * (xc - (m[4])) +
  //       (yc - (m[5])) * (yc - (m[5])) 
  //   );
  //   if (distance < Math.max(this.w, this.h) / 2) {
  //     this.xc = xc;
  //     this.yc = yc;
  //     return true;
  //   }

  //   return false;
  // }


}
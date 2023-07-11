
import { Objects } from './objects';

export class Polygon extends Objects {
  protected points?: number[][];

  constructor() {
    super();
    
  }

  override draw(ctx: any) {
    ctx.beginPath();
    ctx.strokeStyle = this.property.strokeStyle;
    ctx.lineWidth = this.property.lineWidth;
    ctx.fillStyle = this.property.fillStyle;
    let i = 0;
    if (this.points) {
      this.points.forEach( (point: number[]) => {
        if (i === 0) {
          ctx.moveTo(...this.transfromPoint(point[0], point[1]));
        } else {
          ctx.lineTo(...this.transfromPoint(point[0], point[1]));
        }
        i++;
      })
    }
    
    
    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
    ctx.stroke();
  }

}
import rgbConvert from './convertColor';

export class Objects {
  protected matrix = [1,0,0,1,0,0];
  protected xc: number | null = null; //  마우스 클릭 위치(x)
  protected yc: number | null = null; //  마우스 클릭 위치(y)
    // [a,b,c,d,e,f]
  // a: Scales the drawing horizontally
  // b: Skew the the drawing horizontally
  // c: Skew the the drawing vertically
  // d: Scales the drawing vertically
  // e: Moves the the drawing horizontally
  // f: Moves the the drawing vertically
  protected rDegree: number = 0; // rotation Degree
  protected property = {strokeStyle: 'grey', lineWidth: 1, fillStyle: 'red'};
  public name = '';
  constructor(

  ) {

  }

  public setProperty(property: any) {
    this.property.strokeStyle = property.strokeStyle ? property.strokeStyle : 'grey';
    this.property.lineWidth = property.lineWidth ? property.lineWidth : 1;
    this.property.fillStyle = property.fillStyle ? property.fillStyle : 'red';
  }

  public setName(name: string) {
    this.name = name;
  }

  protected transfromPoint(x: number, y: number) {
    const m = this.matrix;
    return [x * m[0] + y * m[2] + m[4], x * m[1] + y * m[3] + m[5]];
  }

  protected setOrigin(x: number, y: number) {
    this.matrix[4] = x;
    this.matrix[5] = y;
  }

  protected setRotation() {
    const ax = Math.cos(this.rDegree * Math.PI / 180);
    const ay = Math.sin(this.rDegree * Math.PI / 180);
    this.matrix[0] = ax;
    this.matrix[1] = ay;
    this.matrix[2] = -ay;
    this.matrix[3] = ax;
  }

  protected setTransform(ox: number, oy: number, rot: number, scale: number) {
    const ax = Math.cos(rot) * scale;
    const ay = Math.sin(rot) * scale;
    this.matrix[0] = ax;
    this.matrix[1] = ay;
    this.matrix[2] = -ay;
    this.matrix[3] = ax;
    this.matrix[4] = ox;
    this.matrix[5] = oy;
  }

  // 하위에서 override 하여 사용
  draw(ctx: any) {

  }

  // mouseup
  unselected() {
    this.xc = null;
    this.yc = null;
  }
  
  // mousemove
  drag(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (this.xc && this.yc) {
      // 좌표상 움직인 거리 구하기
      const dx = x - this.xc;
      const dy = y - this.yc;
      // 마우스 좌표 수정
      this.xc = x;
      this.yc = y;
      
      this.matrix[4] += dx;
      this.matrix[5] += dy;
      this.draw(ctx);
    }
  }

  isIntersect(ctx: any, xc: number, yc: number) {

    const pixel = ctx.getImageData(xc, yc, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    const splitHex = rgbConvert(this.property.fillStyle);
    const fillStyle = `rgb(${splitHex.r},${splitHex.g},${splitHex.b})`;

    if (color == fillStyle) {
      this.xc = xc;
      this.yc = yc;
      return true;
    }

    return false;

  }

  // object rotate
  //
  rotate(ctx: CanvasRenderingContext2D, angle: number) {
    this.rDegree = this.rDegree + angle;
    console.log('rotate', this.rDegree );
    this.setRotation();
    this.draw(ctx);
  }
}
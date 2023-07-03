import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

export class Rectangle {
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private rDegree: number = 0; // rotation Degree

  private xc: number | null = null; //  마우스 클릭 위치(x)
  private yc: number | null = null; //  마우스 클릭 위치(y)
  
  private matrix = [1,0,0,1,0,0];

  constructor(x1: number, y1: number, x2: number,  y2: number, px: number, py: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.setOrigin(px, py);
  }

  draw(ctx: any) {
  // draw(ctx: CanvasRenderingContext2D) {

    ctx.beginPath();
    ctx.moveTo(...this.transfromPoint(this.x2, this.y1));
    ctx.lineTo(...this.transfromPoint(this.x2, this.y2));
    ctx.lineTo(...this.transfromPoint(this.x1, this.y2));
    ctx.lineTo(...this.transfromPoint(this.x1, this.y1));
    ctx.closePath();
    ctx.stroke();
  }

  // mousedown 
  selected(xc: number, yc: number) {
    
    //  타원일 경우 이 부분과 radius를 활용하여 touch 되었는지 확인
    // const distance = Math.sqrt(
    //   (xc - this.x) * (xc - this.x) +
    //     (yc - this.y) * (yc - this.y) 
    // );
    // return distance;
    
    // 사각형일 경우
    const m = this.matrix;

    if (yc > this.y1 + m[5] && yc < this.y2 + m[5] && xc > this.x1 + m[4] && xc < this.x2 + m[4]) {
      this.xc = xc;
      this.yc = yc;
      return true;
    }

    return false;

  }

  // mouseup
  unselected() {
    this.xc = null;
    this.yc = null;
  }

  // mousemove
  drag(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // console.log('drag:', x, y);
    
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

  // object rotate
  //
  rotate(ctx: CanvasRenderingContext2D) {
    this.rDegree = this.rDegree + 90;
    this.setRotation();
    this.draw(ctx);
  }

  transfromPoint(x: number, y: number) {
    const m = this.matrix;
    return [x * m[0] + y * m[2] + m[4], x * m[1] + y * m[3] + m[5]];
  }

  private setOrigin(x: number, y: number) {
    this.matrix[4] = x;
    this.matrix[5] = y;
  }

  private setRotation() {
    const ax = Math.cos(this.rDegree * Math.PI / 180);
    const ay = Math.sin(this.rDegree * Math.PI / 180);
    this.matrix[0] = ax;
    this.matrix[1] = ay;
    this.matrix[2] = -ay;
    this.matrix[3] = ax;
  }
}
@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId 
    (mousedown)='onMousedown($event)'
    (mouseup)='onMouseUp($event)'
    (mousemove)='onMouseMove($event)'
    (dblclick)='onMouseDblclick($event)'
    width='700px' height= '700px'></canvas>`
})
export class LectureComponent7 implements OnInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;
  private rect: Rectangle | null = null;
  private selected: Rectangle | null = null;
  constructor(
  ) { }

  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    
    this.ctx = this.canvas.getContext('2d');

    this.rect = new Rectangle(-50, -75, 50,  75, 100, 200);
    this.rect.draw(this.ctx);

  }

// To Move Shape: Select, hold and move
// To Rotate Shape: Double click/tap 
// To Flip Shape: Select and hold until it flips

  // CANVAS EVENT LISTENERS
  onMousedown = (evt: MouseEvent) => {
    // this.model.isLeftMouseDown = true;
    const pos = this.getMousePos(this.canvas, evt);
    if (this.rect) {
      const selected = this.rect.selected(pos.x, pos.y);
      
      if(selected) {
        this.selected = this.rect;
      }
    }
  }

  onMouseUp = (evt: MouseEvent) => {
    if(this.selected) {
      this.selected.unselected();
      this.selected = null;
    }
  }

  onMouseMove = (evt: MouseEvent) => {
    if (this.selected) {
      const pos = this.getMousePos(this.canvas, evt);
      this.clearRect();
      this.selected.drag(this.ctx, pos.x, pos.y);
    }
  }

  onMouseDblclick = (evt: MouseEvent) => {

    const pos = this.getMousePos(this.canvas, evt);
    if (this.rect) {
      const selected = this.rect.selected(pos.x, pos.y);
      
      if(selected) {
        console.log('selected');
        this.clearRect();
        // this.ctx.save();
        this.rect.rotate(this.ctx);
        // this.ctx.restore();
      }
    }
  }
  
  /**
   * 마우스의 포인트를 캔버스상의 위치로 변경
   * @param canvas 
   * @param evt 
   * @returns 
   */
  private getMousePos(canvas: any, evt: MouseEvent): { x: number; y: number } {
    var rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    return { x, y };
  }

  private clearRect = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
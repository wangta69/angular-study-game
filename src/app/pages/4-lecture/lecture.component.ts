import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

export class Rectangle {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  private xc: number | null = null; //  마우스 클릭 위치(x)
  private yc: number | null = null; //  마우스 클릭 위치(y)

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {

    ctx.beginPath();
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);

    ctx.closePath();
    ctx.fill(); // ctx.fillStyle = 'red';
    ctx.stroke(); // ctx.strokeStyle = 'grey'; ctx.lineWidth = 3;
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
    if (yc > this.y && yc < this.y + this.height && xc > this.x && xc < this.x + this.width) {
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
      
      // 시작점 변경 
      this.x = this.x + dx;
      this.y = this.y + dy;


      this.draw(ctx);
    }

  }

  // object rotate
  //
  rotate(ctx: CanvasRenderingContext2D) {
    const transX = this.width / 2 + this.x;
    const transY = this.height / 2 + this.y;
    ctx.translate(transX, transY);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.translate(- transX, -transY);
    this.draw(ctx);
    return ctx;
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
export class LectureComponent4 implements OnInit{
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

    this.rect = new Rectangle(20, 20, 150, 100);
    this.rect.draw(this.ctx);

    
    // this.graphCanvas.nativeElement.addEventListener('mouseup', ({ button }) => {
    //   this.model.isLeftMouseDown = false;
    // });

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
        console.log('selected');
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
        this.rect.rotate(this.ctx);
        
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
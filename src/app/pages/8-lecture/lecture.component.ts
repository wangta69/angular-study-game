import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

export class Objects {
  protected matrix = [1,0,0,1,0,0];
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

  public setOrigin(x: number, y: number) {
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
}

export class Triangle extends Objects {
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private x3: number;
  private y3: number;
  private xc: number | null = null; //  마우스 클릭 위치(x)
  private yc: number | null = null; //  마우스 클릭 위치(y)
  
  constructor(x1: number, y1: number, x2: number,  y2: number, x3: number, y3: number) {
    super();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.strokeStyle = this.property.strokeStyle;
    ctx.lineWidth = this.property.lineWidth;
    ctx.fillStyle = this.property.fillStyle;

    ctx.moveTo(...this.transfromPoint(this.x1, this.y1));
    ctx.lineTo(...this.transfromPoint(this.x2, this.y2));
    ctx.lineTo(...this.transfromPoint(this.x3, this.y3));
    
    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
    ctx.stroke();
  }

  // mousedown 
  selected(xc: number, yc: number) {
    
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
}

export class Ellipse extends Objects {

  //https://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
  private x: number;
  private y: number;
  private r: number;
  private sAngle: number;
  private eAngle: number;

  private xc: number | null = null; //  마우스 클릭 위치(x)
  private yc: number | null = null; //  마우스 클릭 위치(y)
  
  constructor(x: number, y: number, r: number,  sAngle?: number, eAngle?: number) {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
    this.sAngle = sAngle || 0;
    this.eAngle = eAngle || 2;
  }

  draw(ctx: any) {
    ctx.save();
    
    // ctx.beginPath();
    // ctx.fillStyle = 'red';
    // ctx.lineWidth = 4;
    // ctx.arc(60, 60, 45, 0, 2 * Math.PI, true);
    // ctx.stroke();
    // ctx.fill();  

    this.matrix[0] = 1.6;
    
    ctx.beginPath();
    ctx.strokeStyle = this.property.strokeStyle;
    ctx.lineWidth = this.property.lineWidth;
    ctx.fillStyle = this.property.fillStyle;
    const trans = [...this.transfromPoint(this.x, this.y)];

    // ctx.transform(1.6,0,0,1,0,0);

    ctx.arc(trans[0], trans[1], this.r, this.sAngle * Math.PI,  this.eAngle * Math.PI, false);

    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  // mousedown 
  selected(xc: number, yc: number) {
    
    console.log('selected ', xc, yc);
    //  타원일 경우 이 부분과 radius를 활용하여 touch 되었는지 확인
    const m = this.matrix;
    const distance = Math.sqrt(
      (xc - (this.x + m[4])) * (xc - (this.x + m[4])) +
        (yc - (this.y+ m[5])) * (yc - (this.y+ m[5])) 
    );

    if (distance < this.r) {
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
}

export class Circle extends Objects {
  // arc(center X, center Y, radius, Start Angle, End angle)
  private x: number;
  private y: number;
  private r: number;
  private sAngle: number;
  private eAngle: number;

  private xc: number | null = null; //  마우스 클릭 위치(x)
  private yc: number | null = null; //  마우스 클릭 위치(y)
  
  constructor(x: number, y: number, r: number,  sAngle?: number, eAngle?: number) {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
    this.sAngle = sAngle || 0;
    this.eAngle = eAngle || 2;
  }

  draw(ctx: any) {
    ctx.save();
    
    // ctx.beginPath();
    // ctx.fillStyle = 'red';
    // ctx.lineWidth = 4;
    // ctx.arc(60, 60, 45, 0, 2 * Math.PI, true);
    // ctx.stroke();
    // ctx.fill();  

    this.matrix[0] = 1.6;
    
    ctx.beginPath();
    ctx.strokeStyle = this.property.strokeStyle;
    ctx.lineWidth = this.property.lineWidth;
    ctx.fillStyle = this.property.fillStyle;
    const trans = [...this.transfromPoint(this.x, this.y)];

    // ctx.transform(1.6,0,0,1,0,0);

    ctx.arc(trans[0], trans[1], this.r, this.sAngle * Math.PI,  this.eAngle * Math.PI, false);

    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  // mousedown 
  selected(xc: number, yc: number) {
    
    console.log('selected ', xc, yc);
    //  타원일 경우 이 부분과 radius를 활용하여 touch 되었는지 확인
    const m = this.matrix;
    const distance = Math.sqrt(
      (xc - (this.x + m[4])) * (xc - (this.x + m[4])) +
        (yc - (this.y+ m[5])) * (yc - (this.y+ m[5])) 
    );

    if (distance < this.r) {
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
}

export class Rectangle extends Objects {
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private xc: number | null = null; //  마우스 클릭 위치(x)
  private yc: number | null = null; //  마우스 클릭 위치(y)

  constructor(x1: number, y1: number, x2: number,  y2: number) {
    super();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.strokeStyle = this.property.strokeStyle;
    ctx.lineWidth = this.property.lineWidth;
    ctx.fillStyle = this.property.fillStyle;

    ctx.moveTo(...this.transfromPoint(this.x1, this.y1));
    ctx.lineTo(...this.transfromPoint(this.x2, this.y1));
    ctx.lineTo(...this.transfromPoint(this.x2, this.y2));
    ctx.lineTo(...this.transfromPoint(this.x1, this.y2));
    ctx.fill();
    ctx.stroke(); 
    ctx.closePath();
    ctx.stroke();
  }

  // mousedown 
  selected(xc: number, yc: number) {
    
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
}


@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId 
    (mousedown)='onMousedown($event)'
    (mouseup)='onMouseUp($event)'
    (mousemove)='onMouseDrag($event)'
    (dblclick)='onMouseDblclick($event)'
    width='700px' height= '700px'></canvas>`
})
export class LectureComponent8 implements OnInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;

  // private triangle: Triangle | null = null;
  private selected: any = null;
  private objects: any[] = [];
  constructor(
  ) { }

  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    
    this.ctx = this.canvas.getContext('2d');



    const rect = new Rectangle(-50, -75, 50,  75);
    rect.name = 'rect';
    rect.setOrigin(100, 200);
    rect.draw(this.ctx);
    this.objects.push(rect);

    const rect1 = new Rectangle(-50, -75, 50,  75);
    rect1.name = 'rect1';
    rect1.setOrigin(100, 400);
    rect1.setProperty({fillStyle: 'blue'})
    rect1.draw(this.ctx);
    this.objects.push(rect1);


    const triangle = new Triangle(-50, -75, 50, 75, -50, 50);
    triangle.name = 'triangle';
    triangle.setOrigin(300, 200);
    triangle.setProperty({fillStyle: 'yellow'})
    triangle.draw(this.ctx);
    this.objects.push(triangle);

    const circle = new Circle(0, 0, 75);
    circle.name = 'circle';
    circle.setOrigin(300, 400);
    circle.setProperty({fillStyle: 'yellow'})
    circle.draw(this.ctx);
    this.objects.push(circle);

  }

// To Move Shape: Select, hold and move
// To Rotate Shape: Double click/tap 
// To Flip Shape: Select and hold until it flips

  // CANVAS EVENT LISTENERS
  onMousedown = (evt: MouseEvent) => {
    // this.model.isLeftMouseDown = true;
    const pos = this.getMousePos(this.canvas, evt);
    if (this.objects.length) {

      this.objects.forEach((obj: any) => {
        if(obj.selected(pos.x, pos.y)) {
          this.selected = obj;
        }
      })
      
    }
  }

  /**
   * 마우스 업
   * @param evt 
   */
  onMouseUp = (evt: MouseEvent) => {
    if(this.selected) {
      this.selected.unselected();
      this.selected = null;
    }
  }

  /**
   * 마우스 드래그
   * @param evt 
   */
  onMouseDrag = (evt: MouseEvent) => {
    if (this.selected) {
      const pos = this.getMousePos(this.canvas, evt);
      this.clearRect();

      this.objects.forEach((obj: any) => {
        if (this.selected?.name && this.selected.name === obj.name) {
          this.selected.drag(this.ctx, pos.x, pos.y);
        } else {
          obj.draw(this.ctx);
        }
      })
      
    }
  }

  /**
   * 마우스 더블 클릭
   * @param evt 
   */
  onMouseDblclick = (evt: MouseEvent) => {
    const pos = this.getMousePos(this.canvas, evt);
    this.clearRect();
    this.objects.forEach((obj: any) => {
      if(obj.selected(pos.x, pos.y)) {
        obj.rotate(this.ctx);
      } else {
        obj.draw(this.ctx);
      }
    })
  }
  
  /**
   * 마우스의 포인트를 캔버스상의 위치로 변경
   * @param canvas 
   * @param evt 
   * @returns 
   */
  private getMousePos(canvas: any, evt: MouseEvent): { x: number; y: number } {
    const obj = canvas.getBoundingClientRect();
    const x = evt.clientX - obj.left;
    const y = evt.clientY - obj.top;
    return { x, y };
  }

  private clearRect = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
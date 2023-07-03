import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId 
    width='700px' height= '700px'></canvas>`
})
export class LectureComponent6MatrixDefault implements OnInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;
  private matrix = [1,0,0,1,0,0];
  // [a,b,c,d,e,f]
  // a: Scales the drawing horizontally
  // b: Skew the the drawing horizontally
  // c: Skew the the drawing vertically
  // d: Scales the drawing vertically
  // e: Moves the the drawing horizontally
  // f: Moves the the drawing vertically
  constructor(
  ) { }

  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    // requestAnimationFrame(this.update);
    this.rectangle();



    this.moveUsingMatrix();
    // this.simplerotateUsingMatrix();
    this.rotateUsingMatrix();

    // this.rectangleMatrixMoveto();
  }

  

  private rectangle() {
    const x1 = 0;
    const x2 = 100;
    const y1 = 0;
    const y2 = 200;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'green';

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x1, y2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  
  private moveUsingMatrix() {

    this.setOrigin(400, 400); // 이동시킨다.

    const x1 = -50;
    const x2 = 50;
    const y1 = -100;
    const y2 = 100;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';

    this.ctx.moveTo(...this.transfromPoint(x1, y1));
    this.ctx.lineTo(...this.transfromPoint(x2, y1));
    this.ctx.lineTo(...this.transfromPoint(x2, y2));
    this.ctx.lineTo(...this.transfromPoint(x1, y2));
    this.ctx.closePath();
    this.ctx.fill();
  }


  private simplerotateUsingMatrix() {

    this.setOrigin(400, 400); // 이동시킨다.
    this.setRotation(45);
    const x1 = 0;
    const x2 = 100;
    const y1 = 0;
    const y2 = 200;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'gray';

    this.ctx.moveTo(...this.transfromPoint(x1, y1));
    this.ctx.lineTo(...this.transfromPoint(x2, y1));
    this.ctx.lineTo(...this.transfromPoint(x2, y2));
    this.ctx.lineTo(...this.transfromPoint(x1, y2));
    this.ctx.closePath();
    this.ctx.fill();
  }

  private rotateUsingMatrix() {

    this.setOrigin(400, 400); // 이동시킨다.
    this.setRotation(45);
    const x1 = -50;
    const x2 = 50;
    const y1 = -100;
    const y2 = 100;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'blue';



    this.ctx.moveTo(...this.transfromPoint(x1, y1));
    this.ctx.lineTo(...this.transfromPoint(x2, y1));
    this.ctx.lineTo(...this.transfromPoint(x2, y2));
    this.ctx.lineTo(...this.transfromPoint(x1, y2));
    this.ctx.closePath();
    this.ctx.fill();
  }
  
  private transfromPoint(x: number, y: number) {
    const m = this.matrix;
    return [x * m[0] + y * m[2] + m[4], x * m[1] + y * m[3] + m[5]];
  }

  private setOrigin(x: number, y: number) {
    this.matrix[4] = x;
    this.matrix[5] = y;
  }



  private setRotation(angle: number) {
    const ax = Math.cos(angle);
    const ay = Math.sin(angle);
    this.matrix[0] = ax;
    this.matrix[1] = ay;
    this.matrix[2] = -ay;
    this.matrix[3] = ax;
  }

  private setScale(scale: number) {
    this.matrix[0] *= scale;
    this.matrix[1] *= scale;
    this.matrix[2] *= scale;
    this.matrix[3] *= scale;
  }

  private setTransform(ox: number, oy: number, rot: number, scale: number) {
    const ax = Math.cos(rot) * scale;
    const ay = Math.sin(rot) * scale;
    this.matrix[0] = ax;
    this.matrix[1] = ay;
    this.matrix[2] = -ay;
    this.matrix[3] = ax;
    this.matrix[4] = ox;
    this.matrix[5] = oy;
  }
  
  // private roundRect(x1: number, y1: number, x2: number, y2: number, r: number, color = "#000", lineWidth = 2) {
  //   this.ctx.strokeStyle  = color;
  //   this.ctx.lineWidth = lineWidth;
  //   const min = Math.min(Math.abs(x1 - x2), Math.abs(y1 - y2));
  //   r = r > min ? min / 2 : r;
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(...this.transfromPoint(x2 - r, y1));
  //   this.ctx.quadraticCurveTo(...this.transfromPoint(x2, y1), ...this.transfromPoint(x2, y1 + r));
  //   this.ctx.lineTo(...this.transfromPoint(x2, y2 - r));
  //   this.ctx.quadraticCurveTo(...this.transfromPoint(x2, y2), ...this.transfromPoint(x2 - r, y2));
  //   this.ctx.lineTo(...this.transfromPoint(x1 + r, y2));
  //   this.ctx.quadraticCurveTo(...this.transfromPoint(x1, y2), ...this.transfromPoint(x1 , y2 - r));
  //   this.ctx.lineTo(...this.transfromPoint(x1, y1 + r));
  //   this.ctx.quadraticCurveTo(...this.transfromPoint(x1, y1), ...this.transfromPoint(x1 + r, y1));
  //   this.ctx.closePath();
  //   this.ctx.stroke();
  // }

  private roundRect(x1: number, y1: number, x2: number, y2: number, r: number, color = "#000", lineWidth = 2) {
    this.ctx.strokeStyle  = color;
    this.ctx.lineWidth = lineWidth;
    const min = Math.min(Math.abs(x1 - x2), Math.abs(y1 - y2));
    r = r > min ? min / 2 : r;
    this.ctx.beginPath();
    this.ctx.moveTo(...this.transfromPoint(x2, y1));
    this.ctx.lineTo(...this.transfromPoint(x2, y2));
    this.ctx.lineTo(...this.transfromPoint(x1, y2));
    this.ctx.lineTo(...this.transfromPoint(x1, y1));
    
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private roundRectAPITransform(x1: number, y1: number, x2: number, y2: number, r: number, color = "#F00", lineWidth = 2) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    const min = Math.min(Math.abs(x1 - x2), Math.abs(y1 - y2));
    r = r > min ? min / 2 : r;
    this.ctx.beginPath();
    this.ctx.moveTo(x2 - r, y1);
    this.ctx.quadraticCurveTo(x2, y1, x2, y1 + r);
    this.ctx.lineTo(x2, y2 - r);
    this.ctx.quadraticCurveTo(x2, y2, x2 - r, y2);
    this.ctx.lineTo(x1 + r, y2);
    this.ctx.quadraticCurveTo(x1, y2, x1 , y2 - r);
    this.ctx.lineTo(x1, y1 + r);
    this.ctx.quadraticCurveTo(x1, y1, x1 + r, y1);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private update = (time: number) => {
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);

    // around center
    this.setOrigin(100, 100);
    // this.setRotation(time * Math.PI / 2000); // one rotation every 4 seconds
    // this.roundRect(-60, -35,  60, 35, 15); // x1: number, y1: number, x2: number, y2: number, r: number
    this.roundRect(0, 0,  120, 70, 0); 
    // // around top right corner
    // this.setOrigin(300, 100);
    // this.setRotation(-time * Math.PI / 2000); // one rotation every 4 seconds
    // this.roundRect(-60, 0,  0, 35, 5);

    // // red box using API
    // this.ctx.setTransform(1,0,0,1,200,100);
    // this.ctx.rotate(-time * Math.PI / 4000) // once every 8 seconds;
    // this.roundRectAPITransform(-30, -15,  30, 15, 12);
    // this.ctx.setTransform(1,0,0,1,0,0); // restore default

    requestAnimationFrame(this.update);
  }

}
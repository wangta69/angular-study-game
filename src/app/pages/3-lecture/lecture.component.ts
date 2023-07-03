import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';



export class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 3;
    ctx.fillStyle = "red";

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);


    ctx.closePath();
    ctx.fill(); // ctx.fillStyle = "red";
    ctx.stroke(); // ctx.strokeStyle = "grey"; ctx.lineWidth = 3;
  }
}
@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId width="700px" height= "700px"></canvas>`
})
export class LectureComponent3 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;
  constructor(
  ) { }

  ngAfterViewInit(){
    this.canvas = this.canvasRef.nativeElement;
    
    this.ctx = this.canvas.getContext('2d');

    const rect = new Rectangle(20, 20, 150, 100);
    rect.draw(this.ctx);
  }

}
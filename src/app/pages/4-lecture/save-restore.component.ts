import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId 
    width='700px' height= '700px'></canvas>`
})
export class LectureComponent4SaveRestore implements OnInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;

  constructor(
  ) { }

  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    
    this.ctx = this.canvas.getContext('2d');


    this.draw();
    // this.graphCanvas.nativeElement.addEventListener('mouseup', ({ button }) => {
    //   this.model.isLeftMouseDown = false;
    // });

  }

  draw = () => {
    

    const x = 100;
    const y = 100;
    const width = 100;
    const height = 100;
    // left rectangles, rotate from canvas origin
    // this.ctx.save();

    // 사각형을 그립니다.
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillRect(x, y, width, height); 


    // this.ctx.rotate(degree * Math.PI/180);
    // canvas의 rotate는 canvas자체를 rotate 시키는 것이다.
    // rotate를 할때 rotate의 object의 중심으로 해야 함으로  아래처럼 처리한다.
    // rotate는 실제로 object를 하는 것이 아니라 canvas 의 0, 0 을 기준으로 rotate를 하고 그 상태에서 object를 그리기 때문이다.
    const transX = width / 2 + x;
    const transY = height / 2 + y;
    this.ctx.save()
    this.ctx.translate(transX, transY);
    this.ctx.rotate(45 * Math.PI/180);
    this.ctx.translate(- transX, -transY); // translate back
    this.ctx.fillStyle = "#4D4E53";
    this.ctx.fillRect(x, y, width, height); 
    this.ctx.restore()


  } 


}
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId 
    width='800px' height= '700px'></canvas>`
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
    
    // save는 현재 까지의 작업내용을 history에서 저장하는 것이고
    // restore을 저장된 내용을 하나씩 가져오고 history에서 삭제하는 것


    // 사각형을 그립니다.
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(50, 50, 100, 100); 

    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(200, 50, 100, 100);

    // 가장 최근에 정의된 blue의 속성를 받아서 blue가 채워진다.
    this.ctx.fillRect(350, 50, 100, 100);



    // 사각형을 그립니다.
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(50, 200, 100, 100); 
    this.ctx.save(); // 지금까지의 작업을 저장

    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(200, 200, 100, 100);

    this.ctx.restore(); // save 이전의 속성을 받아서 red가 채워진다.
    this.ctx.fillRect(350, 200, 100, 100);



    // 사각형을 그립니다.
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(50, 350, 100, 100); 
    this.ctx.save(); // 지금까지의 작업을 저장

    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(200, 350, 100, 100);
    this.ctx.save();

    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(350, 350, 100, 100);

    
    this.ctx.restore(); // 가장 최근에 저장된 blue를 채움
    this.ctx.fillRect(500, 350, 100, 100);

    this.ctx.restore(); // blue 이전에 저장된 red를 채움
    this.ctx.fillRect(650, 350, 100, 100);
  } 


}
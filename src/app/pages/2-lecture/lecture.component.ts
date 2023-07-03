import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId width="700px" height= "700px"></canvas>`
})
export class LectureComponent2 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;
  constructor(
  ) { }

  ngAfterViewInit(){
    this.canvas = this.canvasRef.nativeElement;
    
    this.ctx = this.canvas.getContext('2d');

    this.drawRect();
    // this.drawRectWithPath();
    this.drawRectWithClosePath();
  }

  private drawRect() {
    this.ctx.beginPath(); // path를 시작
    this.ctx.rect(20, 20, 150, 100); // rect 명령을 이용하기 그리기
    this.ctx.stroke(); // 테두리 생성

    // this.ctx.fillRect(25, 25, 100, 100); //  색상으로 채원진 사각형 그리기
    // this.ctx.clearRect(45, 45, 60, 60);  // 특정부분 없애기
    // this.ctx.strokeRect(50, 50, 50, 50); // 테두리가 있는 사각형 만들기
  }

  private drawRectWithPath() {
    this.ctx.beginPath();
    this.ctx.moveTo(200, 20);
    this.ctx.lineTo(350, 20);
    this.ctx.lineTo(350, 120);
    this.ctx.lineTo(200, 120);
    this.ctx.lineTo(200, 20);
    // this.ctx.fill();
    this.ctx.stroke();
  }

  private drawRectWithClosePath() {
    this.ctx.beginPath();
    this.ctx.moveTo(200, 20);
    this.ctx.lineTo(350, 20);
    this.ctx.lineTo(350, 120);
    this.ctx.lineTo(200, 120);
    // this.ctx.lineTo(200, 20); // 마지막 LineTo를 없애고 ClosePath를 사용함
    // this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
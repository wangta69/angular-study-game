import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`<canvas #canvasId ></canvas>`
})
export class LectureComponent1 implements AfterViewInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;
  constructor(
  ) { }

  ngAfterViewInit(){
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    console.log(this.canvas.width, this.canvas.height);
    // canvas 의 기본크기는 300x150이다. 이 크기를 변경하기 위해서는 
    // <canvas #canvasId width="700px" height= "700px"></canvas> 처럼 사용하여야 한다.
    // style로 width 나 height를 줄경우는 기본크기에서 확대되는 개념이지 canvas의 demension 자체가 변경되지는 않는다.
  }
}
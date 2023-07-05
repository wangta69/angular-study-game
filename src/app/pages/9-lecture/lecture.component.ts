import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Rectangle } from './rectangle';
import { Triangle } from './triangle';
import { Circle } from './circle';
import { Ellipse } from './ellipse';

@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId 
    (mousedown)='onMousedown($event)'
    (mouseup)='onMouseUp($event)'
    (mousemove)='onMouseDrag($event)'
    (dblclick)='onMouseDblclick($event)'
    width='700px' height= '700px'></canvas>`
})
export class LectureComponent9 implements OnInit{
  @ViewChild('canvasId', {static: true}) canvasRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private canvas: any;
  private ctx: any;

  private selected: any = null;
  private objects: any[] = [];

  constructor(
  ) { 
  }

  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    
    this.ctx = this.canvas.getContext('2d');

    const rect = new Rectangle(100, 100, 100,  150);
    rect.name = 'rec1';
    rect.setProperty({fillStyle: '#ff0000'})
    rect.draw(this.ctx);
    this.objects.push(rect);

    const rect1 = new Rectangle(100, 300, 100,  150);
    rect1.name = 'rec2';
    rect1.setProperty({fillStyle: '#0000ff'})
    rect1.draw(this.ctx);
    this.objects.push(rect1);


    const triangle = new Triangle(100, 0,  200, 200,  0, 200);
    triangle.name = 'triangle';
    triangle.setProperty({fillStyle: '#ffff00'})
    triangle.draw(this.ctx);
    this.objects.push(triangle);


    const triangle1 = new Triangle(300, 0,  400, 200,  200, 200);
    triangle1.name = 'triangle1';
    triangle1.setProperty({fillStyle: '#808080'})
    triangle1.draw(this.ctx);
    this.objects.push(triangle1);

    const circle = new Circle(300,300, 75);
    circle.name = 'circle';
    circle.setProperty({fillStyle: '#ffff10'})
    circle.draw(this.ctx);
    this.objects.push(circle);

    const ellipse = new Ellipse(300, 300, 150, 75);
    ellipse.name = 'ellipse';
    ellipse.setProperty({fillStyle: '#008000'})
    ellipse.draw(this.ctx);
    this.objects.push(ellipse);

    // console.log(rgbConver.);
    // rgbConver.color('#ccccc');
  }

// To Move Shape: Select, hold and move
// To Rotate Shape: Double click/tap 
// To Flip Shape: Select and hold until it flips

  // CANVAS EVENT LISTENERS
  onMousedown = (evt: MouseEvent) => {
    const pos = this.getMousePos(this.canvas, evt);
    if (this.objects.length) {
      let i = 0;
      let selectIndex = null;

      this.objects.forEach((obj: any) => {
        if(obj.isIntersect(this.ctx, pos.x, pos.y)) {

          
          selectIndex = i;
          this.selected = obj;

        }
        i++;
      })
      if (selectIndex !== null) {
        console.log('selectIndex:', selectIndex);
        this.objects.splice(selectIndex, 1);
        this.objects.push(this.selected) // 항목을 제거하는 방법);
      }
    // }

      // 
    }  
  }

  /**
   * 마우스 업
   * @param evt 
   */
  onMouseUp = (evt: MouseEvent) => {
    if(this.selected) {
      setTimeout(() => {
        this.selected.unselected();
        this.selected = null;
      }, 20);
     
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
    // console.log('======== onMouseDblclick');
    // this.preventSimpleClick = true;
    // clearTimeout(this.clickTimer);

    // const pos = this.getMousePos(this.canvas, evt);
    this.clearRect();
    this.objects.forEach((obj: any) => {
      if(this.selected.name === obj.name) {
        obj.rotate(this.ctx, 90);
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
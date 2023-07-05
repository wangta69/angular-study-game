import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

// hit region  은 크게 좌료를 이용하여 구하는 것과 색상을 이용하여 구하는 두가지 방법이 있습니다.
// 일반적으로 좌표로 구하는 방식은

export class Rectangle {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private rDegree: number = 0; // rotation Degree

  private xc: number | null = null; //  마우스 클릭 위치(x)
  private yc: number | null = null; //  마우스 클릭 위치(y)

  private fillStyle = '#123456';

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const transX = this.width / 2 + this.x;
    const transY = this.height / 2 + this.y;

    ctx.save();
    ctx.translate(transX, transY);
    ctx.rotate((this.rDegree * Math.PI) / 180);
    ctx.translate(- transX, -transY);

    ctx.beginPath();
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 3;
    ctx.fillStyle = this.fillStyle;

    

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);

    ctx.closePath();
    ctx.fill(); // ctx.fillStyle = 'red';
    ctx.stroke(); // ctx.strokeStyle = 'grey'; ctx.lineWidth = 3;
    ctx.restore();
  }

  // mousedown 
  hitArea(xc: number, yc: number) {

    //  타원일 경우 이 부분과 radius를 활용하여 touch 되었는지 확인
    // return  Math.sqrt( (xc - this.x) ** 2  + (yc - this.y) ** 2 ) < object.radius;

    // 사각형일 경우
    if (yc > this.y && yc < this.y + this.height && xc > this.x && xc < this.x + this.width) {
      this.xc = xc;
      this.yc = yc;
      alert('hit');
      return true;
    }

    return false;

  }

  hitColor(ctx: any, xc: number, yc: number) {

    const pixel = ctx.getImageData(xc, yc, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

    const splitHex = this._splitHEX(this.fillStyle);
    const fillStyle = `rgb(${splitHex.r},${splitHex.g},${splitHex.b})`;

    // const colorHex = '#'+parseInt(pixel[0], 16)+parseInt(pixel[1], 16)+parseInt(pixel[2], 16);
    console.log('pixel', color, fillStyle);
    //  타원일 경우 이 부분과 radius를 활용하여 touch 되었는지 확인
    // return  Math.sqrt( (xc - this.x) ** 2  + (yc - this.y) ** 2 ) < object.radius;

    // 사각형일 경우
    if (color == fillStyle) {
      console.log('hit................');
      return true;
    }

    return false;

  }

  private convertToRGB = () =>{
    // if(this.length != 6){
    //     throw "Only six-digit hex colors are allowed.";
    // }

    // var aRgbHex = this.match(/.{1,2}/g);
    // var aRgb = [
    //     parseInt(aRgbHex[0], 16),
    //     parseInt(aRgbHex[1], 16),
    //     parseInt(aRgbHex[2], 16)
    // ];
    // return aRgb;
  }


  private _hex2dec(v: string) {
      return parseInt(v, 16)
  };

  private _splitHEX(hex: string) {
    var c;
    if (hex.length === 4) {
        c = (hex.replace('#','')).split('');
        return {
            r: this._hex2dec((c[0] + c[0])),
            g: this._hex2dec((c[1] + c[1])),
            b: this._hex2dec((c[2] + c[2]))
        };
    } else {
         return {
            r: this._hex2dec(hex.slice(1,3)),
            g: this._hex2dec(hex.slice(3,5)),
            b: this._hex2dec(hex.slice(5))
        };
    }
};

//   var RGBvalues = (function() {

//     var _hex2dec = function(v) {
//         return parseInt(v, 16)
//     };

//     var _splitHEX = function(hex) {
//         var c;
//         if (hex.length === 4) {
//             c = (hex.replace('#','')).split('');
//             return {
//                 r: _hex2dec((c[0] + c[0])),
//                 g: _hex2dec((c[1] + c[1])),
//                 b: _hex2dec((c[2] + c[2]))
//             };
//         } else {
//              return {
//                 r: _hex2dec(hex.slice(1,3)),
//                 g: _hex2dec(hex.slice(3,5)),
//                 b: _hex2dec(hex.slice(5))
//             };
//         }
//     };

//     var _splitRGB = function(rgb) {
//         var c = (rgb.slice(rgb.indexOf('(')+1, rgb.indexOf(')'))).split(',');
//         var flag = false, obj;
//         c = c.map(function(n,i) {
//             return (i !== 3) ? parseInt(n, 10) : flag = true, parseFloat(n);
//         });
//         obj = {
//             r: c[0],
//             g: c[1],
//             b: c[2]
//         };
//         if (flag) obj.a = c[3];
//         return obj;
//     };

//     var color = function(col) {
//         var slc = col.slice(0,1);
//         if (slc === '#') {
//             return _splitHEX(col);
//         } else if (slc.toLowerCase() === 'r') {
//             return _splitRGB(col);
//         } else {
//             console.log('!Ooops! RGBvalues.color('+col+') : HEX, RGB, or RGBa strings only');
//         }
//     };

//     return {
//         color: color
//     };
// }());

// console.debug(RGBvalues.color('rgb(52, 86, 120)'));
//   //-> { r: 52, g: 86, b: 120 }
// console.debug(RGBvalues.color('#345678'));
//   //-> { r: 52, g: 86, b: 120 }
// console.debug(RGBvalues.color('rgba(52, 86, 120, 0.67)'));
//   //-> { r: 52, g: 86, b: 120, a: 0.67 }
// console.debug(RGBvalues.color('#357'));
//   //-> { r: 51, g: 85, b: 119 }
  

}
@Component({
  selector: 'app-doc',
  template:`<canvas #canvasId 
    (mousedown)='onMousedown($event)'
    width='700px' height= '700px'></canvas>`
})
export class LectureComponent10 implements OnInit{
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
      // const selected = this.rect.hitArea(pos.x, pos.y);
      const selected = this.rect.hitColor(this.ctx, pos.x, pos.y);
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

export default function rgbConvert(col: string) {
 
  const _hex2dec = (v: string) => {
    return parseInt(v, 16)
  };

  const _splitHEX = function(hex: string) {
    var c;
    if (hex.length === 4) {
      c = (hex.replace('#','')).split('');
      return {
        r: _hex2dec((c[0] + c[0])),
        g: _hex2dec((c[1] + c[1])),
        b: _hex2dec((c[2] + c[2]))
      };
    } else {
      return {
        r: _hex2dec(hex.slice(1,3)),
        g: _hex2dec(hex.slice(3,5)),
        b: _hex2dec(hex.slice(5))
      };
    }
  };

  const _splitRGB = (rgb: string) => {
    let c = (rgb.slice(rgb.indexOf('(')+1, rgb.indexOf(')'))).split(',');
    let flag = false;
    let obj: any;
    const result = c.map(function(n,i) {
      return (i !== 3) ? parseInt(n, 10) : flag = true, parseFloat(n);
    });
    obj = {
      r: result[0],
      g: result[1],
      b: result[2]
    };
    if (flag) obj.a = c[3];
    return obj;
  };

  // const color = (col: string) => {
  const color = (col: string) => {
    const slc = col.slice(0,1);
    if (slc === '#') {
      return _splitHEX(col);
    } else if (slc.toLowerCase() === 'r') {
      return _splitRGB(col);
    } else {
      console.log('!Ooops! RGBvalues.color('+col+') : HEX, RGB, or RGBa strings only');
    }
  };

  return color(col);
};

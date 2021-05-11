import { QRCode } from './qrcode.mjs';
import { config } from './config.mjs';
import { ls } from './storage.mjs';

if(ls.get('qrBG')){
  config.qr.colorLight = ls.get('qrBG')
} else {
  ls.set('qrBG', config.qr.colorLight)
}

if(ls.get('qrFG')){
  config.qr.colorDark = ls.get('qrFG')
} else {
  ls.set('qrFG', config.qr.colorDark )
}

const utils = {
  debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  },
  initQR(cb){
    try {
      window.qrcode = new QRCode("qrcode", Object.assign({
          text: ls.get('qrcurrent'),
          correctLevel : QRCode.CorrectLevel.H
      }, config.qr));
      cb(false)
    } catch (err) {
      cb(err)
    }
  },
  reserQR(val){
    window.dispatchEvent(new CustomEvent('reset-qr', {detail: val}))
  }
}


export { utils }

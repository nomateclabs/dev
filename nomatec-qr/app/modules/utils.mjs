import { QRCode } from './qrcode.mjs';
import { config } from './config.mjs';
import { ls } from './storage.mjs';

const utils = {
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

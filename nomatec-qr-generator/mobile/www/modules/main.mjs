window.qrcode = null;

import { tpl } from './tpl.mjs';
import { utils } from './utils.mjs';

const app = {
  build(){

    document.body.append(
      tpl.topnav(),
      tpl.main(),
      tpl.footer()
    )

    return this;
  },
  init(){

    utils.initQR(function(err,res){
      if(err){
        console.error(err)
        return;
      }
    })

  }
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    app.build().init()
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

}

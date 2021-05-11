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

app.build().init()

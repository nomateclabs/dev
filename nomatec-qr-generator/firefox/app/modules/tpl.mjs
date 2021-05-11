import { config } from './config.mjs';
import { x } from './xscript.mjs';
import { ls } from './storage.mjs';
import { utils } from './utils.mjs';

if(!ls.get('qrcurrent')){
  ls.set('qrcurrent', '')
}

const tpl = {
  topnav(){
    return x('nav', {class: 'navbar navbar-dark bg-primary mb-4'},
      x('div', {class: 'container-fluid d-inline-block'},
        x('img', {src: config.app.logo, class: 'img-fluid'}),
        x('span', {class: 'navbar-brand h1 nav-txt'}, config.app.name)
      )
    )
  },
  footer(){
    return x('div', {id: 'footer'}, config.app.copyright, x('a', {
      href: config.app.details.url,
      target: '_blank'
    }, config.app.details.name))
  },
  main(){

    let cnt = x('span', {class: 'countr'}, ls.get('qrcurrent').length + '/4000'),
    ta = x('textarea', {
      class: 'form-control',
      rows: '8',
      value: ls.get('qrcurrent'),
      placeholder: 'Start typing...',
      onkeyup: utils.debounce(function(evt){

        let val = evt.target.value,
        len = config.app.maxlen;

        if(val.length > len){
          val = val.slice(0,len);
        }

        utils.reserQR(val);

      },500)
    },ls.get('qrcurrent')),
    item = x('div', {class: 'container-fluid'},
      x('div', {class: 'form-group'},ta,cnt),
      x('a',x('div', {id: 'qrcode'})),
      x('div', {class: 'd-grid gap-2 mt-4'},
        x('button', {
          class: 'btn btn-outline-primary',
          onclick(){
            utils.reserQR('');
          }
        }, 'Reset')
      )

    )

    window.addEventListener('reset-qr', function(evt){
      let val = evt.detail || '';
      ta.value = val;
      qrcode.clear();
      qrcode.makeCode(val);
      cnt.textContent = val.length + '/4000';
      ls.set('qrcurrent', val)
    },false)

    return item;
  }
}

export { tpl }

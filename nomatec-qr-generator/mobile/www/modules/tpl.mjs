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
        x('h3', {class: 'navbar-brand h1 nav-txt'}, config.app.name)
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
    anchor = x('div', {id: 'qrcode'}),
    item = x('div', {class: 'container-fluid'},
      x('div', {class: 'form-group'},ta,cnt),
      anchor,
      x('div', {class: 'row'},
        x('div', {class: 'col-12'},
          x('div', {class: 'form-group text-center mt-4 mb-4'},
            x('label', 'Download Title'),
            x('input', {
              type: 'text',
              class: 'form-control text-center',
              value: ls.get('qrtitle').slice(0,-4),
              onkeyup(){
                let val = this.value;
                if(val.length){
                  val = val + '.png';
                  ls.set('qrtitle', val);
                } else {
                  val = 'QR_image.png'
                  this.value = val.slice(0,-4);
                  ls.set('qrtitle', val);
                }
              }
            })
          )
        ),
        x('div', {class: 'col-6'},
          x('div', {class: 'form-group text-center'},
            x('label', 'Background'),
            x('input', {
              type: 'color',
              class: 'form-control colpik',
              value: ls.get('qrBG'),
              onchange(){
                qrcode._htOption.colorLight = this.value;
                utils.reserQR(ls.get('qrcurrent'));
                ls.set('qrBG', this.value)
              }
            })
          )
        ),
        x('div', {class: 'col-6'},
          x('div', {class: 'form-group text-center'},
            x('label', 'Foreground'),
            x('input', {
              type: 'color',
              value: ls.get('qrFG'),
              class: 'form-control colpik',
              onchange(){
                qrcode._htOption.colorDark = this.value;
                utils.reserQR(ls.get('qrcurrent'));
                ls.set('qrFG', this.value)
              }
            })
          )
        )
      ),
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

import { utils } from './utils.mjs';
import { tpl } from './tpl.mjs';
import { x } from './xscript.mjs';
import { events } from './events.mjs';
import { QRCode } from './qrcode.mjs';


const pageCache = {}

const app = {
  init(){

    document.body.append(tpl.header())

    //utils.initPayPalButton();

    let dest = document.getElementById('app-main');





    page('/', function(res){
      document.title = 'Home';
      utils.totop(0)
      console.log(res)
      dest.innerHTML = '';


      if(!pageCache.home){
         pageCache.home = tpl.home();
      }

      dest.append(pageCache.home)

    })

    page('/qr', function(res){
      console.log(res);
      document.title = 'Nomatec Medical | QR'
      dest.innerHTML = '';
      utils.totop(0);

      if(!pageCache.qr){
         pageCache.qr = tpl.qr();
      }

      dest.append(pageCache.qr)

    })

    page('/category/:category', function(res){
      console.log(res);
      document.title = 'Category | '+ res.params.category
      dest.innerHTML = '';
      utils.totop(0)

    })

    page('/items/:category/:id', function(res){
      console.log(res);
      dest.innerHTML = '';

      utils.getItem(res.params, function(err, obj){
        if(err){return console.error(err)}
        document.title = 'Item | '+ obj.name;
        utils.totop(0)


        dest.append(
          tpl.singleItem(obj)
        )

        utils.initSingle()
      })

      dest.innerHTML = '';

    })

    page('/error', function(res){
      document.title = 'error'
      dest.innerHTML = '';

      dest.append(x('pre', x('code', '{error: "page not found"}')))
    })

    page('/faq', function(res){
      document.title = 'faq'
      dest.innerHTML = '';

      dest.append(x('p', 'page FAQ'))
    })

    page('/contact', function(res){
      document.title = 'Contact'
      dest.innerHTML = '';

      dest.append(x('p', 'page contact'))
    })

    return this;
  },
  build(){

    events.init()

  }
}

app.init().build()

/*
page('/user/:user', show)

page('/user/:user/edit', edit)

page('/user/:user/album', album)

page('/user/:user/album/sort', sort)

page('*', notfound)
*/
page()

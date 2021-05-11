import { index } from '../data/index.mjs';
import { QRCode } from './qrcode.mjs';
import { x } from './xscript.mjs';

const utils = {
  getItem(params, cb){

    let obj,
    id = parseInt(params.id),
    arr = index[params.category];

    for (let i = 0; i < arr.length; i++) {
      if(arr[i].id === id){
        console.log('hit')
        obj = arr[i];
        break;
      }
    }

    if(!obj){
      return cb('item '+ id +' not found')
    }

    fetch('/app/data/item/'+ id +'.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function(response){
      response.json().then(function(data){
        obj = Object.assign(obj, data, {category: params.category});
        cb(false, obj);
      })
    })
    .catch(function(err){
      cb(err);
    });

  },
  initSingle(){
    var $flickitySliderWrap = $('.flickity-slider-wrap');

    if ($flickitySliderWrap.data('autoplay')) {
      var dataAutoPlay = true;
    } else {
      var dataAutoPlay = false;
    }

    if ($flickitySliderWrap.data('arrows')) {
      var dataArrows = true;
    } else {
      var dataArrows = false;
    }

    if ($flickitySliderWrap.data('slidedots')) {
      var dataSlideDots = true;
    } else {
      var dataSlideDots = false;
    }



    // main large image (shop product)
    var $gallery = $('#gallery-main').flickity({
      cellAlign: 'center',
      contain: true,
      wrapAround: true,
      autoPlay: false,
      prevNextButtons: true,
      percentPosition: true,
      imagesLoaded: true,
      lazyLoad: 1,
      pageDots: false,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false,
      arrowShape: 'M 25,50 L 65,90 L 70,90 L 30,50  L 70,10 L 65,10 Z'
    });

    // thumbs
    $('.gallery-thumbs').flickity({
      asNavFor: '#gallery-main',
      contain: true,
      cellAlign: 'left',
      wrapAround: false,
      autoPlay: false,
      prevNextButtons: false,
      percentPosition: true,
      imagesLoaded: true,
      pageDots: false,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false
    });

    // Single item
    $('#slider-single').flickity({
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      autoPlay: dataAutoPlay,
      prevNextButtons: dataArrows,
      percentPosition: true,
      imagesLoaded: true,
      lazyLoad: 1,
      pageDots: dataSlideDots,
      selectedAttraction : 0.1,
      friction: 0.6,
      rightToLeft: false,
      arrowShape: 'M 10,50 L 60,100 L 65,100 L 15,50  L 65,0 L 60,0 Z'
    });

    var $gallery = $('.mfp-hover');

    $gallery.on( 'dragStart.flickity', function( event, pointer ) {
      $(this).addClass('is-dragging');
    })

    $gallery.on( 'dragEnd.flickity', function( event, pointer ) {
      $(this).removeClass('is-dragging');
    })

    $gallery.magnificPopup({
      delegate: '.lightbox-img, .lightbox-video',
      callbacks: {
        elementParse: function(item) {
        if(item.el.context.className == 'lightbox-video') {
            item.type = 'iframe';
          } else {
            item.type = 'image';
          }
        }
      },
      type: 'image',
      closeBtnInside:false,
      gallery:{
        enabled:true
      }
    });

    utils.initLightbox()
  },
  initLightbox(){
    $('.lightbox-img, .lightbox-video').magnificPopup({
      callbacks: {
        elementParse: function(item) {
        if(item.el.context.className == 'lightbox-video') {
            item.type = 'iframe';
          } else {
            item.type = 'image';
          }
        }
      },
      type: 'image',
      closeBtnInside:false,
      gallery: {
        enabled:true
      },
      image: {
        titleSrc: 'title',
        verticalFit: true
      }
    });
  },
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
  capitalize(str) {
   try {
     let x = str[0] || str.charAt(0);
     return x  ? x.toUpperCase() + str.substr(1) : '';
   } catch (err) {
     if(err){return str;}
   }
  },
  is_email(email){
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
     return true;
    }
    return false;
  },
  ts2datetime(i){
    return new Date(i).toLocaleString()
  },
  ts2date(i){
    return new Date(i).toLocaleDateString()
  },
  ms2dh(ms){
    let days = Math.floor(ms / (24*60*60*1000)),
    daysms = ms % (24*60*60*1000),
    hours = Math.floor((daysms)/(60*60*1000)),
    hoursms = ms % (60*60*1000),
    minutes = Math.floor((hoursms)/(60*1000));
    return [days,hours,minutes].join(':');
  },
  unsnake(i){
    return i.replace(/_/g, ' ')
  },
  format_date(i){
    let date = new Date(i),
    dd = date.getDate(),
    mm = date.getMonth()+1,
    yyyy = date.getFullYear();

    if(dd < 10){
      dd = '0' + dd
    }

    if(mm < 10){
      mm = '0' + mm
    };

    return [yyyy, mm, dd].join('-')
  },
  get_year(){
    let d = new Date();
    return d.getFullYear();
  },
  totop(i){
    window.scroll({
      top: i || 0,
      left: 0,
      behavior: 'smooth'
    });
  },
  empty(i){
    while (i.firstChild) {
      i.removeChild(i.firstChild);
    }
  },
  rnd(items){
    return items[Math.floor(Math.random()*items.length)];
  },
  initPayPalButton() {
    paypal.Buttons({
      style: {
        shape: 'rect',
        color: 'white',
        layout: 'vertical',
        label: 'paypal',

      },

      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{"amount":{"currency_code":"USD","value":1}}]
        });
      },

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
      },

      onError: function(err) {
        console.log(err);
      }
    }).render('#paypal-button-container');
  },
  lbl(i){
    return x('div', {class: 'col-12'}, x('h3', i))
  },
  inp(i) {
    return x('div', {class: 'col-lg-6'},
      x('div', {class: 'form-group mb-3'},
        x('input', {
          class: 'form-control',
          type: 'text',
          placeholder: utils.capitalize(utils.unsnake(i)),
          onkeyup: utils.debounce(function(evt) {
            obj[i] = evt.target.value;
            utils.newQR();
            console.log(obj)
          },500)
        })
      )
    )
  },
  tarea(i) {
    return x('div', {class: 'col-6'},
      x('div', {class: 'form-group mb-3'},
        x('textarea', {
          class: 'form-control',
          rows: '6',
          placeholder: utils.capitalize(utils.unsnake(i)),
          onkeyup: utils.debounce(function(evt) {
            obj[i] = evt.target.value;
            utils.newQR();
            console.log(obj)
          },500)
        })
      )
    )
  },
  newQR(){
    qrcode.clear();
    qrcode.makeCode(JSON.stringify(obj));
    resData.textContent = JSON.stringify(obj,0,2);
  }
}

export { utils }

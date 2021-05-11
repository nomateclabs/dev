import { QRCode } from './qrcode.mjs';
import { x } from './xscript.mjs';
import { config } from './config.mjs';
import { latest } from '../data/latest.mjs';
import { utils } from './utils.mjs';


const tpl = {
  header(){

    let item = x('main', {class: 'main-wrapper'},
      x('header', {class: 'nav-type-1'},
        tpl.appSearch(),
        tpl.topBar(),
        tpl.nav()
      ),
      x('div', {id: 'app-main', class: 'content-wrapper oh'}),
      x('div', {id: 'app-footer', class: 'content-wrapper oh'},
        tpl.newsletter(),
        tpl.footer()
      ),
      tpl.appSub()
    )
    return item
  },
  qr(){

    window.obj = {};
    var qrcode,
    res = x('div'),
    resData = x('code');

    let obj = {},
    ele = x('div', {class: ''},
        x('div', {class: 'row'},

          utils.lbl('Personal Details'),
          utils.inp('first_name'),
          utils.inp('middle_name'),
          utils.inp('last_name'),
          utils.inp('age'),
          utils.inp('gender'),
          utils.inp('email'),
          utils.inp('mobile_number'),
          utils.inp('phone_number'),
          utils.inp('address'),
          utils.inp('medicare_card_number'),

          utils.lbl('Medical History'),
          utils.inp('blood_type'),
          utils.inp('heart_disease'),
          utils.tarea('medication'),
          utils.tarea('medication_comments'),
          utils.tarea('alergies'),
          utils.tarea('alergies_comments'),
          utils.tarea('medical_conditions'),
          utils.tarea('medical_conditions_comments'),
          utils.tarea('prior_operations'),
          utils.tarea('prior_operations_comments'),

          utils.lbl('Next Of Kin'),

          utils.inp('first_name'),
          utils.inp('last_name'),
          utils.inp('mobile_number'),
          utils.inp('phone_number'),

          utils.lbl('Emergency Contacts'),

          function(){
            let div = x('div', {class: 'row'})
            for (let i = 1; i < 4; i++) {
              div.append(
                utils.inp('contact_'+ i +'_first_name'),
                utils.inp('contact_'+ i +'_last_name'),
                utils.inp('contact_'+ i +'_mobile_number'),
                utils.inp('contact_'+ i +'_phone_number'),
                x('div', {class: 'col-12 mb-4'})
              )
            }

            return x('div', {class: 'col-12'},div);
          },

          utils.lbl('Emergency Medical Details QR Code'),
          x('div', {class: 'col-lg-6'},
            x('p', 'You may click the QR code below to download it for free or order a card size hard copy online.'),
            res,
            x('pre', {class: 'precode mt-4'}, resData)
          ),
          x('div', {class: 'col-lg-6'},
            x('p', '10% of the purchase will be donated to (ADD CHARITY NAME HERE) and you may choose from a plain QR card or a NFC encoded card that you are able to distribute your emergency details freely'),
            x('img', {
              class: 'img-fluid',
              src: './app/img/medical_demo.png'
            }),


            x('div', {id: 'smart-button-container'},
              x('div', {class: 'text-center'},
                x('div', {class: 'mb-2'},
                  x('p'),
                  x('select', {id: 'item-options', class: 'form-control'},
                    x('option', {
                      value: 'NFC enabled storage card with QR print',
                      price: '29.99'
                    }, 'NFC enabled storage card with QR print - 29.99 AUD'),
                    x('option', {
                      value: 'QR print only',
                      price: '19.99'
                    }, 'QR print only - 19.99 AUD')
                  ),
                //  x('select', {id: 'item-options'})
                ),
                x('div', {id: 'quantitySelect'})
              )
            )

          )
        )
      )

      qrcode = new QRCode(res, {
          text: "{}",
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
      });


      // paypalobjects
      function initPayPalButton() {
            var shipping = 4.99;
            var itemOptions = document.querySelector("#smart-button-container #item-options");
        var quantity = parseInt();
        var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
        if (!isNaN(quantity)) {
          quantitySelect.style.visibility = "visible";
        }
        var orderDescription = '';
        if(orderDescription === '') {
          orderDescription = 'Item';
        }
        paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',

          },
          createOrder: function(data, actions) {
            var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
            var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
            var tax = (10 === 0) ? 0 : (selectedItemPrice * (parseFloat(10)/100));
            if(quantitySelect.options.length > 0) {
              quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
            } else {
              quantity = 1;
            }

            tax *= quantity;
            tax = Math.round(tax * 100) / 100;
            var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
            priceTotal = Math.round(priceTotal * 100) / 100;
            var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

            return actions.order.create({
              purchase_units: [{
                description: orderDescription,
                amount: {
                  currency_code: 'AUD',
                  value: priceTotal,
                  breakdown: {
                    item_total: {
                      currency_code: 'AUD',
                      value: itemTotalValue,
                    },
                    shipping: {
                      currency_code: 'AUD',
                      value: shipping,
                    },
                    tax_total: {
                      currency_code: 'AUD',
                      value: tax,
                    }
                  }
                },
                items: [{
                  name: selectedItemDescription,
                  unit_amount: {
                    currency_code: 'AUD',
                    value: selectedItemPrice,
                  },
                  quantity: quantity
                }]
              }]
            });
          },
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
            });
          },
          onError: function(err) {
            console.log(err);
          },
        }).render('#smart-button-container');
      }
      initPayPalButton();

      return ele
  },
  navLogo(){

    return x('div', {class: 'navbar-header flex-child'},
      x('div', {class: 'logo-container'},
        x('div', {class: 'logo-wrap'},
          x('a', {href: '/'},
            x('img', {class: 'logo-dark', src: config.header.logo}),
            x('span', config.app.name)
          )
        )
      ),
      x('button', {
        type: 'button',
        class: 'navbar-toggle',
        'data-toggle': 'collapse',
        'data-target': '#navbar-collapse'
      },
        x('span', {class: 'sr-only'}, 'Toggle navigation'),
        x('span', {class: 'icon-bar'}),
        x('span', {class: 'icon-bar'}),
        x('span', {class: 'icon-bar'})
      ),
      x('div', {class: 'nav-cart mobile-cart hidden-lg hidden-md'},
        x('div', {class: 'nav-cart-outer'},
          x('div', {class: 'nav-cart-inner'},
            x('a', {href: '#', class: 'nav-cart-icon'},
              x('span', {class: 'nav-cart-badge'},2)
            )
          )
        )
      )
    )

  },
  navBottom(){

    return x('div', {class: 'flex-child flex-right nav-right hidden-sm hidden-xs'},
      x('div', {class: 'flex-child flex-right nav-right hidden-sm hidden-xs'},
        x('ul',
          x('li', {class: 'nav-register'},
            x('a', {href:'#'},'My Account')
          ),

          x('li', {class: 'nav-search-wrap style-2 hidden-sm hidden-xs'},
            x('a', {href: '#', class: 'nav-search search-trigger'},
              x('i', {class: 'fa fa-search'})
            )
          ),
          x('li', {class: 'nav-cart'},
            x('div', {class: 'nav-cart-outer'},
              x('div', {class: 'nav-cart-inner'},
                x('a', {href: '#', class: 'nav-cart-icon'})

              )
            ),
            x('div', {class: 'nav-cart-container'},
              x('div', {id: 'smart-button-container', class: 'nav-cart-actions mt-20'},
                x('div', {class: 'text-center'},
                  x('div', {id: 'paypal-button-container'})
                )
              )
            )
          )

        )
      )
    )

  },
  navbar(){

    let item = x('div', {class: 'nav-wrap flex-child'},
      x('div', {class: 'collapse navbar-collapse text-cente', id: 'navbar-collapse'},

        x('ul', {class: 'nav navbar-nav'},
          x('li',
            x('a', {href: '/'}, 'Home')
          ),
          x('li', {class: 'dropdown'},
            x('a', {href: '/'}, 'Shop'),
            x('i', {class: 'fa fa-angle-down dropdown-trigger'}),
            x('ul', {class: 'dropdown-menu megamenu-wide'},
              x('li',
                x('div', {class: 'megamenu-wrap container'},
                  function(){

                    let ele = x('div', {class: 'row'}),
                    items = config.header.links;

                    for (let i = 0; i < items.length; i++) {
                      ele.append(x('div', {class: 'col-md-3 megamenu-item'},
                        function(){
                          let ele2 = x('ul', {class: 'menu-list'},
                            x('li', x('span', items[i].name))
                          )

                          for (let j = 0; j < items[i].items.length; j++) {
                            ele2.append(x('li', x('a', {href: items[i].items[j].url}, items[i].items[j].name)))
                          }
                          return ele2
                        }

                      ))
                    }
                    return ele
                  }

                )
              )
            )
          ),

          x('li', x('a', {href: '/about'}, 'About Us')),
          x('li', x('a', {href: '/news'}, 'News')),
          x('li', x('a', {href: '/contact'}, 'Contact')),
          x('li', {class: 'mobile-links hidden-lg hidden-md'},
            x('a', {href: '#'}, 'My Account')
          ),
          x('li', {id: 'mobile-search', class:'hidden-lg hidden-md'},
            x('form', {method: 'get', class: 'mobile-search'},
              x('input', {type:'search', class: 'form-control', placeholder: 'Search...'}),
              x('button', {type: 'submit', class: 'search-button'},
                x('i', {class: 'fa fa-search'})
              )
            )
          )

        )
      )
    )

    return item;
  },
  nav(){

    let item = x('nav', {class: 'navbar navbar-static-top'},
      x('div', {class: 'navigation', id: 'sticky-nav'},
        x('div', {class: 'container relative'},
          x('div', {class: 'row flex-parent'},
            tpl.navLogo(),
            tpl.navbar(),
            tpl.navBottom()
          )
        )
      )
    )
    return item
  },
  topBar(){

    let item = x('div', {class: 'top-bar hidden-xs'},
      x('div', {class: 'container'},
        x('div', {class: 'top-bar-links flex-parent'},
          x('ul', {class: 'top-bar hidden-xs'},

          ),
          function(){
            let ele = x('ul', {class: 'top-bar hidden-xs'}),
            items = config.header.top.right;

            for (let i = 0; i < items.length; i++) {
              ele.append(x('li', {class: 'top-bar-link'},
                x('a', {href: items[i].url}, items[i].name)
              ))
            }

            return ele;
          }
        )
      )
    );


    return item
  },
  appSearch(){

    let item = x('div', {class: 'search-wrap'},
      x('div', {class: 'search-inner'},
        x('div', {class: 'search-cell'},
          x('form', {method: 'GET'},
            x('div', {class: 'search-field-holder'},
              x('input', {class: 'form-control main-search-input', placeholder: 'Search...', type: 'search'}),
              x('i', {class: 'ui-close search-close', id: 'search-close'})
            )
          )
        )
      )
    )
    return item;
  },
  home(){

    let item = x('div',
      tpl.heroSlider(),
      tpl.promo(),
      tpl.itemPreview(),
      tpl.testimonial(),
    )

    return item;
  },
  itemPreview(){

    return x('section', {class: 'section-wrap products-list'},
      x('div', {class: 'container'},
        x('div', {class: 'row'},
          tpl.itemSpec('bestsellers', latest.bestsellers),
          tpl.itemSpec('specials', latest.specials),
          tpl.itemSpec('latest', latest.latest),
          tpl.itemSpec('recommended', latest.recommended)
        )
      )
    )


  },
  itemSpec(dest, arr){

    let ele = x('ul', {class: 'product-list-widget'});

    for (let i = 0; i < arr.length; i++) {
      ele.append(x('li', {class: 'clearfix'},
        x('a', {href: './items/' + [arr[i].category, arr[i].id].join('/')},
          x('img', {src: './app/img/shop/items/'+ [arr[i].id, arr[i].img].join('_')}),
          x('span', {class: 'product-title'},arr[i].name)
        ),
        x('span', {class: 'price'},
          x('ins', x('span', {class: 'amount'},arr[i].price))
        )
      ))
    }

    return x('div', {class: 'col-md-3 col-sm-6 col-xs-12 mb-40 products-widget'},
      x('h3', {class: 'widget-title bottom-line full-grey'}, dest),
      ele
    )
  },
  testimonial(){

    let item = x('div', {id: 'owl-testimonials', class: 'owl-carousel owl-theme text-center'}),
    items = config.sliders.testimonial

    for (let i = 0; i < items.length; i++) {
      item.append(x('div', {class: 'item'},
        x('div', {class: 'testimonial'},
          x('p', {class: 'testimonial-text'},items[i].text)
        )
      ))
    }

    $(item).owlCarousel({
      navigation: false,
      navigationText: ["<i class='icon-Left-2'></i>", "<i class='icon-Right-2'></i>"],
      autoHeight: true,
      slideSpeed: 300,
      pagination: true,
      paginationSpeed: 400,
      singleItem: true,
      stopOnHover: true
    })

    return x('section', {
        class: 'section-wrap relative testimonials bg-parallax overlay',
        style:'background-image:url('+ config.imgs.testimonial+');'
      },
      x('div', {class: 'container relative'},
        x('div', {class: 'row heading-row mb-20'},
          x('div', {class: 'col-md-6 col-md-offset-3 text-center'},
            x('h2', {class: 'heading white bottom-line'}, config.app.name)
          )
        ),
        item
      )
    )

  },
  promo(){

    let item = x('div', {class: 'row'}),
    items = config.categories;

    for (let i = 0; i < items.length; i++) {
      item.append(x('div', {class: 'col-xs-4 col-xxs-12 mb-30 promo-banner'},
        x('a', {href: './category/'+ items[i]},
          x('img', {src: config.imgs.category + items[i] + '.png'}),
          x('div', {class: 'overlay'}),
          x('div', {class: 'promo-inner valign'},
            x('h2', items[i]),
            x('span', 'Category')
          )
        )
      ))
    }

    return x('section', {class: 'section-wrap promo-banners pb-30'},
      x('div', {class: 'container'}, item)
    )

  },
  heroSlide(obj){

    return x('div', {class: 'hero-slide overlay', style: 'background-image:url('+ obj.img +')'},
      x('div', {class: 'container'},
        x('div', {class: 'hero-holder'},
          x('div', {class: 'hero-message'},
            x('h1', {class: 'hero-title nocaps'}, obj.title),
            x('h2', {class: 'hero-subtitle lines'}, obj.sub)
          )
        )
      )
    )

  },
  heroSlider(){

    let item = x('div', {id: 'owl-hero', class: 'owl-carousel owl-theme light-arrows slider-animated'}),
    arr = config.sliders.hero;

    for (let i = 0; i < arr.length; i++) {
      item.append(tpl.heroSlide(arr[i]))
    }

    return x('section', {class: 'hero-wrap text-center relative'},item)
  },
  singleItem(obj){

    let item = x('div', {class: 'row'},
      x('div', {class: 'col-md-6 col-xs-12 product-slider mb-60'},
        function(){
          let ele = x('div', {id: 'gallery-main', class: 'flickity flickity-slider-wrap mfp-hover'});

          for (let i = 0; i < obj.imgs.length; i++) {
            ele.append(x('div', {class: 'gallery-cell'},
              x('a', {class: 'lightbox-img', href: '/app/img/shop/items/'+[obj.id, obj.imgs[i]].join('_')},
                x('img', {src: '/app/img/shop/items/'+[obj.id, obj.imgs[i]].join('_')}),
                x('i', {class: 'ui-zoom zoom-icon'})
              )
            ))
          }

          return ele;

        },
        function(){
          let ele = x('div', {class: 'gallery-thumbs'});

          for (let i = 0; i < obj.imgs.length; i++) {
            ele.append(x('div', {class: 'gallery-cell'},
                x('img', {src: '/app/img/shop/items/'+[obj.id, obj.imgs[i]].join('_')})
            ))
          }

          return ele;

        }
      ),
      x('div', {class: 'col-md-6 col-xs-12 product-description-wrap'},
        tpl.breadcrumb([
          {dest: '/', name: 'Home'},
          {dest: '/category/' +obj.category, name: 'Category'},
          {dest: '/category/' +obj.category, name: obj.category}
        ]),
        x('h1', {class: 'product-title'}, obj.name),
        x('h5', {class: 'text-danger'}, 'Shipping to: US/UK/Australia/Canada/New Zealand'),
        x('hr'),
        function(){
          let ele = x('span', {class: 'price'});

          if(obj.special){
            ele.append(x('del', x('span', '$' + obj.special)))
          }

          ele.append(x('ins', x('span', {class: 'amount'}, '$' + obj.price)))

          return ele
        },
        x('p', {class: 'short-description'}, obj.description),
        function(){
          let ele = x('div', {class: ''});
          ele.innerHTML = obj.tpl;
          return ele;
        },
        x('hr'),
        x('div', {id: 'accordion', class: 'panel-group accordion mb-50'},

          x('div', {class: 'panel'},
            x('div', {class: 'panel-heading'},
              x('a', {'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#collapseOne', class: 'minus'},
                'Shipping'
              )
            ),
            x('div', {id: 'collapseOne', class: 'panel-collapse collapse in'},
              x('div', {class: 'panel-body'},
                x('ul', {class: 'lsi'},
                  x('li', 'We ship only to US, UK, Australia, Canada and New Zealand.'),
                  x('li', 'We include free shipping with tracking for each sale.'),
                  x('li', 'International shipping times will vary between 15-40 days from the date of purchase due to the coronavirus.'),
                  x('li', 'Items are usually posted within 1 business day of the time of purchase and you shall receive your tracking details shortly after via email.')
                )

              )
            )
          ),

          x('div', {class: 'panel'},
            x('div', {class: 'panel-heading'},
              x('a', {'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#collapseTwo', class: 'minus'},
                'Details'
              )
            ),
            x('div', {id: 'collapseTwo', class: 'panel-collapse collapse'},
              x('div', {class: 'panel-body'},
                x('ul', {class: 'lsi'},
                  x('li','ID: ', x('b', {class: 'text-info'}, obj.id)),
                  x('li','Category: ', x('b', {class: 'text-info'}, obj.category)),
                )
              )
            )
          )

        )

      )
    )



    return x('section', {class: 'section-wrap pb-40 single-product'},
      x('div', {class: 'container-fluid semi-fluid'}, item)
    )
  },
  breadcrumb(arr){

    let item = x('ol', {class: 'breadcrumb'});

    for (let i = 0; i < arr.length; i++) {
      item.append(x('li', x('a', {href: arr[i].dest}, arr[i].name)))
    }

    return item;

  },
  paypalCheckout(){

    return x('paypal-checkout',
      x('form', {target: 'paypal', method:'post',  action: config.paypal.action},
        x('input', {type:'hidden', name:'cmd', value:'_s-xclick'}),
        x('input', {type:'hidden', name:'encrypted', value:''}),
        x('input', {id:'checkout', type:'image', border:'0', name:'submit'}),
        x('img', {border:'0', width:'1', height:'1', src:config.paypal.imgs.pixel})
      )
    )

  },
  topUp(){

    let ele = x('div', {
        id: 'back-to-top',
        class: 'hidden',
        onclick(){
          utils.totop(0)
        }
      },
      x('i', {class: 'fa fa-angle-up'})
    )

    window.addEventListener('scroll', utils.debounce(function(evt){
      let top = window.pageYOffset || document.scrollTop;

      if(top === NaN || !top){
        ele.classList.add('hidden')
      } else if(ele.classList.contains('hidden')){
        ele.classList.remove('hidden');
      }
      top = null;
      return;
    }, 250))

    return ele
  },
  appSub(){
    return x('app-sub',
      this.topUp(),
      this.paypalCheckout()
    )
  },
  newsletter(){

    return x('section', {class: 'newsletter'},
      x('div', {class: 'container'},
        x('div', {class: 'row'},
          x('div', {class: 'col-sm-12 text-center'},
            x('h4', 'Get the latest updates'),
            x('form', {class: 'relative newsletter-form'},
              x('input', {type: 'email', class: 'newsletter-input', placeholder: 'Enter your email'}),
              x('input', {
                type: 'submit',
                class: 'btn btn-lg btn-dark newsletter-submit',
                value: 'Subscribe',
                onclick(){

                }
              })
            )
          )
        )
      )
    )

  },
  footerSect(obj){

    let item = x('div', {class: 'col-md-2 col-sm-6 col-xs-12'},
      x('div', {class: 'widget footer-links'},
        x('h5', {class: 'widget-title bottom-line left-align grey'}, obj.name),
        function(){
          let ele = x('ul', {class: 'list-no-dividers'});

          for (let i = 0; i < obj.items.length; i++) {
            ele.append(x('li', x('a', {href: obj.items[i].href}, obj.items[i].name)))
          }

          return ele;
        }
      )
    )

    return item;

  },
  footer(){

    let item = x('footer', {class: 'footer footer-type-1'},
      x('div', {class: 'container'},
        x('div', {class: 'footer-widgets'},
          x('div', {class: 'row'},

            x('div', {class: 'col-md-3 col-sm-12 col-xs-12'},
              x('div', {class: 'widget footer-about-us'},
                x('img', {src: config.footer.logo, class: 'logo'}),
                x('p', {class: 'mb-30'}, config.footer.slogan),
                x('div', {class: 'footer-socials'},
                  function(){
                    let ele = x('div', {class: 'social-icons nobase'}),
                    items = config.footer.social;

                    for (let i = 0; i < items.length; i++) {
                      ele.append(x('a', {href: items[i].url, target: '_blank'},
                        x('i', {class: 'fa fa-'+ items[i].name})
                      ))
                    }

                    return ele;

                  }
                )
              )
            ),

            tpl.footerSect(config.footer.links[0]),
            tpl.footerSect(config.footer.links[1]),
            tpl.footerSect(config.footer.links[2]),
            tpl.footerSect(config.footer.links[3])

          )
        )
      ),
      x('div', {class: 'bottom-footer'},
        x('div', {class: 'container'},
          x('div', {class: 'row'},
            x('div', {class: 'col-sm-6 copyright sm-text-center'},
              x('span',
                '© '+ new Date().getFullYear() + ' ',
                x('a', {href: config.app.business.url, target: '_blank'}, config.app.business.name),
                ' ABN: '+ config.app.business.abn
              )
            ),
            function(){
              let ele = x('div', {
                class: 'col-sm-6 col-xs-12 footer-payment-systems text-right sm-text-center mt-sml-10'
              }),
              items = config.footer.payments;

              for (let i = 0; i < items.length; i++) {
                ele.append(
                  x('i', {class: 'ml-10 fa fa-cc-'+ items[i]})
                )
              }

              return ele;
            }
          )
        )
      )
    )

    return item;
  }
}

export { tpl }

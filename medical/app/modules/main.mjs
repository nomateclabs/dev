import { QRCode } from './qrcode.mjs';
import { x } from './xscript.mjs';

window.obj = {};
var qrcode,
res = x('div'),
resData = x('code');

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
  unsnake(i){
    return i.replace(/_/g, ' ')
  },
  capitalize(str) {
   try {
     let x = str[0] || str.charAt(0);
     return x  ? x.toUpperCase() + str.substr(1) : '';
   } catch (err) {
     if(err){return str;}
   }
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


window.onload = function(){

  let obj = {},
  tpl = x('div', {class: ''},
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

  document.body.append(x('div', {class: 'container-fluid'}, tpl));


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

}

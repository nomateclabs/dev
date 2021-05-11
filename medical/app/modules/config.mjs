
const config = {
  app: {
    name: 'Nomatec Medical',
    copyright: '2021 Nomatec Labs',
    currency: 'USD',
    business: {
      name: 'Nomatec Labs',
      abn: '59420730506',
      url: 'https://www.nomateclabs.com'
    }
  },
  paypal: {
    action: 'https://www.paypal.com/cgi-bin/webscr',
    imgs: {
      checkout: 'https://www.paypalobjects.com/en_US/i/btn/btn_viewcart_LG.gif',
      pixel: 'https://www.paypalobjects.com/en_AU/i/scr/pixel.gif'
    },
    pkcs7: `-----BEGIN PKCS7-----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-----END PKCS7-----`
  },
  imgs: {
    testimonial: '/app/img/testimonials/testimonial_bg.jpg',
    category: '/app/img/category/'
  },
  sliders: {
    hero: [{
      img: '/app/img/hero/1.jpg',
      title: 'test title 1',
      sub: 'test sub 1'
    },{
      img: '/app/img/hero/1.jpg',
      title: 'test title 2',
      sub: 'test sub 2'
    },{
      img: '/app/img/hero/1.jpg',
      title: 'test title 3',
      sub: 'test sub 3'
    }],
    testimonial: [{
      text: 'This is the excellent theme. It has many useful features that can be use for any kind of business. The support is just amazing and design'
    },{
      text: 'This is the excellent theme. It has many useful features that can be use for any kind of business. The support is just amazing and design'
    },{
      text: 'This is the excellent theme. It has many useful features that can be use for any kind of business. The support is just amazing and design'
    }]
  },
  categories: ["edc", "tactical", "knives", "blunt", "axe", "hunting", "camping"],
  header: {
    logo: '/app/img/lg_144.png',
    top: {
      right: [{
        name: 'Wishlist',
        url: '/wishlist'
      },{
        name: 'News',
        url: '/news'
      }]
    },
    links: [{
      name: 'Weapons',
      items: [{
        name: 'Knives',
        url: '/category/knives'
      },{
        name: 'Blunt',
        url: '/category/blunt'
      },{
        name: 'Axe',
        url: '/category/axe'
      }]
    },{
      name: 'Weapons',
      items: [{
        name: 'Knives',
        url: '/category/knives'
      },{
        name: 'Blunt',
        url: '/category/blunt'
      },{
        name: 'Axe',
        url: '/category/axe'
      }]
    },{
      name: 'Weapons',
      items: [{
        name: 'Knives',
        url: '/category/knives'
      },{
        name: 'Blunt',
        url: '/category/blunt'
      },{
        name: 'Axe',
        url: '/category/axe'
      }]
    },{
      name: 'Weapons',
      items: [{
        name: 'Knives',
        url: '/category/knives'
      },{
        name: 'Blunt',
        url: '/category/blunt'
      },{
        name: 'Axe',
        url: '/category/axe'
      }]
    }]
  },
  footer: {
    logo: '/app/img/logo_dark.png',
    slogan: 'Ecommerce Shop is a very slick and clean eCommerce template.',
    payments: ['paypal', 'visa', 'mastercard', 'discover', 'amex'],
    social: [{
      name: 'facebook',
      url: ''
    },{
      name: 'twitter',
      url: ''
    }],
    links: [{
      name: 'Information',
      items: [{
        name: 'About us',
        href: '/about'
      },{
        name: 'Delivery information',
        href: '/delivery'
      }]
    },{
      name: 'Account',
      items: [{
        name: 'Wishlist',
        href: '/wishlist'
      },{
        name: 'History',
        href: '/history'
      }]
    },{
      name: 'Links',
      items: [{
        name: 'Terms',
        href: '/terms'
      },{
        name: 'Delivery information',
        href: '/delivery'
      }]
    },{
      name: 'Service',
      items: [{
        name: 'FAQ',
        href: '/faq'
      },{
        name: 'Contact',
        href: '/contact'
      }]
    }]
  }
}

export { config }

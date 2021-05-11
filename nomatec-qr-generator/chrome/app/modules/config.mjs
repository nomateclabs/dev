

const config = {
  app: {
    logo: '/app/img/lg_32.png',
    name: 'Nomatec QR Generator',
    copyright: '© '+ new Date().getFullYear(),
    details: {
      name: 'Nomatec Labs',
      url: 'https://www.nomateclabs.com'
    },
    maxlen: 4000
  },
  qr:{
    width: 800,
    height: 800,
    colorDark : "#000000",
    colorLight : "#ffffff",
  }
}

export { config }

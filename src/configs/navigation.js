import menuPages from './menus/pages.menu'

export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-star-outline', key: 'ecommerce.orders', text: 'Заказы',  link: '/' },
      { icon: 'mdi-forklift', key: 'ecommerce.shipments', text: 'Отгрузки', link: '/shipments' },
      { icon: 'mdi-scale-balance', key: 'ecommerce.leftovers', text: 'Остатки', link: '/leftovers' },
    ]
  }],
  //   {
  //   text: 'Landing Pages',
  //   items: [
  //     { icon: 'mdi-cash-usd-outline', key: 'menu.pricingPage', text: 'Pricing Page', link: '/landing/pricing' }
  //   ]
  // },
  //   {
  //   text: 'Pages',
  //   key: 'menu.pages',
  //   items: menuPages
  // }],

  // footer links
  // footer: [{
  //   text: 'Docs',
  //   key: 'menu.docs',
  //   href: 'https://vuetifyjs.com',
  //   target: '_blank'
  // }]
}

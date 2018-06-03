import footerMenu from './footerMenu'
import icon from './icon'
import banner from './banner'
import searchInput from './searchInput'
import menuTabs from './menu-tabs'
import selecter from './selecter'

export default {
    install: function (Vue) {
        Vue.component('l-footerMenu', footerMenu)
        Vue.component('l-banner', banner)
        Vue.component('l-icon', icon)
        Vue.component('l-search', searchInput)
        Vue.component('l-menuTabs', menuTabs)
        Vue.component('l-select', selecter)
    }
}

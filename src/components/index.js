import footerMenu from './footerMenu'
import icon from './icon'
import banner from './banner'
import searchInput from './searchInput'
import selecter from './selecter'
import headMenu from './headMenu'
import shortMenu from './shortMenu'
import tabs from './tabs'

export default {
    install: function (Vue) {
        Vue.component('l-footerMenu', footerMenu)
        Vue.component('l-banner', banner)
        Vue.component('l-icon', icon)
        Vue.component('l-search', searchInput)
        Vue.component('l-select', selecter)
        Vue.component('l-head', headMenu)
        Vue.component('l-shortMenu', shortMenu)
        Vue.component('l-tabs', tabs)
    }
}

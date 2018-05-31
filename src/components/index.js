import footerMenu from './footerMenu'
import icon from './icon'
import banner from './banner'
import searchInput from './searchInput'

export default {
    install: function (Vue) {
        Vue.component('l-footerMenu', footerMenu)
        Vue.component('l-banner', banner)
        Vue.component('l-icon', icon)
        Vue.component('l-search', searchInput)
    }
}

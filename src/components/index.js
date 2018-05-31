import footerMenu from './footerMenu'
import headTitle from './headTitle'
import icon from './icon'
import banner from './banner'

export default {
    install: function (Vue) {
        Vue.component('l-footerMenu', footerMenu)
        Vue.component('l-headTitle', headTitle)
        Vue.component('l-banner', banner)
        Vue.component('l-icon', icon)
    }
}

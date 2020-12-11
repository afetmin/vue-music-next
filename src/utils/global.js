import {
  Swipe,
  SwipeItem,
  Lazyload,
  Loading
} from 'vant'
import { EMPTY_IMG } from "./dom"

export default {
  install(Vue) {
    const requireComponent = require.context(
      "@/base",
      true,
      /[a-z0-9]+\.(jsx?|vue)$/i,
    )
    // 批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })
    Vue.use(Swipe)
    Vue.use(SwipeItem)
    Vue.use(Loading)
    Vue.use(Lazyload, {
      loading: EMPTY_IMG,
      error: EMPTY_IMG,
    })
  },
}

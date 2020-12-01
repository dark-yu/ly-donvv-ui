/* 组件库对外导出的组件集合，对整个组件进行导出 */


// 导入组件（用于注册所有组件）
import DButton from './components/DButton';
import DTable from './components/DTable';
// 导入主样式文件（用于注册所有组件时使用）
import './style/index.scss';




// 定义组件列表
const componentsList = [
  DTable,
  DButton
];

const install = function(Vue) {
  // 判断是否安装过
  if(install.installed) return;

  // 注册所有组件
  componentsList.map((component) => {
    Vue.component(component.name, component);
  })

  // Vue.prototype.$toast = Toast;
  // Vue.prototype.$dialog = Dialog;
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// 导入所有组件，项目的main.js
/*
  // 引入所有组件
  import Donvvui from '../packages/index';
  Vue.use(Donvvui);
*/


export default {
  install,
  DTable,
  DButton
}

// 按需加载各个组件
// 项目的main.js
/*
  // 按需要引入
  import { Button } from '../packages/index';
  Vue.use(Button);
*/
// export {
//   Button
// }

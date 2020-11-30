import DTable from './DTable'
import './DTable.scss'

DTable.install = Vue => {
  Vue.component(DTable.name, DTable)
}

export default DTable

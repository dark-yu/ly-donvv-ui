<template>
  <div class="hello">
    <DTable :table-init-data="tableInitData" @operateFunction="operateFunction">
      <template v-for="(item, index) in tableInitData.header">
        <el-table-column
          v-if="item.prop == 'name'"
          :key="index"
          :type="item.type"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sortable"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :type="item.type"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sortable"
          align="center"
        />
      </template>
    </DTable>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      tableInitData: {
        filterList: [
          {
            type: 'input',
            key: 'name1',
            label: '商品名称'
          },
          {
            type: 'input',
            key: 'name2',
            label: 'SPU编码'
          },
          {
            type: 'input',
            key: 'name3',
            label: 'SKU编码'
          },
          {
            type: 'date',
            key: 'editdate',
            label: '编辑时间',
            col: 8
          },
          {
            type: 'selete',
            key: 'name4',
            label: '商品规格',
            filterable: true,
            col: 10,
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶',
              disabled: true
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }]
          },
          {
            type: 'selete',
            key: 'name5',
            label: '商品品牌',
            col: 8,
            filterable: true,
            remote: true,
            placeholder: '请输入关键词',
            options: [],
            callback: (item) => {
              // 此处发送请求
              return [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }]
            }
          }
        ],
        // 表格操作项
        operateList: [
          {
            type: 'button',
            key: 'salePrice',
            label: '销售价格'
          },
          {
            type: 'button',
            key: 'purchasePrice',
            label: '进价'
          },
          {
            type: 'button',
            key: 'stock',
            label: '库存'
          },
          {
            type: 'button',
            key: 'shelves',
            label: '上架'
          },
          {
            type: 'button',
            key: 'shelf',
            label: '下架'
          },
          {
            type: 'button',
            key: 'multipleDelete',
            label: '删除'
          }
        ],
        // 表头配置
        header: [
          {
            type: '',
            prop: 'date',
            label: '日期',
            width: '150',
            sortable: 'custom'
          },
          {
            type: '',
            prop: 'name',
            label: '姓名',
            width: '150'
          },
          {
            type: '',
            prop: 'province',
            label: '日期',
            width: '150'
          },
          {
            type: '',
            prop: 'city',
            label: '日期',
            width: '150'
          },
          {
            type: '',
            prop: 'address',
            label: '日期',
            width: '150'
          },
          {
            type: '',
            prop: 'zip',
            label: '邮编',
            width: '150'
          }
        ],
        // 表格数据
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      },
      form: {
        date: null
      },
      pagation: {
        pageIndex: 1,
        pageSize: 100
      }
    }
  },
  created() {
    console.log(this.$DUntill)
  },
  methods: {
    operateFunction(data) {
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

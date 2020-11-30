<template>
  <div v-if="tableInitData" class="table-wrap">
    <el-card v-loading="loading" class="box-card">
      <!-- 顶部过滤项 -->
      <div slot="header" class="top-filter-wrap">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col v-for="(item, index) in tableInitData.filterList" :key="index" :span="item.col || 5 ">
              <el-form-item :label="item.label">
                <el-input v-if="item.type == 'input'" v-model="form[item.key]" />
                <el-select
                  v-if="item.type == 'selete'"
                  v-model="form[item.key]"
                  :multiple="item.multiple"
                  :filterable="item.filterable"
                  :remote="item.remote"
                  reserve-keyword
                  :placeholder="item.placeholder || '请选择'"
                  :remote-method="() => {remoteMethod(item)}"
                >
                  <el-option
                    v-for="(option) in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                    :disabled="option.disabled"
                  />
                </el-select>
                <el-date-picker
                  v-if="item.type == 'date'"
                  v-model="form[item.key]"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div class="sub-reset-btn-warp">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </div>
      <!-- 表格头部操作项 -->
      <div class="filter-wrap">
        <div class="card-header-wrap">
          <div class="filter-button-wrap">
            <el-button v-for="(item, index) in tableInitData.operateList" :key="index" size="small" :type="item.key === 'multipleDelete' ? 'danger' : 'primary'" @click="filterClick(item)">{{ item.label }}</el-button>
          </div>
          <div class="operate-item-wrap">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateChange"
            />
            <el-tooltip class="item" effect="dark" content="刷新" placement="bottom-start">
              <el-button icon="el-icon-refresh" circle @click="refresh" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom-start">
              <el-button icon="el-icon-full-screen" circle @click="toggleFull" />
            </el-tooltip>
          </div>
        </div>

      </div>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableInitData.tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        @clearSelection="clearSelection"
        @toggleRowSelection="toggleRowSelection"
      >
        <el-table-column
          type="selection"
          width="50"
        />
        <slot />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="deletex(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格尾部分页器 -->
      <div class="footer">
        <el-pagination
          :current-page="form.pagation.pageIndex"
          :page-sizes="[20, 40, 100, 200]"
          :page-size="form.pagation.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </el-card>

  </div>

</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'DTable',
  props: {
    tableInitData: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        date: null,
        pagation: {
          pageIndex: 1,
          pageSize: 20
        }
      }
    }
  },
  created() {
    console.log(7878787)
  },
  methods: {
    reset() {
      this.form = {
        date: null,
        pagation: {
          pageIndex: 1,
          pageSize: 100
        }
      }
      this.$emit('operateFunction', { key: 'reset', form: this.form })
    },
    remoteMethod(item) {
      item.options = item.callback(item)
    },
    onSubmit() {
      this.$emit('operateFunction', { key: 'onSubmit', form: this.form })
    },
    filterClick(filter) {
      this.$emit('operateFunction', { key: 'operate', data: filter, form: this.form })
    },
    edit(row) {
      this.$emit('operateFunction', { key: 'edit', data: row, form: this.form })
    },
    deletex(row) {
      this.$emit('operateFunction', { key: 'delete', data: row, form: this.form })
    },
    handleSelectionChange(val) {
      this.form.selection = val
      this.$emit('operateFunction', { key: 'selection', form: this.form })
    },
    sortChange(val) {
      this.form.sort = val
      // this.$emit('operateFunction', { key: 'sortChange', form: this.form })
      this.$emit('sortChange', { key: 'sortChange', value: val, form: this.form })
    },
    clearSelection(val) {
      this.$emit('clearSelection', { key: 'sortChange', value: val, form: this.form })
    },
    toggleRowExpansion(val) {
      this.$emit('toggleRowExpansion', { key: 'sortChange', value: val, form: this.form })
    },
    doLayout(val) {
      this.$emit('doLayout', { key: 'sortChange', value: val, form: this.form })
    },
    clearFilter(val) {
      this.$emit('clearFilter', { key: 'sortChange', value: val, form: this.form })
    },
    clearSort(val) {
      this.$emit('clearSort', { key: 'sortChange', value: val, form: this.form })
    },
    setCurrentRow(val) {
      this.$emit('setCurrentRow', { key: 'sortChange', value: val, form: this.form })
    },
    toggleRowSelection(val) {
      this.$emit('toggleRowSelection', { key: 'sortChange', value: val, form: this.form })
    },
    toggleAllSelection(val) {
      this.$emit('toggleAllSelection', { key: 'sortChange', value: val, form: this.form })
    },
    dateChange() {
      this.$emit('operateFunction', { key: 'dataChange', form: this.form })
    },
    handleCurrentChange(val) {
      this.form.pagation.pageIndex = val
      this.$emit('operateFunction', { key: 'pagationChange', form: this.form })
    },
    handleSizeChange(val) {
      this.form.pagation.pageSize = val
      this.$emit('operateFunction', { key: 'pagationChange', form: this.form })
    },
    refresh() {
      this.$emit('operateFunction', { key: 'refresh', form: this.form })
    },
    toggleFull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle(document.querySelector('.el-table'))
    }
  }
}
</script>
<style lang="scss">

</style>

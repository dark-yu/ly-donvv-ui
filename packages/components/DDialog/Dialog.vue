<template>
  <el-dialog :id="id" :width="width" :visible.sync="visible" :append-to-body="inner" :modal-append-to-body="false" @open="handleOpen" @close="handleClose">
    <template slot="title">
        {{ title }}
      </template>
      <el-form ref="form" status-icon :model="form" label-width="80px">
        <div v-for="(item, index) in list" :key="index">
          <!-- 文本框 -->
          <el-form-item v-if="item.type === 'input'" :label="item.label">
            <el-input v-model="form[item.model]" />
          </el-form-item>
          <!-- 下拉选择框 普通 -->
          <el-form-item v-if="item.type === 'select'" :label="item.label">
            <el-select v-model="form[item.model]" placeholder="请下单">
              <el-option
                v-for="items in item.options"
                :key="items.value"
                :label="items.label"
                :value="items.value"
              />
            </el-select>
          </el-form-item>
          <!-- 地址级联选择器 hover效果-->
          <el-form-item v-if="item.type === 'address'" :label="item.label">
            <el-cascader
              v-model="form[item.model]"
              :options="item.options"
              :props="{ expandTrigger: 'hover',value: 'name', label: 'name' }"
              @change="Change"
            />
          </el-form-item>
          <!-- switch开关 -->
          <el-form-item v-if="item.type === 'switch'" :label="item.label">
            <el-switch v-model="form[item.model]" /><span v-if="item.tip">{{ item.tip }}</span>
          </el-form-item>
          <!-- 单选按钮-button -->
          <el-form-item v-if="item.type === 'radio-button'" :label="item.label">
            <el-radio-group v-for="(items, indexs) in item.options" :key="indexs" v-model="form[item.model]" size="small">
              <el-radio-button :label="items.label">{{ items.value }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- 日期范围选择器 -->
          <el-form-item v-if="item.type === 'data'" :label="item.label">
            <el-date-picker
              v-model="form[item.model]"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <!-- 多选框 -->
          <el-form-item v-if="item.type === 'check'" :label="item.label">
            <el-checkbox-group v-model="form[item.model]">
              <el-checkbox v-for="(items, indexs) in item.options" :key="indexs" :label="items">{{ items }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 计数器 -->
          <el-form-item v-if="item.type === 'number'" :label="item.label">
            <el-input-number v-model="form[item.model]" controls-position="right" :min="1" :max="10" label="描述文字" @change="handleChange" />
            <span v-if="item.tip">{{ item.tip }}</span>
          </el-form-item>
          <!-- 富文本框 -->
          <el-form-item v-if="item.type === 'textarea'" :label="item.label">
            <el-input
              v-model="form[item.model]"
              type="textarea"
              :maxlength="item.maxlength"
              placeholder="请输入评价"
              show-word-limit
            />
          </el-form-item>
          <!-- 传入自定义组件 -->
          <slot />
        </div>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="reset">重置</el-button>
      </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'DDialog',
  props: {
    // 宽度
    width: {
      type: String,
      default: '50%'
    },
    // 显示加载
    loading: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: () => {
        return ''
      }
    },
    // 插入body(默认false)
    inner: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    // form表单数据
    list: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      id: '',
      loader: null,
      visible: false,
      form: {}
    }
  },
  watch: {
    loading: {
      handler(val, oldval) {
        const _t = this
        if (val) {
          _t.loader = _t.$loading({
            target: document.querySelector('#' + _t.id + ' .el-dialog'),
            lock: true
          })
        } else {
          if (_t.loader) {
            _t.loader.close()
          }
        }
      }
      // immediate: true
    }
  },
  created() {
    this.list.map((item) => {
      if (item.value) {
        this.$set(this.form, item.model, item.value)
      } else {
        this.$set(this.form, item.model, '')
      }
      return this.form
    })
  },
  methods: {
    // 关闭事件
    handleClose() {
      this.$emit('close')
    },
    // 打开事件
    handleOpen() {
      this.$emit('open')
    },
    // 打开方法
    open() {
      this.visible = true
    },
    // 关闭方法
    close() {
      this.visible = false
    },
    // 保存form
    submit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          this.$api.post(this.url, this.form).then((res) => {
            if (res.isSucceed) {
              this.$message.success(res.msg)
              this.$emit('submit', res)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 重置
    reset() {
      this.$refs['form'].resetFields()
    },
    handleChange(value) {
      return
    },
    Change(value) {
      return
    }
  }
}
</script>

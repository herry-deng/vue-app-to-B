<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off" required>
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="
            'https://mall.duyiedu.com/upload/images?appkey=' +
            $store.state.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-upload>
        <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
          <a-button type="default" @click="prev">上一步</a-button>
          <a-button type="primary" @click="next">提交</a-button>
        </a-form-model-item>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
} // 把文件转换成base64的格式
export default {
  data() {
    return {
      //   form: {
      //     price: 0,
      //     price_off: 0,
      //     units: "",
      //     inventory: 0,
      //     images: [],
      //   }, // 初始化定义
      rules: {},
      fileList: [],  // 最后需要把图片渲染到fileList里
      loading: false,
      previewVisible: false,
      previewImage: '',
    };
  },
  props: ['form'],
  created(){
      if(this.form.images.length > 0) {
          this.fileList = this.form.images.map((item, index) => {
              return {
                  uid: index,
                  name: `image-${index}.png`,
                  status: 'done',
                  url: item,
              }
          })
      }
  },
  methods: {
    handleChange({ file, fileList }) {
    //   console.log(file);
    this.fileList = fileList;
      if(file.status === 'done') {
          this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
          const { url } = file.response.data.url;
          this.form.images = this.form.images.filter((item) => item !== url);
      }
      // this.fileList = fileList;    这样放会导致图片无法删除
    },
    next() {
    //   this.$emit("next", this.form);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('next',this.form);  // 点击下一步需要将数据传递到父组件中,以及把form表单传递过去
        //   console.log(this.form);
          return true;
        } else {
          console.log('error submit!!');
          return false;
        }
      }); //表单校验
    },
    prev() {
      this.$emit('prev');
    },
    async handlePreview(file) {
      let obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
      // console.log('handleCancel')
    },
  },
};
</script>

<style>
</style>
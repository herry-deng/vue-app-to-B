<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next" :form="form" />
      <!-- 什么时候会用到基础信息的编写，就是在当前页为第0页的时候 -->
      <sale-detail
        v-else-if="current === 1"
        @next="next"
        @prev="prev"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import BasicDetail from "@/components/basicDetail.vue";
import SaleDetail from "@/components/saleDetail.vue";
import api from '@/api/product';
export default {
  data() {
    return {
      current: 0,
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: "",
        inventory: 0,
        images: [],
      }, // 把数据存在父组件中
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
    };
  },
  components: {
    BasicDetail,
    SaleDetail,
  },
  created(){
    const { id } = this.$route.params;
    console.log(id);
    if(id){
      // 读取商品详情
      api.detail(id).then((res) => {
        // console.log(res);
        this.form = res;
      })
    }
  },  // 在组件创建的时候判断是编辑还是新增，如果是编辑的话能读取的id值
  methods: {
    next(form) {
      // console.log(form);
      this.form = {
        ...this.form,
        form,
      }; // 把数据存在父组件中
      if(this.current === 1) {
        // 提交数据
        console.log(this.form);
      if(this.$route.params.id) {
          api.edit(this.form).then((res)=>{
          console.log(res);
          this.$message.success('编辑成功');
          this.$router.push({
            name: 'ProductList'
          })
        })
      } else {
          api.add(this.form).then((res)=>{
          console.log(res);
          this.$message.success('新增成功');
          this.$router.push({
            name: 'ProductList'
          })
        })
      }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang="less" scoped>
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>
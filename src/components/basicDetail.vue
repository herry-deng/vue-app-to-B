<template>
  <div class="basic-detail">
       <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="{span: 5}" :wrapper-col="{span: 13}"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input
        v-model="form.title"
      />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
        <a-input
        v-model="form.desc"
      />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
       <a-select v-model="form.category" placeholder="请选择商品类别" @change="changeCategory">
        <a-select-option 
        v-for="c in categoryList" :key="c.id" :value="c.id" >
          {{c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_item" placeholder="请选择商品子类别">
        <a-select-option v-for="c in categoryItems" :key="c" :value="c">
          {{c}}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags" required>
       <a-select
      mode="tags"
      placeholder="Please select"
      :default-value="['包邮，最晚次日到']"
      v-model="form.tags"
    >
      <a-select-option value="包邮，最晚次日到">
        包邮，最晚次日到
      </a-select-option>
    </a-select>
    </a-form-model-item>
    <a-form-model-item label="" class="next-btn" :wrapperCol="{span: 24}">
        <!-- 去掉冒号 :wrapperCol="{span: 24}" -->
        <a-button type="primary" @click="next">下一步</a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';   //  拿到API需要创建
export default {
data(){
    return {
        // form: {
        //     title:'',
        //     desc:'',
        //     category:'',
        //     c_items: [],
        //     tags:[]
        // },
        rules: {},
        categoryList:[],
        categoryItems:[]
    }
},
props: ['form'],
created(){
    categoryApi.list().then((res) => {
        // console.log(res);
        this.categoryList = res.data;
    })
},  //  拿到API需要创建
methods: {
    changeCategory(category) {
        // console.log(category, '===');  // 拿到的是类目的id值 ，拿到之后要遍历类目的数据，以便拿到子类目
        for(let i = 0; i < this.categoryList.length; i += 1) {
            if(this.categoryList[i].id === category){
                this.categoryItems = this.categoryList[i].c_items;
            }
        }
        // this.categoryItems = category.c_items;
    },
    next(){
        // console.log(this.form);
        this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('next',this.form);  // 点击下一步需要将数据传递到父组件中,以及把form表单传递过去
          console.log(this.form);
          return true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }  // 点击下一步需要将数据传递到父组件中
}
}
</script>

<style lang="less">
 .basic-detail{
     .next-btn{
         text-align: center;
     }
 }
</style>
<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{name: 'ProductAdd'}">添加商品</router-link>
      </a-button>
    <!-- 表格 -->
    <products-Table :data="tableData" :page="page" 
    @change="changePage" :categoryList="categoryList"
    @edit="editProduct"
    @remove="removeProduct"
    /> 
    <!-- 传递data  翻页的信息传递到组件中。 渲染的时候把数据传递到表格身上  在表格数据中做一个映射-->
  </div>
</template>

<script>
import api from "@/api/product";
import searchBox from "@/components/search.vue";
import productsTable from "@/components/productsTable.vue";
import categoryApi from "@/api/category";
export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj:{},  // 类目映射
    };
  }, // 父节点有data数据
  components: {
    searchBox,
    productsTable,
  },
  async created() {
    
    await categoryApi.list().then((res) => {
      // console.log('---',res);
      this.categoryList = res.data;
      res.data.forEach((item) =>{
       this.categoryObj[item.id]= item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      // console.log(form);
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      // 获取表格数据
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm, // 拿到searchForm的数据
        })
        .then((res) => {
          console.log(res);
          this.page.total = res.total;
          this.tableData = res.data.map((item) =>{
            // console.log(this.categoryObj[item.category])
            return {
              ...item,
              categoryName: this.categoryObj[item.category].name,
            }
          }); // 把data渲染到表格中。这样渲染后会发现报错每一条数据需要key值
          // console.log(this.categoryObj)
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record){
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        } //  编辑的时候跳转路由  可以拿到父组件里面删除和编辑，因为每个组件是独立的，所有的操作和交互都拿到父组件去，子组件只用来做渲染
      })
    },
    removeProduct(record){
      this.$confirm({
        title: "确认删除",
        content: () => <div style="color:red;">{`确认删除产品:${record.title}`}</div>,
        onOk:() => {  // 箭头函数也可以改变this指向
         api.remove({
           id:record.id,
         }).then(()=>{
           this.getTableData();
         });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    }
  },
};
</script>

<style lang="less">
.product-list {
  position: relative;
  .product-add-btn{
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>
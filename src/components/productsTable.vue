<template>
  <a-table :columns="columns" :data-source="tableData"
  :pagination="page"
  @change="changePage"
  >   
    <!-- 原为data，因为渲染后需要key值，所以这里的data用处理后的data----tableData 处理后的data是通过计算得来的-->
    <div slot="operation" slot-scope="text, record">
        <a-button @click="editProduct(record)">编辑</a-button>
        <a-button @click="removeProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
// import api from '@/api/product';
const columns = [
  
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
    // customRender: function(text, record){
    //   let name = '';
    //   // 拿到类目对应的名字
    //   this.categoryList.forEach((c) => {
    //     if (c.id === record.category) {
    //       name = c.name;
    //     }
    //   });
    //   return name;
    // } // 遍历categoryList,然后渲染到类目的选项中   此方法行不通
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '限制购数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender: function (text, record) {
      return record.status === 1 ? '上架': '下架';
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width:200,
    scopedSlots: {customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
      // pagination: {
      //   current: 1,
      //   pageSize: 10,
      //   showSizeChanger: true,
      //   total: 1,
      // }
    };
  },
  // data 是从父级传过来的
  props: ['data','page'],   // 从组件中接收page   遍历categoryList,然后渲染到类目的选项中
  computed: {
    tableData(){
      return this.data.map((item) => {
        return {
          ...item,
          key: item.id
        }
      })
    }  // 进行遍历添加key值
  },
  methods:{
    changePage(page){
      // console.log(page);
      this.$emit('change',page); // 将数据传递到父元素身上
    },
    editProduct(record){
      this.$emit('edit',record);
    },
    removeProduct(record){
      this.$emit('remove', record);
    },
  },
};
</script>

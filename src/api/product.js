import axios from '@/axios';

export default  {
    list(params) {
        return axios.get('/products/all', { params })  // 需要加params对象
    },
    remove(params){
        return axios.delete('/products/'+params.id);
    },
    add(params){
        return axios.post('/products/add', params);
    },
    detail(id){
        return axios.get('/products/' + id);
        // return axios.get(`/products/${id}`);
    }, // 编辑产品是数据回填的接口
    edit(params){
        return axios.put('/products/edit', params);
    },
    upload(params) {
        return axios.post('/upload/images', params);
      }
}
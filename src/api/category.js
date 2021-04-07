import axios from '@/axios';

export default  {
    list(params) {
        return axios.get('/category/all', { params })  // 需要加params对象
    }
}
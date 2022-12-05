import request from '@/api/request'
// 获取table数据
export function getList(size, current, params) {
    return request({
        url: '/element/tableInfoPage',
        method: 'get',
        params: {
            current, size, ...params
        }
    })
}

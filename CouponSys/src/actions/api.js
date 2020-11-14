import axios from "axios";

const baseUrl = "http://localhost:4000/"

export default{
    postCoupon(url=baseUrl+'postCoupons/')
    {
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url+id),
            create : newRecord => axios.post(url,newRecord),
            update : (id,updatedRecord) => axios.put(url+id,updatedRecord),
            delete : id => axios.delete(url+id)
        }
    }
}
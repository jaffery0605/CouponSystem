import api from "./api.js";


export const ACTION_TYPES ={
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : "DELETE",
    FETCH_ALL : "FETCH_ALL",
}

export const fetchAll = ()=>dispatch=>{
    api.postCoupon().fetchAll()
    .then(res => {
        console.log(res)
        dispatch({
            type:ACTION_TYPES.FETCH_ALL,
            payload: res.data,
        })
    })
    .catch(err => console.log(err))
}

export const create=(data,onSuccess)=>dispatch=>{
        api.postCoupon().create(data)
        .then(res=>{
            if(res.data.code !== 110000 && res.data.name !== "MongoError")
            {
            dispatch({
                type:ACTION_TYPES.CREATE,
                payload: res.data,
            })
            onSuccess()
        }
        else{
            window.alert("This Code already Exist")
        }
            
        })
        .catch(err => console.log(err))
}

export const update=(id,data,onSuccess)=>dispatch=>{
    api.postCoupon().update(id,data)
    .then(res=>{
        if(res.data.code !== 110000 && res.data.name !== "MongoError")
            {
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload: res.data,
        })
        onSuccess()
        }
        else
        {
            window.alert("This Code already Exist") 
        }
    })
    .catch(err => console.log(err))
}

export const Delete=(id,onSuccess)=>dispatch=>{
    api.postCoupon().delete(id)
    .then(res=>{
        dispatch({
            type:ACTION_TYPES.DELETE,
            payload: id,
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}
import React,{useEffect,useState, Fragment} from 'react';
import { connect } from "react-redux";
import * as actions from '../actions/postCoupon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PostCouponForm from "./PostCouponForm";
import UseCouponForm from "./useCoupon"

const styles = {
    paper:{
        margin: 16, //3*8=24px
        padding : 8,
    },
    horizon:{
        display:"flex",
        flexDirection:"row",
    }
}



const PostCoupon=({classes,...props}) => {
    const [buy,setBuy] = useState(false)

    const [currentId,setCurrentId] = useState(0)

   // const [x,setX] = useState(0);
   // setX(5)

   const onDelete= id =>{
    const onSuccess= () => { window.alert('Deleted successfully ') ; }
       if(window.confirm('Are you really want to delete this coupon?'))
        props.deletePostCoupon(id,onSuccess)

   }

   const validDate=(todate,fromdate)=>{
    var currDate = new Date();
    var upc = fromdate.split("-")
    var exp = todate.split("-")
    var upcdate = parseInt(upc[2])
    var upcmon = parseInt(upc[1])
    var upcyear = parseInt(upc[0])
    var startDate = new Date();
    startDate.setFullYear(upcyear, upcmon-1, upcdate);
    var expdate = parseInt(exp[2])
    var expmon = parseInt(exp[1])
    var expyear = parseInt(exp[0])
    var endDate = new Date();
    endDate.setFullYear(expyear,expmon-1,expdate);
    console.log(currDate,startDate,endDate,expmon)
    if(currDate < startDate){
        return("upcoming")
    }
    else if(currDate > endDate )
    {
        return("expired")
    }
    else
        return("valid") 
   }

   
    useEffect(()=>{
        props.fetchAllPostCoupon()
    },[])


    return (
        <div className="container-fluid row">
            <div className="col-md-6">
            <div className="shadow-sm p-3 mb-5 bg-white rounded">
            {buy ?
            (<UseCouponForm {...{currentId,setCurrentId}}/>):(<PostCouponForm  {...{currentId,setCurrentId}}/>)
            }
            </div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
            <button
              className="btn btn-outline-primary"
              style={styles.paper,{width:"50%"}}
              onClick={()=>{buy?setBuy(false):setBuy(true)}}
              >{buy?"Create New Coupons":"Spend Coupons"}</button>
              </div>
            </div>
            <div className="col-md-6">
            <div  className="shadow-sm p-3 mb-5 bg-white rounded">
                <ul className="list-group list-group-flush">
                    {
                        props.postCouponList.map((record,index)=>{
                            return(
                                <Fragment key={index}>
                                <li className="list-group-item " style={{ display:"flex",flexDirection:"row",}} >
                                    <div className="col-md-7">
                                        <p>
                                            name :<b> {record.name}</b>
                                        </p>
                                        <h6>
                                           code: <b>{record.code} </b>
                                        </h6>
                                        <p>
                                            from: <b>{record.fromdate}</b> to: <b>{record.todate}</b>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p>
                                            {record.cat==="PER"?"Percentage":"Flat Discount"}
                                        </p>
                                        <div style={{ display:"flex",flexDirection:"row",}}>
                                        <h5>
                                           <b>{record.cost}{record.cat==="PER"?"%":"rs"}</b>
                                        </h5>
                                        <p >
                                           off
                                        </p>
                                        </div>
                                        <p>
                                           <b> {record.numof}</b> coupons are remaining
                                        </p>
                                    </div>
                                    <div className="col-md-2" style={styles.horizon}>
                                    {buy?(record.numof>0)?(<button className="btn" edge="end" aria-label="edit" onClick={()=>{
                                        validDate(record.todate,record.fromdate)==="valid"?setCurrentId(record._id)
                                        :(validDate(record.todate,record.fromdate)==="upcoming"?(window.alert("your coupon is coming soon"))
                                        :(window.alert("your coupon is expired")))         
                                    }} >
                                        <p>
                                            Apply
                                        </p>
                                    </button>):(<p>
                                                        Completed
                                                    </p>):(
                                    <div>
                                    <button edge="end" className="btn" aria-label="edit" onClick={()=>setCurrentId(record._id)} >
                                        <EditIcon />
                                    </button>
                                    <button edge="end" className="btn" aria-label="delete" onClick={()=>onDelete(record._id)}>
                                        <DeleteIcon />
                                    </button> 
                                    </div>
                                    ) }   
                                    </div>          
                                </li>
                                <hr/>
                            </Fragment>
                            )
                        })
                    }
                </ul>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>(
    {
        postCouponList: state.postCoupon.list
    }
)

const mapActionToProps = {
    fetchAllPostCoupon : actions.fetchAll,
    deletePostCoupon : actions.Delete,
}

export default connect(mapStateToProps,mapActionToProps)(PostCoupon);

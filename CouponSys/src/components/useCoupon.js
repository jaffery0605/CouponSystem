import React,{useEffect} from 'react';

import useForm from './useForm';
import { connect } from "react-redux";
import * as actions from '../actions/postCoupon';


const styles ={
    paper:{
        margin: 8, //3*8=24px
    },
}

const initialFieldValues={
    name:'',
    code:'',
    cat:'PER',
    cost:0,
    numof:1,
    fromdate:"",
    todate:"",
}


 

function UseCouponForm({classes,...props}) {

  var rate= 22000;

  useEffect(()=>{
    if( props.currentId !==0 ){
    setValues({
      ...props.postCouponList.find(x => x._id === props.currentId)
    })
  }
  },[props.currentId])

  var { values,
      setValues,
    resetForm} = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit= e =>{
        e.preventDefault()
        const onSuccess= () => { window.alert('You successfully bought the ticket') ;resetForm() }
          props.updatePostCoupon(props.currentId, values ,onSuccess)   
  }

  const handleApply =()=>{
    setValues({
      ...values,
      numof: (values.numof-1)
    })
  }
  const alertVal=()=>{
    if(values.cat==="FD")
    {
      if(rate>values.cost)
      {
        return true;
      }
    }
    else
    {
    window.alert("This Coupon has rate less than discount");
    return false;
    }
    
  }

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div>
          <h4>
            Your ticket cost is: {rate} 
          </h4>
        </div>
          <div>
          {values.name?(
            <div style={{display:"flex",flexDirection:"column"}}>
              {values.cat==="PER"?(
                <div>
                <p>Code: <b>{values.code}</b></p>
                <p>Discount :<b>{values.cost}% off</b></p>
                <p>Discounted Price:<b>{rate-(rate*(values.cost/100))}</b></p>
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm} >Remove Coupon</button>
                </div>
              ):((rate>values.cost)?(
                 <div>
                  <p>Code:- <b>{values.code}</b></p>
                  <p>Discount :-<b>{values.cost}rs off</b></p>  
                  <p>Discounted Price:-<b>{rate-(values.cost)}</b></p>
                  <button type="button" className="btn btn-outline-secondary" onClick={resetForm} >Remove Coupon</button>
                </div> ):(alert('This Coupon has discount price more than actual price'),resetForm())
                )}
          </div>):(<p>Total : <b>{rate}</b></p>)}
          </div>

        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
          <button
          style={{width:"50%"}}
          type="submit"
          className="btn btn-info"
          onClick={handleApply}
          >Buy Ticket</button>
          </div>
        </form>
    )
}

const mapStateToProps = state =>(
  {
      postCouponList: state.postCoupon.list
  }
)

const mapActionToProps = {
  updatePostCoupon : actions.update,
  fetchAllPostCoupon : actions.fetchAll,

}

export default connect(mapStateToProps,mapActionToProps)(UseCouponForm);
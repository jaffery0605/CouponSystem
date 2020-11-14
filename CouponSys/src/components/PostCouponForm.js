import React,{useEffect} from 'react';
import useForm from './useForm';
import { connect } from "react-redux";
import * as actions from '../actions/postCoupon';


const styles = {
    paper: {
        margin: 8, //3*8=24px
    },
    division: {
      display:"flex",
      flex:1,
      flexDirection:"row",
      alignItems:"center" //3*8=24px
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

const category = [
    {
      value: 'PER',
      label: 'Percentage',
    },
    {
      value: 'FD',
      label: 'Flat Discount',
    },
  ];

 

function PostCouponForm({classes,...props}) {

  useEffect(()=>{
    if( props.currentId !== 0 ){
    setValues({
      ...props.postCouponList.find(x => x._id === props.currentId)
    })
    setErrors({})
  }
  },[props.currentId])

  const validDate=(todate,fromdate)=>{
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
    if(endDate > startDate){
        return true
    }
    else
        return false
   }

const validate = () =>{
  const codeVal = ((values.code).length>2) 
  const catVal = (values.cat === "PER")
  const costVal = (values.cost < 100 && values.cost > 0)
  const numofVal = (values.numof>0)
  const todateVal = validDate(values.todate,values.fromdate)

  let temp = {...errors}
  temp.name = values.name?"":"This field is Required"
  temp.code = (codeVal)?"":"Code should be more than 3 characters"
  temp.cost = (catVal)?((costVal)?"":"percentage should be less than 100 and more than 0"):(values.cost?"":"This field should be more than 0")
  temp.numof = numofVal?"":"This field is Required and should greater than 0"
  temp.fromdate = values.fromdate?"":"This field Required"
  temp.todate = values.todate?((todateVal)?"":"end date should be greater than start date"):"This field Required"
  setErrors({...temp})

  return Object.values(temp).every((x) => x ==="")
}

  var { values,
      setValues,
      errors,
      setErrors,
      handleChange,
    resetForm} = useForm(initialFieldValues,props.setCurrentId)

  const handleSubmit= e =>{
        e.preventDefault()
        const onSuccess= () => { window.alert('submitted successfully ') ; resetForm() }
        if(validate()){
          if(props.currentId === 0)
          props.createPostCoupon(values,onSuccess)
        else
          props.updatePostCoupon(props.currentId, values ,onSuccess)   
  }
  }
  

    return (
      <div>
        <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name">Name</label>
                <input
                  required
                  name = "name"
                  value={values.name}
                  className="form-control"
                onChange={handleChange}
                {...(errors.name && {className:"form-control is-invalid"})}
                />
                <small className="invalid-feedback form-text " hidden
                {...(errors.name && {hidden:false})}
                >
                  {errors.name}
                </small>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="code">Code</label>
                <input
                  required
                  name = "code"
                  value={values.code}
                  className="form-control"
                  maxLength = "8"
                  minLength = "3"
                  onKeyUp ={(e)=>{
                    e.target.value = e.target.value.toUpperCase();
                  }}
                  onChange={handleChange}
                {...(errors.code && {className:"form-control is-invalid"})}
                />
                 <small className="invalid-feedback form-text " hidden
                {...(errors.name && {hidden:false})}
                >
                  {errors.code}
                </small>
            </div>
          </div>
          <div className="form-row">
            <div className=" form-row col-md-8">
              <div className="col-md-4">
                <label htmlFor="cat">Discount</label>
                <select
                  className="custom-select"
                  name="cat"
                  value={values.cat}
                  onChange={handleChange}>
                  {category.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            {values.cat==='PER'?(
              <div className="col-md-8">
                <label htmlFor="cost">Percentage</label>
                  <input
                    required
                    id="filled-number"
                    name="cost"
                    type="number"
                    className="form-control"
                    placeholder="Percentage"
                    value={values.cost}
                    onChange={handleChange}
                    {...(errors.cost && {className:"form-control is-invalid"})}
                  />
                  <small className="invalid-feedback form-text " hidden
                {...(errors.name && {hidden:false})}
                >
                  {errors.cost}
                </small>
              </div>):(
              <div className="col-md-8">
                <label htmlFor="cost">Flat-Discount</label>
                  <input
                    required
                    label="Flat discount Cost" 
                    type="number"
                    name="cost"
                    className="form-control"
                    placeholder="Flat Discount"
                    value={values.cost}
                    onChange={handleChange}  
                    {...(errors.cost && {className:"form-control is-invalid"})}
                  />
                  <small className="invalid-feedback form-text " hidden
                {...(errors.name && {hidden:false})}
                >
                  {errors.cost}
                </small>
              </div>)}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="numof">Number of Coupons</label>
                <input
                  required
                  label="Number of Coupons"
                  className="form-control"
                  value={values.numof} 
                  type="number"
                  name="numof"
                  onChange={handleChange}
                {...(errors.numof && {className:"form-control is-invalid"})}
                />
                <small className="invalid-feedback form-text " hidden
                {...(errors.name && {hidden:false})}
                >
                  {errors.numof}
                </small>
            </div>
          </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
          <label htmlFor="fromdate">Start from</label>
            <input
              name="fromdate"
              type="date"
              value={values.fromdate}
              className="form-control"
              onChange={handleChange}
              {...(errors.fromdate && {className:"form-control is-invalid"})}
            />
            <small className="invalid-feedback form-text " hidden
                {...(errors.name && {hidden:false})}
                >
                  {errors.fromdate}
                </small>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="todate">Ends on</label>
            <input 
              name="todate"
              type="date"
              value={values.todate}
              onChange={handleChange}
              min={values.fromdate}
              className="form-control"
              {...(errors.todate && {className:"form-control is-invalid"})}
            />
            <small className="invalid-feedback form-text " hidden
                {...(errors.name && {hidden:false})}
                >
                  {errors.todate}
                </small>
          </div>
        </div>
        <div >
        <button
          className="btn btn-primary col-md-5"
          type="submit"
          style={styles.paper}
          >Submit</button>
          <button
          type="button"
          className="btn btn-outline-secondary col-md-5"
          style={styles.paper}
          onClick={resetForm}
          >Cancel</button>
          
          </div>
        </form>
        
        </div>
    )
}

const mapStateToProps = state =>(
  {
      postCouponList: state.postCoupon.list
  }
)

const mapActionToProps = {
  createPostCoupon : actions.create,
  updatePostCoupon : actions.update,

}

export default connect(mapStateToProps,mapActionToProps)(PostCouponForm);
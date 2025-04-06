 module.exports = (fn)=>{     //* here i export my wrap async function 


return (req,res,next)=>{
  fn(req,res,next) .catch(next)
}

}




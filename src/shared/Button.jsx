
function Button({children,type,version,disabled}) {
  return (
    <button type={type} disabled={disabled} className={`btn btn-${version}`}>{children}</button>
  )
}

Button.defaultProps ={
    type:'submit',
    version:'primary',
    disabled:true
}

export default Button
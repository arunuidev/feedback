
function Card({children, key, reverse}) {
  return (
    <div className={`card ${reverse && 'reverse'}`} id={key}>{children}</div>
    )
}

export default Card
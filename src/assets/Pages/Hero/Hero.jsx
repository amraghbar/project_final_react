import React from 'react'
import style from './Hero.module.css'
function Hero() {
  return (
    <section class={style.se1}> 
<div className={style.counter}>
  <div className={style.word}>
    
    <h2>Let us find 
      <span className={style.cour}>what's right </span>
      For you
    </h2>
    <p> shop
A simple e-commerce website
    </p>
    
  </div>
  <div className={style.cuimg}>
    <img src="red.jpg"/>
  </div>
</div>
</section>
  )
}

export default Hero
import React from 'react'

function Notfound() {
  return (
    <div>
       Page not found
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src="er.jpeg" alt="صورة" style={{ width: '800px', height: 'auto' }} />
      
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    <a href="/" style={{ backgroundColor: 'red', color: 'white', textDecoration: 'none', margin: '10px', padding: '5px 10px' }}>
        Page Home
      </a>    </div>

    </div>
  )
}

export default Notfound
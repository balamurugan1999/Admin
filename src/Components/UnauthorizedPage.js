import React from 'react'
import '../Style/Forbidden.css'

function Unauthorized() {
  return (

<div style={{display:'block',marginLeft:'auto',marginRight:'auto',textAlign:'center',paddingTop:'5%'}}>
  <h1 ><code>Access Denied</code></h1>
  <hr style={{margin:'auto',width:'50%'}}></hr>
  <h3 >You dont have permission to view this site.</h3>
  <h3 >🚫🚫🚫🚫</h3>
  <h6><strong>Error Code</strong>: 403 forbidden</h6>
</div>

  )
}

export default Unauthorized


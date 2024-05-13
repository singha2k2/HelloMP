import React from 'react'

function Loader() {

const loadingModal={ 
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.27)",
    zIndex: "1000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",   
}

  return (
    <div style={loadingModal} >
        <div class="d-flex justify-content-center text-primary">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
    </div>
  )
}

export default Loader
import React from 'react'
import './footer.css'

function Footer() {
    return (
        <footer>
           <div className="container footer-container">
            <span>
                Made with ❤️ by <a href="https://www.theavtarsingh.github.io" id='footer-link'> Team | </a>
            
               &copy; All rights reserved {new Date().getFullYear()} 
            </span>
           </div>
        </footer>
    )
}

export default Footer
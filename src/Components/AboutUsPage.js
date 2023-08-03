import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import swal from 'sweetalert'
import '../Style/About.css'


function AboutUs() {

  const navigate = useNavigate()

  useEffect(()=>{
    if (localStorage.getItem('Auth')==='true') {
      setTimeout(() => {
          //alert('Session expired')
          swal({
            title: "Session Expired",
            icon: "error",
            button: "OK"
        })
          localStorage.setItem('Auth',false)
          navigate("/")
      }, 1200000);
    }
    },)

  return (
    <div>
      <div>
        <NavigationBar></NavigationBar>
        <div>
          <header>
            <br/>
            <h1>Roadmap To Product V1.0</h1>
          </header>
          <ul className="timeline">
            <li>
              <div className="direction-r">
                <div className="flag-wrapper">
                  <span className="hexa"></span>
                  <span className="flag">Product Foundation</span>
                  <span className="time-wrapper"><span className="time">4 Jan 2023</span></span>
                </div>
                <div className="desc">Started with analyzing the features of product and confirming the Techical stacks to be used.</div>
              </div>
            </li>

            <li>
              <div className="direction-l">
                <div className="flag-wrapper">
                  <span className="hexa"></span>
                  <span className="flag">Product Sample Presentation</span>
                  <span className="time-wrapper"><span className="time">17 April 2023</span></span>
                </div>
                <div className="desc">Finalizing everything about the Product. Making a presentation and explaing the client about the product.</div>
              </div>
            </li>

            <li>
              <div className="direction-r">
                <div className="flag-wrapper">
                  <span className="hexa"></span>
                  <span className="flag">Product Prototype Design</span>
                  <span className="time-wrapper"><span className="time">20 July 2023</span></span>
                </div>
                <div className="desc"> Designing the prototype and finding the problems faced. Discussing with team about any futher improvement in the product design and assigning task to team members.</div>
              </div>
            </li>

            <li>
              <div className="direction-l">
                <div className="flag-wrapper">
                  <span className="hexa"></span>
                  <span className="flag">Monitoring</span>
                  <span className="time-wrapper"><span className="time">25 August 2023</span></span>
                </div>
                <div className="desc">Having daily scrum calls to discuss about the work status and discussing about the problems faced and finding a solution for it.</div>
              </div>
            </li>

            <li>
              <div className="direction-r">
                <div className="flag-wrapper">
                  <span className="hexa"></span>
                  <span className="flag">Final Product</span>
                  <span className="time-wrapper"><span className="time">28 April 2024</span></span>
                </div>
                <div className="desc">Testing the final product before production. Presenting to the client and check for feedback. Sample is released for some people and getting there comments for futher improvement</div>
              </div>
            </li>

          </ul>

          <h3 style={{ textAlign: 'center' }}>Awaiting for Product V2.0 .....</h3>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Img from '../images/i3.svg';
import i1 from '../images/clg.jpg';
import './home.css';
class Home extends Component
{
    render()
    {
        return (
            <div>
            <div className="row" style={{margin:0,padding:0}}>
            <div className="col-md-6 col-12" style={{margin:0,padding:0}}>
            <br/>
            <h4 id="mtitle">Let's Learn</h4><br/><br/>
            <h2 id="head1">A PLATFORM</h2>
            <h2 id="head1">FOR ONLINE EXAMS!!!</h2>
            <div className="row">
            <div className="col-6">
            <br/>
            <h5 id="head3">For Students</h5>
            <p id="p1">User Friendly And Easy To Use Platform For Students To give their Examinations And Make Them Industry Ready Proffessionals.</p>
            <Link to="/Registers"><button id="button1" style={{marginLeft:"40px"}}>Sign Up As Student</button></Link>
            </div>
            <div className="col-6">
            <br/>
            <h5 id="head2">For Faculty</h5>
            <p>We aid colleges to transform their student’s by developing their skills, to enable them to emerge as “Industry Ready” professionals.</p>
            <Link to="/Registert"><button id="button2">Sign Up As Faculty</button></Link>
            </div>
            </div>
            </div>
            <div className="col-md-6 col-12">
            <br/>
            <img id="mimg" src={Img}/>
            </div>
            </div>
            <br/>
            <center><h3>How It Works ?</h3></center>
            <div className="boc_divider_holder">
            <div className="boc_divider  " style={{marginBottom: "10px",width: "200px",marginLeft: "auto", marginRight: "auto",height: "1px",background: "#777777"}}>
            <i className="fa fa-circle" style={{marginTop:"1px",fontSize: "14px", lineHeight: "14px",color: "#ed5f5e",left: "50%", transform: "translateY(-50%) translateX(-50%)",backgroundColor: "#ffffff",padding: "10px"}}></i>
            </div>
            </div>

            <img id="mimg1" src={i1}/>
            </div>
        )
    }
}
export default Home;
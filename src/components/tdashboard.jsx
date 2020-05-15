import React, { Component } from "react";
import { Link } from "react-router-dom";
import imgs from '../images/test.svg';
import './dashboard1.css';
import ReactFileReader from "react-file-reader";
const csv = require('csv-parser');
const fs = require('fs');
class tDashboard extends Component
{
    constructor(){
      super();
     // this.csvreader=this.csvreader.bind(this);
      this.state={
        testFile:[],
        data:[],
        date:[],
        del:'',
        flag:false,
        testid:0,
        msg:""
      }
      
    }
    componentDidMount()
    {
      const user={
        email:JSON.parse(localStorage.getItem("jwt")).user.id,
      }
      //bconsole.log(user);
      fetch("http://localhost:8082/getnotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res=> res.json())
      .then(res => {
        //console.log(res.code);
        // console.log(res.code[0].data)
        this.setState({data:res.code,date:res.code})
      })
    }    
    
    myfunc = () =>{
      if(this.state.data)
      {
        const doubled = this.state.data.map((number) => 
        <div>
        <p style={{fontSize: "14px"}}>{number.data}</p>
        <button onClick={()=>{this.f1(number.sno)}} data-toggle="modal" data-target="#deleteModal" rel="nofollow">Delete</button>
        <hr style={{border: "1px solid #008CBA"}} />
        </div>
      );
        return doubled;

      }
      else{
        console.log("error") 
      }
    }
  f1 = e =>{
    //console.log(e)
    {this.setState({del:e})}
  }
    delete = () => {
      const user={
        sno:this.state.del
      }
      fetch("http://localhost:8082/deleten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        if(res.code === 0)
        {
          alert("Could Not Delete Notice");
          window.location='http://localhost:3000/teacherDashboard';
        }
        else
        {
        alert(`NOTICE DELETED SUCCESFULLY!!`);
        window.location='http://localhost:3000/teacherDashboard';
        }
      }); 
    }
        
    
   setFlag=e=>{
    //console.log(e);
     this.setState({testid:e},()=>{
     var obj={testid:this.state.testid};
     console.log(this.state.testid);
     fetch(" http://localhost:8082/testid",{
      method:"POST",
      headers:{
       Accept: "application/json",
         "Content-Type":"application/json",
         },
      body:JSON.stringify(obj)
   })
   .then(res => res.json())
      .then(res => {
        if(res.resType === 1)
    this.setState({flag:true})
    else 
    {
      this.setState({msg:"Please enter another key.This key already exists!!!"})
      document.getElementById("msg").innerHTML=this.state.msg;
    }
   });  
  })
     //this.setState({flag:true})
   }
    nnotice = e => {
      const user={
        email:JSON.parse(localStorage.getItem("jwt")).user.id,
        data:e
      }
      fetch("http://localhost:8082/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        if(res.code === 0)
        {
          alert("Notice Not Added");
          window.location='http://localhost:3000/teacherDashboard';
        }
        else
        {
        alert(`NOTICE ADDED SUCCESFULLY!!`);
        window.location='http://localhost:3000/teacherDashboard';
        }
        console.log("done");
      }); 
    }
    sendfile =()=>{
      
 
  var temp=[];
      const fileInput =document.querySelector('input[type="file"]');

var file = document.querySelector('#file').files[0];
var reader = new FileReader();
reader.readAsText(file);
let rowdata=[];
reader.onload = function(event) {
  var csv = event.target.result;
  let rows = csv.split('\r\n');
  //move line by line
  for (var i = 0; i < rows.length; i++) {
    //split by separator (,) and get the columns
   let cols = rows[i].split(',');
   rowdata.push([]);
    //move column by column
    for (var j = 0; j < cols.length; j++) {
      /*the value of the current column.
      Do whatever you want with the value*/
     // var value = cols[j];
      rowdata[i].push(cols[j]);
    }
  }
  console.log(rowdata);
  console.log(rowdata.length);
  console.log(JSON.stringify(rowdata));
  // rowdata json array isko strigyfy kra kruse krlo
  for(var k=1;k<rowdata.length-1;k++)
  {
    var obj={qno:"",ques:"",choices:[],ans:""};
    obj.qno=rowdata[k][0];
   // obj.testid=this.state.testid;
    obj.ques=rowdata[k][1];
           obj.choices.push(rowdata[k][2]);
           obj.choices.push(rowdata[k][3]);
           obj.choices.push(rowdata[k][4]);
           obj.choices.push(rowdata[k][5]);
           obj.ans=rowdata[k][6];
           temp.push(obj)
  }
  fetch(" http://localhost:8082/handleFile",{
        method:"POST",
        headers:{
         Accept: "application/json",
           "Content-Type":"application/json",
           },
        body:JSON.stringify(temp)
     })
     .then(res => {
        if(res.ok){return res.json();}
     })
     .then(res => {
       alert(JSON.stringify(res));
     });   
  }
}
    
    handleFiles = files => {
      var reader = new FileReader();
      reader.onload = function(e) {
          // Use reader.result
          alert(reader.result)
      }
      reader.readAsText(files[0]);
      this.state.testFile.push(reader.result);
      fetch(" http://localhost:8082/handleFile",{
        method:"POST",
        headers:{
         Accept: "application/json",
           "Content-Type":"application/json",
           },
        body:JSON.stringify(this.state.testFile)
     })
     .then(res => {
        if(res.ok){return res.json();}
     })
     .then(res => {
       alert(JSON.stringify(res));
     });
      
  }
//     csvreader()
//     {
//       fs.createReadStream(document.getElementById("inputGroupFile02").value)
//       .pipe(csv())
//       .on('data', (data) => this.state.testFile.push(data))
//       .on('end', () => {
//         console.log(this.state.testFile);
       
//   });
//         //   var csv=document.getElementById('inputGroupFile02').files[0];
//         // var formData=new FormData();
//         // formData.append("uploadCsv",csv);
//         // var request = new XMLHttpRequest();

//  //here you can set the request header to set the content type, this can be avoided.
//  //The browser sets the setRequestHeader and other headers by default based on the formData that is being passed in the request.
//  fetch(" http://localhost:8082/handleFile",{
//          method:"POST",
//          headers:{
//           Accept: "application/json",
//             "Content-Type":"application/json",
//             },
//          body:JSON.stringify(this.state.testFile)
//       })
//       .then(res => {
//          if(res.ok){return res.json();}
//       })
//       .then(res => {
//         alert("File is succesfully uploaded!!");
//       });
// //   request.open("POST","/handleFile", true);        
// //  request.setRequestHeader("Content-type", "multipart/form-data"); //----(*)
          
//           // request.onreadystatechange = function (){
//           //     if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
//           //     console.log("yey");
//           //     }
//           //   }

// // request.send(formData);
  
//     }
    render()
    {
        return(
            <div id="page-top">
            <div id="wrapper">
    <ul className="navbar-nav  sidebar sidebar-dark accordion" id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Lets's Learn</div>
      </a>
      <hr className="sidebar-divider my-0"/>
      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>
      <hr className="sidebar-divider"/>
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-list-alt"></i>
          <span>Detailed Test Results</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i className="fas fa-fw fa-question-circle"></i>
          <span>Help</span>
        </a>
      </li>

      <hr className="sidebar-divider"/>
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-comment-dots"></i>
          
          <span>Chat</span>
        </a>
      </li>


      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Generate Report</span></a>
      </li>

      <hr className="sidebar-divider d-none d-md-block"/>
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">

        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown no-arrow d-sm-none">
              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-search fa-fw"></i>
              </a>
            
              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i>
                <span className="badge badge-danger badge-counter">3+</span>
              </a>
 
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">
                  Alerts Center
                </h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">May 8, 2020</div>
                    <span className="font-weight-bold">Practice test to enhance your skill in java is here!</span>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-success">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">May 9, 2020</div>
                    Upcoming ADI st tomorrow!!
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-warning">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">May 10, 2020</div>
                    New Courses added to make you industry ready!!
                  </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
              </div>
            </li>

            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
                <span className="badge badge-danger badge-counter">3</span>
              </a>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                  Message Center
                </h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt=""/>
                    <div className="status-indicator bg-success"></div>
                  </div>
                  <div className="font-weight-bold">
                    <div className="text-truncate">Hi there! Can u send me the solution of Tower Of Hanoi?</div>
                    <div className="small text-gray-500">Shivani Goyal</div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt=""/>
                    <div className="status-indicator"></div>
                  </div>
                  <div>
                    <div className="text-truncate">Help!!Redux is not getting installed?</div>
                    <div className="small text-gray-500">Shivesh Gupta</div>
                  </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt=""/>
                    <div className="status-indicator bg-warning"></div>
                  </div>
                  <div>
                    <div className="text-truncate">When Will some good companies come to campus?</div>
                    <div className="small text-gray-500">Shivika Singla</div>
                  </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Nitin Goel</span>
                <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
              </a>

              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Previous Uploaded Tests
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

          </ul>

        </nav>

        <div className="container-fluid">

     
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Teacher's Dashboard</h1>
            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>

          <div className="row">

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Previous Tests Uploaded</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">11</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Send Results To Students</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Add Practice Tests</div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%",ariaValuenow:"50",ariaValuemin:"0", ariaValuemax:"100"}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Add Courses Details</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">1</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-book-open fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">

            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
      
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Student's Result Of Last Uploaded Exam</h6>
                  <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart-area">
                    <canvas id="myAreaChart"></canvas>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4" style={{overflow: "scroll"}}>

                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Notices & Alerts</h6>
                </div>

                <div className="card-body" style={{height: "360px"}}>
                <center><button className="btn-primary" data-toggle="modal" data-target="#noticeModal" rel="nofollow">Add New Notice</button></center>
                {this.myfunc()}         
                </div>
              </div>
            </div>
          </div>

          <div className="row">

            <div className="col-lg-6 mb-4">

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Calender</h6>
                </div>
                <div className="card-body">
                  <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                  <div className="progress mb-4">
                    <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%",ariaValuenow:"20",ariaValuemin:"0", ariaValuemax:"100"}}></div>
                  </div>
                  <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                  <div className="progress mb-4">
                    <div className="progress-bar bg-warning" role="progressbar" style={{width: "40%" ,ariaValuenow:"40" , ariaValuemin:"0", ariaValuemax:"100"}}></div>
                  </div>
                  <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                  <div className="progress mb-4">
                    <div className="progress-bar" role="progressbar" sstyle={{width: "60%" ,ariaValuenow:"40" , ariaValuemin:"0", ariaValuemax:"100"}}></div>
                  </div>
                  <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                  <div className="progress mb-4">
                    <div className="progress-bar bg-info" role="progressbar" style={{width: "80%" ,ariaValuenow:"40" , ariaValuemin:"0", ariaValuemax:"100"}}></div>
                  </div>
                  <h4 className="small font-weight-bold">Account Setup <span className="float-right">Complete!</span></h4>
                  <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{width: "100%" ,ariaValuenow:"40" , ariaValuemin:"0", ariaValuemax:"100"}}></div>
                  </div>
                </div>
              </div>

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">To Do List</h6>
                </div>
                <div className="card-body">
                  <div id="myDIV" className="header">
                     <input type="text" id="myInput" placeholder="Title..."/>
                     <a className="btn btn-primary btn-circle ml-1" role="button" onClick="newElement()">
                     <i className="fas fa-edit text-white" ></i>
                   </a>
                     
                  </div>
                <ul id="myUL">
                </ul>

                </div>
              </div>

            </div>

            <div className="col-lg-6 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create Exam/ Paper</h6>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} src={imgs} alt=""/>
                  </div>
                  <p>One Click Upload Exam!!!Easy, Convinient And User Friendly Environment</p>
                  <a target="_blank" href="#" data-toggle="modal" data-target="#logoutModal" rel="nofollow" href="https://undraw.co/">  Click Here To Upload Exam &rarr;</a>
                </div>
              </div>

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Quote For The Day</h6>
                </div>
                <div className="card-body">
                  <p>Unless you Try To Do Something Beyond What You Have Already Mastered You Will Never Grow!!</p>
                  <center><button className="btn-primary">Add New Quotes</button></center>
                  </div>
                
              </div>

            </div>
          </div>

        </div>
      </div>
            </div>
            </div>
            <div class="modal fade " id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header bg-info">
                          <h5 class="modal-title text-gray-800" id="exampleModalLabel">UPLOAD TEST</h5>
                          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        {this.state.flag==false?
                        (<div class="modal-body">
                          
                        <div class="input-group mb-3">
                            <div class="custom-file">
                              <p id="msg"className="text-danger">{this.state.msg}</p>
                            <input type="text" class="form-control" id="testId" placeholder="Enter Test Id"/>
                            </div>
                          </div>
                        </div>):
                        (<div class="modal-body">
                          <div class="input-group mb-3">
                            <div class="custom-file">
                              <p id="fileName"></p>
                              <input type="file" accept=".csv,.xls,.xlsx/*"  name="file" id="file" size="150" required />
                            </div>
                          </div>
                        </div>
                        )}
                        {this.state.flag==false?
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary" onClick={()=>this.setFlag(document.getElementById("testId").value)}>Next</button>
                        </div>:
                          <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary" onClick={this.sendfile}>UPLOAD</button>
                       </div>
                        }
                      </div>
                    </div>
                  </div>
           
                  <div class="modal fade " id="noticeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-info">
                        <h5 class="modal-title text-gray-800" id="exampleModalLabel">ADD NEW NOTICE</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div class="modal-body">                        
                      <div class="form-group">
                      <input type="text" class="form-control" id="notice01" placeholder="Add Notice"/>
                      </div>
                      </div>
                      <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" onClick={()=>this.nnotice(document.getElementById("notice01").value)}>ADD</button>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="modal fade " id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header bg-info">
                      <h5 class="modal-title text-gray-800" id="exampleModalLabel">ADD NEW NOTICE</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div class="modal-body">                        
                    <p>Are You Sure You Want To Delete Notice???</p>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                      <button class="btn btn-primary" onClick={()=>this.delete()}>DELETE</button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
        )
    }
}
export default tDashboard;
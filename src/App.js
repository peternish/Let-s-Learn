import React, { Component } from 'react';
import Mainpage from './components/mainpage';
import Contactus from './components/contactus';
import Services from './components/services';
import TestDashboard from './components/testDashboard.js'
import Mcq from './components/mcq.js';
import TestNavbar from './components/testnavbar.js';
import Sidebar from './components/sideBar.js';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Profile from './components/profile';
import Tsetting from './components/tsettings';
import Ssetting from './components/ssetings.js';
import Registers from './components/registers';
import Registert from './components/registert';
import Logins from './components/logins';
import Logint from './components/logint';
import Dashboard from './components/dashboard';
import Tdashboard from './components/tdashboard';
import Home from './components/home';
import Calender from './components/calender';
import Testhistory from './components/testhistory';
import ViewTeachTest from './components/viewTeachtest';
// import Report from './components/report';
import Sprofile from './components/sprofile';
import Testdatainsert from './components/testdatainsert';
import Testlogin from './components/testlogin';
import Testloginsign from './components/testloginsign';
import Testloginregister from './components/testloginregister';
import Test1 from './components/test1';
import Sample from './components/sample';
import StudentAnalysis from './components/studentAnalysis';

import Blogs from './components/blog2';
import Viewblog from './components/viewblog';
import Feedback from './components/feedback';


import Chatapp from './components/chatapp';
import Mocktest from './components/mocktest';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom";

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      flag:true,
      history:[],
      testid1:"",
      viewTestArr:[],
      ttype:'',
      stype:'',
      auth:'',
      viewtid:'',
      test:[],
      bid:''
    }
    this.setTofalse=this.setTofalse.bind(this);
    this.selectMcq=this.selectMcq.bind(this);
    this.clickedMcq=this.clickedMcq.bind(this);
    this.sethistory=this.sethistory.bind(this);
    this.setd=this.setd.bind(this);
    this.showTest=this.showTest.bind(this);
    this.setTrue=this.setTrue.bind(this);
   this.settest=this.settest.bind(this);
  }
  componentDidMount(){
    if(localStorage.getItem('jwt')!=null)
    {
      if(JSON.parse(localStorage.getItem('jwt')).user.type=='teacher')
      this.setState({ttype:JSON.parse(localStorage.getItem('jwt')).user.type})
      if(JSON.parse(localStorage.getItem('jwt')).user.type=='student')
      this.setState({stype:JSON.parse(localStorage.getItem('jwt')).user.type})
    }
  
if(JSON.parse(localStorage.getItem("jwt")))
{
  fetch(` http://localhost:8082/prevTot?temail=${JSON.parse(localStorage.getItem("jwt")).user.id}`, {
  method: "GET",
  headers:{  "Content-Type":"application/json" },
})
.then(res => {return res.json();})
.then(res => {
  console.log(res.code);
 this.setState({prevTot:res.code})
 console.log(this.state.prevTot)
})
}

  }
  settest(t)
  {
    this.setState({test:t})
  }

  showTest(tid)
  {
  console.log(tid)
  this.setState({viewtid:tid})
  const userss={
    testid:tid
  }
  fetch("http://localhost:8082/testdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userss)
      })
    .then(res=> res.json())
      .then(res => {
       // console.log(JSON.stringify(res));
        this.setState({viewTestArr:res})
        
      })
  }
  setd(id)
  {
    this.setState({bid:id});
  }
  
  sethistory(hist)
  {
    this.setState({history:hist});
  }
   selectMcq(mcq,i){
    // console.log(event);
    this.setState({selectedMcq:mcq,index:i});
  }
  clickedMcq(i)
  {
    this.setState({selectedMcq:this.state.test[i],index:i})
  }
  setTrue(t)
  {
    this.setState({flag:t},()=>{
    console.log(this.state.flag)})
  }
  setTofalse()
  {
    this.setState({flag:false},()=>{
    console.log("as");
    console.log(this.state.flag);
  })
  }
  render(){
    let typeofteacher,typeofstudent;
    if(localStorage.getItem('jwt')!=null)
    {
      if(JSON.parse(localStorage.getItem('jwt')).user.type=='teacher')
      typeofteacher='teacher'
      if(JSON.parse(localStorage.getItem('jwt')).user.type=='student')
      typeofstudent='student'
    }
  return (
    this.state.flag === true?
    <div className="App">
    <Router>
    <div>
    <Navbar test={this.setTofalse}/>
      <Switch>
      <Route exact path="/">
           <Home/>
        </Route>
        <Route path="/about">
          <Mainpage />
        </Route>
        <Route path="/Contact">
          <Contactus />
        </Route>
        <Route path="/Pricing">
          <Services/>
        </Route>
        <Route path="/sample">
        <Sample/>
      </Route>
      <Route path="/blog" render={props=> <Blogs setData={this.setd}/>}/>
      <Route path="/viewblog" render={props=> <Viewblog id={this.state.bid}/>}/>

    
         

        <Route path="/Registers" render={() => ( <Registers/>)} />  
        <Route path="/Registert" render={() => ( <Registert/>)} />     
        <Route path="/Logins" render={() => ( <Logins/>)} /> 
        <Route path="/Logint" render={() => ( <Logint/>)} />   

        <Route path="/sprofile"  render={props=>typeofstudent?<Sprofile/>:<Redirect to="Logins"/> } />
        <Route path="/studentDashboard"  render={props=>typeofstudent?<Dashboard/>:<Redirect to="Logins"/> } />
        <Route path="/ssetting" render={props=>typeofstudent?<Ssetting/>:<Redirect to="Logins"/> } />
        <Route path="/studentAnalysis" render={props=>typeofstudent?<StudentAnalysis/>:<Redirect to="Logins"/> } />
        <Route path="/testdataentry" render={props=>typeofteacher?<Testdatainsert/>:<Redirect to="Logint"/> } />
        <Route path="/profile"  render={props=>typeofteacher?<Profile/>:<Redirect to="Logint"/> } /> 
        <Route path="/tsetting"  render={props=>typeofteacher?<Tsetting/>:<Redirect to="Logint"/> } /> 
        <Route path="/teacherDashboard" render={props=>typeofteacher? <Tdashboard setHist={this.sethistory} tot={this.state.prevTot}/> :<Redirect to="Logint"/> }/>
        <Route path='/viewteachtest'  render={props=>typeofteacher?<ViewTeachTest prevTest={this.state.viewTestArr} tidis={this.state.viewtid} />:<Redirect to="Logint"/> } ></Route>
        <Route path="/testhistory" render={props=>typeofteacher?<Testhistory prevTest={this.state.history} showT={this.showTest} />:<Redirect to="Logint"/> } />
        <Route path="/calender" render={props=>typeofteacher?<Calender/>:<Redirect to="Logint"/> } /> 
        
        <Route path="/testloginregister" render={props=>typeofstudent?<Testloginregister/>:<Redirect to="Logins"/> }/> 
        <Route path="/testlogin" render={()=><Testlogin/>}/>}/> 
        <Route path="/testloginsign" render={()=><Testloginsign tID1={this.state.testid1}/>} /> 
        <Route path="/test1" render={()=><Test1 setfalse={this.setTofalse} tID1={this.state.testid1}/>} /> 
        <Route path="/Chatapp" render={()=><Chatapp/>}/> 
      
        <Route path="/mocktest" render={props=>typeofstudent?<Mocktest/>:<Redirect to="Logins"/> } />
        {/* <Route path="/reportbyteach" render={()=><Report></Report>}/> */}
      </Switch>
    </div>
    <Footer/>
    </Router>
    </div>:
    <div id="wrapper">
    <Router>
    <Sidebar len={this.state.test.length} selectMCQ={this.clickedMcq}></Sidebar>
    <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
       <TestNavbar></TestNavbar>
       <div class="container-fluid">
         <Switch>
         <Route exact path = "/test" render={()=><TestDashboard test={this.settest} selectMCQ={this.selectMcq} ></TestDashboard>}/> 
         <Route path = "/mcq" render={ () => <Mcq mcq={this.state.selectedMcq} len={this.state.test.length} setToTrue={this.setTrue} nextMcq={this.clickedMcq} idx={this.state.index}></Mcq>}/>
         <Route path="/feedback">
          <Feedback/>
         </Route>
         </Switch>
         </div>
      </div>
      </div>
      </Router> 
  </div>
  )
  }
}

export default App;

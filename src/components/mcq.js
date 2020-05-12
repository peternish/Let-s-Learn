import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class extends Component{
 
    render()
    {
       
        return(
          
            
            <div className="col-xl-12  mb-4">
            {/* <div className="card border-left-primary shadow h-100 py-2"> */}
              <div className="card-body  border-left-primary shadow h-100 py-2">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xm font-weight-bold text-gray-800 mb-1">{this.props.mcq.ques}</div>
                    <div className="h5 mb-0 text-gray-800">
                        {this.props.mcq.choices.map((choice)=>{
                           return <div className="form-check">
                               
                                <h6 className="form-check-label" for="exampleRadios1">
                                <input className="form-check-input" style={{marginLeft:"-18.25rem"}}type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
                                  {choice}
                                  
                                  {console.log(choice)}
                                 </h6>
                                 
                                 <br></br>
                            </div>
                        })}
                    
                    </div>
                    <div className="col-auto ">
                 <button type="button" className="btn btn mt-2 mx-2" style={{backgroundColor:"rgb(8, 169, 222)", color:"white"}}>Submit Answer</button>
                 {this.props.idx<(this.props.len-1)?
                   <Link to="/mcq" className="btn mt-2 mx-2" onClick={()=>this.props.nextMcq(this.props.idx+1)} style={{backgroundColor:"rgb(8, 169, 222)", color:"white"}}>Next Question</Link>:
                   <a href="#" className="btn btn-danger mt-2 mx-2" data-toggle="modal" data-target="#logoutModal">
                        Finish Test
                    </a>
                 }
                 </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
            <div class="modal fade " id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header bg-info">
                          <h5 class="modal-title text-gray-800" id="exampleModalLabel">Do you really want to finish the test?</h5>
                          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div class="modal-body">Select "Yes" below if you are ready to end your test.</div>
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <a class="btn btn-primary" href="login.html">Yes</a>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
          
        )
    }
}
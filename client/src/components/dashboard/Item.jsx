import { GiEarthAmerica } from "react-icons/gi"; 
import { AiFillFileAdd } from "react-icons/ai"; 
import { MdCreateNewFolder } from "react-icons/md"; 
import { AiOutlineDollarCircle } from "react-icons/ai"; 
import { AiOutlineUser } from "react-icons/ai"; 
import React from "react";

function Item() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="card card-left">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="d-inline-flex align-items-center">
                      <h2 className="text-white mb-1 font-weight-medium">236</h2>
                      <span className="badge bg-primary font-12 text-white font-weight-medium rounded-pill ms-2 d-lg-block d-md-none">
                        +18.33%
                      </span>
                    </div>
                    <h6 className="text-white font-weight-normal mb-0 w-100 text-truncate">
                      New Clients
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6">
                      <AiOutlineUser  style={{color:'#e2e8f0'}} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                      <sup className="set-doller">$</sup>18,306
                    </h2>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Earnings of Month
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6" >
                      <AiOutlineDollarCircle style={{color:'#e2e8f0'}}  />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="d-inline-flex align-items-center">
                      <h2 className="text-dark mb-1 font-weight-medium">
                        1538
                      </h2>
                      <span className="badge bg-danger font-12 text-white font-weight-medium rounded-pill ms-2 d-md-none d-lg-block">
                        -18.33%
                      </span>
                    </div>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      New Projects
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6">
                      <AiFillFileAdd  style={{color:'#e2e8f0'}} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <h2 className="text-dark mb-1 font-weight-medium">864</h2>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Projects
                    </h6>
                  </div>
                  <div className="ms-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted display-6">
                      <GiEarthAmerica   style={{color:'#e2e8f0'}}/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;

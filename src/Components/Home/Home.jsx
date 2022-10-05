import React, { useEffect } from "react";
import HOC from "../../Common/Hoc";
import { withRouter } from "react-router-dom";
import { Card, Grid } from "@material-ui/core";

import "./Home.css";
const Home = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //local array
  const home = [
    // { show: "Orders", link: "orders", data: "20" },

    // { show: "Customers ", link: "customers", data: "160" },
    { show: "User", link: "user" },
    { show: "Collection", link: "collection" },
    { show: "Category", link: "category" },
    { show: "Product", link: "addproduct" },
    { show: "Coupon", link: "coupon" },
    
  ];
  return (
    <div className="home_padding">
      <div className="content_padding_home">
        <div className="main_div ">
          <div className="container">
            <div className="row">
              {home.map((item, index) => (
                <div className="col-md-4  col-lg-4">
                  <Card
                    className="main_card Card_shadow "
                    onClick={() => props.history.push(`${item.link}`)}
                  >
                    <div className="main_content d-flex justify-content-between">
                      <p>
                        <span className="">
                          <i class="fa fa-plus pr-1" aria-hidden="true"></i>
                        </span>
                        {item.show}
                      </p>
                      <span className="">{item.data}</span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(HOC(Home));

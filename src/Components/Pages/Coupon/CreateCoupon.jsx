import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const Createcoupon = (props) => {
    const [isloading, setisloading] = useState(false);
    const [discount, setdiscount] = useState("");
    const [expiry, setExpiry] = useState("");
    const [collection, setCollection] = useState();
    //error
    const [EditDiscount, setEditDiscount] = useState(false);
    const [EditExpiry, setEditExpiry] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  
    //add Coupon

    const addCoupon = () => {
        try {
            if (!blankValidator(discount)) {
                setEditDiscount(true);
                return;
            }

            if (!blankValidator(expiry)) {
                setEditExpiry(true);
                return;
            }

            let url = getBaseUrl() + "coupon";
            setisloading(true);

           const temp ={
            discount_percentage:discount,
            expire_date:expiry
           }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
                .post(url, temp, config)
                .then(
                    (res) => {
                        console.log("data Category:::", res);
                        setisloading(false);
                        showNotificationMsz(res.data.msg, "success");
                    },

                    (error) => {
                        setisloading(false);
                        console.log("data response error:::", error);
                        showNotificationMsz(error, "danger");
                    }
                )
                .catch((e) => {
                    setisloading(false);
                    console.log("data response error:::", e);
                    showNotificationMsz(e, "danger");
                });
        } catch (error) { }
    };

    return (
        <>
            <div style={{ width: "100%" }}>
                <div className="home_padding">
                    <div className="content_padding">
                        <Grid className="Component_main_grid p-2 "></Grid>

                        <div>
                            <Card className=" mb-2 Card_shadow p-3">
                                <div className="card_admissiondetails_height">
                                    <div className="textfiled_margin">
                                        <div className="card_content_instition">
                                            <h5 className="text_filed_heading">Add Coupon</h5>

                                            <Grid className="Component_main_grid">
                                                <Grid item md={12}>
                                                    <div className="text_filed_heading">Discount Percentage</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Name"
                                                            autoComplete="off"
                                                            value={discount}
                                                            onChange={(e) => {
                                                                setEditDiscount(false);
                                                                setdiscount(e.target.value);
                                                            }}
                                                        />
                                                        {EditDiscount && (
                                                            <span className="text-danger">
                                                                Enter Discount
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="text_filed_heading">expiry Date</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder="Enter Price"
                                                            autoComplete="off"
                                                            value={expiry}
                                                            onChange={(e) => {
                                                                setEditExpiry(false);
                                                                setExpiry(e.target.value);
                                                            }}
                                                        />
                                                        {EditExpiry && (
                                                            <span className="text-danger">
                                                                Enter Expiry Date
                                                            </span>
                                                        )}
                                                    </div>

                                                   

                                            
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="mt-2 pb-3 ">
                                            <Button
                                                variant="contained"
                                                className="button_formatting"
                                                onClick={addCoupon}
                                            >
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(Createcoupon);

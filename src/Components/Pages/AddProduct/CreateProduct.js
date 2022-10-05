import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const CreateProduct = (props) => {
    const [isloading, setisloading] = useState(false);
    const [isupdated, setisupdated] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [CollectionDataArry, setCollectionDataArry] = useState([]);
    const [image, setimage] = useState();
    const [collection, setCollection] = useState();
    //error
    const [EditName, setEditName] = useState(false);
    const [EditPrice, setEditPrice] = useState(false);
    const [Editimage, setEditimage] = useState(false);
    const [EditCollection, setEditCollection] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        let url = getBaseUrl() + "collection";

        axios
            .get(url)
            .then(
                (res) => {
                    console.log("data collection:::", res);
                    setCollectionDataArry(res.data.collections);
                },

                (error) => {
                    setisloading(false);
                    console.log("data response error:::", error);
                }
            )
            .catch((e) => {
                setisloading(false);
                console.log("data response error:::", e);
            });
    },[isupdated]);

    //add Product

    const addProduct = () => {
        try {
            if (!blankValidator(name)) {
                setEditName(true);
                return;
            }

            if (!blankValidator(price)) {
                setEditPrice(true);
                return;
            }


            if (!blankValidator(image)) {
                setEditimage(true);
                return;
            }
            if (!blankValidator(collection)) {
                setEditCollection(true);
                return;
            }

            let url = getBaseUrl() + "product";
            setisloading(true);

            const fd = new FormData();
            fd.append("name", name);
            fd.append("image", image);
            fd.append("original_price", price);
            fd.append("product_collection", collection);

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
                .post(url, fd, config)
                .then(
                    (res) => {
                        console.log("data Product:::", res);
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
                                            <h5 className="text_filed_heading">Add Product</h5>

                                            <Grid className="Component_main_grid">
                                                <Grid item md={12}>
                                                    <div className="text_filed_heading">Product Name</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Name"
                                                            autoComplete="off"
                                                            value={name}
                                                            onChange={(e) => {
                                                                setEditName(false);
                                                                setName(e.target.value);
                                                            }}
                                                        />
                                                        {EditName && (
                                                            <span className="text-danger">
                                                                Enter Product Name
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="text_filed_heading">Price</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Price"
                                                            autoComplete="off"
                                                            value={price}
                                                            onChange={(e) => {
                                                                setEditPrice(false);
                                                                setPrice(e.target.value);
                                                            }}
                                                        />
                                                        {EditPrice && (
                                                            <span className="text-danger">
                                                                Enter Price
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="text_filed_heading">Image</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            placeholder="Enter Subject Name"
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setimage(e.target.files[0]);
                                                            }}
                                                        />

                                                        {Editimage && (
                                                            <span className="text-danger">
                                                                Select Image
                                                            </span>
                                                        )}

                                                    </div>

                                                    <div className="text_filed_heading">Collection</div>
                                                    <select
                                                        className="form-control mb-3"
                                                        value={collection}
                                                        onChange={(e) => {
                                                            setCollection(e.target.value)
                                                            setEditCollection(false);
                                                        }}
                                                    >
                                                        <option value="">Select Collection</option>
                                                        {CollectionDataArry.map((row, index) => (
                                                            <option value={row._id}>
                                                                {row.name}
                                                            </option>
                                                        ))}

                                                        {EditCollection && (
                                                            <span className="text-danger">
                                                                Choose Collection
                                                            </span>
                                                        )}
                                                    </select>{" "}






                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="mt-2 pb-3 ">
                                            <Button
                                                variant="contained"
                                                className="button_formatting"
                                                onClick={addProduct}
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

export default HOC(CreateProduct);

import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const CreateCategory = (props) => {
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image,setimage] =useState();
  //error
  const [EditcategoryName, setEditcategoryName] = useState(false);
  const [Editdescription, setEditdescription] = useState(false);
  const [Editimage, setEditimage] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //add category

  const addCategory = () => {
    try {
      if (!blankValidator(categoryName)) {
        setEditcategoryName(true);
        return;
      }

      if (!blankValidator(description)) {
        setEditdescription(true);
        return;
      }

      if (!blankValidator(image)) {
        setEditimage(true);
        return;
      }
      let url = getBaseUrl() + "category";
      setisloading(true);

      const fd = new FormData();
      fd.append("name", categoryName);
      fd.append("image", image);
      fd.append("description" ,description);

      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

      axios
        .post(url, fd,config)
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
    } catch (error) {}
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
                      <h5 className="text_filed_heading">Add Category</h5>

                      <Grid className="Component_main_grid">
                        <Grid item md={12}>
                          <div className="text_filed_heading">Category Name</div>
                          <div className=" mt-1 mr-2">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Category"
                              autoComplete="off"
                              value={categoryName}
                              onChange={(e) => {
                                setEditcategoryName(false);
                                setcategoryName(e.target.value);
                              }}
                            />
                            {EditcategoryName && (
                              <span className="text-danger">
                                Enter Category
                              </span>
                            )}
                          </div>

                          <div className="text_filed_heading">Description</div>
                          <div className=" mt-1 mr-2">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Category"
                              autoComplete="off"
                              value={description}
                              onChange={(e) => {
                                setEditdescription(false);
                                setDescription(e.target.value);
                              }}
                            />
                            {Editdescription && (
                              <span className="text-danger">
                                Enter Description 
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
                        </Grid>
                      </Grid>
                    </div>
                    <div className="mt-2 pb-3 ">
                      <Button
                        variant="contained"
                        className="button_formatting"
                        onClick={addCategory}
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

export default HOC(CreateCategory);

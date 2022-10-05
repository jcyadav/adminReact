import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const CreateCollection = (props) => {
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [category, setCategory] = useState("");
  const [CategoryDataArry, setCategoryDataArry] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setimage] = useState("");

  //error
  const [EditcategoryName, setEditcategoryName] = useState(false);
  const [EditName, setEditName] = useState(false);
  const [Editdescription, setEditdescription] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //add category
  const AddCollection = () => {
    try {
      if (!blankValidator(category)) {
        setEditcategoryName(true);
        return;
      }
      if (!blankValidator(name)) {
        setEditName(true);
        return;
      }

      if (!blankValidator(description)) {
        setEditdescription(true);
        return;
      }

      let url = getBaseUrl() + "collection";
      setisloading(true);

    

    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    fd.append("description" ,description);

      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

      axios
        .post(url, fd,config)
        .then(
          (res) => {
            console.log("data Collection:::", res);
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

  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "category";

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data viewCategory:::", res);

          setCategoryDataArry(res.data.categories);
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
  }, [isupdated]);

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
                      <h5 className="text_filed_heading">Add Collection</h5>

                      <Grid className="Component_main_grid">
                        <Grid item md={12}>
                          <div className="text_filed_heading">Name</div>
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
                                Enter Name
                              </span>
                            )}
                          </div>

                          <div className="text_filed_heading">Category</div>
                      <select 
                      className="form-control mb-3"
                      value={category}
                      onChange={(e) =>{
                        setCategory(e.target.value)
                        setEditcategoryName(false);
                      }}
                      >
                       <option value="">Select Category</option>
                       {CategoryDataArry.map((row, index) => (
                              <option value={row._id}>
                                {row.name}
                              </option>
                            ))}

                      {EditcategoryName && (
                              <span className="text-danger">
                                Enter Category
                              </span>
                            )}
                 </select>{" "}

                          
                          <div className="text_filed_heading">Descrption</div>
                          <div className=" mt-1 mr-2">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Descrption"
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
                   

                  </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="mt-2 pb-3 ">
                      <Button
                        variant="contained"
                        className="button_formatting"
                        onClick={AddCollection}
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
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(CreateCollection);

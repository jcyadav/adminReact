import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

//DIALOG BOX
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AddProduct(props) {
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [CategoryDataArry, setCategoryDataArry] = useState([]);
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const [EditcategoryName, setEditcategoryName] = useState(false);
  const token = localStorage.getItem("token");

  // Edit Product
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [CollectionDataArry, setCollectionDataArry] = useState([]);
  const [collection, setCollection] = useState();
  const [EditId, setEditId] = useState("");

  const EditProduct = (row) => {
    setEditDailogOpen(!EditDailogOpen);
  
    setName(row.name);
    setPrice(row.original_price);
    // collection(row.product_collection);
    setEditId(row._id);
  
  };



  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "product";
    setisloading(true);

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data viewProduct:::", res);
          setisloading(false);
          setCategoryDataArry(res.data.products);
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

  ///delete Category Name
  const deleteProduct= (row) => {
    let id = row._id;
    setisloading(false);
    let url = getBaseUrl() + "product";

    const temp ={
      productId:id
    }

    const config = {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
       },
      data: JSON.stringify(temp)
  };
    axios
      .delete(url,config)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
        setisloading(false);
      });
  };

  // collection 
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

  ///update Product
  const UpdateProduct = (ID) => {
    let id = ID;
    setisloading(true);
    let url = getBaseUrl() + "product";

    const fd = new FormData();
    fd.append("productId",id)
    fd.append("name", name);
    fd.append("original_price", price);
    fd.append("product_collection", collection);
    // console.log("temp::>>>",temp);?
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
       },
      data: JSON.stringify(fd)
  };
    axios
      .put(url, fd,config)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
          setEditDailogOpen(!EditDailogOpen);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
        setisloading(false);
      });
  };


  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [titlename, settitlename] = useState("");
  const filterData = CategoryDataArry.filter((event) => {
    return (
      event.name.toLowerCase().indexOf(titlename.toLowerCase()) !== -1
    );
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">    
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Product</h3>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.push("/createproduct")}
              >
                <i class="fa fa-plus"></i> Create
              </button>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.goBack()}
              >
                <i class="fa fa-arrow-left"></i>Go Back
              </button>
            </Grid>
            <Grid item md={3}>
              <div className="d-flex mt-3">
                <span className="p-2">
                  <i class="fa fa-search"></i>
                </span>
                <span>
                  <input
                    value={titlename}
                    onChange={(e) => {
                      settitlename(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Search by Name"
                  />
                </span>
              </div>
            </Grid>
          </Grid>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Discount Percentage</TableCell>
                    <TableCell>Operations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterData
                  ).map((row) => (
                    <TableRow key={row.name}>
                       <TableCell component="th" scope="row">
                        <img
                          src={ row.images}
                          style={{ height: "30px", width: "50px" }}
                        />
                        </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.discount}</TableCell>
                      <TableCell>{row.discount_percentage}</TableCell>
                      

                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => EditProduct(row)}
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deleteProduct(row)}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

            <br />
          <Dialog
            open={EditDailogOpen}
            onClose={() => setEditDailogOpen(!EditDailogOpen)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              Update Product
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
            <div className="text_filed_heading">Product Name</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Name"
                                                            autoComplete="off"
                                                            value={name}
                                                            onChange={(e) => {
                                                             
                                                                setName(e.target.value);
                                                            }}
                                                        />
                                                     
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
                                                                
                                                                setPrice(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                 

                                                    <div className="text_filed_heading">Collection</div>
                                                    <select
                                                        className="form-control mb-3"
                                                        value={collection}
                                                        onChange={(e) => {
                                                            setCollection(e.target.value)
                                                        }}
                                                    >
                                                        <option value="">Select Collection</option>
                                                        {CollectionDataArry.map((row, index) => (
                                                            <option value={row._id}>
                                                                {row.name}
                                                            </option>
                                                        ))}

                                                       
                                                    </select>{" "}





                  </DialogContent>
                <DialogActions>
              <Button
                className="button_formatting"
                onClick={() => EditProduct(!EditDailogOpen)}
              >
                Cancel
              </Button>
              <Button
                className="button_formatting"
                onClick={() => UpdateProduct(EditId)}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
}
export default HOC(AddProduct);

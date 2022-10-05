import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HOC from "../../Common/Hoc";
import { Card, Grid } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import Loder from "../../../src/Components/Loder/Loder";
import { getBaseUrl } from "../../../src/Components/utils";
import {
  blankValidator,
  showNotificationMsz,
} from "../../../src/Components/utils/Validation";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AddProduct(props) {
  const [productDataArr, setproductDataArr] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "viewProduct";
    axios
      .get(url)
      .then(
        (res) => {
          console.log("data productDataArr:::", res);

          setproductDataArr(res.data);
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

  ///delete Product Name
  const deleteproduct = (row) => {
    let id = row._id;
    setisloading(false);
    let url = getBaseUrl() + `deleteproduct/${id}`;
    axios
      .delete(url)
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

  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

  const filterData = productDataArr.filter((event) => {
    return (
      event.partsBrand.toLowerCase().indexOf(titlename.toLowerCase()) !== -1
    );
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Product</h3>
              {/* <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() =>
                  props.history.push("/product", {
                    PageType: "add",
                  })
                }
              >
                <i class="fa fa-plus"></i> Create
              </button>

              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.goBack()}
              >
                <i class="fa fa-arrow-left"></i>Go Back
              </button> */}
            </Grid>
            <Grid item md={3}>
              <div className="d-flex">
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
                    placeholder="Search by Title Name"
                  />
                </span>
              </div>
            </Grid>
          </Grid>

          <Grid className="Component_main_grid mb-3">
            <Grid item md={10}>
              <button
                type="button"
                class="btn btn-info mr-4 "
                onClick={() =>
                  props.history.push("/product", {
                    PageType: "add",
                  })
                }
              >
                <i class="fa fa-plus"></i> Create
              </button>
            </Grid>
            <Grid item md={2}>
              <button
                type="button"
                class="btn btn-info mr-4 "
                onClick={() => props.history.goBack()}
              >
                <i class="fa fa-arrow-left"></i>Go Back
              </button>
            </Grid>
          </Grid>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Car Brands</TableCell>
                    <TableCell>Chassis Number</TableCell>

                    <TableCell>Model</TableCell>

                    <TableCell>Action</TableCell>
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
                          src={getBaseUrl() + `${row.image}`}
                          style={{ height: "30px", width: "50px" }}
                        />
                      </TableCell>
                      <TableCell>{row?.carBrand?.brandName}</TableCell>

                      <TableCell>{row?.chassisNumber?.number}</TableCell>
                      <TableCell>{row?.model?.model}</TableCell>

                      <TableCell>
                        <div className="d-flex">
                          <button
                            type="button"
                            class="btn btn-info mr-4"
                            onClick={() =>
                              props.history.push("/product", {
                                PageType: "edit",
                                data: row,
                              })
                            }
                          >
                            <i class="fa fa-edit"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={() => deleteproduct(row)}
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </div>
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
        </div>
      </div>
    </>
  );
}
export default HOC(AddProduct);

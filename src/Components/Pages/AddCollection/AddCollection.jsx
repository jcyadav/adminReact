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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function AddCollection(props) {
    const [isupdated, setisupdated] = useState(false);
    const [isloading, setisloading] = useState(false);
    const [CollectionDataArry, setCollectionDataArry] = useState([]);


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
    }, [isupdated]);

    
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
    const filterData = CollectionDataArry.filter((event) => {
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
                            <h3 className="mb-2">Add Collection</h3>
                            <button
                                type="button"
                                class="btn btn-info mr-4"
                                onClick={() => props.history.push("/createcollection")}
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
                                        <TableCell>Category</TableCell>
                                        <TableCell>Description</TableCell>
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
                                                    src={row.image}
                                                    style={{ height: "30px", width: "50px" }}
                                                />
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.description}</TableCell>
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
                </div>
            </div>
            <Loder loading={isloading} />
        </>
    );
}
export default HOC(AddCollection);

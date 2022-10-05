import React, { useEffect, useState } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import HOC from "../../Common/Hoc";
import Loder from "../../../src/Components/Loder/Loder";
import { getBaseUrl } from "../../../src/Components/utils";
import {
  blankValidator,
  showNotificationMsz,
} from "../../../src/Components/utils/Validation";
import axios from "axios";

const Product = (props) => {
  let data = props.location.state.data;
  console.log("DATA", data);

  // console.log("props", props.location.state.PageType);
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);

  const [BrandDataArr, setBrandDataArr] = useState([]);
  const [SeriesByBrandArr, setSeriesByBrandArr] = useState([]);
  const [ChassisNumberBySeriesArr, setChassisNumberBySeriesArr] = useState([]);
  const [modelDataArr, setmodelDataArr] = useState([]);

  const [brandId, setbrandId] = useState("");
  const [seriesNumber, setseriesNumber] = useState("");
  const [chassisNumber, setchassisNumber] = useState("");
  const [model, setmodel] = useState("");

  const [supplier, setsupplier] = useState("");
  const [partsBrand, setpartsBrand] = useState("");
  const [carVariant, setcarVariant] = useState("");
  const [vechileFitment, setvechileFitment] = useState("");
  const [partsCategory, setpartsCategory] = useState("");
  const [quality, setquality] = useState("");
  const [product, setproduct] = useState("");
  const [sellingPrice, setsellingPrice] = useState("");
  const [variationPrice, setvariationPrice] = useState("");
  const [compatibilityCheck, setcompatibilityCheck] = useState("");
  const [finalWeight, setfinalWeight] = useState("");
  const [image, setimage] = useState(null);
  const [QualitydataArry, setQualitydataArry] = useState([]);

  ///Error
  const [ErrorbrandId, setErrorbrandId] = useState(false);
  const [ErrorseriesNumber, setErrorseriesNumber] = useState(false);
  const [ErrorchassisNumber, setErrorchassisNumber] = useState(false);
  const [Errormodel, setErrormodel] = useState(false);

  const [Errorsupplier, setErrorsupplier] = useState(false);
  const [ErrorpartsBrand, setErrorpartsBrand] = useState(false);
  const [ErrorcarVariant, setErrorcarVariant] = useState(false);
  const [ErrorvechileFitment, setErrorvechileFitment] = useState(false);
  const [ErrorpartsCategory, setErrorpartsCategory] = useState(false);
  const [Errorquality, setErrorquality] = useState(false);
  const [Errorproduct, setErrorproduct] = useState(false);
  const [ErrorsellingPrice, setErrorsellingPrice] = useState(false);
  const [ErrorvariationPrice, setErrorvariationPrice] = useState(false);
  const [ErrorcompatibilityCheck, setErrorcompatibilityCheck] = useState(false);
  const [ErrorfinalWeight, setErrorfinalWeight] = useState(false);
  const [Errorimage, setErrorimage] = useState(null);
  const [CategoryDataArry, setCategoryDataArry] = useState([]);
  const [editId, seteditId] = useState("");

  useEffect(() => {
    let page = props.location.state.PageType;
    if (page === "edit") {
      setbrandId(data.carBrand.brandName);
      setseriesNumber(data.seriesNumber);
      setchassisNumber(data.chassisNumber);
      setmodel(data.model);

      setsupplier(data.supplier);
      setpartsBrand(data.partsBrand);
      setcarVariant(data.supplier);
      setvechileFitment(data.vechileFitment);
      setpartsCategory(data.partsCategory);
      setquality(data.quality);
      setproduct(data.product);
      setsellingPrice(data.sellingPrice);
      setvariationPrice(data.variationPrice);
      setcompatibilityCheck(data.compatibilityCheck);
      setfinalWeight(data.finalWeight);
      setimage(data.image);
      seteditId(data._id);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "viewCategory";

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data viewCategory :::", res);

          setCategoryDataArry(res.data);
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

  const addproductData = () => {
    let page = props.location.state.PageType;
    if (page === "edit") {
      try {
        if (!blankValidator(brandId)) {
          setErrorbrandId(true);
          return;
        }
        if (!blankValidator(seriesNumber)) {
          setErrorseriesNumber(true);
          return;
        }
        if (!blankValidator(chassisNumber)) {
          setErrorchassisNumber(true);
          return;
        }
        if (!blankValidator(model)) {
          setErrormodel(true);
          return;
        }
        if (!blankValidator(supplier)) {
          setErrorsupplier(true);
          return;
        }
        if (!blankValidator(partsBrand)) {
          setErrorpartsBrand(true);
          return;
        }
        if (!blankValidator(carVariant)) {
          setErrorcarVariant(true);
          return;
        }
        if (!blankValidator(vechileFitment)) {
          setErrorvechileFitment(true);
          return;
        }

        if (!blankValidator(partsCategory)) {
          setErrorpartsCategory(true);
          return;
        }
        if (!blankValidator(quality)) {
          setErrorquality(true);
          return;
        }

        if (!blankValidator(product)) {
          setErrorproduct(true);
          return;
        }
        if (!blankValidator(sellingPrice)) {
          setErrorsellingPrice(true);
          return;
        }
        if (!blankValidator(variationPrice)) {
          setErrorvariationPrice(true);
          return;
        }
        if (!blankValidator(image)) {
          setErrorimage(true);
          return;
        }

        if (!blankValidator(compatibilityCheck)) {
          setErrorcompatibilityCheck(true);
          return;
        }
        if (!blankValidator(finalWeight)) {
          setErrorfinalWeight(true);
          return;
        }

        setisloading(true);
        let url = getBaseUrl() + `updateProduct/${editId}`;
        setisloading(true);

        const fd = new FormData();
        fd.append("carBrand", brandId);
        fd.append("seriesNumber", seriesNumber);
        fd.append("chassisNumber", chassisNumber);
        fd.append("model", model);

        fd.append("supplier", supplier);
        fd.append("partsBrand", partsBrand);
        fd.append("carVariant", carVariant);
        fd.append("vechileFitment", vechileFitment);
        fd.append("partsCategory", partsCategory);
        fd.append("quality", quality);
        fd.append("product", product);
        fd.append("sellingPrice", sellingPrice);
        fd.append("variationPrice", variationPrice);
        fd.append("compatibilityCheck", compatibilityCheck);
        fd.append("finalWeight", finalWeight);

        //********* HERE IS THE CHANGE ***********

        fd.append("myField", image);

        axios
          .patch(url, fd)
          .then(
            (res) => {
              console.log("data banner:::", res);
              showNotificationMsz(res.data.msg, "success");
              setisupdated(!isupdated);
              setisloading(false);
              if (brandId === "") {
                alert("Enter Brand");
                return;
              }
              props.history.goBack();
            },

            (error) => {
              console.log("data response blogfield:::", error);
              setisloading(false);
              showNotificationMsz(error, "danger");
            }
          )
          .catch((e) => {
            console.log("data response blogfield:::", e);
            setisloading(false);
            showNotificationMsz(e, "danger");
          });
      } catch (error) {}
    } else {
      try {
        if (!blankValidator(brandId)) {
          setErrorbrandId(true);
          return;
        }
        if (!blankValidator(seriesNumber)) {
          setErrorseriesNumber(true);
          return;
        }
        if (!blankValidator(chassisNumber)) {
          setErrorchassisNumber(true);
          return;
        }
        if (!blankValidator(model)) {
          setErrormodel(true);
          return;
        }
        if (!blankValidator(supplier)) {
          setErrorsupplier(true);
          return;
        }
        if (!blankValidator(partsBrand)) {
          setErrorpartsBrand(true);
          return;
        }
        if (!blankValidator(carVariant)) {
          setErrorcarVariant(true);
          return;
        }
        if (!blankValidator(vechileFitment)) {
          setErrorvechileFitment(true);
          return;
        }

        if (!blankValidator(partsCategory)) {
          setErrorpartsCategory(true);
          return;
        }
        if (!blankValidator(quality)) {
          setErrorquality(true);
          return;
        }

        if (!blankValidator(product)) {
          setErrorproduct(true);
          return;
        }
        if (!blankValidator(sellingPrice)) {
          setErrorsellingPrice(true);
          return;
        }
        if (!blankValidator(variationPrice)) {
          setErrorvariationPrice(true);
          return;
        }
        if (!blankValidator(image)) {
          setErrorimage(true);
          return;
        }

        if (!blankValidator(compatibilityCheck)) {
          setErrorcompatibilityCheck(true);
          return;
        }
        if (!blankValidator(finalWeight)) {
          setErrorfinalWeight(true);
          return;
        }

        setisloading(true);
        let url = getBaseUrl() + "addProduct";
        setisloading(true);

        const fd = new FormData();
        fd.append("carBrand", brandId);
        fd.append("seriesNumber", seriesNumber);
        fd.append("chassisNumber", chassisNumber);
        fd.append("model", model);

        fd.append("supplier", supplier);
        fd.append("partsBrand", partsBrand);
        fd.append("carVariant", carVariant);
        fd.append("vechileFitment", vechileFitment);
        fd.append("partsCategory", partsCategory);
        fd.append("quality", quality);
        fd.append("product", product);
        fd.append("sellingPrice", sellingPrice);
        fd.append("variationPrice", variationPrice);
        fd.append("compatibilityCheck", compatibilityCheck);
        fd.append("finalWeight", finalWeight);

        //********* HERE IS THE CHANGE ***********

        fd.append("myField", image);

        axios
          .post(url, fd)
          .then(
            (res) => {
              console.log("data banner:::", res);
              showNotificationMsz(res.data.msg, "success");
              setisupdated(!isupdated);
              setisloading(false);

              // props.history.goBack();
            },

            (error) => {
              console.log("data response blogfield:::", error);
              setisloading(false);
              showNotificationMsz(error, "danger");
            }
          )
          .catch((e) => {
            console.log("data response blogfield:::", e);
            setisloading(false);
            showNotificationMsz(e, "danger");
          });
      } catch (error) {}
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let url = getBaseUrl() + "getBrand";
    axios
      .get(url)
      .then(
        (res) => {
          console.log("data brandget:::", res);

          setBrandDataArr(res.data);
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
  }, []);

  /////Quality get api
  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "getQuality";
    axios
      .get(url)
      .then(
        (res) => {
          console.log("dataquality Quality:::", res);

          setQualitydataArry(res.data);
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
  }, []);

  const HandleBrandData = (e) => {
    setErrorbrandId(false);
    const brand_id = e.target.value;
    setbrandId("");
    if (brand_id === "") {
      setSeriesByBrandArr([]);
      return;
    }
    setbrandId(brand_id);
    let url = getBaseUrl() + `getSeriesByBrand/${brand_id}`;
    axios
      .get(url)
      .then(
        (res) => {
          console.log("data getSeriesByBrand:::", res);

          setSeriesByBrandArr(res.data);
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
  };

  const HandleSeriesData = (e) => {
    setErrorseriesNumber(false);
    setseriesNumber("");
    const Series_id = e.target.value;

    if (Series_id === "") {
      setChassisNumberBySeriesArr([]);
      return;
    }
    setseriesNumber(Series_id);

    let url = getBaseUrl() + `getChassisNumberBySeries/${Series_id}`;
    axios
      .get(url)
      .then(
        (res) => {
          console.log("data getChassisNumberBySeriesArr:::", res);

          setChassisNumberBySeriesArr(res.data);
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
  };

  const HandlechassisData = (e) => {
    setErrorchassisNumber(false);
    setchassisNumber("");
    const chassis_id = e.target.value;
    if (chassis_id === "") {
      setmodelDataArr([]);
      return;
    }
    setchassisNumber(chassis_id);

    let url = getBaseUrl() + `getModelByChassis/${chassis_id}`;
    axios
      .get(url)
      .then(
        (res) => {
          console.log("dataget sdcdscsdvsdvModelByChassis:::", res);

          setmodelDataArr(res.data);
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
  };
  return (
    <>
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
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Car Brands</div>
                        <div className=" mr-2">
                          <div class="form-group">
                            <select
                              class="form-control"
                              onChange={(e) => HandleBrandData(e)}
                            >
                              <option value="">Select .... </option>
                              {BrandDataArr.map((row, index) => (
                                <option value={row._id}>{row.brandName}</option>
                              ))}
                            </select>
                            {ErrorbrandId && (
                              <span className="text-danger">
                                Enter Car Brands
                              </span>
                            )}
                          </div>
                        </div>
                      </Grid>
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Series No</div>
                        <div class="form-group mr-2">
                          <select
                            class="form-control"
                            onChange={(e) => HandleSeriesData(e)}
                          >
                            <option value="">Select .....</option>
                            {SeriesByBrandArr.map((row, index) => (
                              <option value={row._id}>{row.seriesName}</option>
                            ))}
                          </select>
                          {ErrorseriesNumber && (
                            <span className="text-danger">Enter Series No</span>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Chassis No</div>
                        <div class="form-group mr-2">
                          <select
                            class="form-control"
                            onChange={(e) => HandlechassisData(e)}
                          >
                            <option>Select ....</option>
                            {ChassisNumberBySeriesArr.map((row, index) => (
                              <option value={row._id}>{row.number}</option>
                            ))}
                          </select>
                          {ErrorchassisNumber && (
                            <span className="text-danger">Chassis No</span>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Model</div>
                        <div className="mr-2">
                          <div class="form-group">
                            <select
                              class="form-control"
                              value={model}
                              onChange={(e) => {
                                setErrormodel(false);
                                setmodel(e.target.value);
                              }}
                            >
                              <option>Select....</option>
                              {modelDataArr.map((row, index) => (
                                <option value={row._id}>{row.model}</option>
                              ))}
                            </select>
                            {Errormodel && (
                              <span className="text-danger">Enter Model</span>
                            )}
                          </div>
                        </div>
                      </Grid>
                    </Grid>

                    {/* dropdown */}

                    <Grid className="Component_main_grid">
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Supplier</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Supplier"
                            autoComplete="off"
                            value={supplier}
                            onChange={(e) => {
                              setErrorsupplier(false);
                              setsupplier(e.target.value);
                            }}
                          />{" "}
                          {Errorsupplier && (
                            <span className="text-danger">
                              Enter Supplier Name
                            </span>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Parts Brand</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Parts Brand"
                            autoComplete="off"
                            value={partsBrand}
                            onChange={(e) => {
                              setErrorpartsBrand(false);
                              setpartsBrand(e.target.value);
                            }}
                          />{" "}
                          {ErrorpartsBrand && (
                            <span className="text-danger">
                              Enter Parts Brand
                            </span>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Car Variant</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Car Variant"
                            autoComplete="off"
                            value={carVariant}
                            onChange={(e) => {
                              setErrorcarVariant(false);
                              setcarVariant(e.target.value);
                            }}
                          />{" "}
                          {ErrorcarVariant && (
                            <span className="text-danger">
                              Enter Car Variant
                            </span>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">
                          Vehicle Fitment
                        </div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Vehicle Name"
                            autoComplete="off"
                            value={vechileFitment}
                            onChange={(e) => {
                              setErrorvechileFitment(false);
                              setvechileFitment(e.target.value);
                            }}
                          />
                          {ErrorvechileFitment && (
                            <span className="text-danger">
                              Enter Vehicle Name
                            </span>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Parts Category</div>
                        <div className=" mt-1 mr-2">
                          <select
                            class="form-control"
                            value={partsCategory}
                            onChange={(e) => {
                              setErrorpartsCategory(false);
                              setpartsCategory(e.target.value);
                            }}
                          >
                            <option value="">Select .... </option>
                            {CategoryDataArry.map((row, index) => (
                              <option value={row.categoryName}>
                                {row.categoryName}
                              </option>
                            ))}
                          </select>

                          {ErrorpartsCategory && (
                            <span className="text-danger">
                              Enter Parts Category
                            </span>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Quality</div>
                        <div className=" mt-1 mr-2">
                          <select
                            class="form-control"
                            value={quality}
                            onChange={(e) => {
                              setErrorquality(false);
                              setquality(e.target.value);
                            }}
                          >
                            <option>Select....</option>
                            {QualitydataArry.map((row, index) => (
                              <option value={row._id}>{row.quality}</option>
                            ))}
                          </select>{" "}
                          {Errorquality && (
                            <span className="text-danger">
                              Enter Quality Product
                            </span>
                          )}
                          {/* <input
                            type="text"
                            className="form-control "
                            placeholder="Quality"
                            autoComplete="off"
                            value={quality}
                            onChange={(e) => {
                              setErrorquality(false);
                              setquality(e.target.value);
                            }}
                          />{" "} */}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={12} lg={12} xs={12}>
                        <div className="text_filed_heading">Product</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Product"
                            autoComplete="off"
                            value={product}
                            onChange={(e) => {
                              setErrorproduct(false);
                              setproduct(e.target.value);
                            }}
                          />
                          {Errorproduct && (
                            <span className="text-danger">
                              Enter Product Name
                            </span>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">
                          Final Selling Price
                        </div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Final Selling Price"
                            autoComplete="off"
                            value={sellingPrice}
                            onChange={(e) => {
                              setErrorsellingPrice(false);
                              setsellingPrice(e.target.value);
                            }}
                          />
                          {ErrorsellingPrice && (
                            <span className="text-danger">
                              Enter Final Selling Price
                            </span>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">
                          Variation Price
                        </div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Variation Price"
                            autoComplete="off"
                            value={variationPrice}
                            onChange={(e) => {
                              setErrorvariationPrice(false);
                              setvariationPrice(e.target.value);
                            }}
                          />
                          {ErrorvariationPrice && (
                            <span className="text-danger">
                              Enter Variation Price
                            </span>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={12} lg={12} xs={12}>
                        <div className="text_filed_heading mt-3 mb-2">
                          Add Product Image
                        </div>
                        <div className="mr-2 mt-1">
                          <input
                            type="file"
                            class="form-control"
                            onChange={(e) => {
                              setErrorimage(false);
                              setimage(e.target.files[0]);
                            }}
                          />
                          {Errorimage && (
                            <span className="text-danger">Select Image</span>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">
                          Compatibility Check
                        </div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Compatibility Check"
                            autoComplete="off"
                            value={compatibilityCheck}
                            onChange={(e) => {
                              setErrorcompatibilityCheck(false);
                              setcompatibilityCheck(e.target.value);
                            }}
                          />
                          {ErrorcompatibilityCheck && (
                            <span className="text-danger">
                              Enter Compatibility Check
                            </span>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={6} lg={6} xs={12}>
                        <div className="text_filed_heading">Final Weight</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Final Weight"
                            autoComplete="off"
                            value={finalWeight}
                            onChange={(e) => {
                              setErrorfinalWeight(false);
                              setfinalWeight(e.target.value);
                            }}
                          />{" "}
                          {ErrorfinalWeight && (
                            <span className="text-danger">
                              Enter Final Weight
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
                      onClick={addproductData}
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
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(Product);

import React, { useState, useEffect } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import axios from "axios";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";
import { showNotificationMsz } from "../utils/Validation";

//import css
import "./AdminLogin.css";

const AdminLogin = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  

  const [isloading, setisloading] = useState(false);

  const LoginUser = () => {
    let url = getBaseUrl() + "admin/login";
    setisloading(true);

    let temp = {
      email,
      password,
    };
    axios
      .post(url, temp)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisloading(false);
          props.history.push("/home");
          localStorage.setItem("token" ,res.data.loginToken)
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
  };

  return (
    <>
      <div className="admin_card">
        <h5 className="font_change ml-2 mb-4">
          <i class="fa fa-lock"></i> Please enter your login details.
        </h5>
        <Card className="card_shadow">
          <TextField
            id="standard-password-input"
            className="email_field m-3"
            label="User Id"
            type="text"
            autoComplete="on"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-password-input"
            className="email_field m-3"
            label="Password"
            type="password"
            autoComplete="on"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <span
            className="forgot_pass ml-3"
            onClick={() => props.history.push("/emailverify")}
          >
            Forgotten Password
          </span>
          <br />
          <span className="text-center mt-2">
            <Button
              color="primary"
              className="login_btn text-centre ml-2 mt-2 mb-3 mt-3"
              onClick={LoginUser}
            >
              <i class="fa fa-key pr-1"></i>Login
            </Button>
          </span>
        </Card>
      </div>

      <Loder loading={isloading} />
    </>
  );
};

export default AdminLogin;

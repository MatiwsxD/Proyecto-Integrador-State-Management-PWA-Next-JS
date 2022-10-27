import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, makeStyles } from "@material-ui/core";
import LoginIcon from '@mui/icons-material/Login';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ListItemIcon from "@mui/material/ListItemIcon";
import { ThemeContext } from "../../ThemeContext";
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import "./login.scss";

const Login = () => {
  const { state } = useContext(ThemeContext);
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 310,
    margin: "20px auto",
    background: `${state.isDarkMode ? "rgb(98, 3, 187)" : "white"}`,
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const useStyles = makeStyles({
    inputlight: {
      color: "black",
    },
    inputdark: {
      color: "white",
    },
  });

  let sendLoginRequest = async()=>{
    if(email != "" || password !=""){
        let responseRequest = await fetch("http://localhost:8080/v1/auth",{
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }).then(response => response.json()).then(json => {
            window.$token=json.token;
            window.$expiration=json.expirationDate;
            navigate("../tasks")
        });
    }

}
  const classes = useStyles();
  return (
    <Grid>
      <form onSubmit={sendLoginRequest} className="">
        <Paper elevation={10} style={paperStyle} className="card">
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LoginIcon />
            </Avatar>
            <h2 className={`${state.isDarkMode ? "dark" : "light"}`}>
              Iniciar Sesion
            </h2>
          </Grid>
          <div>
            <div>
              <ListItemIcon>
                <SupervisedUserCircleIcon
                  className={`${state.isDarkMode ? "dark" : "light"}`}
                />{" "}
              </ListItemIcon>
              <TextField
                inputProps={{
                  className: `${
                    state.isDarkMode ? classes.inputdark : classes.inputlight
                  } `,
                }}
                variant="outlined"
                id="user"
                name="user"
                label="Username"
                type="email"
                value={email?.email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <br></br>
            <div>
              <ListItemIcon>
                <VpnKeyOutlinedIcon
                  className={`${state.isDarkMode ? "dark" : "light"}`}
                />{" "}
              </ListItemIcon>
              <FormControl
                className={`${state.isDarkMode ? "dark" : "light"}`}
                variant="outlined"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  value={password}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  inputProps={{
                    className: `${
                      state.isDarkMode ? classes.inputdark : classes.inputlight
                    }`,
                  }}
                  fullWidth
                  label="Password"
                  id="outlined-adornment-password-login"
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
            </div>
          </div>
          <br />
          <br />
          <br />
          <IconButton aria-label="fingerprint" color="success" onClick={sendLoginRequest}>
                        <Fingerprint /> Sign in
                    </IconButton>
        </Paper>
      </form>
    </Grid>
  );
};

export default Login;
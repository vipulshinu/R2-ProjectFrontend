import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import themeDefault from './themedefault';
import "./admin/css/Login.css";

import {login} from "./service/service";

const styles = {

    paper: {
        padding: 20,
        overflow: 'auto'
    },
};


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            user:"",
            mobileNumber:0
        }
    }

    login(){
        const body ={
            'id':this.state.mobileNumber
        }
      login(body)
          .then(result => {
                return result.text();
            })
            .then(response=>{
                console.log("response",response);
                this.setState({user:response});
                if(response === "ADMIN"){
                    this.props.history.push("/admin")
                }
                else if(response === "MERCHANT"){
                    this.props.history.push("/merchant")
                }
                else if(response === "CONSUMER"){
                    console.log("dsf")
                    localStorage.setItem("USER",response);
                    localStorage.setItem("NUMBER",this.state.mobileNumber);
                    this.props.history.push({
                        pathname:'/consumer'
                    })

                }
            })
            .catch(error=>console.log(error))
    }

    render() {
        return (
            <div>
                <div>
                   <h1 className="logo">E-Voucher</h1>
                </div>
                <div>
                <MuiThemeProvider muiTheme={themeDefault}>
                    <div>
                        <div className= "loginContainer">

                            <Paper style={styles.paper}>

                                <form>
                                    <TextField
                                        id="mobileNo"
                                        hintText="Mobile Number"
                                        floatingLabelText="Mobile Number"
                                        fullWidth={true}
                                        type="text"
                                        onChange={e => this.setState({mobileNumber: e.target.value})}
                                    />

                                    <div>
                                            <RaisedButton label="Login"
                                                          primary={true}
                                                          className="loginBtn"
                                                          onClick={this.login}
                                            />
                                    </div>
                                </form>
                            </Paper>
                        </div>
                    </div>
                </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

export default Login;
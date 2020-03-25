import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import themeDefault from "../../themedefault";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import "../css/Merchant.css";
import {redeemVouchers} from "../../service/service";
import Button from "@material-ui/core/Button";

const styles = {

    paper: {
        padding: 20,
        overflow: 'auto'
    },
};
export default class Merchant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voucherId:localStorage.getItem("VOUCHER_ID")
        }
    }

    redeem=()=>{
        const body={
            'voucherId':this.state.voucherId
        }
        redeemVouchers(body)
            .then(result=>{
                alert("Redeemed Successfully");
                this.setState({voucherId:""});
                result.json();
            })
    };

    render() {
        return (
            <div>
                <div>
                    <div>
                        <h1 className="logo">Merchant Shop</h1>
                        <Button style={{right:10,position:'fixed'}} variant="contained" color="primary" onClick={()=>this.props.history.replace("/")}>
                            Logout
                        </Button>
                    </div>
                    <div>
                        <MuiThemeProvider muiTheme={themeDefault}>
                            <div>
                                <div className= "merchantContainer">

                                    <Paper style={styles.paper}>

                                        <form>
                                            <TextField
                                                id="Voucher code"
                                                hintText="Voucher code"
                                                floatingLabelText="Voucher code"
                                                fullWidth={true}
                                                type="text"
                                                value={this.state.voucherId}
                                                onChange={e => this.setState({voucherId: e.target.value})}
                                            />

                                            <div>
                                                <RaisedButton label="Redeem"
                                                              primary={true}
                                                              className="redeemBtn"
                                                              onClick={this.redeem}
                                                />
                                            </div>
                                        </form>
                                    </Paper>
                                </div>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}
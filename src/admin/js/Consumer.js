import React from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getConsumerVouchers} from "../../service/service";
import Button from '@material-ui/core/Button';

export default class Consumer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            consumerVouchers:[],
        }
    }

    componentDidMount() {

        const body = {
            'mobileNo':localStorage.getItem("NUMBER"),
            'role':localStorage.getItem("USER")
        };
        getConsumerVouchers(body)
            .then(result=>{
                return result.json();
            })
            .then(response=>{
                this.setState({
                    consumerVouchers:response
                });
            });
        console.log("state: ", this.state.consumerVouchers)
    }

    redeemVoucher=(voucher)=>{
        localStorage.setItem("VOUCHER_ID",voucher)
       this.props.history.push("/merchant")

    }

    render() {
        return (
            <div className="consumer_div">
                <Button style={{right:0,position:'fixed'}} variant="contained" color="primary" onClick={()=>this.props.history.replace("/")}>
                    Logout
                </Button>
                <TableContainer component={Paper}>
                    <Table className="consumer_table" aria-label="simple table" style={{marginTop:'30px'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Voucher ID</TableCell>
                                <TableCell>Face Value</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Is Redeemed?</TableCell>
                                <TableCell>Redeemed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.consumerVouchers.map(row => (

                                <TableRow key={row.voucherId}>
                                    <TableCell component="th" scope="row">
                                        {row.voucherId}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.faceValue}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {new Date(row.startDate).toDateString()}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {new Date(row.lastDate).toDateString()}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.redeemed ? "Yes":"No"}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button className="redeemBtn" onClick={()=>this.redeemVoucher(row.voucherId)} variant="contained" color="primary" >
                                            Redeem
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
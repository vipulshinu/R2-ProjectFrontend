import React from "react";
import {assignVouchers, getVouchers} from "../../service/service";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import "../css/Admin.css";
import {Modal} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        width: '600px',
    },
    assignBtn:{
        float:'right'
    },
    paper:{
        padding: 20,
        overflow: 'auto'
    }
});

let array = [];
export default class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            vouchers:[],
            selectedVouchers:[],
            status:false,
            assignFlag:false,
            mobileNumber:0

        }
    }

    componentDidMount() {
        getVouchers()
            .then(result=>{
                return result.json();
            })
            .then(response=>{this.setState({vouchers:response});
            console.log("vouchers",response)})
    }

    selectVouchers=(data)=>{

        array.push(data.target.value);
            this.setState({selectedVouchers: array});
    };

    assignVouchers=()=>{
        console.log(this.state.selectedVouchers);
        console.log(this.state.mobileNumber);
        const body={
            'mobileNo':this.state.mobileNumber,
            'voucherId':this.state.selectedVouchers
        };
        assignVouchers(body)
            .then(result=>{
                alert("Assigned Successfully!!");
                this.closeModal();
                return result.json();
            })
    };
    closeModal=()=>{
        this.setState({
            assignFlag:false
        })
    };
    openModal=()=>{
        this.setState({
            assignFlag:true
        })
        console.log(this.state.assignFlag)
    };

    handleInputChange=(e)=>{
        this.setState({
            mobileNumber: e.target.value
        })
    }

    render() {
        return (
            <div>

                <Button style={{left:0,position:'fixed',marginTop:'10px'}} variant="contained" color="primary" onClick={()=>this.props.history.replace("/")}>
                    Logout
                </Button>

            <div className="admin_div">
                <div>
                    <Button className="assignBtn" onClick={this.openModal} variant="contained" color="primary" >
                        Assign Vouchers
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table className="admin_table" aria-label="simple table">
                        <TableHead>
                            <TableRow style={useStyles.tableRow}>
                                <TableCell>Voucher ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.vouchers.map(row => (
                                <TableRow key={row}>
                                    <TableCell component="th" scope="row">
                                        <Checkbox onChange={this.selectVouchers} value={row}/>
                                        {row}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
                <Modal open={this.state.assignFlag} onClose={this.closeModal}>
                    <div>
                        <Paper style={useStyles.paper}>
                        <input
                            id="mobileNo"
                            type="text"
                            value={this.state.mobileNumber}
                            onChange={this.handleInputChange}
                        />

                        <Button className="okBtn" onClick={this.assignVouchers} variant="contained" color="primary" >
                            Ok
                        </Button>

                        <Button className="cancelBtn" onClick={this.closeModal} variant="contained" color="primary" >
                            Cancel
                        </Button>
                        </Paper>
                    </div>
                </Modal>
            </div>
        );
    }

}
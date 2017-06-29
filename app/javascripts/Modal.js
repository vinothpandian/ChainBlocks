import React, { PropTypes } from "react";
var ReactDOM = require('react-dom');

const Transactions = require('./Transactions');

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // var year = a.getFullYear();
  // var month = months[a.getMonth()];
  // var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =  hour + ':' + min + ':' + sec ;
  return time;
}

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.block = this.props.blockData;
  }

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.identity}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Block Details
              </h4>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Block Number</td>
                    <td>{this.block.number}</td>
                  </tr>
                  <tr>
                    <td>Mined Time</td>
                    <td>{timeConverter(this.block.timestamp)}</td>
                  </tr>
                  <tr>
                    <td>Miner</td>
                    <td>{this.block.miner}</td>
                  </tr>
                  <tr>
                    <td>Ether Balance of Miner</td>
                    <td>{web3.fromWei(web3.eth.getBalance(this.block.miner,this.block.number).valueOf(),'ether')}</td>
                  </tr>
                  <tr>
                    <td>Hash</td>
                    <td>{this.block.hash}</td>
                  </tr>
                  <tr>
                    <td>Hash of the parent block</td>
                    <td>{this.block.parentHash}</td>
                  </tr>
                  <tr>
                    <td>Number of Transactions</td>
                    <td>{this.block.transactions.length}</td>
                  </tr>
                </tbody>
              </table>
              <div id="tx"></div>

            <Transactions blockNumber={this.block.number} txns={this.block.transactions} />

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default btn-success"
                data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Modal;

//  Load bootstrap
require('expose-loader?$!expose-loader?jQuery!jquery');
require("expose-loader?Tether!tether");
require('bootstrap');
//  Load the css file
require('../stylesheets/app.css')
require('../stylesheets/box.css')
//  Connect to node using web3
var Connection = require('./connect')
Connection.start()

import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
const Modal = require('./Modal');


// function Block(block,blockNumber, txCount, timestamp) {
//   this.block = block
//   this.blockNumber = blockNumber
//   this.txCount = txCount
//   this.timestamp = timestamp
// }
//
// blocks.push(new Block(info, info.number, info.transactions.length,info.timestamp))
//

//
// var blocks = []
//
// for (var i = web3.eth.blockNumber-10; i < web3.eth.blockNumber; i++) {
//   var info = web3.eth.getBlock(i);
//   var timeStamp = timeConverter(info.timestamp)
//   var txCount = info.transactions.length
//   $("#grid").append('<div class="block" data-toggle="tooltip" data-html="true" title="<b>Mined Time :</b>'+ timeStamp +' <br/> <b>Transactions inside Block :</b>'+ txCount +'" >' + i + '<i class="fa fa-arrow-right" aria-hidden="true"></i></div>');
//   $("#grid").append('');
// }
//
// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })
// <div
//   className="block"
//   dataToggle="modal"
//   data-html="true"
//   >
//   {this.props.block.number }
//   <i className="fa fa-arrow-right" aria-hidden="true" />
// </div>



var mountNode = document.getElementById("grid")

class Blocks extends React.Component {
  render () {
    return (
      <div className="col m-3"><button type="button" className="btn-success btn-sq" data-toggle="modal" data-target={'#myModal-'+this.props.number}>
        {this.props.number} <br/>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
      <Modal identity={'myModal-'+this.props.number} blockData={this.props.block} /></div>

      )
  }
}


for (var i = web3.eth.blockNumber-48; i < web3.eth.blockNumber; i++) {
  var info = web3.eth.getBlock(i);
  var blockNumber = info.number
  var idVal = "box-"+blockNumber
  $("#grid").append('<div id="box-'+blockNumber+'"></div>');

  ReactDOM.render(
    <Blocks number={blockNumber} block={info}/>,
    document.getElementById(idVal)
  )
}

//  Load bootstrap
require("expose-loader?$!expose-loader?jQuery!jquery");
require("expose-loader?Tether!tether");
require("bootstrap");
//  Load the css file
require("../stylesheets/app.css");
require("../stylesheets/box.css");

var autoLoad = true;
var timer;

myFunction(autoLoad);

function loadBlocks() {
  autoLoad = false;
  myFunction(autoLoad);
  $('.loader').css("-webkit-animation", "none");
  $('.loader').css("-moz-animation", "none");
  $('.loader').css("-ms-animation", "none");
  $('.loader').css("animation", "none");

  var start = $('#start').val()
  var end = $('#end').val()

  if($.isNumeric(start) && $.isNumeric(end)){
    $('#grid').empty()
    for (var i = start; i <= end; i++) {
      addBlock(i)
    }
  } else {
    alert("Enter only numeric values!")
  }

  console.log();
}

function stopLoad() {
  if(autoLoad) {
    $('#stopLoad').removeClass("btn-primary").addClass("btn-success").text("Play")
    autoLoad = false;
    myFunction(autoLoad);
    $('.loader').css("-webkit-animation", "none");
    $('.loader').css("-moz-animation", "none");
    $('.loader').css("-ms-animation", "none");
    $('.loader').css("animation", "none");
  } else{
    $('#stopLoad').removeClass("btn-success").addClass("btn-primary").text("Pause")
    autoLoad = true;
    myFunction(autoLoad);
    $('.loader').css("-webkit-animation", "spin 2s linear infinite");
    $('.loader').css("-moz-animation", "spin 2s linear infinite");
    $('.loader').css("-ms-animation", "spin 2s linear infinite");
    $('.loader').css("animation", "spin 2s linear infinite");

  }
}

function restartAll(){
  location.reload()
}

$("#loadData").on("click",loadBlocks)
$("#stopLoad").on("click",stopLoad)
$("#restartAll").on("click",restartAll)




//  Connect to node using web3
var Connection = require("./connect");
Connection.start();

import React, { PropTypes } from "react";
var ReactDOM = require("react-dom");
const Modal = require("./Modal");

var mountNode = document.getElementById("grid");




















function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =  hour + ':' + min + ':' + sec ;
  return time;
}

var bgColor = "#ECF0F1";

var bordered = "1px rgb(147, 147, 147) solid"

class Blocks extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="col-12">
        <div style={{backgroundColor: bgColor}} className="card mt-5 p-3 text-center text-gray-dark">
          <div className="card-block">
            <h4  className="card-title">Block #{this.props.number}</h4>
            <h6 className="card-subtitle text-muted">Generated at {this.props.timeStamp}</h6>
            <p className="card-text mt-3">Number of Transactions: {this.props.txNumber}</p>
          </div>
          <a
            className="btn-bordered btn mx-auto btn-info rounded"
            href="#"
            data-toggle="modal"
            data-target={"#myModal-" + this.props.number}>
            View Block Details
          </a>
        </div>

        <Modal
          identity={"myModal-" + this.props.number}
          blockData={this.props.block}
        />
      </div>
    );
  }
}

var lastBlock = web3.eth.blockNumber-1;
var timeSinceLastBlock = 0;



function myFunction(runCheck) {
  if(runCheck) {
    timer = setInterval(alertFunc, 1000);
  } else {
    clearInterval(timer);
  }
}

var lastBlockID;

function alertFunc() {
  timeSinceLastBlock++;
  if (lastBlock != web3.eth.blockNumber) {
    $(lastBlockID+">div>div:first-child").removeClass("new-block")

    for (var i = lastBlock; i < web3.eth.blockNumber; i++) {
      addBlock(i);
    }

    lastBlock = web3.eth.blockNumber;


    timeSinceLastBlock = 0;
  }
  ReactDOM.render(
    <LastBlockTime time={timeSinceLastBlock} />,
    document.getElementById("lastBlockTime")
  );
}

function addBlock(i) {
  var info = web3.eth.getBlock(i);
  var blockNumber = info.number;
  var txNo = info.transactions.length;
  var idVal = "box-" + blockNumber;
  var time = timeConverter(info.timestamp);
  bgColor = "#ECF0F1";
  if (txNo>0) {
    bgColor = "#CCFCDD";
  }

  $("#grid").prepend('<div id="box-' + blockNumber + '"></div>');

  ReactDOM.render(
    <Blocks number={blockNumber} block={info} timeStamp = {time} txNumber={txNo} />,
    document.getElementById(idVal)
  );

  lastBlockID = "#box-"+ (web3.eth.blockNumber-1)


  $(lastBlockID+">div>div:first-child").addClass("new-block")


}

// for (var i = web3.eth.blockNumber-9; i < web3.eth.blockNumber; i++) {
//   addBlock(i)
// }

function LastBlockTime(props){
  return (
  <p className="lead text-center">
      Time since last block : {props.time} seconds
    </p>
)}

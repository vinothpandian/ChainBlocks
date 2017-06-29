import React, { PropTypes } from 'react'

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

class Transactions extends React.Component {

  constructor(props) {
    super(props);
  }

  createMarkup(data){
    return {__html: data };
  }

  render () {
    if (this.props.txns.length == 0) {
      return (
        <div className="text-muted">No Transactions found inside the block</div>
      )
    } else {
      var tempData = ''
      for (var i = 0; i < this.props.txns.length; i++) {
        var txData = web3.eth.getTransactionFromBlock(this.props.blockNumber,i)
        var title = "Transaction : " + (i+1)
        tempData = tempData.concat('<div class="row mb-3"> \
                                      <div class="col-md-12"> \
                                        <h6 class="ml-2 font-weight-bold">'+ title +'</h1> \
                                      </div> \
                                    </div> \
                                    <table class="table"">  \
                                    <tbody> \
                                      <tr><td>Transaction Hash</td> \
                                      <td>'+ this.props.txns[i] +'</td></tr>\
                                      <tr><td>From</td> \
                                      <td>'+ txData.from +'</td></tr>\
                                      <tr><td>To</td> \
                                      <td>'+ txData.to +'</td></tr>\
                                      <tr><td>Gas Used</td> \
                                      <td>'+ txData.gas +'</td></tr>\
                                      <tr ><td>Input</td> \
                                      <td style="word-break: break-all">'+ txData.input +'</td></tr>\
                                    </tbody></table>')
      }

      return(<div dangerouslySetInnerHTML={{__html: tempData}} />)
    }
  }
}

module.exports = Transactions;

0xe9d73ab97ee08a348eadb6889096e605af8bffee6545ef8b38cd6b7a24175014
0xd3a2e09647fdefd7e940763cdfb05c717bbc9ea9d3128684aa0716bfe8a54dfe
0x50151f0d45cedccd53d68c215f2d8153bf25bb1b51763b0ba20f5816a254777c
0xa44135f05cd3c29b7fb331e7d251176fcec6d225620def793c6f395c2816fdde

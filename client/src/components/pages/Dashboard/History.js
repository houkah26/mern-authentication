import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Segment } from 'semantic-ui-react';
import moment from 'moment';

import { API_URL }from '../../../constants';

import Loading from '../../loading';
import Table from '../../table';

const tableHeaders = [
  {name: 'Date/Time', key: 'createdAt'},
  {name: 'Transaction', key: 'action'},
  {name: 'Symbol', key: 'stockSymbol'},
  {name: 'Name', key: 'stockName'},
  {name: 'Shares', key: 'shares'},
  {name: 'Price ($)', key: 'price'},
  {name: 'Total ($)', key: 'totalValue'}
]

export default class History extends Component {
  state = {
    history: []
  }

  componentDidMount() {
    this.fetchHistory();
  }

  fetchHistory = () => {
    const token = cookie.load('token');

    axios.get(`${API_URL}/user/history`, {
      headers: { 'Authorization': token }
    })
      .then(response => {
        this.setState({ history: this.mapHistory(response.data.history) })
      })
      .catch(error => {
        console.log(error);
      });
  }

  mapHistory = (history) => {
    return history.map(transaction => {
      console.log(transaction.createdAt)
      transaction.createdAt = moment(transaction.createdAt).format('M/D/YY, LT');
      console.log(transaction.createdAt)
      transaction.totalValue = transaction.price * transaction.shares;
      return transaction;
    })
  }

  render() {
    const { history } = this.state;

    return (
      <Segment attached='bottom'>
        {history.length === 0 ?
          <Loading /> :
          <Table tableData={history} tableHeaders={tableHeaders}/>
        }
      </Segment>
    )
  }
}
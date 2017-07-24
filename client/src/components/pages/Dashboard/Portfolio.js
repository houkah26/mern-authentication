import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Segment } from 'semantic-ui-react';

import { API_URL }from '../../../constants';

import Loading from '../../loading';
import Table from '../../table';

const tableHeaders = [
  {name: 'Symbol', key: 'stockSymbol'},
  {name: 'Name', key: 'stockName'},
  {name: 'Shares', key: 'totalShares'},
  {name: 'Price Per Share ($)', key: 'price'},
  {name: 'Total Value ($)', key: 'total'}
]

export default class Portfolio extends Component {
  state = {
    portfolio: []
  }

  componentDidMount() {
    this.fetchPortfolio();
  }

  fetchPortfolio = () => {
    const token = cookie.load('token');

    axios.get(`${API_URL}/user/portfolio`, {
      headers: { 'Authorization': token }
    })
      .then(response => {
        this.setState({ portfolio: response.data.portfolio })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { portfolio } = this.state;

    return (
      <Segment attached='bottom'>
        {portfolio.length === 0 ?
          <Loading /> :
          <Table tableData={portfolio} tableHeaders={tableHeaders}/>
        }
      </Segment>
    )
  }
}
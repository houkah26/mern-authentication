import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { sortBy } from "lodash";

export default class TableSortable extends Component {
  state = {
    column: null,
    data: this.props.tableData,
    direction: null
  };

  handleSort = (clickedColumn, altSortKey) => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [altSortKey || clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  renderFooter = () => {
    const { tableFooter } = this.props;

    if (tableFooter) {
      return (
        <Table.Header>
          <Table.Row>
            {tableFooter.map((tableCell, index) =>
              <Table.HeaderCell key={index}>
                {tableCell}
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
      );
    }
  };

  render() {
    const { column, data, direction } = this.state;
    const { tableHeaders } = this.props;

    return (
      <Table sortable celled fixed striped>
        <Table.Header>
          <Table.Row>
            {tableHeaders.map(header =>
              <Table.HeaderCell
                sorted={column === header.key ? direction : null}
                onClick={this.handleSort(header.key, header.sortKey)}
                key={header.name}
              >
                {header.name}
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((stock, index) =>
            <Table.Row key={stock.stockSymbol + index}>
              {tableHeaders.map(header =>
                <Table.Cell key={header.key}>
                  {stock[header.key]}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        {this.renderFooter()}
      </Table>
    );
  }
}

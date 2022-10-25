import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridItemChangeEvent,
    GridToolbar
} from "@progress/kendo-react-grid";

import { MyCommandCell } from "./MyCommandCell";
import { insertItem, getItems, updateItem, deleteItem } from "./Services";
import { Product } from "./Interfaces";

const editField: string = "inEdit";

interface AppState {
    data: Product[]
}

class CrudOperations extends React.Component {
    state: AppState = {
        data: []
    };

    componentDidMount() {
        this.setState({
            data: getItems()
        });
    }

    CommandCell = (props: GridCellProps) => (
      <MyCommandCell
        {...props}
        edit={this.enterEdit}
        remove={this.remove}
        add={this.add}
        discard={this.discard}
        update={this.update}
        cancel={this.cancel}
        editField={editField}
        />
    );

    // modify the data in the store, db etc
    remove = (dataItem: Product) => {
        const data = deleteItem(dataItem);
        this.setState({ data });
    };

    add = (dataItem: Product) => {
        dataItem.inEdit = true;

        const data = insertItem(dataItem);
        this.setState({
            data: data
        });
    };

    update = (dataItem: Product) => {
        dataItem.inEdit = false;
        const data = updateItem(dataItem);
        this.setState({ data });
    };

    // Local state operations
    discard = () => {
        const data = [...this.state.data];
        data.splice(0, 1)
        this.setState({ data });
    };

    cancel = (dataItem: Product) => {
        const originalItem = getItems().find(
            p => p.ProductID === dataItem.ProductID
        );
        const data = this.state.data.map(item =>
            item.ProductID === originalItem.ProductID ? originalItem : item
        );

        this.setState({ data });
    };

    enterEdit = (dataItem: Product) => {
        this.setState({
            data: this.state.data.map(item =>
                item.ProductID === dataItem.ProductID ? { ...item, inEdit: true } : item
            )
        });
    };

    itemChange = (event: GridItemChangeEvent) => {
        const data = this.state.data.map(item =>
            item.ProductID === event.dataItem.ProductID
                ? { ...item, [event.field || '']: event.value }
                : item
        );

        this.setState({ data });
    };

    addNew = () => {
        const newDataItem = { inEdit: true, Discontinued: false };

        this.setState({
            data: [newDataItem, ...this.state.data]
        });
    };

    render() {
        return (
          <Grid
            style={{ height: "420px" }}
            data={this.state.data}
            onItemChange={this.itemChange}
            editField={editField}
            >
            <GridToolbar>
              <button
                title="Add new"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                onClick={this.addNew}
                    >
                Add new
              </button>
            </GridToolbar>
            <Column field="ProductID" title="Id" width="50px" editable={false} />
            <Column field="ProductName" title="Product Name" width="200px" />
            {/* <Column
              field="FirstOrderedOn"
              title="First Ordered"
              editor="date"
              format="{0:d}"
              width="150px"
                /> */}
            <Column
              field="UnitsInStock"
              title="Units"
              width="120px"
              editor="numeric"
                />
            <Column field="Discontinued" title="Discontinued" editor="boolean" />
            <Column cell={this.CommandCell} width="200px" />
          </Grid>
        );
    }
}

export default CrudOperations;
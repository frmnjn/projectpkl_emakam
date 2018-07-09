import React, { Component } from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Modal,
  ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: false,
      large: false,
      modal: false,
      list: [],
      items: "",
      quantity: "",
      price: "",
      status:"",
      activeid:"",
      activeitems:"",
      activequantity:"",
      activeprice:"",
      activestatus:""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);

    fetch('http://localhost:8000/supplier/barang')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            list: result
          });
        },
    )

    fetch('http://localhost:8000/api/get')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }




  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge(list) {
    this.setState({
      large: !this.state.large});
      this.state.activeid = list.id;
      this.state.activeitems= list.items;
      this.state.activequantity=list.quantity;
      this.state.activeprice=list.price;
      this.state.activestatus=list.status;
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  componentDidMount() {
  }

  handleChange = (e) => { 
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmitCreate = event => {
    event.preventDefault();
    console.log(this.state.list);
    fetch('http://localhost:8000/supplier/create_barang', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: this.state.items,
        quantity: this.state.quantity,
        price: this.state.price,
        status: this.state.status
      })
    })
    alert("item berhasil ditambahkan!");
  }

  handleSubmitEdit = event => {
    event.preventDefault();
    
    fetch('http://localhost:8000/supplier/edit_barang/'+this.state.activeid, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.activename,
        items: this.state.activeitems,
        quantity: this.state.activequantity,
        price: this.state.activeprice,
        status: this.state.activestatus,
      })
    })
    alert("Data items dengan id "+this.state.activeid+" berhasil di update!");
  }

  handledelete(list){
    fetch('http://localhost:8000/supplier/delete_barang/'+list.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    alert("Data items dengan id "+this.state.activeid+" berhasil di hapus!");
  }

  render() {
    return (

      <div className="animated fadeIn">
        <Row>

          <Col xl={6}>
            <Card>
              <CardHeader>
                Users
              </CardHeader>
              <CardBody>
                <Button color="primary" onClick={this.togglePrimary} className="mr-1">Create</Button>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Create New Item</ModalHeader>
                  <ModalBody>
                    <form className="form-group" onSubmit={this.handleSubmitCreate}>
                      <label>Item Name</label>
                      <input type="text" className="form-control" name="items" onChange={this.handleChange}></input>
                      <label>Quantity</label>
                      <input type="text" className="form-control" name="quantity" onChange={this.handleChange}></input>
                      <label>Price</label>
                      <input type="text" className="form-control" name="price" onChange={this.handleChange}></input>
                      <label>Status</label>
                      <input type="text" className="form-control" name="status" onChange={this.handleChange}></input>
                      <input type="submit" className="form-control btn btn-primary" value="Submit"></input>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                  </ModalFooter>
                </Modal>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">item product</th>
                      <th scope="col">quantity</th>
                      <th scope="col">price</th>
                      <th scope="col">status</th>
                      <th scope="col">edit</th>
                      <th scope="col">delete</th>
                    </tr>
                  </thead>

                  {this.state.list.map((list, index) => {
                    return (
                      <tbody key={list.id}>
                        <tr>
                          <th> {list.id} {index.value}</th>
                          <th> {list.items} </th>
                          <th> {list.quantity}</th> 
                          <th> {list.price}</th>
                          <th color="secondary"> {list.status}</th>
                          <th><Button color="success" onClick={()=>this.toggleLarge(list)} className="mr-1">Edit</Button></th>
                          <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                            className={'modal-Large ' + this.props.className}>
                            <ModalHeader toggle={this.toggleLarge}>Edit Item Product</ModalHeader>
                            <ModalBody>
                              <form className="form-group" onSubmit={this.handleSubmitEdit}>
                                <label>ID</label>
                                <input type="text" className="form-control" name="activeid" onChange={this.handleChange} value={this.state.activeid} disabled></input>
                                <label>Item Name</label>
                                <input type="text" className="form-control" name="activeitems" onChange={this.handleChange} value={this.state.activeitems}></input>
                                <label>Quantity</label>
                                <input type="text" className="form-control" name="activequantity" onChange={this.handleChange} value={this.state.activequantity}></input>
                                <label>Price</label>
                                <input type="text" className="form-control" name="activeprice" onChange={this.handleChange} value={this.state.activeprice}></input>
                                <label>Status</label>
                                <input type="text" className="form-control" name="activestatus" onChange={this.handleChange} value={this.state.activestatus} disabled></input>
                                <input type="submit" className="form-control btn btn-success" value="Submit"></input>
                              </form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                          </Modal>
                        <th><Button color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handledelete(list) } } className="mr-1">Delete</Button></th>
                        </tr>
                      </tbody>
                    )
                  })}

                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;

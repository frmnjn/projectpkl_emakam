import React, { Component } from 'react';
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
  Pagination, 
  PaginationItem, 
  PaginationLink,
  Progress,
  Row,
  Table,
  Modal,
  ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';

class ManajemenDataPenghuniMakam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: false,
      large: false,
      modal: false,
      list: [],
      nama: "",
      alamat_terakhir: "",
      tanggal_wafat: "",
      status:"",
      id_makam:"",
      nama_ahli_waris:"",
      alamat_ahli_waris:"",
      nik_ahli_waris:"",
      kontak_ahli_waris:"",
      
      activeid_penghuni_makam:"",
      activenama: "",
      activealamat_terakhir: "",
      activetanggal_wafat: "",
      activestatus:"",
      activeid_makam:"",
      activenama_ahli_waris:"",
      activealamat_ahli_waris:"",
      activenik_ahli_waris:"",
      activekontak_ahli_waris:"",
      
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);

    fetch('http://localhost:8000/api/penghuni_makam/view/')
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({            
            // dateStr = JSOsN.parse(tanggal_wafat),  
            //  console.log(dateStr); // 2014-01-01T23:28:56.782Z                
            // date : new Date(dateStr),
            // tanggal_wafat: date,
            //  console.log(date);  // Wed Jan 01 2014 13:28:56 GMT-1000 (Hawaiian Standard Time)            
           // obj = JSON.parse(result),
            //obj.tanggal_wafat = new Date(obj.tanggal_wafat);

            
            
            list: result
            
          }); //console.log(result);
        },        
    )

    // fetch('http://localhost:8000/api/get')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //console.log(responseJson);
        
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge(list) {
    this.setState({
      large: !this.state.large});
      this.state.activeid_penghuni_makam = list.id_penghuni_makam;      

      this.state.activenama= list.nama,
      this.state.activealamat_terakhir= list.alamat_terakhir,
      this.state.activetanggal_wafat= list.tanggal_wafat,
      this.state.activestatus= list.status,
      this.state.activeid_makam= list.id_makam,
      this.state.activenama_ahli_waris= list.nama_ahli_waris,
      this.state.activealamat_ahli_waris= list.alamat_ahli_waris,
      this.state.activenik_ahli_waris= list.nik_ahli_waris,
      this.state.activekontak_ahli_waris= list.kontak_ahli_waris
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
    fetch('http://localhost:8000/api/penghuni_makam/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.nama,
        alamat_terakhir: this.state.alamat_terakhir,
        tanggal_wafat: this.state.tanggal_wafat,
        status: this.state.status,
        id_makam: this.state.id_makam,
        nama_ahli_waris: this.state.nama_ahli_waris,
        alamat_ahli_waris: this.state.alamat_ahli_waris,
        nik_ahli_waris: this.state.nik_ahli_waris,
        kontak_ahli_waris: this.state.kontak_ahli_waris
      })
    })
    console.log(JSON);
    alert("Data penghuni baru berhasil ditambahkan!");
  }

  handleSubmitEdit = event => {
    event.preventDefault();
    
    fetch('http://localhost:8000/api/penghuni_makam/update/'+this.state.activeid_penghuni_makam, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.activenama,
        alamat_terakhir: this.state.activealamat_terakhir,
        tanggal_wafat: this.state.activetanggal_wafat,
        status: this.state.activestatus,
        id_makam: this.state.activeid_makam,
        nama_ahli_waris: this.state.activenama_ahli_waris,
        alamat_ahli_waris: this.state.activealamat_ahli_waris,
        nik_ahli_waris: this.state.activenik_ahli_waris,
        kontak_ahli_waris: this.state.activekontak_ahli_waris
      })
    })
    alert("Data items dengan id "+this.state.activeid_penghuni_makam+" berhasil di update!");
  }

  handledelete(list){
    fetch('http://localhost:8000/api/penghuni_makam/delete/'+list.id_penghuni_makam, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    alert("Data user dengan id "+this.state.activeid_penghuni_makam+" berhasil di hapus!");
  }

  render() {
    return (

      <div className="animated fadeIn">
        <Row>

          <Col xl={12}>
            <Card>
              <CardHeader>
                Tabel Data Penghuni Makam
              </CardHeader>
              <CardBody>                
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Buat Data Penghuni Makam</ModalHeader>
                  <ModalBody>
                    <form className="form-group" onSubmit={this.handleSubmitCreate}>
                      <label>Nama Penghuni Makam</label>
                      <input type="text" className="form-control" name="nama"placeholder="nama" onChange={this.handleChange}></input>
                      <label>Alamat Terakhir</label>
                      <input type="text" className="form-control" name="alamat_terakhir"placeholder="Jl.abc" onChange={this.handleChange}></input>
                      <label>Tanggal Wafat</label>
                      <input type="text" className="form-control" name="tanggal_wafat" placeholder="tahun-bulan-tanggal"onChange={this.handleChange}></input>
                      <label>Status</label>
                      <input type="text" className="form-control" name="status" placeholder="1/2/3"onChange={this.handleChange}></input>
                      <label>Pilih Nomor Makam (ID Makam)</label>
                      <input type="text" className="form-control" name="id_makam" placeholder="dropdown"onChange={this.handleChange}></input>
                      <label>Nama Ahli Waris</label>
                      <input type="text" className="form-control" name="nama_ahli_waris"placeholder="nama_ahli_waris" onChange={this.handleChange}></input>
                      <label>Alamat Ahli Waris</label>
                      <input type="text" className="form-control" name="alamat_ahli_waris" placeholder="jl.abc"onChange={this.handleChange}></input>
                      <label>NIK Ahli Waris</label>
                      <input type="text" className="form-control" name="nik_ahli_waris"placeholder="1111111" onChange={this.handleChange}></input>
                      <label>Kontak Ahli Waris</label>
                      <input type="text" className="form-control" name="kontak_ahli_waris" placeholder="+6219238719238"onChange={this.handleChange}></input>
                      <input type="submit" className="form-control btn btn-primary" value="Submit"></input>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                  </ModalFooter>
                </Modal>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Alamat Terakhir</th>
                      <th scope="col">Tanggal Wafat</th>
                      <th scope="col">Status</th>
                      <th scope="col">ID Makam</th>
                      <th scope="col">Nama Ahli Waris</th>
                      <th scope="col">Alamat Ahli Waris</th>
                      <th scope="col">NIK Ahli Waris</th>
                      <th scope="col">Kontak Ahli Waris</th>
                      <th scope="col">Lihat Detail</th>
                      <th scope="col">Edit Data</th>
                      <th scope="col">Hapus Data </th>
                    </tr>
                  </thead>

                  {this.state.list.map((list, index) => {
                    return (
                      <tbody key={list.id_penghuni_makam}>
                        <tr>
                          <th> {list.id_penghuni_makam} {index.value}</th>
                          <th> {list.nama} </th>
                          <th> {list.alamat_terakhir}</th> 
                          <th> {list.tanggal_wafat}</th>                           
                          <th> {list.status}</th>
                          <th> {list.id_makam}</th>
                          <th> {list.nama_ahli_waris}</th>
                          <th> {list.alamat_ahli_waris}</th> 
                          <th> {list.nik_ahli_waris}</th> 
                          <th> {list.kontak_ahli_waris}</th>
                          <th><Button color="info" onClick={()=>this.toggleLarge(list)} className="mr-1">Lihat</Button></th> 
                          <th><Button color="success" onClick={()=>this.toggleLarge(list)} className="mr-1">Edit</Button></th>
                          <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                            className={'modal-Large ' + this.props.className}>
                            <ModalHeader toggle={this.toggleLarge}>Edit Data Penghuni Makam</ModalHeader>
                            <ModalBody>
                              <form className="form-group" onSubmit={this.handleSubmitEdit}>
                                <label>ID</label>
                                <input type="text" className="form-control" name="activeid_penghuni_makam" onChange={this.handleChange} value={this.state.activeid_penghuni_makam} disabled></input>
                                <label>Nama Penghuni Makam</label>
                                <input type="text" className="form-control" name="activenama" onChange={this.handleChange} value={this.state.activenama}></input>
                                <label>Alamat Terakhir</label>
                                <input type="text" className="form-control" name="activealamat_terakhir" onChange={this.handleChange} value={this.state.activealamat_terakhir}></input>
                                <label>Tanggal Wafat</label>
                                <input type="text" className="form-control" name="activetanggal_wafat" onChange={this.handleChange} value={this.state.activetanggal_wafat}></input>
                                <label>Status</label>
                                <input type="text" className="form-control" name="activestatus" onChange={this.handleChange} value={this.state.activestatus}></input>
                                <label>ID Makam</label>
                                <input type="text" className="form-control" name="activeid_makam" onChange={this.handleChange} value={this.state.activeid_makam}></input>
                                <label>Nama Ahli Waris</label>
                                <input type="text" className="form-control" name="activenama_ahli_waris" onChange={this.handleChange} value={this.state.activenama_ahli_waris}></input>
                                <label>Alamat Ahli Waris</label>
                                <input type="text" className="form-control" name="activealamat_ahli_waris" onChange={this.handleChange} value={this.state.activealamat_ahli_waris}></input>
                                <label>NIK Ahli Waris</label>
                                <input type="text" className="form-control" name="activenik_ahli_waris" onChange={this.handleChange} value={this.state.activenik_ahli_waris}></input>
                                <label>Kontak Ahli Waris</label>
                                <input type="text" className="form-control" name="activekontak_ahli_waris" onChange={this.handleChange} value={this.state.activekontak_ahli_waris}></input>                                
                                <input type="submit" className="form-control btn btn-success" value="Submit"></input>
                              </form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                          </Modal>
                        <th><Button color="danger" onClick={() => { if (window.confirm('Anda yakin untuk menghapus Data ini?')) this.handledelete(list) } } className="mr-1">Delete</Button></th>
                        </tr>
                      </tbody>
                    )
                  })}

                </Table>               
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                  <Button color="primary" onClick={this.togglePrimary} className="mr-1">Create</Button>
                </nav>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ManajemenDataPenghuniMakam;

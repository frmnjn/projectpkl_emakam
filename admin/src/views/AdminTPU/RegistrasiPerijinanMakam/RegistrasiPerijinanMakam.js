import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';
import { RingLoader } from 'react-spinners';
const data = new FormData();
class RegistrasiPerijinanMakam extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makam_items = this.makam_items.bind(this);

    this.state = {
      startDate: moment(),

      makam: [],
      makamitems:[],
      list: [],

      nama: "",
      alamat_terakhir: "",
      tanggal_wafat: '',
      jenis_kelamin:'',
      tanggal_lahir_alm: '',
      tanggal_pemakaman: '',
      tgllhr_ahli_waris: '',
      status: "",
      pekerjaan:'',
      id_makam: "",
      kode_makam: "",
      nama_ahli_waris: "",
      alamat_ahli_waris: "",
      nik_ahli_waris: "",
      email:'',
      kontak_ahli_waris: "",
      
      activetanggal_wafat: '',

      selectvalue: null,
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/makam/view?token=' + sessionStorage.getItem('token') + '&id_user=' + sessionStorage.getItem('id_user'))
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            makam: result,
            isLoaded: true
          }); //console.log(result);
        })
  }

  onchange(e) {
    data.append(e.target.name, e.target.files[0]);
  }

  onchangeText = (e) => {
    data.append(e.target.name, e.target.value);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  makam_items() {
    var newitem = [];
    this.state.makam.map((items) => {
      newitem = newitem.concat({ value: items.id_makam+"-"+items.id_tpu+"-"+items.id_kecamatan, label: items.kode_makam})
    })

    return newitem
  }

  handleSubmitCreate = event => {
    event.preventDefault();
    fetch('http://localhost:8000/api/penghuni_makam/create?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.nama,
        jenis_kelamin: this.state.jenis_kelamin,
        alamat_terakhir: this.state.alamat_terakhir,
        tanggal_wafat: this.state.tanggal_wafat.format().substring(0, 10),
        tanggal_lahir_alm: this.state.tanggal_lahir_alm.format().substring(0, 10),
        tanggal_pemakaman: this.state.tanggal_pemakaman.format().substring(0, 10),
        status: this.state.status,
        id_makam: this.state.id_makam,
        nama_ahli_waris: this.state.nama_ahli_waris,
        alamat_ahli_waris: this.state.alamat_ahli_waris,
        nik_ahli_waris: this.state.nik_ahli_waris,
        kontak_ahli_waris: this.state.kontak_ahli_waris,
      })
    }).then(
      this.fetchall
    ).then(
      this.setState({
        primary: !this.state.primary
      })
    )
    alert("Data penghuni baru berhasil ditambahkan!");
  }

  handleDateWafat =(date)=> {
    this.setState({
      tanggal_wafat: date,
    });
  }

  handleDateLhrAlm =(date)=> {
    this.setState({
      tanggal_lahir_alm: date,
    });
  }

  handleDatePemakaman =(date)=> {
    this.setState({
      tanggal_pemakaman: date,
    });
  }

  handleDateLhrWrs =(date)=> {
    this.setState({
      tgllhr_ahli_waris: date,
    });
  }

  handleSelect = (selectedOption) =>{
    var split = selectedOption.value.split('-');
    // alert(split[0]+" - "+split[1]+" - "+split[2])
    this.setState({ 
      selectedOption,
      activeid_makam: split[0],
      id_makam: split[0],
      id_tpu:split[1],
      id_kecamatan:split[2]
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    data.append('nama_almarhum',this.state.nama);
    data.append('nama_pewaris',this.state.nama_ahli_waris);
    data.append('email',this.state.email);
    data.append('id_tpu',this.state.id_tpu);
    data.append('id_kecamatan',this.state.id_kecamatan);
    data.append('tgllhr_ahli_waris',this.state.tgllhr_ahli_waris.format().substring(0, 10));
    data.append('pekerjaan_ahli_waris',this.state.pekerjaan);



    // for (var value of data.values()) {
    //   console.log(value);
    // }

    fetch('http://localhost:8000/api/penghuni_makam/create?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: this.state.nama,
        jenis_kelamin: this.state.jenis_kelamin,
        alamat_terakhir: this.state.alamat_terakhir,
        tanggal_wafat: this.state.tanggal_wafat.format().substring(0, 10),
        tanggal_lahir_alm: this.state.tanggal_lahir_alm.format().substring(0, 10),
        tanggal_pemakaman: this.state.tanggal_pemakaman.format().substring(0, 10),
        status: this.state.status,
        id_makam: this.state.id_makam,
        nama_ahli_waris: this.state.nama_ahli_waris,
        alamat_ahli_waris: this.state.alamat_ahli_waris,
        nik_ahli_waris: this.state.nik_ahli_waris,
        kontak_ahli_waris: this.state.kontak_ahli_waris,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.id_penghuni_makam)
      data.append('id_penghuni_makam',responseJson.id_penghuni_makam);
      
      fetch('http://localhost:8000/api/dokumen/upload?token=' + sessionStorage.getItem('token'), {
      method: 'POST',
      body: data
      }).then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson);
        })
    })

    
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col col="10" ><strong>Registrasi Perijinan Makam</strong></Col>
                  <Col col="2" className="text-right">
                    {/* <Button onClick={this.toggleCreate} outline color="primary">Create</Button> */}
                  </Col>
                </Row></CardHeader>
              
              <CardBody>
                {/* <hr></hr> */}
                <Col xs="4">
                  <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                      <a4><strong>Form Ahli Waris</strong></a4><br/><br/>
                        <label>Nama</label>
                        <input type="text" className="form-control" name="nama_ahli_waris" placeholder="Nama Ahli Waris" onChange={this.handleChange}></input>
                        <label>Alamat</label>
                        <input type="text" className="form-control" name="alamat_ahli_waris" placeholder="Alamat Ahli Waris" onChange={this.handleChange}></input>
                        <label>Tanggal Lahir</label>
                        <DatePicker name="tgllhr_ahli_waris" dateFormat="DD/MM/YYYY" selected={this.state.tgllhr_ahli_waris} onChange={this.handleDateLhrWrs} />
                        <label>NIK</label>
                        <input type="text" className="form-control" name="nik_ahli_waris" placeholder="NIK Ahli Waris" onChange={this.handleChange}></input>
                        <label>Kontak</label>
                        <input type="text" className="form-control" name="kontak_ahli_waris" placeholder="Kontak Ahli Waris" onChange={this.handleChange}></input>
                        {/* <input type="submit" className="form-control btn btn-primary" value="Submit"></input> */}                      
                        <label>Email</label>
                        <input type="text" className="form-control" name="email" placeholder="Email Ahli Waris" onChange={this.handleChange}></input>
                        {/* <input type="submit" className="form-control btn btn-primary" value="Submit"></input> */}                      
                        <label>Pekerjaan</label>
                        <input type="text" className="form-control" name="pekerjaan" placeholder="Pekerjaan Ahli Waris" onChange={this.handleChange}></input>

                        <hr/>
                      <a4><strong>Form Almarhum</strong></a4><br/><br/>
                        <label>Nama Penghuni Makam</label>
                        <input type="text" className="form-control" name="nama" placeholder="Nama Penghuni" onChange={this.handleChange}></input>
                        <br />
                        <label>Jenis Kelamin</label>
                        <Input type="select" className="form-control" name="jenis_kelamin" onChange={this.handleChange}>
                          <option value=''>Pilih</option>
                          <option value='Laki-Laki'>Laki-Laki</option>
                          <option value='Perempuan'>Perempuan</option>
                        </Input><br/>
                        <label>Alamat Terakhir</label>
                        <input type="text" className="form-control" name="alamat_terakhir" placeholder="Alamat Terakhir" onChange={this.handleChange}></input>
                        <br />
                        <label>Tanggal Lahir</label>
                        <DatePicker name="tanggal_lahir_alm" dateFormat="DD/MM/YYYY" selected={this.state.tanggal_lahir_alm} onChange={this.handleDateLhrAlm} />
                        <br />
                        <label>Tanggal Wafat</label>
                        <DatePicker name="tanggal_wafat" dateFormat="DD/MM/YYYY" selected={this.state.tanggal_wafat} onChange={this.handleDateWafat} />
                        <br />
                        <label>Tanggal Pemakaman</label>
                        <DatePicker name="tanggal_pemakaman" dateFormat="DD/MM/YYYY" selected={this.state.tanggal_pemakaman} onChange={this.handleDatePemakaman} />
                        <br />
                        <label>Status</label>
                        <Input type="select" className="form-control" name="status" onChange={this.handleChange}>
                          <option value=''>pilih</option>
                          <option value='Diperpanjang'>Diperpanjang</option>
                          <option value='Expired'>Expired</option>
                          <option value='Ditimpa'>Ditimpa</option>
                        </Input><br/>
                        <label>Pilih Nomor Makam (Kode Makam)</label>
                        <Select
                          value={this.state.selectedOption}
                          onChange={this.handleSelect}
                          options={this.makam_items()}
                        />
                        {/* <Input type="select" className="form-control" name="id_makam" onChange={this.handleChange}>
                              {this.state.makam.map((items) => {
                                return (
                                  <option value={items.id_makam}>{items.kode_makam}</option>
                                )
                              }
                              )}
                            </Input> */}
                      <hr/>
                      <a4><strong>File Scan</strong></a4><br/><br/>
                        <label for="file_ktp">
                          KTP Almarhum:
                        <input type="file" onChange={this.onchange} class="form-control-file" name="file_ktp" />
                        </label>
                        <br />
                        <label for="file_kk">
                          KK Almarhum:
                        <input type="file" onChange={this.onchange} class="form-control-file" name="file_kk" />
                        </label>
                        <br />
                        <label for="file_kk">
                          Scan Surat ijin:
                        <input type="file" onChange={this.onchange} class="form-control-file" name="file_surat_izin" />
                        </label>
                        <br />
                        <label for="file_sk">
                          Scan Surat Kematian:
                        <input type="file" onChange={this.onchange} class="form-control-file" name="file_sk" />
                        </label>
                        <br />
                        <label for="file_sk_lama">
                          Scan SK lama (optional):
                        <input type="file" onChange={this.onchange} class="form-control-file" name="file_sk_lama" />
                        </label>
                        <br />
                        <hr/>
                        <input  type="submit" value="Submit"></input>
                    </div>
                  </form>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>

          </Col>
        </Row>
      </div>
    );
  }
}

export default RegistrasiPerijinanMakam;

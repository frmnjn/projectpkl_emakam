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
import ReactTable from "react-table";
import { RingLoader } from 'react-spinners';
import 'react-table/react-table.css'

class CetakDokumen extends Component {
  constructor(props) {
    super(props);

    this.cetak_dokumen = this.cetak_dokumen.bind(this);
    // this.get_active_row = this.get_active_row.bind(this);

    this.state = {
      radioSelected: 2,
      isLoaded: false,
      items: [],
      activenamapenghuni: null,
      activenamapewaris: null,
      activetanggal: null,
      activetanggal_sekarang: null,
      activenik_ahli_waris: null,
      activekontak_ahli_waris: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/dokumen/view_siap_cetak?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json,
          });
        },
    )
  }

  get_tanggal_sekarang() {
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    // var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    // var thisDay = date.getDay(),
    //   thisDay = myDays[thisDay];
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;
    return (day + ' ' + months[month] + ' ' + year);
  }

  cetak_dokumen(row) {
    const url = 'http://localhost:8000/api/dokumen/cetak_surat_perizinan?token=' + sessionStorage.getItem('token')
    +'&tanggal_sekarang='+this.get_tanggal_sekarang()            
    +'&nama_ahli_waris='+row.nama_pewaris
    +'&alamat_ahli_waris='+row.alamat_ahli_waris
    +'&nama_almarhum='+row.nama_almarhum
    +'&ttl_almarhum='+row.tanggal_lahir_alm
    +'&jenis_kelamin_almarhum='+row.jenis_kelamin
    +'&tpu_almarhum='+row.nama_tpu
    +'&tanggal_pemakaman='+row.tanggal_pemakaman
    +'&blok_almarhum='+row.kode_blok
    window.location = url;
  }


  render() {
    if (!this.state.isLoaded) {
      return (<div style={{ display: 'flex', justifyContent: 'center', margin: 100 }}>
        <div className='sweet-loading'>
          <RingLoader
            color={'#123abc'}
          />
        </div>
      </div>)
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  Cetak Dokumen
              </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.items}
                    resolveData={data => data.map(row => row)}
                    defaultPageSize={10}
                    columns={[
                      { accessor: 'id', show: false },
                      { accessor: 'nama_almarhum', show: false },
                      { accessor: 'nik_ahli_waris', show: false },
                      { accessor: 'alamat_ahli_waris', show: false },
                      { accessor: 'tanggal_wafat', show: false },
                      { accessor: 'tanggal_lahir_alm', show: false },
                      { accessor: 'tanggal_pemakaman', show: false },
                      { accessor: 'tgllhr_ahli_waris', show: false },
                      { accessor: 'jenis_kelamin', show: false },
                      { accessor: 'nama_tpu', show: false },
                      { accessor: 'alamat_terakhir', show: false },
                      { accessor: 'kode_blok', show: false },
                      {
                        Header: 'Nama Almarhum',
                        accessor: 'nama_almarhum', // String-based value accessors!
                      },
                      {
                        Header: 'Nama Pewaris',
                        accessor: 'nama_pewaris', // String-based value accessors!
                      },
                      {
                        Header: 'Tanggal Wafat',
                        accessor: 'tanggal_wafat', // String-based value accessors!
                      },
                      {
                        Header: 'Kelengkapan Dokumen',
                        accessor: 'kelengkapan_dokumen', // String-based value accessors!
                        show: false
                      },
                      {
                        Header: 'Actions',
                        // accessor: 'status', // String-based value accessors!
                        Cell: row => (
                          <div>
                            <Button color="info" onClick={() => this.cetak_dokumen(row.row)} className="mr-1">Cetak Dokumen</Button>
                          </div>
                        )
                      },
                    ]}
                  />
                  <hr></hr>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default CetakDokumen;

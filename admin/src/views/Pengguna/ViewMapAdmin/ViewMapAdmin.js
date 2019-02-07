import React, { Component } from 'react';

import {
  Button,
  Container,
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { RingLoader } from 'react-spinners';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import moment from 'moment';
import Select from 'react-select';
import ReactTable from "react-table";
import ReactDOM from "react-dom";


const center = {
  marginLeft: '45%'
};


const yicon = { url: process.env.PUBLIC_URL + '/marker-xxl-y.png', scaledSize: { width: 32, height: 32 } };
const ricon = { url: process.env.PUBLIC_URL + '/marker-xxl-r.png', scaledSize: { width: 32, height: 32 } };
const gicon = { url: process.env.PUBLIC_URL + '/marker-xxl-g.png', scaledSize: { width: 32, height: 32 } };



class ViewMapAdmin extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.toggleHistory = this.toggleHistory.bind(this);
    this.toggleHistoryClose = this.toggleHistoryClose.bind(this)

    this.state = {
      hasil: [],
      status: "",
      tpuselected: false,
      blok_items_by_tpu: [],
      items: [],
      itemsTPU: [],
      penghuni: [],
      showitems: [],
      showitemsTPU: [],
      forfilter: [],
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    // console.log(marker)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  toggleHistory() {
    // console.log(items)
    this.setState({
      history: !this.state.history,
      // kodeaktif:items.id_makam,
    })
  }

  toggleHistoryClose() {
    this.setState({
      history: !this.state.history,
    })
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  load() {
    // alert('is it working ?')
    return (
      this.state.showitems.map((hasil, index) => (
        <Marker icon={this.status_terisi(hasil)} position={{ lat: hasil.lat, lng: hasil.lng }} onClick={this.onMarkerClick}
          name={hasil.kode_makam} id={hasil.id_makam} >
        </Marker>


      ))

    )
  }

  // options_select() {
  //   if (this.state.tpuselected) {

  //   } else {
  //     return this.select_items()
  //   }
  // }

  select_items_blok_filtered() {
    console.log(this.state.blok_items_by_tpu)
    var newitem = [];
    this.state.blok_items_by_tpu.map((items) => {
      newitem = newitem.concat({ value: items.id_blok, label: items.kode_blok })
    })

    console.log(newitem)
    return newitem
  }

  select_items() {
    var newitem = [];
    if (this.state.tpuselected) {
      this.state.blok_items_by_tpu.map((items) => {
        newitem = newitem.concat({ value: items.id_blok, label: items.kode_blok })
      })
    } else {
      this.state.forfilter.map((items) => {
        newitem = newitem.concat({ value: items.id_blok, label: items.kode_blok })
      })
    }


    return newitem
  }

  select_items_TPU() {
    var newitemTPU = [];
    this.state.itemsTPU.map((item) => {
      newitemTPU = newitemTPU.concat({ value: item.id_tpu, label: item.kode_tpu })
    })

    return newitemTPU
  }

  handleSelect = (selectedOption) => {
    //alert(selectedOption.value)
    // var split = selectedOption.value.split('-');
    // var label = split[3].split('-')
    // alert(split[0]+" - "+split[1]+" - "+split[2])
    this.setState({
      selectedOption,
      showitems: this.filter_items(selectedOption.value),
      // activeid_makam: split[0],
      // id_makam: split[0],
      // id_tpu:split[1],
      // id_kecamatan:split[2],
      // kode_registrasi:label[0],
    });
  }

  handleSelectTPU = (selectedOptionTPU) => {
    //alert(selectedOptionTPU.value)
    // var split = selectedOption.value.split('-');
    // var label = split[3].split('-')
    // alert(split[0]+" - "+split[1]+" - "+split[2])
    this.setState({
      selectedOptionTPU,
      showitems: this.filter_items_TPU(selectedOptionTPU.value),
      tpuselected: true,
      // activeid_makam: split[0],
      // id_makam: split[0],
      // id_tpu:split[1],
      // id_kecamatan:split[2],
      // kode_registrasi:label[0],
    });

    fetch("http://localhost:8000/api/view_blok_by_idTPU?id_tpu=" + selectedOptionTPU.value)
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            blok_items_by_tpu: json,
          });
        },
      )

    return this.select_items_blok_filtered()
  }

  filter_items(id) {
    var newitem
    newitem = this.state.items.filter(function (item) {
      return item.id_blok == id
    })

    console.log(newitem)

    return newitem

  }

  filter_items_TPU(id) {
    var newitem
    newitem = this.state.items.filter(function (item) {
      return item.id_tpu == id
    })

    console.log(newitem)

    return newitem


  }

  filter_history() {
    var data = this.state.penghuni
    var selectedplace = this.state.selectedPlace
    var newitem = data.filter(function (item) {
      return item.id_makam == selectedplace.id
    })
    console.log(newitem)
    return newitem
  }

  status_terisi(data) {
    var item = this.state.penghuni
    var today = moment()

    item = item.filter(function (item) {
      return item.id_makam.toString().search(data.id_makam.toString()) !== -1
    })

    var status = 'yellow'
    var ms = today.diff(moment(data.created_at));
    var yearspan = Math.floor(moment.duration(ms).asYears())

    item.map((items) => {
      status = 'Terisi'
    })

    // alert(status)

    if (status == 'Terisi') {

      if (yearspan < 2) {
        // alert('is this even go here ?')

        return ricon
        // status = 'red'
      } else if (yearspan < 3) {
        return ricon
        // status = 'grey'
      } else {
        return gicon
        // status = 'green'
      }

    } else {
      return yicon
    }


  }

  onInfoWindowOpen(props, e) {
    const button = (
      <button
        onClick={this.toggleHistory}
      >
        detail penghuni
      </button>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById("button")
    );
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/view_all_tpu?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            itemsTPU: json,
            showitemsTPU: json,
          });
        },
      )

    fetch("http://localhost:8000/api/view_all_makam?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json,
            showitems: json,
          });
        },
      )

    fetch("http://localhost:8000/api/view_all_pmakam?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            penghuni: json
          });
        },
      )

    fetch("http://localhost:8000/api/blok/view_search?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            forfilter: json
          });
        },
      )


  }

  render() {
    console.log(this.state.items)
    console.log(this.state.hasil.nama_almarhum);
    return (
      <div>
        <Modal isOpen={this.state.history} toggle={this.toggleHistoryClose}
          className={'modal-large ' + this.props.className}>
          <ModalHeader toggle={this.state.toggleHistory}>Riwayat Penghuni Makam</ModalHeader>
          <ModalBody>
            <ReactTable
              data={this.filter_history()}
              defaultPageSize={10}
              columns={[
                { accessor: 'id_makam', show: false },
                {
                  Header: 'Nama Penghuni Makam',
                  accessor: 'nama', // String-based value accessors!
                  Cell: row => (
                    <div>{row.row.nama}
                    </div>
                  )
                },
                {
                  Header: 'Tanggal Wafat',
                  accessor: 'tanggal_wafat', // String-based value accessors!
                  Cell: row => (
                    <div>{row.row.tanggal_wafat}
                    </div>
                  )
                },
                {
                  Header: 'Tanggal Pemakaman',
                  accessor: 'tanggal_pemakaman', // String-based value accessors!
                  Cell: row => (
                    <div>{row.row.tanggal_pemakaman}
                    </div>
                  )
                },

              ]}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleHistoryClose}>Close</Button>
          </ModalFooter>
        </Modal>

        {/* MODALS */}
        <Container>
          <br />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h2>View Map</h2>
                  <Row>
                    <Col>
                      <CardBody>
                        <label>TPU</label>
                        <Select
                          value={this.state.selectedOptionTPU}
                          onChange={this.handleSelectTPU}
                          options={this.select_items_TPU()}
                        />
                        <label>Blok</label>
                        <Select
                          value={this.state.selectedOption}
                          onChange={this.handleSelect}
                          options={this.select_items()}
                          //value={'...'}
                        />
                      </CardBody>
                      
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ height: '80vh' }}>
                      <Map
                        google={this.props.google}
                        onClick={this.onMapClick}
                        initialCenter={{ lat: -7.967345, lng: 112.632462 }}
                        zoom={13}
                        style={{ width: '95%' }}

                      >
                        {this.load()}

                        <InfoWindow
                          marker={this.state.activeMarker}
                          visible={this.state.showingInfoWindow}
                          onClose={this.onClose}
                          onOpen={e => {
                            this.onInfoWindowOpen(this.props, e);
                          }}
                        >
                          <div>
                            <h3>{this.state.selectedPlace.name}</h3>
                          </div>
                          <div id="button"></div>

                        </InfoWindow>

                      </Map>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDTUAyUGbuCXiRX6ywsz4ZIAf_jDPPRwUM')
})(ViewMapAdmin);

import React, { Component } from 'react';

import {
  Container,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { RingLoader } from 'react-spinners';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import moment from 'moment';

const center = {
  marginLeft: '45%'
};


const yicon = { url: 'https://www.iconsdb.com/icons/preview/orange/marker-xxl.png', scaledSize: { width: 32, height: 32 } };
const ricon = { url: 'https://www.iconsdb.com/icons/preview/persian-red/marker-xxl.png', scaledSize: { width: 32, height: 32 } };
const gicon = { url: 'https://www.iconsdb.com/icons/preview/green/marker-xxl.png', scaledSize: { width: 32, height: 32 } };



class ViewMap extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = {
      hasil: [],
      status: "",
      items: [],
      penghuni: [],
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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
      this.state.items.map((hasil, index) => (
        <Marker icon={this.status_terisi(hasil)} position={{ lat: hasil.lat, lng: hasil.lng }} onClick={this.onMarkerClick}
          name={hasil.kode_makam} >
        </Marker>


      ))

    )
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

  componentDidMount() {
    fetch("http://localhost:8000/api/view_all_makam?token=" + sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json
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


  }

  render() {
    console.log(this.state.items)
    console.log(this.state.hasil.nama_almarhum);
    return (
      <div>
        <Container>
          <br />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h2>View Map</h2>
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
                          onClose={this.onClose}>
                          <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>
                          </div>
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
})(ViewMap);

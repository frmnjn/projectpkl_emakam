import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import usersData from '../../views/Users/UsersData';
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
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};


class Search extends Component {
  constructor(props) {
    super(props);

    
    
    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    usersData.id = 7;
    usersData.name = 'fsgr';
    usersData.username = 'fsgr';
    usersData.password = 'fsgr';


    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      error: null,
      isLoaded: true,
      isFiltered: true,
      filter_keyword:'Manusia',
      // input: [
      //   {
      //     'id':1,
      //     'name':'fsgr',
      //     'supplier':'priceless',
      //     'qty':10,
      //   }
      // ],
      items: [
        // {
        //   'id':1,
        //   'name':'fsgr',
        //   'price':'priceless'
        // }
      ],
      showitems:[],
      itemsperblok:[],
      blok:[],
      blokfilter:false,
      itemblokfilter:[],
      activename:null,
      activeqty:null,
      activesupplier:null,
      formqty:'1',
      
    };

      
  }

  blokfilter =event=>{
    var updatedList = this.state.items;
    this.setState({blokfilter:false})
    if (event.target.value!=''){
      this.setState({
        blokfilter:true
      })
      updatedList = updatedList.filter(function(item){
        return item.id_blok.toString().search(event.target.value.toString())!== -1
      })
    }
    this.setState({showitems: updatedList,itemblokfilter: updatedList});
  }

  filterList =event=>{
    var updatedList;
    if(this.state.blokfilter){
      updatedList = this.state.itemblokfilter;
    }else{
      updatedList = this.state.items;
    }
    
    if (event.target.value!=''){
      updatedList = updatedList.filter(function(item){
        return item.nama.toLowerCase().search(
          event.target.value.toLowerCase())!== -1||
          item.nama_ahli_waris.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1||
          item.nik_ahli_waris.toString().search(
            event.target.value.toLowerCase()) !== -1||
          item.nomor_makam.toString().search(
            event.target.value.toLowerCase()) !== -1;
      });
    }
    this.setState({showitems: updatedList});
  }

  componentDidMount() {

    fetch("http://localhost:8000/api/penghuni_makam/view?token="+sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json,
            showitems: json
          });
        },
      )

      fetch("http://localhost:8000/api/blok/view?token="+sessionStorage.getItem('token'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          this.setState({
            blok: json,
          });
        },
      )
  }

  handlesubmit(items){
    
    fetch('http://localhost:8000/buy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qty: this.state.formqty,
        name: this.state.activename,
        usr_name: 'Fsgr',
        supplier: this.state.activesupplier,
        
      })
    }).then(
      this.toggleSmall
    )
  }

  handleFormQty = event => {
    this.setState({ formqty: event.target.value });
  }



  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleSmall(items) {
    this.setState({
      small: !this.state.small,
      activename:items.Name,
      activesupplier:items.Supplier,
      activeqty:items.Qty
    });
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }

  render() {
    // const {isLoaded, items} = this.state;
    if (!this.state.isLoaded) {
      return (<div>loading...</div>)
    }else{
    return (

      

      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Manajemen Data Makam
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <Input onChange={this.blokfilter} type="select" name="blok" id="blok">
                          <option value=''>Semua</option>
                          {
                            this.state.blok.map((items) =>{
                              return(
                                <option value={items.id_blok}>Blok {items.kode_blok} - {items.nama_tpu}</option>
                              )
                            })
                          }
                        </Input>
                        </InputGroupAddon>
                        <Input onChange={this.filterList} type="text" id="input1-group3" name="input1-group3" placeholder="Search" />
                      </InputGroup>
                  </Col>
                </Row>
                <br/>
                <Table hover responsive className="sm">
                  <thead>
                  <tr>
                    <th className="">Informasi Makam</th>
                    <th className="">Penghuni Makam</th>
                    <th>Ahli Waris</th>
                    <th>Status </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.showitems.map((items) =>{
                    // if(this.state.isFiltered){
                    //   if(items.nama!=this.state.filter_keyword){
                    //     return;
                    //   }
                    // }
                  return (
                    <tr key={items.id_penghuni_makam} >
                    
                    <td className="">
                      <div>Nomor : <strong>{items.nomor_makam}</strong></div>
                      <span>Blok |</span> {items.id_blok}
                    </td>
                    <td>
                      <div><strong>{items.nama}</strong></div>
                      <div className="small text-muted">
                        <span>Alamat Terakhir |</span> {items.alamat_terakhir}
                      </div>
                      <div className="small text-muted">
                        <span>Tgl Wafat |</span> {items.tanggal_wafat}
                      </div>
                    </td>
                    <td>
                      <div><strong>{items.nama_ahli_waris}</strong></div>
                      <div className="small text-muted">
                        <span>Nik |</span> {items.nik_ahli_waris}
                      </div>
                      <div className="small text-muted">
                        <span>Alamat |</span> {items.alamat_ahli_waris}
                      </div>
                      <div className="small text-muted">
                        <span>Kontak |</span> {items.kontak_ahli_waris}
                      </div>
                    </td>
                    <td>
                      <div>{items.status}</div>
                    </td>
                  </tr>
                  )
                      } 
                    )
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
  }
}

export default Search;

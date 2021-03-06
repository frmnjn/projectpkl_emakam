import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/pemkot.png'
import sygnet from '../../assets/img/brand/pemkot.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);
    this.fetchnotif = this.fetchnotif.bind(this);
    this.notifread = this.notifread.bind(this);
    this.state = {
      datanotif:null,
      newnotif:null,
      showitems:[]
    }
    
  }

  logout() {
    sessionStorage.clear();
    // <Switch>
    // <Redirect to="/" />
    // </Switch>
  }

  componentDidMount(){
    // this.fetchnotif()
    if(sessionStorage.getItem('id_user')!=null&&sessionStorage.getItem('login_session')!=null){
      fetch("http://149.28.138.217/api/dokumen/view?token="+sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user')+'&role='+sessionStorage.getItem('login_session'))
      .then(response => {
        return response.json()
      })
      .then(
        (json) => {
          if (sessionStorage.getItem('login_session') == "2") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function(item){
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1&&
              item.status.toLowerCase().search("menunggu persetujuan kepala UPT") !== -1;
            });
            this.setState({showitems: updateitem});
          }else if (sessionStorage.getItem('login_session') == "3") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function(item){
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1&&
              item.status.toLowerCase().search("menunggu persetujuan kepala dinas") !== -1;
            });
            this.setState({showitems: updateitem});
          }else if (sessionStorage.getItem('login_session') == "4") {
            var updateitem;
            updateitem = json;
            updateitem = updateitem.filter(function(item){
              return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1&&
              item.status.toLowerCase().search("menunggu persetujuan kepala kecamatan") !== -1;
            });
            this.setState({showitems: updateitem});
          }else if (sessionStorage.getItem('login_session') == "5") {
            var updateitem;
            updateitem = json;
            // updateitem = updateitem.filter(function(item){
            //   return item.kelengkapan_dokumen.toLowerCase().search("lengkap") !== -1&&
            //   item.status.toLowerCase().search("Proses Selesai") !== -1;
            // });
            this.setState({showitems: updateitem});
          }else{
            this.setState({showitems: json});
          }

          this.setState({
            isLoaded: true,
            items: json,
          });
        },
      )

    } 
  }

  fetchnotif(){
    // fetch('http://149.28.138.217/api/notifikasi/view?token='+ sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'))
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(
    //     (result) => {
    //       console.log(result)
    //       this.setState({
    //         datanotif: result,
    //         newnotif: false
    //       },()=>{
    //         console.log(this.state.datanotif)
    //       });
    //     },
    //   )

    
  }

  notifread(){
    fetch('http://149.28.138.217/api/notifikasi/update?token='+sessionStorage.getItem('token')+'&id_user='+sessionStorage.getItem('id_user'), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      })
    }).then(
      this.fetchnotif
    )
    alert(this.state.newnotif)
  }

  bellnotif=()=>{
    if(sessionStorage.getItem('login_session')!=0&&sessionStorage.getItem('login_session')!=1&&sessionStorage.getItem('login_session')!=5){
      return(
        <div>
          <i class="icon-bell"></i><Badge pill color="danger">{this.state.showitems.length}</Badge>
        </div>
      )
    }
  }


  change_password() {
    <Redirect to="/ChangePassword" />
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    // alert(sessionStorage.getItem('id_user'))

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 40, height: 40, alt: 'E-Makam' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'E-Makam' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav >
              {this.bellnotif()}
              {/* {this.state.newnotif?<span class="badge badge-pill badge-danger">New</span>:null} */}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Notifications</strong></DropdownItem>
              {
                this.state.showitems != null ? 
                this.state.showitems.map((items)=>{   
                  if (items.status==="Unread"){
                    // if(!this.state.newnotif){
                    //   this.setState({
                    //     newnotif: true
                    //   })
                    // }
                    return(
                      <DropdownItem>
                        <i className="icons-danger cui-user-follow"></i><a>A new Entry need to be confirmed</a>
                        <span class="badge badge-pill badge-danger">New</span>
                      </DropdownItem>
                    )
                  }else{
                    return(
                      <DropdownItem>
                        <i className="icons-danger cui-user-follow"></i><a>Berkas perlu atas nama {items.nama_almarhum} perlu diproses</a>
                      </DropdownItem>
                    ) 
                  }
                
                }):<DropdownItem>
                  <a class="small text-muted">No notifiaction</a>
                </DropdownItem>
              }
            <DropdownItem footer tag="div" className="text-center" onClick={this.notifread}><strong class="small text-muted">Mark all as read</strong></DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/placeholder.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/* <DropdownItem href="#/users/1" ><i className="fa fa-user"></i> Profile</DropdownItem> */}
              {/* <DropdownItem onClick={() => this.logout()}><i className="fa fa-lock"></i> Logout</DropdownItem> */}
              <DropdownItem><i className="fa fa-lock"></i> <a href="#/ChangePassword" onClick={() => this.change_password()}>Change Password</a></DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> <a href="/" onClick={() => this.logout()}>Log Out</a></DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;

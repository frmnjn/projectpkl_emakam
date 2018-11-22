import React, { Component } from 'react';
import { Card, CardBody, Col, Container,Row } from 'reactstrap';
import { RingLoader } from 'react-spinners';
const center = {
  marginLeft: '45%'
};
class Login extends Component {
  constructor(props) {
    super(props);
    sessionStorage.setItem('login_session', 99);

    this.state = {
      username: "",
      password: "",
      status: false,
      temp: [],
      isLoaded: false

    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = event => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(
      this.setState({
        isLoaded: true
      })
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.length > 0) {
          responseJson.map((items) => {
            this.setState({
              temp: items
            })
            // usersData.role = this.state.temp.role;
            sessionStorage.setItem('login_session', this.state.temp.role);
            sessionStorage.setItem('token', this.state.temp.token);
            sessionStorage.setItem('id_user', this.state.temp.id_user);
            sessionStorage.setItem('username', this.state.temp.username);

            if (this.state.temp.role == 0) {
              this.props.history.push('/ManajemenTPU')
            } else if (this.state.temp.role == 1) {
              this.props.history.push('/RegistrasiPerijinanMakam')
            } else if (this.state.temp.role == 2||this.state.temp.role == 3||this.state.temp.role == 4) {
              this.props.history.push('/Dokumen')
            } else if (this.state.temp.role == 5) {
              this.props.history.push('/CetakDokumen')
            } else {
              this.props.history.push('/Search')
            }
          },
          )
        } else {
          this.setState({
            isLoaded: false
          })
        }
      }
      );
  }

  load() {
    return (
      <div style={center} className='sweet-loading'>
        <RingLoader
          color={'#123abc'}
        />
      </div>
    );
  }

  nothing() {
    return (<div></div>)
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Login Page</h1>
                  <p className="text-muted"></p>
                  <form className="form-group" onSubmit={this.handleLogin}>
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" onChange={this.handleChange} value={this.state.activeusername}></input>
                    <label>password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.activepassword}></input>
                    <br /><input type="submit" className="form-control btn btn-success" Value="Submit"></input>
                  </form>
                    {this.state.isLoaded ? this.load() : this.nothing()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

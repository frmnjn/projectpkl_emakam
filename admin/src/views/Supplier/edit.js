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
} from 'reactstrap';

const usersData = [
  {id: 0, name: 'John Doe', registered: '2018/01/01', role: 'Guest', status: 'Pending'},
  {id: 1, name: 'Samppa Nori', registered: '2018/01/01', role: 'Member', status: 'Active'},
  {id: 2, name: 'Estavan Lykos', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
  {id: 3, name: 'Chetan Mohamed', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
  {id: 4, name: 'Derick Maximinus', registered: '2018/03/01', role: 'Member', status: 'Pending'},
  {id: 5, name: 'Friderik Dávid', registered: '2018/01/21', role: 'Staff', status: 'Active'},
  {id: 6, name: 'Yiorgos Avraamu', registered: '2018/01/01', role: 'Member', status: 'Active'},
  {id: 7, name: 'Avram Tarasios', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
  {id: 8, name: 'Quintin Ed', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
  {id: 9, name: 'Enéas Kwadwo', registered: '2018/03/01', role: 'Member', status: 'Pending'},
  {id: 10, name: 'Agapetus Tadeáš', registered: '2018/01/21', role: 'Staff', status: 'Active'},
  {id: 11, name: 'Carwyn Fachtna', registered: '2018/01/01', role: 'Member', status: 'Active'},
  {id: 12, name: 'Nehemiah Tatius', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
  {id: 13, name: 'Ebbe Gemariah', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
  {id: 14, name: 'Eustorgios Amulius', registered: '2018/03/01', role: 'Member', status: 'Pending'},
  {id: 15, name: 'Leopold Gáspár', registered: '2018/01/21', role: 'Staff', status: 'Active'},
  {id: 16, name: 'Pompeius René', registered: '2018/01/01', role: 'Member', status: 'Active'},
  {id: 17, name: 'Paĉjo Jadon', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
  {id: 18, name: 'Micheal Mercurius', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
  {id: 19, name: 'Ganesha Dubhghall', registered: '2018/03/01', role: 'Member', status: 'Pending'},
  {id: 20, name: 'Hiroto Šimun', registered: '2018/01/21', role: 'Staff', status: 'Active'},
  {id: 21, name: 'Vishnu Serghei', registered: '2018/01/01', role: 'Member', status: 'Active'},
  {id: 22, name: 'Zbyněk Phoibos', registered: '2018/02/01', role: 'Staff', status: 'Banned'},
  {id: 23, name: 'Einar Randall', registered: '2018/02/01', role: 'Admin', status: 'Inactive'},
  {id: 24, name: 'Félix Troels', registered: '2018/03/21', role: 'Staff', status: 'Active'},
  {id: 25, name: 'Aulus Agmundr', registered: '2018/01/01', role: 'Member', status: 'Pending'},
  {id: 42, name: 'Ford Prefex', registered: '2001/05/21', role: 'Alien', status: 'Don\'t panic!'}
]
function UserRow(props) {
  const user = props.user
  const userLink = `#/Home/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
        <th scope="row"><a href={userLink}>{user.id}</a></th>
        <td><a href={userLink}>{user.name}</a></td>
        <td>{user.registered}</td>
        <td>{user.role}</td>
        <td><Button block color="success">Edit</Button></td>
        <td><Button block color="danger">Delete</Button></td>
    </tr>
  )
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  componentDidMount(){
    fetch('http://localhost:8000/data_user')
    .then(results =>{
      return results.json();
    }).then(data => {
      let user = data.results.map((user) => {
        return(
            <th>user.nama</th>
        )
      })
      this.setState({user: user});
      console.log("state",this.state.user);
    })
  }

  render() {
    const userList = usersData.filter((user) => user.id < 10)
    return (
      
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">edit</th>
                      <th scope="col">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                  )}
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

export default Home;

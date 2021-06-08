import React, { Component } from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Card from "./../components/Card/index";
import axios from "axios";

const sortAsc = 1;
const sortDes = -1;

class Home extends Component {
  state = {
    cardArray: null,
    sortedField: "",
    sortedDirection: 0,
  };

  async componentDidMount() {
    const employeeArray = [];
    await axios
      .get("https://randomuser.me/api/?results=10")
      .then((employees) => {
        employeeArray.push(employees);
      })
      .catch((err) => console.log(err));
    this.setState({ cardArray: employeeArray });
  }

  sortFields(columnName) {
    let sortDirection = sortAsc;
    if (this.state.columnName === columnName) {
      if (this.state.sortedDirection === sortAsc) {
        sortDirection = sortDes;
      }
    }
    if (this.state.columnName === "name") {
      this.state.cardArray[0].data.results.sort((a, b) =>
        a.name.first < b.name.first ? -1 * sortDirection : sortDirection
      );
      console.log("name");
    }
    if (this.state.columnName === "phone") {
      this.state.cardArray[0].data.results.sort((a, b) =>
        a.phone < b.phone ? -1 * sortDirection : sortDirection
      );
      console.log("phone");
    }
    if (this.state.columnName === "email") {
      this.state.cardArray[0].data.results.sort((a, b) =>
        a.email < b.email ? -1 * sortDirection : sortDirection
      );
      console.log("email");
      console.log(this.state.cardArray[0].data.results[0].email);
      console.log(this.state.cardArray[0].data.results[1].email);
    }
    this.setState({
      columnName,
      sortDirection,
      cardArray: this.state.cardArray,
    });
  }

  render() {
    if (!this.state.cardArray) return <p>Loading</p>;
    return (
      <div>
        <Hero>
          <h1>Employee Directory</h1>
        </Hero>
        <Container style={{ marginTop: 30 }}>
          <Row>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                <ul className="navbar-nav row col-12">
                  <li className="nav-item col-3">
                    <button to="/">Image</button>
                  </li>
                  <li className="nav-item col-3">
                    <button
                      type="button"
                      onClick={() => {
                        this.sortFields("name");
                      }}
                    >
                      Name
                    </button>
                  </li>
                  <li className="nav-item col-3">
                    <button
                      type="button"
                      onClick={() => {
                        this.sortFields("phone");
                      }}
                    >
                      Phone
                    </button>
                  </li>
                  <li className="nav-item col-3">
                    <button
                      type="button"
                      onClick={() => {
                        this.sortFields("email");
                      }}
                    >
                      Email
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </Row>
          <Row>
            {this.state.cardArray[0].data.results.map((employee) => (
              <Card
                key={employee.email}
                image={employee.picture.large}
                name={employee.name.first + " " + employee.name.last}
                phone={employee.phone}
                email={employee.email}
              />
            ))}

            {/* <div>
              <h1>Hello, world!</h1>
              <div>
                {todos.map((todo, index) => {
                  return todo.done ? (
                    <div key={index}>{todo.name} : done</div>
                  ) : (
                    <div onClick={() => handleClick(todo.name)} key={index}>
                      {todo.name} : not done
                    </div>
                  );
                })}
              </div>
            </div> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

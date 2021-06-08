import React, { Component } from "react";
import "./style.css";

class Card extends Component {
  state = {
    image: "",
    name: "",
    phone: "",
    email: "",
  };

  componentDidMount() {
    this.setState({
      image: this.props.image,
      name: this.props.name,
      phone: this.props.phone,
      email: this.props.email,
    });
  }

  render() {
    return (
      <div className="card">
        <div className="row">
          <img
            src={this.state.image}
            alt="Employee Face"
            className="col-3"
          ></img>
          <p className="col-3 eName"> {this.state.name}</p>
          <p className="col-3 ePhone"> {this.state.phone}</p>
          <p className="col-3 eEmail"> {this.state.email}</p>
        </div>
      </div>
    );
  }
}

export default Card;

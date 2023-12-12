import React, { Component } from 'react';

import { IoSearchOutline } from 'react-icons/io5';
import { Container } from '../Searchbar/Container';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>
              <IoSearchOutline />
            </span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </Container>
    );
  }
}

export default Searchbar;

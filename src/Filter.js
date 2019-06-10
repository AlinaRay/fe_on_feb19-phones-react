import React from 'react';

export default class Filter extends React.Component{
    sortPhone = (e) =>{
        this.props.sortPhones(e.target.value);
    };
render(){
  return (
    <section>
      <p>
        Search:
        <input />
      </p>

      <p>
        Sort by:
        <select onChange={this.sortPhone}>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    </section>
  );
};}

import React, {Component} from 'react';
import x from '../x.png'

class Item extends Component {
  toggleItemChange = () => {
  this.props.countLeft();
  }
  render() {
    return (
      <li 
        style={{display: this.props.display}} 
        className="todo-app__item" 
        detail={this.props.text} 
      >
        <div className="todo-app__checkbox">
          <input 
            type="checkbox"
            id={this.props.expectedID}
            checked={this.props.isChecked}
            onChange={() => {this.props.toggleChange(this.props.expectedID); this.toggleItemChange()}}
          >
          </input>
          <label htmlFor={this.props.expectedID}>
          </label>
        </div>
        <h1 
          style={this.props.isChecked? {textDecoration: "line-through", opacity: "0.5"}:{}}
          className="todo-app__item-detail" 
        >
            {this.props.text}
        </h1>
        <img 
          src={x}
          className="todo-app__item-x"
          alt="x"
          onClick={() => this.props.removeSelf(this.props.expectedID)}
        >
        </img>
      </li>
    );
  }
}
export default Item;
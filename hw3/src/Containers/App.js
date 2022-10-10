import React, {Component} from 'react';
import Item from '../Components/itemp';
class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {item: [], show_elements: false, uncompleted_item_count: 0}
    this.removeItem = this.removeItem.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
  }
  /* ----- Handling the task input -----*/
  submitTaskDetail = (event) => {
    if(event.key === 'Enter') {
      let input_value = document.getElementsByClassName("todo-app__input")[0].value;
      // Detail
      if (input_value !== "") {
        this.showAll();
        const temp_item = [...this.state.item];
        temp_item.push([input_value, false, ""]);
        this.setState({item: temp_item}, ()=>{
          if (this.state.item.length > 0)
            this.setState({show: true});
        });
      }
    }
  }
  cleanInput = (event) => {
    if(event.key === 'Enter') {
      document.getElementsByClassName("todo-app__input")[0].value = "";
      this.countUncompletedItem();
    }
  }
  /* ----- functions of footer buttons ----- */
  showAll = () => {
    let temp_item = [...this.state.item];
    temp_item.forEach(item => item[2] = "");
    this.setState({item: temp_item});
  }
  showActive = () => {
    let temp_item = [...this.state.item];
    temp_item.forEach(item => item[2] = "");
    temp_item.forEach(item => {if (item[1]) item[2] = "none";});
    this.setState({item: temp_item});
  }
  showCompleted = () => {
    let temp_item = [...this.state.item];
    temp_item.forEach(item => item[2] = "");
    temp_item.forEach(item => {if (!item[1]) item[2] = "none";});
    this.setState({item: temp_item});
  }
  clearCompleted = () => {
    const temp_item = [...this.state.item];
    const completed_item_array = [];
    for (let i = 0; i < temp_item.length; ++i)
      if (temp_item[i][1]) completed_item_array.push(temp_item[i]);
    for (let j = 0; j < completed_item_array.length; ++j)
      temp_item.splice(temp_item.indexOf(completed_item_array[j]), 1);
    this.setState({item: temp_item}, ()=>{
      this.countUncompletedItem();
      if (this.state.item.length < 1)
        this.setState({show: false});
    });
  }
  // Toggling the change of the checkboxes here 
  toggleChange(index_of_item_to_toggle) {
    const index = index_of_item_to_toggle;
    let temp_item = [...this.state.item];
    temp_item[index][1] = !temp_item[index][1];
    this.setState({item: temp_item});
  }
  // Counting the uncompleted items
  countUncompletedItem = () => 
    this.setState({uncompleted_item_count: this.state.item.filter(item => item[1] === false).length});
  removeItem(index_of_item_to_remove){
    const index = index_of_item_to_remove;
    const temp_item = [...this.state.item];
    temp_item.splice(index, 1);
    this.setState({item: temp_item}, ()=>{
      this.countUncompletedItem();
      if (this.state.item.length < 1)
        this.setState({show: false});
    });
  }
  render() {
    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 id="title" className="todo-app__title">todo</h1>
        </header>
        <section className="todo-app__main">
          <input 
            type="text" 
            className="todo-app__input"
            placeholder="What needs to be done?"
            onKeyDown={this.submitTaskDetail}
            onKeyUp={this.cleanInput}
          >
          </input>
          {this.state.show &&
            <ul className="todo-app__list" id="todo-list">
              {this.state.item.map((item, index)=> 
                <Item 
                  key={index}
                  expectedID={index}
                  text={item[0]}
                  isChecked={item[1]}
                  display={item[2]}
                  countLeft={this.countUncompletedItem}
                  removeSelf={this.removeItem}
                  toggleChange={this.toggleChange}
                /> 
              )}
            </ul>
          }
        </section>
        {this.state.show &&
          <footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total">{this.state.uncompleted_item_count} left</div>
            <ul className="todo-app__view-buttons">
              <li>
                <button onClick={this.showAll}>All</button>
              </li>
              <li>
                <button onClick={this.showActive}>Active</button>
              </li>
              <li>
                <button onClick={this.showCompleted}>Completed</button>
              </li>
            </ul>
            <div className="todo-app__clean">
              <button
                style={this.state.item.filter(item => item[1] === true).length > 0?{visibility:""}:{visibility:"hidden"}}
                onClick={this.clearCompleted}
              >
                Clear completed
              </button>
            </div>
          </footer>
        }
      </div>
    );
  }
}
export default Todolist;
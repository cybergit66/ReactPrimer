function TodoList({todos}){
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>
                    {todo.isCompleted ? <del>{todo.text}</del> : todo.text}
                </li>
                )
            }
        </ul>
    );
}

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this._nextTodoId = 1;
        this.state = {
            filter: {showCompleted: true},
            todos: [
                {id: this._nextTodoId++, text: "hey", isCompleted: false},
                {id: this._nextTodoId++, text: "hello", isCompleted: true},
                {id: this._nextTodoId++, text: "goodbye", isCompleted: true},
                {id: this._nextTodoId++, text: "good morning", isCompleted: false},
            ]
        };    
        
        this._onShowCompletedChanged = this._onShowCompletedChanged.bind(this);
    }
    
    render(){
        const {filter, todos} = this.state;
        const filteredTodos = filter.showCompleted ? todos : todos.filter(todo => !todo.isCompleted);
        
        return(
            <div>
                <h2>Todo List (again..)</h2>
                <label>
                    Show Completed
                    <input type="checkbox" checked={filter.showCompleted} onChange={this._onShowCompletedChanged} />
                </label>
                <TodoList todos={filteredTodos}/>
            </div>
        );
    }
    
    _onShowCompletedChanged(e) {
        this.setState({
            filter: {showCompleted: e.target.checked}
        });
    }
}

ReactDOM.render(<AppComponent />, document.getElementById("application"));
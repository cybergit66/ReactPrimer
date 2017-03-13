function TodoList({todos, onSetTodoStatus}){
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>
                <label>
                    <input type="checkbox" checked={todo.isCompleted} onChange={e => onSetTodoStatus(todo, e.target.checked)} />
                        {todo.isCompleted ? <del>{todo.text}</del> : todo.text}
                </label>
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
        this._setTodoStatus = this._setTodoStatus.bind(this);
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
                <TodoList todos={filteredTodos} onSetTodoStatus={this._setTodoStatus}/>
            </div>
        );
    }
    
    _setTodoStatus(todo, isCompleted){
        const {todos} = this.state;
        this.setState({
            todos: todos.map(oldTodo => {
                if (oldTodo.id !== todo.id)
                    return oldTodo;
                return Object.assign({}, oldTodo, {isCompleted});
            })
        });
    }
    
    _onShowCompletedChanged(e) {
        this.setState({
            filter: {showCompleted: e.target.checked}
        });
    }
}

ReactDOM.render(<AppComponent />, document.getElementById("application"));
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import * as firebase from 'firebase';
import {Row, Col, Card, Badge} from 'antd';
import './App.css';
import Navigation from "./components/Navigation";
import TodoForm from "./components/TodoForm";
import {map} from "lodash";

const config = {
    apiKey: "AIzaSyDCb9EP_C0QFuQOzVaOgZ0NlgnKA-mJjxQ",
    authDomain: "myproyectreact-51fc7.firebaseapp.com",
    databaseURL: "https://myproyectreact-51fc7.firebaseio.com",
    projectId: "myproyectreact-51fc7",
    storageBucket: "myproyectreact-51fc7.appspot.com",
    messagingSenderId: "767914683278"
};
firebase.initializeApp(config);

firebase.firestore().settings({
    timestampsInSnapshots: true
});


class App extends Component {
    state = {
        todos: [],
    };

    componentDidMount() {
        this.getCollection();
        // this.deleteCollection();
    }

    snapshotToArray = data => {
        const returnArray = [];
        data.forEach(childSnapshot => {
            const item = childSnapshot.data();
            item.id = childSnapshot.id;
            returnArray.push(item);
        });
        return returnArray;
    }


    getCollection = () => {
        let array = [];
        firebase.firestore()
            .collection("todos")
            .onSnapshot(snapshot => {
                this.setState({
                    todos: this.snapshotToArray(snapshot)
                }, () => {
                    console.log("new", this.state.todos)
                });
            })
        console.log("array", array);
        this.setState({todos: array})
    }






    handleAddTodo = (todo) => {
        this.setState({
            todos: [...this.state.todos, todo]
        })
    }

    removeTodo = (index) => {
        this.setState({
            todos: this.state.todos.filter((e, i) => {
                return i !== index
            })
        });
    }



    render() {

        console.log("lala", this.state.todos)
        return (
            <div className="App">
                <div>
                    <Row>
                        <Navigation/>
                        <TodoForm onAddTodo={this.handleAddTodo}/>
                        <span className="counta">
                            {this.state.todos.length}
                        </span>
                    </Row>
                    {"wegwe"}
                    <Row>
                        {
                            map(this.state.todos, (todo, key) =>
                                <div key={key}>
                                    {console.log(todo)}
                                    <Col span={6}>
                                        {console.log(todo)}
                                        <Card title={todo.title} bordered={false} style={{width: 300, margin: 10}}>
                                            <span style={{background: 'red', padding: '5px'}}>{todo.priority}</span>
                                            <div>
                                                <p> {todo.description}</p>
                                                <p> {todo.responsible}</p>
                                                <p> {todo.calendar}</p>
                                            </div>
                                            <div>
                                                <button onClick={this.removeTodo.bind(this)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </Card>
                                    </Col>
                                </div>
                            )
                        }
                    </Row>
                </div>
            </div>


        );
    }


}

export default App;

import React, {Component} from 'react';
import {Calendar, Col, Form, Input, Row, Select} from 'antd';
import * as firebase from 'firebase';
import './TodoForm.css';

class TodoForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            responsible: '',
            description: '',
            priority: '',
            calendar: []


        };
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onPanelChange = this.onPanelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        })
    };


    handleChange(value) {
        // console.log(value);
        this.setState({
            priority: value
        });

    }


    onPanelChange(value, mode) {
        // console.log(value, mode);

        this.setState({
            calendar: value.format('DD/MM/YYYY')
        });

        // console.log(this.state.calendar)
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.onAddTodo(this.state);
        // this.setState({
        //     title: '',
        //     responsible: '',
        //     description: '',
        //     priority: 'low'
        // });

        firebase.firestore().collection("todos").add({
            title: this.state.title,
            responsible: this.state.responsible,
            description: this.state.description,
            priority: this.state.priority,
            calendar: this.state.calendar,
        })
    }


    render() {

        const Option = Select.Option;
        const FormItem = Form.Item;

        return (
            <div>
                <Row>
                    <Col span={4}>
                    </Col>
                    <Col span={16}>
                        <Form className="form" onSubmit={this.handleSubmit}>

                            <Input
                                className="formInput"
                                placeholder="Title"
                                type="text"
                                name="title"
                                onChange={this.handleInput}
                            />
                            <Input
                                className="formInput"
                                placeholder=" Responsible"
                                type="text"
                                name="responsible"
                                onChange={this.handleInput}

                            />
                            <Input
                                className="formInput"
                                placeholder=" Description"
                                type="text"
                                name="description"
                                onChange={this.handleInput}
                            />
                            <Select
                                className="formInput"
                                showSearch
                                style={{width: 200}}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                name="priority"
                                onChange={this.handleChange}

                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="low">low</Option>
                                <Option value="medium">medium</Option>
                                <Option value="hight">hight</Option>
                            </Select>
                            <div
                                className="calendar"
                                name="calendar"
                                style={{width: 350, border: '4px solid #d9d9d9', borderRadius: 5}}
                            >
                                <Calendar fullscreen={false} onPanelChange={this.onPanelChange}/>
                            </div>


                            <FormItem>
                                <input type="submit" value="Submit"/>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={4}>
                    </Col>
                </Row>

            </div>
        )
    }

}

export default TodoForm;

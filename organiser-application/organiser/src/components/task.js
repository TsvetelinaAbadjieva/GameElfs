import React from "react";
//import {browserHistory} from "react-route";

export class Task extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userId: this.props.id,
            startDate: '',
            starTime: '',
            dueDate: '',
            dueTime: '',
            title: '',
            description: '',
            group: '',
            priority: '',
            period: '',
            periodCollection: this.props.periodCollection,
            priorityCollection: this.props.priorityCollection,
            groupCollection: this.props.groupCollection,
            message: ''

        }
        this.getGroupCollection = this.getGroupCollection.bind(this)
        this.getPriorityCollection = this.getPriorityCollection.bind(this)
        this.getPeriodCollection  = this.getPeriodCollection.bind(this)
    }
    updateInputUsername(evt) {
        this.setState({
            username: evt.target.value,
        });
        console.log(evt.target.value)
    }

    updateInputPassword(evt) {

        this.setState({
            password: evt.target.value
        });
        console.log(evt.target.value)
    }

    showMessage(message, that) {
        that.setState({ message: message });
    }


    componentDidMount() {

    }

    onSave(e) {

        e.preventDefault();
        var task = {};
        if (!this.validate(this.state.title) || !this.validate(this.state.description)) {
            this.showMessage('Please, fill Title and Description', this);
        }
        else {
            var task = {
                user_id: this.props.params.userId,
                priority_id: this.state.priority,
                period_id: this.state.period,
                group_id: this.state.group,
                start_date: this.state.startDate,
                start_time: this.state.starTime,
                due_date: this.state.dueDate,
                due_time: this.state.dueTime,
                title: this.state.title,
                description: this.state.description
            }
        }
        var data = JSON.stringify(task);

        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8000/task', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(data);
    }
    validate(field) {

        if (!field == '')
            return true;
    }

    render() {

        this.getGroupCollection(this.callback);
        this.getPeriodCollection(this.callback);
        this.getPriorityCollection(this.callback);


        return (
            <div className="row">
                <div className="col-md-12 calendar">
                    <div className="col-md-1"></div>
                    <div className="col-md-8 task">
                        <h2>Organise your tasks</h2>

                        <form action="" method="POST">
                            <input type="text" value={this.props.params.id} hidden />
                            <p><label for="startDate">Start date</label>
                                <input type="date" className="form-group" id="startDate" name="startDate" value={this.state.startDate} onChange={evt => this.updateInputStartdate(evt)} style={{ color: "grey" }} />
                                <label for="startTime">Begin at</label>
                                <input type="time" className="form-group" id="startTime" name="startTime" value={this.state.startTime} onChange={evt => this.updateInputStartTime(evt)} style={{ color: "grey" }} />
                            </p>
                            <p><label for="dueDate">Due date</label>
                                <input type="date" className="form-group" id="dueDate" name="endDate" value={this.state.dueDate} onChange={evt => this.updateInputDueDate(evt)} style={{ color: "grey" }} />
                                <label for="startTime">Finish at</label>
                                <input type="time" className="form-group" id="dueTime" name="dueTime" value={this.state.dueTime} onChange={evt => this.updateInputDueTime(evt)} style={{ color: "grey" }} />
                            </p>
                            <p>
                                <label for="priority">Priority</label>
                                <select name="priority" id="priority" value={this.state.priority} onChange={evt => this.updateInputPriority(evt)} style={{ color: "grey" }}>
                                    {this.state.priorityCollection.map((priority) => { <option value={priority.id}> {priority.priority} </option> })}

                                </select>
                                <label for="group">Group</label>
                                <select name="group" id="group" value={this.state.group} onChange={evt => this.updateInputGroup(evt)} style={{ color: "grey" }}>
                                    {this.state.groupCollection.map((group) => { <option value={group.id}> {group.group} </option> })}
                                </select>
                                <label for="period">Period</label>
                                <select name="period" id="period" value={this.state.period} onChange={evt => this.updateInputPeriod(evt)} style={{ color: "grey" }}>
                                    {this.state.groupCollection.map((period) => { <option value={period.id}> {period.period} </option> })}
                                </select>
                            </p>
                            <p><label htmlFor="id">ID:{this.props.params.id}</label></p>
                            <p><label for="title">Title</label> <input type="text" id="title" name="title" style={{ color: "grey" }}/></p>
                            <p><label for="description">Description</label></p><p> <textarea rows="5" cols="50" id="description" name="description" style={{ color: "grey" }}/></p>
                            <p><button onClick={() => this.onSave} id="save" name="save" type="submit" className="btnSave">Save</button></p>
                            <p><button onClick={() => this.onUpdate} id="update" name="update" type="submit" className="btnUpdate">Update</button></p>
                            <p><button onClick={() => this.onDelete} id="delete" name="delete" type="submit" className="btnDelete">Delete</button></p>
                            <p>{this.state.message}</p>
                        </form>

                    </div>
                    <div className="col-md-1"></div>

                    <p>{this.state.username} -- {this.state.password}</p>
                </div>
            </div>
        );
    }
}

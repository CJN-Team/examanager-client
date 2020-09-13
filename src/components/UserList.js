import React, { Component } from "react"; 
import axios from "axios";
import { format, register } from 'timeago.js';
import {link, Link} from 'react-router-dom';


const localeFunc = (number, index, total_sec) => {

    return [
        ['Justo Ahora', 'Ahora'],
        ['%s Sengundos antes', 'En %s seguntos'],
        ['Hace 1 minuto', 'En 1 minuto'],
        ['Hace %s minutos', 'En %s minutos'],
        ['Hace 1 hora', 'En 1 hora'],
        ['Hace %s horas ', 'En %s horas'],
        ['Hace 1 dia', 'En 1 dia'],
        ['Hace %s dias', 'En %s dias'],
        ['Hace 1 semana', 'En 1 semana'],
        ['Hace %s semanas', 'En %s semanas'],
        ['Hace 1 mes', 'En 1 mes'],
        ['Hace %s meses', 'En %s meses'],
        ['Hace 1 año', 'En 1 año'],
        ['Hace %s años', 'En %s años']
    ][index];
};

register('es_ES', localeFunc);

export default class UserList extends Component {
    
    state={
        users: []
    }
    
    async componentDidMount(){
        
        this.getUsers();
    }
    
    async getUsers(){
        const user=await axios.get("http://localhost:8080/user");
        this.setState({users:user.data})
    }

    deleteUsers = async (id) =>{
        await axios.delete("http://localhost:8080/user/"+id);
        this.getUsers();

    }

    render() {
        return (
            <div className="row">
                {
                    this.state.users.map(user => (
                        <div className="col-md-4 p-2" key={user._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>
                                        {user.name}
                                    </h5>     
                                    <Link className= "btn btn-secondary" to={"/edit/"+user._id}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p className="d-flex justify-content-between">
                                        <strong>Name:</strong>{user.name}
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <strong>Address:</strong>{user.address}
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <strong>Area:</strong>{user.area}
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <strong>Age:</strong>{user.age}
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <strong>Time working:</strong> {format(user.date, 'es_ES')}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteUsers(user._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}


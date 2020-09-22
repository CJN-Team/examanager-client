import React, { Component } from "react"; 
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {

    state = {
        profile:'',
        idType:'',
        name:'',
        lastName:'',
        email:'',
    }

    async componentDidMount(){
    }

    onInputChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        const newuser={
            profile: this.state.profile,
            idType: this.state.idType,
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email
        }
        await axios.post('http://localhost:8080/user',newuser)
        console.log("aiuda");
        console.log(newuser);
        window.location.href="/";  
    }



    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>{this.state.tittle}</h4>
                    <br></br>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="profile" name="profile" value={this.state.profile} onChange={this.onInputChange} required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="idType" name="idType" value={this.state.idType} onChange={this.onInputChange} required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="name" name="name" value={this.state.name} onChange={this.onInputChange} required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="lastName" name="lastName" value={this.state.lastName} onChange={this.onInputChange}  required/>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="email" name="email" value={this.state.email} onChange={this.onInputChange}  required/>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


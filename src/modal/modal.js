import React from "react"
import './modal.css'

export default class Modal extends React.Component {
    state = {
       isOpen: false 
    }
    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({isOpen: true})}>Open modal</button>

                {this.state.isOpen && (<div className='modal'>
                    <div className='modal-body'>
                        <h1>Modal title</h1>
                        <p>modal window</p>
                        <button onClick={() => this.setState({isOpen: false})}>Close Modal</button>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}
import React from 'react';
import {start} from "../actions/actions.js";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button'
import {stopResume} from '../actions/actions.js'

class NewGame extends React.Component{

render(){
    return (
        <div style={{display: 'flex'}}>
            <Button style={{display: 'flex' ,background: '#5e009c'}} onClick={this.props.startNew} href={""}>
                {'New Game'}
            </Button>
            <Button style={{display: 'flex' ,background: '#9c000e'}} onClick={this.props.change} href={""}>
                {this.props.playPause}
            </Button>
        </div>
    )
}


}


const mapDispatchToProps= dispatch => {
    return {
        //to start a new Game
        startNew: () => {
            dispatch(start())
        },
        //to pause or resume
        change: ()=> {
            dispatch(stopResume())
        }
    };
};

//to start a new game is immediate
const mapStateToProps= state => {
    const playPause = state.playingReducer.playing? 'Pause' :'Resume';
    return {playPause: playPause}
};

NewGame=connect(mapStateToProps,mapDispatchToProps)(NewGame);

export default NewGame;
import React from 'react';
import PlayerBoard from './playerboard.js';
import TableBoard from './tableboard.js';
import {connect} from "react-redux";
import PopUp from '../components/popup.js';
class Game extends React.Component{

    render(){

        if(this.props.winner.exist){
            return (
                <div>
                    <PopUp winners={this.props.winner.list}/>
                </div>

            )
        }
        else {
            return (
                <div>
                    <div style={{
                        display: 'grid', gridTemplateColumn: 'fr 1fr',
                        gridTemplateRows: '1fr 1fr 1fr 1fr'
                    }}>
                        <PlayerBoard style={{gridColumn: '1/2', gridRow: '1/2', display: 'flex'}} color={'#adffe5'}
                                     player={'1'} name={'Thomas'}/>
                        <PlayerBoard style={{gridColumn: '2/3', gridRow: '1/2', display: 'flex'}} color={'#ffb5b2'}
                                     player={'2'} name={'Yoenn'}/>
                        <TableBoard style={{gridColumn: '1/3', gridRow: '2/4'}}/>
                        <PlayerBoard style={{gridColumn: '1/2', gridRow: '4/5', display: 'flex'}} color={'#acff9a'}
                                     player={'3'} name ={'Louis'}/>
                        <PlayerBoard style={{gridColumn: '2/3', gridRow: '4/5', display: 'flex'}} color={'#fffda0'}
                                     player={'4'} name={'Fares'}/>
                    </div>



                </div>


            );
        }
    }
}

const mapStateToProps = state => {


    return (
        {
            winner: state.playerDataReducer.playerData.winner,
        }
    )

};

Game=connect(mapStateToProps,)(Game);
export default Game;
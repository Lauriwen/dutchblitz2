import React from 'react';
import { withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {PropTypes} from 'prop-types';
import {newSelect, putCard, removeCard, resetSelect, storeCard} from '../actions/actions';
import {takeHand}from '../actions/actions.js';
import {actionPerformed} from '../actions/actions.js';
import {canWin} from '../actions/actions.js';
import Paper from '@material-ui/core/Paper';




//styles
const styles={
    //random card display
    card : {
        width: '16.666%',
        marginTop: '10px',
        marginBottom: '10px',
        marginRight: '10px',
        marginLeft: '10px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '35px',
        textAlign: 'center',
    }
};



class PlayerBoard extends React.Component {


    render(){
        //to set the button's display according to the state or to set theme by default if there is no card in a pile
        const player=this.props[`player${this.props.player}Data`];
        const blitzPile =  player.blitzPile[0] ? [player.blitzPile[0].number,player.blitzPile[0].color ]:[ '', 'rgba(250,255,0,0.5'];
        const woodPile = player.woodPile[0] ? [player.woodPile[0].number, player.woodPile[0].color] : ['','rgba(0,191,0,0.49'];
        const leftPostPile = player.leftPostPile[0] ? [player.leftPostPile[0].number, player.leftPostPile[0].color] : ['','rgba(255,128,0,0.4)'];
        const middlePostPile = player.middlePostPile[0] ? [player.middlePostPile[0].number, player.middlePostPile[0].color] : ['','rgba(255,128,0,0.4)'];
        const rightPostPile = player.rightPostPile[0] ? [player.rightPostPile[0].number, player.rightPostPile[0].color] : ['','rgba(255,128,0,0.4)'];
        const hand = player.hand[0] ? '#686868' :'#d4d4d4';


        return (
            // plotting all decks

            <div style={{
                display: 'grid', gridTemplateColumn: '1fr 1 fr%',
                gridTemplateRows: '1fr 4fr', background:this.props.color }}>

                <Paper  style={{gridColumn: '1/2', gridRow: '1/2', background: 'gray'}} href={''}>
                {player.name}
                </Paper>

            <div style={{...this.props.style, background:this.props.color, display:'flex', gridColumn: '1/3', gridRow: '2/3',}}>

                <Button  className={this.props.classes.card} style={{background: hand}} onClick={this.props.onHandClick(this.props.player,this.props.playing)}  href={""}>
                    {''}
                </Button>
                <Button className={this.props.classes.card} style={{background: leftPostPile[1]}}
                        onClick={this.props.onCardClick('leftPostPile',this.props.player,leftPostPile[0],leftPostPile[1],this.props.isSelected,this.props.selectedCard,this.props.playing,this.props.performed)} href={""}>
                    {leftPostPile[0]}
                </Button>
                <Button className={this.props.classes.card} style={{background:middlePostPile[1]}}
                        onClick={this.props.onCardClick('middlePostPile',this.props.player,middlePostPile[0],middlePostPile[1],this.props.isSelected,this.props.selectedCard,this.props.playing,this.props.performed)} href={""}>
                    {middlePostPile[0]}
                </Button>
                <Button className={this.props.classes.card} style={{background:rightPostPile[1]}}
                        onClick={this.props.onCardClick('rightPostPile',this.props.player,rightPostPile[0],rightPostPile[1],this.props.isSelected,this.props.selectedCard,this.props.playing,this.props.performed)} href={""}>
                    {rightPostPile[0]}
                </Button>
                <Button className={this.props.classes.card} style={{background: blitzPile[1]}}
                        onClick={this.props.onCardClick('blitzPile',this.props.player,blitzPile[0],blitzPile[1],this.props.isSelected,this.props.selectedCard,this.props.playing,this.props.performed)} href={""}>
                    {blitzPile[0]}
                </Button>
                <Button className={this.props.classes.card} style={{background:woodPile[1]}}
                        onClick={this.props.onCardClick('woodPile',this.props.player,woodPile[0],woodPile[1],this.props.isSelected,this.props.selectedCard,this.props.playing,this.props.performed)} href={""}>
                    {woodPile[0]}
                </Button>

            </div>
            </div>

        );
    }
}



const mapDispatchToProps= dispatch => {
    return ({
        onCardClick: (pile,player,number,color,isSelected,selectedCard,playing, performed) => (() =>{

        const destination = {pile: pile,player: player, number: number, color:color};

            if(performed>9){dispatch(canWin())}

            if(playing && isSelected && authorized(selectedCard,destination)){

                dispatch(putCard(pile, player,number,color,selectedCard));
                dispatch(removeCard(selectedCard.pile, selectedCard.player,selectedCard.number,selectedCard.color));
                dispatch(actionPerformed());
                dispatch(resetSelect());
                if(performed>9){
                    dispatch(canWin())
                }


            }
            else if(playing && canSelect(number)){
                dispatch(storeCard(pile, player, number, color));
                dispatch(newSelect(true))
            }
            }),

        onHandClick: (i,playing)=>(() => {
            //take cards from the hand
            if(playing) {
                dispatch(takeHand(i))
            }
        }),



    });
};


const mapStateToProps = state => {

        let data = ['1', '2', '3', '4'].map(element => {
            return ({
                blitzPile: state.playerDataReducer.playerData[`player${element}Data`].blitzPile,
                leftPostPile: state.playerDataReducer.playerData[`player${element}Data`].leftPostPile,
                middlePostPile: state.playerDataReducer.playerData[`player${element}Data`].middlePostPile,
                rightPostPile: state.playerDataReducer.playerData[`player${element}Data`].rightPostPile,
                woodPile: state.playerDataReducer.playerData[`player${element}Data`].woodPile,
                hand: state.playerDataReducer.playerData[`player${element}Data`].hand,
                name: state.playerDataReducer.playerData[`player${element}Data`].name,
            })
        });



    return (
            {
                player1Data: data[0],
                player2Data: data[1],
                player3Data: data[2],
                player4Data: data[3],

                isSelected:state.isSelectedReducer.isSelected,
                selectedCard: state.moveReducer.move,
                playing: state.playingReducer.playing,
                performed: state.performedReducer.performed,

            }
        )

};


function authorized(selectedCard, destination){

    console.log(selectedCard.player);
    console.log(destination.player);
    console.log(typeof(selectedCard.player));
    console.log(typeof(destination.player));

    if(!(selectedCard.player.localeCompare(destination.player)===0)){
        return false
    }
    else if(destination.pile.localeCompare('blitzPile')===0 ||destination.pile.localeCompare('woodPile')===0){
        return false
    }
    else if((superpositionNumber(selectedCard, destination) && superpositionColor(selectedCard, destination)) || firstOfPile(selectedCard, destination)){
        return true
    }
    return false
}

function superpositionColor(selectedCard, destination){
    switch(destination.color){
        case'green':
            return selectedCard.color.localeCompare('red') === 0 || selectedCard.color.localeCompare('blue') === 0;
        case'yellow':
            return selectedCard.color.localeCompare('red') === 0 || selectedCard.color.localeCompare('blue') === 0;
        case'blue':
            return selectedCard.color.localeCompare('yellow') === 0 || selectedCard.color.localeCompare('green') === 0;
        case'red':
            return selectedCard.color.localeCompare('yellow') === 0 || selectedCard.color.localeCompare('green') === 0;
        default:
            return false
    }
}

function superpositionNumber(selectedCard, destination){
    return selectedCard.number === destination.number - 1;

}

function firstOfPile(selectedCard, destination){
    return (!destination || !destination.number || destination.number === 0);

}

function canSelect(number){
    return !(!number || number === 0);


}



PlayerBoard=connect(mapStateToProps,mapDispatchToProps)(PlayerBoard);

export default withStyles(styles)(PlayerBoard);


PlayerBoard.propTypes= {
    player: PropTypes.string,
    onHandClick: PropTypes.func,
    onCardClick: PropTypes.func,

    player1Data: PropTypes.shape({
        blitzPile: PropTypes.array,
        leftPostPile: PropTypes.array,
        middlePostPile: PropTypes.array,
        rightPostPile: PropTypes.array,
        woodPile: PropTypes.array,
        hand: PropTypes.array,
    }),

    player2Data: PropTypes.shape({
        blitzPile: PropTypes.array,
        leftPostPile: PropTypes.array,
        middlePostPile: PropTypes.array,
        rightPostPile: PropTypes.array,
        woodPile: PropTypes.array,
        hand: PropTypes.array,
    }),

    player3Data: PropTypes.shape({
        blitzPile: PropTypes.array,
        leftPostPile: PropTypes.array,
        middlePostPile: PropTypes.array,
        rightPostPile: PropTypes.array,
        woodPile: PropTypes.array,
        hand: PropTypes.array,
    }),

    player4Data: PropTypes.shape({
        blitzPile: PropTypes.array,
        leftPostPile: PropTypes.array,
        middlePostPile: PropTypes.array,
        rightPostPile: PropTypes.array,
        woodPile: PropTypes.array,
        hand: PropTypes.array,
    }),
    classes: PropTypes.object,
    styles: PropTypes.object,
    color: PropTypes.string,
};


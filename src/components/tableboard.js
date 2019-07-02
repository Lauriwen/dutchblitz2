import React from 'react';
import {withStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button'
import {PropTypes} from 'prop-types';
import {addCard} from '../actions/actions.js'
import {actionPerformed, canWin, removeCard} from "../actions/actions";
import {resetSelect} from "../actions/actions";
//define how the piles should look
const styles={
    //random card display
    card : {
        width: '12.25%',
        height: '150px',
        marginTop: '10px',
        marginBottom: '10px',
        marginRight: '10px',
        marginLeft: '10px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '50px',
        textAlign: 'center',
    }
}


class TableBoard extends React.Component{

    render(){

        return (

                <div style={this.props.style}> {}{/*plotting all piles*/}
                    <div style={{display:'flex'}}> {/*first row*/}
                        {
                            [0,1,2,3,4,5,6,7].map(element => {
                                return(
                                 <Button key={element} className={this.props.classes.card} style={{background:this.props.piles[element].color}}
                                         onClick={this.props.placeCard(element, (typeof(this.props.piles[element].number)).localeCompare("string")? this.props.piles[element].number : 0,this.props.piles[element].color, this.props.selectedCard,this.props.isSelected, this.props.performed)} href={""}>
                                     {this.props.piles[element].number}
                                 </Button>
                                )
                            })
                        }

                    </div>
                    <div style={{display:'flex'}}> {/*second row*/}
                        {
                            [8,9,10,11,12,13,14,15].map(element => {
                                return(
                                    <Button key={element} className={this.props.classes.card} style={{background:this.props.piles[element].color}}
                                            onClick={this.props.placeCard(element, (typeof(this.props.piles[element].number)).localeCompare("string")? this.props.piles[element].number : 0,this.props.piles[element].color, this.props.selectedCard,this.props.isSelected , this.props.performed)} href={""}>
                                        {this.props.piles[element].number}
                                    </Button>
                                )
                            })
                        }

                    </div>
                </div>
        );
    }
}




const mapDispatchToProps= dispatch => {
    return {
        placeCard: (pile,number,color, card,isSelected,performed) =>(() => {
            const destination={pile: pile, number: number, color: color};
            if(isSelected && isCorrect(card, destination)) {
                dispatch(addCard(pile, number, color, card));
                dispatch(removeCard(card.pile, card.player, card.number, card.color));
                dispatch(resetSelect());
                dispatch(actionPerformed());
                if(performed>9){dispatch(canWin())}
            }

        })


    };
}

const mapStateToProps = state => {

    let data = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(element => {
        if(state.dutchPilesReducer.dutchPiles[element] && state.dutchPilesReducer.dutchPiles[element][0]){ /*if the pile is defined and the first card is initialized*/
            return(
            {
                color:state.dutchPilesReducer.dutchPiles[element][0].color,
                number: state.dutchPilesReducer.dutchPiles[element][0].number,
            }
        )
        }
        return({ /*default*/
            color: 'rgba(210,0,125,0.49)',
            number: '',
        });
    });

    return (
        {
            piles: data,
            isSelected:state.isSelectedReducer.isSelected,
            selectedCard: state.moveReducer.move,
            performed: state.performedReducer.performed,

        }

    )

}

function isCorrect(card, destination){
    let correct= false;
    // eslint-disable-next-line array-callback-return
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(element => {
        if(destination.pile===element){
            if(((!destination.number || destination.number===0)&& card.number===1) || (destination.number===card.number-1 && destination.color.localeCompare(card.color)===0)){
                correct= true;

            }
        }

    });
    return correct
}


TableBoard=connect(mapStateToProps,mapDispatchToProps)(TableBoard);

export default withStyles(styles)(TableBoard);

TableBoard.propTypes={
    piles: PropTypes.array,
    isSelected : PropTypes.bool,
    selectedCard: PropTypes.object,
    performed:  PropTypes.number,
};
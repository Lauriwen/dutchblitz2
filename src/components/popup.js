import React from 'react';
import Button from '@material-ui/core/Button'


const PopUp = (props) => {
    const a = props.winners;

    return (

        <div style={{width: '100%', height: '680px',  fontWeight: 'bold', background: 'pink',textAlign: 'center',  color: 'white',display:'flex', flexDirection:'column'}} >
            <Button key={1} style = {{color:'RED', fontWeight: 'bold', fontSize: '200px', width: '100%'}} href={""}>
                BLITZ !
            </Button>

            <Button key={2} style = {{color:'#ffaf1e', fontWeight: 'bold', fontSize: '35px', width: '100%'}} href={""}>
                {'1 : ' +a[0][2]+  ' wins : '+a[0][1] + ' points !'}
            </Button>

            <Button key={3} style = {{color:'#769499', fontWeight: 'bold', fontSize: '30px', width: '100%'}} href={""}>
                {'2 : '+a[1][2] + ' : '+a[1][1] + ' points !'}
            </Button>

            <Button key={4} style = {{color:'#a1300d', fontWeight: 'bold', fontSize: '25px', width: '100%'}} href={""}>
                {'3 : '+a[2][2] + ' : '+a[2][1] + ' points !'}
            </Button>

            <Button key={6} style = {{color:'black', fontWeight: 'bold', fontSize: '20px', width: '100%'}}href={""}>
                {'4 : '+a[3][2] + ' : '+a[3][1] + ' points !'}
            </Button>



        </div>



    );
};

export default PopUp;
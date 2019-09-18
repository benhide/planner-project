import { Button, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { ItemDetails } from '.';
import { Kitchen } from '../engine/Kitchen';
import { DEFUALT_UNIT_DIM, DEFUALT_WALLUNIT_DIM, DEFUALT_WALL_DIM, DEFUALT_WORKTOP_DIM } from '../engine/widgets/defaults';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: '100%',
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '15px',
        },
        input: {
            display: 'none',
        },
        root: {
            padding: theme.spacing(3, 2),
            width: '10%',
            float: 'left' as 'left',
            color: '#57B05E',
            marginTop: '20px',
        },
    }),
);

export function ToolBox() {
    const style = useStyles();

    // const [localState, setLocalState] = React.useState({
    //     units: 0,
    //     wallunits: 0,
    //     worktops: 0,
    //     walls: 0,
    // });

    // const dispatch = useDispatch();

    // Adds a unit to the kitchen
    function addUnit(e: any) {
        Kitchen.getInstance().addItem(DEFUALT_UNIT_DIM.w, DEFUALT_UNIT_DIM.l, e.clientX, e.clientY, false, true, 'add_unit');
        // const state = { ...localState, units: localState.units += 1 };
        // setLocalState(state);
        // // dispatch(AddItem(localState.units));
    }

    // Adds a worktop to the kitchen
    function addWorktop(e: any) {
        Kitchen.getInstance().addItem(DEFUALT_WORKTOP_DIM.w, DEFUALT_WORKTOP_DIM.l, e.clientX, e.clientY, true, true, 'add_worktop');
    }

    // Adds a wall to the kitchen
    function addWallunit(e: any) {
        Kitchen.getInstance().addItem(DEFUALT_WALLUNIT_DIM.w, DEFUALT_WALLUNIT_DIM.l, e.clientX, e.clientY, false, true, 'add_wallunit');
    }

    // Adds a wall to the kitchen
    function addWall(e: any) {
        Kitchen.getInstance().addItem(DEFUALT_WALL_DIM.w, DEFUALT_WALL_DIM.l, e.clientX, e.clientY, true, true, 'add_wall');
    }

    // Render the jsx
    return (
        <div>
            <Paper className={style.root}>
                <Typography variant="h4">Tool Box</Typography>
                <Button variant="contained" className={style.button} onClick={(e) => addUnit(e)}>
                    Add Unit
                </Button>
                <Button variant="contained" className={style.button} onClick={(e) => addWorktop(e)}>
                    Add Worktop
                </Button>
                <Button variant="contained" className={style.button} onClick={(e) => addWallunit(e)}>
                    Add Wall Unit
                </Button>
                <Button variant="contained" className={style.button} onClick={(e) => addWall(e)}>
                    Add Wall
                </Button>
                <Button variant="contained" className={style.button}>
                    Other
                </Button>
                <Button variant="contained" className={style.button}>
                    Another
                </Button>
                <Button variant="contained" className={style.button}>
                    And Another
                </Button>
                <ItemDetails itemSelected={'Items'} itemInfo={'Infomation'} itemImg={'img'} />
            </Paper>
        </div>
    );
}

// const mapStateToProps = (state: any) => {
//     // stuff
//     return {
//         unit: state.units,
//     };
// };

// function mapDispatchToProps() {
//     // more stuff
// }

// const connectedStateAndProps = connect(
//     null,
//     // mapDispatchToProps,
// );

// export default connectedStateAndProps(ToolBox);

// import { useDispatch } from 'react-redux';
// import { AddItem } from '../redux/actions/KitchenActions';

import { Button, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import {
    DEFAULT_UNIT_ZINDEX,
    DEFAULT_WALLUNIT_ZINDEX,
    DEFAULT_WALL_ZINDEX,
    DEFAULT_WORKTOP_ZINDEX,
    DEFUALT_UNIT_DIM,
    DEFUALT_WALLUNIT_DIM,
    DEFUALT_WALL_DIM,
    DEFUALT_WORKTOP_DIM,
} from '../utilities/Defaults';
import { GenerateId } from '../engine/WidgetsID';
import { Kitchen } from '../engine/Kitchen';
import { Unit } from '../engine/widgets/Unit';
import { Wall } from '../engine/widgets/Wall';
import { WallUnit } from '../engine/widgets/WallUnit';
import { WorkTop } from '../engine/widgets/Worktop';
import { AddWidget } from '../redux/actions/KitchenActions';
import { Store } from '../redux/ConfigureStore';
import { ItemDetails } from './ItemDetails';
// import { AddItem } from '../engine/Widgets';
//  AddUnit, AddWall, AddWallunit, AddWorktop;

// Component styling
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

// Toolbox react component
export const ToolBox = () => {
    const style = useStyles();

    // Adds a unit to the kitchen
    const addUnit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const unit = new Unit(
            DEFUALT_UNIT_DIM.w,
            DEFUALT_UNIT_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_UNIT_ZINDEX,
            GenerateId.nextUnitId(),
            false,
            true,
        );
        unit.isSelected = true;
        unit.isHeld = true;
        Kitchen.getInstance().widgets.push(unit);
        Kitchen.getInstance().sortArrayByZIndex();
        Store.dispatch(AddWidget(unit));
    };

    // Adds a worktop to the kitchen
    const addWorktop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const worktop = new WorkTop(
            DEFUALT_WORKTOP_DIM.w,
            DEFUALT_WORKTOP_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WORKTOP_ZINDEX,
            GenerateId.nextWorktopId(),
            true,
            true,
        );
        worktop.isSelected = true;
        worktop.isHeld = true;
        Kitchen.getInstance().widgets.push(worktop);
        Kitchen.getInstance().sortArrayByZIndex();
        Store.dispatch(AddWidget(worktop));
    };

    // Adds a wall to the kitchen
    const addWallunit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const wallunit = new WallUnit(
            DEFUALT_WALLUNIT_DIM.w,
            DEFUALT_WALLUNIT_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WALLUNIT_ZINDEX,
            GenerateId.nextWallunitId(),
            false,
            true,
        );
        wallunit.isSelected = true;
        wallunit.isHeld = true;
        Kitchen.getInstance().widgets.push(wallunit);
        Kitchen.getInstance().sortArrayByZIndex();
        Store.dispatch(AddWidget(wallunit));
    };

    // Adds a wall to the kitchen
    const addWall = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const wall = new Wall(
            DEFUALT_WALL_DIM.w,
            DEFUALT_WALL_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WALL_ZINDEX,
            GenerateId.nextWallId(),
            true,
            true,
        );
        wall.isSelected = true;
        wall.isHeld = true;
        Kitchen.getInstance().widgets.push(wall);
        Kitchen.getInstance().sortArrayByZIndex();
        Store.dispatch(AddWidget(wall));
    };

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
};

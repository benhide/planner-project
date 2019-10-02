import { Button, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { Unit } from '../engine/widgets/Unit';
import { Wall } from '../engine/widgets/Wall';
import { WallUnit } from '../engine/widgets/WallUnit';
import { GenerateId } from '../engine/widgets/WidgetsID';
import { WorkTop } from '../engine/widgets/Worktop';
import { AddWidget } from '../redux/actions/WidgetActions';
import { store } from '../redux/ConfigureStore';
import {
    DEFAULT_UNIT_TYPE,
    DEFAULT_UNIT_ZINDEX,
    DEFAULT_WALLUNIT_TYPE,
    DEFAULT_WALLUNIT_ZINDEX,
    DEFAULT_WALL_TYPE,
    DEFAULT_WALL_ZINDEX,
    DEFAULT_WORKTOP_TYPE,
    DEFAULT_WORKTOP_ZINDEX,
    DEFUALT_UNIT_DIM,
    DEFUALT_WALLUNIT_DIM,
    DEFUALT_WALL_DIM,
    DEFUALT_WORKTOP_DIM,
    WREN_GREEN,
} from '../utilities/Defaults';
import { WidgetDetails } from './WidgetDetails';

// Styling
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: '100%',
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '15px',
        },
        root: {
            padding: theme.spacing(3, 2),
            width: '10%',
            float: 'left' as 'left',
            color: WREN_GREEN,
            marginTop: '20px',
        },
    }),
);

// Toolbox react component
export const ToolBox = (): JSX.Element => {
    const style = useStyles();

    // Adds a unit to the kitchen
    const addUnit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const unit = new Unit(
            DEFUALT_UNIT_DIM.w,
            DEFUALT_UNIT_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_UNIT_ZINDEX,
            GenerateId.nextUnitId(),
            false,
            true,
            DEFAULT_UNIT_TYPE,
        );
        unit.isSelected = true;
        unit.isHeld = true;
        store.dispatch(AddWidget(unit));
    };

    // Adds a worktop to the kitchen
    const addWorktop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const worktop = new WorkTop(
            DEFUALT_WORKTOP_DIM.w,
            DEFUALT_WORKTOP_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WORKTOP_ZINDEX,
            GenerateId.nextWorktopId(),
            true,
            true,
            DEFAULT_WORKTOP_TYPE,
        );
        worktop.isSelected = true;
        worktop.isHeld = true;
        store.dispatch(AddWidget(worktop));
    };

    // Adds a wall to the kitchen
    const addWallunit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const wallunit = new WallUnit(
            DEFUALT_WALLUNIT_DIM.w,
            DEFUALT_WALLUNIT_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WALLUNIT_ZINDEX,
            GenerateId.nextWallunitId(),
            false,
            true,
            DEFAULT_WALLUNIT_TYPE,
        );
        wallunit.isSelected = true;
        wallunit.isHeld = true;
        store.dispatch(AddWidget(wallunit));
    };

    // Adds a wall to the kitchen
    const addWall = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const wall = new Wall(
            DEFUALT_WALL_DIM.w,
            DEFUALT_WALL_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WALL_ZINDEX,
            GenerateId.nextWallId(),
            true,
            true,
            DEFAULT_WALL_TYPE,
        );
        wall.isSelected = true;
        wall.isHeld = true;
        store.dispatch(AddWidget(wall));
    };

    // Render the JSX
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
                <WidgetDetails itemSelected={'Items'} itemInfo={'Information'} itemImg={'img'} />
            </Paper>
        </div>
    );
};

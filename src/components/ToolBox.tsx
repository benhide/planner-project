import { Paper, Slide, Typography } from '@material-ui/core';
import * as React from 'react';
import { Unit } from '../engine/widgets/Unit';
import { Wall } from '../engine/widgets/Wall';
import { WallUnit } from '../engine/widgets/WallUnit';
import { GenerateIDs } from '../engine/widgets/WidgetsID';
import { WorkTop } from '../engine/widgets/Worktop';
import { AddWidget } from '../redux/actions/WidgetActions';
import { store } from '../redux/ConfigureStore';
import { ColorButton, toolBoxStyle } from '../style/Styles';
import {
    DEFAULT_WALL_DIMENSIONS,
    UNIT_DIMENSIONS,
    UNIT_INFO,
    UNIT_TYPE,
    UNIT_ZINDEX,
    WALLUNIT_DIMENSIONS,
    WALLUNIT_INFO,
    WALLUNIT_TYPE,
    WALLUNIT_ZINDEX,
    WALL_TYPE,
    WALL_ZINDEX,
    WIDGET_INFO,
    WORKTOP_DIMENSIONS,
    WORKTOP_INFO,
    WORKTOP_TYPE,
    WORKTOP_ZINDEX,
} from '../utilities/Defaults';
import { IWidgetInfo } from '../utilities/Interfaces';
import { WidgetDetails } from './WidgetDetails';

// Toolbox react component
export const ToolBox = (): JSX.Element => {
    // Styling
    const style = toolBoxStyle();

    // Local state
    const [widgetInfo, setWidgetInfo] = React.useState<IWidgetInfo>(WIDGET_INFO);
    const [checked, setChecked] = React.useState(false);

    // Adds a unit to the kitchen
    const addUnit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const { width, length } = UNIT_DIMENSIONS;
        const id = GenerateIDs.get().nextUnitId();
        const { clientX: x, clientY: y } = e;

        // New unit
        const unit = new Unit(width, length, x, y, UNIT_ZINDEX, id, false, true, UNIT_TYPE, UNIT_INFO);
        unit.isHeldAndSelected = true;
        store.dispatch(AddWidget(unit));
        setWidgetInfo(unit.widgetInfo);
        setChecked(true);
    };

    // Adds a worktop to the kitchen
    const addWorktop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const { width, length } = WORKTOP_DIMENSIONS;
        const id = GenerateIDs.get().nextWorktopId();
        const { clientX: x, clientY: y } = e;

        // New worktop
        const worktop = new WorkTop(width, length, x, y, WORKTOP_ZINDEX, id, true, true, WORKTOP_TYPE, WORKTOP_INFO);
        worktop.isHeldAndSelected = true;
        store.dispatch(AddWidget(worktop));
        setWidgetInfo(worktop.widgetInfo);
        setChecked(true);
    };

    // Adds a wall to the kitchen
    const addWallunit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const { width, length } = WALLUNIT_DIMENSIONS;
        const id = GenerateIDs.get().nextWallunitId();
        const { clientX: x, clientY: y } = e;

        // New wallunit
        const wallunit = new WallUnit(width, length, x, y, WALLUNIT_ZINDEX, id, false, true, WALLUNIT_TYPE, WALLUNIT_INFO);
        wallunit.isHeldAndSelected = true;
        store.dispatch(AddWidget(wallunit));
        setWidgetInfo(wallunit.widgetInfo);
        setChecked(true);
    };

    // Adds a wall to the kitchen
    const addWall = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const { width, length } = DEFAULT_WALL_DIMENSIONS;
        const id = GenerateIDs.get().nextWallId();
        const { clientX: x, clientY: y } = e;

        // New wall
        const wall = new Wall(width, length, x, y, WALL_ZINDEX, id, true, true, WALL_TYPE, WIDGET_INFO);
        wall.isHeldAndSelected = true;
        store.dispatch(AddWidget(wall));
        setWidgetInfo(wall.widgetInfo);
        setChecked(false);
    };

    // Render the JSX
    return (
        <>
            <Paper className={style.root}>
                <Typography variant="h4">Tool Box</Typography>
                <ColorButton className={style.button} variant="contained" onClick={(e) => addUnit(e)}>
                    Add
                    <br />
                    Unit
                </ColorButton>
                <ColorButton className={style.button} variant="contained" onClick={(e) => addWorktop(e)}>
                    Add
                    <br />
                    Worktop
                </ColorButton>
                <ColorButton className={style.button} variant="contained" onClick={(e) => addWallunit(e)}>
                    Add
                    <br />
                    Wall Unit
                </ColorButton>
                <ColorButton className={style.button} variant="contained" onClick={(e) => addWall(e)}>
                    Add
                    <br />
                    Wall
                </ColorButton>
                <ColorButton className={style.button} variant="contained">
                    Add
                    <br />
                    Sink
                </ColorButton>
                <ColorButton className={style.button} variant="contained">
                    Add
                    <br />
                    Cooker
                </ColorButton>
                <ColorButton className={style.button} variant="contained">
                    Add
                    <br />
                    Fridge
                </ColorButton>
                <ColorButton className={style.button} variant="contained">
                    And
                    <br />
                    Dishwasher
                </ColorButton>
            </Paper>
            <Slide direction="right" in={checked} mountOnEnter unmountOnExit timeout={300}>
                <div>
                    <WidgetDetails widgetInfo={widgetInfo} />
                </div>
            </Slide>
        </>
    );
};

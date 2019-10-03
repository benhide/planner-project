import { Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { Unit } from '../engine/widgets/Unit';
import { Wall } from '../engine/widgets/Wall';
import { WallUnit } from '../engine/widgets/WallUnit';
import { GenerateId } from '../engine/widgets/WidgetsID';
import { WorkTop } from '../engine/widgets/Worktop';
import { AddWidget } from '../redux/actions/WidgetActions';
import { store } from '../redux/ConfigureStore';
import { ColorButton, toolBoxStyle } from '../style/Styles';
import {
    DEFAULT_UNIT_DIM,
    DEFAULT_UNIT_INFO,
    DEFAULT_UNIT_TYPE,
    DEFAULT_UNIT_ZINDEX,
    DEFAULT_WALLUNIT_DIM,
    DEFAULT_WALLUNIT_INFO,
    DEFAULT_WALLUNIT_TYPE,
    DEFAULT_WALLUNIT_ZINDEX,
    DEFAULT_WALL_DIM,
    DEFAULT_WALL_TYPE,
    DEFAULT_WALL_ZINDEX,
    DEFAULT_WORKTOP_DIM,
    DEFAULT_WORKTOP_INFO,
    DEFAULT_WORKTOP_TYPE,
    DEFAULT_WORKTOP_ZINDEX,
} from '../utilities/Defaults';
import { IWidgetInfo } from '../utilities/Interfaces';
import { WidgetDetails } from './WidgetDetails';

// Toolbox react component
export const ToolBox = (): JSX.Element => {
    // Styling
    const style = toolBoxStyle();

    // Local state
    const [widgetInfo, setWidgetInfo] = React.useState<IWidgetInfo>({ type: '', shortDesc: '', longDesc: '', colour: '', price: 0, image: '' });

    // Adds a unit to the kitchen
    const addUnit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const unit = new Unit(
            DEFAULT_UNIT_DIM.w,
            DEFAULT_UNIT_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_UNIT_ZINDEX,
            GenerateId.nextUnitId(),
            false,
            true,
            DEFAULT_UNIT_TYPE,
            DEFAULT_UNIT_INFO,
        );
        unit.isSelected = true;
        unit.isHeld = true;
        store.dispatch(AddWidget(unit));
        setWidgetInfo(unit.widgetInfo);
    };

    // Adds a worktop to the kitchen
    const addWorktop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const worktop = new WorkTop(
            DEFAULT_WORKTOP_DIM.w,
            DEFAULT_WORKTOP_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WORKTOP_ZINDEX,
            GenerateId.nextWorktopId(),
            true,
            true,
            DEFAULT_WORKTOP_TYPE,
            DEFAULT_WORKTOP_INFO,
        );
        worktop.isSelected = true;
        worktop.isHeld = true;
        store.dispatch(AddWidget(worktop));
        setWidgetInfo(worktop.widgetInfo);
    };

    // Adds a wall to the kitchen
    const addWallunit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const wallunit = new WallUnit(
            DEFAULT_WALLUNIT_DIM.w,
            DEFAULT_WALLUNIT_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WALLUNIT_ZINDEX,
            GenerateId.nextWallunitId(),
            false,
            true,
            DEFAULT_WALLUNIT_TYPE,
            DEFAULT_WALLUNIT_INFO,
        );
        wallunit.isSelected = true;
        wallunit.isHeld = true;
        store.dispatch(AddWidget(wallunit));
        setWidgetInfo(wallunit.widgetInfo);
    };

    // Adds a wall to the kitchen
    const addWall = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const wall = new Wall(
            DEFAULT_WALL_DIM.w,
            DEFAULT_WALL_DIM.l,
            e.clientX,
            e.clientY,
            DEFAULT_WALL_ZINDEX,
            GenerateId.nextWallId(),
            true,
            true,
            DEFAULT_WALL_TYPE,
            { type: '', shortDesc: '', longDesc: '', colour: '', price: 0, image: '' },
        );
        wall.isSelected = true;
        wall.isHeld = true;
        store.dispatch(AddWidget(wall));
        setWidgetInfo(wall.widgetInfo);
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
                {widgetInfo.type ? <WidgetDetails widgetInfo={widgetInfo} /> : null}
            </Paper>
        </>
    );
};

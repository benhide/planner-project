import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {
    DEFUALT_UNIT_PRICE,
    DEFUALT_WALLUNIT_PRICE,
    DEFUALT_WORKTOP_PRICE,
    SHIPPING_RATE,
    TAX_RATE,
    UNITS_BASKET_DESC,
    WALLUNITS_BASKET_DESC,
    WORKTOP_BASKET_DESC,
} from '../utilities/Defaults';
import { IItem, IPlannerState } from '../utilities/Interfaces';

// Styling for the component
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: '20px',
            fontSize: '15px',
            margin: theme.spacing(1),
            float: 'right' as 'right',
        },
        input: {
            display: 'none',
        },
        root: {
            padding: theme.spacing(3, 2),
            width: '25%',
            float: 'right' as 'right',
            color: '#57B05E',
            marginTop: '20px',
        },
        cell: {
            fontSize: '12px',
        },
    }),
);

// Basket component
export const Basket = (): JSX.Element => {
    // The basket items
    const basketItems: IItem[] = [];

    // The component styling
    const style = useStyles();

    // Format the number to currency formatting
    const currencyFormat = (num: number) => {
        return `${num.toFixed(2)}`;
    };

    // Craete an item in the basket items array
    const createItem = (desc: string, m2: number, qty: number, price: number): IItem => {
        const total = qty * price;
        return { desc, qty, m2, price, total };
    };

    // Update the basket
    const updateBasket = (): void => {
        // ************************************
        // CAN BE IMPROVED!!
        // TODO: ADD TO ARRAY WHEN ID MISSING
        // ************************************
        while (basketItems.length > 0) {
            basketItems.pop();
        }

        // Counts for basket items
        let unitCount = 0;
        let worktopCount = 0;
        let wallunitCount = 0;

        // Count basket items
        for (const widget of currentState.Widgets) {
            unitCount = widget.id >= 100 && widget.id < 200 ? (unitCount += 1) : unitCount;
            worktopCount = widget.id >= 200 && widget.id < 300 ? (worktopCount += 1) : worktopCount;
            wallunitCount = widget.id >= 300 && widget.id < 400 ? (wallunitCount += 1) : wallunitCount;
        }

        // Calculate the worktop square meterage
        const worktopMetersSquared = (): number => {
            let sum = 0;
            currentState.Widgets.forEach((widget) => {
                if (widget.id >= 200 && widget.id < 300) {
                    sum += (widget.dimensions.w / 100) * (widget.dimensions.l / 100);
                }
            });
            return sum;
        };

        // ************************************
        // CAN BE IMPROVED!!
        // TODO: ADD TO ARRAY WHEN ID MISSING
        // ************************************
        // Push items to the basket
        if (unitCount > 0) {
            basketItems.push(createItem(UNITS_BASKET_DESC, 0, unitCount, DEFUALT_UNIT_PRICE));
        }
        if (wallunitCount > 0) {
            basketItems.push(createItem(WALLUNITS_BASKET_DESC, 0, wallunitCount, DEFUALT_WALLUNIT_PRICE));
        }
        if (worktopCount > 0) {
            basketItems.push(createItem(WORKTOP_BASKET_DESC, worktopMetersSquared(), worktopCount, DEFUALT_WORKTOP_PRICE));
        }
    };

    // Get the current state from redux store and update the basket
    const currentState = useSelector((state) => state as IPlannerState);
    updateBasket();

    // Calculate the totals
    const subtotal = basketItems.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
    const invoiceTaxes = TAX_RATE * subtotal;
    const shippingTotal = SHIPPING_RATE * subtotal;
    const invoiceTotal = subtotal + invoiceTaxes + shippingTotal;

    // Genereate the data for each row
    const row = (item: IItem): JSX.Element => {
        const sqrd = (
            <span>
                {item.m2 + 'm'}
                <sup>2</sup>
            </span>
        );

        // Return the JSX
        return (
            <TableRow key={item.desc}>
                <TableCell className={style.cell}>{item.desc}</TableCell>
                <TableCell className={style.cell} align="center">
                    {item.qty}
                </TableCell>
                <TableCell className={style.cell} align="center">
                    {item.m2 === 0 ? null : sqrd}
                </TableCell>
                <TableCell className={style.cell} align="center">
                    {item.m2 === 0 ? `£${currencyFormat(item.price)}` : `£${currencyFormat(item.price * item.m2)}`}
                </TableCell>
                <TableCell className={style.cell} align="center">{`£${currencyFormat(item.total)}`}</TableCell>
            </TableRow>
        );
    };

    // Render the JSX
    return (
        <div>
            <Paper className={style.root}>
                <Typography variant="h4">Basket</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Desc</TableCell>
                            <TableCell size="small" align="left">
                                Quanity
                            </TableCell>
                            <TableCell size="small" align="left">
                                Size
                            </TableCell>
                            <TableCell size="small" align="left">
                                Price
                            </TableCell>
                            <TableCell size="small" align="left">
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basketItems.map((item) => row(item))}
                        <TableRow>
                            <TableCell className={style.cell} rowSpan={4} />
                            <TableCell className={style.cell} colSpan={3}>
                                Subtotal
                            </TableCell>
                            <TableCell className={style.cell} align="right">{`£${currencyFormat(subtotal)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={style.cell} colSpan={2}>
                                VAT
                            </TableCell>
                            <TableCell className={style.cell} align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell className={style.cell} align="right">{`£${currencyFormat(invoiceTaxes)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={style.cell} colSpan={3}>
                                Shipping
                            </TableCell>
                            <TableCell className={style.cell} align="right">{`£${currencyFormat(shippingTotal)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={style.cell} colSpan={3}>
                                Total
                            </TableCell>
                            <TableCell className={style.cell} align="right">{`£${currencyFormat(invoiceTotal)}`}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button variant="contained" className={style.button} onClick={() => ({})}>
                    Buy Now
                </Button>
            </Paper>
        </div>
    );
};

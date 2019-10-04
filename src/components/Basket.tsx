import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { basketStyle, ColorButton } from '../style/Styles';
import {
    UNIT_PRICE,
    WALLUNIT_PRICE,
    WORKTOP_PRICE,
    SHIPPING_RATE,
    TAX_RATE,
    UNITS_BASKET_DESCRIPTION,
    WALLUNITS_BASKET_DESCRIPTION,
    WORKTOP_BASKET_DESCRIPTION,
} from '../utilities/Defaults';
import { IItem, IReduxPlannerState } from '../utilities/Interfaces';

// Basket component
export const Basket = (): JSX.Element => {
    // The basket items
    const basketItems: IItem[] = [];

    // The component styling
    const style = basketStyle();

    // Format the number to currency formatting
    const currencyFormat = (num: number): string => {
        return `${num.toFixed(2)}`;
    };

    // Create an item in the basket items array
    const createItem = (desc: string, m2: number, qty: number, price: number): IItem => {
        const total = m2 === 0 ? qty * price : m2 * qty * price;
        return { description: desc, quanity: qty, meteresSquared: m2, price, total };
    };

    // Update the basket
    const updateBasket = (): void => {
        while (basketItems.length > 0) {
            basketItems.pop();
        }
        // Counts for basket items
        let unitCount = 0;
        let worktopCount = 0;
        let wallunitCount = 0;

        // Count basket items
        for (const widget of widgets) {
            unitCount = widget.id >= 100 && widget.id < 200 ? (unitCount += 1) : unitCount;
            worktopCount = widget.id >= 200 && widget.id < 300 ? (worktopCount += 1) : worktopCount;
            wallunitCount = widget.id >= 300 && widget.id < 400 ? (wallunitCount += 1) : wallunitCount;
        }
        // Calculate the worktop square meterage
        const worktopMetersSquared = (): number => {
            let sum = 0;
            widgets.forEach((widget) => {
                if (widget.id >= 200 && widget.id < 300) {
                    sum += (widget.dimensions.width / 100) * (widget.dimensions.length / 100);
                }
            });
            return Math.round(sum * 10) / 10;
        };

        // Push items to the basket
        if (unitCount > 0) {
            basketItems.push(createItem(UNITS_BASKET_DESCRIPTION, 0, unitCount, UNIT_PRICE));
        }
        if (wallunitCount > 0) {
            basketItems.push(createItem(WALLUNITS_BASKET_DESCRIPTION, 0, wallunitCount, WALLUNIT_PRICE));
        }
        if (worktopCount > 0) {
            basketItems.push(createItem(WORKTOP_BASKET_DESCRIPTION, worktopMetersSquared(), worktopCount, WORKTOP_PRICE));
        }
    };

    // Get the current state from redux store and update the basket
    const currentState = useSelector((state) => state as IReduxPlannerState);
    const widgets = currentState.kitchen.widgets;
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
                {item.meteresSquared + 'm'}
                <sup>2</sup>
            </span>
        );

        // Return the JSX
        return (
            <TableRow key={item.description}>
                <TableCell className={style.cell}>{item.description}</TableCell>
                <TableCell className={style.cell} align="left">
                    {item.quanity}
                </TableCell>
                <TableCell className={style.cell} align="left">
                    {item.meteresSquared === 0 ? null : sqrd}
                </TableCell>
                <TableCell className={style.cell} align="left">
                    {item.meteresSquared === 0 ? `£${currencyFormat(item.price)}` : `£${currencyFormat(item.price * item.meteresSquared)}`}
                </TableCell>
                <TableCell className={style.cell} align="left">{`£${currencyFormat(item.total)}`}</TableCell>
            </TableRow>
        );
    };

    // Render the JSX
    return (
        <>
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
                            <TableCell className={style.cell} rowSpan={4} align="left" />
                            <TableCell className={style.cell} colSpan={3} align="left">
                                Subtotal
                            </TableCell>
                            <TableCell className={style.cell} align="left">{`£${currencyFormat(subtotal)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={style.cell} colSpan={2} align="left">
                                VAT
                            </TableCell>
                            <TableCell className={style.cell} align="left">{`${(TAX_RATE * 100).toFixed(0)}%`}</TableCell>
                            <TableCell className={style.cell} align="left">{`£${currencyFormat(invoiceTaxes)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={style.cell} colSpan={3} align="left">
                                Shipping
                            </TableCell>
                            <TableCell className={style.cell} align="left">{`£${currencyFormat(shippingTotal)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={style.cell} colSpan={3} align="left">
                                Total
                            </TableCell>
                            <TableCell className={style.cell} align="left">{`£${currencyFormat(invoiceTotal)}`}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <ColorButton
                    variant="contained"
                    className={style.button}
                    onClick={() => {
                        invoiceTotal > 0 ? toast.success('Your new kitchen has been ordered!') : toast.warn('Your kitchen is empty!');
                    }}
                >
                    Buy Now
                </ColorButton>
            </Paper>
        </>
    );
};

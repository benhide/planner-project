import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';

const TAX_RATE = 0.2;
const SHIPPING_RATE = 0.25;
const itemsArray: IItem[] = [];

const UNITS_ID = 'Units';
const WALLUNITS_ID = 'Wall Units';
const WORKTOP_ID = 'Worktops';

// *****************************************
// HARD CODED PRICES
// GLOBALS ABOVE ^^^
// INTERFACES BELOW \/\/\/
// *****************************************

interface IItem {
    desc: string;
    qty: number;
    price: number;
    total: number;
}

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
    }),
);

function currencyFormat(num: number): string {
    return `${num.toFixed(2)}`;
}

function priceRow(qty: number, price: number): number {
    return qty * price;
}

function subtotal(items: IItem[]): number {
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}

function invoiceTaxes(items: IItem[]): number {
    return TAX_RATE * subtotal(items);
}

function shippingTotal(items: IItem[]): number {
    return SHIPPING_RATE * subtotal(items);
}

function invoiceTotal(items: IItem[]): number {
    return invoiceTaxes(items) + subtotal(items) + shippingTotal(items);
}

function createItem(desc: string, qty: number, price: number): IItem {
    const total = priceRow(qty, price);
    return { desc, qty, price, total };
}

function updateItems(currentItems: object): void {
    while (itemsArray.length > 0) {
        itemsArray.pop();
    }

    const unitCount = Object.values(currentItems)[0].length;
    const wallunitCount = Object.values(currentItems)[1].length;
    const worktopCount = Object.values(currentItems)[2].length;

    if (unitCount > 0) {
        itemsArray.push(createItem(UNITS_ID, unitCount, 35.99));
    }
    if (wallunitCount > 0) {
        itemsArray.push(createItem(WALLUNITS_ID, wallunitCount, 30.99));
    }
    if (worktopCount > 0) {
        itemsArray.push(createItem(WORKTOP_ID, worktopCount, 50.99));
    }
}

function Row(item: IItem): JSX.Element {
    return (
        <TableRow key={item.desc}>
            <TableCell>{item.desc}</TableCell>
            <TableCell align="right">{item.qty}</TableCell>
            <TableCell align="right">{`£ ${item.price}`}</TableCell>
            <TableCell align="right">{`£ ${currencyFormat(item.total)}`}</TableCell>
        </TableRow>
    );
}

export function Basket(props: any): JSX.Element {
    const style = useStyles();

    const currentState = useSelector((state) => (state as any) as object);
    updateItems(currentState);

    // Render the jsx
    return (
        <div>
            <Paper className={style.root}>
                <Typography variant="h4">Basket</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Desc</TableCell>
                            <TableCell size="small" align="right">
                                Quanity
                            </TableCell>
                            <TableCell size="small" align="right">
                                Price
                            </TableCell>
                            <TableCell size="small" align="right">
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemsArray.map((item) => Row(item))}
                        <TableRow>
                            <TableCell rowSpan={4} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{`£ ${currencyFormat(subtotal(itemsArray))}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>VAT</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{`£ ${currencyFormat(invoiceTaxes(itemsArray))}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Shipping</TableCell>
                            <TableCell align="right">{`£ ${currencyFormat(shippingTotal(itemsArray))}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{`£ ${currencyFormat(invoiceTotal(itemsArray))}`}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button variant="contained" className={style.button} onClick={() => ({})}>
                    Buy Now
                </Button>
            </Paper>
        </div>
    );
}

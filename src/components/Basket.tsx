import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { DEFUALT_UNIT_PRICE, DEFUALT_WALLUNIT_PRICE, DEFUALT_WORKTOP_PRICE } from '../Defaults';

interface IItem {
    desc: string;
    qty: number;
    m2: number;
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
        cell: {
            fontSize: '12px',
        },
    }),
);

export function Basket(): JSX.Element {
    const TAX_RATE = 0.2;
    const SHIPPING_RATE = 0.25;
    const itemsArray: IItem[] = [];

    const UNITS_ID = 'Units';
    const WALLUNITS_ID = 'Wall-units';
    const WORKTOP_ID = 'Worktops';

    const style = useStyles();

    function currencyFormat(num: number) {
        return `${num.toFixed(2)}`;
    }

    function createItem(desc: string, m2: number, qty: number, price: number): IItem {
        const total = qty * price;
        return { desc, qty, m2, price, total };
    }

    function updateItems(currentItems: object): void {
        while (itemsArray.length > 0) {
            itemsArray.pop();
        }

        const unitCount = Object.values(currentItems)[0].length;
        const wallunitCount = Object.values(currentItems)[1].length;
        const worktopCount = Object.values(currentItems)[2].length;

        function worktopMetersSquared(): number {
            const worktops = Object.values(currentItems)[2] as object[];
            let sum = 0;
            worktops.forEach((i) => {
                sum += (Object.values(i)[0].w / 100) * (Object.values(i)[0].l / 100);
            });
            return sum;
        }

        if (unitCount > 0) {
            itemsArray.push(createItem(UNITS_ID, 0, unitCount, DEFUALT_UNIT_PRICE));
        }
        if (wallunitCount > 0) {
            itemsArray.push(createItem(WALLUNITS_ID, 0, wallunitCount, DEFUALT_WALLUNIT_PRICE));
        }
        if (worktopCount > 0) {
            itemsArray.push(createItem(WORKTOP_ID, worktopMetersSquared(), worktopCount, DEFUALT_WORKTOP_PRICE));
        }
    }

    const currentState = useSelector((state) => (state as any) as object);
    updateItems(currentState);

    const subtotal = itemsArray.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
    const invoiceTaxes = TAX_RATE * subtotal;
    const shippingTotal = SHIPPING_RATE * subtotal;
    const invoiceTotal = subtotal + invoiceTaxes + shippingTotal;

    const row = (item: IItem): JSX.Element => {
        const sqrd = (
            <span>
                {item.m2 + 'm'}
                <sup>2</sup>
            </span>
        );
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

    // Render the jsx
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
                        {itemsArray.map((item) => row(item))}
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
}

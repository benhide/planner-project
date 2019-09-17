import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Kitchen } from '../engine/Kitchen';

const TAX_RATE = 0.2;

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

function priceRow(qty: number, unit: number): number {
    return qty * unit;
}

function createItem(id: number, desc: string, qty: number, price: number): IItem {
    const total = priceRow(qty, price);
    return { id, desc, qty, price, total };
}

interface IItem {
    id: number;
    desc: string;
    qty: number;
    price: number;
    total: number;
}

function subtotal(items: IItem[]): number {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const itemsArray: IItem[] = [];

function addItem(item: IItem): void {
    // itemsArray.push(createItem({item}));
}

const invoiceSubtotal = subtotal(itemsArray);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
const shippingTotal = invoiceTotal * 0.25;

function Row(item: IItem): JSX.Element {
    return (
        <TableRow key={item.id}>
            <TableCell>{item.desc}</TableCell>
            <TableCell align="right">{item.qty}</TableCell>
            <TableCell align="right">{`£ ${item.price}`}</TableCell>
            <TableCell align="right">{`£ ${currencyFormat(item.price)}`}</TableCell>
        </TableRow>
    );
}

export function Basket(): JSX.Element {
    const style = useStyles();

    // React.useEffect(() => {
    //     const stuff = 1;
    // }, []);

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
                            <TableCell align="right">{`£ ${currencyFormat(invoiceSubtotal)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>VAT</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{`£ ${currencyFormat(invoiceTaxes)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Shipping</TableCell>
                            <TableCell align="right">{`£ ${currencyFormat(shippingTotal)}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{`£ ${currencyFormat(invoiceTotal)}`}</TableCell>
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
//     mapStateToProps,
//     // mapDispatchToProps,
// );

// export default connectedStateAndProps(Basket);

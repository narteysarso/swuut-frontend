import { Switch, Route } from "react-router-dom"
import AllTransactions from "./views/all-transactions"
import TransactionDefault from "./views/default-transaction"


const TransactionsViewRouter = () => {
    return (
        <Switch>
            <Route path="/transactions/all">
                <AllTransactions />
            </Route>

            <Route path="/">
                <TransactionDefault />
            </Route>
        </Switch>

    )
}

export default TransactionsViewRouter
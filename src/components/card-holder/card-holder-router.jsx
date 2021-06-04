import { Switch, Route } from "react-router-dom"
import CardHolderDefault from "./views/default-card-holders"
import AllCardHolders from "./views/all-card-holders"



const CardHolderViewRouter = () => {
    return (
        <Switch>
            <Route path="/cardHolders/all">
                <AllCardHolders />
            </Route>

            <Route path="/">
                <CardHolderDefault />
            </Route>
        </Switch>

    )
}

export default CardHolderViewRouter
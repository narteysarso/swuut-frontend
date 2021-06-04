import { Switch, Route } from "react-router-dom"
import AllMerchants from "./views/all-merchants"
import MerchantDefault from "./views/default-merchant"



const MerchantsViewRouter = () => {
    return (
        <Switch>
            <Route path="/merchants/all">
                <AllMerchants />
            </Route>

            <Route path="/merchants">
                <MerchantDefault />
            </Route>
        </Switch>

    )
}

export default MerchantsViewRouter
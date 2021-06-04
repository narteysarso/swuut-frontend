import { Switch, Route } from "react-router-dom"
import AllConductors from "./views/all-conductors"
import ConductorDefault from "./views/default-conductor"



const ConductorsViewRouter = () => {
    return (
        <Switch>
            <Route path="/conductors/all">
                <AllConductors />
            </Route>

            <Route path="/conductors">
                <ConductorDefault />
            </Route>
        </Switch>

    )
}

export default ConductorsViewRouter
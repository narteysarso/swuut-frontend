import { Switch, Route } from "react-router-dom"
import AllStaff from "./views/all-staff"
import StaffManagmentDefault from "./views/default-staff-managment"


const StaffManagmentsViewRouter = () => {
    return (
        <Switch>
            <Route path="/staffManagment/all">
                <AllStaff />
            </Route>

            <Route path="/">
                <StaffManagmentDefault />
            </Route>
        </Switch>

    )
}

export default StaffManagmentsViewRouter
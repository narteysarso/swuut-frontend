import { Card } from "antd"
import AppForgottenPasswordForm from "./app-forgotten-password-form"

const AppForgottenPasswordCard = () => {
    return (
        <Card title="Password Recovery">
            <p>Provide the email you used to register for this platform.</p>
            <AppForgottenPasswordForm />
            <p>An email will be sent for you to reset your password.</p>
        </Card>
    )
}

export default AppForgottenPasswordCard
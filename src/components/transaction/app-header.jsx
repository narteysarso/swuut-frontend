import { Col, Row } from "antd"
import TransactionSubMenu from "./app-sub-menu"

const TransactionHeader = () => {
    return (
        <Row gutter={16} justify="center">
            <Col span={6}>
                <h3>Transactions</h3>
            </Col>
            <Col span={8}>
                <TransactionSubMenu />
            </Col>
        </Row>
    )
}

export default TransactionHeader
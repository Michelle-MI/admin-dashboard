import React, { useEffect, useState } from "react";
import { Table, Button, Card, Container, Row, Col } from "react-bootstrap";

const MemberActivationForm = ({ data }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (data?.accounts && Array.isArray(data.accounts)) {
      setAccounts(data.accounts);
    }
  }, [data]);

  const totalDeposits = accounts.reduce((sum, acc) => sum + (acc.Balance || 0), 0);
  const totalAdvances = accounts.reduce((sum, acc) => sum + (acc.AdvanceAmount || 0), 0);

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm border-0">
        {/* Updated label font-size to match Client Address Information */}
        <h6 className="mb-3 text-primary fw-bold border-bottom pb-2">Member Activation</h6>

        <Table striped bordered hover size="sm" className="mb-3">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Account ID</th>
              <th>Balance</th>
              <th>Advance Amount</th>
              <th>Institution Name</th>
              <th>Product Type</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No accounts found</td>
              </tr>
            ) : (
              accounts.map((account, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{account.AccountID}</td>
                  <td>{account.Balance?.toLocaleString()} UGX</td>
                  <td>{account.AdvanceAmount?.toLocaleString()} UGX</td>
                  <td>{account.InstitutionName}</td>
                  <td>{account.ProductType}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <div className="text-muted mb-3">
          Records from 1 to {accounts.length} of {accounts.length}
        </div>

        <Card className="p-3 bg-light border rounded mb-4">
          <Row className="mb-2">
            <Col md={6}><strong>Total Deposits:</strong> {totalDeposits.toLocaleString()} UGX</Col>
            <Col md={6}><strong>Total Interest Payable:</strong> 0.00 UGX</Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}><strong>Total Advances:</strong> {totalAdvances.toLocaleString()} UGX</Col>
            <Col md={6}><strong>Total Interest Receivable:</strong> 0.00 UGX</Col>
          </Row>
          <Row>
            <Col md={6}><strong>Total Non-Fund Advances:</strong> 0.00 UGX</Col>
            <Col md={6}><strong>Net Funds Used:</strong> {(totalAdvances - totalDeposits).toLocaleString()} UGX</Col>
          </Row>
        </Card>

        <div className="d-flex gap-2 justify-content-end">
          <Button variant="secondary">Back</Button>
          <Button variant="success">Approve</Button>
        </div>
      </Card>
    </Container>
  );
};

export default MemberActivationForm;

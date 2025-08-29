import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const IntroducerDetailsForm = ({ data, onInsertOrUpdate }) => {
  return (
    <Form>
      {/* Updated heading to match other sections */}
      <h6 className="mb-3 text-primary fw-bold">Introducer Client</h6>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Client ID</label>
          <Form.Control value={data?.IntroducerClientID || ''} readOnly />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Client Name</label>
          <Form.Control value={data?.IntroducerClientName || ''} readOnly />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Known Since (Years)</label>
          <Form.Control value={data?.KnownSince || ''} type="number" readOnly />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Branch ID</label>
          <Form.Control value={data?.OurBranchID || ''} readOnly />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Branch Name</label>
          <Form.Control value={data?.IntroducerBranchName || ''} readOnly />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Created By</label>
          <Form.Control value={data?.CreatedBy || ''} readOnly />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Created On</label>
          <Form.Control
            type="date"
            value={data?.CreatedOn ? data.CreatedOn.slice(0, 10) : ''}
            readOnly
          />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <label className="form-label-right me-2">Remarks</label>
          <Form.Control as="textarea" rows={2} value={data?.Remarks || ''} readOnly />
        </Col>
      </Row>

      {/* Button aligned to the right */}
      <div className="d-flex justify-content-end mt-3">
        <Button 
          variant="primary" 
          onClick={onInsertOrUpdate}
        >
          Insert / Update
        </Button>
      </div>
    </Form>
  );
};

export default IntroducerDetailsForm;

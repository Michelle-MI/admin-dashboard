import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AdditionalInformation = ({ data = {} }) => {
  return (
    <div className="mt-4 border rounded bg-light p-3">
      {/* Section Header */}
      <div
        className="px-3 py-2 mb-3 rounded"
        style={{ backgroundColor: '#0d6efd', color: 'white', fontWeight: 'normal' }}
      >
        Additional Information
      </div>

      <Form>
        <Row className="mb-2">
          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Status
            </Form.Label>
            <Form.Control type="text" defaultValue={data.ClientStatus || ""} readOnly />
          </Col>

          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Open Date
            </Form.Label>
            <Form.Control type="date" defaultValue={data.OpenedDate?.slice(0, 10) || ""} readOnly />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Created By
            </Form.Label>
            <Form.Control type="text" defaultValue={data.CreatedBy || ""} readOnly />
          </Col>

          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Created On
            </Form.Label>
            <Form.Control type="date" defaultValue={data.CreatedOn?.slice(0, 10) || ""} readOnly />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Modified By
            </Form.Label>
            <Form.Control type="text" defaultValue={data.ModifiedBy || ""} readOnly />
          </Col>

          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Modified On
            </Form.Label>
            <Form.Control type="date" defaultValue={data.ModifiedOn?.slice(0, 10) || ""} readOnly />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Supervised By
            </Form.Label>
            <Form.Control type="text" defaultValue={data.SupervisedBy || ""} readOnly />
          </Col>

          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Supervised On
            </Form.Label>
            <Form.Control type="date" defaultValue={data.SupervisedOn?.slice(0, 10) || ""} readOnly />
          </Col>
        </Row>

        {/* Closed Date moved here */}
        <Row className="mb-2">
          <Col md={6} className="d-flex align-items-center">
            <Form.Label className="form-label-right me-2" style={{ fontWeight: 'normal' }}>
              Closed Date
            </Form.Label>
            <Form.Control type="date" defaultValue={data.ClosedDate?.slice(0, 10) || ""} readOnly />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdditionalInformation;

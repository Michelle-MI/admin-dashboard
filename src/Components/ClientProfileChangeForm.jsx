import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const ClientProfileChangeForm = ({ data }) => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    age: '',
    ageAsOn: '',
    documentsReceived: '',
    receivedOn: '',
    changedReason: '',
    remarks: '',
    clientType: '',
    clientName: '',
  });

  useEffect(() => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        title: data.TitleID || '',
        firstName: data.FirstName || '',
        middleName: data.MiddleName || '',
        lastName: data.LastName || '',
        gender:
          data.GenderID === 'M'
            ? 'Male'
            : data.GenderID === 'F'
            ? 'Female'
            : data.GenderID === 'O'
            ? 'Other'
            : '',
        dob: data.DateOfBirth ? data.DateOfBirth.split('T')[0] : '',
        age: data.Age || '',
        ageAsOn: data.AgeAsOn || '',
        clientType: data.ClientType || '',
        clientName: data.Name || '',
      }));
    }
  }, [data]);

  return (
    <Form className="p-3">
      {/* Updated heading font-size to match other sections */}
      <h6 className="mb-3 text-primary fw-bold">Client Profile Changing</h6>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Client Name</Form.Label>
          <Form.Control name="clientName" value={formData.clientName} readOnly />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Client Type</Form.Label>
          <Form.Select name="clientType" value={formData.clientType} disabled>
            <option>--Select--</option>
            <option>Individual</option>
            <option>Group</option>
            <option>Corporate</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Title</Form.Label>
          <Form.Select name="title" value={formData.title} disabled>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
            <option>Ms</option>
          </Form.Select>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={formData.firstName} readOnly />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Middle Name</Form.Label>
          <Form.Control type="text" name="middleName" value={formData.middleName} readOnly />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={formData.lastName} readOnly />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Gender</Form.Label>
          <Form.Select name="gender" value={formData.gender} disabled>
            <option>-- Select --</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Select>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Date of Birth</Form.Label>
          <Form.Control type="date" name="dob" value={formData.dob} readOnly />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Documents Received</Form.Label>
          <Form.Control type="text" name="documentsReceived" value={formData.documentsReceived} readOnly />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Received On</Form.Label>
          <Form.Select name="receivedOn" value={formData.receivedOn} disabled>
            <option>--Select--</option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last Week</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Changed Reason</Form.Label>
          <Form.Select name="changedReason" value={formData.changedReason} disabled>
            <option>--Select--</option>
            <option>Correction</option>
            <option>Update</option>
            <option>Other</option>
          </Form.Select>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Form.Label className="form-label-right me-2">Remarks</Form.Label>
          <Form.Control as="textarea" rows={1} name="remarks" value={formData.remarks} readOnly />
        </Col>
      </Row>

      {/* Align buttons to the right */}
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="secondary" disabled>Edit</Button>
        <Button variant="success" disabled>Save</Button>
      </div>
    </Form>
  );
};

export default ClientProfileChangeForm;

import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";

const DemiseDetailsForm = ({ data }) => {
  const [formData, setFormData] = useState({
    demiseDate: "",
    reasonId: "",
    reason: "",
    documentProofId: "",
    notificationDate: "",
    remarks: "",
    createdBy: "",
    modifiedBy: "",
    supervisedBy: "",
  });

  const [isAlive, setIsAlive] = useState(false);

  useEffect(() => {
    if (!data?.demise) {
      setIsAlive(true); // No demise info → client alive
      return;
    }

    const d = data.demise;
    setFormData({
      demiseDate: d.DemiseDate ? d.DemiseDate.split("T")[0] : "",
      reasonId: d.ReasonID || "",
      reason: d.Reason || "",
      documentProofId: d.DocumentProofID || "",
      notificationDate: d.NotificationDate ? d.NotificationDate.split("T")[0] : "",
      remarks: d.Remarks || "",
      createdBy: d.CreatedBy || "",
      modifiedBy: d.ModifiedBy || "",
      supervisedBy: d.SupervisedBy || "",
    });
  }, [data]);

  if (isAlive) {
    return <Alert variant="success">✅ This client is alive. No demise details found.</Alert>;
  }

  return (
    <Form className="p-3">
      <h5 className="mb-3 text-primary">Demise Details</h5>

      <Row className="mb-2">
        <Col md={6}>
          <Form.Label>Demise Date</Form.Label>
          <Form.Control type="date" value={formData.demiseDate} readOnly />
        </Col>
        <Col md={6}>
          <Form.Label>Reason ID</Form.Label>
          <Form.Select value={formData.reasonId} disabled>
            <option value="">-- Select --</option>
            <option value="1">Illness</option>
            <option value="2">Accident</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6}>
          <Form.Label>Reason</Form.Label>
          <Form.Control as="textarea" rows={1} value={formData.reason} readOnly />
        </Col>
        <Col md={6}>
          <Form.Label>Proof Document</Form.Label>
          <Form.Select value={formData.documentProofId} disabled>
            <option value="">-- Select --</option>
            <option value="1">Death Certificate</option>
            <option value="2">Police Report</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6}>
          <Form.Label>Notification Date</Form.Label>
          <Form.Control type="date" value={formData.notificationDate} readOnly />
        </Col>
        <Col md={6}>
          <Form.Label>Remarks</Form.Label>
          <Form.Control as="textarea" rows={1} value={formData.remarks} readOnly />
        </Col>
      </Row>

      <h6 className="text-primary mt-4 mb-3">Additional Information</h6>

      <Row className="mb-2">
        <Col md={4}>
          <Form.Label>Created By</Form.Label>
          <Form.Control type="text" value={formData.createdBy} readOnly />
        </Col>
        <Col md={4}>
          <Form.Label>Modified By</Form.Label>
          <Form.Control type="text" value={formData.modifiedBy} readOnly />
        </Col>
        <Col md={4}>
          <Form.Label>Supervised By</Form.Label>
          <Form.Control type="text" value={formData.supervisedBy} readOnly />
        </Col>
      </Row>
    </Form>
  );
};

export default DemiseDetailsForm;

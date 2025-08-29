import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

const SignaturePhotoForm = ({ data }) => {
  const currentDate = new Date().toLocaleDateString();

  // Extract base64 images + metadata
  const signatureBase64 = data?.Signature;
  const photoBase64 = data?.Photo;

  const branchName = data?.BranchName || "Unknown Branch";
  const branchId = data?.BranchID || "??";

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => {
    setModalImage(img);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <h5 className="text-center text-primary fw-bold mb-2">BANTU</h5>
      <p className="text-center text-muted mb-4">
        [{branchId} - {branchName} | Date: {currentDate}]
      </p>

      <Row className="mb-4">
        {/* Photo Section FIRST */}
        <Col md={6} className="border-end">
          <div
            className="mb-3 text-center bg-warning-subtle"
            style={{
              height: "200px",
              border: "1px solid #ced4da",
              cursor: photoBase64 ? "pointer" : "default"
            }}
            onClick={() =>
              photoBase64 &&
              openModal(`data:image/jpeg;base64,${photoBase64}`)
            }
          >
            {photoBase64 ? (
              <img
                src={`data:image/jpeg;base64,${photoBase64}`}
                alt="Client Photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <p className="pt-5 text-muted">Photograph Not Available</p>
            )}
          </div>

          {/* Photo fields in 2-column layout */}
          <Row className="mb-2">
            <Col xs={6}>
              <strong>Scanned By:</strong> {data?.PhotoScannedBy || "N/A"}
            </Col>
            <Col xs={6}>
              <strong>Scanned On:</strong> {data?.PhotoScannedOn || "N/A"}
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <strong>Supervised By:</strong> {data?.PhotoSupervisedBy || "N/A"}
            </Col>
            <Col xs={6}>
              <strong>Supervised On:</strong> {data?.PhotoSupervisedOn || "N/A"}
            </Col>
          </Row>
        </Col>

        {/* Signature Section SECOND */}
        <Col md={6}>
          <div
            className="mb-3 text-center bg-warning-subtle"
            style={{
              height: "200px",
              border: "1px solid #ced4da",
              cursor: signatureBase64 ? "pointer" : "default"
            }}
            onClick={() =>
              signatureBase64 &&
              openModal(`data:image/jpeg;base64,${signatureBase64}`)
            }
          >
            {signatureBase64 ? (
              <img
                src={`data:image/jpeg;base64,${signatureBase64}`}
                alt="Client Signature"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <p className="pt-5 text-muted">Signature Image Not Available</p>
            )}
          </div>

          {/* Signature fields in 2-column layout */}
          <Row className="mb-2">
            <Col xs={6}>
              <strong>Scanned By:</strong> {data?.SignatureScannedBy || "N/A"}
            </Col>
            <Col xs={6}>
              <strong>Scanned On:</strong> {data?.SignatureScannedOn || "N/A"}
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <strong>Supervised By:</strong> {data?.SignatureSupervisedBy || "N/A"}
            </Col>
            <Col xs={6}>
              <strong>Supervised On:</strong> {data?.SignatureSupervisedOn || "N/A"}
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Footer */}
      <Row className="align-items-center">
        <Col md={8} className="text-danger fw-semibold">
          <i className="bi bi-exclamation-triangle-fill"></i> Signature and Photograph are mandatory.
        </Col>
        <Col md={4} className="d-flex justify-content-end gap-2">
          <Button variant="secondary">Back</Button>
          <Button variant="primary">Print</Button>
        </Col>
      </Row>

      {/* Modal for expanded image */}
      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Body className="text-center">
          {modalImage && (
            <img
              src={modalImage}
              alt="Expanded"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignaturePhotoForm;

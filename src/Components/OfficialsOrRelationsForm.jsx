import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table, Modal } from "react-bootstrap";

const OfficialsOrRelationsForm = ({ data = [] }) => {
  const [relations, setRelations] = useState([]);

  const initialFormState = {
    name: "",
    address: "",
    mobile: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    relation: "",
    remarks: "",
  };

  const [relationForm, setRelationForm] = useState(initialFormState);
  const [modalShow, setModalShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const mapped = data.map((rel) => ({
      name: rel.ClientName || rel.Name || rel.name || "",
      address: rel.Address || rel.address || "",
      mobile: rel.Mobile || rel.mobile || "",
      phone: rel.Phone || rel.phone || "",
      email: rel.Email || rel.email || "",
      gender: rel.Gender || rel.GenderID || rel.gender || "",
      dob: rel.DateOfBirth || rel.DOB || rel.dob || "",
      relation: rel.Relation || rel.RelationID || rel.relation || "",
      remarks: rel.Remarks || rel.remarks || "",
    }));

    setRelations(mapped);
    setRelationForm(initialFormState);
  }, [data]);

  const handleInputChange = (field, value) => {
    setRelationForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdateRelation = () => {
    if (!relationForm.name || !relationForm.relation) {
      alert("Please fill at least Name and Relation.");
      return;
    }

    if (isEditing && editIndex !== null) {
      const updated = [...relations];
      updated[editIndex] = { ...relationForm };
      setRelations(updated);
    } else {
      setRelations((prev) => [...prev, { ...relationForm }]);
    }

    setRelationForm(initialFormState);
    setModalShow(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setRelationForm(relations[index]);
    setIsEditing(true);
    setEditIndex(index);
    setModalShow(true);
  };

  const openAddModal = () => {
    setRelationForm(initialFormState);
    setIsEditing(false);
    setEditIndex(null);
    setModalShow(true);
  };

  return (
    <div className="container px-3 mt-3">
      {/* Updated heading to match Client Address Information */}
      <h6 className="mb-3 text-primary fw-bold">Relations List</h6>

      <div className="ps-0">
        <Table bordered size="sm" className="mb-2 align-table">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Relation</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {relations.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  There Are No Items To Be Displayed
                </td>
              </tr>
            ) : (
              relations.map((rel, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rel.name}</td>
                  <td>{rel.relation}</td>
                  <td>{rel.gender}</td>
                  <td>{rel.mobile}</td>
                  <td>{rel.dob ? new Date(rel.dob).toLocaleDateString() : ""}</td>
                  <td>{rel.remarks}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <Button variant="success" onClick={openAddModal}>
          Add Relation
        </Button>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Relation" : "Add Relation"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Row 1 */}
            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Name</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={relationForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Address</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={relationForm.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Row 2 */}
            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Mobile</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={relationForm.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Phone</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={relationForm.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Email</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={relationForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Gender</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Select
                      value={relationForm.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Row 4 */}
            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Date of Birth</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type="date"
                      value={relationForm.dob ? relationForm.dob.split("T")[0] : ""}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Relation</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Select
                      value={relationForm.relation}
                      onChange={(e) => handleInputChange("relation", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option>Sibling</option>
                      <option>Spouse</option>
                      <option>Parent</option>
                      <option>Child</option>
                      <option>Other</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Row 5 */}
            <Row className="mb-2">
              <Col md={12}>
                <Row className="align-items-center">
                  <Col md={2} className="text-end">
                    <Form.Label>Remarks</Form.Label>
                  </Col>
                  <Col md={10}>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={relationForm.remarks}
                      onChange={(e) => handleInputChange("remarks", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateRelation}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OfficialsOrRelationsForm;

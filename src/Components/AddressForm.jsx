import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table, Modal } from 'react-bootstrap';

const AddressForm = ({ data }) => {
  const [addresses, setAddresses] = useState([]);

  const initialFormState = {
    addressType: "",
    address1: "",
    country: "",
    city: "",
    landmark: "",
    phone1: "",
    phone2: "",
    mobile: "",
    fax: "",
    email: "",
    zip: "",
    communicationAddress: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [modalShow, setModalShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (data && data.Address1) {
      setAddresses([
        {
          addressType: data.AddressTypeID || "",
          address1: data.Address1 || "",
          country: data.CountryName || "",
          city: data.City || "",
          landmark: data.Landmark || "",
          phone1: data.Phone1 || "",
          phone2: data.Phone2 || "",
          mobile: data.Mobile || "",
          fax: data.Fax || "",
          email: data.Email || "",
          zip: data.Zipcode || "",
          communicationAddress: data.CommunicationAddress || false,
        },
      ]);
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdate = () => {
    if (!formData.addressType || !formData.address1) {
      alert("Please fill Address Type and Address #1");
      return;
    }

    if (isEditing && editIndex !== null) {
      const updated = [...addresses];
      updated[editIndex] = { ...formData };
      setAddresses(updated);
    } else {
      setAddresses(prev => [...prev, { ...formData }]);
    }

    setFormData(initialFormState);
    setModalShow(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setIsEditing(true);
    setEditIndex(index);
    setModalShow(true);
  };

  const openAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setEditIndex(null);
    setModalShow(true);
  };

  return (
    <>
      {/* Outer container ensures consistent padding */}
      <div className="container px-3 mt-3">
        <h6 className="mb-3 text-primary fw-bold">Client Address Information</h6>

        {/* Use container-fluid + px-0 so table starts exactly under heading */}
        <div className="container-fluid px-0">
          <Table bordered size="sm" className="mb-2">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Address Type</th>
                <th>Address #1</th>
                <th>Country</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {addresses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    There Are No Items To Be Displayed
                  </td>
                </tr>
              ) : (
                addresses.map((addr, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{addr.addressType}</td>
                    <td>{addr.address1}</td>
                    <td>{addr.country}</td>
                    <td>{addr.city}</td>
                    <td>{addr.mobile}</td>
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
            Add Address
          </Button>
        </div>
      </div>

      {/* Modal for Add/Edit Address */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Address" : "Add Address"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Each row of inputs */}
            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Address Type</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Select
                      value={formData.addressType}
                      onChange={e => handleInputChange("addressType", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option>Office Address</option>
                      <option>Home Address</option>
                      <option>Temporary Address</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Address #1</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.address1}
                      onChange={e => handleInputChange("address1", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Country</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.country}
                      onChange={e => handleInputChange("country", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>City/Area</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.city}
                      onChange={e => handleInputChange("city", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Landmark</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.landmark}
                      onChange={e => handleInputChange("landmark", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Phone #1</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.phone1}
                      onChange={e => handleInputChange("phone1", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Phone #2</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.phone2}
                      onChange={e => handleInputChange("phone2", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Mobile</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.mobile}
                      onChange={e => handleInputChange("mobile", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Fax No</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.fax}
                      onChange={e => handleInputChange("fax", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Email ID</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.email}
                      onChange={e => handleInputChange("email", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4} className="text-end">
                    <Form.Label>Zip Code</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      value={formData.zip}
                      onChange={e => handleInputChange("zip", e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className="align-items-center">
                  <Col md={4}></Col>
                  <Col md={8}>
                    <Form.Check
                      type="checkbox"
                      label="Communication Address"
                      checked={formData.communicationAddress}
                      onChange={e => handleInputChange("communicationAddress", e.target.checked)}
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
          <Button variant="primary" onClick={handleAddOrUpdate}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressForm;

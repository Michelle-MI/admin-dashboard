import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Table, Spinner } from "react-bootstrap";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const bearerToken = import.meta.env.VITE_API_BEARER_TOKEN;
  const xApiKey = import.meta.env.VITE_X_API_KEY;
  const callbackUrl = import.meta.env.VITE_API_CALLBACK_URL;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/AgencyBanking/Operation/API/Staged/FetchClients`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
            "X-API-Key": xApiKey,
            "X-CallBackUrl": callbackUrl,
          },
        }
      );
      setCustomers(response.data?.Data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileToBase64 = (e, fieldName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result; // Full base64 with prefix
      console.log(`${fieldName} Base64:`, base64String.slice(0, 100)); // log preview
      setFormData((prev) => ({ ...prev, [fieldName]: base64String }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending payload:", formData);
      const response = await axios.post(
        `/api/AgencyBanking/Operation/API/CreateClient`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
            "X-API-Key": xApiKey,
            "X-CallBackUrl": callbackUrl,
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data?.Status === "SUCCESS") {
        alert("Client created successfully!");
        setShowModal(false);
        setFormData({});
        fetchCustomers();
      } else {
        alert("Failed: " + (response.data?.Message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error creating client:", error);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        alert("API Error: " + JSON.stringify(error.response.data));
      } else {
        alert("Unexpected error: " + error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Customers</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Client
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Gender</th>
              <th>Marital Status</th>
              <th>Branch ID</th>
              <th>Client Type</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.FirstName}</td>
                  <td>{customer.MiddleName}</td>
                  <td>{customer.LastName}</td>
                  <td>{customer.MobileNumber}</td>
                  <td>{customer.GenderId}</td>
                  <td>{customer.MaritalStatusId}</td>
                  <td>{customer.BranchId}</td>
                  <td>{customer.ClientTypeID}</td>
                  <td>{customer.Address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateClient}>
            <Form.Group className="mb-3">
              <Form.Label>Customer Type</Form.Label>
              <Form.Select name="ClientTypeID" onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="1">Business</option>
                <option value="2">Individual</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Select name="TitleId" onChange={handleChange} required>
                <option value="">Select Title</option>
                <option value="1">Mr</option>
                <option value="2">Mrs</option>
                <option value="3">Miss</option>
              </Form.Select>
            </Form.Group>

            <div className="row">
              <Form.Group className="col-md-4 mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="FirstName" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="col-md-4 mb-3">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control name="MiddleName" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="col-md-4 mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="LastName" onChange={handleChange} required />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control name="MobileNumber" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="col-md-3 mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select name="GenderId" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col-md-3 mb-3">
                <Form.Label>Marital Status</Form.Label>
                <Form.Select name="MaritalStatusId" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="1">Single</option>
                  <option value="2">Married</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Branch ID</Form.Label>
                <Form.Control name="BranchId" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control name="Address" onChange={handleChange} />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>National ID</Form.Label>
              <Form.Control name="NationalID" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nationality</Form.Label>
              <Form.Control name="Nationality" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Device ID</Form.Label>
              <Form.Control name="DeviceId" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleFileToBase64(e, "Photo")}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Signature</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleFileToBase64(e, "Signature")}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="success" type="submit">
                Create Client
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewCustomers;

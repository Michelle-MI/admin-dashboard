import React, { useEffect, useState } from "react";
import { loginUser, getClients, getClientDetail } from "./apiService";
import { Table, Button, Spinner, Modal, Alert, Form } from "react-bootstrap";
import AdditionalTabs from "./Components/AdditionalTabs";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [pageHistory, setPageHistory] = useState([""]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");
  const [nextLastClientId, setNextLastClientId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // 🔹 Separate pagination state for searches
  const [searchPageHistory, setSearchPageHistory] = useState([""]);
  const [searchCurrentPage, setSearchCurrentPage] = useState(0);
  const [searchNextLastClientId, setSearchNextLastClientId] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      await loginUser();
      const data = await getClients();
      const clientList = data.result || [];
      setClients(clientList);

      const lastClient = clientList[clientList.length - 1];
      setNextLastClientId(lastClient?.ClientID || "");
      setIsSearching(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  const mapClientType = (typeId) => {
    if (!typeId) return "Unknown";
    const type = typeId.toString().toLowerCase();
    if (type === "i" || type.includes("individual")) return "Individual";
    if (type === "g" || type.includes("group")) return "Group";
    if (type.includes("guarantor")) return "Guarantor";
    return typeId;
  };

  const loadPage = async (pageIndex) => {
    try {
      setLoading(true);
      const id = pageHistory[pageIndex];
      const data = await getClients(id);
      const clientList = data.result || [];
      setClients(clientList);

      const lastClient = clientList[clientList.length - 1];
      setNextLastClientId(lastClient?.ClientID || "");
      setCurrentPage(pageIndex);
    } catch (err) {
      console.error(err);
      setError("Failed to load page.");
    } finally {
      setLoading(false);
    }
  };

  const goNext = async () => {
    if (isSearching) {
      // 🔹 Search mode pagination
      if (!searchNextLastClientId) return;
      try {
        setLoading(true);
        const data = await getClients(searchNextLastClientId, searchId.trim());
        const newClients = data.result || [];
        if (newClients.length === 0) return;

        const newLastId = newClients[newClients.length - 1]?.ClientID || "";
        if (newLastId === searchNextLastClientId) return;

        setClients(newClients);
        setSearchPageHistory((prev) => [...prev, searchNextLastClientId]);
        setSearchCurrentPage((prev) => prev + 1);
        setSearchNextLastClientId(newLastId);
      } catch (err) {
        console.error("❌ Failed to load next search page:", err);
        setError("Failed to load next search page.");
      } finally {
        setLoading(false);
      }
    } else {
      // 🔹 Normal pagination
      if (!nextLastClientId) return;
      try {
        setLoading(true);
        const data = await getClients(nextLastClientId);
        const newClients = data.result || [];
        if (newClients.length === 0) return;

        const newLastId = newClients[newClients.length - 1]?.ClientID || "";
        if (newLastId === nextLastClientId) return;

        setClients(newClients);
        setPageHistory((prev) => [...prev, nextLastClientId]);
        setCurrentPage((prev) => prev + 1);
        setNextLastClientId(newLastId);
      } catch (err) {
        console.error("❌ Failed to load next page:", err);
        setError("Failed to load next page.");
      } finally {
        setLoading(false);
      }
    }
  };

  const goPrev = async () => {
    if (isSearching) {
      // 🔹 Search mode prev
      if (searchCurrentPage <= 0) return;
      try {
        setLoading(true);
        const id = searchPageHistory[searchCurrentPage - 1];
        const data = await getClients(id, searchId.trim());
        const clientList = data.result || [];
        setClients(clientList);

        const lastClient = clientList[clientList.length - 1];
        setSearchNextLastClientId(lastClient?.ClientID || "");
        setSearchCurrentPage((prev) => prev - 1);
      } catch (err) {
        console.error(err);
        setError("Failed to load previous search page.");
      } finally {
        setLoading(false);
      }
    } else {
      // 🔹 Normal prev
      if (currentPage <= 0) return;
      await loadPage(currentPage - 1);
    }
  };

  const mergeClientDetails = (detail, clientSummary = {}) => {
    return {
      ...detail.ClientInfo1,
      ...detail.ClientInfo2,
      relations: Array.isArray(detail.relations)
        ? detail.relations
        : Array.isArray(detail.Relations)
        ? detail.Relations
        : [],
      accounts: Array.isArray(detail.Accounts)
        ? detail.Accounts
        : Array.isArray(detail.Banks)
        ? detail.Banks
        : [],
      DemiseDetails: detail.DemiseDetails || null,
      introducer: detail.IntroducerDetails || detail.introducer || {},

      // --- Added image data ---
      Signature: detail.image?.Signature || null,
      Photo: detail.image?.Photo || null,
      SignatureScannedBy: detail.image?.SignatureScannedBy || "",
      SignatureScannedOn: detail.image?.SignatureScannedOn || "",
      SignatureSupervisedBy: detail.image?.SignatureSupervisedBy || "",
      SignatureSupervisedOn: detail.image?.SignatureSupervisedOn || "",
      PhotoScannedBy: detail.image?.PhotoScannedBy || "",
      PhotoScannedOn: detail.image?.PhotoScannedOn || "",
      PhotoSupervisedBy: detail.image?.PhotoSupervisedBy || "",
      PhotoSupervisedOn: detail.image?.PhotoSupervisedOn || "",

      BranchID: detail.ClientInfo1?.BranchID || clientSummary.OurBranchID,
      BranchName: detail.ClientInfo1?.BranchName || clientSummary.BranchName || "",
      ClientType: mapClientType(detail.ClientInfo1?.ClientTypeID || clientSummary.ClientType),
      Name: detail.ClientInfo1?.Name || clientSummary.Name || "",
      Mobile: detail.ClientInfo1?.Mobile || clientSummary.Mobile || "",
      OpenedByName: detail.ClientInfo1?.OpenedByName || clientSummary.OpenedBy || "",
      OpenedDate: detail.ClientInfo1?.OpenedDate || clientSummary.OpenedDate || "",
    };
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      fetchInitialData();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setIsSearching(true);

      const data = await getClients("", searchId.trim());
      const clientList = data.result || [];

      if (clientList.length > 0) {
        setClients(clientList);
        setSearchPageHistory([""]); // reset search history
        setSearchCurrentPage(0);
        setSearchNextLastClientId(clientList[clientList.length - 1]?.ClientID || "");
      } else {
        setClients([]);
        setError("No client found matching your search.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search for client.");
    } finally {
      setLoading(false);
    }
  };

  const viewClientDetail = async (clientId, clientSummary) => {
    try {
      setDetailError("");
      setLoadingDetails(true);
      setSelectedClient(null);
      setShowModal(true);

      const detail = await getClientDetail(clientId);
      if (detail?.ClientInfo1 && detail?.ClientInfo2) {
        setSelectedClient(mergeClientDetails(detail, clientSummary));
      } else {
        setDetailError("No details found for this client.");
      }
    } catch (err) {
      console.error(err);
      setDetailError("Failed to fetch client details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="container-fluid mt-3">
      {/* 🔹 Search Bar aligned to the right */}
      <div className="d-flex justify-content-end mb-3">
        <div className="d-flex align-items-center" style={{ maxWidth: "400px", width: "100%" }}>
          <Form.Control
            placeholder="Enter Client ID, Name or Mobile"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button variant="primary" onClick={handleSearch} className="ms-2">
            Search
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : clients.length === 0 ? (
        <Alert variant="info">No clients found.</Alert>
      ) : (
        <>
          {/* 🔹 Full-width table always */}
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover responsive className="w-100">
              <thead>
                <tr>
                  <th style={{ minWidth: "200px", whiteSpace: "nowrap" }}>Name</th>
                  <th style={{ minWidth: "120px" }}>Client ID</th>
                  <th style={{ minWidth: "150px" }}>Mobile</th>
                  <th style={{ minWidth: "180px" }}>Location</th>
                  <th style={{ minWidth: "140px" }}>Client Type</th>
                  <th style={{ minWidth: "150px" }}>Opened Date</th>
                  <th style={{ minWidth: "150px" }}>Opened By</th>
                  <th style={{ minWidth: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.ClientID}>
                    <td style={{ whiteSpace: "nowrap" }}>{client.Name}</td>
                    <td>{client.ClientID}</td>
                    <td>{client.Mobile || "N/A"}</td>
                    <td>{client.Location || "N/A"}</td>
                    <td>{client.ClientType || "N/A"}</td>
                    <td>
                      {client.OpenedDate ? new Date(client.OpenedDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td>{client.OpenedBy || "N/A"}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => viewClientDetail(client.ClientID, client)}
                        disabled={loadingDetails}
                      >
                        {loadingDetails ? "Loading..." : "View Details"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* 🔹 Pagination (works for both search + normal) */}
          <div className="d-flex justify-content-between align-items-center my-3">
            <Button
              variant="secondary"
              onClick={goPrev}
              disabled={isSearching ? searchCurrentPage === 0 : currentPage === 0}
            >
              ← Previous
            </Button>
            <div style={{ fontSize: "0.85rem", color: "#555" }}>
              Page:{" "}
              {isSearching ? searchCurrentPage + 1 : currentPage + 1} | Clients: {clients.length}
            </div>
            <Button
              variant="primary"
              onClick={goNext}
              disabled={
                isSearching
                  ? !searchNextLastClientId || clients.length < 100
                  : !nextLastClientId || clients.length < 100
              }
            >
              Next →
            </Button>
          </div>
        </>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="custom-modal-90"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailError && <Alert variant="danger">{detailError}</Alert>}
          {!selectedClient && !detailError && <Spinner animation="border" />}
          {selectedClient && !detailError && <AdditionalTabs data={selectedClient} />}
        </Modal.Body>
      </Modal>
    </div>
  );
}

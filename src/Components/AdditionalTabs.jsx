import React, { useState } from "react";
import { Nav, Alert } from "react-bootstrap";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AddressForm from "./AddressForm";
import IntroducerDetailsForm from "./IntroducerDetailsForm";
import ClientProfileChangeForm from "./ClientProfileChangeForm";
import OfficialsOrRelationsForm from "./OfficialsOrRelationsForm";
import DemiseDetailsForm from "./DemiseDetailsForm";
import MemberActivationForm from "./MemberActivationForm";
import SignaturePhotoForm from "./SignaturePhotoForm";
import AdditionalInformation from "./AdditionalInformation";

export default function AdditionalTabs({ data }) {
  const [activeTab, setActiveTab] = useState("Address");

  // Handle different possible field names and ensure we always pass an object
  const relationsData = Array.isArray(data?.relations)
    ? data.relations
    : Array.isArray(data?.Relations)
    ? data.Relations
    : [];

  const demiseData = data?.demise || data?.DemiseDetails || null;

  const accountsData = Array.isArray(data?.accounts) ? data.accounts : [];

  // ✅ Make sure we pass only the introducer object from API
  const introducerData = data?.introducer && typeof data.introducer === "object"
    ? data.introducer
    : {};

  const renderTabContent = () => {
    switch (activeTab) {
      case "Address":
        return <AddressForm data={data} />;

      case "Introducer":
        return <IntroducerDetailsForm data={introducerData} />;

      case "OfficialsOrRelation":
        return <OfficialsOrRelationsForm data={relationsData} />;

      case "ProfileChange":
        return <ClientProfileChangeForm data={data} />;

      case "Demise":
        return demiseData ? (
          <DemiseDetailsForm data={{ demise: demiseData }} />
        ) : (
          <Alert variant="success" className="m-3">
            ✅ This client is alive. No demise details found.
          </Alert>
        );

      case "MemberActivation":
        return <MemberActivationForm data={{ accounts: accountsData }} />;

      case "Signature":
        return <SignaturePhotoForm data={data} />;

      case "AdditionalInformation":
        return <AdditionalInformation data={data} />;

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Always show personal details at the top */}
      <PersonalDetailsForm data={data} />

      {/* Navigation tabs */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        className="mt-4"
      >
        <Nav.Item>
          <Nav.Link eventKey="Address">Address</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Introducer">Introducer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="OfficialsOrRelation">Officials/Relation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="ProfileChange">Profile Change</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Demise">Demise</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="MemberActivation">Activation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Signature">Signature</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="AdditionalInformation">
            Additional Information
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Render active tab content */}
      <div className="mt-3">{renderTabContent()}</div>
    </div>
  );
}

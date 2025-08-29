import React from "react";
import "./formStyles.css";

const PersonalDetailsForm = ({ data }) => {
  const d = data || {};
  const clientType = (d.ClientType || "").toLowerCase();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
  };

  const FormGroup = ({ label, value, type = "text", col = "col-md-6" }) => (
    <div className={`${col} d-flex align-items-center`}>
      <label className="form-label-right me-2">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value || ""}
        readOnly
      />
    </div>
  );

  return (
    <>
      <div className="container px-3 mt-3">
        <h5 className="text-primary">Customer Information</h5>

        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <label className="form-label">Branch ID</label>
            <input
              type="text"
              className="form-control"
              value={d.BranchID || "--"}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Branch Name</label>
            <input
              type="text"
              className="form-control"
              value={d.BranchName || "--"}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Client Type</label>
            <input
              type="text"
              className="form-control"
              value={d.ClientType || "--"}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Client Class</label>
            <input
              type="text"
              className="form-control"
              value={d.ClientClass || "--"}
              readOnly
            />
          </div>
        </div>
      </div>

      {clientType.includes("individual") && (
        <form className="row gy-2 px-3 mt-3">
          <h5 className="text-primary">Personal Details</h5>
          <FormGroup label="Title" value={d.TitleID} />
          <FormGroup label="First Name" value={d.FirstName} />
          <FormGroup label="Middle Name" value={d.MiddleName} />
          <FormGroup label="Last Name" value={d.LastName} />
          <FormGroup label="Gender" value={d.GenderID} />
          <FormGroup label="Date of Birth" value={formatDate(d.DateOfBirth)} type="date" />
          <FormGroup label="Nationality" value={d.NationalityID} />
          <FormGroup label="ID Type" value={d.IdentificationType} />
          <FormGroup label="ID No" value={d.PassportNo} />
          <FormGroup label="ID Expiry" value={formatDate(d.PassportExpiryDate)} type="date" />
          <FormGroup label="Opened By" value={d.OpenedByName} />
          <FormGroup label="Opened On" value={formatDate(d.OpenedDate)} type="date" />
        </form>
      )}

      {clientType.includes("group") && (
        <form className="row gy-2 px-3 mt-3">
          <h5 className="text-primary">Group Details</h5>
          <FormGroup label="Group Name" value={d.Name} />
          <FormGroup label="Registration No" value={d.RegistrationNo} />
          <FormGroup label="Date Opened" value={formatDate(d.OpenedDate)} type="date" />
          <FormGroup label="Opened By" value={d.OpenedBy || d.OpenedByName} />
        </form>
      )}

      {clientType.includes("guarantor") && (
        <form className="row gy-2 px-3 mt-3">
          <h5 className="text-primary">Guarantor Details</h5>
          <FormGroup label="Full Name" value={d.Name} />
          <FormGroup label="Mobile" value={d.Mobile} />
          <FormGroup label="Opened Date" value={formatDate(d.OpenedDate)} type="date" />
          <FormGroup label="Opened By" value={d.OpenedBy || d.OpenedByName} />
        </form>
      )}
    </>
  );
};

export default PersonalDetailsForm;

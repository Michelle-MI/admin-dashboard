import axios from "axios";

const BASE_URL = "https://xGateway.extrainch.co.ke/v1";

let bearerToken = localStorage.getItem("bearerToken") || null;
let tokenExpiry = localStorage.getItem("tokenExpiry") || null;

function setBearerToken(token, expiryDate) {
  bearerToken = token;
  tokenExpiry = expiryDate;
  localStorage.setItem("bearerToken", token);
  if (expiryDate) localStorage.setItem("tokenExpiry", expiryDate);
}

async function ensureToken() {
  const now = new Date();
  const expiry = tokenExpiry ? new Date(tokenExpiry) : null;
  if (!bearerToken || (expiry && now >= expiry)) {
    console.warn("⚠️ Token missing or expired. Logging in again...");
    await loginUser();
  }
}

export async function loginUser() {
  try {
    console.log("🔄 Logging in to get token...");
    const res = await axios.post(`${BASE_URL}/Auth/API/Account`, {
      DeviceId: "99b394632358e926",
      UserName: "BANTU",
      Password: "pass@1234",
    }, {
      headers: {
        "X-API-Key": "MzgwNWJjMWFhYjE0NDdjYWExOWRiY2U5NzhjM2ZlZWE=",
        ApiKey: "0da6f8dc-2e55-11ef-9a95-0050564bcc9d",
      },
    });

    const token = res.data?.user?.Token;
    const expiry = res.data?.user?.ExpiryDate;
    if (!token) throw new Error("❌ Token not found in login response");

    setBearerToken(token, expiry);
    console.log("✅ Login successful, token stored until:", expiry);
    return token;
  } catch (err) {
    console.error("❌ Login failed:", err.response?.data || err.message);
    throw err;
  }
}

export async function getClients(lastClientId = "", searchString = "") {
  try {
    await ensureToken();
    const res = await axios.get(`${BASE_URL}/Client/API/List`, {
      params: {
        PageSize: 100,
        OurBranchID: "01",
        SearchString: searchString || null,
        LastClientID: lastClientId || null,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch clients:", err.response?.data || err.message);
    throw err;
  }
}

export async function getClientDetail(clientId) {
  try {
    await ensureToken();
    const res = await axios.get(`${BASE_URL}/Client/API/Detail`, {
      params: {
        OurBranchID: "01",
        ClientID: clientId,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "X-API-Key": "MzgwNWJjMWFhYjE0NDdjYWExOWRiY2U5NzhjM2ZlZWE=",
      },
    });

    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch client details:", err.response?.data || err.message);
    throw err;
  }
}

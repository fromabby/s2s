import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Donate.css";
import Metadata from "../layout/Metadata";
import Load from "../layout/Load";
import { Button, Modal } from "react-bootstrap";

const Donate = ({ title }) => {
  const [donationDetails, setDonationDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/v1/donations");

        if (data.success) {
          setDonationDetails(data.donations);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setDonationDetails([]);
      }
    };
    fetchData();
  }, []);

  const ids = ["gcashModal", "bpiModal"];

  return loading ? (
    <Load />
  ) : (
    <div className="bg_image content-container" style={{ minHeight: "90vh" }}>
      <Metadata title={title} />
      <DonateModal donationDetails={donationDetails} />
    </div>
  );
};

const DonateModal = ({ donationDetails }) => {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div className="donation-modal">
      <h1 style={{ fontSize: "4.5em" }} className="text-center">
        Donation Platforms
      </h1>
      <div className="image-container-donate">
        <div className="donate" onClick={() => setShowFirst(true)}>
          <img src="./images/gcash.png" alt="Gcash" className="zoom" />
        </div>
        <div className="donate" onClick={() => setShowSecond(true)}>
          <img src="/images/bpi.png" alt="BPI" className="zoom" />
        </div>
      </div>

      {donationDetails?.length > 0 &&
        donationDetails?.map((donation, index) => (
          <Modal
            size="lg"
            centered
            show={index === 0 ? showFirst : showSecond}
            onHide={() =>
              index === 0 ? setShowFirst(false) : setShowSecond(false)
            }
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                How to Donate ({donation.bank_name})
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
              <div className="d-flex align-items-center justify-content-center">
                <img src={donation.qr_code[0].path} className="img-fluid" />
              </div>
              <div className="p-lg-2 donate-instructions">
                <p>{donation.instructions}</p>
                <p>{donation.account_details.account_name}</p>
                <p>{donation.account_details.account_number}</p>
                <a href={donation.donation_link} target="_blank">
                  Donation form
                </a>
              </div>
            </Modal.Body>
          </Modal>
        ))}
    </div>
  );
};

export default Donate;

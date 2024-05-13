import React, { useRef } from "react";
import Barcode from "react-barcode";
import Card from "react-bootstrap/Card";
import { CarouselFadeExample } from "../Authorization/Authorization";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

const barCodeStyle = {};

const cardStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 999,
  width: "66%",
  opacity: "93%",
};

function RegisterBiometric() {
  const barCodeRef = useRef(null);

  const handleDownloadClick = () => {
    const barcodeElement = barCodeRef.current;

    if (barcodeElement) {
      // Use html2canvas to capture the content of the barcode element as an image
      html2canvas(barcodeElement).then((canvas) => {
        // Convert the canvas content to a blob
        canvas.toBlob((blob) => {
          // Create a download link
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = "biometric_qr.png";

          // Append the link to the body and trigger the click event
          document.body.appendChild(downloadLink);
          downloadLink.click();

          // Remove the link from the DOM
          document.body.removeChild(downloadLink);
        }, "image/png");
      });
    }
  };

  return (
    <div>
      <CarouselFadeExample />
      <div style={cardStyles}>
        <Card className="text-center d-flex flex-row m-auto">
          <Card.Body>
            <div className="d-flex flex-column justify-content-between align-items-between ">
              <h1 className="m-2">
                Find Your Generated Biometric Qr
                <i className="bi bi-door-closed"></i>
                <Card.Body className="d-flex flex justify-content-center align-items-center ">
                  <div
                    ref={barCodeRef}
                    style={barCodeStyle}
                    className="barcode-container"
                  >
                    <Barcode value="mytempm03@gmail.com" />
                  </div>
                  {/* Download button */}
                  <a
                    href="#"
                    onClick={handleDownloadClick}
                    className="text-decoration-none ml-4"
                    download="biometric_qr.png"
                  >
                    Download <i className="bi bi-download"></i>
                  </a>
                </Card.Body>
                <Card.Footer className="mt-4">
                  {" "}
                  <Link to={"/signup"} className="text-decoration-none  mx-4">
                    <i className="bi bi-arrow-left mx-2"></i>
                    {"Go Back"}{" "}
                  </Link>
                  <Link to="/" className="text-decoration-none">
                    {" "}
                    HomePage <i className="bi bi-house-check-fill"></i>
                  </Link>
                </Card.Footer>
              </h1>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default RegisterBiometric;

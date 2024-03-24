
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-2 position-fixed bottom-0 w-100 p-10 bg-body-tertiary" style={{marginBottom: "0rem"}}>
      <p style={{ fontSize: "16px" }}>
        &copy; {currentYear} Copyright by Selly{" "}
        <i className="bi bi-heart-fill" style={{ color: "red" }}></i>
      </p>
    </div>
  );
}


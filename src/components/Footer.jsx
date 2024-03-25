
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="d-flex flex-column align-items-center justify-content-center position-fixed bottom-0 w-100 bg-body-tertiary" style={{height: "2.5rem"}}>
      <p style={{fontSize: "16px"}}>
        &copy; {currentYear} Copyright by Selly{" "}
        <i className="bi bi-heart-fill" style={{ color: "red" }}></i>
      </p>
    </div>
  );
}


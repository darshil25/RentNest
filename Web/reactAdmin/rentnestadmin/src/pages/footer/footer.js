function Footer() {
  return (
    <>
      {/* <!--begin::Footer--> */}
      <div id="kt_app_footer" className="app-footer">
        {/* <!--begin::Footer container--> */}
        <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
          {/* <!--begin::Copyright--> */}
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted fw-semibold me-1">2023&copy;</span>
            <a
              href=""
              className="text-gray-800 text-hover-primary"
            >
              Rent Nest
            </a>
          </div>
          {/* <!--end::Copyright--> */}
        </div>
        {/* <!--end::Footer container--> */}
      </div>
      {/* <!--end::Footer--> */}
    </>
  );
}

export default Footer;

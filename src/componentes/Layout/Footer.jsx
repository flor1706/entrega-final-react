function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>Tech Store</h3>

        <p>Todos los derechos reservados.</p>
        <p>Contacto: contacto@techstore.com</p>
        <p>Política de privacidad</p>
        <p>Sucursal: Mendoza, Argentina</p>
        <p>Newsletter: Suscribite para recibir novedades.</p>
      </div>

      <div>
        <h3>Nuestro equipo</h3>

        <div className="equipo">
          <div className="persona">
            <h4>Florencia</h4>
            <p>Desarrollo Web</p>
          </div>

          <div className="persona">
            <h4>Juan</h4>
            <p>Ventas</p>
          </div>

          <div className="persona">
            <h4>María</h4>
            <p>Atención al cliente</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
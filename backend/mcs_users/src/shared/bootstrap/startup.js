class StartUp {
  constructor({ server, router }) {
    this._server = server;
    this._router = router;
  }

  async start() {
    await this._server.start();
    this._router.register();
  }
}

module.exports = StartUp;

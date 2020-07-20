import render from "../../src/page";

export default render("/", {
  render(model: {}) {
    return /*template*/ `
      <html>
      <head>
        <title>BBC</title>
      </head>
      <body>
        <h1>Welcome to the bbc!!</h1>
      </body>
      </html>
    `;
  },
  async get(req, res) {
    await new Promise((r) => setTimeout(r, 5000));
    console.log("5s");
    res.send(this.render({}));
  },
  async post(req, res) {},
});

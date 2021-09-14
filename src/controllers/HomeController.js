class HomeController {
  async index(req, res) {
    res.json('cool');
  }
}
export default new HomeController();

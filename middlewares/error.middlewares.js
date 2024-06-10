export function notFound(req, res) {
  res.status(404).json({
    code: 404,
    message: 'Ooops, route not found,change the route'
  });
}
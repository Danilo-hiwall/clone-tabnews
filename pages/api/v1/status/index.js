function status(request, response) {
  response.status(200).json({ nome: "danilo", idade: "36", casado: "Simmmm" });
}

export default status;

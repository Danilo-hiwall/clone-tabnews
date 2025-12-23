import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 17 + 1 as soma;");
  console.log(result.rows);
  response.status(200).json({ nome: "danilo", idade: "36", casado: "Simmmm" });
}

export default status;

import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVesionValue = databaseVersionResult.rows[0].server_version

  const databaseMaxConnnectionsResult = await database.query("SHOW max_connections;")
  const databaseMaxConnectionsValue = await databaseMaxConnnectionsResult.rows[0].max_connections

  const dataName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dataName]
  })

  const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count;

  const databaseUptimeResult = await database.query("SELECT extract(epoch FROM now() - pg_postmaster_start_time())::int AS uptime_seconds;");

  const databaseUptimeSeconds = databaseUptimeResult.rows[0].uptime_seconds;




  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVesionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
        data_base_time: databaseUptimeSeconds

      }
    }
  });
}

export default status;

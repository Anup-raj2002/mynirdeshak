const { Worker } = require('./connection');
const { generateScoreCard } = require('./service');

const rankingsWorker = new Worker('rankings', async job => {
  const { year, stream, commonName, rows } = job.data;
  for (const row of rows) {
    await generateScoreCard({
      year,
      stream,
      UID: row['UID'],
      Name: row['Name'],
      Rank: row['Rank'],
      Score: row['Score'],
      FatherName: row['Father Name'],
      MotherName: row['Mother Name'],
      commonName,
    });
    console.log(`Generated scorecard for UID ${row['UID']}`);
  }
  return { count: rows.length };
}, {
  connection: require('./connection').redisConnection,
});

module.exports = { rankingsWorker };

console.log('Rankings worker started and listening for jobs...');
const { generateScoreCard } = require('./service');

async function test() {
  const result = await generateScoreCard({
    year: '2025-26',
    stream: 'PCM',
    UID: 'TEST123456',
    Name: 'Aman Sharma',
    Rank: 1,
    Score: 98.5,
    FatherName: 'Rajesh Sharma',
    MotherName: 'Sunita Sharma',
    commonName: 'Mynirdeshak National Scholarship Exam',
  });
  console.log('Scorecard generated at:', result);
}

test().catch(console.error); 
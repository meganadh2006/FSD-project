import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'donar_db'
  });

  try {
    let [rows] = await conn.execute("SELECT id FROM users WHERE email='seed@test.com'");
    let userId;
    if (rows.length === 0) {
      await conn.execute("INSERT INTO users (email, password, role, name, phone, address, created_at, updated_at) VALUES ('seed@test.com', 'pwd', 'DONOR', 'Seed User', '123', 'address', NOW(), NOW())");
      [rows] = await conn.execute("SELECT id FROM users WHERE email='seed@test.com'");
    }
    userId = rows[0].id;

    await conn.execute("INSERT INTO donations (item, quantity, status, date, donor_id) VALUES ('Emergency Blankets', 50, 'IN_PROGRESS', '2024-04-08', ?)", [userId]);
    await conn.execute("INSERT INTO donations (item, quantity, status, date, donor_id) VALUES ('Water Bottles', 200, 'COMPLETED', '2024-04-08', ?)", [userId]);
    await conn.execute("INSERT INTO assistance_requests (item, quantity_description, status, eta, purpose, created_at, recipient_id) VALUES ('Medical Supplies', 'urgent', 'IN_PROGRESS', '2 Hours', 'First Aid', NOW(), ?)", [userId]);
    
    console.log('Seeded database successfully. You should now see IN_PROGRESS and COMPLETED items on the Logistics Dashboard!');
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    conn.end();
  }
}

seed();

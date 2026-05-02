async function seedDatabaseHTTP() {
    const API_URL = 'http://localhost:2009/api';

    // 1. Register a mock user (Donor)
    let token = '';
    try {
        const regRes = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Auto Seeder',
                email: `seeder${Date.now()}@test.com`,
                password: 'password123',
                role: 'DONOR'
            })
        });
        const regData = await regRes.json();
        token = regData.token;
        console.log('User registered and authenticated.');
    } catch(e) {
        console.error('Registration failed:', e);
        return;
    }

    // 2. Create Donation > Update to IN_PROGRESS (Transit)
    try {
        const don1 = await fetch(`${API_URL}/donations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ item: 'Thermal Blankets', quantity: 150, date: '2024-04-10', status: 'PENDING' })
        }).then(r => r.json());

        await fetch(`${API_URL}/donations/${don1.id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'IN_PROGRESS' })
        });
        console.log('Added: Thermal Blankets to In Transit.');
    } catch(e) {}

    // 3. Create Donation > Update to DELIVERED (Delivered)
    try {
        const don2 = await fetch(`${API_URL}/donations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ item: 'Medical Kits', quantity: 75, date: '2024-04-11', status: 'PENDING' })
        }).then(r => r.json());

        await fetch(`${API_URL}/donations/${don2.id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'DELIVERED' })
        });
        console.log('Added: Medical Kits to Delivered.');
    } catch(e) {}
    
    // 4. Update the existing item from the screenshot if it exists, or just add one more
    console.log('Finished seeding! Check your Logistics Dashboard.');
}

seedDatabaseHTTP();

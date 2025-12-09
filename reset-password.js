// reset-password.js
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function resetPassword() {
  const password = "Shuaib@2698"; // Your initial password
  const hash = await bcrypt.hash(password, 10);
  
  console.log('\n====================================');
  console.log('Password Reset Tool');
  console.log('====================================');
  console.log('Password:', password);
  console.log('Generated hash:', hash);
  
  // Create data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Save to password file
  const passwordFile = path.join(dataDir, 'admin_password.json');
  const data = {
    hash: hash,
    updatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(passwordFile, JSON.stringify(data, null, 2));
  console.log('\n✅ Password hash saved to:', passwordFile);
  
  console.log('\n✅ Password has been set to:', password);
  console.log('You can now login with this password.');
  console.log('====================================\n');
}

resetPassword().catch(console.error);
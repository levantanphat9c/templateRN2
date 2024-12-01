// Script này sẽ cập nhật ANDROID_BUILD_NUMBER và IOS_BUILD_NUMBER trong file .env.${env} thành ngày hiện tại
const fs = require('fs');
const path = require('path');

// Lấy tham số môi trường từ command line
const env = process.argv[2] || 'uat';
console.log('env:', env);
const envPath = path.resolve(__dirname, `.env.${env}`);

if (!fs.existsSync(envPath)) {
  console.error(`File .env.${env} not found.`);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');

const formatDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const currentDate = formatDate(new Date());

const updatedContent = envContent
  .replace(/ANDROID_BUILD_NUMBER=(auto|\d{8})/, `ANDROID_BUILD_NUMBER=${currentDate}`)
  .replace(/IOS_BUILD_NUMBER=(auto|\d{8})/, `IOS_BUILD_NUMBER=${currentDate}`);

fs.writeFileSync(envPath, updatedContent);

console.log(
  `Updated IOS_BUILD_NUMBER và ANDROID_BUILD_NUMBER to ${currentDate} in file .env.${env}`,
);

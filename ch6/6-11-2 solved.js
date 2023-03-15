import fs from 'fs';

// 파일 이름 입력 확인
checkArgv(process);

// 파일 이름 입력 후 파일 존재 확인
const fileName = `./${process.argv[2]}.json`;
checkFileName(fileName);

// 파일 안 내용 확인
const rawData = fs.readFileSync(fileName);
const orders = JSON.parse(rawData);
checkOrderReady(orders);

function checkArgv(process) {
  if (!process.argv[2]) {
    throw new Error('파일 이름을 입력하세요');
  }
}

function checkFileName(fileName) {
  if (!fs.existsSync(fileName)) {
    throw new Error('파일이 존재하지 않습니다');
  }
}

function checkOrderReady(orders) {
  if (process.argv.includes('-r')) {
    console.log(orders.filter((order) => order.status === 'ready').length);
  } else {
    console.log(orders.length);
  }
}
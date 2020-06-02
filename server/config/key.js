//local서버이냐 클라우드 서버이냐에 따라서 분기를 나눠줌
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}

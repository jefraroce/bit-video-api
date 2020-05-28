const bcrypt = require('bcryptjs');

let myHash = ''
bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash("B4c0/\/", salt, function(err, hash) {
    myHash = hash;
    console.log('myHash ', myHash);

    bcrypt.compare("B4c0/\/", myHash, function(err, res) {
      // res === true
      console.log('res ', res);
    });
    bcrypt.compare("not_bacon", myHash, function(err, res) {
      // res === false
      console.log('res 2', res);
    });
    
    
    console.log('Sync ', bcrypt.compareSync("B4c0/\/", myHash))
  });
});

myHash = bcrypt.hashSync("123456")
console.log('Sync 2', bcrypt.compareSync("123456", myHash))
bcrypt.compare("123456", myHash, function(err, res) {
  // res === true
  console.log('res 3', res);
});

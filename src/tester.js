var spawn = require("child_process").spawn;
const fs = require('fs');
//const streamIn = fs.createReadStream('c:\\Users\\sathvik\\Desktop\\badword\\english.csv');
//var process = spawn('python3',["c:\\Users\\sathvik\\Desktop\\badword\\bad.py","fuck bye"],['cwd'] );
//streamIn.pipe(process.stdin);
var process = spawn('python',["/home/gowtham/Desktop/cn-cd-wp-project/enc.py",
                            "ygv"] ); 
process.stdout.on('data', function(data) {
    console.log(' successful ')
    console.log(data.toString('utf8'))
} )
process.stderr.on('data',(data)=>{
  console.log(data.toString('utf8'))
  console.log('error')
})
process.on('error',(err)=>{
  console.log(data.toString())
  console.log('next level error')

})
process.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// const spawn = require('child_process').spawn;
// const fs = require('fs');

//     const streamIn = fs.createReadStream('c:\\Users\\sathvik\\Desktop\\badword\\english.csv');


//     var proc = spawn('python3',["c:\\Users\\sathvik\\Desktop\\badword\\spawn.py"],['cwd'] );
//     streamIn.pipe(proc.stdin);
//     proc.stdout.on('data', function(data) {
//                         console.log(' successful ')
//                         console.log(data.toString('utf8'))
//                     } )
//                     proc.stderr.on('date',(data)=>{

//                     proc.on('close', (code) => {
//                       console.log(`child process exited with code ${code}`);
//                     });              console.log(JSON.stringify(data))
//                       console.log('error')
//                     })
//                     proc.on('error',(err)=>{
//                       console.log(JSON.stringify(data))
//                       console.log('next level error')

//                     })

const gearman = require('gearman');
 
let client = gearman("localhost", 4730 , {timeout: 60000})  // timeout in milliseconds. 
 
// handle timeout 
client.on('timeout', function() {
    console.log('Timeout occurred')
    client.close()
})
 
 
// handle finished jobs
client.on('WORK_COMPLETE', function(job) {
    console.log('job completed, result:')
    client.close()
})
 
var message = {
    firstname : 'John',
    lastname : 'Doe'
  };


console.log(JSON.stringify(message))

// connect to the gearman server
client.connect(function() {
    // submit a job to uppercase a string with normal priority in the foreground
    client.submitJob('genReportJS', JSON.stringify(message))
})

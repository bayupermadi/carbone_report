const gearman = require('gearman');
const carbone = require('carbone');
const fs = require('fs');
 
let worker = gearman('192.168.1.203', 4730)
 
// handle jobs assigned by the server
worker.on('JOB_ASSIGN', function(job) {
    console.log(job.func_name + ' job assigned to this worker')
    var messages = job.payload.toString()
    var dataParse = JSON.parse(messages)

    var options = dataParse['option']
    var data = dataParse['data']
    var template = dataParse['template']['path']

    carbone.render(template, data, options, function(err, result){
        if (err) return console.log(err);
        fs.writeFileSync('result.pdf', result);
    });

        
    // notify the server the job is done
    worker.sendWorkComplete(job.handle, "its done")

    // go back to sleep, telling the server we're ready for more work
    worker.preSleep()
});
 
// grab a job when the server signals one is available
worker.on('NOOP', function() {  worker.grabJob() })
 
// connect to the gearman server	
worker.connect(function(){
    // register the functions this worker is capable of
    worker.addFunction('genReportJS')
 
    // tell the server the worker is going to sleep, waiting for work
    worker.preSleep()
});
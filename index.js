const gearman = require('gearman');
const carbone = require('carbone');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const CronJob = require('cron').CronJob;
 
let worker = gearman('192.168.1.203', 4730)
var directory = "/mnt/reports/"
 
function generateReport(job, messages){
    var options = messages['option']
    var data = messages['data']
    var template = messages['template']['path']
    var reports = uuidv4() + '.' + options['convertTo']
    var fullpath = directory + reports

    carbone.render(template, data, options, function(err, result){
        if (err) return console.log(err);
        fs.writeFileSync(fullpath, result);
    });

        
    // notify the server the job is done
    worker.sendWorkComplete(job.handle, fullpath)

    // go back to sleep, telling the server we're ready for more work
    worker.preSleep()
    worker.submitJob('remReportJS', fullpath)
}

function removeReport() {
    fs.emptyDir(directory, err => {
        if (err) return console.error(err)
        console.log('success removed!, clean output directory report at:', directory)
    })
}

// handle jobs assigned by the server
worker.on('JOB_ASSIGN', function(job) {
    console.log(job.func_name + ' job assigned to this worker')
    var dataParse = job.payload.toString()
    var messages = JSON.parse(dataParse)

    if (job.func_name == 'genReportJS') {
        generateReport(job, messages)
    }

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


var job = new CronJob('*/15 * * * * *', function() {
    removeReport()
    }, null, true, 'Asia/Singapore');
job.start();
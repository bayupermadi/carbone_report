const gearman = require('gearman');
 
let client = gearman("192.168.1.203", 4730 , {timeout: 60000})  // timeout in milliseconds. 
 
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
    option : {
        convertTo : 'pdf'
    },
    data :[ 
            { 
            movieName : 'John',
            actors : [ 
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' },
                    { firstname: 'Bayu', lastname: 'Ganteng' }
                ]
            },
            { 
            movieName : 'John1',
            actors : [
                    { firstname: 'Bayu1', lastname: 'Ganteng1' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu2', lastname: 'Ganteng2' },
                    { firstname: 'Bayu3', lastname: 'Ganteng3' },
                ]
            }
    ],
    template : {
        path : './node_modules/carbone/examples/movies.docx'
    }
  };

// connect to the gearman server
client.connect(function() {
    // submit a job to uppercase a string with normal priority in the foreground
    client.submitJob('genReportJS', JSON.stringify(message))
})

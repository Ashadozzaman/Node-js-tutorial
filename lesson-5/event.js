const School = require('./school');

const school = new School();
// register a listener for event
school.on('event', (data) => {
    console.log('Event Data:', data);
});

school.test();

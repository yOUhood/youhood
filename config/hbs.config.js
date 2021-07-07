const hbs = require('hbs');
const eskudos = require('../data/eskudos.json');
const moment = require('moment')

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('eskudosForKudo', function (options) {
    const { kudos, eskudo } = options.hash;
    if (kudos?.eskudos.includes(eskudo)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

hbs.registerHelper('eskudoImage', function (options) {
    const { eskudo } = options.hash;
    return eskudos[eskudo].image
})

hbs.registerHelper('formattedDate', function (options) {
    const { date } = options.hash
    return moment(date).startOf('hour').fromNow() ; 
})

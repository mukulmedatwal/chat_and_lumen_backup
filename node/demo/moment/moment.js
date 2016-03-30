var moment = require('moment');
console.log(moment().format());



console.log(moment().add( 2 , 'days').fromNow());
// 'in 2 days'
console.log(moment().format());
console.log(moment().subtract( 2 , 'days').fromNow());
// '2 days ago'
console.log(moment().format());
//moment('November 1977').fromNow()
//// '34 years ago'
//
//moment().add('days', 2).calendar();
//// 'Monday at 8:30 AM'
//
//moment().subtract('days', 2).calendar();
//// 'last Thursday at 8:30 AM'
//
console.log(moment('1977-08-20 14:29:00 UTC').format('MMM. d, YYYY'));
// 'Aug. 5, 1977'
//
//moment('1977-08-20 14:29:00 UTC').fromNow();
//// 'il y a 35 années'

module.exports = (pool) => {
    var full = [];
    var ok = [];
    var low = [];

    var storeNames = async (name) => {
        try {
            var checkWaiter = await pool.query(`select waiterusername from waiter_usernames where waiterusername = $1`, [name])
            if (checkWaiter.rowCount == 0 && name != '') {
                await pool.query(`insert into waiter_usernames(waiterusername) values ($1)`, [name])
            }
        } catch (error) {
            console.log(error)
        }
    }

    var getDay = async (daysId) => {
        try {
            var days = [];

            for (var i = 0; i < daysId.length; i++) {
                var anotherNewList = daysId[i].toString().trim();
                if (anotherNewList) {
                    let day = await pool.query('select weekdays from dayTable where id = $1', [daysId[i]])
                    days.push(day.rows[0].weekdays)
                }
            }
            return days;

        } catch (error) {
            console.log(error)
        }
    }

    var getWaiterId = async (name) => {
        try {
            let waiterid = await pool.query('select id from waiter_usernames where waiterusername = $1', [name])
            return waiterid.rows[0].id

        } catch (error) {
            console.log(error)
        }
    }

    var getDayId = async (day) => {
        try {
            var list = day.toString().split(",");
            var daysid = [];

            for (var i = 0; i < list.length; i++) {
                var anotherNewList = list[i].trim();
                if (anotherNewList) {
                    let dayid = await pool.query('select id from dayTable where weekdays = $1', [list[i]])
                    daysid.push(dayid.rows[0].id)
                }
            }
            return daysid;

        } catch (error) {
            console.log(error)
        }
    }

    var storeNameAndDays = async (name, day) => {
        try {
            var user = await getWaiterId(name);
            var days = await getDayId(day);

            for (var i = 0; i < days.length; i++) {
                var anotherNewList = days[i].toString().trim();
                if (anotherNewList) {
                    await pool.query(`insert into admin (userid,dayid) values ($1,$2)`, [user, days[i]])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    var bookings = async () => {
        try {
            let x = await pool.query('select count(userid),dayid from admin group by dayid');

            x.rows.forEach(async function (element) {
                if (element.count > 3) {
                    full.push(element.dayid);
                }
                else if (element.count == 3) {
                    ok.push(element.dayid);
                }
                else if (element.count < 3) {
                    low.push(element.dayid);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    var perfectlyBooked = async () => {
        try {
            var getDayOk = await getDay(ok);
            return getDayOk;
        } catch (error) {
            console.log(error);
        }
    }

    var overBooked = async () => {
        try {
            var getDayFull = await getDay(full);
            return getDayFull;
        } catch (error) {
            console.log(error);
        }
    }

    var underBooked = async () => {
        try {
            var getDayLow = await getDay(low);
            return getDayLow;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        storeNames,
        getWaiterId,
        getDayId,
        storeNameAndDays,
        bookings,
        overBooked,
        underBooked,
        perfectlyBooked,
        getDay
    }
}
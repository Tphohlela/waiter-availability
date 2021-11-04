module.exports = (pool) => {
  
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
                var dayValue = list[i].trim();
                if (dayValue) {
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
                var list = days[i].toString().trim();
                if (list) {
                    await pool.query(`insert into admin (userid,dayid) values ($1,$2)`, [user, days[i]])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    var joiningWaitersAndDays = async () => {
        try {
            let waiterAndDays = await pool.query('select waiter_usernames.waiterusername,dayTable.weekdays from admin inner join waiter_usernames on admin.userid=waiter_usernames.id inner join dayTable on admin.dayid=dayTable.id');
            return waiterAndDays.rows
        } catch (error) {
            console.log(error);
        }
    }

    return {
        storeNames,
        getWaiterId,
        getDayId,
        storeNameAndDays,
        joiningWaitersAndDays,
    }
}
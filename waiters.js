module.exports = function waiter(pool) {
  
    // var greetWaiter = async (regNo) => {
    //     try {
    //         if (regNo.length < 7 || regNo.length > 10) {
    //             return null;
    //         }
    //         else if (regNo.startsWith('CA') || regNo.startsWith('CJ') || regNo.startsWith('CK')) {
    //             await add(regNo);
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    var storeNames = async (name) => {
        try {
            var checkWaiter = await pool.query(`select waiterusername from waiter_usernames where waiterusername = $1`, [name])
            if (checkWaiter.rowCount == 0) {
                await pool.query(`insert into waiter_usernames(waiterusername) values ($1)`, [name])
            }
          
        } catch (error) {
            console.log(error)
        }
    }

    var displayUsername = async (name) => {
        try {
         return name;
          
        } catch (error) {
            console.log(error)
        }
    }

    return {
        //greetWaiter,
        storeNames,
        displayUsername
    }
}
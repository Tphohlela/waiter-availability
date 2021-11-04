let assert = require("assert");
let waiter = require("../waiters");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiter_test';

const pool = new Pool({
    connectionString
});

describe('Test for Waiters factory function', function () {
    beforeEach(async function () {
        await pool.query("delete from waiter_usernames;");
        await pool.query("delete from admin;");
    });

    describe('For getting day id', function () {

        it('should return dayId 1,2,3 from day table if Monday,Tuesday,Wednesday is entered', async function () {
            let day = waiter(pool);
            assert.deepEqual([1, 2, 3], await day.getDayId('Monday,Tuesday,Wednesday'));
        });

        it('should return dayId 5 from day table if Friday is entered', async function () {
            let day = waiter(pool);
            assert.equal(5, await day.getDayId('Friday'));
        });

        it('should return dayId 6,1 from day table if Saturday,Monday is entered', async function () {
            let day = waiter(pool);
            assert.deepEqual([6, 1], await day.getDayId('Saturday,Monday'));
        });
    });

    describe('Checking which days are overbooked, underbooked and just ok ', function () {

        it('should return the days that have been selected more than three times', async function () {
            let day = waiter(pool);

            await day.storeNames('Beyonce');
            await day.storeNames('Riri');
            await day.storeNames('Tk');
            await day.storeNames('Thato');

            await day.storeNameAndDays('Beyonce','Friday,Saturday,Sunday');
            await day.storeNameAndDays('Riri','Friday,Saturday,Sunday');
            await day.storeNameAndDays('Tk','Friday,Saturday,Sunday');
            await day.storeNameAndDays('Thato','Monday,Wednesday,Friday');

        

            assert.deepEqual([],await day.bookings()) ;
        
        });


    });

})
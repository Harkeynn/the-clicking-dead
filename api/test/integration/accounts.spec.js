const app = require('../../index');
require('chai').should();
const sinon = require('sinon');
const request = require('supertest');



describe('get accounts', function(){
    it('should get all articles', function(){
        //GIVEN
        //WHEN
        //THEN
    })

    it('should get status 200 (success)', () => {
        let get = sinon.stub(request(app), 'get');
        get.yields();

        let Account = {
            getAccounts: function () {
                request(app)
                    .get('/accounts')
            }
        };

        let getAccountSpy = sinon.spy(Account, 'getAccounts');

        ///////////WHEN///////////
        Account.getAccounts();

        ///////////THEN///////////
        sinon.assert.called(getAccountSpy)
        sinon.assert.callCount(getAccountSpy, 1)
        getAccountSpy.restore();
    });
})
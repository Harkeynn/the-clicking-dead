const app = require('../../index');
require('chai').should();
const sinon = require('sinon');
const request = require('supertest');
const get = sinon.stub(request(app), 'get');
get.yields();



/////////METHODS/////////
let Account = {
    getAccounts: function () {
        return request(app)
            .get('/accounts')
    },
    getAccountByNickname : function (nickname){
        return request(app)
            .get('/accounts/' + nickname);
    }
};



let getAccountSpy;
let nickname;

//GET ACCOUNTS
describe('get accounts', function(){
    beforeEach(() => {
        getAccountSpy = sinon.spy(Account, 'getAccounts');        
    });

    afterEach(() => {
        getAccountSpy.restore();
    });

    it('should be called once', () => {
        ///////////WHEN///////////
       return Account.getAccounts();

        ///////////THEN///////////
        sinon.assert.called(getAccountSpy)
        sinon.assert.callCount(getAccountSpy, 1)

    });
})

//GET ACCOUNT BY NICKNAME
describe('get accountByNickname', function(){
    beforeEach(() => {
        getAccountSpy = sinon.spy(Account, 'getAccountByNickname'); 
        nickname = "Maxime";       
    });

    afterEach(() => {
        getAccountSpy.restore();
        nickname = "";
    });

    it('should be called once', () => {
        ///////////WHEN///////////
        Account.getAccountByNickname();

        ///////////THEN///////////
        sinon.assert.called(getAccountSpy)
        sinon.assert.callCount(getAccountSpy, 1)
    });

    it('should be called with parameter', () => {
        ///////////WHEN///////////
        Account.getAccountByNickname(nickname);

        ///////////THEN///////////
        sinon.assert.calledWith(getAccountSpy, "Maxime");
    });
})
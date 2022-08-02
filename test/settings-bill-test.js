const assert = require('assert')
const settingsBill = require('../settings-bill')

describe("the bill with settings factory function" , function(){
describe("set values" , function(){
    it("should be able to set the call cost", function(){
      let settingsBill =  BillwithSettings();
      settingsBill.setCallCost(1.85);
      assert.equal(1.85, settingsBill.getCallCost());
      let settingsBill2 =  BillwithSettings();
      settingsBill2.setCallCost(2.75);
      assert.equal(2.75, settingsBill2.getCallCost());
    });

    it("should be able to set the sms cost", function(){
      let settingsBill =  BillwithSettings();
      settingsBill.setSmsCost(0.85);
      assert.equal(0.85, settingsBill.getSmsCost());
      let settingsBill2 =  BillwithSettings();
      settingsBill2.setSmsCost(0.75);
      assert.equal(0.75, settingsBill2.getSmsCost());
    });
    it("should be able to set the call cost and  sms cost", function(){
      let settingsBill =  BillwithSettings();
      settingsBill.setCallCost(2.75);
      settingsBill.setSmsCost(0.75);
      assert.equal(2.75, settingsBill.getCallCost());
      assert.equal(0.75, settingsBill.getSmsCost());
      let settingsBill2 =  BillwithSettings();
      settingsBill2.setCallCost(1.75);
      settingsBill2.setSmsCost(0.85);
      assert.equal(1.75, settingsBill2.getCallCost());
      assert.equal(0.85, settingsBill2.getSmsCost());
    });
    
    it("should be able to set the warning level", function(){
      let settingsBill =  BillwithSettings();
      settingsBill.setwarningLevel(20);
      
      assert.equal(20, settingsBill.getwarningLevel());
    });
    it("should be able to set the critical level", function(){
      let settingsBill =  BillwithSettings();
      settingsBill.setCriticalLevel(30);
      
      assert.equal(30, settingsBill.getCriticalLevel());
    });
    it("should be able to set the critical level and warning level", function(){
      let settingsBill =  BillwithSettings();
      settingsBill.setwarningLevel(15);
      settingsBill.setCriticalLevel(25);
      assert.equal(15, settingsBill.getwarningLevel());
      assert.equal(25, settingsBill.getCriticalLevel());
    });
} );
  describe("use values",function(){
    it("should be able to use the call cost set", function(){
    let settingsBill =  BillwithSettings();
    settingsBill.setCallCost(2.25);
    settingsBill.setSmsCost(0.00);
    settingsBill.setCriticalLevel(20); 
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal(6.75, settingsBill.getTotalCost());
    assert.equal(6.75, settingsBill.getCallTotalCost());
    assert.equal(0.00, settingsBill.getSmsTotalCost());
  })
  it("should be able to make the call cost set for 2 calls at 1.35", function(){
    let settingsBill =  BillwithSettings();
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.00);
    settingsBill.setCriticalLevel(20);
    settingsBill.makeCall();
    settingsBill.makeCall();
    

    assert.equal(2.70, settingsBill.getTotalCost());
    assert.equal(2.70, settingsBill.getCallTotalCost());
    assert.equal(0.00, settingsBill.getSmsTotalCost());
  })
  it("should be able to send 2 sms's at 0.85", function(){
    let settingsBill =  BillwithSettings();
    settingsBill.setCallCost(0.00);
    settingsBill.setSmsCost(0.85);
    settingsBill.setCriticalLevel(20);
    settingsBill.sendSms();
    settingsBill.sendSms();
    

    assert.equal(1.70, settingsBill.getTotalCost());
    assert.equal(0.00, settingsBill.getCallTotalCost());
    assert.equal(1.70, settingsBill.getSmsTotalCost());
  });
  it("should be able to send 2 sms's at 0.85 and make 1 call at 1.35", function(){
    let settingsBill =  BillwithSettings();
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);
    settingsBill.setCriticalLevel(20);

    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.makeCall();

    assert.equal(3.05, settingsBill.getTotalCost());
    assert.equal(1.35, settingsBill.getCallTotalCost());
    assert.equal(1.70, settingsBill.getSmsTotalCost());
  });
});

describe("warning & critical level", function(){
  it("it should return a class of 'warning' if the warning level is reached",function(){
  let settingsBill =  BillwithSettings();

    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);
    settingsBill.setwarningLevel(5);
    settingsBill.setCriticalLevel(20);

    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    assert.equal("warning", settingsBill.totalClassName());
  });
  it("it should return a class of 'critical' if the critical level is reached",function(){
    let settingsBill =  BillwithSettings();
    settingsBill.setCallCost(1.35);
      settingsBill.setSmsCost(0.85);
      settingsBill.setCriticalLevel(10)
  
      settingsBill.sendSms();
      settingsBill.sendSms();
      settingsBill.makeCall();
      settingsBill.makeCall();
      settingsBill.makeCall();
      settingsBill.makeCall();
      assert.equal("warning", settingsBill.totalClassName());
    });
    it("it should return a class of 'critical' if the critical level is reached",function(){
      let settingsBill =  BillwithSettings();
      settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setwarningLevel(5);
        settingsBill.setCriticalLevel(10);
    
        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        assert.equal("critical", settingsBill.totalClassName());
      });
    
      it("it should stop the Total Call cost from increasing when the critical level is reached",function(){
        let settingsBill =  BillwithSettings();
        settingsBill.setCallCost(1.35);
          settingsBill.setSmsCost(0.85);
          settingsBill.setwarningLevel(5);
          settingsBill.setCriticalLevel(10);
      
          settingsBill.sendSms();
          settingsBill.sendSms();
          settingsBill.sendSms();
          settingsBill.sendSms();
          settingsBill.sendSms();
          settingsBill.makeCall();
          settingsBill.makeCall();
          settingsBill.makeCall();
          settingsBill.makeCall();
          settingsBill.makeCall();
          settingsBill.makeCall();
          settingsBill.makeCall();
          settingsBill.makeCall();

          assert.equal("critical", settingsBill.totalClassName());
        });
});
});
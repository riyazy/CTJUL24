public virtual class ContactController {
	public String fName;
    public String lName;
    Id accountId;
    
    public ContactController() {
        this.fName = 'Testing';
        this.setDefaultAccount();
    }
    
    void setDefaultAccount() {
    	this.accountId = '001dL00000XWkrUQAT';    
    }
    
    Id getDefaultAccount() {
        return this.accountId;
    }
    
    public virtual void add(String lastName) {
        Contact c = new Contact();
        c.LastName = lastName;
        c.FirstName = this.fName;
      	c.AccountId = this.getDefaultAccount();
        
        insert c;
    }
    
    public void getEmployees() {
        // SOQL to get current records in the DB
        List<Pharmacy_Employees__c> employeeList = [SELECT Id, Name, Employee_Name__c, Mobile_Number__c, Email_Address__c, Pharmacy__c, Is_Education_Certificate_Uploaded__c FROM Pharmacy_Employees__c];
        
        for(sObject e: employeeList) {
            System.debug(e.get('Employee_Name__c') + '-' + e.Id);
        }
        
        for(Pharmacy_Employees__c pe: employeeList) {
            System.debug(pe.get('Employee_Name__c') + '-' + pe.Mobile_Number__c);
        }
    }
        
        
        
        
        
        
        
        
}
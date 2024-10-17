public class EmployeeController extends ContactController {
   public List<Pharmacy_Employees__c> readEmployees(String accountId) {
        // SOQL to get current records in the DB
        List<Pharmacy_Employees__c> employeeList = [SELECT Id, Name, Employee_Name__c, Mobile_Number__c, Email_Address__c, Pharmacy__c, Is_Education_Certificate_Uploaded__c FROM Pharmacy_Employees__c];
        
        for(sObject e: employeeList) {
            System.debug(e.get('Employee_Name__c') + '-' + e.Id);
        }
        
        for(Pharmacy_Employees__c pe: employeeList) {
            System.debug(pe.get('Employee_Name__c') + '-' + pe.Mobile_Number__c);
        }
       
       System.debug(employeeList.size());
       
       	return employeeList;
    }
    
    @AuraEnabled
    public static void createEmployee(String name) {
        Pharmacy_Employees__c pe = new Pharmacy_Employees__c();
        pe.Employee_Name__c = name;
        pe.Is_Education_Certificate_Uploaded__c = true;
        pe.Mobile_Number__c = '90879801236';
        
        Account pharmacy = [SELECT Id, Name FROM Account WHERE Name = 'Srivaikundam Apollo Pharmacy' LIMIT 1];
        System.debug(pharmacy.Id);
        System.debug(pharmacy.Name);
        
        Account pharmacyObj = new Account();
        pharmacyObj.Name = 'ABC';
        
        pe.Pharmacy__c = pharmacy.Id;
        
        insert pe;	// update, upsert, delete
    }
    
    // Method to update all employees for a given Pharmacy
    public void updateAllEmployees(Id pharmacyId) {
        List<Pharmacy_Employees__c> updatedList = new List<Pharmacy_Employees__c>();
        // Get the employees
        for(Pharmacy_Employees__c pe: this.readEmployees(pharmacyId)) {
            System.debug(JSON.serialize(pe));
            pe.Email_Address__c = 'info@rangerinc.co';
            updatedList.add(pe);
        }
        
        for(Pharmacy_Employees__c pe: updatedList) {
            System.debug('new email address is ' + pe.Email_Address__c);
        }
        
        // Exception Handling
        List<Database.SaveResult> dbResponseList = Database.update(updatedList, false);	// Update non-errored records in the DB

        for(Database.SaveResult sr: dbResponseList) {
            if (sr.isSuccess()) {
                // Data updated
                System.debug('Successfully updated Employee. Employee Id' + sr.getId());
            } else {
                // Data update Failed
                for(Database.Error err : sr.getErrors()) {
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Account fields that affected this error: ' + err.getFields());
                }
            }
        }
    }
    
    
}
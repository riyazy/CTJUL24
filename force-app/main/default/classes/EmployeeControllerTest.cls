@isTest
public with sharing class EmployeeControllerTest {
    @testSetup static void setup() {
        // Create Pharmacy
        Account pharmacy = new Account(name='Srivaikundam Apollo Pharmacy');
        insert pharmacy;
    }

    // Test Method for covering new employee scenario
    static testmethod void newEmployeeTest() {
        EmployeeController.createEmployee('Test');

        // Get Pharmacy from database
        Account pharmacy = [SELECT Id, Name FROM Account WHERE Name = 'Srivaikundam Apollo Pharmacy' LIMIT 1];

        // Read the newly created employee
        EmployeeController ec = new EmployeeController();
        List<Pharmacy_Employees__c> dbEmpList = ec.readEmployees(pharmacy.Id);

        System.assert(dbEmpList.size() > 0);

        ec.updateAllEmployees(pharmacy.Id);
    }

    // Test New Employee with Email
    static testmethod void newEmployeeEmailTest() {
        Pharmacy_Employees__c pe = new Pharmacy_Employees__c(Employee_Name__c = 'EmailTest', 
            Email_Address__c = 'emailtest@test.com',
            Mobile_Number__c = '9087980320',
            Is_Education_Certificate_Uploaded__c = true);

        try {
            insert pe;
        } catch(Exception e) {
            System.assert(e.getMessage().contains('Required fields are missing: [Pharmacy__c]'));
            System.debug(e.getMessage());


            // Get Pharmacy from database
            Account pharmacy = [SELECT Id, Name FROM Account WHERE Name = 'Srivaikundam Apollo Pharmacy' LIMIT 1];

            // Use Account and create employee
            pe.Pharmacy__c = pharmacy.id;
            insert pe;
        }

    }
}
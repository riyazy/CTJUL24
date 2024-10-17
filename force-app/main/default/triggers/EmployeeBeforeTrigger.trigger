trigger EmployeeBeforeTrigger on Pharmacy_Employees__c (before insert) {
    System.debug(Trigger.new.size());
    System.debug(Trigger.size);
    // Check for a business logic to be implemented before creating a record
    for(Pharmacy_Employees__c emp : Trigger.new) {
        System.debug('Inside EmployeeBeforeTrigger for ' + emp.Name);
    }
}
trigger EmployeeAfterTrigger on Pharmacy_Employees__c (after insert) {
    // Send a welcome Email
    for(Pharmacy_Employees__c emp : Trigger.new) {
        System.debug('Inside EmployeeAfterTrigger for ' + emp.Name + ' with ' + emp.Id);
        if(emp.Email_Address__c != null) {
            // Send welcome email
            String address = emp.Email_Address__c;
            String subject = 'Welcome to our Pharmacy, ' + emp.Employee_Name__c;
            String body = 'We hope you enjoy your work!';
            System.debug('Good to send email for ' + emp.Employee_Name__c);
            try {
                EmailManager.sendMail(address, subject, body);
            } catch(Exception e) {
                emp.addError('Unable to save record' + e.getMessage());
            }
        } else {
            // emp.addError('Please provide email address');
        }
    }
}
public with sharing class ContactAddressController {
    // Function to update Contact
    @AuraEnabled
    public static AddressWrapper updateAddress(String apexMethodParams) {
        AddressWrapper aw = new AddressWrapper();

        return aw;
    }

    // Function to update Contact
    @AuraEnabled(cacheable=true)
    public static AddressWrapper getAddress(String contactId) {
        AddressWrapper aw = new AddressWrapper();

        try {    
            Contact c = [SELECT Id, Name, MailingStreet, MailingCity, MailingState, MailingCountry FROM Contact WHERE Id = :contactId LIMIT 1];

            aw.Name = c.Name;
            aw.Street = c.MailingStreet;
            aw.City = c.MailingCity;
            aw.State = c.MailingState;
            aw.Country = c.MailingCountry;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return aw;
    }

    // Wrapper for Address
    public class AddressWrapper {
        @AuraEnabled
        public String name;

        @AuraEnabled
        public String street;
        
        @AuraEnabled
        public String city;
        
        @AuraEnabled
        public String state;
        
        @AuraEnabled
        public String country;
    }
}
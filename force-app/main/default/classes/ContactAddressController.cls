public with sharing class ContactAddressController {
    // Function to update Contact
    @AuraEnabled
    public static void updateAddress(String apexMethodParams) {
        AddressWrapper aw = (AddressWrapper)JSON.deserialize(apexMethodParams, AddressWrapper.class);

        if(String.isBlank(aw.id)) {
            throw new AuraHandledException('Contact Id is required.');
        }

        Contact c = new Contact(Id = aw.id, MailingStreet = aw.street, MailingCity = aw.city, MailingState = aw.state, MailingCountry = aw.country);
        update c;

        return;
    }

    private static final String ADDRESS_VALIDATION_URL = '<insert your callout URL here>';

    // Action method
    @AuraEnabled(continuation=true cacheable=true)
    public static Object updateAddressAfterValidation(String apexMethodParams) {
        // Create continuation. Argument is timeout in seconds.
        Continuation con = new Continuation(40);
        // Set callback method
        con.continuationMethod='processAddressValidation';
        // Set state
        con.state = apexMethodParams;
        // Create callout request
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(ADDRESS_VALIDATION_URL);
        // Add callout request to continuation
        con.addHttpRequest(req);
        // Return the continuation
        return con;
    }

    // Callback method
    @AuraEnabled(cacheable=true)
    public static Object processAddressValidation(List<String> labels, Object state) {
        // Get the response by using the unique label
        HttpResponse response = Continuation.getResponse(labels[0]);
        // Set the result variable
        String result = response.getBody();

        updateAddress((String)state);

        return result;
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
        @auraEnabled
        public String id;

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
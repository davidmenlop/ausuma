var baseURL= 'http://localhost:52825';
//'https://api.ausumaerp.com'; 
//'https://softwaredevsolutions.com'; 

class CUSTOMERLEAD {
        constructor(firstname,lastname, companyname, phone, mobile,email,reason,subject,tellUs,status){
                this.FIRSTNAME =firstname,
                this.LASTNAME = lastname,
                this.COMPANYNAME = companyname,
                this.PHONE = phone,
                this.MOBILE =mobile,
                this.EMAIL = email,
                this.REASONFORCONTACT = reason,
                this.SUBJECT = subject,
                this.TELLUSMORE = tellUs,
                this.INACTIVE = false,
                this.STATUS= status               
        }
    }    

async function addCustomerData(token,callback) {
var customerLeadObj = new CUSTOMERLEAD(); 
customerLeadObj.FIRSTNAME = document.getElementById("first-name").value;                                        
customerLeadObj.LASTNAME = document.getElementById("last-name").value;                                        
customerLeadObj.COMPANYNAME = document.getElementById("company-name").value;                                        
customerLeadObj.PHONE = document.getElementById("phone").value;                                        
customerLeadObj.MOBILE =  document.getElementById("mobile").value;                                        
customerLeadObj.EMAIL = document.getElementById("email").value;                                        
customerLeadObj.REASONFORCONTACT = document.getElementById("reason-for-contact").value;                                        
customerLeadObj.SUBJECT = document.getElementById("subject").value;                                        
customerLeadObj.TELLUSMORE = document.getElementById("more-about-yourself").value;                                       
customerLeadObj.INACTIVE = false;
customerLeadObj.STATUS = 'O';


                                      
//Replace this link with ausuma Api
await fetch(baseURL + '/api/customerlead/AddCustomerLead',{
        method: 'POST',                                                
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            //'Access-Control-Allow-Origin': '*',
            mode: "cors",
            cache: "no-cache",
            'Authorization': 'bearer ' + token                
        },
        body: JSON.stringify(customerLeadObj),
    })
    .then(res => res.json())
    .then(data => 
        {            
            if (data.STATUS)
            {        
                 Swal.fire({
                    title: "Thank you!",
                    text: "Thank you for contacting us. We will have a member of our team get back to you soon.",
                    icon: "success"
                }); 
                callback(true);                                                        
            }
            else
            {                
                Swal.fire({
                    title: "Bad Request!",
                    text: data.EXPCEPTION.Message,
                    icon: "error"
                  });
                  callback(false);                                 
            }            
        });  
                           
}       

function show_loader(){
    //Show loader and disable button     
    document.getElementById("loader").classList.add("loader");
    document.getElementById("btnSubmit").disabled = true;                    
}

 function  hide_loader(success)
 {      
    //Hide loader and enable button            
    document.getElementById("loader").classList.remove("loader");    
    document.getElementById("btnSubmit").disabled = false;
    if (success)
        document.getElementById("contact-form").reset();       
 }       

       window.onload = function ReadQueryStringValue() {
        // code to execute on the page load
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('reason');     
        if (myParam === "try")
        {
            document.getElementById("reason-for-contact").value = "I want to sign-up and start a trial";
            document.getElementById("reason-for-contact").disabled=true;
        }
        else if (myParam === "demo")
        {
            document.getElementById("reason-for-contact").value = "I want to see a running demo";
            document.getElementById("reason-for-contact").disabled=true;
        }
        else
        {  
            document.getElementById("reason-for-contact").value = "Select a reason";
            document.getElementById("reason-for-contact").disabled=false;
        }
     }

     function onSubmit(token) {        
        try
        {                   
            show_loader();               
                if (checkValidation())
                {                   
                    addCustomerData(token,hide_loader);                         
                }
                else
                {                 
                    hide_loader(false);
                }                                
        }
        catch(e)
        {
            //Write swal here         
        }       
      }

      function checkValidation()
      { 
           if (!showErrorMsg(document.getElementById("first-name").value,"First Name")) return false;
           if (!showErrorMsg(document.getElementById("last-name").value,"Last Name")) return false;
           if (!showErrorMsg(document.getElementById("phone").value,"Phone")) return false;
           if (!showErrorMsg(document.getElementById("email").value,"Email")) return false;
           if (!showErrorMsg(document.getElementById("reason-for-contact").value,"Reason for Contact")) return false;
           if (!showErrorMsg(document.getElementById("subject").value,"Subject")) return false;                                             
           return true;       
      }

    //   submitButton.addEventListener('click', function (event) {
    //     // Hide the form container after a short delay when the submit button is clicked
    //     setTimeout(function () {
    //         formContainer.style.display = 'none';
    //     }, 100);

        // Rest of your existing code for form submission
        // ...

        // For demonstration purposes, let's log a message to the console
    //     console.log('Form submitted!');
    //   });
       

      function showErrorMsg(value, name)
      {
       
        if (value.trim().length === 0) {
            Swal.fire({
                title: "Bad Data!",
                text: name + " is missing",
                icon: "error"
            });   
            return false;
        }
        return true;
      }

    

    
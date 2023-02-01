/* Version 1.0
requirement : 
Plugin : jquery, jvalide
Core : js-component-validate.js , js-component-validate.css
*/

//Phase 1 : build base code
//Phase 2 : build optional 
//Phase 3 : using Fuzzy searching to match name filed code and name filed of any theme.
console.log('init component')

// config variable
var colorError = "red";
var minLengthPass = 5;
var hoverFieldColor = "pink";
// source code
class ValidateForm extends HTMLElement {
    connectedCallback(){
        this.render();
    }
    render(){
       if(this.getIdForm()){
        this.customValidate(this.getIdForm());
       }
       else{
        this.customValidate(this.getForm());
       }
    }
    getIdForm(){
        var a = this.getElementsByTagName('form');
        var idForm = a[0].getAttribute("id");
        if (idForm)
        {
            return "#"+idForm;
        }
        else {
            // form doesn't have an ID
            return false;
        }
    }
    getForm(){
        var a = this.getElementsByTagName('form');
        return a;
    }
    customValidate(getIdForm){
        var $this = $(this);
        $(getIdForm).validate({
            rules: {
                namne : "required",
                "email" : {
                    required : true,
                    email : true
                },
                "customer[email]" : {
                    required : true,
                    email : true
                },
                "customer[password]" : {
                    required : true,
                    minlength: minLengthPass
                },
                "customer[first_name]" : {
                    required : true
                },
                "customer[last_name]" : {
                    required : true
                },
                "address[first_name]" : {
                    required : true
                },
                "address[last_name]" : {
                    required : true
                },
                "address[company]" : {
                    required : true
                },
                "address[address1]" : {
                    required : true
                },
                "address[address2]" : {
                    required : true
                },
                "address[city]" : {
                    required : true
                },
                "address[phone]" : {
                    required : true
                },
                "address[zip]" : {
                    required : true
                }
            },
            messages: {
                name: "Please specify your name",
                "email" : {
                    required : "Mail ko nho reset bang niem tin ak",
                    email : "Mail may phai co chu @ !!!!"
                },
                "customer[email]" : {
                    required : "Khong dien thi dung hong co tk",
                    email : "Mail may phai co chu @ !!!!"
                },
                "customer[password]" : {
                    required : "Tk ko co pass t hack phat bjo",
                    minlength : "pass dai dai ty"
                }
            },
            errorPlacement : function(error, element) {
                // error.appendTo(element.parent());
                element.parent().after(error);
                $(error).css({color : colorError});
            },
            highlight: function (element , errorClass) {
                $(element).css({ color : colorError});
                $(element).next().css({ color : colorError});
                
                $(element).parent('.field').addClass("error");
            },
            unhighlight : function ( element , errorClass){
                $(element).css({color : ""});
                $(element).next().css({ color : ""});
                $(element).parent('.field').removeClass("error");
            }
        })
    }
}
customElements.define('component-validate-form', ValidateForm);

// css style
document.body.style.setProperty('--error-color',colorError);
document.body.style.setProperty('--hover-field-color', hoverFieldColor);

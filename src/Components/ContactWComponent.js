const contact_style = `
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.contact_cont{
    position: relative;
    font-family: 'Montserat', sans-serif;
    font-size: .8rem;
    height: 400px;
    width: 100%;
    border: 2px solid white;
    border-radius: 12px;
    padding: 2rem;
    overflow: hidden;
    background-color: black;
}
h2{
    font-family: 'MyUnispace', sans-serif;
    font-size: 2rem;
    margin-bottom: .5rem;
}
input, textarea{
    border: 1px solid white;
    background: none;
    border-radius: 6px;
    margin: 5px 0;
    color: white;
    padding: 0px 6px;
}
#iname, #iemail{
    height: 30px;
    width: 300px;
}
#imsg{
    width: 100%;
    height: 125px;
    width: 100%;
    height: 125px;
    padding: 8px;
}
.submit-btn{
    position: absolute;
    right: 50px;
    bottom: 50px;
    padding: 5px 20px;
    color: var(--secondary-color);
}
label{
    var(--primary-color);
}
.submit-btn:hover{
    cursor: pointer;
}
.err_msg{
    color:red;
    margin-bottom:.5rem;
}
@media only screen and (min-width: 700px){
.contact_cont{
    width: 800px;
}


}
</style>
<div class='contact_cont'>
    <h2>Leave a Message</h2>
    <p class='err_msg' style="opacity: 0;" >'</p>
    <form>
        <label for='iname'><p>Name</p></label>
        <input type='text' id='iname' name="iname" ></input>
        <label for='iemail' ><p>Email</p></label>
        <input type='text' name='iemail' id='iemail' ></input>
        <label for='imsg'><p>Message</p></label>
        <textarea id='imsg' name='imsg' ></textarea>
        <input class='submit-btn' type='button' value='Submit'/>
    </form>
</div>
`
class ContactComponent extends HTMLElement {
    constructor() {
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = contact_style;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.submitEvent;
        this.formDataMsg = {
            VALID_FORM: 'valid form',
            INVALID_EMAIL: 'Email entered is not a valid email',
            EMPTY_FIELDS: 'A text field was left empty'
        }
    }
    render() {
    }
    async sendFormData() {
        
        const formData = {
            iname: this.shadow.getElementById('iname').value,
            iemail: this.shadow.getElementById('iemail').value,
            imsg: this.shadow.getElementById('imsg').value
        }
        const validation = this.validateForm(formData);
        console.log(validation);
        if (validation === this.formDataMsg.VALID_FORM) {
            console.log('sending data');
            try {
                const response = await fetch('https://api.devdav.dev/contact/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                const data = await response.json();
            } catch (err) {
                console.log(err);
            }
            this.shadow.querySelector('.err_msg').setAttribute('style','opacity: 0;')
            this.shadow.querySelector('.submit-btn').setAttribute('value','Sent!')
            this.shadow.querySelector('.submit-btn').setAttribute('style','color: #db6d00;')
            this.shadow.querySelector('.submit-btn').removeEventListener('click',this.submitEvent);
            return
        }
        this.shadow.querySelector('.err_msg').innerHTML = validation;
        this.shadow.querySelector('.err_msg').setAttribute('style','opacity: 1;')
    }
    validateForm({ iname, iemail, imsg }) {
        const emailRegexp = /\w+@{1}\w+[.]\w+/;
        if (iname && iemail && imsg) {
            if (!iemail.match(emailRegexp)) {
                return this.formDataMsg.INVALID_EMAIL;
            }
            return this.formDataMsg.VALID_FORM;
        }
        return this.formDataMsg.EMPTY_FIELDS;
    }
    connectedCallback() {
        this.submitEvent = () => { this.sendFormData() }
        this.shadow.appendChild(this.template.content.cloneNode(true));
        this.shadow.querySelector('.submit-btn').addEventListener('click', this.submitEvent );
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
}
window.customElements.define('contact-', ContactComponent);
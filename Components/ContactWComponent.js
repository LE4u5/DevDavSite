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
    width: 800px;
    border: 2px solid white;
    border-radius: 12px;
    padding: 2rem;
    overflow: hidden;
}
h2{
    font-family: 'MyUnispace', sans-serif;
    font-size: 2rem;
    margin-bottom: 2rem;
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
    max-width: 100%;
    max-height: 125px;
}
.submit-btn{
    position: absolute;
    right: 50px;
    bottom: 50px;
    padding: 5px 20px;
    color: #0baa84;
}
label{
    color: #db6d00;
}
.submit-btn:hover{
    cursor: pointer;
}
</style>
<div class='contact_cont'>
    <h2>Leave a Message</h2>
    <form action='http://localhost:1986/' method='post'>
        <label for='iname'><p>Name</p></label>
        <input id='iname' name='iname' ></input>
        <label for='iemail' ><p>Email</p></label>
        <input name='iemail' id='iemail' ></input>
        <label for='imsg'><p>Message</p></label>
        <textarea id='imsg' name='imsg' ></textarea>
        <input class='submit-btn' type='submit' value='Submit'/>
    </form>
</div>
`
class ContactComponent extends HTMLElement{
    constructor(){
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = contact_style;
        let shadow = this.attachShadow({mode:'open'});
        shadow.appendChild(this.template.content.cloneNode(true));
    }
}
window.customElements.define('contact-', ContactComponent);
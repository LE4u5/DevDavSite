const nav_style = `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.navbar_cont{
    position: fixed;
    top: 0;
    left: 0;

    padding-right: 100px;
    width: 100vw;
    height: 60px;
    color: white;
    
    display: flex;
    justify-content: right;
    align-items: center;
}

</style>
<div class='navbar_cont'>
    <slot class='nav_content'></slot>
</div>
`
class NavBarComponent extends HTMLElement{
    constructor(){
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = nav_style;

        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.template.content.cloneNode(true));
        shadow.querySelector('.nav_content').innerHTML = this.innerHTML;
    }
}
window.customElements.define('navbar-', NavBarComponent);
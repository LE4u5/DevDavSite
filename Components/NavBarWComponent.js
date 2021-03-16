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
p{
    
}
a{
    font-family: 'Montserat', sans-serif;
    font-size: .9rem;
    color: white;
    text-decoration: none;
    margin-right: 3rem;
    display: flex;
}
i{
    margin-left: .5rem;
}
.download_link{
    margin-left: 8rem;
}
</style>
<div class='navbar_cont'>
</div>
`
class NavBarComponent extends HTMLElement{
    constructor(){
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = nav_style;

        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.template.content.cloneNode(true));
        shadow.querySelector('.navbar_cont').innerHTML = this.innerHTML;
    }
}
window.customElements.define('navbar-', NavBarComponent);
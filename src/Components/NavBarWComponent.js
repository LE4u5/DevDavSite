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
    justify-content: flex-end;
    align-items: center;
}
.navbar_cont.active{
    height: 16rem;
    background-color: black;
}
.nav_content{
    display: none;
}
.navbar_cont.active .nav_content{
    position: absolute;
    display: block;
    top: 40px;
    left: 40px;
    text-decoration: none;
}
.fa-bars{
    position: absolute;
    right: 30px;
    top: 30px;
}
@media only screen and (min-width: 700px){
.fa-bars{
    display: none;
}
.nav_content{
    display: flex;
}
}
</style>
<div class='navbar_cont'>
    <slot class='nav_content'></slot>
    <div class='bars'><i class="fas fa-bars fa-lg"></i></div>
</div>
`
class NavBarComponent extends HTMLElement{
    constructor(){
        super();
        this.template = document.createElement('template');
        this.template.innerHTML = nav_style;
        this.shadow = this.attachShadow({mode: 'open'});
        this.navElement;
        this.touched = false;
    }
    render(){
        this.shadow.querySelector('.nav_content').innerHTML = this.innerHTML;
    }
    connectedCallback(){
        this.shadow.appendChild(this.template.content.cloneNode(true));
        this.render();
        this.navElement = this.shadow.querySelector('.navbar_cont');
        this.shadow.querySelector('.fa-bars').addEventListener('touchend', ()=>{
            if(!this.touched) {
                this.shadow.querySelector('.navbar_cont').classList.add('active');
                this.touched = !this.touched;
            }else
            if(this.touched) {
                this.navElement.classList.remove('active');
                this.touched = !this.touched;
            }
        })
    }
    attributeChangedCallback(){
        this.render();
    }
}
window.customElements.define('navbar-', NavBarComponent);
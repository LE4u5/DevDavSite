const proj_style = `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
<style>
*{
    padding: 0;
    margin: 0;
}
.proj_card_cont{
    height: 370px;
    width: 890px;
    border: 2px solid white;
    border-radius: .8rem;
    padding: 24px;
    background-color: black;
}
.proj_card_cont .img_cont{
    height: 320px;
    width: 320px;
    background-color: white;
    border-radius: .7rem;
}
.info_cont{
    text-align: right;
    width: calc(100% - 330px);
}
h2{
    font-family: 'Unispace', sans-serif;
    color: white;
    font-size: 2.4rem;
    margin-bottom: 1rem;
}
h3{
    font-family: 'Unispace', sans-serif;
    color: white;
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
}
p{
    font-family: 'Montserat', sans-serif;
    color: #db6d00;
    font-size: 1.2rem;
}
.content_cont{
    display: flex;
}
.tech_list{
    display: flex;
}
.tech_list{
    display: flex;
    color: #0baa84;
}
.tech_list i{
    margin-top: 1.2rem;
    margin-right: 1rem;
}
</style>
<div class='proj_card_cont'>
    <div class='content_cont'>
        <div class='img_cont'>
        </div>
        <div class='info_cont'>
            <h2>Name</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, quae? Itaque magni asperiores velit nisi sint sapiente ipsum necessitatibus nam?</p>
            <div>
                <h3>Links</h3>
            </div>
        </div>
    </div>
    <div class='tech_list'>
    </div>
</div>
`;
class ProjectCardComponent extends HTMLElement{
    constructor(){
        super()
        this.template = document.createElement('template');
        this.template.innerHTML = proj_style;

        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.template.content.cloneNode(true));
        shadow.querySelector('.tech_list').innerHTML = this.innerHTML;
    }
}
window.customElements.define('project-card', ProjectCardComponent);
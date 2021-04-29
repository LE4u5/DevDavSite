const proj_style = `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
<style>
*{
    padding: 0;
    margin: 0;
}
.proj_card_cont{
    height: calc((100vw - 88px) + 60px);
    width: 100;
    border: 2px solid white;
    border-radius: .8rem;
    padding: 24px;
    background-color: black;
    margin-bottom: 3rem;
    overflow: hidden;
}
.proj_card_cont.active{
    height: 700px !important;
}
.proj_card_cont .img_cont{
    width: 100;
    height: calc( 100vw - 88px);
    background-color: white;
    border-radius: .7rem;
    overflow: hidden;
    margin-bottom: 24px;
}

.info_cont{
    
    width: 100;
}
h2{
    font-family: 'MyUnispace', sans-serif;
    color: white;
    font-size: 2.4rem;
    margin-bottom: 1rem;
}
h3{
    font-family: 'MyUnispace', sans-serif;
    color: white;
    font-size: 1.5rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
}
p{
    font-family: 'Montserat', sans-serif;
    color: #db6d00;
    font-size: 1.2rem;
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
.links_cont i{
    color: white;
    margin-left: .8rem;
    margin-top: 1rem;
    color: #0baa84;
}
.img_cont img{
    width: 100%;
}
@media only screen and (min-width: 700px){
.proj_card_cont{
    width: 750px;
    height: 300px
}

.proj_card_cont .img_cont{
    height: 250px;
    width: 250px;
    margin-bottom: 0;
}
.info_cont{
    text-align: right;
    width: calc(100% - 250px);
}

.content_cont{
    display: flex;
}



}
</style>
<div class='proj_card_cont'>
    <div class='content_cont'>
        <div class='img_cont'>
        </div>
        <div class='info_cont'>
            <h2></h2>
            <p></p>
            <div class='links_cont'>
                <h3>Links</h3>
                <div></div>
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
        let touched = false;
        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.template.content.cloneNode(true));
        shadow.querySelector('.tech_list').innerHTML = this.innerHTML;
        shadow.querySelector('.info_cont').querySelector('h2').innerHTML = this.getAttribute('name');
        shadow.querySelector('.info_cont').querySelector('p').innerHTML = this.getAttribute('desc');
        shadow.querySelector('.links_cont').querySelector('div').innerHTML = this.getAttribute('links');
        shadow.querySelector('.img_cont').innerHTML = `<img src='${this.getAttribute('img')}' ></img>`;
        shadow.querySelector('.proj_card_cont').addEventListener('touchstart',()=>{
            if(!touched){
                shadow.querySelector('.proj_card_cont').classList.add('active');
                touched = !touched;
                console.log('Clicked f', touched)
            }            
            else if(touched){
                shadow.querySelector('.proj_card_cont').classList.remove('active');
                touched = !touched;
                console.log('Clicked t', touched)
            }
        })
    }
}
window.customElements.define('project-card', ProjectCardComponent);
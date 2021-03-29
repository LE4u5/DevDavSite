const homeElement = document.querySelector('.home_cont');
const projectsElement = document.querySelector('.projects_cont');
const homeblock = document.querySelector('.home_cont').getClientRects();
const projectsList = document.querySelector(('.projects_ls'));
const contactElement = document.querySelector('.contact_cont');

const javascriptIcon = '<i class="fab fa-js-square fa-2x"></i>',
    htmlIcon = '<i class="fab fa-html5 fa-2x"></i>',
    reactIcon = '<i class="fab fa-react fa-2x"></i>';

const tech = [javascriptIcon, htmlIcon, reactIcon];
const projectsDataList = [{name:'name1', desc:'description1', img:'', ptech: tech},{name:'name2', desc:'description2', img:'', ptech: tech},{name:'name3', desc:'description3', img:'', ptech: tech}];
function CreateTechList(iconArray, cardElement){
    iconArray.forEach( i => {
        cardElement.innerHTML += i;
    })
}


function CreateProjectsList(projects){
    projects.forEach(proj => {
        let card = document.createElement('project-card');
        projectsList.appendChild(card);
        card.classList.add('proj_card')
        console.log('Tech: ',card)
        CreateTechList(proj.ptech, card);
    })
}

CreateProjectsList(projectsDataList);
console.log('Home Cont:',homeblock);


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    
    return (
        rect.bottom >= (window.innerHeight/2) &&
        rect.top <= (window.innerHeight/2) 
    );
}
document.addEventListener('scroll', ()=>{
    
    console.log(`Home: ${isInViewport(homeElement)} Projects: ${isInViewport(projectsElement)} Contact: ${isInViewport(contactElement)}`);
    if(isInViewport(homeElement)){
        document.querySelector('.home_ind').classList.add('active')
    }else if(isInViewport(projectsElement)){
        document.querySelector('.projects_ind').classList.add('active')
    }else if(isInViewport(contactElement)){
        document.querySelector('.contact_ind').classList.add('active')
    }
})
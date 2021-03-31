const homeElement = document.querySelector('.home_cont');
const projectsElement = document.querySelector('.projects_cont');
const homeblock = document.querySelector('.home_cont').getClientRects();
const projectsList = document.querySelector(('.projects_ls'));
const contactElement = document.querySelector('.contact_cont');

const javascriptIcon = '<i class="fab fa-js-square fa-2x"></i>',
    htmlIcon = '<i class="fab fa-html5 fa-2x"></i>',
    reactIcon = '<i class="fab fa-react fa-2x"></i>';

function stringToIconElement(strArray){
    let newArray = strArray.map(item => {
        if(item === 'js')
            return javascriptIcon;
        if(item === 'html')
            return htmlIcon;
        if(item === 'react')
            return reactIcon;

        return '';
    })
    return newArray;
}

const tech = [javascriptIcon, htmlIcon, reactIcon];
const projectsDataList = [
    {
        name:'name1',
        desc:'description1',
        img:'',
        ptech: ['js','html','react']
    },
    {
        name:'name2', 
        desc:'description2', 
        img:'', 
        ptech: ['js','html','react']
    },
    {
        name:'name3', 
        desc:'description3', 
        img:'', 
        ptech: ['js','html','react']
}
];
function CreateTechList(iconArray, cardElement){
    
    stringToIconElement(iconArray).forEach( i => {
        cardElement.innerHTML += i;
    })
}

function CreateProjectsList(projects){
    projects.forEach(proj => {
        let card = document.createElement('project-card');
        projectsList.appendChild(card);
        card.classList.add('proj_card')
        card.setAttribute('name',proj.name)
        card.setAttribute('desc',proj.desc)
        CreateTechList(proj.ptech, card);
    })
}

CreateProjectsList(projectsDataList);

//Returns true if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    
    return (
        rect.bottom >= (window.innerHeight/2) &&
        rect.top <= (window.innerHeight/2) 
    );
}

//converts string to boolean
function stb(stringBool){
    if(stringBool === 'true')
        return true;
    else
        return false;
}

const sStorage = window.sessionStorage;
sStorage.setItem('homeFocus','true');
sStorage.setItem('projectsFocus','false');
sStorage.setItem('contactFocus','false');

//Sets State of Page Position Indicator
document.addEventListener('scroll', ()=>{
    // console.log(`Home: ${isInViewport(homeElement)} Projects: ${isInViewport(projectsElement)} Contact: ${isInViewport(contactElement)}`);
    if(isInViewport(homeElement) && (!stb(sStorage.homeFocus)) ){
        if( stb(sStorage.projectsFocus)){
            sStorage.setItem('projectsFocus', 'false');
            document.querySelector('.projects_ind').classList.remove('active');
        }
        if( stb(sStorage.contactFocus)){
            sStorage.setItem('contactFocus', 'false');
            document.querySelector('.contact_ind').classList.remove('active');
        }
        document.querySelector('.home_ind').classList.add('active');
        sStorage.setItem('homeFocus','true');
    }else if(isInViewport(projectsElement)  && (!stb(sStorage.projectsFocus))){
        if( stb(sStorage.homeFocus)){
            sStorage.setItem('homeFocus', 'false');
            document.querySelector('.home_ind').classList.remove('active');
        }
        if( stb(sStorage.contactFocus)){
            sStorage.setItem('contactFocus', 'false');
            document.querySelector('.contact_ind').classList.remove('active');
        }
        document.querySelector('.projects_ind').classList.add('active');
        sStorage.setItem('projectsFocus','true');
    }else if(isInViewport(contactElement) && (!stb(sStorage.contactFocus))){
        if( stb(sStorage.projectsFocus)){
            sStorage.setItem('projectsFocus', 'false');
            document.querySelector('.projects_ind').classList.remove('active');
        }
        if( stb(sStorage.homeFocus)){
            sStorage.setItem('homeFocus', 'false');
            document.querySelector('.home_ind').classList.remove('active');
        }
        document.querySelector('.contact_ind').classList.add('active');
        sStorage.setItem('contactFocus','true')
    }

    console.log('Scroll Pos: ',window.scrollY)
})

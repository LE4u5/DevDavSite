const homeElement = document.querySelector('.home_cont');
const projectsElement = document.querySelector('.projects_cont');

const javascriptIcon = '<i class="fab fa-js-square fa-2x"></i>',
    htmlIcon = '<i class="fab fa-html5 fa-2x"></i>',
    reactIcon = '<i class="fab fa-react fa-2x"></i>';

const tech = [javascriptIcon, htmlIcon, reactIcon];

function CreateTechList(iconArray){
    iconArray.forEach( i => {
        document.querySelector('project-card').innerHTML += i;
    })
}

CreateTechList(tech);
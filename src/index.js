//##### Constant Variables + Session Storage #####
const homeElement = document.querySelector('.home_cont');
const projectsElement = document.querySelector('.projects_cont');
const homeblock = document.querySelector('.home_cont').getClientRects();
const projectsListElement = document.querySelector(('.projects_ls'));
const contactElement = document.querySelector('.contact_cont');
const bgScrollRate = 5;
const flutterSize = 35;
const flutterSvg = `<svg id="SvgjsSvg1001" width="${flutterSize}" height="${flutterSize}" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1002"></defs><g id="SvgjsG1008"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" width="${flutterSize}" height="${flutterSize}"><polygon points="14.329 11.072 14.328 11.073 7.857 17.53 14.327 24 21.7 24 15.24 17.531 21.7 11.072" fill="#0baa84" class="color000 svgShape"></polygon><polygon points="6 15.7 21.684 .012 14.327 .012 14.314 0 2.3 12" fill="#0baa84" class="color000 svgShape"></polygon></svg></g></svg>`
const javascriptIcon = '<i class="fab fa-js-square fa-2x"></i>',
    htmlIcon = '<i class="fab fa-html5 fa-2x"></i>',
    reactIcon = '<i class="fab fa-react fa-2x"></i>',
    cssIcon = '<i class="fab fa-brands fa-css3 fa-2x"></i>',
    nodeIcon = '<i class="fab fa-brands fa-node-js fa-2x"></i>',
    docker = '<i class="fab fa-brands fa-docker fa-2x"></i>',
    gulp = '<i class="fab fa-brands fa-gulp fa-2x"></i>',
    flutterIcon = flutterSvg;
//const tech = [javascriptIcon, htmlIcon, reactIcon,flutterIcon];

const sStorage = window.sessionStorage;
sStorage.setItem('homeFocus', 'true');
sStorage.setItem('projectsFocus', 'false');
sStorage.setItem('contactFocus', 'false');
//##################################################

//##### Functions #####
function stringToIconElement(strArray) {
    const newIconArray = strArray.map(function(item){
        if (item === 'js')
            return javascriptIcon;
        if (item === 'html')
            return htmlIcon;
        if (item === 'react')
            return reactIcon;
        if (item === 'flutter')
            return flutterIcon;
        if (item === 'css')
            return cssIcon;
        if (item === 'docker')
            return docker;
        if (item === 'gulp')
            return gulp;
        return '';
    })
    return newIconArray;
}
function CreateTechList(iconArray, cardElement) {

    stringToIconElement(iconArray).forEach(i => {
        cardElement.innerHTML += i;
    })
}
function CreateLinksElement(links) {
    let lElement = '';
    if (links.github !== undefined)
        lElement += `<a href='${links.github}'><i class='fab fa-github fa-lg'></i></a> `;
    if (links.web !== undefined)
        lElement += `<a href='${links.web}'><i class="fas fa-globe fa-lg"></i></a>`;
    return lElement;
}

async function getProjectList() {
    let list;
        const response = await fetch('https://api.devdav.dev/projects/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
         list = await response.json();
         return list;
}

function CreateProjectsListElement(newList) {
    if (newList) {
        newList.forEach(proj => {
            const card = document.createElement('project-card');
            card.classList.add('proj_card')
            card.setAttribute('name', proj.name)
            card.setAttribute('desc', proj.desc)
            card.setAttribute('img', proj.img)
            card.setAttribute('key', proj._id)
            card.setAttribute('links', CreateLinksElement(proj.links ? proj.links : {}))
            CreateTechList(proj.ptech, card);
            projectsListElement.appendChild(card);
        })
        
    }
}
//Returns true if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();

    return (
        rect.bottom >= (window.innerHeight / 2) &&
        rect.top <= (window.innerHeight / 2)
    );
}

//converts string to boolean
function stb(stringBool) {
    if (stringBool === 'true')
        return true;
    else
        return false;
}
//#######################

//#####
getProjectList()
    .then(list => {CreateProjectsListElement(list)})
    .catch(err => {
        console.log("Failed Fetch:", err);
    });

//Sets State of Page Position Indicator
document.addEventListener('scroll', () => {
    // console.log(`Home: ${isInViewport(homeElement)} Projects: ${isInViewport(projectsElement)} Contact: ${isInViewport(contactElement)}`);
    if (isInViewport(homeElement) && (!stb(sStorage.homeFocus))) {
        if (stb(sStorage.projectsFocus)) {
            sStorage.setItem('projectsFocus', 'false');
            document.querySelector('.projects_ind').classList.remove('active');
        }
        if (stb(sStorage.contactFocus)) {
            sStorage.setItem('contactFocus', 'false');
            document.querySelector('.contact_ind').classList.remove('active');
        }
        document.querySelector('.home_ind').classList.add('active');
        sStorage.setItem('homeFocus', 'true');
    } else if (isInViewport(projectsElement) && (!stb(sStorage.projectsFocus))) {
        if (stb(sStorage.homeFocus)) {
            sStorage.setItem('homeFocus', 'false');
            document.querySelector('.home_ind').classList.remove('active');
        }
        if (stb(sStorage.contactFocus)) {
            sStorage.setItem('contactFocus', 'false');
            document.querySelector('.contact_ind').classList.remove('active');
        }
        document.querySelector('.projects_ind').classList.add('active');
        sStorage.setItem('projectsFocus', 'true');
    } else if (isInViewport(contactElement) && (!stb(sStorage.contactFocus))) {
        if (stb(sStorage.projectsFocus)) {
            sStorage.setItem('projectsFocus', 'false');
            document.querySelector('.projects_ind').classList.remove('active');
        }
        if (stb(sStorage.homeFocus)) {
            sStorage.setItem('homeFocus', 'false');
            document.querySelector('.home_ind').classList.remove('active');
        }
        document.querySelector('.contact_ind').classList.add('active');
        sStorage.setItem('contactFocus', 'true')
    }
    document.querySelector('.bg_img').setAttribute('style', `transform: translateY(${((window.scrollY * 100) / document.querySelector('.main_cont').getClientRects()[0].height) / bgScrollRate}%) !important;`)
})


//console.log('Doc Rect: ', document.querySelector('.main_cont').getClientRects()[0].height)
//##########
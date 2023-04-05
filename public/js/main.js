const pageFiles = { 
    'register': {
        header: '../../components/cadastro/header.html',
        article: '../../components/cadastro/article.html',
        headerAnimation: 'returnToLeft 1s linear forwards', 
        articleAnimation: 'returnToRight 1s linear forwards'
    },
    'consult': {
        header: '../../components/consulta/header.html',
        article: '../../components/consulta/article.html',
        headerAnimation:'moveToRight 1s linear forwards',
        articleAnimation: 'moveToLeft 1s linear forwards'
    }
}

const appInit = () =>{
    const { header, article } = pageFiles['register']

    $('#header').load(header)
    $('#article').load(article)
}

document.body.addEventListener('load', appInit())


const openPage = (page) =>{
    const { header, article, headerAnimation, articleAnimation } = pageFiles[page]

    let headerElement = document.querySelector('#header')
    let articleElement = document.querySelector('#article')

    headerElement.style.animation = headerAnimation
    articleElement.style.animation = articleAnimation

    document.body.removeEventListener('load', appInit());
  
    $('#header').load(header)
    $('#article').load(article)
}


const openFilter = () => {
    const formFilter = document.getElementById('form-consult')
    const btnFilter = document.getElementById('btn-filter')

    if(formFilter.style.display == 'none' || formFilter.style.display == ''){
        btnFilter.className = 'active'
        formFilter.style.display = 'flex'
    }else{
        btnFilter.className = ''
        formFilter.style.display = 'none'
    }
}


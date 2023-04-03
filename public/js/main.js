let openPage = (page) =>{
    let header = document.querySelector('#header')
    let article = document.querySelector('#article')

    if(page == 'register'){
        article.style.animation = 'returnToRight 1s linear forwards'
        header.style.animation = 'returnToLeft 1s linear forwards'

        $('#header').load('../../components/cadastro/header.html')
        $('#article').load('../../components/cadastro/article.html')
    }else if(page == 'consult'){
        article.style.animation = 'moveToLeft 1s linear forwards'
        header.style.animation = 'moveToRight 1s linear forwards'

        $('#header').load('../../components/consulta/header.html')
        $('#article').load('../../components/consulta/article.html')
        carregaListaDespesas()
    }
}

let appInit = () =>{
    $('#header').load('../../components/cadastro/header.html')
    $('#article').load('../../components/cadastro/article.html')
}

let openFilter = () => {
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


class Despesas{
    constructor(ano,  mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' ||this[i] == null)
             return false
        }

        return true    
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id' , 0)   
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')

        return parseInt(proximoId) + 1
    }
    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id , JSON.stringify(d))    

        localStorage.setItem('id', id)
    }

    recuperarRegistros(){

        let despesas = Array()

        let id = localStorage.getItem('id')
    
        for(let i = 1; i<= id; i++){

            let despesa = JSON.parse(localStorage.getItem(i))

            //evitando indices removidos 
            if(despesa === null){
                continue
            }

            despesa.id = i
            despesas.push(despesa)

        }
        console.log(despesas)

        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarRegistros()

        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()


let cadastrarDespesas = ()=>{

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    let areaFeedback = document.getElementById('area-feedback')

    let despesas = new Despesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value,
    )

    if(despesas.validarDados()){ 

        bd.gravar(despesas) 

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
        areaFeedback.innerHTML = 'Despesa cadastrada com sucesso'        

    }else{
        areaFeedback.innerHTML = 'Complete todos os campos!'      
    }    
}

let carregaListaDespesas = (despesas = Array(), filtro = false)=>{

    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarRegistros()
    }
    let listasDespesas = document.getElementById('areaDespesas');


    despesas.forEach(function(d){

        let linha = listasDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        switch(d.tipo){
            case '1': 
            d.tipo = 'Alimentação'
            break;
            case '2': 
            d.tipo = 'Educação'
            break;
            case '3': 
            d.tipo = 'Lazer'
            break;
            case '4': 
            d.tipo = 'Saude'
            break;
            case '5': 
            d.tipo = 'Transporte'
            break;
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement('button')
        btn.className = 'btn-remove'
        btn.innerHTML = '<i class="bi bi-calendar2-x"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function (){
            let id = this.id.replace('id_despesa_', '')

            bd.remover(id)
            openPage('consult')
        }
        linha.insertCell(4).append(btn)

    })

}

let pesquisarDespesa = ()=>{
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

   carregaListaDespesas(despesas, true)
}

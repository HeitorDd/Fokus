const botaoAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTerefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let LitarefaSelecionada = null

function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa){
       
    // <li class="app__section-task-list-item">
    // <svg>
    //     <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    //         <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    //     </svg>
    // </svg>
    // <p class="app__section-task-list-item-description">
    //     Estudando localStorage
    // </p>
    // <button class="app_button-edit">
    //     <img src="/imagens/edit.png">
    // </button>
    // </li>
    
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () =>{
        //debugger
        const novaDescricao = prompt("Qual a nova tarefa?")
        if(novaDescricao){
            //se tiver descriçao vai realizar essa condiçao
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
        //faz com que quando o botao seja apertado realize uma funçao
        paragrafo.textContent = novaDescricao
        tarefa.descricao = novaDescricao
        atualizarTarefas()
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src','./imagens/edit.png')
    botao.append(imagemBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if(tarefa.completa){
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled','disabled')
    } else{
        li.onclick = () => {

        }
    }

    li.onclick = () => {
        debugger
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
        if(tarefaSelecionada == tarefa){
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            LitarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        LitarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        li.classList.add('app__section-task-list-item-active')
    }

    return li
}



botaoAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
    //toggle adiciona e remove classes de um elemetno
})

formAdicionarTarefa.addEventListener('submit',(evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value 
    }
    tarefas.push(tarefa)
    const elementoTarefa =criarElementoTarefa(tarefa)
    ulTerefas.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTerefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && LitarefaSelecionada){
        LitarefaSelecionada.classList.remove('app__section-task-list-item-active')
        //remove efeito de ativado
        LitarefaSelecionada.classList.add('app__section-task-list-item-complete')
        //ativa efeto de concluido
        LitarefaSelecionada.querySelector('button').setAttribute('disabled','disabled')
        //desabilita o uso do botao
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete": ".app__section-task-list-item"
    //pega todos os elemento concluidos
    document.querySelectorAll(seletor).forEach(elemento => {
        //para cada elemeto concluido ele remove
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()  
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)
// const limparFormulario = () => {
//     textArea.value = '';  
//     // Limpe o conteúdo do textarea
//     formularioTarefa.classList.add('hidden');  // Adicione a classe 'hidden' ao formulário para escondê-lo
// }
// btnCancelar.addEventListener('click', limparFormulario);

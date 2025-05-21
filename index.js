let masRepo= []
let masDiv = ["Name - ","Name-repo - ",'Stars - ']
let masClas = ["Name","Name-repo",'Stars']
let podskazka = []

const token = window.GITHUB_TOKEN;

async function asname(query) {
    // console.log(pres)
    podskazka = []
    let response = await fetch(query, {
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `<${token}>`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    });
    let commits = await response.json();
    if (commits.items.length == 0) {
        console.log("no")
    } else {
        // masRepo.push(commits.items)
        let all = commits.items.length 
        for (let index = 0; index < (all < 5 ? all : 5); index++) {
            podskazka.push(commits.items[index])
        }
        console.log(podskazka)
        debouncedFn()
        
    }
}
document.querySelector('.start').addEventListener('click', function(e) {
    
    console.log(e.target.innerHTML)
    document.querySelector('.open').classList.replace('open', 'close')
    document.getElementById('inputText').value = '';
    podskazka.forEach(element => {
        if (element.name==e.target.innerHTML) {
            masRepo.push(element)
        }
    });

    print(masRepo)

});

document.querySelector('#tableZapros').addEventListener('click', function(e) {
    
    // console.log(e.target.nodeName)
    if (e.target.nodeName == 'BUTTON') {
        document.querySelector('.list').remove(); 
        // var index = Array.prototype.indexOf.call(e.target.className, e.target);
        var index = e.target.className
        console.log(e.target.className)
        masRepo.splice(index, 1)
        create()
        console.log(masRepo)
        print(masRepo)
    }

    
});
function create(){
    let UlFirst = document.createElement('ul');
    UlFirst.classList.add("list")
    let liFirst = document.createElement('li');
    liFirst.innerHTML= "Конец"
    UlFirst.prepend(liFirst)
    let zap = document.querySelector('#tableZapros')
    zap.prepend(UlFirst)
}

function print(commits){
    document.querySelector('.list').remove(); 
    create()
    let list = document.querySelector('.list')
    commits.forEach(function(element, index) {
        let fullname = element.full_name.split("/")
        fullname.push(element.stargazers_count)
        let liFirst = document.createElement('li');
        
        for (let index = 2; index >= 0; index--) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            p.classList.add(masClas[index]);
            p.innerHTML = masDiv[index]  + " " + fullname[index]
            div.prepend(p)
            liFirst.prepend(div)
        }

        let but = document.createElement('button');
        but.classList.add(index)
        but.prepend("x")
        list.prepend(but)
        list.prepend(liFirst)

    });

}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debouncedFetch = debounce(asname, 500);

const debouncedFn = debounce(() => {
    let list = document.querySelectorAll('#start li');
    list.forEach((li, index) => {
        li.textContent = podskazka[index].name;
    });
    document.querySelector('.close').classList.replace('close', 'open');
    
}, 500);

document.querySelector('#inputText').addEventListener('input', function(event) {

    const query = event.target.value;
    zap = `https://api.github.com/search/repositories?q=${query}+language:assembly&sort=stars&order=desc`
    if (query) {
        debouncedFetch(zap);
    }
    
});
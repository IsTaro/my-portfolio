import { data, links } from './data.js'
const { log } = console

const categories = ['All', ...new Set(data.map((item) => item.category))]
log(categories)

const darkModeBtn = document.querySelector('.darkMode-box')
const circle = document.querySelector('.circle')
const body = document.querySelector('body')
const menuBtn = document.querySelector('.menu-btn')
const sidebarBtn = document.querySelector('.sidebar-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebar = document.querySelector('.sidebar-wrapper')
const submenu = document.querySelector('.submenu')
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const navLinks = document.querySelector('.nav-links')
const footer = document.querySelector('footer')

window.addEventListener('DOMContentLoaded', () => {
  displayPortfolio(data)
  displayCategoryBtns()
})

function displayCategoryBtns() {
  const categoriesContainer = document.querySelector('.categories-container')
  categoriesContainer.innerHTML = categories
    .map((category) => {
      return `<button class="btn category-btn" data-id=${category}>${category}</button>`
    })
    .join('')
  //  category-btn generates  , then
  const categoryBtns = document.querySelectorAll('.category-btn')
  main.addEventListener('click', (e) => {
    const category = e.target.dataset.id
    if (category) {
      categoryBtns.forEach((btn) => {
        btn.classList.remove('active')
      })
      e.target.classList.add('active')
      if (category.toLowerCase() === 'all') {
        displayPortfolio(data)
        return
      }
      const filterData = data.filter((item) => item.category === category)
      displayPortfolio(filterData)
    }
  })

  darkModeBtn.addEventListener('click', () => {
    categoryBtns.forEach((node) => {
      node.classList.toggle('dark')
    })
  })
}

function displayPortfolio(dataItems) {
  const imgContainer = document.querySelector('.img-container')
  const renderPortfolio = () => {
    imgContainer.innerHTML = dataItems
      .map((item) => {
        const { id, category, title, img, url, difficulty ,codeUrl,desc} = item
        let star = ''
        for (let i = 0; i < difficulty; i++) {
          star += '★'
        }
        return `<article key=${id} id=${category}>
            <a href=${url} class="project-link">
              <img src=${img} alt=${title} />
              <p class="title">${title}<span class="star">${star}</span></p>
            </a>
            <p class="desc">${desc}<p>
            <a href=${codeUrl} class='code-url'>View the code</a>          
        </article>`
      })
      .join('')
  }
  renderPortfolio()
  
  // cut codes replaced with css
  
  // const article = imgContainer.firstChild
  // const renderPortfolio = (className="") => {
  //   imgContainer.innerHTML = dataItems
  //     .map((item) => {
  //       const { id, category, title, img, url, difficulty ,codeUrl,desc} = item
  //       let star = ''
  //       for (let i = 0; i < difficulty; i++) {
  //         star += '★'
  //       }
  //       return `<article key=${id} id=${category}>
  //           <a href=${url} class="project-link">
  //             <img src=${img} alt=${title} />
  //             <p class=${`title ${className}`}>${title}<span class="star">${star}</span></p>
  //           </a>
  //           <p class="desc">${desc}<p>
  //           <a href=${codeUrl} class='code-url'>View the code</a>          
  //       </article>`
  //     })
  //     .join('')
  // }

  // if initial render success
  // if (article) {
      // renderPortfolio()
    // const title = document.querySelector('.title')
    // log(title)
    // if (title.classList.contains('dark')) {

    //   renderPortfolio("dark")
      // imgContainer.innerHTML = dataItems
      //   .map((item) => {
      //     const { id, category, title, img, url, difficulty ,codeUrl,desc} = item
      //     let star = ''
      //     for (let i = 0; i < difficulty; i++) {
      //       star += '★'
      //     }
      //     return `<article key=${id} id=${category}>
      //       <a href=${url} class="project-link">
      //         <img src=${img} alt=${title} />
      //         <p class="title dark">${title}<span class="star">${star}</span></p>
      //       </a>
      //       <p class="desc">${desc}<p>
      //       <a href=${codeUrl} class='code-url'>View the code</a>
      //   </article>`
      //   })
      //   .join('')
      // only one class acepted on the <p> tag in variable
    // } else {
    //   renderPortfolio()
    // }
  // } else {
    // renderPortfolio()
  // }

  // generatle class title, then
  // const titles = document.querySelectorAll('.title')
  // with every call, titles mutates.therefore,  update addEventListener ever time

  // darkModeBtn.addEventListener('click', () => {
  //   log(titles)
  //   titles.forEach((title) => {
  //     title.classList.toggle('dark')
  //   })
  //   log(titles)
  // })


}

// eventListener

darkModeBtn.addEventListener('click', () => {
  circle.classList.toggle('dark')
  darkModeBtn.classList.toggle('dark')
  body.classList.toggle('dark')
  //can't grab title or category here
})

// tentative
// menuBtn.addEventListener('mouseover', (e) => {
//   const menuBtnRect = e.target.getBoundingClientRect()
//   log(menuBtnRect)
//   const center = (menuBtnRect.left + menuBtnRect.right) / 2
//   const bottom = menuBtnRect.bottom
//   log(submenu.style.left)
//   submenu.style.left = `${center}px`
//   submenu.style.top = `${bottom}px`
//   log(submenu.style.left)
//   submenu.classList.add('show')
// })

nav.addEventListener('mouseover', (e) => {
  if (!e.target.classList.contains('menu-btn')) {
    submenu.classList.remove('show')
  }
})
main.addEventListener('mouseover', (e) => {
  submenu.classList.remove('show')
})
sidebarBtn.addEventListener('click', (e) => {
  // stop bodyEvent
  e.stopPropagation()

  sidebar.classList.toggle('show')

})
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('show')
})
sidebar.addEventListener('click',(e)=>{
  // stop bodyEvent
  e.stopPropagation()
})
body.addEventListener('click',()=>{
  sidebar.classList.remove('show')
})

// render elements
navLinks.innerHTML = links
  .map((item) => {
    const { icon, url } = item
    return `<li><a href=${url} target="_blank">${icon}</a></li>`
  })
  .join('')

footer.children[0].innerHTML = links
  .map((item) => {
    const { label, url } = item
    return `<li><a href=${url} target="_blank">${label}</a></li>`
  })
  .join('')

const ul = document.createElement('ul')

// tentative
// submenu.appendChild(ul).innerHTML = links
//   .map(item=>{
//     const { icon, url } = item
//     return `<li><a href=${url} target="_blank">${icon}</a></li>`
//   })
//   .join('')

sidebar.children[1].children[0].innerHTML = data
  .map((item) => {
    const { title, url } = item
    return `<a href=${url}><li>${title}</li></a>`
  })
  .join('')

sidebar.children[1].children[1].innerHTML = links
  .map((item) => {
    const { icon, url } = item
    return `<li><a href=${url} target="_blank">${icon}</a></li>`
  })
  .join('')

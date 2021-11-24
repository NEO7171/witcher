// ф-ция создания элемента
const getElement = (tagName = '', classNames = [], attributes = {}) => {
    const element = document.createElement(tagName)
    if (classNames) {
        element.classList.add(...classNames)
    }
    if (attributes) {
        // обход объекта
        for (attribute in attributes) {
            element[attribute] = attributes[attribute]
        }
    }
    return element
}


const createHeader = ({
    title,
    header: {
        logo,
        social,
        menu
    }
}) => {
    const header = getElement('header')
    const container = getElement('div', ['container'])
    const wrapper = getElement('div', ['header'])
    if (logo) {
        //console.log(param.header.logo);
        const logoImg = getElement('img', ['logo'], {
            src: logo,
            alt: 'Логотип ' + title
        })

        wrapper.append(logoImg)
    }

    if (menu) {
        const nav = getElement('nav', ['menu-list'])
        const menulLinks = menu.map(item => {
            const menulLink = getElement('a', ['menu-link'], {
                href: item.link,
                textContent: item.title
            })

            return menulLink
        })
        nav.append(...menulLinks)
        wrapper.append(nav)
        //добавляем  бургер
        const menuBtn = getElement('button', ['menu-button', 'btn', 'btn-primary'])
        menuBtn.innerText = 'кнопка бургера'
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('menu-button-active')
            wrapper.classList.toggle('header-active')
        })
        container.append(menuBtn)
    }
    if (social) {
        const socialWrapper = getElement('div', ['social'])
        const allSocial = social.map(item => {
            const socialLink = getElement('a', ['social-link'])
            socialLink.append(getElement('img', [], {
                src: item.image,
                alt: item.title
            }))
            socialLink.href = item.link
            return socialLink
        })
        socialWrapper.append(...allSocial)
        wrapper.append(socialWrapper)
    }

    header.append(container)
    container.append(wrapper)

    return header
}

//Второй вариант деструктуризация
const createMain = ({
    title,
    main: {
        genre,
        rating,
        description,
        trailer,
        slider
    }
}) => {
    const main = getElement('main')
    const container = getElement('div', ['container'])
    main.append(container)
    const wrapper = getElement('div', ['main-content'])
    container.append(wrapper)
    const content = getElement('div', ['content'])
    wrapper.append(content)
    if (genre) {
        const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {
            textContent: genre
        })
        content.append(genreSpan)
    }
    if (rating) {
        const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight'])
        const ratingStars = getElement('div', ['rating-stars'])
        const ratingNumber = getElement('div', ['rating-number'], {
            textContent: `${rating}/10`
        })
        for (let i = 0; i < 10; i++) {
            const star = getElement('img', ['star'], {
                alt: i ? '' : `Рейтинг ${rating} из 10`,
                src: i < rating ? 'img/icons/star.svg' : 'img/icons/star-o.svg'
            })
            ratingStars.append(star)
        }
        ratingBlock.append(ratingStars, ratingNumber)
        content.append(ratingBlock)
    }
    //сразу создаем элемент и добавляем
    content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
        textContent: title
    }))

    if (description) {
        const descriptionElem = getElement('p', ['main-description', 'animated', 'fadeInRight'], {
            textContent: description
        })
        content.append(descriptionElem)
    }
    if (trailer) {
        const youtubeLink = getElement('a', ['btn', 'btn-danger', 'animated', 'fadeInRight', 'youtybe-button'], {
            href: trailer,
            textContent: 'смотреть трейлер'
        })
        const youtubeImageLink = getElement('a', ['play', 'btn', 'btn-danger', 'animated', 'fadeInRight', 'youtybe-modal'], {
            href: trailer,
            areaLable: 'Смотреть трейлер'
        })
        const iconPlay = getElement('img', ['play-img'], {
            src: 'img/icons/star.svg',
            alt: 'Play',
            ariaHidden: true
        })
        youtubeImageLink.append(iconPlay)
        content.append(youtubeLink)
        wrapper.append(youtubeImageLink)
    }
    if (slider) {
        const sliderBlock = getElement('div', ['series'])
        const swiperBlock = getElement('div', ['swiper',
            'swiper-container'
        ])
        const swiperWrapper = getElement('div', ['swiper-wrapper'])
        const arrowNext = getElement('div', ['swiper-button-next'])
        const arrowPrev = getElement('div', ['swiper-button-prev'])

        const sliders = slider.map(item => {
            const swiperSlide = getElement('div', ['swiper-slide'])
            const card = getElement('figure', ['card'])
            const cardImg = getElement('img', ['card-img'], {
                src: item.img,
                alt: (item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle : '')
            })
            card.append(cardImg)
            if (item.title || item.subtitle) {
                const cardDescription = getElement('figcaption', ['card-description'])
                cardDescription.innerHTML = `${item.subtitle ? `<p class"card-subtitle">${item.subtitle}<p/>`:``}
                ${item.title ? `<p class"card-subtitle">${item.title}<p/>`:``}`
                card.append(cardDescription)
            }
            swiperSlide.append(card)
            return swiperSlide
        })
        swiperWrapper.append(...sliders)
        swiperBlock.append(swiperWrapper, arrowNext, arrowPrev)
        sliderBlock.append(swiperBlock)

        container.append(sliderBlock)


    }


    return main

}
const movieConstructor = (selector, options) => {
    document.title = options.title
    if (options.favicon) {
        //получим расширение файла - после точки
        const index = options.favicon.lastIndexOf('.')
        const type = options.favicon.substring(index + 1)

        const faviconImg = getElement('link', null, {
            rel: 'icon',
            href: options.favicon,
            type: type == 'svg' ? 'image/svg+xml' : type
        })
        document.head.append(faviconImg)
    }
    const app = document.querySelector(selector)
    app.classList.add('body-app')
    app.style.color = options.fontColor || '' // если есть значение то оно или пустая строка 
    app.style.backgroundColor = options.backgroundColor || ''
    if (options.subColor) {
        document.documentElement.style.setProperty('sub-color', options.subColor)// меняем значение переменной css
    }
    app.style.backgroundImage = options.background ?
        `url("${options.background}")` : '';
    if (options.header) {
        app.append(createHeader(options))
    }
    if (options.main) {
        app.append(createMain(options))
    }

}

movieConstructor('.app', {
    title: 'Ведьмак',
    background: 'img/entuziast-vypustil.jpg',
    favicon: 'img/icons/phone-icon.svg',
    fontColor: '#ffffff',
    backgroundColor: '#141218',
    subColor: '#9d2929',
    header: {
        logo: 'img/w3-logo.png',
        social: [{
                title: 'Twitter',
                link: 'https://twitter.com',
                image: 'img/icons/phone-icon.svg',
            },
            {
                title: 'Instagramm',
                link: 'https://instagramm.com',
                image: 'img/icons/time-icon.svg',
            },
            {
                title: 'Fasebook',
                link: 'https://fasebook.com',
                image: 'img/icons/phone-icon.svg',
            },
        ],
        menu: [{
                title: 'Описание',
                link: '#',
            },
            {
                title: 'Трейлер',
                link: '#',
            },
            {
                title: 'Отзывы',
                link: '#',
            },
        ],
    },
    main: {
        genre: '2019, фэнтези',
        rating: '5',
        description: ' Аналитические, технические, микровесы и ультрамикровесы, устройства дозирования порошков и жидкостей, анализаторы влажности, эталонные гири',
        trailer: 'https://www.youtube.com/watch?v=ehjJ614QfeM',
        slider: [{
                img: 'img/w3-vizual.png',
                title: 'Название1',
                subtitle: 'Серия 1',
            },
            {
                img: 'img/w3-vizual.png',
                title: 'Название2',
                subtitle: 'Серия 2',
            },
            {
                img: 'img/w3-vizual.png',
                title: 'Название3',
                subtitle: 'Серия 3',
            },
            {
                img: 'img/w3-vizual.png',
                title: 'Название4',
                subtitle: 'Серия 4',
            }
        ]
    }

});
var swiperWitcher = new Swiper(".swiper-container", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});